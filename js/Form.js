class Form{
    constructor(){
        //crea los objetos que se necesitan para el formulario de ingreso
        this.input = createInput("name");
        this.button = createButton('Play');
        this.saludo = createElement('h3');  
        this.title = createElement('h2');
        this.reset = createButton('Reset');
    }
    hide(){
        //funcion que esconde los elementos
        this.input.hide();
        this.button.hide();
        this.saludo.hide();
        this.title.hide();

    }

    display(){
        //Muestra el formulario del inicio
        //título
        this.title.html("Juego de carreras");
        this.title.position(displayWidth/2 -50, 0 );

        //elementos de entrada, botón de play y de reset
        this.input.position(displayWidth/2 -40, displayHeight/2 - 80);
        this.button.position(displayWidth/2 +30, displayHeight/2);
        this.reset.position(displayWidth-100, 20);
        
        //eventos que suceden cuando se presiona el boton de play
        this.button.mousePressed(()=>{
            //esconde el formulario
            this.input.hide();
            this.button.hide();
            //guarda el nombre del jugador
            player.name = this.input.value();
            //cuenta el número de jugadores
            playerCount+=1;
            //agrega un jugador a la base de datos
            player.index = playerCount;
            player.update();
            player.updateCount(playerCount);
            //saluda al jugador
            this.saludo.html("Hola "+player.name);
            this.saludo.position(displayWidth/2 -70, displayHeight/4);

        });

        //eventos que suceden cuando se presiona el botón de reset
        //la base de datos se pone en 0
        this.reset.mousePressed(()=>{
            player.updateCount(0);
            game.update(0);
            Player.updateCarsEnd(0);
        });
    }
}