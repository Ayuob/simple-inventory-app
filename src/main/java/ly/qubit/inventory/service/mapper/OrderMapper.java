package ly.qubit.inventory.service.mapper;

import ly.qubit.inventory.domain.Customer;
import ly.qubit.inventory.domain.Order;
import ly.qubit.inventory.service.dto.CustomerDTO;
import ly.qubit.inventory.service.dto.OrderDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Order} and its DTO {@link OrderDTO}.
 */
@Mapper(componentModel = "spring")
public interface OrderMapper extends EntityMapper<OrderDTO, Order> {
    @Mapping(target = "customer", source = "customer", qualifiedByName = "customerCompany")
    OrderDTO toDto(Order s);

    @Named("customerCompany")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "company", source = "company")
    CustomerDTO toDtoCustomerCompany(Customer customer);
}
