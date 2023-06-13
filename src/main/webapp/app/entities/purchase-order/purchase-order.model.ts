import dayjs from 'dayjs/esm';
import { ISupplier } from 'app/entities/supplier/supplier.model';

export interface IPurchaseOrder {
  id: number;
  orderDate?: dayjs.Dayjs | null;
  supplier?: Pick<ISupplier, 'id' | 'supplierName'> | null;
}

export type NewPurchaseOrder = Omit<IPurchaseOrder, 'id'> & { id: null };
