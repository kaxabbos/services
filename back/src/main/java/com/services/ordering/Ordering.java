package com.services.ordering;

import com.services.appUser.AppUser;
import com.services.detail.Detail;
import com.services.enums.OrderingStatus;
import com.services.util.Global;
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
public class Ordering {

    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "ordering_g")
    @SequenceGenerator(name = "ordering_g", sequenceName = "ordering_seq", allocationSize = 1)
    private Long id;

    private String date;
    @Enumerated(EnumType.STRING)
    private OrderingStatus status = OrderingStatus.WAITING;

    @ManyToOne
    private AppUser owner;
    @OneToMany(mappedBy = "ordering", cascade = CascadeType.ALL)
    private List<Detail> details = new ArrayList<>();

    public Ordering(String date, AppUser owner, List<Detail> details) {
        this.date = date;
        this.owner = owner;
        for (Detail i : details) {
            i.setOwner(null);
            i.setOrdering(this);
        }
    }

    public float getPrice() {
        return Global.round(details.stream().reduce(0f, (i, detail) -> i + detail.getPrice(), Float::sum));
    }
}
