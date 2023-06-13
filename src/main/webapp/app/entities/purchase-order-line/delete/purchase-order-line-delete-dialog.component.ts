import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPurchaseOrderLine } from '../purchase-order-line.model';
import { PurchaseOrderLineService } from '../service/purchase-order-line.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './purchase-order-line-delete-dialog.component.html',
})
export class PurchaseOrderLineDeleteDialogComponent {
  purchaseOrderLine?: IPurchaseOrderLine;

  constructor(protected purchaseOrderLineService: PurchaseOrderLineService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.purchaseOrderLineService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
