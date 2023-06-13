import { IOrder } from 'app/entities/order/order.model';
import { IProduct } from 'app/entities/product/product.model';

export interface IOrderLine {
  id: number;
  quantity?: number | null;
  price?: number | null;
  order?: Pick<IOrder, 'id'> | null;
  product?: Pick<IProduct, 'id' | 'productName'> | null;
}

export type NewOrderLine = Omit<IOrderLine, 'id'> & { id: null };
