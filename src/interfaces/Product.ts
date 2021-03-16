export interface Product {
  idProducts: string;
  title: string;
  source: string;
  price: number;
  status: string;
  description: string;
  available: number;
  sold: number;
  stars: number;
  brand: string;
  size: string;
  model: string;
  created_at: string | Date;
  discount: number;
  starsPeople: number;
}
