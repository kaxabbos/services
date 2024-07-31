package com.services.product;

import com.services.category.Category;
import com.services.detail.Detail;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Product {

    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "product_g")
    @SequenceGenerator(name = "product_g", sequenceName = "product_seq", allocationSize = 1)
    private Long id;

    private String name;
    private String img = "/img/no_img.png";
    private float price;
    @Column(length = 5000)
    private String description;

    @ManyToOne
    private Category category;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Detail> details = new ArrayList<>();

    public Product(String name, String description, float price) {
        this.name = name;
        this.description = description;
        this.price = price;
    }

    public void set(Product product) {
        this.name = product.getName();
        this.price = product.getPrice();
        this.description = product.getDescription();
    }
}
