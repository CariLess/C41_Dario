class Player{
    constructor(){
        //objetos que se necesitan para la información de los jugadores.
        this.index = null;
        this.distance = 0;
        this.name = null;
        this.rank = null;
    }

    getCount(){
        //Revisa el valor del contador de jugadores
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value",(data)=>{
            playerCount = data.val();
        });
    }

    updateCount(count){
        //actualiza el contador de jugadores
        database.ref('/').update({
            playerCount: count
        });
    }

    update(){
        //crea un jugador en la base de datos y le pone un index
        //le guarda su nombre y la distancia que recorrió
        var playerIndex = "players/player"+this.index;
        database.ref(playerIndex).set({
            name: this.name,
            distance: this.distance
        });
    }

    static getPlayerInfo(){
        //revisa la información del jugador y lo agraga en la base de datos
        var playerInfoRef = database.ref('players');
        playerInfoRef.on("value", (data)=>{
            allPlayers=data.val();
        })

    }

    getCarsEnd(){
        //Revisa y escribe en el rank en la base de datos
        database.ref('carsEnd').on("value", (data)=>{
            this.rank = data.val();
        })
    }
    static updateCarsEnd(rank){
        //escribe y actualiza el rank en la base de datos
        database.ref('/').update({
            carsEnd:rank
        })
    }
}