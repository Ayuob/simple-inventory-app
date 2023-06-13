import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPurchaseOrderLine } from '../purchase-order-line.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../purchase-order-line.test-samples';

import { PurchaseOrderLineService } from './purchase-order-line.service';

const requireRestSample: IPurchaseOrderLine = {
  ...sampleWithRequiredData,
};

describe('PurchaseOrderLine Service', () => {
  let service: PurchaseOrderLineService;
  let httpMock: HttpTestingController;
  let expectedResult: IPurchaseOrderLine | IPurchaseOrderLine[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PurchaseOrderLineService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a PurchaseOrderLine', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const purchaseOrderLine = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(purchaseOrderLine).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PurchaseOrderLine', () => {
      const purchaseOrderLine = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(purchaseOrderLine).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PurchaseOrderLine', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PurchaseOrderLine', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PurchaseOrderLine', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPurchaseOrderLineToCollectionIfMissing', () => {
      it('should add a PurchaseOrderLine to an empty array', () => {
        const purchaseOrderLine: IPurchaseOrderLine = sampleWithRequiredData;
        expectedResult = service.addPurchaseOrderLineToCollectionIfMissing([], purchaseOrderLine);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(purchaseOrderLine);
      });

      it('should not add a PurchaseOrderLine to an array that contains it', () => {
        const purchaseOrderLine: IPurchaseOrderLine = sampleWithRequiredData;
        const purchaseOrderLineCollection: IPurchaseOrderLine[] = [
          {
            ...purchaseOrderLine,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPurchaseOrderLineToCollectionIfMissing(purchaseOrderLineCollection, purchaseOrderLine);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PurchaseOrderLine to an array that doesn't contain it", () => {
        const purchaseOrderLine: IPurchaseOrderLine = sampleWithRequiredData;
        const purchaseOrderLineCollection: IPurchaseOrderLine[] = [sampleWithPartialData];
        expectedResult = service.addPurchaseOrderLineToCollectionIfMissing(purchaseOrderLineCollection, purchaseOrderLine);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(purchaseOrderLine);
      });

      it('should add only unique PurchaseOrderLine to an array', () => {
        const purchaseOrderLineArray: IPurchaseOrderLine[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const purchaseOrderLineCollection: IPurchaseOrderLine[] = [sampleWithRequiredData];
        expectedResult = service.addPurchaseOrderLineToCollectionIfMissing(purchaseOrderLineCollection, ...purchaseOrderLineArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const purchaseOrderLine: IPurchaseOrderLine = sampleWithRequiredData;
        const purchaseOrderLine2: IPurchaseOrderLine = sampleWithPartialData;
        expectedResult = service.addPurchaseOrderLineToCollectionIfMissing([], purchaseOrderLine, purchaseOrderLine2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(purchaseOrderLine);
        expect(expectedResult).toContain(purchaseOrderLine2);
      });

      it('should accept null and undefined values', () => {
        const purchaseOrderLine: IPurchaseOrderLine = sampleWithRequiredData;
        expectedResult = service.addPurchaseOrderLineToCollectionIfMissing([], null, purchaseOrderLine, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(purchaseOrderLine);
      });

      it('should return initial array if no PurchaseOrderLine is added', () => {
        const purchaseOrderLineCollection: IPurchaseOrderLine[] = [sampleWithRequiredData];
        expectedResult = service.addPurchaseOrderLineToCollectionIfMissing(purchaseOrderLineCollection, undefined, null);
        expect(expectedResult).toEqual(purchaseOrderLineCollection);
      });
    });

    describe('comparePurchaseOrderLine', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePurchaseOrderLine(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePurchaseOrderLine(entity1, entity2);
        const compareResult2 = service.comparePurchaseOrderLine(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePurchaseOrderLine(entity1, entity2);
        const compareResult2 = service.comparePurchaseOrderLine(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePurchaseOrderLine(entity1, entity2);
        const compareResult2 = service.comparePurchaseOrderLine(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
