package ly.qubit.inventory.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link ly.qubit.inventory.domain.PurchaseOrder} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PurchaseOrderDTO implements Serializable {

    private Long id;

    private Instant orderDate;

    private SupplierDTO supplier;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Instant orderDate) {
        this.orderDate = orderDate;
    }

    public SupplierDTO getSupplier() {
        return supplier;
    }

    public void setSupplier(SupplierDTO supplier) {
        this.supplier = supplier;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PurchaseOrderDTO)) {
            return false;
        }

        PurchaseOrderDTO purchaseOrderDTO = (PurchaseOrderDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, purchaseOrderDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PurchaseOrderDTO{" +
            "id=" + getId() +
            ", orderDate='" + getOrderDate() + "'" +
            ", supplier=" + getSupplier() +
            "}";
    }
}
