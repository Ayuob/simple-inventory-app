package ly.qubit.inventory.service.mapper;

import ly.qubit.inventory.domain.Order;
import ly.qubit.inventory.domain.OrderLine;
import ly.qubit.inventory.domain.Product;
import ly.qubit.inventory.service.dto.OrderDTO;
import ly.qubit.inventory.service.dto.OrderLineDTO;
import ly.qubit.inventory.service.dto.ProductDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link OrderLine} and its DTO {@link OrderLineDTO}.
 */
@Mapper(componentModel = "spring")
public interface OrderLineMapper extends EntityMapper<OrderLineDTO, OrderLine> {
    @Mapping(target = "order", source = "order", qualifiedByName = "orderId")
    @Mapping(target = "product", source = "product", qualifiedByName = "productProductName")
    OrderLineDTO toDto(OrderLine s);

    @Named("orderId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    OrderDTO toDtoOrderId(Order order);

    @Named("productProductName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "productName", source = "productName")
    ProductDTO toDtoProductProductName(Product product);
}
