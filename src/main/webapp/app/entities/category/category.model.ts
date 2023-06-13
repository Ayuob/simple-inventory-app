export interface ICategory {
  id: number;
  categoryId?: number | null;
  categoryDescription?: string | null;
  productLine?: string | null;
}

export type NewCategory = Omit<ICategory, 'id'> & { id: null };
