package com.services.product;

import jakarta.validation.constraints.NotEmpty;

public record ProductDto(
        Long id,
        @NotEmpty(message = "name is required")
        String name,
        @NotEmpty(message = "description is required")
        String description,
        @NotEmpty(message = "price is required")
        float price,
        String img,
        Long categoryId,
        String categoryName
) {
}
