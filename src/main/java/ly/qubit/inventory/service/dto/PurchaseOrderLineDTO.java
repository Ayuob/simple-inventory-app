package ly.qubit.inventory.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the {@link ly.qubit.inventory.domain.PurchaseOrderLine} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PurchaseOrderLineDTO implements Serializable {

    private Long id;

    private Integer quantity;

    private BigDecimal price;

    private PurchaseOrderDTO purchaseOrder;

    private ProductDTO product;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public PurchaseOrderDTO getPurchaseOrder() {
        return purchaseOrder;
    }

    public void setPurchaseOrder(PurchaseOrderDTO purchaseOrder) {
        this.purchaseOrder = purchaseOrder;
    }

    public ProductDTO getProduct() {
        return product;
    }

    public void setProduct(ProductDTO product) {
        this.product = product;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PurchaseOrderLineDTO)) {
            return false;
        }

        PurchaseOrderLineDTO purchaseOrderLineDTO = (PurchaseOrderLineDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, purchaseOrderLineDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PurchaseOrderLineDTO{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", price=" + getPrice() +
            ", purchaseOrder=" + getPurchaseOrder() +
            ", product=" + getProduct() +
            "}";
    }
}
