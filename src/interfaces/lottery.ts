import { ProductCart } from './Product';

export interface Lottery {
  idLottery: string;
  idCart: string;
  created_at: string | Date;
  finish_at?: string | Date;
  winnerUser: string | null;
  status: 'Pending' | 'Complete';
  numberOfLottery: number;
}

export interface Winner {
  userName: string;
  avatar: string;
  email: string;
}

export interface ProductLottery extends Lottery {
  products: ProductCart[];
  winner: Winner;
}
