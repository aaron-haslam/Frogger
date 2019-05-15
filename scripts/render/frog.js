// --------------------------------------------------------------
//
// Renders an animated model based on a spritesheet.
//
// --------------------------------------------------------------
MyGame.render.Frog = function(spec, graphics) {
    'use strict';

    let animationTime = 0;
    let subImageIndex = 0;
    let subTextureWidth = 0;
    let image = new Image();
    let isReady = false;  // Can't render until the texture is loaded

    //
    // Load he texture to use for the particle system loading and ready for rendering
    image.onload = function() {
        isReady = true;
        subTextureWidth = image.width / spec.spriteCount;
    }
    image.src = spec.spriteSheet;

    let image2 = new Image();
    image2.src = './assets/images/frogger_sprites.png';
    let isReady2 = false;  // Can't render until the texture is loaded

    image2.onload = function() {
        isReady2 = true;
    }
   

    //------------------------------------------------------------------
    //
    // Update the state of the animation
    //
    //------------------------------------------------------------------
    function update(elapsedTime) {
        animationTime += elapsedTime;
        //
        // Check to see if we should update the animation frame
        if (animationTime >= spec.spriteTime[subImageIndex]) {
            //
            // When switching sprites, keep the leftover time because
            // it needs to be accounted for the next sprite animation frame.
            animationTime -= spec.spriteTime[subImageIndex];

            if(spec.animate){
                if(subImageIndex == spec.spriteCount - 1){
                    subImageIndex = 0;
                    setAnimate(false);
                }else{
                    subImageIndex += 1;
                }

                
            }else{
                subImageIndex = 0;
            }
            
            
            //
            // Wrap around from the last back to the first sprite as needed
            // subImageIndex = subImageIndex % spec.spriteCount;
        }
    }

    function setAnimate(value){
        spec.animate = value;
    }

    //------------------------------------------------------------------
    //
    // Render the specific sub-texture animation frame
    //
    //------------------------------------------------------------------
    function render(model) {
        if (isReady && !model.isDead) {
            graphics.drawSubTexture(image, subImageIndex, subTextureWidth, model.center, model.rotation, model.size);
        }
        else if(model.isDead){
            if(isReady2){
                graphics.drawPixel(image2, 'dead',model.center.x, model.center.y);
            }
        }
    }

    let api = {
        update: update,
        render: render,
        setAnimate: setAnimate,
    };

    return api;
};
