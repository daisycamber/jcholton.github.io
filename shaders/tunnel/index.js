var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'shader', { preload: preload, create: create, update: update });

var background;
var filter;

function preload() {
    
    game.load.image('texture', 'texture.png');
    game.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/Tunnel.js');
    
}

function create() {
    
    background = game.add.sprite(0, 0, 'texture');
    background.width = 800;
    background.height = 600;
    
    filter = game.add.filter('Tunnel', 800, 600, background.texture);
    
    //	You have the following value to play with (default value is 2.0):
    filter.origin = 0;
    
    background.filters = [filter];
    
}

function update() {
    
    filter.update();
    
    //	Uncomment for coolness :)
     filter.origin = filter.origin + 0.001;
    
}