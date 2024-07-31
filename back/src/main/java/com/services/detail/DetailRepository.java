package com.services.detail;

import com.services.enums.OrderingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DetailRepository extends JpaRepository<Detail, Long> {
    public Optional<Detail> findByProduct_IdAndOwner_Id(Long productId, Long ownerId);

    public List<Detail> findAllByOwner_IdAndOrderingNull(Long ownerId);

    public List<Detail> findAllByProduct_Category_IdAndOrdering_Status(Long categoryId, OrderingStatus status);
}
