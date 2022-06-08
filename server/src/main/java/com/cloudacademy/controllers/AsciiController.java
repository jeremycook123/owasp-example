package com.cloudacademy.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import com.cloudacademy.AsciiRequest;
import com.cloudacademy.AsciiResponse;
import java.util.Base64;
import java.io.*;

@RestController
@EnableAutoConfiguration
public class AsciiController {

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/asciiart", 
                    method = RequestMethod.POST, 
                    consumes = "application/json",
                    produces = "application/json") 
    AsciiResponse executeCode(@RequestHeader(value="x-auth-token") String token, @RequestBody AsciiRequest input) {
        System.out.println("token: " + token);
        System.out.println("input.text: " + input.text);

        AsciiResponse result = null;

        ProcessBuilder processBuilder = new ProcessBuilder();
        String cmd = "figlet " + input.text;
        System.out.println(cmd);
        processBuilder.command("bash", "-c", cmd);
    
        StringBuilder sb = new StringBuilder();
    
        try {
            Process process = processBuilder.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
    
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line + "\n");
            }
        
            var output = sb.toString();
            byte[] encodedBytes = Base64.getEncoder().encode(output.getBytes());
            var b64 = new String(encodedBytes);
            System.out.println(b64);
            result = new AsciiResponse(b64);
		} catch(Exception e) {
			System.out.println(e);
		}

        return result;
    }
}