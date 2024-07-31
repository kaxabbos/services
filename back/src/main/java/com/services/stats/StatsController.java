package com.services.stats;

import com.services.category.Category;
import com.services.category.CategoryService;
import com.services.detail.DetailService;
import com.services.ordering.OrderingService;
import com.services.system.Result;
import com.services.system.StatusCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

import static com.services.util.Global.ADMIN;

@RestController
@RequestMapping("/stats")
@RequiredArgsConstructor
@Secured({ADMIN})
public class StatsController {

    private final CategoryService categoryService;
    private final OrderingService orderingService;
    private final DetailService detailService;

    @GetMapping("/categories")
    public Result getStatsCategories() {
        Map<String, List<?>> res = new HashMap<>();

        List<Category> categories = categoryService.findAll();
        List<String> names = new ArrayList<>();
        List<Float> values = new ArrayList<>();

        for (Category category : categories) {
            names.add(category.getName());
            values.add(detailService.getCategoryPrice(category.getId()));
        }

        res.put("names", names);
        res.put("values", values);

        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Stats Categories",
                Collections.unmodifiableMap(res)
        );
    }

}
