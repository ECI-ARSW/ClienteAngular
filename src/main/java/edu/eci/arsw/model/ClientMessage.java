/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.model;

/**
 *
 * @author 2101359
 */
public class ClientMessage {
    /*
    id: Emisor
    name: Receptor
    message: Mensaje
    Broadcast: Es para todos o no
    */
    private String name, message;
    private String id;
    private boolean broadcast;
    
    

    public String getName() {
        return name;
    }

    /**
     * @return the id
     */
    public String getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the message
     */
    public String getMessage() {
        return message;
    }

    /**
     * @param message the message to set
     */
    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * @return the broadcast
     */
    public boolean isBroadcast() {
        return broadcast;
    }

    /**
     * @param broadcast the broadcast to set
     */
    public void setBroadcast(boolean broadcast) {
        this.broadcast = broadcast;
    }
}
