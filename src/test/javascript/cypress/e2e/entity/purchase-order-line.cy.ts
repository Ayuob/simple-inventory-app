import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('PurchaseOrderLine e2e test', () => {
  const purchaseOrderLinePageUrl = '/purchase-order-line';
  const purchaseOrderLinePageUrlPattern = new RegExp('/purchase-order-line(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const purchaseOrderLineSample = {};

  let purchaseOrderLine;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/purchase-order-lines+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/purchase-order-lines').as('postEntityRequest');
    cy.intercept('DELETE', '/api/purchase-order-lines/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (purchaseOrderLine) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/purchase-order-lines/${purchaseOrderLine.id}`,
      }).then(() => {
        purchaseOrderLine = undefined;
      });
    }
  });

  it('PurchaseOrderLines menu should load PurchaseOrderLines page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('purchase-order-line');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('PurchaseOrderLine').should('exist');
    cy.url().should('match', purchaseOrderLinePageUrlPattern);
  });

  describe('PurchaseOrderLine page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(purchaseOrderLinePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create PurchaseOrderLine page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/purchase-order-line/new$'));
        cy.getEntityCreateUpdateHeading('PurchaseOrderLine');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', purchaseOrderLinePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/purchase-order-lines',
          body: purchaseOrderLineSample,
        }).then(({ body }) => {
          purchaseOrderLine = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/purchase-order-lines+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/purchase-order-lines?page=0&size=20>; rel="last",<http://localhost/api/purchase-order-lines?page=0&size=20>; rel="first"',
              },
              body: [purchaseOrderLine],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(purchaseOrderLinePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details PurchaseOrderLine page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('purchaseOrderLine');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', purchaseOrderLinePageUrlPattern);
      });

      it('edit button click should load edit PurchaseOrderLine page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('PurchaseOrderLine');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', purchaseOrderLinePageUrlPattern);
      });

      it('edit button click should load edit PurchaseOrderLine page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('PurchaseOrderLine');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', purchaseOrderLinePageUrlPattern);
      });

      it('last delete button click should delete instance of PurchaseOrderLine', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('purchaseOrderLine').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', purchaseOrderLinePageUrlPattern);

        purchaseOrderLine = undefined;
      });
    });
  });

  describe('new PurchaseOrderLine page', () => {
    beforeEach(() => {
      cy.visit(`${purchaseOrderLinePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('PurchaseOrderLine');
    });

    it('should create an instance of PurchaseOrderLine', () => {
      cy.get(`[data-cy="quantity"]`).type('58882').should('have.value', '58882');

      cy.get(`[data-cy="price"]`).type('78535').should('have.value', '78535');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        purchaseOrderLine = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', purchaseOrderLinePageUrlPattern);
    });
  });
});
