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
  const [sortBy, setSortBy] = useState('title');

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || book.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'All Languages' || book.language === selectedLanguage;
    
    return matchesSearch && matchesCategory && matchesLanguage;
  }).sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'author') {
      return a.author.localeCompare(b.author);
    } else if (sortBy === 'year') {
      return a.year - b.year;
    } else {
      return a.title.localeCompare(b.title);
    }
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
          
          {/* Sorting and Filters */}
          <div className="catalog-controls">
            <div className="catalog-filters">
              {/* Search positioned at top-right */}
              <div className="catalog-search-wrapper">
                <div className="filter-group">
                  <label className="filter-label">Search:</label>
                  <Input
                    placeholder="Search books..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>
              
              {/* Three column filters */}
              <div className="filter-group">
                <label className="filter-label">Category:</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    {selectedCategory || 'All Categories'}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Categories">All Categories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="filter-group">
                <label className="filter-label">Language:</label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    {selectedLanguage || 'All Languages'}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Languages">All Languages</SelectItem>
                    {languages.map(lang => (
                      <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="filter-group">
                <label className="filter-label">Sort by:</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    {sortBy === 'title' ? 'Title' : sortBy === 'author' ? 'Author' : 'Year'}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="author">Author</SelectItem>
                    <SelectItem value="year">Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
