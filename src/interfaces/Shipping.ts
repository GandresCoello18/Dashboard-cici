export interface NewShipping {
  idOrder: string;
  guide: string | null;
  method: string | null;
}
export interface Shipping {
  idShipping: string;
  idOrder: string;
  paymentId: string;
  created_at: string | Date;
  update_at: string | Date;
  status: string;
  guide: string;
  method: string;
  userName: string;
  avatar: string;
}
