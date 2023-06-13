import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PurchaseOrderFormService } from './purchase-order-form.service';
import { PurchaseOrderService } from '../service/purchase-order.service';
import { IPurchaseOrder } from '../purchase-order.model';
import { ISupplier } from 'app/entities/supplier/supplier.model';
import { SupplierService } from 'app/entities/supplier/service/supplier.service';

import { PurchaseOrderUpdateComponent } from './purchase-order-update.component';

describe('PurchaseOrder Management Update Component', () => {
  let comp: PurchaseOrderUpdateComponent;
  let fixture: ComponentFixture<PurchaseOrderUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let purchaseOrderFormService: PurchaseOrderFormService;
  let purchaseOrderService: PurchaseOrderService;
  let supplierService: SupplierService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PurchaseOrderUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(PurchaseOrderUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PurchaseOrderUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    purchaseOrderFormService = TestBed.inject(PurchaseOrderFormService);
    purchaseOrderService = TestBed.inject(PurchaseOrderService);
    supplierService = TestBed.inject(SupplierService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Supplier query and add missing value', () => {
      const purchaseOrder: IPurchaseOrder = { id: 456 };
      const supplier: ISupplier = { id: 61649 };
      purchaseOrder.supplier = supplier;

      const supplierCollection: ISupplier[] = [{ id: 61359 }];
      jest.spyOn(supplierService, 'query').mockReturnValue(of(new HttpResponse({ body: supplierCollection })));
      const additionalSuppliers = [supplier];
      const expectedCollection: ISupplier[] = [...additionalSuppliers, ...supplierCollection];
      jest.spyOn(supplierService, 'addSupplierToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ purchaseOrder });
      comp.ngOnInit();

      expect(supplierService.query).toHaveBeenCalled();
      expect(supplierService.addSupplierToCollectionIfMissing).toHaveBeenCalledWith(
        supplierCollection,
        ...additionalSuppliers.map(expect.objectContaining)
      );
      expect(comp.suppliersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const purchaseOrder: IPurchaseOrder = { id: 456 };
      const supplier: ISupplier = { id: 25227 };
      purchaseOrder.supplier = supplier;

      activatedRoute.data = of({ purchaseOrder });
      comp.ngOnInit();

      expect(comp.suppliersSharedCollection).toContain(supplier);
      expect(comp.purchaseOrder).toEqual(purchaseOrder);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPurchaseOrder>>();
      const purchaseOrder = { id: 123 };
      jest.spyOn(purchaseOrderFormService, 'getPurchaseOrder').mockReturnValue(purchaseOrder);
      jest.spyOn(purchaseOrderService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ purchaseOrder });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: purchaseOrder }));
      saveSubject.complete();

      // THEN
      expect(purchaseOrderFormService.getPurchaseOrder).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(purchaseOrderService.update).toHaveBeenCalledWith(expect.objectContaining(purchaseOrder));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPurchaseOrder>>();
      const purchaseOrder = { id: 123 };
      jest.spyOn(purchaseOrderFormService, 'getPurchaseOrder').mockReturnValue({ id: null });
      jest.spyOn(purchaseOrderService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ purchaseOrder: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: purchaseOrder }));
      saveSubject.complete();

      // THEN
      expect(purchaseOrderFormService.getPurchaseOrder).toHaveBeenCalled();
      expect(purchaseOrderService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPurchaseOrder>>();
      const purchaseOrder = { id: 123 };
      jest.spyOn(purchaseOrderService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ purchaseOrder });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(purchaseOrderService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareSupplier', () => {
      it('Should forward to supplierService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(supplierService, 'compareSupplier');
        comp.compareSupplier(entity, entity2);
        expect(supplierService.compareSupplier).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
