export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  is_published: boolean;
  details: string;
  short_details: string;
  genre: string;
}
export interface Coffee {
  id: number;
  name: string;
  description: string;
  price: number;
  is_available: boolean;
}

export interface Order {
  id: number;
  order_date: Date;
  coffee_id: number;
  quantity: number;
  total_price: number;
  notes: string;
}
