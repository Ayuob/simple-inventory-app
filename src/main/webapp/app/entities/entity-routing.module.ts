import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'category',
        data: { pageTitle: 'jhipsterSampleApplicationApp.category.home.title' },
        loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
      },
      {
        path: 'product',
        data: { pageTitle: 'jhipsterSampleApplicationApp.product.home.title' },
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
      },
      {
        path: 'customer',
        data: { pageTitle: 'jhipsterSampleApplicationApp.customer.home.title' },
        loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
      },
      {
        path: 'order',
        data: { pageTitle: 'jhipsterSampleApplicationApp.order.home.title' },
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
      },
      {
        path: 'order-line',
        data: { pageTitle: 'jhipsterSampleApplicationApp.orderLine.home.title' },
        loadChildren: () => import('./order-line/order-line.module').then(m => m.OrderLineModule),
      },
      {
        path: 'supplier',
        data: { pageTitle: 'jhipsterSampleApplicationApp.supplier.home.title' },
        loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule),
      },
      {
        path: 'purchase-order',
        data: { pageTitle: 'jhipsterSampleApplicationApp.purchaseOrder.home.title' },
        loadChildren: () => import('./purchase-order/purchase-order.module').then(m => m.PurchaseOrderModule),
      },
      {
        path: 'purchase-order-line',
        data: { pageTitle: 'jhipsterSampleApplicationApp.purchaseOrderLine.home.title' },
        loadChildren: () => import('./purchase-order-line/purchase-order-line.module').then(m => m.PurchaseOrderLineModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
