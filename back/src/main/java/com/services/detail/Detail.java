package com.services.detail;

import com.services.appUser.AppUser;
import com.services.enums.OrderingStatus;
import com.services.ordering.Ordering;
import com.services.product.Product;
import com.services.util.Global;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Detail {

    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "detail_g")
    @SequenceGenerator(name = "detail_g", sequenceName = "detail_seq", allocationSize = 1)
    private Long id;

    private int count = 0;

    @ManyToOne
    private AppUser owner;
    @ManyToOne
    private Product product;
    @ManyToOne
    private Ordering ordering;

    public Detail(AppUser owner) {
        this.owner = owner;
    }

    public void set(Detail detail) {
        this.count = detail.getCount();
    }

    public Float getPrice() {
        return Global.round(product.getPrice() * this.count);
    }

    public Float getCategoryPrice(Long categoryId) {
        if (ordering == null) return 0f;
        if (ordering.getStatus() == OrderingStatus.DONE) {
            return getPrice();
        }
        return 0f;
    }
}
