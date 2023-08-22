import { ProductData } from "./ProductData";
import { Status } from "./Status";

export interface OrderData {
    id: number;
    createDate: Date;
    status: Status;
    client: string;
    shippingAddress: string;
    shippingPromise: Date;
    _id: string;
    items: ProductData[];
  }
