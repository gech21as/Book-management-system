import { BookOpen, Menu, X, User, LogOut, Trash2, Shield, Home, Library, Info, Phone, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import './Header.css';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const auth = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Temporary fix: Check if user is admin based on email
  const isAdmin = auth.user?.email === 'getahunasefa277@gmail.com';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', icon: <Home className="w-4 h-4" />, page: 'home' },
    { name: 'Catalog', icon: <Library className="w-4 h-4" />, page: 'catalog' },
    { name: 'About', icon: <Info className="w-4 h-4" />, page: 'about' },
    { name: 'Contact', icon: <Phone className="w-4 h-4" />, page: 'contact' },
  ];

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          
          {/* LEFT SIDE — Logo */}
          <div
            className="header-logo"
            onClick={() => handleNavClick("home")}
          >
            <div className="header-logo-icon-wrapper">
              <BookOpen className="header-logo-icon" />
            </div>

            <div className="header-logo-text">
              <h1 className="header-logo-title">
                Heritage Archive
              </h1>
              <p className="header-logo-subtitle">
                Free Digital Library
              </p>
            </div>
          </div>

          {/* RIGHT SIDE — Navigation + Actions */}
          <div className="header-right">
            
            {/* Desktop Navigation */}
            <nav className="header-nav">
              {navigationItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`header-nav-link ${currentPage === item.page ? 'active' : ''}`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Admin Button - visible only to admin role */}
            {auth.user && isAdmin && (
              <button
                onClick={() => handleNavClick("admin")}
                className="header-admin-btn"
              >
                <Shield className="w-4 h-4" />
                Admin
              </button>
            )}

            {/* Auth buttons */}
            {auth.user ? (
              <div className="header-auth-section">
                {/* Professional User Info */}
                <div className="header-user-info">
                  <div className="header-user-avatar">
                    {auth.user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="header-user-details">
                    <span className="header-user-name">{auth.user.name}</span>
                    {isAdmin && (
                      <span className="header-user-role">Administrator</span>
                    )}
                  </div>
                  <ChevronDown className="header-user-dropdown w-4 h-4" />
                </div>

                {/* Action Buttons */}
                <div className="header-auth-actions">
                  <button 
                    className="header-logout-btn"
                    onClick={() => { auth.logout(); handleNavClick('home'); }}
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </button>
                  <button
                    className="header-delete-btn"
                    onClick={async () => {
                      const ok = window.confirm('Delete your account? This action is permanent and cannot be undone.');
                      if (!ok) return;
                      try {
                        await fetch((import.meta.env.VITE_API_URL || 'http://localhost:56000') + '/api/auth/delete', {
                          method: 'DELETE',
                          headers: { Authorization: `Bearer ${auth.token}` }
                        });
                      } catch (err) {
                        console.warn('Delete request failed', err);
                      }
                      auth.logout();
                      handleNavClick('home');
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="header-guest-auth">
                <button className="header-login-btn" onClick={() => handleNavClick('login')}>
                  Login
                </button>
                <button className="header-register-btn" onClick={() => handleNavClick('register')}>
                  Register
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              className="header-mobile-menu-btn"
              onClick={handleMobileMenuToggle}
            >
              {isMobileMenuOpen ? (
                <X className="header-mobile-menu-icon" />
              ) : (
                <Menu className="header-mobile-menu-icon" />
              )}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`header-mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <nav className="header-mobile-nav">
          {navigationItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavClick(item.page)}
              className={`header-mobile-nav-link ${currentPage === item.page ? 'active' : ''}`}
            >
              <span className="flex items-center gap-2">
                {item.icon}
                {item.name}
              </span>
            </button>
          ))}
        </nav>

        <div className="header-mobile-auth">
          {auth.user ? (
            <>
              {/* Professional User Info in Mobile */}
              <div className="header-user-info">
                <div className="header-user-avatar">
                  {auth.user.name.charAt(0).toUpperCase()}
                </div>
                <div className="header-user-details">
                  <span className="header-user-name">{auth.user.name}</span>
                  {isAdmin && (
                    <span className="header-user-role">Administrator</span>
                  )}
                </div>
                <ChevronDown className="header-user-dropdown w-4 h-4" />
              </div>

              {isAdmin && (
                <button
                  onClick={() => handleNavClick("admin")}
                  className="header-admin-btn"
                >
                  <Shield className="w-4 h-4 mr-1" />
                  Admin Panel
                </button>
              )}
              <button 
                className="header-logout-btn"
                onClick={() => { auth.logout(); handleNavClick('home'); }}
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
              <button
                className="header-delete-btn"
                onClick={async () => {
                  const ok = window.confirm('Delete your account? This action is permanent and cannot be undone.');
                  if (!ok) return;
                  try {
                    await fetch((import.meta.env.VITE_API_URL || 'http://localhost:56000') + '/api/auth/delete', {
                      method: 'DELETE',
                      headers: { Authorization: `Bearer ${auth.token}` }
                    });
                  } catch (err) {
                    console.warn('Delete request failed', err);
                  }
                  auth.logout();
                  handleNavClick('home');
                }}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete Account
              </button>
            </>
          ) : (
            <>
              <button className="header-login-btn" onClick={() => handleNavClick('login')}>
                <User className="w-4 h-4 mr-1" />
                Login
              </button>
              <button className="header-register-btn" onClick={() => handleNavClick('register')}>
                <User className="w-4 h-4 mr-1" />
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}