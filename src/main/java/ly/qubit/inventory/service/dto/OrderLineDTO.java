package ly.qubit.inventory.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the {@link ly.qubit.inventory.domain.OrderLine} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class OrderLineDTO implements Serializable {

    private Long id;

    private Integer quantity;

    private BigDecimal price;

    private OrderDTO order;

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

    public OrderDTO getOrder() {
        return order;
    }

    public void setOrder(OrderDTO order) {
        this.order = order;
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
        if (!(o instanceof OrderLineDTO)) {
            return false;
        }

        OrderLineDTO orderLineDTO = (OrderLineDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, orderLineDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OrderLineDTO{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", price=" + getPrice() +
            ", order=" + getOrder() +
            ", product=" + getProduct() +
            "}";
    }
}
