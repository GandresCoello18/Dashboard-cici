import { Product } from './Product';

export interface NewCombo {
  idCombo: string;
  name: string;
  price: number;
  discount: number;
  active: boolean | number;
  sold: number;
  created_at?: Date | string;
}

export interface ProductsCombo extends NewCombo {
  products: Product[];
}
