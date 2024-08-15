package com.services.category;

import com.services.product.Product;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Category {

    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "category_g")
    @SequenceGenerator(name = "category_g", sequenceName = "category_seq", allocationSize = 1)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Product> products = new ArrayList<>();

    public Category(String name) {
        this.name = name;
    }

    public void set(Category category) {
        this.name = category.name;
    }
}
