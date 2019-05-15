MyGame.screens['help'] = (function(game) {
    'use strict';
    
    function initialize() {
        document.getElementById('id-help-back').addEventListener(
            'click',
            function() { game.showScreen('main-menu'); });

            let up = localStorage.getItem('control_up');
            let down = localStorage.getItem('control_down');
            let left = localStorage.getItem('control_left');
            let right = localStorage.getItem('control_right');

            if(up == null){
                localStorage.setItem('control_up', 'ArrowUp');
                up = 'ArrowUp';
            }
            if(down == null){
                localStorage.setItem('control_down', 'ArrowDown');
                down = 'ArrowDown';
            }
            if(left == null){
                localStorage.setItem('control_left', 'ArrowLeft');
                left = 'ArrowLeft';
            }
            if(right == null){
                localStorage.setItem('control_right', 'ArrowRight');
                right = 'ArrowRight';
            }

            writeToScreen(up, down, left, right);

            document.getElementById('changeMoveUp').addEventListener(
                'click',
                function() { changeUp(); });
            document.getElementById('changeMoveDown').addEventListener(
                'click',
                function() { changeDown(); });
            document.getElementById('changeMoveLeft').addEventListener(
                'click',
                function() { changeLeft(); });
            document.getElementById('changeMoveRight').addEventListener(
                'click',
                function() { changeRight(); });
    }

    function writeToScreen(up, down, left, right){
        document.getElementById('controlUp').innerHTML = up;
        document.getElementById('controlDown').innerHTML = down;
        document.getElementById('controlLeft').innerHTML = left;
        document.getElementById('controlRight').innerHTML = right;
    }

    function changeUp(){
        document.getElementById('controlUp').innerHTML = '.... Press new key ....';

        document.addEventListener('keydown', function() {
            document.getElementById('controlUp').innerHTML = event.key;
            localStorage.setItem('control_up', event.key);
            MyGame.screens['game-play'].initialize();
            
          }, {once: true});
    }

    function changeDown(){
        document.getElementById('controlDown').innerHTML = '.... Press new key ....';

        document.addEventListener('keydown', function() {
            document.getElementById('controlDown').innerHTML = event.key;
            localStorage.setItem('control_down', event.key);
            MyGame.screens['game-play'].initialize();
            
          }, {once: true});
    }

    function changeLeft(){
        document.getElementById('controlLeft').innerHTML = '.... Press new key ....';

        document.addEventListener('keydown', function() {
            document.getElementById('controlLeft').innerHTML = event.key;
            localStorage.setItem('control_left', event.key);
            MyGame.screens['game-play'].initialize();
            
          }, {once: true});
    }

    function changeRight(){
        document.getElementById('controlRight').innerHTML = '.... Press new key ....';

        document.addEventListener('keydown', function() {
            document.getElementById('controlRight').innerHTML = event.key;
            localStorage.setItem('control_right', event.key);
            MyGame.screens['game-play'].initialize();
            
          }, {once: true});
    }


    

    

    
    
    function run() {
        //
        // I know this is empty, there isn't anything to do.
    }
    
    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game));
