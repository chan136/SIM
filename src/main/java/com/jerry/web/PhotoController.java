package com.jerry.web;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class PhotoController {

    private final Path p = Paths.get("E:/IntelliJ/SIM/src/main/resources/static/photo/");

/*    @RequestMapping(value={ "/", "/home"})
    public String home(){
        return "home";
    }*/

    @RequestMapping(value = "/post_upload_avatar_file", method = RequestMethod.POST)
    @ResponseBody
    public Object uploadAvatarFile(@RequestParam("uploadfile") MultipartFile uploadfile) {
        JSONObject resJsonData=new JSONObject();
        try {
            if(uploadfile.isEmpty()){
                System.out.println("Empty");
            }

            Files.copy(uploadfile.getInputStream(), p.resolve(uploadfile.getOriginalFilename()));

            resJsonData.put("status", 200);
            resJsonData.put("message", "Success!");
            resJsonData.put("data", uploadfile.getOriginalFilename());
        }catch (Exception e) {
            System.out.println(e.getMessage());
            try {
                resJsonData.put("status", 400);
                resJsonData.put("message", "Upload Image Error!");
                resJsonData.put("data", "");
            } catch (JSONException e1) {
                e1.printStackTrace();
            }
        }
        return resJsonData.toString();
    }

    @GetMapping("files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serverFile(@PathVariable String filename){
        Resource file = loadAsResource(filename);
        return ResponseEntity
                .ok()
                .body(file);
    }

    public Resource loadAsResource(String filename) {
        try {
            Path file = p.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if(resource.exists() || resource.isReadable()) {
                return resource;
            }
        } catch (MalformedURLException e) {
            System.out.println(e);
        }
        return null;
    }

    public Stream<Path> loadAll() {
        try {
            return Files.walk(p, 1)
                    .filter(path -> !path.equals(p))
                    .map(path -> p.relativize(path));
        } catch (IOException e) {
            System.out.println(e);
        }
        return null;
    }
}