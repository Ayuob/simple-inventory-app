package ly.qubit.inventory.service.mapper;

import ly.qubit.inventory.domain.Category;
import ly.qubit.inventory.service.dto.CategoryDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Category} and its DTO {@link CategoryDTO}.
 */
@Mapper(componentModel = "spring")
public interface CategoryMapper extends EntityMapper<CategoryDTO, Category> {}
