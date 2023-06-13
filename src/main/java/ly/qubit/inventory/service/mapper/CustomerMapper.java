package ly.qubit.inventory.service.mapper;

import ly.qubit.inventory.domain.Customer;
import ly.qubit.inventory.service.dto.CustomerDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Customer} and its DTO {@link CustomerDTO}.
 */
@Mapper(componentModel = "spring")
public interface CustomerMapper extends EntityMapper<CustomerDTO, Customer> {}
