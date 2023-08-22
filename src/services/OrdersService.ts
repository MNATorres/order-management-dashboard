// services/orderService.ts
import { fetchWithMock, OrderData } from './api';

export const getOrderList = async (): Promise<OrderData[]> => {
  const response = await fetchWithMock('/orders');
  return response;
};
