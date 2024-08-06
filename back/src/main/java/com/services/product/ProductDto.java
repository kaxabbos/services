package com.services.product;

import jakarta.validation.constraints.*;

public record ProductDto(
        Long id,
        @Size(min = 1, max = 255, message = "name is required length 1-255")
        @NotEmpty(message = "name is required")
        String name,
        @Size(min = 1, max = 255, message = "name is required length 1-255")
        @NotEmpty(message = "description is required")
        String description,
        @Min(value = 0, message = "price is required min 0")
        @Max(value = 1000000, message = "price is required max 0")
        @NotNull(message = "price is required")
        float price,
        String img,
        Long categoryId,
        String categoryName
) {
}
