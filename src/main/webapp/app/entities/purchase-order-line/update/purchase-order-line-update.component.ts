import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PurchaseOrderLineFormService, PurchaseOrderLineFormGroup } from './purchase-order-line-form.service';
import { IPurchaseOrderLine } from '../purchase-order-line.model';
import { PurchaseOrderLineService } from '../service/purchase-order-line.service';
import { IPurchaseOrder } from 'app/entities/purchase-order/purchase-order.model';
import { PurchaseOrderService } from 'app/entities/purchase-order/service/purchase-order.service';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';

@Component({
  selector: 'jhi-purchase-order-line-update',
  templateUrl: './purchase-order-line-update.component.html',
})
export class PurchaseOrderLineUpdateComponent implements OnInit {
  isSaving = false;
  purchaseOrderLine: IPurchaseOrderLine | null = null;

  purchaseOrdersSharedCollection: IPurchaseOrder[] = [];
  productsSharedCollection: IProduct[] = [];

  editForm: PurchaseOrderLineFormGroup = this.purchaseOrderLineFormService.createPurchaseOrderLineFormGroup();

  constructor(
    protected purchaseOrderLineService: PurchaseOrderLineService,
    protected purchaseOrderLineFormService: PurchaseOrderLineFormService,
    protected purchaseOrderService: PurchaseOrderService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePurchaseOrder = (o1: IPurchaseOrder | null, o2: IPurchaseOrder | null): boolean =>
    this.purchaseOrderService.comparePurchaseOrder(o1, o2);

  compareProduct = (o1: IProduct | null, o2: IProduct | null): boolean => this.productService.compareProduct(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ purchaseOrderLine }) => {
      this.purchaseOrderLine = purchaseOrderLine;
      if (purchaseOrderLine) {
        this.updateForm(purchaseOrderLine);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const purchaseOrderLine = this.purchaseOrderLineFormService.getPurchaseOrderLine(this.editForm);
    if (purchaseOrderLine.id !== null) {
      this.subscribeToSaveResponse(this.purchaseOrderLineService.update(purchaseOrderLine));
    } else {
      this.subscribeToSaveResponse(this.purchaseOrderLineService.create(purchaseOrderLine));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPurchaseOrderLine>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(purchaseOrderLine: IPurchaseOrderLine): void {
    this.purchaseOrderLine = purchaseOrderLine;
    this.purchaseOrderLineFormService.resetForm(this.editForm, purchaseOrderLine);

    this.purchaseOrdersSharedCollection = this.purchaseOrderService.addPurchaseOrderToCollectionIfMissing<IPurchaseOrder>(
      this.purchaseOrdersSharedCollection,
      purchaseOrderLine.purchaseOrder
    );
    this.productsSharedCollection = this.productService.addProductToCollectionIfMissing<IProduct>(
      this.productsSharedCollection,
      purchaseOrderLine.product
    );
  }

  protected loadRelationshipsOptions(): void {
    this.purchaseOrderService
      .query()
      .pipe(map((res: HttpResponse<IPurchaseOrder[]>) => res.body ?? []))
      .pipe(
        map((purchaseOrders: IPurchaseOrder[]) =>
          this.purchaseOrderService.addPurchaseOrderToCollectionIfMissing<IPurchaseOrder>(
            purchaseOrders,
            this.purchaseOrderLine?.purchaseOrder
          )
        )
      )
      .subscribe((purchaseOrders: IPurchaseOrder[]) => (this.purchaseOrdersSharedCollection = purchaseOrders));

    this.productService
      .query()
      .pipe(map((res: HttpResponse<IProduct[]>) => res.body ?? []))
      .pipe(
        map((products: IProduct[]) =>
          this.productService.addProductToCollectionIfMissing<IProduct>(products, this.purchaseOrderLine?.product)
        )
      )
      .subscribe((products: IProduct[]) => (this.productsSharedCollection = products));
  }
}
