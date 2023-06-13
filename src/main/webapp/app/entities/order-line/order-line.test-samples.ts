import { IOrderLine, NewOrderLine } from './order-line.model';

export const sampleWithRequiredData: IOrderLine = {
  id: 13942,
};

export const sampleWithPartialData: IOrderLine = {
  id: 22866,
};

export const sampleWithFullData: IOrderLine = {
  id: 62523,
  quantity: 78913,
  price: 45770,
};

export const sampleWithNewData: NewOrderLine = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
