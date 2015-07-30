var game = new Phaser.Game(800, 600, Phaser.AUTO, 'shader', { create: create, update: update });

var filter;
var sprite;

function create() {

    var fragmentSrc = [
                       "#ifdef GL_ES",
                       "precision mediump float;",
                       "#endif",
                       
                       "uniform float time;",
                       "uniform vec2 mouse;",
                       "uniform vec2 resolution;",
                       
                       "float garb(vec2 v, float m) {",
                       "return (mod(v.x*m + (1.-v.y)*m, (1.-v.x*m)+v.y*m));}",
                       
                       "void main() {",
                       "vec2 pos = ( gl_FragCoord.xy / resolution.xy );",
                       "float a = garb(vec2(pos.y, cos(tan(pos.y+pos.x+1000001.))), cos(time)+1.5);",
                       "float c = garb(vec2(pos.y, cos(tan(pos.x+1000001.+time*.5))), cos(a+time)+1.5);",
                       // Change these values for color
                       "gl_FragColor = vec4(.9*a+.15+.9*c,.4*a+.3+.9*c,.06*a+.3+.6*c,2.);}"
                       ];

    filter = new Phaser.Filter(game, null, fragmentSrc);
    filter.setResolution(800, 600);

    sprite = game.add.sprite();
    sprite.width = 800;
    sprite.height = 600;

    sprite.filters = [ filter ];

}

function update() {

    filter.update(game.input.activePointer);

}
