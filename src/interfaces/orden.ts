export interface ProductOrden {
  source: string;
  title: string;
  quantity: number;
  price: number;
}

export interface UserOrden {
  avatar: string;
  userName: string;
  email: string;
}

export interface OrdenProduct {
  idOrder: string;
  created_at: string | Date;
  update_at: string | Date;
  shipping: number;
  discount: string;
  status: string;
  paymentMethod: string;
  paymentId: string;
  totalAmount: number;
  id_user_coupons: string;
  product: ProductOrden[];
  user: UserOrden;
}
