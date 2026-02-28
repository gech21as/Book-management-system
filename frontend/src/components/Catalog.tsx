import { useState } from 'react';
import { Book } from '../types';
import { BookCard } from './BookCard';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Filter } from 'lucide-react';
import { categories, languages } from '../data/books';
import './Catalog.css';

interface CatalogProps {
  books: Book[];
  onViewDetails: (book: Book) => void;
}

export function Catalog({ books, onViewDetails }: CatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLanguage, setSelectedLanguage] = useState('All Languages');

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || book.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'All Languages' || book.language === selectedLanguage;

    return matchesSearch && matchesCategory && matchesLanguage;
  });

  return (
    <div className="catalog-container">
      <div className="catalog-wrapper">
        {/* Header */}
        <div className="catalog-header">
          <h1 className="catalog-title">Digital Library Collection</h1>
          <p className="catalog-subtitle">
            Explore {books.length} digitized heritage and educational books - all freely accessible
          </p>
        </div>

        {/* Search and Filters */}
        <div className="catalog-search-section">
          {/* Search Bar */}
          <div className="catalog-search-wrapper">
            <Search className="catalog-search-icon" />
            <Input
              placeholder="Search by title, author, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="catalog-search-input"
            />
          </div>

          {/* Filters */}
          <div className="catalog-filter-section">
            <div className="catalog-filter-row">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="catalog-filter-select">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="catalog-filter-select">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(language => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Categories');
                setSelectedLanguage('All Languages');
              }}
              className="catalog-clear-btn"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="catalog-results-count">
          <p className="catalog-results-text">
            Showing {filteredBooks.length} of {books.length} books
          </p>
        </div>

        {/* Book Grid */}
        {filteredBooks.length > 0 ? (
          <div className="catalog-book-grid">
            {filteredBooks.map(book => (
              <BookCard key={book.id} book={book} onViewDetails={onViewDetails} />
            ))}
          </div>
        ) : (
          <div className="catalog-empty-state">
            <Filter className="catalog-empty-icon" />
            <h3 className="catalog-empty-title">No books found</h3>
            <p className="catalog-empty-description">
              Try adjusting your search or filter criteria
            </p>
            <Button onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Categories');
              setSelectedLanguage('All Languages');
            }} className="catalog-empty-action-btn">
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
