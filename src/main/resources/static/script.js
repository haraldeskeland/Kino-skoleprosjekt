// Kjøres når "Kjøp billet"-knappen trykkes.
function kjopBilletter() {
    // Inputverdier
    let film = $("#filmValg").val();
    let antall = $("#antall").val();
    let fornavn = $("#fornavn").val();
    let etternavn = $("#etternavn").val();
    let telefon = $("#telefon").val();
    let epost = $("#epost").val();

    // Feilmeldinger
    let feilFilm = $("#feilFilm");
    let feilAntall = $("#feilAntall");
    let feilFornavn = $("#feilFornavn");
    let feilEtternavn = $("#feilEtternavn");
    let feilTelefon = $("#feilTelefon");
    let feilEpost = $("#feilEpost");

    // Billettobjekt med verdiene fra input
    const billett = {
        film: film,
        antall: antall,
        fornavn: fornavn,
        etternavn: etternavn,
        telefon: telefon,
        epost: epost
    }

    // Dersom et felt er tomt, skrives det ut en forklarende tekst til hvert felt.
    // Dersom det ikke er tomt lenger ved kjøring av funksjonen fjernes feilmeldingen.
    if (film === null) {
        feilFilm.html("<span class='feil fs-6'>Velg en film.</span>");
    } else {
        feilFilm.html("<span class='feil fs-6 d-inline ml-2'></span>");}
    if (antall === "") {
        feilAntall.html("<span class='feil fs-6'>Velg antall billetter.</span>");
    } else {
        feilAntall.html("<span class='feil fs-6'></span>");}
    if (fornavn === "") {
        feilFornavn.html("<span class='feil fs-6'>Skriv inn fornavn.</span>");
    } else {
        feilFornavn.html("<span class='feil fs-6'></span>");}
    if (etternavn === "") {
        feilEtternavn.html("<span class='feil fs-6'>Skriv inn etternavn.</span>");
    } else {
        feilEtternavn.html("<span class='feil fs-6'></span>");}
    if (telefon === "") {
        feilTelefon.html("<span class='feil fs-6'>Skriv et telefonnummer.</span>");
    } else {
        feilTelefon.html("<span class='feil fs-6'></span>");}
    if (epost === "") {
        feilEpost.html("<span class='feil fs-6'>Skriv en epost.</span>");
    } else {
        feilEpost.html("<span class='feil fs-6'></span>");}

    // Skjuler bekreftelse-melding dersom den er synlig
    $("#bekreftelse").css("visibility", "hidden");

    // Dersom der er skrevet noe i alle felter blir billetten lagt til bakerst i arrayet, og deretter skrevet ut.
    if (film !== "" && film!== null && antall !== "" && fornavn !== "" && etternavn !== "" && telefon !== "" && epost !== "") {
        // Gjør overskrift til tabellen synlig
        $("#overskrift2").css("visibility", "visible");
        // Sender billetten med input til server, henter tilbake arrayet.
        $.post("/lagre", billett, function(billetter) {
        // Lager en tabell som billettene skal være i.
        let ut = "<table class='table table-bordered table-hover' id='tabell'><tr><th scope='col'>Film</th><th scope='col'>Antall Billetter</th><th scope='col'>Fornavn</th>" +
                "<th scope='col'>Etternavn</th><th scope='col'>Telefon</th><th scope='col'>E-post</th></tr>";
        // Kjører gjennom billettRegister (billetter) og henter ut all info som  legges i tabellen.
        for (const billett of billetter) {
                ut += "<tr><td>" + billett.film + "</td><td>" + billett.antall + "</td><td>" + billett.fornavn + "</td>" +
                    "<td>" + billett.etternavn + "</td><td>" + billett.telefon + "</td><td>" + billett.epost + "</td></tr>";
        }
        ut += "</table>";

        // Sender ut til index.
        $("#utskrift").html(ut);

        // Nullstiller inputfeltenes verdier
        $("#filmValg").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefon").val("");
        $("#epost").val("");
    })
        // Viser en bekreftelse på at billetten er registrert.
        $("#bekreftelse").css("visibility", "visible");
    }
}

// Funksjon som kjøres når "Slett alle billetter-knappen trykkes
function slettBiletter() {
    // Advarsel for å bekrefte at brukeren vil slette
    const ok=confirm("Sikker på at du vil slette billett-registeret?")

    // Dersom bruker bekrefter, tømmes arrayet og table nullstilles. Dersom "avbryt" skjer ingenting.
    if(ok) {
        $.post("/slettAlle", function() {
            let ut = "<table class='table'><tr><th>Film</th><th>Antall Billetter</th><th>Fornavn</th>" +
                "<th>Etternavn</th><th>Telefon</th><th>E-post</th></tr>";
            ut += "</table>";
            $("#utskrift").html(ut);

            // Skjuler overskrift, tabell og bekreftelsesmelding.
            $("#bekreftelse").css("visibility", "hidden");
            $("#overskrift2").css("visibility", "hidden");
            $(".table").css("visibility", "hidden");

        })
    }
}