package com.cloudacademy.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OkController {
    @RequestMapping(value = "/ok", method = RequestMethod.GET, produces = "text/plain")
    String ok() {
        return "ok!\n";
	}
}