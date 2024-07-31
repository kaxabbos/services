package com.services.category.converter;

import com.services.category.Category;
import com.services.category.CategoryDto;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class CategoryDtoToCategoryConverter implements Converter<CategoryDto, Category> {
    @Override
    public Category convert(CategoryDto source) {
        return new Category(
                source.name()
        );
    }
}
