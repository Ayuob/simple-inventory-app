package ly.qubit.inventory.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PurchaseOrderLineMapperTest {

    private PurchaseOrderLineMapper purchaseOrderLineMapper;

    @BeforeEach
    public void setUp() {
        purchaseOrderLineMapper = new PurchaseOrderLineMapperImpl();
    }
}
