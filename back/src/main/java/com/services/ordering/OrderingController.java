package com.services.ordering;

import com.services.ordering.converter.OrderingToOrderingDtoConverter;
import com.services.system.Result;
import com.services.system.StatusCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

import static com.services.util.Global.MANAGER;
import static com.services.util.Global.USER;

@RestController
@RequestMapping("/orderings")
@RequiredArgsConstructor
public class OrderingController {

    private final OrderingService service;
    private final OrderingToOrderingDtoConverter toDtoConverter;

    @GetMapping
    @Secured({USER, MANAGER})
    public Result getOrderings() {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success",
                service.findAll().stream().map(toDtoConverter::convert).collect(Collectors.toList())
        );
    }

    @PostMapping
    @Secured({USER})
    public Result addOrdering(@RequestParam String date) {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success",
                toDtoConverter.convert(service.add(date))
        );
    }

    @GetMapping("/{orderingId}/done")
    @Secured({MANAGER})
    public Result done(@PathVariable String orderingId) {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Done",
                toDtoConverter.convert(service.done(orderingId))
        );
    }

    @GetMapping("/{orderingId}/delivery")
    @Secured({MANAGER})
    public Result delivery(@PathVariable String orderingId) {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Delivery",
                toDtoConverter.convert(service.delivery(orderingId))
        );
    }

    @GetMapping("/{orderingId}/delivered")
    @Secured({USER})
    public Result delivered(@PathVariable String orderingId) {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Delivered",
                toDtoConverter.convert(service.delivered(orderingId))
        );
    }

}
