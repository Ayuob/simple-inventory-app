import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PurchaseOrderLineDetailComponent } from './purchase-order-line-detail.component';

describe('PurchaseOrderLine Management Detail Component', () => {
  let comp: PurchaseOrderLineDetailComponent;
  let fixture: ComponentFixture<PurchaseOrderLineDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseOrderLineDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ purchaseOrderLine: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PurchaseOrderLineDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PurchaseOrderLineDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load purchaseOrderLine on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.purchaseOrderLine).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
