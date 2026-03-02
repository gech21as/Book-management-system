import { useEffect, useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BookCatalog } from './components/BookCatalog';
import { BookDetail } from './components/BookDetail';
import { BookReader } from './components/BookReader';
import { Contact } from './components/Contact';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLogin } from './components/AdminLogin';
import { Chatbot } from './components/Chatbot';
import { Footer } from './components/Footer';
import { About } from './components/About';
import { Catalog } from './components/Catalog';
import Login from './components/Login';
import Register from './components/Register';
import { Button } from './components/ui/button';
import { Book } from './types';

type Page =
  | 'home'
  | 'catalog'
  | 'detail'
  | 'reader'
  | 'about'
  | 'contact'
  | 'admin'
  | 'admin-login'
  | 'login'
  | 'register';

export default function App() {
  const auth = useAuth();

  // ✅ Always start with LOGIN page on app load
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(false);

  // Clear authentication on initial app load to ensure fresh start
  useEffect(() => {
    // Only clear on first app load, not on refresh
    const hasLoadedBefore = sessionStorage.getItem('app_has_loaded_before');
    if (!hasLoadedBefore) {
      // Clear any existing authentication
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      sessionStorage.setItem('app_has_loaded_before', 'true');
    }
  }, []);

  const isAuthPage =
    currentPage === 'login' || currentPage === 'register';

  /* ---------------- Navigation ---------------- */
  // 🔹 Navigation handler with URL update
  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    // Update browser URL without page reload
    window.history.pushState({ page }, '', `/${page}`);
    setSelectedBook(null);
  };

  // Listen for navigation events from Footer
  useEffect(() => {
    const handleNavigationEvent = (event: CustomEvent) => {
      const { page } = event.detail;
      handleNavigate(page);
    };
    
    // Listen for browser back/forward navigation
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.page) {
        setCurrentPage(event.state.page);
      }
    };

    window.addEventListener('navigate', handleNavigationEvent as EventListener);
    window.addEventListener('popstate', handlePopState);
    
    // Set initial URL based on current page
    window.history.replaceState({ page: currentPage }, '', `/${currentPage}`);
    
    return () => {
      window.removeEventListener('navigate', handleNavigationEvent as EventListener);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentPage]);

  const handleViewDetails = (book: Book) => {
    setSelectedBook(book);
    setCurrentPage('detail');
  };

  const handleStartReading = (book: Book) => {
    setSelectedBook(book);
    setCurrentPage('reader');
  };

  const handleBackToCatalog = () => {
    setCurrentPage('catalog');
    setSelectedBook(null);
  };

  const handleExploreClick = () => {
    setCurrentPage('catalog');
  };

  /* ---------------- Fetch Books ---------------- */

  const fetchBooks = async () => {
    setLoadingBooks(true);
    try {
      const res = await fetch(
        (import.meta.env?.VITE_API_URL || 'http://localhost:5000') +
          '/api/books'
      );
      const data = await res.json();
      setBooks(data || []);
    } catch (err) {
      console.error('Failed to fetch books', err);
    } finally {
      setLoadingBooks(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  /* ---------------- Authentication Flow ---------------- */

  useEffect(() => {
    // Check authentication status and redirect accordingly
    if (auth.user) {
      // If logged in and on login/register → go home
      if (isAuthPage) {
        setCurrentPage('home');
      }
    } else {
      // If NOT logged in → always show login page
      if (!isAuthPage) {
        setCurrentPage('login');
      }
    }
  }, [auth.user]);

  /* ---------------- Page Renderer ---------------- */

  const renderContent = () => {
    // Public pages (no authentication required)
    switch (currentPage) {
      case 'about':
        return <About />;

      case 'contact':
        return <Contact />;
    }

    // Authenticated pages
    if (!auth.user) {
      if (currentPage === 'login') {
        return (
          <Login
            onSuccess={() => handleNavigate('home')}
            onNavigate={handleNavigate}
          />
        );
      }
      return (
        <Register
          onSuccess={() => handleNavigate('login')}
          onNavigate={handleNavigate}
        />
      );
    }

    // Authenticated user pages
    switch (currentPage) {
      case 'home':
        return <Hero onExploreClick={handleExploreClick} />;

      case 'catalog':
        return <Catalog books={books} onViewDetails={handleViewDetails} />;

      case 'detail':
        return selectedBook ? (
          <BookDetail
            book={selectedBook}
            onBack={handleBackToCatalog}
            onStartReading={handleStartReading}
          />
        ) : null;

      case 'reader':
        return selectedBook ? (
          <BookReader
            book={selectedBook}
            onClose={handleBackToCatalog}
          />
        ) : null;

      case 'admin-login':
        return <Login onSuccess={() => handleNavigate('login')} onNavigate={handleNavigate} />;

      case 'admin':
        return <AdminDashboard onNavigate={handleNavigate} />;

      case 'contact':
        return <Contact />;

      case 'about':
        return <About />;

      default:
        return <Hero onExploreClick={handleExploreClick} />;
    }
  };

  /* ---------------- Layout Control ---------------- */

  // Hide header/footer on:
  // - Login
  // - Register
  // - Reader mode
  if (isAuthPage || currentPage === 'reader') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {renderContent()}
      </div>
    );
  }

  /* ---------------- Main Layout ---------------- */

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      <main className="flex-1">
        {renderContent()}
      </main>

      <Footer />

      <Chatbot />
    </div>
  );
}