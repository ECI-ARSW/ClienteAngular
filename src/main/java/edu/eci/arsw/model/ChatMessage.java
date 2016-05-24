/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.model;

/**
 *
 * @author mariale
 */
public class ChatMessage {
    private String message;
    private String id;
    private String name;
    private boolean broadcast; 
    
    public ChatMessage(String emisor, String receptor, String mensaje, boolean broad){
        this.id=emisor;
        this.name=receptor;
        this.message=mensaje;
        this.broadcast=broad;
    }

    /**
     * @return the mensaje
     */
    public String getMensaje() {
        return message;
    } 

    /**
     * @param mensaje the mensaje to set
     */
    public void setMensaje(String mensaje) {
        this.message = mensaje;
    }

    /**
     * @return the emisor
     */
    public String getEmisor() {
        return id;
    }

    /**
     * @param emisor the emisor to set
     */
    public void setEmisor(String emisor) {
        this.id = emisor;
    }

    /**
     * @return the receptor
     */
    public String getReceptor() {
        return name;
    }

    /**
     * @param receptor the receptor to set
     */
    public void setReceptor(String receptor) {
        this.name = receptor;
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
