export interface Coupon {
  idCoupon: string;
  type: string;
  descripcion: string;
  status: string;
}

export interface CouponsAssing {
  id_user_coupons: string;
  expiration_date: string | Date;
  created_at: string | Date;
  type: string | null;
  status: string;
  userName: string | null;
  avatar: string | null;
  user_name_invita: string | null;
  user_avatar_invita: string | null;
}

export interface CouponAmount {
  type: string;
  cantidad: number;
}
