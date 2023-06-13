import { ICategory, NewCategory } from './category.model';

export const sampleWithRequiredData: ICategory = {
  id: 2529,
  categoryId: 65994,
};

export const sampleWithPartialData: ICategory = {
  id: 14860,
  categoryId: 7305,
  categoryDescription: 'uniform',
  productLine: 'Clothing navigate gold',
};

export const sampleWithFullData: ICategory = {
  id: 97365,
  categoryId: 85301,
  categoryDescription: 'synthesizing Directives',
  productLine: 'navigating',
};

export const sampleWithNewData: NewCategory = {
  categoryId: 54514,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
