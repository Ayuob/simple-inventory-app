import { ICustomer, NewCustomer } from './customer.model';

export const sampleWithRequiredData: ICustomer = {
  id: 24379,
  customerId: 'Operations',
};

export const sampleWithPartialData: ICustomer = {
  id: 44567,
  customerId: 'scalable',
  address: 'Namibia Cambridgeshire',
  city: 'North Ariel',
  state: 'Agent Cotton',
};

export const sampleWithFullData: ICustomer = {
  id: 63345,
  customerId: 'Estonia input withdrawal',
  company: 'Towels Market',
  address: 'Balanced withdrawal Maine',
  city: 'Corbinshire',
  state: 'transmitter Steel Awesome',
};

export const sampleWithNewData: NewCustomer = {
  customerId: 'parse',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
