package ly.qubit.inventory.repository;

import java.util.List;
import java.util.Optional;
import ly.qubit.inventory.domain.PurchaseOrderLine;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the PurchaseOrderLine entity.
 */
@Repository
public interface PurchaseOrderLineRepository extends JpaRepository<PurchaseOrderLine, Long> {
    default Optional<PurchaseOrderLine> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<PurchaseOrderLine> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<PurchaseOrderLine> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct purchaseOrderLine from PurchaseOrderLine purchaseOrderLine left join fetch purchaseOrderLine.product",
        countQuery = "select count(distinct purchaseOrderLine) from PurchaseOrderLine purchaseOrderLine"
    )
    Page<PurchaseOrderLine> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct purchaseOrderLine from PurchaseOrderLine purchaseOrderLine left join fetch purchaseOrderLine.product")
    List<PurchaseOrderLine> findAllWithToOneRelationships();

    @Query(
        "select purchaseOrderLine from PurchaseOrderLine purchaseOrderLine left join fetch purchaseOrderLine.product where purchaseOrderLine.id =:id"
    )
    Optional<PurchaseOrderLine> findOneWithToOneRelationships(@Param("id") Long id);
}
