import dayjs from 'dayjs/esm';

import { IPurchaseOrder, NewPurchaseOrder } from './purchase-order.model';

export const sampleWithRequiredData: IPurchaseOrder = {
  id: 1775,
};

export const sampleWithPartialData: IPurchaseOrder = {
  id: 22109,
  orderDate: dayjs('2023-06-12T14:51'),
};

export const sampleWithFullData: IPurchaseOrder = {
  id: 81332,
  orderDate: dayjs('2023-06-13T01:06'),
};

export const sampleWithNewData: NewPurchaseOrder = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
