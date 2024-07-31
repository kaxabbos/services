package com.services.category;

import jakarta.validation.constraints.NotEmpty;

public record CategoryDto(
        Long id,
        @NotEmpty(message = "name is required")
        String name,
        String img
) {
}
