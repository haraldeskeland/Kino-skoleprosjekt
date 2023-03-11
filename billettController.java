package com.example.oblig2_s374158;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class billettController {
    // Arraylist som skal ta inn Billettobjektet med verdier.
    public final ArrayList <Billett> billettRegister = new ArrayList<>();

    // Henter inn inputverdiene og legger inn i bilettRegister-arrayet
    @PostMapping("/lagre")
    public ArrayList <Billett> hentInfo(Billett billett) {
        billettRegister.add(billett);
        return billettRegister;
    }

    // Nullstiller array
    @PostMapping("/slettAlle")
    public void slett() {
        billettRegister.clear();
    }
}



