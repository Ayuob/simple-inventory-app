export interface ICustomer {
  id: number;
  customerId?: string | null;
  company?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
}

export type NewCustomer = Omit<ICustomer, 'id'> & { id: null };
