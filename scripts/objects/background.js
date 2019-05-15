// --------------------------------------------------------------
//
// Creates a Background object, with functions for managing state.
//
// 
//
// --------------------------------------------------------------
MyGame.objects.Background = function(spec, vehicles) {
    'use strict';

    let imageReady = false;
    let image = new Image();

    let occupiedLillypads = {
        one: false,
        two: false,
        three: false,
        four: false,
        five: false
    };

    image.onload = function() {
        imageReady = true;
    }

    image.src = spec.imageSrc;

    function checkOccupied(location){
        switch(location){
            case 'one':
                if(!occupiedLillypads.one){
                    occupiedLillypads.one = true;
                    return true;
                }else{return false;}
            case 'two':
                if(!occupiedLillypads.two){
                    occupiedLillypads.two = true;
                    return true;
                }else{return false;}
            case 'three':
                if(!occupiedLillypads.three){
                    occupiedLillypads.three = true;
                    return true;
                }else{return false;}
            case 'four':
                if(!occupiedLillypads.four){
                    occupiedLillypads.four = true;
                    return true;
                }else{return false;}
            case 'five':
                if(!occupiedLillypads.five){
                    occupiedLillypads.five = true;
                    return true;
                }else{return false;}
                
        }
    }

    function onLillyPad(x, y){
        if((Math.trunc(x) == 0 || Math.ceil(x) == 0) && y== 0){
            return true;
        }
        if((Math.trunc(x) == 3 || Math.ceil(x) == 3)  && y== 0){
            return true;
        }
        if((Math.trunc(x) == 6 || Math.ceil(x) == 6) && y== 0){
            return true;
        }
        if((Math.trunc(x) == 9 || Math.ceil(x) == 9) && y== 0){
            return true;
        }
        if((Math.trunc(x) == 12 || Math.ceil(x) == 12) && y== 0){
            return true;
        }

        
        return false;
    }

    function isSafe(x, y){

        if((x >= -1 && x < 14) && (y >= 1 && y < 14)){
            return true;
        }
        if((Math.trunc(x) == 0 || Math.ceil(x) == 0) && y== 0 && checkOccupied('one')){
            return true;
        }
        if((Math.trunc(x) == 3 || Math.ceil(x) == 3)  && y== 0 && checkOccupied('two')){
            return true;
        }
        if((Math.trunc(x) == 6 || Math.ceil(x) == 6) && y== 0 && checkOccupied('three')){
            return true;
        }
        if((Math.trunc(x) == 9 || Math.ceil(x) == 9) && y== 0 && checkOccupied('four')){
            return true;
        }
        if((Math.trunc(x) == 12 || Math.ceil(x) == 12) && y== 0 && checkOccupied('five')){
            return true;
        }

        
        return false;
        
    }

    

    function allComplete(){
        if(
            occupiedLillypads.one == true &&
            occupiedLillypads.two == true &&
            occupiedLillypads.three == true &&
            occupiedLillypads.four == true &&
            occupiedLillypads.five == true
        ){
            return true;
        }else{
            return false;
        }
    }

    function reset(){
        occupiedLillypads = {
            one: false,
            two: false,
            three: false,
            four: false,
            five: false
        };
    }
    

    let api = {
        checkOccupied: checkOccupied,
        allComplete: allComplete,
        reset: reset,
        
        get imageReady() { return imageReady; },
        get image() { return image; },
        get occupiedLillypads() { return occupiedLillypads; },
        get isSafe() { return isSafe; },
        get onLillyPad() { return onLillyPad; },
        
    };

    return api;
}
