import { Product } from './Product';

export interface NewCombo {
  idCombo: string;
  name: string;
  price: number;
  discount: number;
  active: boolean | number;
  sold: number;
}

export interface ProductsCombo extends NewCombo {
  Products: Product[];
}
