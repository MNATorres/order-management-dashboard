import axios from 'axios';

export const fetchData = async (url: string): Promise<any> => {
  try {
    const response = await axios.get(`https://order-management-back.vercel.app/api${url}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data from URL: ${url}`);
  }
};

