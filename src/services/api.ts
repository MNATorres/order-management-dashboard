import axios from 'axios';


 export interface ProductData {
  id: number;
  title: string;
  description: string;
  url: string;
  price: string;
  quantity: number;
  _id:string;
};

export interface OrderData {
  id: number;
  createDate: string;
  status: string;
  client: string;
  shippingAddress: string;
  shippingPromise: string;
  _id: string;
  items: ProductData[];
}

export const fetchWithMock = async (url: string): Promise<any> => {
  try {
    const response = await axios.get(`http://localhost:3000${url}`);
    console.log(response)
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data from URL: ${url}`);
  }
};

