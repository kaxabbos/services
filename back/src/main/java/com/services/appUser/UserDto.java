package com.services.appUser;

public record UserDto(
        Long id,
        String username,
        String role
) {
}
