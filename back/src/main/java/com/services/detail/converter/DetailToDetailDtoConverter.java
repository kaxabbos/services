package com.services.detail.converter;

import com.services.detail.Detail;
import com.services.detail.DetailDto;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class DetailToDetailDtoConverter implements Converter<Detail, DetailDto> {
    @Override
    public DetailDto convert(Detail source) {
        return new DetailDto(
                source.getId(),
                source.getCount(),
                source.getPrice(),
                source.getProduct().getId(),
                source.getProduct().getName(),
                source.getProduct().getPrice()
        );
    }
}
