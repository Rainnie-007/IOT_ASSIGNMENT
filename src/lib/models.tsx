export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  is_published: boolean;
  detail: string;
  synopsis: string;
  genre: string;
}
export interface Coffee {
  id: number;
  name: string;
  description: string;
  price: number;
  is_available: boolean;
  quantity: number;
  notes: string;
  ordered_time: string;
}
 