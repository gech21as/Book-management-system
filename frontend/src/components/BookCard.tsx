import { Book } from '../types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, MapPin, BookOpen, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BookCardProps {
  book: Book;
  onViewDetails: (book: Book) => void;
}

export function BookCard({ book, onViewDetails }: BookCardProps) {
  return (
    <div className="group bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Cover Image */}
      <div className="aspect-[3/4] overflow-hidden bg-muted relative">
        <ImageWithFallback
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="gap-1">
            <BookOpen className="w-3 h-3" />
            Free
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="line-clamp-1 mb-1">{book.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">{book.author}</p>
        </div>

        {/* Rating */}
        {book.rating && (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{book.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({book.totalRatings})</span>
          </div>
        )}

        <div className="space-y-1.5 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>{book.year}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" />
            <span className="line-clamp-1">{book.origin}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {book.category}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {book.pages} pages
          </Badge>
        </div>

        <Button 
          onClick={() => onViewDetails(book)}
          className="w-full"
          variant="outline"
        >
          View Details
        </Button>
      </div>
    </div>
  );
}