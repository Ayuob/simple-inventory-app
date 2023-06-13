import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PurchaseOrderLineComponent } from './list/purchase-order-line.component';
import { PurchaseOrderLineDetailComponent } from './detail/purchase-order-line-detail.component';
import { PurchaseOrderLineUpdateComponent } from './update/purchase-order-line-update.component';
import { PurchaseOrderLineDeleteDialogComponent } from './delete/purchase-order-line-delete-dialog.component';
import { PurchaseOrderLineRoutingModule } from './route/purchase-order-line-routing.module';

@NgModule({
  imports: [SharedModule, PurchaseOrderLineRoutingModule],
  declarations: [
    PurchaseOrderLineComponent,
    PurchaseOrderLineDetailComponent,
    PurchaseOrderLineUpdateComponent,
    PurchaseOrderLineDeleteDialogComponent,
  ],
})
export class PurchaseOrderLineModule {}
