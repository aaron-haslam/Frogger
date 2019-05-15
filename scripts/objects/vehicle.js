// --------------------------------------------------------------
//
// Creates a Vehicle object, with functions for managing state.
//
//
// --------------------------------------------------------------
MyGame.objects.Vehicle = function(spec) {
    'use strict';

    let imageReady = false;
    let image = new Image();

    image.onload = function() {
        imageReady = true;
    }
    image.src = spec.imageSrc;
    

    function update(elapsedTime){
        if(spec.direction == 'left'){
            spec.center.x -= spec.speed * elapsedTime;
            if(spec.center.x < -5){
                spec.center.x = 17
            }
        }else{
            spec.center.x += spec.speed * elapsedTime;
            if(spec.center.x > 17){
                spec.center.x = -5
            }
        }
        
    }

    

    let api = {
        get imageReady() { return imageReady; },
        get image() { return image; },
        get center() { return spec.center; },
        get type() { return spec.type; },
        get direction() { return spec.direction; },
        update: update,
    };

    return api;
}
