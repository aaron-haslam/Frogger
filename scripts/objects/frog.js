// --------------------------------------------------------------
//
// Creates a Frog object, with functions for managing state.
//
//
// --------------------------------------------------------------
MyGame.objects.Frog = function(spec) {
    'use strict';
    let scoringPositions = [];

    let fxJump = new Sound("./assets/sounds/jump.mp3", 10, 0.05);
    let fxDie = new Sound("./assets/sounds/die.mp3", 1, 0.3);


    fxJump.onload();
    fxDie.onload();

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


    function jumpAround(key, isSafe , level){
        switch(key){
            case(localStorage.getItem('control_up')):
                if(isSafe(spec.center.x, spec.center.y - 1)){
                    spec.jump = true;
                    spec.frogRender.setAnimate(true);
                    spec.rotation = Math.PI;
                    spec.center.y--;
                    addToScore(100, level);
                }
                break;
            case(localStorage.getItem('control_down')):
                if(isSafe(spec.center.x, spec.center.y + 1)){
                    spec.jump = true;
                    spec.frogRender.setAnimate(true);
                    spec.rotation = 0;
                    spec.center.y++;
                }
                break;
            case(localStorage.getItem('control_left')):
                if(isSafe(spec.center.x - 1, spec.center.y)){
                    spec.jump = true;
                    spec.frogRender.setAnimate(true);
                    spec.rotation = Math.PI/2;
                    spec.center.x --;
                }
                break;
            case(localStorage.getItem('control_right')):
                if(isSafe(spec.center.x + 1, spec.center.y)){
                    spec.jump = true;
                    spec.frogRender.setAnimate(true);
                    spec.rotation = -Math.PI/2;
                    spec.center.x ++;
                }
                break;
        }
        if(fxJump.ready){
            fxJump.play();
        }
    }

    function resetToStartPosition(){
        spec.center.x = 6;
        spec.center.y = 12;
        spec.rotation = Math.PI;
        scoringPositions = [];
    }

    function reset(){
        spec.center.x = 6;
        spec.center.y = 12;
        spec.rotation = Math.PI;
        spec.score = 0;
        spec.lives = 5;
        spec.gameOver = false;
        spec.died.isDead = false;
    }

    function addToScore(amount, multiplier){
        let score = true;
        for(let i = 0; i < scoringPositions.length;i++){
            if(scoringPositions[i] == spec.center.y){
                score = false;
            }
        }

        if(score){
            scoringPositions.push(spec.center.y);

            spec.score += amount * multiplier;
        }
        
    }

    function died(){
        if(!spec.died.isDead){
            spec.lives--;
        }
        
        
        spec.died.isDead = true;

        if(fxDie.ready){
            fxDie.play();
        }
    }

    function riding(value){
        spec.riding = {speed: value.speed, direction: value.direction};
    }

    function setIsRiding(value){
        spec.isRiding = value;
    }

    function setGameOver(value){
        spec.gameOver = value;
    }

    function update(elapsedTime){

        if(!spec.died.isDead){
            if(spec.riding.direction == 'left'){
                spec.center.x -= spec.riding.speed * elapsedTime;
            }else{
                spec.center.x += spec.riding.speed * elapsedTime;
            }
    
            if(spec.center.x < 0){
                spec.center.x = 0;
            }
            if(spec.center.x >= 12){
                spec.center.x = 12;
            }
            if(spec.center.y < 0){
                spec.center.y = 0;
            }
            if(spec.center.y >= 12){
                spec.center.y = 12;
            }
        }

        
        
        if(spec.died.isDead){
            if(spec.died.time >= 0){
                spec.died.time -= elapsedTime;
            }else{
                if(!spec.gameOver){
                    resetToStartPosition();
                    spec.died.isDead = false;
                }
                
                
                spec.died.time = 1200;
                
            }
        }
        
    }

    let api = {
        get size() { return spec.size; },
        get center() { return spec.center; },
        get rotation() { return spec.rotation; },
        get frogRender() { return spec.frogRender; },
        get jump() { return spec.jump; },
        get score() { return spec.score; },
        get lives() { return spec.lives; },
        get isRiding() { return spec.isRiding; },
        get gameOver() { return spec.gameOver; },
        get isDead() { return spec.died.isDead; },
        update: update,        
        jumpAround: jumpAround,
        resetToStartPosition: resetToStartPosition,
        addToScore: addToScore,
        reset: reset,
        died: died,
        riding: riding,
        setIsRiding: setIsRiding,
        setGameOver: setGameOver,
    };

    return api;
}
