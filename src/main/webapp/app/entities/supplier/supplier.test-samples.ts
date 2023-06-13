import { ISupplier, NewSupplier } from './supplier.model';

export const sampleWithRequiredData: ISupplier = {
  id: 7333,
};

export const sampleWithPartialData: ISupplier = {
  id: 59486,
  supplierName: 'Avon',
  address: 'enable Legacy',
};

export const sampleWithFullData: ISupplier = {
  id: 29840,
  supplierName: 'THX',
  address: 'Seamless PNG Forward',
  city: 'Port Nicola',
  contactEmail: 'Prairie Paradigm Ringgit',
  contactPhone: 'Bike',
};

export const sampleWithNewData: NewSupplier = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
