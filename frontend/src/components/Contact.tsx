import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Mail, Phone, MapPin, BookPlus, Send, User, MessageSquare, HelpCircle, FileText, Shield } from 'lucide-react';
import { categories } from '../data/books';
import './Contact.css';

export function Contact() {
  const [formData, setFormData] = useState({
    name: 'getahun asefa',
    email: '',
    subject: 'general',
    message: '',
    bookTitle: '',
    bookAuthor: '',
    bookCategory: '',
    suggestionReason: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: 'general',
        message: '',
        bookTitle: '',
        bookAuthor: '',
        bookCategory: '',
        suggestionReason: ''
      });
    }, 3000);
  };

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        
        {/* Header */}
        <div className="contact-header">
          <h1 className="contact-title">Get In Touch</h1>
          <p className="contact-subtitle">
            Have questions, suggestions, or want to contribute to our digital heritage collection? 
            We're here to help and value every message.
          </p>
        </div>

        <div className="contact-grid">
          
          {/* Contact Information */}
          <div className="contact-info-section">
            <h2 className="contact-info-title">Contact Information</h2>
            <div className="contact-info-grid">
              <div className="contact-info-item">
                <div className="contact-info-icon-wrapper">
                  <Mail className="contact-info-icon" />
                </div>
                <div className="contact-info-content">
                  <p className="contact-info-label">Email</p>
                  <a href="mailto:getahunasefa277@gmail.com" className="contact-info-link">
                    getahunasefa277@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon-wrapper">
                  <Phone className="contact-info-icon" />
                </div>
                <div className="contact-info-content">
                  <p className="contact-info-label">Phone</p>
                  <a href="tel:+251921624752" className="contact-info-link">
                    +251 921 624 752
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon-wrapper">
                  <MapPin className="contact-info-icon" />
                </div>
                <div className="contact-info-content">
                  <p className="contact-info-label">Address</p>
                  <div className="contact-info-link">
                    Bahir Dar BiT, Ethiopia<br />
                    P.O. Box 1234
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Book Suggestion Form */}
          <div className="contact-suggestion-section">
            <div className="contact-suggestion-header">
              <BookPlus className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="contact-suggestion-title">Suggest a Book</h3>
                <p className="contact-suggestion-description">
                  Know a valuable heritage or educational book that should be digitized? 
                  Help us expand our collection by suggesting important cultural and historical materials.
                </p>
              </div>
            </div>
            
            <div className="contact-suggestion-form">
              <div className="contact-suggestion-field">
                <Label htmlFor="bookTitle" className="contact-suggestion-label">Book Title</Label>
                <Input
                  id="bookTitle"
                  type="text"
                  placeholder="Enter the book title"
                  value={formData.bookTitle}
                  onChange={(e) => setFormData({ ...formData, bookTitle: e.target.value })}
                  className="contact-form-input"
                />
              </div>

              <div className="contact-suggestion-field">
                <Label htmlFor="bookAuthor" className="contact-suggestion-label">Author Name</Label>
                <Input
                  id="bookAuthor"
                  type="text"
                  placeholder="Author or creator"
                  value={formData.bookAuthor}
                  onChange={(e) => setFormData({ ...formData, bookAuthor: e.target.value })}
                  className="contact-form-input"
                />
              </div>

              <div className="contact-suggestion-field">
                <Label htmlFor="bookCategory" className="contact-suggestion-label">Category</Label>
                <Select value={formData.bookCategory} onValueChange={(value) => setFormData({ ...formData, bookCategory: value })}>
                  <SelectTrigger className="contact-form-select">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(cat => cat !== 'All Categories').map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="contact-suggestion-field">
                <Label htmlFor="suggestionReason" className="contact-suggestion-label">Why should we add this book?</Label>
                <Textarea
                  id="suggestionReason"
                  placeholder="Explain the historical, cultural, or educational significance..."
                  value={formData.suggestionReason}
                  onChange={(e) => setFormData({ ...formData, suggestionReason: e.target.value })}
                  rows={3}
                  className="contact-form-textarea"
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <h2 className="contact-form-title">Send Us a Message</h2>
            
            {submitted ? (
              <div className="contact-success">
                <div className="contact-success-icon">
                  <Send className="contact-success-icon-inner" />
                </div>
                <h3 className="contact-success-title">Message Sent Successfully!</h3>
                <p className="contact-success-message">
                  Thank you for reaching out to Heritage Archive. We've received your message and will get back to you within 24-48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                
                {/* Name Field */}
                <div className="contact-form-field">
                  <Label htmlFor="name" className="contact-form-label">
                    <User className="w-4 h-4 mr-2" />
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="contact-form-input"
                  />
                </div>

                {/* Email Field */}
                <div className="contact-form-field">
                  <Label htmlFor="email" className="contact-form-label">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="contact-form-input"
                  />
                </div>

                {/* Subject Field */}
                <div className="contact-form-field">
                  <Label htmlFor="subject" className="contact-form-label">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Subject
                  </Label>
                  <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                    <SelectTrigger className="contact-form-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="suggestion">Book Suggestion</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message Field */}
                <div className="contact-form-field">
                  <Label htmlFor="message" className="contact-form-label">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Your Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    required
                    className="contact-form-textarea"
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="contact-submit-btn">
                  <Send className="contact-submit-icon" />
                  Send Message
                </Button>

                <p className="contact-form-note">
                  We typically respond within 24-48 hours during business days
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
