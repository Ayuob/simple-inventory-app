import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../purchase-order-line.test-samples';

import { PurchaseOrderLineFormService } from './purchase-order-line-form.service';

describe('PurchaseOrderLine Form Service', () => {
  let service: PurchaseOrderLineFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseOrderLineFormService);
  });

  describe('Service methods', () => {
    describe('createPurchaseOrderLineFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPurchaseOrderLineFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            quantity: expect.any(Object),
            price: expect.any(Object),
            purchaseOrder: expect.any(Object),
            product: expect.any(Object),
          })
        );
      });

      it('passing IPurchaseOrderLine should create a new form with FormGroup', () => {
        const formGroup = service.createPurchaseOrderLineFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            quantity: expect.any(Object),
            price: expect.any(Object),
            purchaseOrder: expect.any(Object),
            product: expect.any(Object),
          })
        );
      });
    });

    describe('getPurchaseOrderLine', () => {
      it('should return NewPurchaseOrderLine for default PurchaseOrderLine initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPurchaseOrderLineFormGroup(sampleWithNewData);

        const purchaseOrderLine = service.getPurchaseOrderLine(formGroup) as any;

        expect(purchaseOrderLine).toMatchObject(sampleWithNewData);
      });

      it('should return NewPurchaseOrderLine for empty PurchaseOrderLine initial value', () => {
        const formGroup = service.createPurchaseOrderLineFormGroup();

        const purchaseOrderLine = service.getPurchaseOrderLine(formGroup) as any;

        expect(purchaseOrderLine).toMatchObject({});
      });

      it('should return IPurchaseOrderLine', () => {
        const formGroup = service.createPurchaseOrderLineFormGroup(sampleWithRequiredData);

        const purchaseOrderLine = service.getPurchaseOrderLine(formGroup) as any;

        expect(purchaseOrderLine).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPurchaseOrderLine should not enable id FormControl', () => {
        const formGroup = service.createPurchaseOrderLineFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPurchaseOrderLine should disable id FormControl', () => {
        const formGroup = service.createPurchaseOrderLineFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
