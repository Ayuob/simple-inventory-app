package ly.qubit.inventory.service.mapper;

import ly.qubit.inventory.domain.Category;
import ly.qubit.inventory.domain.Product;
import ly.qubit.inventory.service.dto.CategoryDTO;
import ly.qubit.inventory.service.dto.ProductDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Product} and its DTO {@link ProductDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProductMapper extends EntityMapper<ProductDTO, Product> {
    @Mapping(target = "category", source = "category", qualifiedByName = "categoryCategoryDescription")
    ProductDTO toDto(Product s);

    @Named("categoryCategoryDescription")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "categoryDescription", source = "categoryDescription")
    CategoryDTO toDtoCategoryCategoryDescription(Category category);
}
