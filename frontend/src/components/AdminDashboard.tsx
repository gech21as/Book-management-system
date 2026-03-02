import { useState } from 'react';
import { Book, BookSuggestion } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BookOpen, 
  Upload, 
  Edit, 
  Trash2, 
  Eye, 
  CheckCircle, 
  XCircle,
  BarChart3,
  BookPlus,
  Users,
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { categories, languages } from '../data/books';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { apiFetch } from '../api/client';
import { useAuth } from '../contexts/AuthContext';
import './AdminDashboard.css';

interface AdminDashboardProps {
  onNavigate?: (page: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const auth = useAuth();
  
  // Debug: Log current authentication state
  console.log('=== Admin Dashboard Auth Debug ===');
  console.log('User:', auth.user);
  console.log('Token:', auth.token);
  console.log('User Role:', auth.user?.role);
  console.log('User Email:', auth.user?.email);
  console.log('=====================================');
  
  // Check if user is authenticated and is admin
  if (!auth.user || !auth.token) {
    return (
      <div className="admin-dashboard">
        <div className="admin-header">
          <h1 className="admin-title">Access Denied</h1>
          <p className="admin-subtitle">You must be logged in to access the admin dashboard.</p>
        </div>
      </div>
    );
  }
  
  // Check if user has admin role (you might need to add this to your user type)
  if (auth.user.role !== 'admin' && auth.user.email !== 'admin@heritage.com') {
    return (
      <div className="admin-dashboard">
        <div className="admin-header">
          <h1 className="admin-title">Access Denied</h1>
          <p className="admin-subtitle">You don't have permission to access the admin dashboard.</p>
        </div>
      </div>
    );
  }
  const [books, setBooks] = useState<Book[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    author: '',
    year: '',
    language: '',
    origin: '',
    category: '',
    pages: '',
    institution: '',
    description: '',
    condition: '',
    coverImage: ''
  });

  const stats = {
    totalBooks: books.length,
    recentUploads: 12,
    pendingSuggestions: 3,
    totalCategories: 8
  };

  const suggestions: BookSuggestion[] = [
    {
      id: '1',
      title: 'Ancient Mathematics Manuscript',
      author: 'Euclid',
      category: 'Mathematics',
      reason: 'This would be a valuable addition to the mathematics collection',
      suggestedBy: 'John Doe',
      suggestedDate: new Date().toISOString(),
      status: 'pending'
    },
    {
      id: '2',
      title: 'Historical Geography Text',
      author: 'Ptolemy',
      category: 'Geography',
      reason: 'Important historical geography work',
      suggestedBy: 'Jane Smith',
      suggestedDate: new Date().toISOString(),
      status: 'pending'
    },
    {
      id: '3',
      title: 'Medical Treatise Collection',
      author: 'Hippocrates',
      category: 'Medicine',
      reason: 'Foundation of modern medicine',
      suggestedBy: 'Dr. Wilson',
      suggestedDate: new Date().toISOString(),
      status: 'pending'
    }
  ];

  const handleView = (book: Book) => {
    alert(
      `Title: ${book.title}\nAuthor: ${book.author}\nYear: ${book.year}\nCategory: ${book.category}`
    );
  };

