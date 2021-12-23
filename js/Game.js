class Game {
    constructor() {

    }
    getState() {
        //Pone los valores en el gameState en Firebase
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        });
    }

    update(state) {
        //acutaliza el estado del gameState
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
        //vigila el playerCount para saber si ya se unieron 4 jugadores
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            formulario = new Form();
            formulario.display();
        }
        //se crean los sprites y se les agrega la imagen
        car1 = createSprite(100,200);
        car1.addImage("imagen carro 1",car1Img);
        car2 = createSprite(300,200);
        car2.addImage("imagen carro 2",car2Img);
        car3 = createSprite(500,200);
        car3.addImage("imagen carro 3",car3Img);
        car4 = createSprite(700,200);
        car4.addImage("imagen carro 4",car4Img);
        cars = [car1,car2,car3,car4];
        
    }
    play() {
        formulario.hide();
        /*textSize(30);
        text("game start", 120, 100);*/
        Player.getPlayerInfo();
        //
        player.getCarsEnd();
        if (allPlayers !== undefined) {

            //Se pone la imagen de la pista de fondo
            background("#c68767");
            image(track, 0, -displayHeight*4, displayWidth, displayHeight*5);
            var index = 0;
            var x = 175;
            var y;

            //var display_position = 130;
            for (var plr in allPlayers) {
                index = index+1;
                x = x + 200;
                y = displayHeight-allPlayers[plr].distance;
                cars[index-1].x = x;
                cars[index-1].y = y;
                
                //Es el indicador en rojo para diferenciar qué carro es
                //el jugador
                if (index === player.index){
                    //
                    stroke(10);
                    fill("red");
                    ellipse(x,y,60,60);
                    //
                     cars[index-1].shapeColor = "red";
                     camera.position.x = displayWidth/2;
                     camera.position.y = cars[index-1].y;

                }
                /*display_position += 20;
                textSize(15);
                text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120, display_position);*/
                
            }//
        }

        //Mueve los carritos hacia arriba cuando todos los jugadores se unieron
        if (keyIsDown(UP_ARROW) && player.index !== null) {
            player.distance += 50;
            player.update();

        }
        
        //Es para parar cuando la pista se termina
        if(player.distance > 3860){
            gameState = 2;
            //
            player.rank +=1;
            Player.updateCarsEnd(player.rank);
            
            //
        }
        drawSprites();
    }

    //muestra el estado del juego y el rank de los jugadores
    end(){
        console.log("juego terminado");
        console.log(player.rank);
       
    }
}