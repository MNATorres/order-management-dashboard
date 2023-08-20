// services/api.js
import mockData from './../../public/mockData.json';

 export interface MockedProduct {
  id: number;
  title: string;
  description: string;
  url: string;
  price: string;
  quantity: number;
};

export interface MockedOrder {
  id: number;
  createDate: string;
  status: string;
  client: string;
  shippingAddress: string;
  shippingPromise: string;
  items: MockedProduct[];
}

export const fetchWithMock = async (url: string): Promise<any> => {
  if (url === '/orders') {
    const response = await Promise.resolve(mockData.orders as unknown as MockedOrder);
    return response;
  } else {
    throw new Error(`Unsupported URL: ${url}`);
  }
};

