package ly.qubit.inventory.service.mapper;

import ly.qubit.inventory.domain.Product;
import ly.qubit.inventory.domain.PurchaseOrder;
import ly.qubit.inventory.domain.PurchaseOrderLine;
import ly.qubit.inventory.service.dto.ProductDTO;
import ly.qubit.inventory.service.dto.PurchaseOrderDTO;
import ly.qubit.inventory.service.dto.PurchaseOrderLineDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link PurchaseOrderLine} and its DTO {@link PurchaseOrderLineDTO}.
 */
@Mapper(componentModel = "spring")
public interface PurchaseOrderLineMapper extends EntityMapper<PurchaseOrderLineDTO, PurchaseOrderLine> {
    @Mapping(target = "purchaseOrder", source = "purchaseOrder", qualifiedByName = "purchaseOrderId")
    @Mapping(target = "product", source = "product", qualifiedByName = "productProductName")
    PurchaseOrderLineDTO toDto(PurchaseOrderLine s);

    @Named("purchaseOrderId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    PurchaseOrderDTO toDtoPurchaseOrderId(PurchaseOrder purchaseOrder);

    @Named("productProductName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "productName", source = "productName")
    ProductDTO toDtoProductProductName(Product product);
}
