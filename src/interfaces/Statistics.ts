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

export interface GraficoStatistics {
  fechas: string[];
  ventas: number[];
  comision: number[];
}

export interface Statistics {
  user: UserStatistics;
  order: OrderStatistics;
  grafico: GraficoStatistics;
  Amount: number;
  ComisionAmount: number;
}
