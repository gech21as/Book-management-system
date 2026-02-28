import { useState } from 'react';
import { Book } from '../types';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut,
  Maximize2,
  Star
} from 'lucide-react';

interface BookReaderProps {
  book: Book;
  onClose: () => void;
}

export function BookReader({ book, onClose }: BookReaderProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [userRating, setUserRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  const progress = (currentPage / book.pages) * 100;

  const handleRate = (rating: number) => {
    setUserRating(rating);
    setHasRated(true);
    console.log('User rated book:', rating);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onClose} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Exit Reader
              </Button>
              <div className="hidden md:block">
                <p className="text-sm">{book.title}</p>
                <p className="text-xs text-muted-foreground">{book.author}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Rating */}
              {!hasRated && (
                <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-muted">
                  <span className="text-xs mr-1">Rate:</span>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleRate(rating)}
                      className="hover:scale-110 transition-transform"
                    >
                      <Star className={`w-4 h-4 ${rating <= userRating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                    </button>
                  ))}
                </div>
              )}
              {hasRated && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-green-700 dark:text-green-300">Rated {userRating}/5</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reading Area */}
      <div className="h-[calc(100vh-140px)] overflow-auto bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Simulated Book Page */}
            <div 
              className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl p-12 min-h-[800px]"
              style={{ zoom: `${zoom}%` }}
            >
              {/* Page Content */}
              <div className="relative space-y-6">
                <div className="text-center mb-8">
                  <p className="text-sm text-muted-foreground">Page {currentPage} of {book.pages}</p>
                </div>
                
                <h2 className="text-center mb-8">
                  {currentPage === 1 ? book.title : `Chapter ${Math.floor(currentPage / 10) + 1}`}
                </h2>

                {/* Simulated text content */}
                <div className="space-y-4 text-justify leading-relaxed">
                  <p>
                    {currentPage === 1 && book.description}
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                  <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
                  </p>
                </div>

                {/* Page number footer */}
                <div className="text-center pt-12 text-sm text-muted-foreground">
                  — {currentPage} —
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="border-t bg-background">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Zoom Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoom(Math.max(50, zoom - 10))}
                disabled={zoom <= 50}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm w-12 text-center">{zoom}%</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoom(Math.min(200, zoom + 10))}
                disabled={zoom >= 200}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>

            {/* Page Navigation */}
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex-1 space-y-1">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-center text-muted-foreground">
                  {currentPage} / {book.pages}
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(book.pages, currentPage + 1))}
                disabled={currentPage === book.pages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Fullscreen */}
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}