export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  ingredients: string[];
  hairConcerns: string[];
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface Treatment {
  id: string;
  name: string;
  duration: number;
  price: number;
  benefits: string[];
  beforeImage: string;
  afterImage: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  image: string;
  quote: string;
  rating: number;
}