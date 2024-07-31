package com.services.detail;

import com.services.appUser.UserService;
import com.services.enums.OrderingStatus;
import com.services.system.exception.ObjectNotFoundException;
import com.services.util.Global;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DetailService {

    private final DetailRepository repository;
    private final UserService userService;

    public Detail findByProductId(Long productId) {
        return repository.findByProduct_IdAndOwner_Id(productId, userService.getCurrentUser().getId()).orElse(new Detail(userService.getCurrentUser()));
    }

    public void save(Detail detail) {
        repository.save(detail);
    }

    public List<Detail> findAll() {
        return repository.findAllByOwner_IdAndOrderingNull(userService.getCurrentUser().getId());
    }

    public Detail findById(String productId) {
        try {
            Long id = Long.parseLong(productId);
            return repository.findById(id).orElseThrow();
        } catch (Exception e) {
            throw new ObjectNotFoundException("Не найдена деталь заказа по ИД " + productId);
        }
    }

    public Detail updateCount(String detailId, int count) {
        Detail detail = findById(detailId);
        detail.setCount(count);
        return repository.save(detail);
    }

    public void delete(String detailId) {
        Detail detail = findById(detailId);
        repository.deleteById(detail.getId());
    }

    public Float getCategoryPrice(Long categoryId) {
        return Global.round(repository
                .findAllByProduct_Category_IdAndOrdering_Status(categoryId, OrderingStatus.DELIVERED)
                .stream()
                .reduce(0f, (i, detail) -> i + detail.getPrice(), Float::sum)
        );
    }
}
