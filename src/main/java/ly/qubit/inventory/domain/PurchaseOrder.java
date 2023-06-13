package ly.qubit.inventory.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A PurchaseOrder.
 */
@Entity
@Table(name = "purchase_order")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PurchaseOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "order_date")
    private Instant orderDate;

    @ManyToOne
    @JsonIgnoreProperties(value = { "purchaseOrders" }, allowSetters = true)
    private Supplier supplier;

    @OneToMany(mappedBy = "purchaseOrder")
    @JsonIgnoreProperties(value = { "purchaseOrder", "product" }, allowSetters = true)
    private Set<PurchaseOrderLine> purchaseOrderLines = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public PurchaseOrder id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getOrderDate() {
        return this.orderDate;
    }

    public PurchaseOrder orderDate(Instant orderDate) {
        this.setOrderDate(orderDate);
        return this;
    }

    public void setOrderDate(Instant orderDate) {
        this.orderDate = orderDate;
    }

    public Supplier getSupplier() {
        return this.supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public PurchaseOrder supplier(Supplier supplier) {
        this.setSupplier(supplier);
        return this;
    }

    public Set<PurchaseOrderLine> getPurchaseOrderLines() {
        return this.purchaseOrderLines;
    }

    public void setPurchaseOrderLines(Set<PurchaseOrderLine> purchaseOrderLines) {
        if (this.purchaseOrderLines != null) {
            this.purchaseOrderLines.forEach(i -> i.setPurchaseOrder(null));
        }
        if (purchaseOrderLines != null) {
            purchaseOrderLines.forEach(i -> i.setPurchaseOrder(this));
        }
        this.purchaseOrderLines = purchaseOrderLines;
    }

    public PurchaseOrder purchaseOrderLines(Set<PurchaseOrderLine> purchaseOrderLines) {
        this.setPurchaseOrderLines(purchaseOrderLines);
        return this;
    }

    public PurchaseOrder addPurchaseOrderLine(PurchaseOrderLine purchaseOrderLine) {
        this.purchaseOrderLines.add(purchaseOrderLine);
        purchaseOrderLine.setPurchaseOrder(this);
        return this;
    }

    public PurchaseOrder removePurchaseOrderLine(PurchaseOrderLine purchaseOrderLine) {
        this.purchaseOrderLines.remove(purchaseOrderLine);
        purchaseOrderLine.setPurchaseOrder(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PurchaseOrder)) {
            return false;
        }
        return id != null && id.equals(((PurchaseOrder) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PurchaseOrder{" +
            "id=" + getId() +
            ", orderDate='" + getOrderDate() + "'" +
            "}";
    }
}
