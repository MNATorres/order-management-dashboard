// services/orderService.ts
import { fetchWithMock, MockedOrder } from './api';

export const getOrderList = async (): Promise<MockedOrder[]> => {
  const response = await fetchWithMock('/orders');
  return response;
};
