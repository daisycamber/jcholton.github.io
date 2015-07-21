var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    //game.stage.backgroundColor = '#000066';


    game.load.image('stars', 'starfield.png');
    game.load.image('bullet', 'anarchy.png');
    game.load.image('phaser', 'rocket.png');
    game.load.image('planet1', 'planet1.png');
    game.load.image('planet2', 'planet2.png');
    game.load.image('planet3', 'planet3.png');
    game.load.image('planet4', 'planet4.png');
    game.load.image('planet5', 'planet5.png');
    game.load.image('planet6', 'planet6.png');
    
    
    game.load.image('cia', 'cia.png');
    game.load.image('nsa', 'nsa.png');
    game.load.image('irs', 'irs.jpg');
    game.load.image('president', 'president.png');
    game.load.image('fbi', 'fbi.png');
    game.load.image('usa', 'usa.gif');
    

}

var cursors;
var ship;
var bullets;

var fireRate = 100;
var nextFire = 0;

var firebutton;


var starfield;

var government;

function create() {
     game.physics.startSystem(Phaser.Physics.P2JS);
     
     game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Modify the world and camera bounds
    game.world.setBounds(-2000, -2000, 4000, 4000);
    
    starfield = game.add.tileSprite(0, 0, 800, 600, 'stars');
    starfield.fixedToCamera = true;
    
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    for (var i = 0; i < 20; i++)
    {
        game.add.sprite(game.world.randomX, game.world.randomY, 'planet1');
        game.add.sprite(game.world.randomX, game.world.randomY, 'planet2');
        game.add.sprite(game.world.randomX, game.world.randomY, 'planet3');
        game.add.sprite(game.world.randomX, game.world.randomY, 'planet4');
        game.add.sprite(game.world.randomX, game.world.randomY, 'planet5');
        game.add.sprite(game.world.randomX, game.world.randomY, 'planet6');
    }
    
    //  The baddies!
    government = game.add.group();
    government.enableBody = true;
    government.physicsBodyType = Phaser.Physics.ARCADE;
    
    for (var x = 0; x < 50; x++)
    {
        var gov = government.create(game.world.randomX, game.world.randomY, 'usa');
        gov.body.moves = false;
        var gov = government.create(game.world.randomX, game.world.randomY, 'president');
        gov.body.moves = false;
        var gov = government.create(game.world.randomX, game.world.randomY, 'cia');
        gov.body.moves = false;
        var gov = government.create(game.world.randomX, game.world.randomY, 'irs');
        gov.body.moves = false;
        var gov = government.create(game.world.randomX, game.world.randomY, 'nsa');
        gov.body.moves = false;
        var gov = government.create(game.world.randomX, game.world.randomY, 'fbi');
        gov.body.moves = false;
    }
    
    
    
    

    ship = game.add.sprite(300, 300, 'phaser');
    ship.width = 40;
    ship.height = 80;
    game.physics.p2.enable(ship);

    cursors = game.input.keyboard.createCursorKeys();
    
    
    
    

}

function update() {

/*if (cursors.left.isDown) {ship.body.rotateLeft(100);}   //ship movement
    else if (cursors.right.isDown){ship.body.rotateRight(100);}
    else {ship.body.setZeroRotation();}
    if (cursors.up.isDown){ship.body.thrust(400);}
    else if (cursors.down.isDown){ship.body.reverse(400);}*/
    
    accelerateToPoint(ship, game.camera.x + game.input.mousePointer.x,game.camera.y + game.input.mousePointer.y, 70);
    
    
    if (fireButton.isDown)
    {
        fire();
    }
    
    game.physics.arcade.overlap(bullets, government, collisionHandler, null, this);
    
    game.camera.x = ship.x - 400;
    game.camera.y = ship.y - 250;
    
    
}

function collisionHandler (bullet, government) {

    //  When a bullet hits an alien we kill them both
    bullet.kill();
    government.kill();
}

function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();
        bullet.width = 20;
        bullet.height = 20;

        bullet.reset(ship.x, ship.y);

        game.physics.arcade.moveToPointer(bullet, 600);
    }

}

function accelerateToPoint(obj1, x, y, speed) {
    if (typeof speed === 'undefined') { speed = 60; }
    var angle = Math.atan2(y - obj1.y, x - obj1.x);
    obj1.body.rotation = angle + game.math.degToRad(90);
    obj1.body.force.x = Math.cos(angle) * speed;    // accelerateToObject 
    obj1.body.force.y = Math.sin(angle) * speed;
}

function render() {

    //game.debug.cameraInfo(game.camera, 32, 32);

}