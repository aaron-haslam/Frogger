MyGame.screens['high-scores'] = (function(game) {
    'use strict';
    
    function initialize() {
        document.getElementById('id-high-scores-back').addEventListener(
            'click',
            function() { game.showScreen('main-menu'); });


        let first = localStorage.getItem('first');
        let second = localStorage.getItem('second');
        let third = localStorage.getItem('third');
        let fourth = localStorage.getItem('fourth');
        let fifth = localStorage.getItem('fifth');

        
            
            

        if(first == null){
            first = 0;
        }
        if(second == null){
            second = 0;
        }
        if(third == null){
            third = 0;
        }
        if(fourth == null){
            fourth = 0;
        }
        if(fifth == null){
            fifth = 0;
        }

        document.getElementById('first').innerHTML = first;
        document.getElementById('second').innerHTML = second;
        document.getElementById('third').innerHTML = third;
        document.getElementById('fourth').innerHTML = fourth;
        document.getElementById('fifth').innerHTML = fifth;
        
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
