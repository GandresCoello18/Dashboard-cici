export interface Customers {
  idUser: string;
  userName: string;
  email: string;
  created_at: string;
  isAdmin: number;
  avatar: string;
  provider: 'cici' | 'google';
  phone?: number | null;
  isBanner: number;
  ciciRank: number;
  validatedEmail: number;
}
