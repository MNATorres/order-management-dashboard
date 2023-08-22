// services/orderService.ts
import { OrderData } from "../domain/OrderData";
import { fetchWithMock } from "./api";

type OrderDataDto = Exclude<OrderData, "createDate"> & {
  createDate: number;
  shippingPromise: number;
};

export const getOrderList = async (): Promise<OrderData[]> => {
  const response = (await fetchWithMock("/orders")) as OrderDataDto[];
  return response.map((d) => ({
    ...d,
    createDate: new Date(d.createDate),
    shippingPromise: new Date(d.shippingPromise),
  }));
};
