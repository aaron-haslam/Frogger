MyGame.graphics = (function() {
    'use strict';

    let canvas = document.getElementById('id-canvas');
    let context = canvas.getContext('2d');

    const gameBoardSize = 13;

    const deltaX = canvas.width / gameBoardSize;
    const deltaY = canvas.height / gameBoardSize;

    const PI = Math.PI;



    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    // --------------------------------------------------------------
    //
    // Draws a texture to the canvas with the following specification:
    //    image: Image
    //    center: {x: , y: }
    //    size: { width: , height: }
    //
    // --------------------------------------------------------------
    function drawPixel(image, name, x, y){
        // x = Math.trunc(x);
        // y = Math.trunc(y);

        // context.fillStyle = color;
        // context.strokeStyle = 'rgba(0, 0, 0, 1)';
        // context.shadowColor = 'rgba(0, 0, 0, 0.8)';
        // context.fillRect(x * deltaX, y * deltaY, deltaX, deltaY);
        let imageLocation = {x: 0, y: 0};

        switch(name){
            case 'road': imageLocation.x = 316; imageLocation.y = 158;break;
            case 'grass': imageLocation.x = 135; imageLocation.y = 158;break;
            case 'water': imageLocation.x = 226; imageLocation.y = 158;break;
            case 'lillypad': imageLocation.x = 6; imageLocation.y = 158;break;
            case 'bush': imageLocation.x = 407; imageLocation.y = 158;break;
            case 'bushLilly': imageLocation.x = 497; imageLocation.y = 158;break;
            case 'dead': imageLocation.x = 302; imageLocation.y = 333;break;
        }

        if(name == 'dead'){
            context.drawImage(
                image,
                imageLocation.x, imageLocation.y,
                65, 50,
                x * deltaX, y * deltaY,
                deltaX+5, deltaY+3
            );
        }else{
            context.drawImage(
                image,
                imageLocation.x, imageLocation.y,
                82, 82,
                x * deltaX, y * deltaY,
                deltaX+5, deltaY+3
            );
        }

        
    }

    function drawBackground(image, occupiedLillypads){

        for(let i = 0; i<gameBoardSize;i++){
            drawPixel(image,'grass', i, 12);
        }
        
        

        for(let i = 0; i < gameBoardSize; i++){
            for( let j = 7; j < 12; j++){
                drawPixel(image,'road', i,j);
            }
        }

        context.save()
        context.strokeStyle = '#00000';
        context.lineWidth = 5;
        context.beginPath();
        context.moveTo(0 , canvas.height-60);
        context.lineTo(canvas.width, canvas.height - 60);
        context.stroke();
        

        context.lineWidth = 5;
        context.beginPath();
        context.moveTo(0 , 425);
        context.lineTo(canvas.width, 425);
        
        context.stroke();

        context.restore();

        for(let i = 0; i<gameBoardSize;i++){
            drawPixel(image,'grass', i, 6);
        }

        for(let i = 0; i < gameBoardSize; i++){
            for( let j = 1; j < 6; j++){
                drawPixel(image,'water', i,j);
            }
        }

        for(let i = 0; i<gameBoardSize;i++){
            if(i % 3 == 0){
                drawPixel(image,'bushLilly', i, 0);
            }else{
                drawPixel(image,'bush', i, 0);
            }
            
        }

        drawOccupiedLillyPad(image, occupiedLillypads);

        

        
        
        
        
    }

    function drawFrog(image, x,y){
        context.drawImage(
            image,
            0, 31,
            52, 37,
            x * deltaX+12, y * deltaY+22,
            deltaX-20, deltaY-25
        );
    }

    function drawOccupiedLillyPad(image, occupiedLillypads){
        if(occupiedLillypads.one){
            drawFrog(image,0,0);
        }
        if(occupiedLillypads.two){
            drawFrog(image,3,0);
        }
        if(occupiedLillypads.three){
            drawFrog(image,6,0);
        }
        if(occupiedLillypads.four){
            drawFrog(image,9,0);
        }
        if(occupiedLillypads.five){
            drawFrog(image,12,0);
        }
    }

    function drawVehicle(image, center2, type, direction){
        let location = {x: 0, y: 0};
        let size = {width: 0, height: 0};
        let rotation = 0;

        if(direction == 'left'){
            rotation = PI
        }
        

        switch(type){
            case '1':
                location = {x: 12, y: 483};
                size = {width: 127, height: 69};
                break;
            case '2':
                location = {x: 155, y: 483};
                size = {width: 135, height: 71};
                break;
            case '3':
                location = {x: 305, y: 482};
                size = {width: 134, height: 71};
                break;
            case '4':
                location = {x: 9, y: 407};
                size = {width: 178, height: 66};
                break;
            case '5':
                location = {x: 203, y: 406};
                size = {width: 285, height: 66};
                break;
        }

        let center = {x: center2.x * deltaX, y: center2.y * deltaY};

        if(rotation > 0){
            context.save();

            context.translate(center.x, center.y + 65);
            context.rotate(rotation);
            context.translate(-center.x, -center.y);

            context.drawImage(
                image,
                location.x, location.y,
                size.width, size.height,
                center.x - size.width*0.9, center.y + 4,
                size.width * 0.9, size.height * 0.9
            );

            context.restore();
        }else{
            context.drawImage(
                image,
                location.x, location.y,
                size.width, size.height,
                center.x, center.y + 4,
                size.width * 0.9, size.height * 0.9
            );
        }

        // context.strokeStyle = 'red';
        // context.strokeRect(center.x, center.y, size.width*0.9, size.height*0.9);

        

        // context.strokeStyle = 'white';
        // context.lineWidth = 20;
        // context.beginPath();
        // context.moveTo(center.x - size.width / 2, center.y + 30);
        // context.lineTo(center.x - size.width / 2 + 40, center.y + 30);
        // context.stroke();
    }

    function drawLog(image, center2, type, direction){
        let location = {x: 0, y: 0};
        let size = {width: 0, height: 0};
        let rotation = 0;

        if(direction == 'left'){
            rotation = PI
        }
        

        switch(type){
            case '1':
                location = {x: 13, y: 258};
                size = {width: 353, height: 59};
                break;
            case '2':
                location = {x: 14, y: 328};
                size = {width: 273, height: 59};
                break;
            case '3':
                location = {x: 387, y: 258};
                size = {width: 185, height: 59};
                break;
            case '4':
                location = {x: 403, y: 9};
                size = {width: 147, height: 61};
                break;
        }

        let center = {x: center2.x * deltaX, y: center2.y * deltaY};

        if(rotation > 0){
            context.save();

            context.translate(center.x, center.y + 65);
            context.rotate(rotation);
            context.translate(-center.x, -center.y);

            context.drawImage(
                image,
                location.x, location.y,
                size.width, size.height,
                center.x - size.width*0.9, center.y + 4,
                size.width * 0.9, size.height * 0.9
            );

            context.restore();
        }else{
            context.drawImage(
                image,
                location.x, location.y,
                size.width, size.height,
                center.x, center.y + 4,
                size.width * 0.9, size.height * 0.9
            );
        }
    }

    function drawTexture(image, center, rotation, size) {
        context.save();

        context.drawImage(
            image,
            center.x,
            center.y,
            20, 20
        );

        // context.translate(center.x, center.y);
        // context.rotate(rotation);
        // context.translate(-center.x, -center.y);

        // context.drawImage(
        //     image,
        //     center.x - size.width / 2,
        //     center.y - size.height / 2,
        //     size.width, size.height);

        context.restore();
    }

    function drawSubTexture(image, index, subTextureWidth, center2, rotation, size) {
        
        context.save();
        
        let center = {x: center2.x * deltaX + 30, y: center2.y * deltaY + 35};

        context.translate(center.x, center.y);
        context.rotate(rotation);
        context.translate(-center.x, -center.y);

        //
        // Pick the selected sprite from the sprite sheet to render
        context.drawImage(
            image,
            subTextureWidth * index, 0,      // Which sub-texture to pick out
            subTextureWidth, image.height,   // The size of the sub-texture
            center.x - size.x / 2,           // Where to draw the sub-texture
            center.y - size.y / 2,
            size.x, size.y);

        context.restore();
    }

    function drawHud(score, lives, level, image, frog){
        let textSize = 40;
        let textFont = "small-caps "+ textSize+"px Arial";

        context.save();
        context.shadowOffsetX = 3;
        context.shadowOffsetY = 3;
        context.shadowColor = "rgba(85, 168, 74, 0.3)";
        context.fillStyle = 'rgba(85, 168, 74, 0.6)';

        context.font = textFont;
        context.textAlign = "end";
        context.fillText("Level: " + level, canvas.width - 5, canvas.height - 5);

        if(!frog.isDead){
            context.font = textFont;
            context.textAlign = "center";
            context.fillText(score, canvas.width/2, canvas.height/2+20);
        }

        
        
        for(let i = 0; i < lives; i++){
            drawFrog(image,i/2,12);
        }

        if(frog.gameOver){
            context.save();
            context.shadowOffsetX = 3;
            context.shadowOffsetY = 3;
            context.shadowColor = "rgba(0, 0, 0, 0.3)";
            context.fillStyle = 'white';
            context.font = "small-caps 80px Arial";
            context.textAlign = "center";
            context.fillText("Game Over", canvas.width/2, canvas.height/2+30);

            context.font = "small-caps 60px Arial";
            context.fillText(score, canvas.width/2, canvas.height/2+80);

            context.font = "small-caps 40px Arial";
            context.fillText("press ESC to go back", canvas.width/2, canvas.height/2+200);
            context.restore();
        }

        context.restore();
        



        
    }

   

    function convertX(x){
        return x * canvas.width;
    }
    function convertY(y){
        return canvas.height - y * canvas.height;
    }
    
    let api = {
        get canvas() { return canvas; },
        clear: clear,
        convertX: convertX,
        convertY: convertY,
        drawTexture: drawTexture,
        drawHud: drawHud,
        drawBackground: drawBackground,
        drawSubTexture: drawSubTexture,
        drawVehicle: drawVehicle,
        drawLog: drawLog,
        drawPixel: drawPixel,
    };

    return api;
}());
