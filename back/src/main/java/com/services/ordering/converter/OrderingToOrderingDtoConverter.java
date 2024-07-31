package com.services.ordering.converter;

import com.services.detail.converter.DetailToDetailDtoConverter;
import com.services.ordering.Ordering;
import com.services.ordering.OrderingDto;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class OrderingToOrderingDtoConverter implements Converter<Ordering, OrderingDto> {

    private final DetailToDetailDtoConverter detailToDetailDtoConverter;

    @Override
    public OrderingDto convert(Ordering source) {
        return new OrderingDto(
                source.getId(),
                source.getDate(),
                source.getPrice(),
                source.getStatus().name(),
                source.getStatus().getName(),
                source.getOwner().getUsername(),
                source.getDetails().stream().map(detailToDetailDtoConverter::convert).collect(Collectors.toList())
        );
    }
}
