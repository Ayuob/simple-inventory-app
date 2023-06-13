export interface ISupplier {
  id: number;
  supplierName?: string | null;
  address?: string | null;
  city?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
}

export type NewSupplier = Omit<ISupplier, 'id'> & { id: null };
