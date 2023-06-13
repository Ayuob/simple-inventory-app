package ly.qubit.inventory.service;

import java.util.Optional;
import ly.qubit.inventory.service.dto.OrderLineDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link ly.qubit.inventory.domain.OrderLine}.
 */
public interface OrderLineService {
    /**
     * Save a orderLine.
     *
     * @param orderLineDTO the entity to save.
     * @return the persisted entity.
     */
    OrderLineDTO save(OrderLineDTO orderLineDTO);

    /**
     * Updates a orderLine.
     *
     * @param orderLineDTO the entity to update.
     * @return the persisted entity.
     */
    OrderLineDTO update(OrderLineDTO orderLineDTO);

    /**
     * Partially updates a orderLine.
     *
     * @param orderLineDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<OrderLineDTO> partialUpdate(OrderLineDTO orderLineDTO);

    /**
     * Get all the orderLines.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<OrderLineDTO> findAll(Pageable pageable);

    /**
     * Get all the orderLines with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<OrderLineDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" orderLine.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<OrderLineDTO> findOne(Long id);

    /**
     * Delete the "id" orderLine.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
