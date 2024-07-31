package com.services.product;

import com.services.product.converter.ProductDtoToProductConverter;
import com.services.product.converter.ProductToProductDtoConverter;
import com.services.system.Result;
import com.services.system.StatusCode;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.stream.Collectors;

import static com.services.util.Global.*;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;
    private final ProductToProductDtoConverter toDtoConverter;
    private final ProductDtoToProductConverter toProductConverter;

    @GetMapping
    public Result findAll() {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Find All Products",
                service.findAll().stream().map(toDtoConverter::convert).collect(Collectors.toList())
        );
    }

    @GetMapping("/{productId}")
    @Secured({ADMIN, MANAGER, USER})
    public Result find(@PathVariable String productId) {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Find Product",
                toDtoConverter.convert(service.findById(productId))
        );
    }

    @PostMapping("/{productId}/detail")
    @Secured({USER})
    public Result detail(@PathVariable String productId, @RequestParam int count) {
        service.detail(productId, count);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Ordering Product"
        );
    }

    @PostMapping
    @Secured({MANAGER})
    public Result add(@Valid @RequestBody ProductDto productDto, @RequestParam String categoryId) {
        Product newProduct = toProductConverter.convert(productDto);
        Product saved = service.save(newProduct, categoryId);
        ProductDto savedDto = toDtoConverter.convert(saved);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Add Product",
                savedDto
        );
    }

    @PutMapping("/{productId}")
    @Secured({MANAGER})
    public Result update(@RequestBody ProductDto productDto, @RequestParam String categoryId, @PathVariable String productId) {
        Product update = toProductConverter.convert(productDto);
        Product updated = service.update(update, categoryId, productId);
        ProductDto updatedDto = toDtoConverter.convert(updated);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Update Product",
                updatedDto
        );
    }

    @PatchMapping("/{productId}/img")
    @Secured({MANAGER})
    public Result updateImg(@PathVariable String productId, @RequestParam MultipartFile file) {
        Product updated = service.updateImg(productId, file);
        ProductDto updatedDto = toDtoConverter.convert(updated);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Update Img Product",
                updatedDto
        );
    }

    @DeleteMapping("/{productId}")
    @Secured({MANAGER})
    public Result delete(@PathVariable String productId) {
        service.deleteById(productId);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Delete Product"
        );
    }

}
