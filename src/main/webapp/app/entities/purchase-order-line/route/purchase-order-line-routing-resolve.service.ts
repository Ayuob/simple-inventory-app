import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPurchaseOrderLine } from '../purchase-order-line.model';
import { PurchaseOrderLineService } from '../service/purchase-order-line.service';

@Injectable({ providedIn: 'root' })
export class PurchaseOrderLineRoutingResolveService implements Resolve<IPurchaseOrderLine | null> {
  constructor(protected service: PurchaseOrderLineService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPurchaseOrderLine | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((purchaseOrderLine: HttpResponse<IPurchaseOrderLine>) => {
          if (purchaseOrderLine.body) {
            return of(purchaseOrderLine.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
