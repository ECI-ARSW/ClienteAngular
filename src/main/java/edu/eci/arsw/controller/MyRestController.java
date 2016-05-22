/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.controller;

/**
 *
 * @author 2101359
 */

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import edu.eci.arsw.model.ClientMessage;
import edu.eci.arsw.model.ServerMessage;

@RestController
@RequestMapping("/rest")
public class MyRestController {
    @Autowired 
    public SimpMessagingTemplate template;  
    
    @RequestMapping(value = "/msg",method = RequestMethod.POST)        
    public ResponseEntity<?> addMessage(@RequestBody ClientMessage p) {       
        template.convertAndSend("/topic/messages",new ServerMessage(p.getMessage()));
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @RequestMapping(value = "/check",method = RequestMethod.GET)        
    public String check() {
        return "REST API OK";                
    }

}
