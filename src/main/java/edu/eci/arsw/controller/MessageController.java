/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.controller;


import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import edu.eci.arsw.model.*;

@Controller
public class MessageController {
    Servidor s = new Servidor();
    @MessageMapping("/mensaje")
    @SendTo("/topicide/chat")
    public ServerMessage serverMessage(ClientMessage message) throws Exception {
            System.out.println("llego un mensaje");
            return new ServerMessage(message.getName(), message.getMessage());
    }
    
    @MessageMapping("/code")
    @SendTo("/topicide/messages")
    public ServerMessage serverCode(CodeMessage codeMessage) throws Exception {
         return s.getText(codeMessage.getCode(), codeMessage.getId());
    }
}