export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  language: string;
  origin: string;
  category: string;
  description: string;
  coverImage: string;
  pages: number;
  institution: string;
  condition: string;
  digitalizedDate: string;
  rating?: number;
  totalRatings?: number;
}

export interface BookSuggestion {
  id: string;
  title: string;
  author: string;
  category: string;
  reason: string;
  suggestedBy: string;
  suggestedDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface AdminStats {
  totalBooks: number;
  recentUploads: number;
  pendingSuggestions: number;
  totalCategories: number;
}