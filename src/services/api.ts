import axios from 'axios';

export const fetchData = async (url: string): Promise<any> => {
  try {
    const response = await axios.get(`http://localhost:3000/api${url}`);
    console.log(response)
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data from URL: ${url}`);
  }
};

