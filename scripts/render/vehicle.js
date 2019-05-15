// --------------------------------------------------------------
//
// Renders a Vehicle
//
//
// --------------------------------------------------------------
MyGame.render.Vehicle = (function(graphics) {
    'use strict';

    function render(spec) {
        if (spec.imageReady) {
            graphics.drawVehicle(spec.image, spec.center, spec.type, spec.direction);
        }
    }

    return {
        render: render
    };
}(MyGame.graphics));
