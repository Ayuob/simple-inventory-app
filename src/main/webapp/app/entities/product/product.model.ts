import { ICategory } from 'app/entities/category/category.model';

export interface IProduct {
  id: number;
  sku?: string | null;
  productName?: string | null;
  productSize?: number | null;
  price?: number | null;
  category?: Pick<ICategory, 'id' | 'categoryDescription'> | null;
}

export type NewProduct = Omit<IProduct, 'id'> & { id: null };
