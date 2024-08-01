package com.services.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

public class Global {

    public static final String uploadImg = getUploadImg();

    public static final String ADMIN = "ADMIN";
    public static final String MANAGER = "MANAGER";
    public static final String USER = "USER";

    public static String getUploadImg() {
        StringBuilder dir = new StringBuilder(System.getProperty("user.dir"));
        for (int j = 0; j < dir.length(); j++) {
            if (dir.charAt(j) == '\\') {
                dir.setCharAt(j, '/');
            }
        }
        dir.append("/src/main/resources/img");
        return dir.toString();
    }

    public static String getDatetime() {
        return LocalDateTime.now().toString();
    }

    public static String getDateNow() {
        return getDatetime().substring(0, 10);
    }

    public static String getTimeNow() {
        return getDatetime().substring(11, 19);
    }

    public static String getDateAndTimeNow() {
        return getDateNow() + " " + getTimeNow();
    }

    public static String saveFile(MultipartFile file, String path) throws IOException {
        System.out.println(uploadImg);
        System.out.println(0);
        if (file != null && !Objects.requireNonNull(file.getOriginalFilename()).isEmpty()) {
            System.out.println(1);
            String uuidFile = UUID.randomUUID().toString();
            System.out.println(2);
            File uploadDir = new File(uploadImg);
            System.out.println(3);
            if (!uploadDir.exists()) uploadDir.mkdir();
            System.out.println(4);
            String result = path + "/" + uuidFile + "_" + file.getOriginalFilename();
            System.out.println(5);
            System.out.println(uploadImg + "/" + result);
            file.transferTo(new File(uploadImg + "/" + result));
            System.out.println(6);
            return "http://localhost:8080/img/" + result;
        } else throw new IOException();
    }

    public static float round(float value) {
        long factor = (long) Math.pow(10, 2);
        value = value * factor;
        long tmp = Math.round(value);
        return (float) tmp / factor;
    }

}
