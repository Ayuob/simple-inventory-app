package ly.qubit.inventory.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "sku", nullable = false)
    private String sku;

    @NotNull
    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "product_size")
    private Integer productSize;

    @NotNull
    @Column(name = "price", precision = 21, scale = 2, nullable = false)
    private BigDecimal price;

    @ManyToOne
    @JsonIgnoreProperties(value = { "products" }, allowSetters = true)
    private Category category;

    @OneToMany(mappedBy = "product")
    @JsonIgnoreProperties(value = { "order", "product" }, allowSetters = true)
    private Set<OrderLine> orderLines = new HashSet<>();

    @OneToMany(mappedBy = "product")
    @JsonIgnoreProperties(value = { "purchaseOrder", "product" }, allowSetters = true)
    private Set<PurchaseOrderLine> purchaseOrderLines = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Product id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSku() {
        return this.sku;
    }

    public Product sku(String sku) {
        this.setSku(sku);
        return this;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getProductName() {
        return this.productName;
    }

    public Product productName(String productName) {
        this.setProductName(productName);
        return this;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getProductSize() {
        return this.productSize;
    }

    public Product productSize(Integer productSize) {
        this.setProductSize(productSize);
        return this;
    }

    public void setProductSize(Integer productSize) {
        this.productSize = productSize;
    }

    public BigDecimal getPrice() {
        return this.price;
    }

    public Product price(BigDecimal price) {
        this.setPrice(price);
        return this;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Category getCategory() {
        return this.category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Product category(Category category) {
        this.setCategory(category);
        return this;
    }

    public Set<OrderLine> getOrderLines() {
        return this.orderLines;
    }

    public void setOrderLines(Set<OrderLine> orderLines) {
        if (this.orderLines != null) {
            this.orderLines.forEach(i -> i.setProduct(null));
        }
        if (orderLines != null) {
            orderLines.forEach(i -> i.setProduct(this));
        }
        this.orderLines = orderLines;
    }

    public Product orderLines(Set<OrderLine> orderLines) {
        this.setOrderLines(orderLines);
        return this;
    }

    public Product addOrderLine(OrderLine orderLine) {
        this.orderLines.add(orderLine);
        orderLine.setProduct(this);
        return this;
    }

    public Product removeOrderLine(OrderLine orderLine) {
        this.orderLines.remove(orderLine);
        orderLine.setProduct(null);
        return this;
    }

    public Set<PurchaseOrderLine> getPurchaseOrderLines() {
        return this.purchaseOrderLines;
    }

    public void setPurchaseOrderLines(Set<PurchaseOrderLine> purchaseOrderLines) {
        if (this.purchaseOrderLines != null) {
            this.purchaseOrderLines.forEach(i -> i.setProduct(null));
        }
        if (purchaseOrderLines != null) {
            purchaseOrderLines.forEach(i -> i.setProduct(this));
        }
        this.purchaseOrderLines = purchaseOrderLines;
    }

    public Product purchaseOrderLines(Set<PurchaseOrderLine> purchaseOrderLines) {
        this.setPurchaseOrderLines(purchaseOrderLines);
        return this;
    }

    public Product addPurchaseOrderLine(PurchaseOrderLine purchaseOrderLine) {
        this.purchaseOrderLines.add(purchaseOrderLine);
        purchaseOrderLine.setProduct(this);
        return this;
    }

    public Product removePurchaseOrderLine(PurchaseOrderLine purchaseOrderLine) {
        this.purchaseOrderLines.remove(purchaseOrderLine);
        purchaseOrderLine.setProduct(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", sku='" + getSku() + "'" +
            ", productName='" + getProductName() + "'" +
            ", productSize=" + getProductSize() +
            ", price=" + getPrice() +
            "}";
    }
}
