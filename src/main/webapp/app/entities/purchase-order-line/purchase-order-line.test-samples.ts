import { IPurchaseOrderLine, NewPurchaseOrderLine } from './purchase-order-line.model';

export const sampleWithRequiredData: IPurchaseOrderLine = {
  id: 96827,
};

export const sampleWithPartialData: IPurchaseOrderLine = {
  id: 18193,
  quantity: 81068,
  price: 89462,
};

export const sampleWithFullData: IPurchaseOrderLine = {
  id: 37268,
  quantity: 85356,
  price: 50503,
};

export const sampleWithNewData: NewPurchaseOrderLine = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
