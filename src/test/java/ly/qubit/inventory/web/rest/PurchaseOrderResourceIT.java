package ly.qubit.inventory.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import ly.qubit.inventory.IntegrationTest;
import ly.qubit.inventory.domain.PurchaseOrder;
import ly.qubit.inventory.repository.PurchaseOrderRepository;
import ly.qubit.inventory.service.PurchaseOrderService;
import ly.qubit.inventory.service.dto.PurchaseOrderDTO;
import ly.qubit.inventory.service.mapper.PurchaseOrderMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link PurchaseOrderResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class PurchaseOrderResourceIT {

    private static final Instant DEFAULT_ORDER_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ORDER_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/purchase-orders";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PurchaseOrderRepository purchaseOrderRepository;

    @Mock
    private PurchaseOrderRepository purchaseOrderRepositoryMock;

    @Autowired
    private PurchaseOrderMapper purchaseOrderMapper;

    @Mock
    private PurchaseOrderService purchaseOrderServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPurchaseOrderMockMvc;

    private PurchaseOrder purchaseOrder;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PurchaseOrder createEntity(EntityManager em) {
        PurchaseOrder purchaseOrder = new PurchaseOrder().orderDate(DEFAULT_ORDER_DATE);
        return purchaseOrder;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PurchaseOrder createUpdatedEntity(EntityManager em) {
        PurchaseOrder purchaseOrder = new PurchaseOrder().orderDate(UPDATED_ORDER_DATE);
        return purchaseOrder;
    }

    @BeforeEach
    public void initTest() {
        purchaseOrder = createEntity(em);
    }

    @Test
    @Transactional
    void createPurchaseOrder() throws Exception {
        int databaseSizeBeforeCreate = purchaseOrderRepository.findAll().size();
        // Create the PurchaseOrder
        PurchaseOrderDTO purchaseOrderDTO = purchaseOrderMapper.toDto(purchaseOrder);
        restPurchaseOrderMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(purchaseOrderDTO))
            )
            .andExpect(status().isCreated());

        // Validate the PurchaseOrder in the database
        List<PurchaseOrder> purchaseOrderList = purchaseOrderRepository.findAll();
        assertThat(purchaseOrderList).hasSize(databaseSizeBeforeCreate + 1);
        PurchaseOrder testPurchaseOrder = purchaseOrderList.get(purchaseOrderList.size() - 1);
        assertThat(testPurchaseOrder.getOrderDate()).isEqualTo(DEFAULT_ORDER_DATE);
    }

    @Test
    @Transactional
    void createPurchaseOrderWithExistingId() throws Exception {
        // Create the PurchaseOrder with an existing ID
        purchaseOrder.setId(1L);
        PurchaseOrderDTO purchaseOrderDTO = purchaseOrderMapper.toDto(purchaseOrder);

        int databaseSizeBeforeCreate = purchaseOrderRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPurchaseOrderMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(purchaseOrderDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PurchaseOrder in the database
        List<PurchaseOrder> purchaseOrderList = purchaseOrderRepository.findAll();
        assertThat(purchaseOrderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllPurchaseOrders() throws Exception {
        // Initialize the database
        purchaseOrderRepository.saveAndFlush(purchaseOrder);

        // Get all the purchaseOrderList
        restPurchaseOrderMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(purchaseOrder.getId().intValue())))
            .andExpect(jsonPath("$.[*].orderDate").value(hasItem(DEFAULT_ORDER_DATE.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPurchaseOrdersWithEagerRelationshipsIsEnabled() throws Exception {
        when(purchaseOrderServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPurchaseOrderMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(purchaseOrderServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPurchaseOrdersWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(purchaseOrderServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPurchaseOrderMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(purchaseOrderRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getPurchaseOrder() throws Exception {
        // Initialize the database
        purchaseOrderRepository.saveAndFlush(purchaseOrder);

        // Get the purchaseOrder
        restPurchaseOrderMockMvc
            .perform(get(ENTITY_API_URL_ID, purchaseOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(purchaseOrder.getId().intValue()))
            .andExpect(jsonPath("$.orderDate").value(DEFAULT_ORDER_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingPurchaseOrder() throws Exception {
        // Get the purchaseOrder
        restPurchaseOrderMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingPurchaseOrder() throws Exception {
        // Initialize the database
        purchaseOrderRepository.saveAndFlush(purchaseOrder);

        int databaseSizeBeforeUpdate = purchaseOrderRepository.findAll().size();

        // Update the purchaseOrder
        PurchaseOrder updatedPurchaseOrder = purchaseOrderRepository.findById(purchaseOrder.getId()).get();
        // Disconnect from session so that the updates on updatedPurchaseOrder are not directly saved in db
        em.detach(updatedPurchaseOrder);
        updatedPurchaseOrder.orderDate(UPDATED_ORDER_DATE);
        PurchaseOrderDTO purchaseOrderDTO = purchaseOrderMapper.toDto(updatedPurchaseOrder);

        restPurchaseOrderMockMvc
            .perform(
                put(ENTITY_API_URL_ID, purchaseOrderDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(purchaseOrderDTO))
            )
            .andExpect(status().isOk());

        // Validate the PurchaseOrder in the database
        List<PurchaseOrder> purchaseOrderList = purchaseOrderRepository.findAll();
        assertThat(purchaseOrderList).hasSize(databaseSizeBeforeUpdate);
        PurchaseOrder testPurchaseOrder = purchaseOrderList.get(purchaseOrderList.size() - 1);
        assertThat(testPurchaseOrder.getOrderDate()).isEqualTo(UPDATED_ORDER_DATE);
    }

    @Test
    @Transactional
    void putNonExistingPurchaseOrder() throws Exception {
        int databaseSizeBeforeUpdate = purchaseOrderRepository.findAll().size();
        purchaseOrder.setId(count.incrementAndGet());

        // Create the PurchaseOrder
        PurchaseOrderDTO purchaseOrderDTO = purchaseOrderMapper.toDto(purchaseOrder);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPurchaseOrderMockMvc
            .perform(
                put(ENTITY_API_URL_ID, purchaseOrderDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(purchaseOrderDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PurchaseOrder in the database
        List<PurchaseOrder> purchaseOrderList = purchaseOrderRepository.findAll();
        assertThat(purchaseOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPurchaseOrder() throws Exception {
        int databaseSizeBeforeUpdate = purchaseOrderRepository.findAll().size();
        purchaseOrder.setId(count.incrementAndGet());

        // Create the PurchaseOrder
        PurchaseOrderDTO purchaseOrderDTO = purchaseOrderMapper.toDto(purchaseOrder);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPurchaseOrderMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(purchaseOrderDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PurchaseOrder in the database
        List<PurchaseOrder> purchaseOrderList = purchaseOrderRepository.findAll();
        assertThat(purchaseOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPurchaseOrder() throws Exception {
        int databaseSizeBeforeUpdate = purchaseOrderRepository.findAll().size();
        purchaseOrder.setId(count.incrementAndGet());

        // Create the PurchaseOrder
        PurchaseOrderDTO purchaseOrderDTO = purchaseOrderMapper.toDto(purchaseOrder);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPurchaseOrderMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(purchaseOrderDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PurchaseOrder in the database
        List<PurchaseOrder> purchaseOrderList = purchaseOrderRepository.findAll();
        assertThat(purchaseOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePurchaseOrderWithPatch() throws Exception {
        // Initialize the database
        purchaseOrderRepository.saveAndFlush(purchaseOrder);

        int databaseSizeBeforeUpdate = purchaseOrderRepository.findAll().size();

        // Update the purchaseOrder using partial update
        PurchaseOrder partialUpdatedPurchaseOrder = new PurchaseOrder();
        partialUpdatedPurchaseOrder.setId(purchaseOrder.getId());

        restPurchaseOrderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPurchaseOrder.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPurchaseOrder))
            )
            .andExpect(status().isOk());

        // Validate the PurchaseOrder in the database
        List<PurchaseOrder> purchaseOrderList = purchaseOrderRepository.findAll();
        assertThat(purchaseOrderList).hasSize(databaseSizeBeforeUpdate);
        PurchaseOrder testPurchaseOrder = purchaseOrderList.get(purchaseOrderList.size() - 1);
        assertThat(testPurchaseOrder.getOrderDate()).isEqualTo(DEFAULT_ORDER_DATE);
    }

    @Test
    @Transactional
    void fullUpdatePurchaseOrderWithPatch() throws Exception {
        // Initialize the database
        purchaseOrderRepository.saveAndFlush(purchaseOrder);

        int databaseSizeBeforeUpdate = purchaseOrderRepository.findAll().size();

        // Update the purchaseOrder using partial update
        PurchaseOrder partialUpdatedPurchaseOrder = new PurchaseOrder();
        partialUpdatedPurchaseOrder.setId(purchaseOrder.getId());

        partialUpdatedPurchaseOrder.orderDate(UPDATED_ORDER_DATE);

        restPurchaseOrderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPurchaseOrder.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPurchaseOrder))
            )
            .andExpect(status().isOk());

        // Validate the PurchaseOrder in the database
        List<PurchaseOrder> purchaseOrderList = purchaseOrderRepository.findAll();
        assertThat(purchaseOrderList).hasSize(databaseSizeBeforeUpdate);
        PurchaseOrder testPurchaseOrder = purchaseOrderList.get(purchaseOrderList.size() - 1);
        assertThat(testPurchaseOrder.getOrderDate()).isEqualTo(UPDATED_ORDER_DATE);
    }

    @Test
    @Transactional
    void patchNonExistingPurchaseOrder() throws Exception {
        int databaseSizeBeforeUpdate = purchaseOrderRepository.findAll().size();
        purchaseOrder.setId(count.incrementAndGet());

        // Create the PurchaseOrder
        PurchaseOrderDTO purchaseOrderDTO = purchaseOrderMapper.toDto(purchaseOrder);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPurchaseOrderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, purchaseOrderDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(purchaseOrderDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PurchaseOrder in the database
        List<PurchaseOrder> purchaseOrderList = purchaseOrderRepository.findAll();
        assertThat(purchaseOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPurchaseOrder() throws Exception {
        int databaseSizeBeforeUpdate = purchaseOrderRepository.findAll().size();
        purchaseOrder.setId(count.incrementAndGet());

        // Create the PurchaseOrder
        PurchaseOrderDTO purchaseOrderDTO = purchaseOrderMapper.toDto(purchaseOrder);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPurchaseOrderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(purchaseOrderDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PurchaseOrder in the database
        List<PurchaseOrder> purchaseOrderList = purchaseOrderRepository.findAll();
        assertThat(purchaseOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPurchaseOrder() throws Exception {
        int databaseSizeBeforeUpdate = purchaseOrderRepository.findAll().size();
        purchaseOrder.setId(count.incrementAndGet());

        // Create the PurchaseOrder
        PurchaseOrderDTO purchaseOrderDTO = purchaseOrderMapper.toDto(purchaseOrder);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPurchaseOrderMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(purchaseOrderDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PurchaseOrder in the database
        List<PurchaseOrder> purchaseOrderList = purchaseOrderRepository.findAll();
        assertThat(purchaseOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePurchaseOrder() throws Exception {
        // Initialize the database
        purchaseOrderRepository.saveAndFlush(purchaseOrder);

        int databaseSizeBeforeDelete = purchaseOrderRepository.findAll().size();

        // Delete the purchaseOrder
        restPurchaseOrderMockMvc
            .perform(delete(ENTITY_API_URL_ID, purchaseOrder.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PurchaseOrder> purchaseOrderList = purchaseOrderRepository.findAll();
        assertThat(purchaseOrderList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
