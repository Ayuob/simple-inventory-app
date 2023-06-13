import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PurchaseOrderLineFormService } from './purchase-order-line-form.service';
import { PurchaseOrderLineService } from '../service/purchase-order-line.service';
import { IPurchaseOrderLine } from '../purchase-order-line.model';
import { IPurchaseOrder } from 'app/entities/purchase-order/purchase-order.model';
import { PurchaseOrderService } from 'app/entities/purchase-order/service/purchase-order.service';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';

import { PurchaseOrderLineUpdateComponent } from './purchase-order-line-update.component';

describe('PurchaseOrderLine Management Update Component', () => {
  let comp: PurchaseOrderLineUpdateComponent;
  let fixture: ComponentFixture<PurchaseOrderLineUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let purchaseOrderLineFormService: PurchaseOrderLineFormService;
  let purchaseOrderLineService: PurchaseOrderLineService;
  let purchaseOrderService: PurchaseOrderService;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PurchaseOrderLineUpdateComponent],
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
      .overrideTemplate(PurchaseOrderLineUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PurchaseOrderLineUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    purchaseOrderLineFormService = TestBed.inject(PurchaseOrderLineFormService);
    purchaseOrderLineService = TestBed.inject(PurchaseOrderLineService);
    purchaseOrderService = TestBed.inject(PurchaseOrderService);
    productService = TestBed.inject(ProductService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call PurchaseOrder query and add missing value', () => {
      const purchaseOrderLine: IPurchaseOrderLine = { id: 456 };
      const purchaseOrder: IPurchaseOrder = { id: 54473 };
      purchaseOrderLine.purchaseOrder = purchaseOrder;

      const purchaseOrderCollection: IPurchaseOrder[] = [{ id: 43364 }];
      jest.spyOn(purchaseOrderService, 'query').mockReturnValue(of(new HttpResponse({ body: purchaseOrderCollection })));
      const additionalPurchaseOrders = [purchaseOrder];
      const expectedCollection: IPurchaseOrder[] = [...additionalPurchaseOrders, ...purchaseOrderCollection];
      jest.spyOn(purchaseOrderService, 'addPurchaseOrderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ purchaseOrderLine });
      comp.ngOnInit();

      expect(purchaseOrderService.query).toHaveBeenCalled();
      expect(purchaseOrderService.addPurchaseOrderToCollectionIfMissing).toHaveBeenCalledWith(
        purchaseOrderCollection,
        ...additionalPurchaseOrders.map(expect.objectContaining)
      );
      expect(comp.purchaseOrdersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Product query and add missing value', () => {
      const purchaseOrderLine: IPurchaseOrderLine = { id: 456 };
      const product: IProduct = { id: 48188 };
      purchaseOrderLine.product = product;

      const productCollection: IProduct[] = [{ id: 96458 }];
      jest.spyOn(productService, 'query').mockReturnValue(of(new HttpResponse({ body: productCollection })));
      const additionalProducts = [product];
      const expectedCollection: IProduct[] = [...additionalProducts, ...productCollection];
      jest.spyOn(productService, 'addProductToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ purchaseOrderLine });
      comp.ngOnInit();

      expect(productService.query).toHaveBeenCalled();
      expect(productService.addProductToCollectionIfMissing).toHaveBeenCalledWith(
        productCollection,
        ...additionalProducts.map(expect.objectContaining)
      );
      expect(comp.productsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const purchaseOrderLine: IPurchaseOrderLine = { id: 456 };
      const purchaseOrder: IPurchaseOrder = { id: 19946 };
      purchaseOrderLine.purchaseOrder = purchaseOrder;
      const product: IProduct = { id: 68485 };
      purchaseOrderLine.product = product;

      activatedRoute.data = of({ purchaseOrderLine });
      comp.ngOnInit();

      expect(comp.purchaseOrdersSharedCollection).toContain(purchaseOrder);
      expect(comp.productsSharedCollection).toContain(product);
      expect(comp.purchaseOrderLine).toEqual(purchaseOrderLine);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPurchaseOrderLine>>();
      const purchaseOrderLine = { id: 123 };
      jest.spyOn(purchaseOrderLineFormService, 'getPurchaseOrderLine').mockReturnValue(purchaseOrderLine);
      jest.spyOn(purchaseOrderLineService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ purchaseOrderLine });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: purchaseOrderLine }));
      saveSubject.complete();

      // THEN
      expect(purchaseOrderLineFormService.getPurchaseOrderLine).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(purchaseOrderLineService.update).toHaveBeenCalledWith(expect.objectContaining(purchaseOrderLine));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPurchaseOrderLine>>();
      const purchaseOrderLine = { id: 123 };
      jest.spyOn(purchaseOrderLineFormService, 'getPurchaseOrderLine').mockReturnValue({ id: null });
      jest.spyOn(purchaseOrderLineService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ purchaseOrderLine: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: purchaseOrderLine }));
      saveSubject.complete();

      // THEN
      expect(purchaseOrderLineFormService.getPurchaseOrderLine).toHaveBeenCalled();
      expect(purchaseOrderLineService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPurchaseOrderLine>>();
      const purchaseOrderLine = { id: 123 };
      jest.spyOn(purchaseOrderLineService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ purchaseOrderLine });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(purchaseOrderLineService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('comparePurchaseOrder', () => {
      it('Should forward to purchaseOrderService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(purchaseOrderService, 'comparePurchaseOrder');
        comp.comparePurchaseOrder(entity, entity2);
        expect(purchaseOrderService.comparePurchaseOrder).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareProduct', () => {
      it('Should forward to productService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(productService, 'compareProduct');
        comp.compareProduct(entity, entity2);
        expect(productService.compareProduct).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
