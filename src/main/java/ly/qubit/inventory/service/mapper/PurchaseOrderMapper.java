package ly.qubit.inventory.service.mapper;

import ly.qubit.inventory.domain.PurchaseOrder;
import ly.qubit.inventory.domain.Supplier;
import ly.qubit.inventory.service.dto.PurchaseOrderDTO;
import ly.qubit.inventory.service.dto.SupplierDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link PurchaseOrder} and its DTO {@link PurchaseOrderDTO}.
 */
@Mapper(componentModel = "spring")
public interface PurchaseOrderMapper extends EntityMapper<PurchaseOrderDTO, PurchaseOrder> {
    @Mapping(target = "supplier", source = "supplier", qualifiedByName = "supplierSupplierName")
    PurchaseOrderDTO toDto(PurchaseOrder s);

    @Named("supplierSupplierName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "supplierName", source = "supplierName")
    SupplierDTO toDtoSupplierSupplierName(Supplier supplier);
}
