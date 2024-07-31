package com.services.detail;

public record DetailDto(
        Long id,
        int count,
        float price,
        Long productId,
        String productName,
        float productPrice
) {
}
