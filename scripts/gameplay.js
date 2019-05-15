MyGame.screens['game-play'] = (function(game, objects, renderer, graphics, input, systems) {
    'use strict';

    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;

    let myKeyboard = input.Keyboard();

    let canvas = document.getElementById('id-canvas');
    let context = canvas.getContext('2d');

    const gameBoardSize = 13;

    const deltaX = canvas.width / gameBoardSize;
    const deltaY = canvas.height / gameBoardSize;

    //////////////////
    // Scoring
    //////////////////
    let level = 1;

    let recordedScore = false;

    let FirstPlaceKey = 'first';
    let SecondPlaceKey = 'second';
    let ThirdPlaceKey = 'third';
    let FourthPlaceKey = 'fourth';
    let FifthPlaceKey = 'fifth';

    //////////////////
    // Background
    //////////////////

    let background = objects.Background({
        imageSrc: './assets/images/frogger_sprites.png',
    });
    

    //////////////////
    // Frog
    //////////////////

    let frog = objects.Frog({
        size: { x: 50, y: 70 },       // Size in pixels
        center: { x: 6, y: 0 },
        rotation: 0,
        moveRate: 1 / 1000,         // Pixels per second
        rotateRate: 1.5708,    // Radians per second
        jump: false,
        score: 0,
        lives: 5,
        isRiding: false,
        riding: {speed: 0, direction: 'left'},
        died: {
            isDead: false,
            time: 1200,
            location: {x: 0, y: 0},
        },
        gameOver: false,
        frogRender: renderer.Frog({
            spriteSheet: './assets/images/frog.png',
            spriteCount: 7,
            spriteTime: [1, 25, 25, 25, 25, 25, 1],   // ms per frame
            animate: false,
        }, graphics),
    });

    /////////////////////
    // Vehicles
    /////////////////////
    let Vehicles = [];

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function randomizeVehicles(){
        Vehicles = [];
        let directions = ['left', 'right'];
        let vehicleTypes = [
            {type: '1', speed: 9}, 
            {type: '2', speed: 7}, 
            {type: '3', speed: 6}, 
            {type: '4', speed: 5}, 
            {type: '5', speed: 4}];
        
        // Lane 1
        let randomType = vehicleTypes[getRandomInt(5)];
        let lane1 = objects.Vehicle({
            center: {x: getRandomInt(20), y: 11},
            type: randomType.type,
            imageSrc: './assets/images/frogger_sprites.png',
            direction: directions[getRandomInt(2)],
            speed: randomType.speed * level / 3 / 1000,
        });
        // Lane 2
        randomType = vehicleTypes[getRandomInt(5)];
        let lane2 = objects.Vehicle({
            center: {x: getRandomInt(20), y: 10},
            type: randomType.type,
            imageSrc: './assets/images/frogger_sprites.png',
            direction: directions[getRandomInt(2)],
            speed: randomType.speed * level / 3 / 1000,
        });
        // Lane 3
        randomType = vehicleTypes[getRandomInt(5)];
        let lane3 = objects.Vehicle({
            center: {x: getRandomInt(20), y: 9},
            type: randomType.type,
            imageSrc: './assets/images/frogger_sprites.png',
            direction: directions[getRandomInt(2)],
            speed: randomType.speed * level / 3 / 1000,
        });
        // Lane 4
        randomType = vehicleTypes[getRandomInt(5)];
        let lane4 = objects.Vehicle({
            center: {x: getRandomInt(20), y: 8},
            type: randomType.type,
            imageSrc: './assets/images/frogger_sprites.png',
            direction: directions[getRandomInt(2)],
            speed: randomType.speed * level / 3 / 1000,
        });
        // Lane 5
        randomType = vehicleTypes[getRandomInt(5)];
        let lane5 = objects.Vehicle({
            center: {x: getRandomInt(20), y: 7},
            type: randomType.type,
            imageSrc: './assets/images/frogger_sprites.png',
            direction: directions[getRandomInt(2)],
            speed: randomType.speed * level / 3 / 1000,
        });
        
    
        Vehicles.push(lane1);
        Vehicles.push(lane2);
        Vehicles.push(lane3);
        Vehicles.push(lane4);
        Vehicles.push(lane5);
        
    }

    function updateAllVehicles(elapsedTime){
        for(let i = 0; i < Vehicles.length; i++){
            Vehicles[i].update(elapsedTime);
        }
    }

    function renderAllVehicles(){
        for(let i = 0; i < Vehicles.length; i++){
            renderer.Vehicle.render(Vehicles[i]);
        }
        
    }

    /////////////////////
    // Logs
    /////////////////////
    let Logs = [];

    function randomizeLogs(){
        Logs = [];
        let directions = ['left', 'right'];
        let logTypes = [
            {type: '1', speed: 2},
            {type: '2', speed: 3}, 
            {type: '3', speed: 4}, 
            {type: '4', speed: 5},
        ];

        let levelChoice = level + 4;

        if(levelChoice > logTypes.length){
            levelChoice = logTypes.length;
        }
        
        // Lane 1
        let randomType = logTypes[getRandomInt(levelChoice)];
        let randomLocation = getRandomInt(7);
        let lane1_1 = objects.Log({
            center: {x: randomLocation, y: 1},
            type: randomType.type,
            imageSrc: './assets/images/frogger_sprites.png',
            direction: directions[0],
            speed: randomType.speed * level / 3 / 1000,
        });
        let lane1_2 = objects.Log({
            center: {x: randomLocation + 10, y: 1},
            type: randomType.type,
            imageSrc: './assets/images/frogger_sprites.png',
            direction: directions[0],
            speed: randomType.speed * level / 3 / 1000,
        });

        // Lane 2
        randomType = logTypes[getRandomInt(levelChoice)];
        randomLocation = getRandomInt(7);
        let lane2_1 = objects.Log({
            center: {x: randomLocation, y: 2},
            type: randomType.type,
            imageSrc: './assets/images/frogger_sprites.png',
            direction: directions[1],
            speed: randomType.speed * level / 3 / 1000,
        });
        let lane2_2 = objects.Log({
            center: {x: randomLocation + 10, y: 2},
            type: randomType.type,
            imageSrc: './assets/images/frogger_sprites.png',
            direction: directions[1],
            speed: randomType.speed * level / 3 / 1000,
        });

        // Lane 3
        randomType = logTypes[getRandomInt(levelChoice)];
        randomLocation = getRandomInt(7);
        let lane3_1 = objects.Log({
            center: {x: randomLocation, y: 3},
            type: randomType.type,
            imageSrc: './assets/images/frogger_sprites.png',
            direction: directions[0],
            speed: randomType.speed * level / 3 / 1000,
        });
        let lane3_2 = objects.Log({
            center: {x: randomLocation + 10, y: 3},
            type: randomType.type,
            imageSrc: './assets/images/frogger_sprites.png',
            direction: directions[0],
            speed: randomType.speed * level / 3 / 1000,
        });

        // Lane 4
        randomType = logTypes[getRandomInt(levelChoice)];
        randomLocation = getRandomInt(7);
        let lane4_1 = objects.Log({
            center: {x: randomLocation, y: 4},
            type: randomType.type,
            imageSrc: './assets/images/frogger_sprites.png',
            direction: directions[1],
            speed: randomType.speed * level / 3 / 1000,
        });
        let lane4_2 = objects.Log({
            center: {x: randomLocation + 7, y: 4},
            type: randomType.type,
            imageSrc: './assets/images/frogger_sprites.png',
            direction: directions[1],
            speed: randomType.speed * level / 3 / 1000,
        });

        // Lane 5
        randomType = logTypes[getRandomInt(levelChoice)];
        randomLocation = getRandomInt(7);
        let lane5_1 = objects.Log({
            center: {x: randomLocation, y: 5},
            type: randomType.type,
            imageSrc: './assets/images/frogger_sprites.png',
            direction: directions[0],
            speed: randomType.speed * level / 3 / 1000,
        });
        let lane5_2 = objects.Log({
            center: {x: randomLocation + 7, y: 5},
            type: randomType.type,
            imageSrc: './assets/images/frogger_sprites.png',
            direction: directions[0],
            speed: randomType.speed * level / 3 / 1000,
        });
        
    
        Logs.push(lane1_1);
        Logs.push(lane1_2);
        Logs.push(lane2_1);
        Logs.push(lane2_2);
        Logs.push(lane3_1);
        Logs.push(lane3_2);
        Logs.push(lane4_1);
        Logs.push(lane4_2);
        Logs.push(lane5_1);
        Logs.push(lane5_2);
        
    }

    function updateAllLogs(elapsedTime){
        for(let i = 0; i < Logs.length; i++){
            Logs[i].update(elapsedTime);
        }
    }

    function renderAllLogs(){
        for(let i = 0; i < Logs.length; i++){
            renderer.Log.render(Logs[i]);
        }
    }

    /////////////////////
    // Game
    /////////////////////
    let fxBackground = new Sound("./assets/sounds/frogger.mp3", 1, 0.2);
    let fxAchievment = new Sound("./assets/sounds/achievment.mp3", 1, 0.2);
    let fxDie = new Sound("./assets/sounds/die.mp3", 1, 0.2);
    let fxNextLevel = new Sound("./assets/sounds/nextLevel.mp3", 1, 0.3);
    let fxYouLose = new Sound("./assets/sounds/youLose.mp3", 1, 0.3);

    fxBackground.onload();
    fxAchievment.onload();
    fxNextLevel.onload();
    fxYouLose.onload();
    fxDie.onload();

    let playedEndGameJingle = false;

    let particlesFrog = systems.ParticleSystem({
        center: { x: 200, y: 200 },
        size: { mean: 15, stdev: 5 },
        speed: { mean: 100, stdev: 35 },
        lifetime: { mean: 0.5, stdev: 0.1}
    });
    let particlesWater = systems.ParticleSystem({
        center: { x: 500, y: 500 },
        size: { mean: 100, stdev: 3 },
        speed: { mean: 100, stdev: 35 },
        lifetime: { mean: 0.5, stdev: 0.1}
    });
    let particlesWin = systems.ParticleSystem({
        center: { x: 500, y: 500 },
        size: { mean: 100, stdev: 3 },
        speed: { mean: 100, stdev: 35 },
        lifetime: { mean: 0.5, stdev: 0.1}
    });
    let frogGuts = renderer.ParticleSystem(particlesFrog, graphics, 
        './assets/images/guts.png');
    let waterRenderer = renderer.ParticleSystem(particlesWater, graphics, 
        './assets/images/water.png');
    let winRenderer = renderer.ParticleSystem(particlesWin, graphics, 
        './assets/images/win.png');

    function newLevel(){
        frog.resetToStartPosition();
        background.reset();
        level++;
        frog.addToScore(10000, level);
        randomizeVehicles();
        randomizeLogs();
        if(fxNextLevel.ready){
            fxNextLevel.play();
        }
    }

    function newGame(){
        frog.resetToStartPosition();
        background.reset();
        recordedScore = false;
        level = 1;
        frog.reset();
        randomizeVehicles();
        randomizeLogs();
        playedEndGameJingle = false;
        if(fxBackground.ready){
            // fxBackground.play();
        }
    }

    function checkLevel(){
        if(background.allComplete()){
            newLevel();
        }else if(frog.lives < 0){
            gameOver();
        }
    }

    function gameOver(){

        if(!recordedScore){
            let first = JSON.parse(localStorage.getItem(FirstPlaceKey));
            let second = JSON.parse(localStorage.getItem(SecondPlaceKey));
            let third = JSON.parse(localStorage.getItem(ThirdPlaceKey));
            let fourth = JSON.parse(localStorage.getItem(FourthPlaceKey));
            let fifth = JSON.parse(localStorage.getItem(FifthPlaceKey));

            if(first == null){
                first = 0;
            }
            if(second == null){
                second = 0;
            }
            if(third == null){
                third = 0;
            }
            if(fourth == null){
                fourth = 0;
            }
            if(fifth == null){
                fifth = 0;
            }

            if(Math.ceil(frog.score) > first){
                localStorage.setItem(FirstPlaceKey, Math.ceil(frog.score));
                localStorage.setItem(SecondPlaceKey, first);
                localStorage.setItem(ThirdPlaceKey, second);
                localStorage.setItem(FourthPlaceKey, third);
                localStorage.setItem(FifthPlaceKey, fourth);
            }

            else if(Math.ceil(frog.score) > second){
                localStorage.setItem(SecondPlaceKey, Math.ceil(frog.score));
                localStorage.setItem(ThirdPlaceKey, second);
                localStorage.setItem(FourthPlaceKey, third);
                localStorage.setItem(FifthPlaceKey, fourth);
            }

            else if(Math.ceil(frog.score) > third){
                localStorage.setItem(ThirdPlaceKey, Math.ceil(frog.score));
                localStorage.setItem(FourthPlaceKey, third);
                localStorage.setItem(FifthPlaceKey, fourth);
            }

            else if(Math.ceil(frog.score) > fourth){
                localStorage.setItem(FourthPlaceKey, Math.ceil(frog.score));
                localStorage.setItem(FifthPlaceKey, fourth);
            }

            else if(Math.ceil(frog.score) > fifth){
                localStorage.setItem(FifthPlaceKey, Math.ceil(frog.score));
            }

            MyGame.screens['high-scores'].initialize();

            recordedScore = true;
        }

        frog.setGameOver(true);

        if(!playedEndGameJingle){
            fxYouLose.play();
            playedEndGameJingle = true;
        }
        
        
        
        
    }

    function checkLillyPads(){
        if(background.onLillyPad(frog.center.x, frog.center.y)){
            particlesWin.splash(frog.center.x * deltaX, frog.center.y * deltaY);
            frog.resetToStartPosition();
            frog.addToScore(1000,level);
            fxAchievment.play();
        }
    }


    function Sound(src, maxStreams = 10, vol = 0.5){
        this.streamNum = 0;
        this.streams = [];
        this.ready = false;

        for(var i = 0; i < maxStreams; i++){
            this.streams.push(new Audio(src));
            this.streams[i].volume = vol;
        }

        this.play = function(){
            this.streamNum = (this.streamNum + 1) % maxStreams;
            this.streams[this.streamNum].play();
        }

        this.stop = function(){
            this.streams[this.streamNum].pause();
            this.streams[this.streamNum].currentWarpTime = 0;
        }

        this.onload = function() {
            this.ready = true;
        }
    }
    



    //////////////////////
    // Collision Handling
    //////////////////////

    function distBetweenPoints(x1, y1, x2, y2){
        return Math.sqrt(Math.pow(x2-x1, 2)+ Math.pow(y2-y1,2));
    }

    function findVehicleDimensions(type){
        switch(type){
            case '1':
                return {width: 127, height: 69};
            case '2':
                return {width: 135, height: 71};
            case '3':
                return {width: 134, height: 71};
            case '4':
                return {width: 178, height: 66};
            case '5':
                return {width: 285, height: 66};
        }
    }

    function findLogDimensions(type){
        switch(type){
            case '1':
                return {width: 353, height: 59};
            case '2':
                return {width: 273, height: 59};
            case '3':
                return {width: 185, height: 59};
            case '4':
                return {width: 147, height: 61};
        }
    }

    function drawHitBoxes(){

        let vehicleHitBox = { x:0, y:0, w:0, h:0 };
        let logHitBox = { x:0, y:0, w:0, h:0 };

        let frogHitCircle = { 
            x:frog.center.x * deltaX + 30, 
            y:frog.center.y * deltaY + 30, 
            radius: 12
        };

        for(let i = 0; i < Vehicles.length; i++){
            vehicleHitBox.x = Vehicles[i].center.x * deltaX + 6;
            vehicleHitBox.y = Vehicles[i].center.y * deltaY;
            vehicleHitBox.width = findVehicleDimensions(Vehicles[i].type).width * 0.9 - 12;
            vehicleHitBox.height = findVehicleDimensions(Vehicles[i].type).height * 0.9;

            context.strokeStyle = 'red';
            context.strokeRect(
                vehicleHitBox.x, 
                vehicleHitBox.y, 
                vehicleHitBox.width, 
                vehicleHitBox.height 
            );
            context.stroke();

            context.strokeStyle = 'red';
            context.beginPath();
            context.arc(frogHitCircle.x, frogHitCircle.y, frogHitCircle.radius, 0, 2 * Math.PI);
            context.stroke();
        }

        for(let i = 0; i < Logs.length; i++){
            logHitBox.x = Logs[i].center.x * deltaX + 15;
            logHitBox.y = Logs[i].center.y * deltaY;
            logHitBox.width = findLogDimensions(Logs[i].type).width * 0.9 - 30;
            logHitBox.height = findLogDimensions(Logs[i].type).height;

            context.strokeStyle = 'green';
            context.strokeRect(
                logHitBox.x, 
                logHitBox.y, 
                logHitBox.width, 
                logHitBox.height 
            );
            context.stroke();
        }

    }

    function checkForDeadlyCollisions(){
        let vehicleHitBox = { x:0, y:0, w:0, h:0 };
        let frogHitCircle = { 
            x:frog.center.x * deltaX + 30, 
            y:frog.center.y * deltaY + 30, 
            radius: 12
        };

        for(let i = 0; i < Vehicles.length; i++){
            vehicleHitBox.x = Vehicles[i].center.x * deltaX;
            vehicleHitBox.y = Vehicles[i].center.y * deltaY;
            vehicleHitBox.width = findVehicleDimensions(Vehicles[i].type).width * 0.9;
            vehicleHitBox.height = findVehicleDimensions(Vehicles[i].type).height * 0.9;

            if (collides(vehicleHitBox, frogHitCircle)){
                if(!frog.isDead){
                    particlesFrog.splash(frog.center.x * deltaX, frog.center.y * deltaY);
                }
                frog.died();
            }
        }
    }

    function checkForSafeCollisions(){
        let logHitBox = { x:0, y:0, w:0, h:0 };
        let frogHitCircle = { 
            x:frog.center.x * deltaX + 30, 
            y:frog.center.y * deltaY + 30, 
            radius: 12
        };

        for(let i = 0; i < Logs.length; i++){
            logHitBox.x = Logs[i].center.x * deltaX + 15;
            logHitBox.y = Logs[i].center.y * deltaY;
            logHitBox.width = findLogDimensions(Logs[i].type).width * 0.9 - 30;
            logHitBox.height = findLogDimensions(Logs[i].type).height;

            if (collides(logHitBox, frogHitCircle)){
                frog.riding({speed:Logs[i].speed, direction: Logs[i].direction});
                frog.setIsRiding(true);
                return;
            }else{
                frog.riding({speed:0, direction: ''});
                frog.setIsRiding(false);
            }
        }
    }

    function checkIfInWater(){
        if(frog.center.y < 6 && frog.center.y > 0 &&!frog.isRiding){
            if(!frog.isDead){
                particlesWater.splash(frog.center.x * deltaX, frog.center.y * deltaY);
            }
            frog.died();
        }
    }

    function collides (rectangle, sphere){
        if(sphere.x + sphere.radius >  rectangle.x &&
            sphere.x - sphere.radius < (rectangle.x + rectangle.width) &&
            sphere.y + sphere.radius >  rectangle.y &&
            sphere.y - sphere.radius < (rectangle.y + rectangle.height)) 
         {  
            return true;
         }else{
            return false;
        }
    }

    //////////////////////
    // Input Handling
    //////////////////////

    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    //////////////////////
    //
    // Game Loop
    //
    //////////////////////
    function update(elapsedTime) {
        if(frog.isDead){
            blockKeys();
        }else{
            bindKeys();
        }

        if(frog.gameOver){
            bindKeys();
        }

        if(!frog.gameOver){
            checkForDeadlyCollisions();
            checkForSafeCollisions();
            checkIfInWater();
        }
        

        checkLillyPads();
        checkLevel();


        frog.update(elapsedTime);
        frog.frogRender.update(elapsedTime);
        updateAllVehicles(elapsedTime);
        updateAllLogs(elapsedTime);

        particlesFrog.update(elapsedTime);
        particlesWater.update(elapsedTime);
        particlesWin.update(elapsedTime);
    }

    function render(elapsedTime) {
        graphics.clear();

        renderer.Background.render(background);
        renderer.HUD.render(frog, level, background);
        renderAllVehicles();
        renderAllLogs();

        waterRenderer.render();
        frogGuts.render();
        winRenderer.render();

        frog.frogRender.render(frog);


        

        // drawHitBoxes();

    }

    function gameLoop(time) {
        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;

        processInput(elapsedTime);

        update(elapsedTime);
        render(elapsedTime);   

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    function initialize() {
        newGame();
        bindKeys();
    }

    function resetEverything(){
        newGame();
        bindKeys();
    }

    function bindKeys(){
        //
        // Bind keys
        if(!frog.gameOver){
            document.addEventListener('keydown', keyHandler);
        }else{
            document.addEventListener('keydown', keyHandlerEscape);
        }
        
        
    }

    function blockKeys(){
        document.removeEventListener('keydown', keyHandler);
    }

    function keyHandler(){
        if(event.key == 'Escape'){
            //
            // Stop the game loop by canceling the request for the next animation frame
            cancelNextRequest = true;
            //
            //Reset everything
            resetEverything();

            // document.removeEventListener('keydown', keyHandler);
            
            //
            // Then, return to the main menu
            game.showScreen('main-menu');
        }else{
            frog.jumpAround(event.key, background.isSafe, level);
        }
    }

    function keyHandlerEscape(){
        if(event.key == 'Escape'){
            //
            // Stop the game loop by canceling the request for the next animation frame
            cancelNextRequest = true;
            //
            //Reset everything
            resetEverything();

            // document.removeEventListener('keydown', keyHandler);
            
            //
            // Then, return to the main menu
            game.showScreen('main-menu');
        }
    }

    function run() {
        lastTimeStamp = performance.now();
        cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
    }

    return {
        initialize : initialize,
        run : run
    };

}(MyGame.game, MyGame.objects, MyGame.render, MyGame.graphics, MyGame.input, MyGame.systems));
