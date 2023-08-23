// services/orderService.ts
import { OrderData } from "../domain/OrderData";
import { Status } from "../domain/Status";
import { fetchData } from "./api";

type OrderDataDto = Exclude<OrderData, "createDate"> & {
  createDate: number;
  shippingPromise: number;
};

interface GetOrderListProps {
  status?: Status | undefined;
  startDate?: Date | undefined;
  endDate?: Date | undefined;
  nearExpiration?: Boolean | undefined;
}

export const getOrderList = async ({
  status,
  startDate,
  endDate,
  nearExpiration,
}: GetOrderListProps = {}): Promise<OrderData[]> => {
  let filters = status || startDate || endDate || nearExpiration ? `?` : "";
  if (filters) {
    filters += `${status ? `status=${status}&` : ""}${
      startDate ? `startDate=${startDate.getTime()}&` : ""
    }${endDate ? `endDate=${endDate.getTime()}` : ""}${nearExpiration ? `nearExpiration=${nearExpiration}` : ""}`;
  }
  const response = (await fetchData("/orders" + filters)) as OrderDataDto[];
  return response.map((d) => ({
    ...d,
    createDate: new Date(d.createDate),
    shippingPromise: new Date(d.shippingPromise),
  }));
};
