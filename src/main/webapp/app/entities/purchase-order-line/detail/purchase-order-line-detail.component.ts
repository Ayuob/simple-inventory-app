import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPurchaseOrderLine } from '../purchase-order-line.model';

@Component({
  selector: 'jhi-purchase-order-line-detail',
  templateUrl: './purchase-order-line-detail.component.html',
})
export class PurchaseOrderLineDetailComponent implements OnInit {
  purchaseOrderLine: IPurchaseOrderLine | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ purchaseOrderLine }) => {
      this.purchaseOrderLine = purchaseOrderLine;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
