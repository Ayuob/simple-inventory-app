import { IPurchaseOrder } from 'app/entities/purchase-order/purchase-order.model';
import { IProduct } from 'app/entities/product/product.model';

export interface IPurchaseOrderLine {
  id: number;
  quantity?: number | null;
  price?: number | null;
  purchaseOrder?: Pick<IPurchaseOrder, 'id'> | null;
  product?: Pick<IProduct, 'id' | 'productName'> | null;
}

export type NewPurchaseOrderLine = Omit<IPurchaseOrderLine, 'id'> & { id: null };
