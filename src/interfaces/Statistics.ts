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

export interface TaskStatistics {
  progress: number;
}

export interface GraficoStatistics {
  fechas: string[];
  ventas: number[];
  comision: number[];
}

export interface Statistics {
  user: UserStatistics;
  order: OrderStatistics;
  task: TaskStatistics;
  grafico: GraficoStatistics;
  Amount: number;
  ComisionAmount: number;
}
export interface Received {
  total: number;
  received: string;
}

export interface Recommendation {
  total: number;
  recommendation: string;
}

export interface StatisticProduct {
  Received: Received[];
  Recommendation: Recommendation[];
}
