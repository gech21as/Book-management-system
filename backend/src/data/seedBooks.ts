import { IBook } from '../models/Book';

export const seedBooks: Partial<IBook>[] = [
  {
    title: 'Islamic Golden Age Astronomy',
    author: 'Al-Biruni',
    year: 1025,
    language: 'Arabic',
    origin: 'Ghazni, Afghanistan',
    category: 'Scientific Texts',
    description: 'Comprehensive astronomical treatise including star charts, mathematical calculations, and observations of celestial phenomena.',
    coverImage: 'https://images.unsplash.com/photo-1633522966269-9d738ffc12b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    pages: 189,
    institution: 'Museum of Islamic Art',
    condition: 'Excellent',
    digitalizedDate: new Date('2024-01-10'),
    rating: 4.9,
    totalRatings: 203
  },
  {
    title: "Ethiopian Book of Hours",
    author: 'Monastic Community',
    year: 1520,
    language: "Ge'ez",
    origin: 'Lalibela, Ethiopia',
    category: 'Religious Manuscripts',
    description: 'Beautifully illustrated prayer book with distinctive Ethiopian Christian iconography and liturgical texts.',
    coverImage: 'https://images.unsplash.com/photo-1641946732576-94e61721d705?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    pages: 421,
    institution: 'Institute of Ethiopian Studies',
    condition: 'Fair - Requires Conservation',
    digitalizedDate: new Date('2023-11-08'),
    rating: 4.7,
    totalRatings: 156
  },
  {
    title: 'Introduction to Computer Science',
    author: 'Dr. Sarah Mitchell',
    year: 2020,
    language: 'English',
    origin: 'United States',
    category: 'Education',
    description: 'Comprehensive guide to fundamental computer science concepts including algorithms, data structures, and programming principles.',
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    pages: 456,
    institution: 'MIT OpenCourseWare',
    condition: 'Excellent - Digital Only',
    digitalizedDate: new Date('2024-01-15'),
    rating: 4.6,
    totalRatings: 324
  }
];
