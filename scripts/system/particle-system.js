MyGame.systems.ParticleSystem = function (spec) {
    let nextName = 1;
    let particles = {};

    function create() {
        let size = Random.nextGaussian(spec.size.mean, spec.size.stdev);
        let p = {
            center: { x: spec.center.x, y: spec.center.y },
            size: { x: size, y: size },
            direction: Random.nextCircleVector(),
            speed: Random.nextGaussian(spec.speed.mean, spec.speed.stdev), // pixels per second
            rotation: 0,
            lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev), // seconds
            alive: 0,
        };

        return p;
    }

    let amount = 0;

    function splash(x, y){
        amount = 10;
        spec.center.x = x + 20;
        spec.center.y = y + 20;
    }

    
    function update(elapsedTime) {
        let removeMe = [];

        elapsedTime = elapsedTime / 1000;

        if(amount > 0){
            for (let particle = 0; particle < 2; particle++) {
                particles[nextName++] = create();
            }
            amount--;
        }

        

        Object.getOwnPropertyNames(particles).forEach(value => {
            let particle = particles[value];

            particle.alive += elapsedTime;
            particle.center.x += (elapsedTime * particle.speed * particle.direction.x);
            particle.center.y += (elapsedTime * particle.speed * particle.direction.y);

            particle.rotation += particle.speed / 500;

            if (particle.alive > particle.lifetime) {
                removeMe.push(value);
            }
        });

        for (let particle = 0; particle < removeMe.length; particle++) {
            delete particles[removeMe[particle]];
        }
    }

    let api = {
        update: update,
        splash: splash,
        get particles() { return particles; }
    };

    return api;
};
