package com.services.ordering;

import com.services.detail.DetailDto;

import java.util.List;

public record OrderingDto(
        Long id,
        String date,
        float price,
        String status,
        String statusName,
        String ownerName,
        List<DetailDto> details
) {
}
