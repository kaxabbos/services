package com.services.product;

import com.services.category.CategoryService;
import com.services.detail.Detail;
import com.services.detail.DetailService;
import com.services.system.exception.BadRequestException;
import com.services.system.exception.ObjectNotFoundException;
import com.services.util.Global;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository repository;
    private final CategoryService categoryService;
    private final DetailService detailService;

    public List<Product> findAll() {
        return repository.findAll();
    }

    public Product findById(String productId) {
        try {
            Long longId = Long.parseLong(productId);
            return repository.findById(longId).orElseThrow();
        } catch (Exception e) {
            throw new ObjectNotFoundException("Не найден продукт с ИД: " + productId);
        }
    }

    public Product save(Product product, String categoryId) {
        product.setCategory(categoryService.findById(categoryId));
        return repository.save(product);
    }

    public Product update(Product product, String categoryId, String productId) {
        Product old = findById(productId);
        old.set(product);
        old.setCategory(categoryService.findById(categoryId));
        return repository.save(old);
    }

    public Product updateImg(String productId, MultipartFile file) {
        Product old = findById(productId);
        try {
            old.setImg(Global.saveFile(file, "product"));
        } catch (IOException e) {
            throw new BadRequestException("Некорректное изображение");
        }
        return repository.save(old);
    }

    public void deleteById(String productId) {
        Product product = findById(productId);
        repository.deleteById(product.getId());
    }

    public void detail(String productId, int count) {
        if (count < 1) {
            throw new BadRequestException("Некорректное количество");
        }
        Product product = findById(productId);
        Detail detail = detailService.findByProductId(product.getId());
        if (detail.getProduct() == null) detail.setProduct(product);
        detail.setCount(detail.getCount() + count);
        detailService.save(detail);
    }
}
