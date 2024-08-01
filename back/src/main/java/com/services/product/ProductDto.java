package com.services.product;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record ProductDto(
        Long id,
        @NotEmpty(message = "name is required")
        String name,
        @NotEmpty(message = "description is required")
        String description,
        @NotNull(message = "price is required")
        float price,
        String img,
        Long categoryId,
        String categoryName
) {
}
