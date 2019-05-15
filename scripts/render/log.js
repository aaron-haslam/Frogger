// --------------------------------------------------------------
//
// Renders a Log
//
//
// --------------------------------------------------------------
MyGame.render.Log = (function(graphics) {
    'use strict';

    function render(spec) {
        if (spec.imageReady) {
            graphics.drawLog(spec.image, spec.center, spec.type, spec.direction);
        }
    }

    return {
        render: render
    };
}(MyGame.graphics));
