// --------------------------------------------------------------
//
// Renders a HUD object.
//
//
// --------------------------------------------------------------
MyGame.render.HUD = (function(graphics) {
    'use strict';

    function render(frog, level, background) {
        if(background.imageReady){
            graphics.drawHud(frog.score, frog.lives, level, background.image, frog);
        }
        
    }

    return {
        render: render
    };
}(MyGame.graphics));
