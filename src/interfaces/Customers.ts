export interface Customers {
  idUser: string;
  userName: string;
  email: string;
  created_at: string;
  isAdmin: boolean;
  avatar: string;
  provider: 'cici' | 'google';
}
