import { Product } from './Product';

export interface NewCombos {
  idCombo: string;
  name: string;
  price: number;
  created_at: string | Date;
  discount: number;
  active: boolean | number;
  sold: number;
}

export interface ProductsCombo extends NewCombos {
  Products: Product[];
}
