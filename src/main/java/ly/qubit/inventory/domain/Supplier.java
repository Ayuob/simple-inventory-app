package ly.qubit.inventory.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Supplier.
 */
@Entity
@Table(name = "supplier")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Supplier implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "supplier_name")
    private String supplierName;

    @Column(name = "address")
    private String address;

    @Column(name = "city")
    private String city;

    @Column(name = "contact_email")
    private String contactEmail;

    @Column(name = "contact_phone")
    private String contactPhone;

    @OneToMany(mappedBy = "supplier")
    @JsonIgnoreProperties(value = { "supplier", "purchaseOrderLines" }, allowSetters = true)
    private Set<PurchaseOrder> purchaseOrders = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Supplier id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSupplierName() {
        return this.supplierName;
    }

    public Supplier supplierName(String supplierName) {
        this.setSupplierName(supplierName);
        return this;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public String getAddress() {
        return this.address;
    }

    public Supplier address(String address) {
        this.setAddress(address);
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return this.city;
    }

    public Supplier city(String city) {
        this.setCity(city);
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getContactEmail() {
        return this.contactEmail;
    }

    public Supplier contactEmail(String contactEmail) {
        this.setContactEmail(contactEmail);
        return this;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getContactPhone() {
        return this.contactPhone;
    }

    public Supplier contactPhone(String contactPhone) {
        this.setContactPhone(contactPhone);
        return this;
    }

    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }

    public Set<PurchaseOrder> getPurchaseOrders() {
        return this.purchaseOrders;
    }

    public void setPurchaseOrders(Set<PurchaseOrder> purchaseOrders) {
        if (this.purchaseOrders != null) {
            this.purchaseOrders.forEach(i -> i.setSupplier(null));
        }
        if (purchaseOrders != null) {
            purchaseOrders.forEach(i -> i.setSupplier(this));
        }
        this.purchaseOrders = purchaseOrders;
    }

    public Supplier purchaseOrders(Set<PurchaseOrder> purchaseOrders) {
        this.setPurchaseOrders(purchaseOrders);
        return this;
    }

    public Supplier addPurchaseOrder(PurchaseOrder purchaseOrder) {
        this.purchaseOrders.add(purchaseOrder);
        purchaseOrder.setSupplier(this);
        return this;
    }

    public Supplier removePurchaseOrder(PurchaseOrder purchaseOrder) {
        this.purchaseOrders.remove(purchaseOrder);
        purchaseOrder.setSupplier(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Supplier)) {
            return false;
        }
        return id != null && id.equals(((Supplier) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Supplier{" +
            "id=" + getId() +
            ", supplierName='" + getSupplierName() + "'" +
            ", address='" + getAddress() + "'" +
            ", city='" + getCity() + "'" +
            ", contactEmail='" + getContactEmail() + "'" +
            ", contactPhone='" + getContactPhone() + "'" +
            "}";
    }
}
