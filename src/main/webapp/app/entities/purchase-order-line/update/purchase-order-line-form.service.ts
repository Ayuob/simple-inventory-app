import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPurchaseOrderLine, NewPurchaseOrderLine } from '../purchase-order-line.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPurchaseOrderLine for edit and NewPurchaseOrderLineFormGroupInput for create.
 */
type PurchaseOrderLineFormGroupInput = IPurchaseOrderLine | PartialWithRequiredKeyOf<NewPurchaseOrderLine>;

type PurchaseOrderLineFormDefaults = Pick<NewPurchaseOrderLine, 'id'>;

type PurchaseOrderLineFormGroupContent = {
  id: FormControl<IPurchaseOrderLine['id'] | NewPurchaseOrderLine['id']>;
  quantity: FormControl<IPurchaseOrderLine['quantity']>;
  price: FormControl<IPurchaseOrderLine['price']>;
  purchaseOrder: FormControl<IPurchaseOrderLine['purchaseOrder']>;
  product: FormControl<IPurchaseOrderLine['product']>;
};

export type PurchaseOrderLineFormGroup = FormGroup<PurchaseOrderLineFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PurchaseOrderLineFormService {
  createPurchaseOrderLineFormGroup(purchaseOrderLine: PurchaseOrderLineFormGroupInput = { id: null }): PurchaseOrderLineFormGroup {
    const purchaseOrderLineRawValue = {
      ...this.getFormDefaults(),
      ...purchaseOrderLine,
    };
    return new FormGroup<PurchaseOrderLineFormGroupContent>({
      id: new FormControl(
        { value: purchaseOrderLineRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      quantity: new FormControl(purchaseOrderLineRawValue.quantity),
      price: new FormControl(purchaseOrderLineRawValue.price),
      purchaseOrder: new FormControl(purchaseOrderLineRawValue.purchaseOrder),
      product: new FormControl(purchaseOrderLineRawValue.product),
    });
  }

  getPurchaseOrderLine(form: PurchaseOrderLineFormGroup): IPurchaseOrderLine | NewPurchaseOrderLine {
    return form.getRawValue() as IPurchaseOrderLine | NewPurchaseOrderLine;
  }

  resetForm(form: PurchaseOrderLineFormGroup, purchaseOrderLine: PurchaseOrderLineFormGroupInput): void {
    const purchaseOrderLineRawValue = { ...this.getFormDefaults(), ...purchaseOrderLine };
    form.reset(
      {
        ...purchaseOrderLineRawValue,
        id: { value: purchaseOrderLineRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PurchaseOrderLineFormDefaults {
    return {
      id: null,
    };
  }
}
