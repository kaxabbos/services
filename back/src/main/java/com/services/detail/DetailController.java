package com.services.detail;

import com.services.detail.converter.DetailToDetailDtoConverter;
import com.services.system.Result;
import com.services.system.StatusCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

import static com.services.util.Global.USER;

@RestController
@RequestMapping("/details")
@RequiredArgsConstructor
@Secured({USER})
public class DetailController {

    private final DetailService service;
    private final DetailToDetailDtoConverter toDtoConverter;

    @GetMapping
    public Result getDetails() {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success",
                service.findAll().stream().map(toDtoConverter::convert).collect(Collectors.toList())
        );
    }

    @PatchMapping("/{detailId}")
    public Result detailUpdateCount(@PathVariable String detailId, @RequestParam int count) {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Update Count",
                toDtoConverter.convert(service.updateCount(detailId, count))
        );
    }

    @DeleteMapping("/{detailId}")
    public Result detailDelete(@PathVariable String detailId) {
        service.delete(detailId);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Delete"
        );
    }

}
