/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/

//Ik begin alle variabelen aan te maken in een opslag
var recticle = document.getElementById('recticle');
var doelwit = document.getElementById('doelwit');
var schietKnop = document.getElementById('schietKnop');
var scoreDisplay = document.getElementById("score");
var name = document.getElementById("form");

//Hier maak ik een variabele met arrays voor de heartcontainers die in de display staan
var hearts = [document.getElementById("heart1"), document.getElementById("heart2"), document.getElementById("heart3")];
var lives = 3;
var i = 0;

//Dit is de helft van het doelwit dat gelijk staat aan het doelwit bereik. De bullseye in het midden daarvan is een klein deel van het doelwit bereik 
//De breedte is de hele diameter van het doelwit, en het bereik heb staat op de helft 
var doelwitBereik = doelwit.width / 2;
var bullseyeBereik = doelwitBereik / 100 * 50; // hiermee kan ik het bereik van de hitbox bullseye veranderen

//Door de X en Y kan ik het midden berekenen
var doelwitX = doelwit.offsetLeft + doelwitBereik; //Volgens mozilla kon ik offset het best gebruiken om de positie vanaf links te zetten 
var doelwitY = doelwit.offsetTop + doelwitBereik;
var score = 0; //Hier leg ik de score in vast dat begint bij nul
var playing = true; //boolean om te kijken of de speler nog in leven is

var recticleX;
var recticleY;

schietKnop.addEventListener("click", schiet);

function schiet() {
    if (playing) { //Gebeurt alleen als de var playing true is
        recticleX = recticle.offsetLeft + (recticle.width / 2); //Hier kan ik de positie van de recticle in het midden vinden met een X  en Y as
        recticleY = recticle.offsetTop + (recticle.height / 2);

        if (recticleX >= doelwitX - bullseyeBereik && //Hitbox voor de bullseye volgens 4 verticles en 
            recticleX <= doelwitX + bullseyeBereik && //Logical operator && (and) om iets true te maken
            recticleY >= doelwitY - bullseyeBereik &&
            recticleY <= doelwitY + bullseyeBereik) {

            if (lives < 3) { //Als de bullseye raakt, voeg leven toe (in vergelijking tot 3 maximale)
                lives++;
            }
        }

        if (recticleX >= doelwitX - doelwitBereik && //Hitbox voor het hele doelwit volgens 4 verticles
            recticleX <= doelwitX + doelwitBereik &&
            recticleY >= doelwitY - doelwitBereik &&
            recticleY <= doelwitY + doelwitBereik) {

            score += 100; //Als het doelwit raakt, voeg +100 toe aan score en wijzig de HTML DOM
            scoreDisplay.innerHTML = score;
        }

        //Als hij niets raakt, verlies een leven
        else {
            lives--;
            if (lives == 0) { //Kijk hoeveel levens er zijn en dat het spel klaar is
                playing = false;
            }
        }

        //Verandert de display van de hearts door te zien hoeveel lives de speler nog over heeft
        //Met een increment operator voeg ik een leven toe
        for (i = 0; i < 3; i++) { //Met loop i (index) gelijk aan 0 voert hij i uit zolang het groter is
            if (i < lives) {
                hearts[i].style.display = "block"; //Wanneer dit gebeurt staat een hart in display
            } else {
                hearts[i].style.display = "none"; //Hier wordt het hart inactief, dus verdwijnt het hart uit de display 
            }
        }
    }
}

name.addEventListener("submit", myName);

function myName() {
    name.setAttribute("type", "text");
}

//Bronvermeldingen
//https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
//https://codepen.io/mallburn/pen/kumDK
//https://codepen.io/trolling19/pen/ygmMXW James over input van eventlisteners
//https://www.freepik.com/premium-vector/castle-building-fairytale-mountainous-landscape_5597774.htm#page=1&query=castle&position=29 Freepik premium voor de background
//https://fontawesome.com/icons/heart voor het icoon
//https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop Mozilla over offset gebruik
//https://www.youtube.com/watch?v=s9wW2PpJsmQ van Programming with Mosh over Loops
//https://blog.usejournal.com/mastering-javascripts-and-logical-operators-fd619b905c8f Nicolas Marcora over Boolean operator
