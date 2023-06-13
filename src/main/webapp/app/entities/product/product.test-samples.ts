import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 77672,
  sku: 'Customer-focused',
  productName: 'cross-platform Unbranded deposit',
  price: 49054,
};

export const sampleWithPartialData: IProduct = {
  id: 40139,
  sku: 'Table Health',
  productName: 'invoice bluetooth District',
  price: 72582,
};

export const sampleWithFullData: IProduct = {
  id: 2136,
  sku: 'Flats',
  productName: 'Island Plastic Incredible',
  productSize: 99151,
  price: 90500,
};

export const sampleWithNewData: NewProduct = {
  sku: 'Islands',
  productName: 'vertical policy neural',
  price: 36945,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
