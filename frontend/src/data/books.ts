import { Book } from '../types';

export const heritageBooks: Book[] = [
  {
    id: '1',
    title: 'Islamic Golden Age Astronomy',
    author: 'Al-Biruni',
    year: 1025,
    language: 'Arabic',
    origin: 'Ghazni, Afghanistan',
    category: 'Scientific Texts',
    description: 'Comprehensive astronomical treatise including star charts, mathematical calculations, and observations of celestial phenomena.',
    coverImage: 'https://images.unsplash.com/photo-1633522966269-9d738ffc12b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpY2FsJTIwYXJjaGl2ZXxlbnwxfHx8fDE3NjAwNzY2MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    pages: 189,
    institution: 'Museum of Islamic Art',
    condition: 'Excellent',
    digitalizedDate: '2024-01-10',
    rating: 4.9,
    totalRatings: 203
  },
  {
    id: '2',
    title: 'Ethiopian Book of Hours',
    author: 'Monastic Community',
    year: 1520,
    language: 'Ge\'ez',
    origin: 'Lalibela, Ethiopia',
    category: 'Religious Manuscripts',
    description: 'Beautifully illustrated prayer book with distinctive Ethiopian Christian iconography and liturgical texts.',
    coverImage: 'https://images.unsplash.com/photo-1641946732576-94e61721d705?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBtb25hc3RlcnklMjBsaWJyYXJ5fGVufDF8fHx8MTc2MDA3NjYzNnww&ixlib=rb-4.1.0&q=80&w=1080',
    pages: 421,
    institution: 'Institute of Ethiopian Studies',
    condition: 'Fair - Requires Conservation',
    digitalizedDate: '2023-11-08',
    rating: 4.7,
    totalRatings: 156
  },
  {
    id: '3',
    title: 'Introduction to Computer Science',
    author: 'Dr. Sarah Mitchell',
    year: 2020,
    language: 'English',
    origin: 'United States',
    category: 'Education',
    description: 'Comprehensive guide to fundamental computer science concepts including algorithms, data structures, and programming principles.',
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGJvb2t8ZW58MXx8fHwxNzYwMDc2NjM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    pages: 456,
    institution: 'MIT OpenCourseWare',
    condition: 'Excellent - Digital Only',
    digitalizedDate: '2024-01-15',
    rating: 4.6,
    totalRatings: 324
  },
  {
    id: '4',
    title: 'Modern Physics Fundamentals',
    author: 'Prof. James Chen',
    year: 2019,
    language: 'English',
    origin: 'United Kingdom',
    category: 'Education',
    description: 'Educational textbook covering quantum mechanics, relativity, and contemporary physics for undergraduate students.',
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaHlzaWNzJTIwYm9va3xlbnwxfHx8fDE3NjAwNzY2Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    pages: 512,
    institution: 'Oxford University Press',
    condition: 'Excellent - Digital Only',
    digitalizedDate: '2024-02-20',
    rating: 4.7,
    totalRatings: 287
  },
  {
    id: '5',
    title: 'Microelectronics_Circuit_Analysis_And_Design_4th_Ed_Donald_A_Neamen',
    author: 'Donald A. Neamen',
    year: 2019,
    language: 'English',
    origin: 'Ethiopia',
    category: 'Education',
    description: 'Educational textbook covering quantum mechanics, relativity, and contemporary physics for undergraduate students.',
    coverImage: 'https://www.goodreads.com/book/show/6911949-microelectronics',
    pages: 1395,
    institution: 'Bahir dar University Press',
    condition: 'Excellent - Digital Only',
    digitalizedDate: '2024-02-20',
    rating: 4.7,
    totalRatings: 287
  }
];

export const categories = [
  'All Categories',
  'Religious Manuscripts',
  'Historical Records',
  'Scientific Texts',
  'Medical Texts',
  'Travel Literature',
  'Literature',
  'Archaeological Documents',
  'Education',
  'Cultural Heritage'
];

export const languages = [
  'All Languages',
  'Arabic',
  'Ge\'ez',
  'English',
];