import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IPurchaseOrderLine } from '../purchase-order-line.model';
import { PurchaseOrderLineService } from '../service/purchase-order-line.service';

import { PurchaseOrderLineRoutingResolveService } from './purchase-order-line-routing-resolve.service';

describe('PurchaseOrderLine routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: PurchaseOrderLineRoutingResolveService;
  let service: PurchaseOrderLineService;
  let resultPurchaseOrderLine: IPurchaseOrderLine | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(PurchaseOrderLineRoutingResolveService);
    service = TestBed.inject(PurchaseOrderLineService);
    resultPurchaseOrderLine = undefined;
  });

  describe('resolve', () => {
    it('should return IPurchaseOrderLine returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPurchaseOrderLine = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultPurchaseOrderLine).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPurchaseOrderLine = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultPurchaseOrderLine).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IPurchaseOrderLine>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPurchaseOrderLine = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultPurchaseOrderLine).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
