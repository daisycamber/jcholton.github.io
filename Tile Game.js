var game = new Phaser.Game(800, 600, Phaser.AUTO, 'tilegame', { preload: preload, create: create, update: update, render: render });

function preload() {
    
    game.load.tilemap('map', '/static/apps/tile_game/media/map1.json', null, Phaser.Tilemap.TILED_JSON);
    
    game.load.image('kenney', '/static/apps/tile_game/media/kenney.png');
    game.load.spritesheet('drill', '/static/apps/tile_game/media/drill.png',123, 90); // or 123
    
    
}

var map;
var layer;
var cursors;
var player;
var facing = 'left';


function create() {
    
    map = game.add.tilemap('map');
    
    map.addTilesetImage('kenney');
    
    layer = map.createLayer('Tile Layer 1');
    
    layer.resizeWorld();
    
    map.setCollisionByExclusion([1,20]);
    
    player = game.add.sprite(260, 1650, 'drill');
    game.physics.enable(player);
    player.body.bounce.set(0.1);
    player.body.tilePadding.set(32);
    player.body.collideWorldBounds = true;
    player.body.setSize(64,60);
    player.body.offset = new Phaser.Point(28,18);
    
    player.animations.add('left', [0, 1, 2, 1], 10, true);
    player.animations.add('right', [47,48,49,48], 10, true);
    
    player.animations.add('drillL', [23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47], 25000/drillingTime, true);
    player.animations.add('drillR', [69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93], 25000/drillingTime, true);
    
    
    game.camera.follow(player);
    
    game.physics.arcade.gravity.y = 500;
    
    cursors = game.input.keyboard.createCursorKeys();
}

var drillTimer = 0;
var drillingTime = 2000;
var breakPoint = .66;
var drilling = false;
var tileBroken = false;

function update() {
    // Handle collisions
    game.physics.arcade.collide(player, layer);
    
    // If the up (jump) button is pressed
    if (game.input.keyboard.isDown(Phaser.Keyboard.W) && player.body.onFloor())
    {
        player.body.velocity.y = -300; // Jump
    }
    // If the down (drill) button is pressed
    else if (game.input.keyboard.isDown(Phaser.Keyboard.S))
    {
        
        
        // If not drilling, start drilling
        if(!drilling) {
            // Handle animations
            if(facing == 'left')
                player.animations.play('drillL');
            else
                player.animations.play('drillR');
            
            // Remember that we started drilling
            drilling = true;
            
            // Start the timer so we know when to stop
            drillTimer = game.time.now;
        }
        
        
        // If time has passed that is GREATER than when we started drilling plus how long the drilling takes.
        // This means that drilling is done, but the animation isn't finished
        if(game.time.now > drillTimer + drillingTime * breakPoint) {
            if(layer.getTileY(player.y) > 26)
                map.putTile(20, layer.getTileX(player.x + 70), layer.getTileY(player.y + 60) + 1, layer);
            else
                map.putTile(1, layer.getTileX(player.x + 70), layer.getTileY(player.y + 60) + 1, layer);
            
            
            drillTimer = game.time.now;
        }
    }
    
    if(drilling && (game.time.now > drillTimer + drillingTime)) {
        drilling = false;
        
        
        drillTimer = game.time.now;
    }
    
    // If the player stopped drilling, stop the drilling and the animation.
    if(drilling && !game.input.keyboard.isDown(Phaser.Keyboard.S) ) {
        drilling = false;
        drillTimer = game.time.now;
        if(facing == 'left')
            player.animations.play('left');
        else
            player.animations.play('right');
    }
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        facing = 'left';
        player.animations.play('left');
        player.body.velocity.x = -150;
        
        drilling = false;
        drillTimer = game.time.now;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        facing = 'right';
        player.animations.play('right');
        player.body.velocity.x = 150;
        
        drilling = false;
        drillTimer = game.time.now;
    }
    else if((!game.input.keyboard.isDown(Phaser.Keyboard.D) && !game.input.keyboard.isDown(Phaser.Keyboard.A)) && !drilling) {
        player.animations.stop();
        player.body.velocity.x = 0;
    }
    else {
        player.body.velocity.x = 0;
    }
}

function render() {
    
    //  Useful debug things you can turn on to see what's happening
    
    // game.debug.spriteBounds(sprite);
    // game.debug.cameraInfo(game.camera, 32, 32);
    //game.debug.body(player);
    //game.debug.bodyInfo(player, 32, 32);
    
}