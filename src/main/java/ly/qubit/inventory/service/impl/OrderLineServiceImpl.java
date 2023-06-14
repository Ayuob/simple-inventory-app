package ly.qubit.inventory.service.impl;

import java.math.BigDecimal;
import java.util.Optional;
import ly.qubit.inventory.domain.OrderLine;
import ly.qubit.inventory.repository.OrderLineRepository;
import ly.qubit.inventory.service.OrderLineService;
import ly.qubit.inventory.service.dto.OrderLineDTO;
import ly.qubit.inventory.service.mapper.OrderLineMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link OrderLine}.
 */
@Service
@Transactional
public class OrderLineServiceImpl implements OrderLineService {

    private final Logger log = LoggerFactory.getLogger(OrderLineServiceImpl.class);

    private final OrderLineRepository orderLineRepository;

    private final OrderLineMapper orderLineMapper;

    public OrderLineServiceImpl(OrderLineRepository orderLineRepository, OrderLineMapper orderLineMapper) {
        this.orderLineRepository = orderLineRepository;
        this.orderLineMapper = orderLineMapper;
    }

    @Override
    public OrderLineDTO save(OrderLineDTO orderLineDTO) {
        log.debug("Request to save OrderLine : {}", orderLineDTO);
        OrderLine orderLine = orderLineMapper.toEntity(orderLineDTO);
        orderLine.setPrice(orderLine.getProduct().getPrice().multiply(BigDecimal.valueOf(orderLine.getQuantity())));
        orderLine = orderLineRepository.save(orderLine);
        return orderLineMapper.toDto(orderLine);
    }

    @Override
    public OrderLineDTO update(OrderLineDTO orderLineDTO) {
        log.debug("Request to update OrderLine : {}", orderLineDTO);
        OrderLine orderLine = orderLineMapper.toEntity(orderLineDTO);
        orderLine = orderLineRepository.save(orderLine);
        return orderLineMapper.toDto(orderLine);
    }

    @Override
    public Optional<OrderLineDTO> partialUpdate(OrderLineDTO orderLineDTO) {
        log.debug("Request to partially update OrderLine : {}", orderLineDTO);

        return orderLineRepository
            .findById(orderLineDTO.getId())
            .map(existingOrderLine -> {
                orderLineMapper.partialUpdate(existingOrderLine, orderLineDTO);

                return existingOrderLine;
            })
            .map(orderLineRepository::save)
            .map(orderLineMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<OrderLineDTO> findAll(Pageable pageable) {
        log.debug("Request to get all OrderLines");
        return orderLineRepository.findAll(pageable).map(orderLineMapper::toDto);
    }

    public Page<OrderLineDTO> findAllWithEagerRelationships(Pageable pageable) {
        return orderLineRepository.findAllWithEagerRelationships(pageable).map(orderLineMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<OrderLineDTO> findOne(Long id) {
        log.debug("Request to get OrderLine : {}", id);
        return orderLineRepository.findOneWithEagerRelationships(id).map(orderLineMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete OrderLine : {}", id);
        orderLineRepository.deleteById(id);
    }
}
