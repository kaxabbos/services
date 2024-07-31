package com.services.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;

@AllArgsConstructor
@Getter
public enum OrderingStatus {
    WAITING("Ожидание"),
    DONE("Подтверждено"),
    DELIVERY("Отправлено"),
    DELIVERED("Получено"),
    ;

    private final String name;

}

