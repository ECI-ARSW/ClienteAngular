/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.model;

import edu.eci.arsw.model.diff_match_patch.Patch;
import java.util.LinkedList;
import java.util.List;

/**
 *
 * @author mariale
 */
public class Servidor {
    String textoPrincipal;
    
    public Servidor(){
        textoPrincipal="Hola que tal!";
    }
    
    public ServerMessage getText(String text, int id){
        ServerMessage g = new ServerMessage(text);
        g.setId(id);
        g.setServer(textoPrincipal);
        g.setContent(text);
        changeText(text);
        return g;
    }
    
    public void changeText(String texto){
      
    Object[] res;
    diff_match_patch difference = new diff_match_patch();
    LinkedList<Patch> patches =  difference.patch_make(textoPrincipal , texto );
        
    for(Patch p: patches){
        System.out.println(p.toString());
    }
    System.out.println("Fin diffs");
    textoPrincipal = (String)difference.patch_apply(patches, textoPrincipal)[0];
    
    System.out.println("texto principal nuevo " + textoPrincipal);
  }
}
