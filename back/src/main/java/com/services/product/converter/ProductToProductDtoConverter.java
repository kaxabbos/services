package com.services.product.converter;

import com.services.product.Product;
import com.services.product.ProductDto;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class ProductToProductDtoConverter implements Converter<Product, ProductDto> {
    @Override
    public ProductDto convert(Product source) {
        return new ProductDto(
                source.getId(),
                source.getName(),
                source.getDescription(),
                source.getPrice(),
                source.getImg(),
                source.getCategory().getId(),
                source.getCategory().getName()
        );
    }
}
