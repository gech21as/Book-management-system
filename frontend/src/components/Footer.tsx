import { BookOpen, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin, ArrowRight, ExternalLink, Globe, HelpCircle, FileText, Shield, Cookie } from 'lucide-react';
import { Separator } from './ui/separator';
import './Footer.css';

export function Footer() {
  const handleNavigation = (page: string) => {
    // Navigate to appropriate page
    const event = new CustomEvent('navigate', { detail: { page } });
    window.dispatchEvent(event);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          
          {/* About Section */}
          <div className="footer-section">
            <div className="footer-logo">
              <div className="footer-logo-icon-wrapper">
                <BookOpen className="footer-logo-icon" />
              </div>
              <h3 className="footer-logo-text">Heritage Archive</h3>
            </div>
            
            <p className="footer-description">
              Preserving and protecting historical and cultural heritage books through secure digital formats, making them accessible globally for future generations.
            </p>
            
            <div className="footer-social">
              <a 
                href="https://facebook.com" 
                className="footer-social-btn facebook" 
                aria-label="Facebook"
              >
                <Facebook className="footer-social-icon" />
              </a>
              <a 
                href="https://twitter.com" 
                className="footer-social-btn twitter" 
                aria-label="Twitter"
              >
                <Twitter className="footer-social-icon" />
              </a>
              <a 
                href="https://instagram.com" 
                className="footer-social-btn instagram" 
                aria-label="Instagram"
              >
                <Instagram className="footer-social-icon" />
              </a>
              <a 
                href="https://linkedin.com" 
                className="footer-social-btn linkedin" 
                aria-label="LinkedIn"
              >
                <Linkedin className="footer-social-icon" />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section">
            <h4 className="footer-section-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <button className="footer-link" onClick={() => handleNavigation('catalog')}>
                  <ArrowRight className="w-3 h-3 mr-2" />
                  <span>Browse Books</span>
                </button>
              </li>
              <li>
                <button className="footer-link" onClick={() => handleNavigation('about')}>
                  <ArrowRight className="w-3 h-3 mr-2" />
                  <span>About Us</span>
                </button>
              </li>
              <li>
                <button className="footer-link" onClick={() => handleNavigation('contact')}>
                  <ArrowRight className="w-3 h-3 mr-2" />
                  <span>For Institutions</span>
                </button>
              </li>
              <li>
                <button className="footer-link" onClick={() => handleNavigation('contact')}>
                  <ArrowRight className="w-3 h-3 mr-2" />
                  <span>Research Partners</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="footer-section">
            <h4 className="footer-section-title">Support</h4>
            <ul className="footer-links">
              <li>
                <button className="footer-link" onClick={() => handleNavigation('catalog')}>
                  <HelpCircle className="w-3 h-3 mr-2" />
                  <span>Help Center</span>
                </button>
              </li>
              <li>
                <button className="footer-link" onClick={() => handleNavigation('contact')}>
                  <Mail className="w-3 h-3 mr-2" />
                  <span>Contact Support</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="footer-section">
            <h4 className="footer-section-title">Legal</h4>
            <ul className="footer-links">
              <li>
                <button className="footer-link" onClick={() => handleNavigation('contact')}>
                  <Shield className="w-3 h-3 mr-2" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button className="footer-link" onClick={() => handleNavigation('contact')}>
                  <FileText className="w-3 h-3 mr-2" />
                  <span>Terms of Service</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h4 className="footer-section-title">Contact Us</h4>
            <ul className="footer-contact-info">
              <li className="footer-contact-item">
                <MapPin className="footer-contact-icon" />
                <span className="footer-contact-text">
                  Bahir Dar BiT, Ethiopia<br />
                  P.O. Box 1234
                </span>
              </li>
              <li className="footer-contact-item">
                <Phone className="footer-contact-icon" />
                <span className="footer-contact-text">+251 921 624 752</span>
              </li>
              <li className="footer-contact-item">
                <Mail className="footer-contact-icon" />
                <span className="footer-contact-text">getahunasefa277@gmail.com</span>
              </li>
              <li className="footer-contact-item">
                <Globe className="footer-contact-icon" />
                <span className="footer-contact-text">www.heritagearchive.org</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="footer-separator" />

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Heritage Archive. All rights reserved. Made with ❤️ for knowledge preservation.
          </p>
          <div className="footer-bottom-links">
            <a href="#" className="footer-bottom-link">
              <ExternalLink className="w-3 h-3 mr-1" />
              Accessibility
            </a>
            <a href="#" className="footer-bottom-link">
              <FileText className="w-3 h-3 mr-1" />
              Copyright Notice
            </a>
            <a href="#" className="footer-bottom-link">
              <Cookie className="w-3 h-3 mr-1" />
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
