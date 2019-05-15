// --------------------------------------------------------------
//
// Renders a Background.
//
//
// --------------------------------------------------------------
MyGame.render.Background = (function(graphics) {
    'use strict';

    function render(spec) {
        if(spec.imageReady){
            graphics.drawBackground(spec.image, spec.occupiedLillypads);
        }
    }

    return {
        render: render
    };
}(MyGame.graphics));
