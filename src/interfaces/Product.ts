export interface SourcesProduct {
  idSourceProduct: string;
  source: string;
  kind: 'IMAGEN' | 'VIDEO';
  idProduct: string;
}

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
  related_sources: SourcesProduct[];
  created_at: string | Date;
  discount: number;
  starsPeople: number;
  colors: string;
}

export interface Colors {
  hex: string;
  disabled: boolean;
}

export interface ProductReview {
  idProductReviews: string;
  commentary: string;
  stars: number;
  created_at: Date | string;
  userName: string;
  avatar: string;
}
