import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PurchaseOrderLineComponent } from '../list/purchase-order-line.component';
import { PurchaseOrderLineDetailComponent } from '../detail/purchase-order-line-detail.component';
import { PurchaseOrderLineUpdateComponent } from '../update/purchase-order-line-update.component';
import { PurchaseOrderLineRoutingResolveService } from './purchase-order-line-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const purchaseOrderLineRoute: Routes = [
  {
    path: '',
    component: PurchaseOrderLineComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PurchaseOrderLineDetailComponent,
    resolve: {
      purchaseOrderLine: PurchaseOrderLineRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PurchaseOrderLineUpdateComponent,
    resolve: {
      purchaseOrderLine: PurchaseOrderLineRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PurchaseOrderLineUpdateComponent,
    resolve: {
      purchaseOrderLine: PurchaseOrderLineRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(purchaseOrderLineRoute)],
  exports: [RouterModule],
})
export class PurchaseOrderLineRoutingModule {}
