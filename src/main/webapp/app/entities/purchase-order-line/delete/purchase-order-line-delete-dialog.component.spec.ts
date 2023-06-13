jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PurchaseOrderLineService } from '../service/purchase-order-line.service';

import { PurchaseOrderLineDeleteDialogComponent } from './purchase-order-line-delete-dialog.component';

describe('PurchaseOrderLine Management Delete Component', () => {
  let comp: PurchaseOrderLineDeleteDialogComponent;
  let fixture: ComponentFixture<PurchaseOrderLineDeleteDialogComponent>;
  let service: PurchaseOrderLineService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PurchaseOrderLineDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(PurchaseOrderLineDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PurchaseOrderLineDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PurchaseOrderLineService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      })
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
