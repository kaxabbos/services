package com.services.ordering;

import com.services.appUser.AppUser;
import com.services.appUser.UserService;
import com.services.detail.Detail;
import com.services.detail.DetailService;
import com.services.enums.OrderingStatus;
import com.services.system.exception.BadRequestException;
import com.services.system.exception.ObjectNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderingService {

    private final OrderingRepository repository;
    private final UserService userService;
    private final DetailService detailService;

    public List<Ordering> findAll() {
        AppUser user = userService.getCurrentUser();
        if (user.getRole().name().equals("USER")) {
            return repository.findAllByOwnerId(user.getId());
        }
        if (user.getRole().name().equals("MANAGER")) {
            return repository.findAll();
        }
        return new ArrayList<>();
    }

    public Ordering findById(String orderingId) {
        try {
            Long id = Long.parseLong(orderingId);
            return repository.findById(id).orElseThrow();
        } catch (Exception e) {
            throw new ObjectNotFoundException("Не найден заказ по ИД " + orderingId);
        }
    }

    public Ordering save(Ordering ordering) {
        return repository.save(ordering);
    }

    public Ordering add(String date) {
        List<Detail> details = detailService.findAll();
        if (details.isEmpty()) {
            throw new BadRequestException("Нету данных для составления заказа");
        }
        return save(new Ordering(date, userService.getCurrentUser(), details));
    }

    public Ordering done(String orderingId) {
        Ordering ordering = findById(orderingId);
        ordering.setStatus(OrderingStatus.DONE);
        return save(ordering);
    }

    public Ordering delivery(String orderingId) {
        Ordering ordering = findById(orderingId);
        ordering.setStatus(OrderingStatus.DELIVERY);
        return save(ordering);
    }

    public Ordering delivered(String orderingId) {
        Ordering ordering = findById(orderingId);
        ordering.setStatus(OrderingStatus.DELIVERED);
        return save(ordering);
    }
}