  const handleEdit = async (book: Book) => {
    const newTitle = prompt("Enter new title:", book.title);
    if (!newTitle || newTitle.trim() === "") return;
    try {
      await apiFetch(`/api/books/${book.id}`, { method: 'PUT', body: JSON.stringify({ title: newTitle }) });
      await loadBooks();
      alert('Book updated');
    } catch (err: any) {
      console.error(err);
      alert(err?.message || 'Update failed');
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;
    try {
      await apiFetch(`/api/books/${id}`, { method: 'DELETE' });
      await loadBooks();
      alert('Book deleted');
    } catch (err: any) {
      console.error(err);
      alert(err?.message || 'Delete failed');
    }
  };

  const loadBooks = async () => {
    setLoadingBooks(true);
    try {
      const response = await apiFetch('/api/books');
      setBooks(response || []);
    } catch (err: any) {
      console.error('Failed to load books:', err);
      setBooks([]);
    } finally {
      setLoadingBooks(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create FormData for file upload
    const formData = new FormData();
    
    // Add all text fields
    formData.append('title', uploadForm.title);
    formData.append('author', uploadForm.author);
    formData.append('year', uploadForm.year);
    formData.append('category', uploadForm.category);
    formData.append('language', uploadForm.language);
    formData.append('pages', uploadForm.pages);
    formData.append('origin', uploadForm.origin);
    formData.append('institution', uploadForm.institution);
    formData.append('description', uploadForm.description);
    formData.append('condition', uploadForm.condition);
    
    try {
      // First upload cover image if selected
      const coverInput = document.getElementById('coverImage') as HTMLInputElement;
      if (coverInput && coverInput.files && coverInput.files[0]) {
        const coverFormData = new FormData();
        coverFormData.append('file', coverInput.files[0]);
        
        const coverResponse = await apiFetch('/api/uploads', {
          method: 'POST',
          body: coverFormData,
        });
        
        if (coverResponse.filename) {
          formData.append('coverImage', coverResponse.filename);
        }
      }
      
      // Then create the book record
      await apiFetch('/api/books', {
        method: 'POST',
        body: formData,
      });
      
      alert('Book uploaded successfully!');
      setUploadForm({
        title: '',
        author: '',
        year: '',
        language: '',
        origin: '',
        category: '',
        pages: '',
        institution: '',
        description: '',
        condition: '',
        coverImage: ''
      });
      
      // Navigate to catalog page to show the uploaded book
      if (onNavigate) {
        onNavigate('catalog');
      }
      
      // Reset file input
      if (coverInput) coverInput.value = '';
      
      // Refresh books to ensure the uploaded book appears in catalog
      await loadBooks();
      
      // Refresh the catalog page's book list
      if (onNavigate) {
        onNavigate('catalog');
      }
    } catch (err: any) {
      console.error('Upload error details:', err);
      
      // Provide more specific error messages
      if (err?.message?.includes('Unauthorized') || err?.message?.includes('401')) {
        alert('Authentication error: You are not authorized to upload books. Please make sure you are logged in as an admin.');
      } else if (err?.message?.includes('403')) {
        alert('Permission denied: You do not have admin privileges to upload books.');
      } else if (err?.message?.includes('413')) {
        alert('File too large: The file you are trying to upload is too big.');
      } else if (err?.message?.includes('422')) {
        alert('Validation error: Please check all required fields and try again.');
      } else if (err?.message?.includes('500')) {
        alert('Server error: Please try again later.');
      } else {
        alert(`Upload failed: ${err?.message || 'Unknown error occurred'}`);
      }
    }
  };

  const handleSuggestionApprove = async (id: string) => {
    try {
      await apiFetch(`/api/suggestions/${id}/approve`, { method: 'POST' });
      alert('Suggestion approved');
    } catch (err: any) {
      console.error(err);
      alert(err?.message || 'Failed to approve suggestion');
    }
  };

  const handleSuggestionReject = async (id: string) => {
    try {
      await apiFetch(`/api/suggestions/${id}/reject`, { method: 'POST' });
      alert('Suggestion rejected');
    } catch (err: any) {
      console.error(err);
      alert(err?.message || 'Failed to reject suggestion');
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-subtitle">Manage your digital library collection</p>
      </div>

      {/* Stats Cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="admin-stat-content">
            <h3 className="admin-stat-number">{stats.totalBooks}</h3>
            <p className="admin-stat-label">Total Books</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="admin-stat-content">
            <h3 className="admin-stat-number">{stats.recentUploads}</h3>
            <p className="admin-stat-label">Recent Uploads</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="admin-stat-content">
            <h3 className="admin-stat-number">{stats.pendingSuggestions}</h3>
            <p className="admin-stat-label">Pending Suggestions</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div className="admin-stat-content">
            <h3 className="admin-stat-number">{stats.totalCategories}</h3>
            <p className="admin-stat-label">Categories</p>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="books" className="admin-tabs">
        <TabsList className="admin-tabs-list">
          <TabsTrigger value="books" className="admin-tab-trigger">
            <BookOpen className="w-4 h-4 mr-2" />
            Books
          </TabsTrigger>
          <TabsTrigger value="upload" className="admin-tab-trigger">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="admin-tab-trigger">
            <Users className="w-4 h-4 mr-2" />
            Suggestions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="books" className="admin-tab-content">
          <div className="admin-books-section">
            <h2 className="admin-section-title">Book Management</h2>
            <div className="admin-books-grid">
              {books.map((book) => (
                <div key={book.id} className="admin-book-card">
                  <div className="admin-book-cover">
                    <ImageWithFallback
                      src={book.coverImage}
                      alt={book.title}
                      className="admin-book-image"
                    />
                  </div>
                  <div className="admin-book-info">
                    <h3 className="admin-book-title">{book.title}</h3>
                    <p className="admin-book-author">{book.author}</p>
                    <div className="admin-book-meta">
                      <span className="admin-book-year">{book.year}</span>
                      <span className="admin-book-category">{book.category}</span>
                    </div>
                    <div className="admin-book-actions">
                      <Button
                        onClick={() => handleView(book)}
                        className="admin-action-btn"
                        variant="outline"
                        size="sm"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        onClick={() => handleEdit(book)}
                        className="admin-action-btn"
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(book.id)}
                        className="admin-action-btn delete"
                        variant="outline"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="upload" className="admin-tab-content">
          <div className="admin-upload-section">
            <h2 className="admin-section-title">Upload New Book</h2>
            <form onSubmit={handleUpload} className="admin-upload-form">
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={uploadForm.author}
                    onChange={(e) => setUploadForm({ ...uploadForm, author: e.target.value })}
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    value={uploadForm.year}
                    onChange={(e) => setUploadForm({ ...uploadForm, year: e.target.value })}
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <Label htmlFor="category">Category</Label>
                  <Select value={uploadForm.category} onValueChange={(value) => setUploadForm({ ...uploadForm, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="admin-form-group">
                  <Label htmlFor="language">Language</Label>
                  <Select value={uploadForm.language} onValueChange={(value) => setUploadForm({ ...uploadForm, language: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language} value={language}>
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="admin-form-group">
                  <Label htmlFor="pages">Pages</Label>
                  <Input
                    id="pages"
                    value={uploadForm.pages}
                    onChange={(e) => setUploadForm({ ...uploadForm, pages: e.target.value })}
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <Label htmlFor="coverImage">Cover Image</Label>
                  <Input
                    id="coverImage"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={(e) => setUploadForm({ ...uploadForm, coverImage: e.target.files?.[0]?.name || '' })}
                  />
                </div>
                <div className="admin-form-group">
                  <Label htmlFor="fileLocation">File Location</Label>
                  <div className="file-location-input-wrapper">
                    <Input
                      id="fileLocation"
                      value={uploadForm.origin}
                      onChange={(e) => setUploadForm({ ...uploadForm, origin: e.target.value })}
                      placeholder="Enter file path or location"
                      readOnly
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = '.pdf,.epub,.txt,.doc,.docx';
                        input.onchange = (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // Get file information
                            const fileName = file.name;
                            const fileSize = (file.size / 1024 / 1024).toFixed(2) + ' MB';
                            const fileType = file.type || 'Unknown';
                            
                            // Note: Due to browser security, we cannot access the full local file path
                            // We can only access the filename, not the full path like C:\Users\...
                            // The full path would be something like: file.name (no full path access)
                            
                            // Create a more informative path display
                            const fileInfo = `${fileName} (${fileSize}, ${fileType})`;
                            
                            setUploadForm({ ...uploadForm, origin: fileInfo });
                            
                            console.log('Selected file:', {
                              name: fileName,
                              size: fileSize,
                              type: fileType,
                              lastModified: new Date(file.lastModified).toLocaleString(),
                              note: 'Full path not accessible due to browser security'
                            });
                          }
                        };
                        input.click();
                      }}
                      className="file-browser-button"
                    >
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="admin-form-group">
                  <Label htmlFor="institution">Institution</Label>
                  <Input
                    id="institution"
                    value={uploadForm.institution}
                    onChange={(e) => setUploadForm({ ...uploadForm, institution: e.target.value })}
                    placeholder="Enter institution name"
                  />
                </div>
                <div className="admin-form-group">
                  <Label htmlFor="condition">Condition</Label>
                  <Input
                    id="condition"
                    value={uploadForm.condition}
                    onChange={(e) => setUploadForm({ ...uploadForm, condition: e.target.value })}
                    placeholder="Enter book condition (e.g., Good, Fair, Excellent)"
                  />
                </div>
              </div>
              <div className="admin-form-group">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  rows={4}
                />
              </div>
              <Button type="submit" className="admin-submit-btn">
                <Upload className="w-4 h-4 mr-2" />
                Upload Book
              </Button>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="suggestions" className="admin-tab-content">
          <div className="admin-suggestions-section">
            <h2 className="admin-section-title">Book Suggestions</h2>
            <div className="admin-suggestions-list">
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="admin-suggestion-card">
                  <div className="admin-suggestion-content">
                    <h3 className="admin-suggestion-title">{suggestion.title}</h3>
                    <p className="admin-suggestion-author">by {suggestion.author}</p>
                    <p className="admin-suggestion-reason">{suggestion.reason}</p>
                    <div className="admin-suggestion-meta">
                      <span className="admin-suggestion-category">{suggestion.category}</span>
                      <span className="admin-suggestion-by">Suggested by {suggestion.suggestedBy}</span>
                    </div>
                  </div>
                  <div className="admin-suggestion-actions">
                    <Button
                      onClick={() => handleSuggestionApprove(suggestion.id)}
                      className="admin-action-btn approve"
                      variant="outline"
                      size="sm"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleSuggestionReject(suggestion.id)}
                      className="admin-action-btn reject"
                      variant="outline"
                      size="sm"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
