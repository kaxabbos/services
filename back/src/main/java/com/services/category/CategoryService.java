package com.services.category;

import com.services.system.exception.BadRequestException;
import com.services.system.exception.ObjectNotFoundException;
import com.services.util.Global;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository repository;

    public List<Category> findAll() {
        return repository.findAll();
    }

    public Category findById(String id) {
        try {
            Long longId = Long.parseLong(id);
            return repository.findById(longId).orElseThrow();
        } catch (Exception e) {
            throw new ObjectNotFoundException("Не найдена категория с ИД: " + id);
        }
    }

    public Category add(Category category) {
        return repository.save(category);
    }

    public Category update(Category update, String id) {
        Category old = findById(id);
        old.set(update);
        return repository.save(old);
    }

    public Category updateImg(MultipartFile file, String id) {
        Category old = findById(id);
        try {
            old.setImg(Global.saveFile(file, "/category"));
        } catch (Exception e) {
            throw new BadRequestException("Некорректное изображение");
        }
        return repository.save(old);
    }

    public void deleteById(String id) {
        Category category = findById(id);
        repository.deleteById(category.getId());
    }
}
