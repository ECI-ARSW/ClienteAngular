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
    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public ServerMessage serverMessage(ClientMessage message) throws Exception {
            return s.getText(message.getMessage(), message.getId());
    }

}