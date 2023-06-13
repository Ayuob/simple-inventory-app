import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPurchaseOrderLine, NewPurchaseOrderLine } from '../purchase-order-line.model';

export type PartialUpdatePurchaseOrderLine = Partial<IPurchaseOrderLine> & Pick<IPurchaseOrderLine, 'id'>;

export type EntityResponseType = HttpResponse<IPurchaseOrderLine>;
export type EntityArrayResponseType = HttpResponse<IPurchaseOrderLine[]>;

@Injectable({ providedIn: 'root' })
export class PurchaseOrderLineService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/purchase-order-lines');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(purchaseOrderLine: NewPurchaseOrderLine): Observable<EntityResponseType> {
    return this.http.post<IPurchaseOrderLine>(this.resourceUrl, purchaseOrderLine, { observe: 'response' });
  }

  update(purchaseOrderLine: IPurchaseOrderLine): Observable<EntityResponseType> {
    return this.http.put<IPurchaseOrderLine>(
      `${this.resourceUrl}/${this.getPurchaseOrderLineIdentifier(purchaseOrderLine)}`,
      purchaseOrderLine,
      { observe: 'response' }
    );
  }

  partialUpdate(purchaseOrderLine: PartialUpdatePurchaseOrderLine): Observable<EntityResponseType> {
    return this.http.patch<IPurchaseOrderLine>(
      `${this.resourceUrl}/${this.getPurchaseOrderLineIdentifier(purchaseOrderLine)}`,
      purchaseOrderLine,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPurchaseOrderLine>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPurchaseOrderLine[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPurchaseOrderLineIdentifier(purchaseOrderLine: Pick<IPurchaseOrderLine, 'id'>): number {
    return purchaseOrderLine.id;
  }

  comparePurchaseOrderLine(o1: Pick<IPurchaseOrderLine, 'id'> | null, o2: Pick<IPurchaseOrderLine, 'id'> | null): boolean {
    return o1 && o2 ? this.getPurchaseOrderLineIdentifier(o1) === this.getPurchaseOrderLineIdentifier(o2) : o1 === o2;
  }

  addPurchaseOrderLineToCollectionIfMissing<Type extends Pick<IPurchaseOrderLine, 'id'>>(
    purchaseOrderLineCollection: Type[],
    ...purchaseOrderLinesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const purchaseOrderLines: Type[] = purchaseOrderLinesToCheck.filter(isPresent);
    if (purchaseOrderLines.length > 0) {
      const purchaseOrderLineCollectionIdentifiers = purchaseOrderLineCollection.map(
        purchaseOrderLineItem => this.getPurchaseOrderLineIdentifier(purchaseOrderLineItem)!
      );
      const purchaseOrderLinesToAdd = purchaseOrderLines.filter(purchaseOrderLineItem => {
        const purchaseOrderLineIdentifier = this.getPurchaseOrderLineIdentifier(purchaseOrderLineItem);
        if (purchaseOrderLineCollectionIdentifiers.includes(purchaseOrderLineIdentifier)) {
          return false;
        }
        purchaseOrderLineCollectionIdentifiers.push(purchaseOrderLineIdentifier);
        return true;
      });
      return [...purchaseOrderLinesToAdd, ...purchaseOrderLineCollection];
    }
    return purchaseOrderLineCollection;
  }
}
