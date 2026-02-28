import { Book } from '../types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  FileText, 
  Building2,
  BookOpen,
  Star
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BookDetailProps {
  book: Book;
  onBack: () => void;
  onStartReading: (book: Book) => void;
}

export function BookDetail({ book, onBack, onStartReading }: BookDetailProps) {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button variant="ghost" onClick={onBack} className="mb-6 gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Collection
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Book Cover */}
          <div>
            <div className="aspect-[3/4] rounded-xl overflow-hidden border shadow-lg bg-muted sticky top-24">
              <ImageWithFallback
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Book Information */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="gap-1 mb-4">
                <BookOpen className="w-3 h-3" /> Free Access
              </Badge>
              <h1 className="mt-4 mb-2">{book.title}</h1>
              <p className="text-xl text-muted-foreground">{book.author}</p>
              
              {/* Rating */}
              {book.rating && (
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.round(book.rating!) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {book.rating.toFixed(1)} ({book.totalRatings} ratings)
                  </span>
                </div>
              )}
            </div>

            <Separator />

            {/* Metadata */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Year</p>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <p>{book.year}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Language</p>
                <p>{book.language}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Origin</p>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <p>{book.origin}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Pages</p>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <p>{book.pages}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Category</p>
                <p>{book.category}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Institution</p>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm">{book.institution}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div className="space-y-2">
              <h3>About this Manuscript</h3>
              <p className="text-muted-foreground leading-relaxed">
                {book.description}
              </p>
            </div>

            {/* Condition */}
            <div className="space-y-2">
              <h3>Condition & Preservation</h3>
              <p className="text-muted-foreground">{book.condition}</p>
              <p className="text-sm text-muted-foreground">
                Digitalized on {new Date(book.digitalizedDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button size="lg" className="w-full gap-2" onClick={() => onStartReading(book)}>
                <BookOpen className="w-5 h-5" />
                Start Reading - Free Access
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                No registration required • Unlimited reading time
              </p>
            </div>

            {/* Info Notice */}
            <div className="bg-muted/50 border rounded-lg p-4 space-y-2">
              <h4>Free Digital Access</h4>
              <p className="text-sm text-muted-foreground">
                This book is freely available as part of our mission to preserve and share cultural heritage and educational materials with the global community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}