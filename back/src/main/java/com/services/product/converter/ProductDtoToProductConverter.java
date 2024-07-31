package com.services.product.converter;

import com.services.product.Product;
import com.services.product.ProductDto;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class ProductDtoToProductConverter implements Converter<ProductDto, Product> {
    @Override
    public Product convert(ProductDto source) {
        return new Product(
                source.name(),
                source.description(),
                source.price()
        );
    }
}
