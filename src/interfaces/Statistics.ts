export interface UserStatistics {
  user: number;
  totalUser: number;
  totalLasUser: number;
}

export interface OrderStatistics {
  order: number;
  totalOrders: number;
  totalLasOrders: number;
}

export interface Statistics {
  user: UserStatistics;
  order: OrderStatistics;
}
