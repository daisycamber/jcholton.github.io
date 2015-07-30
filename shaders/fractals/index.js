var game = new Phaser.Game(800, 600, Phaser.AUTO, 'shader', { create: create, update: update });

var filter;
var sprite;

function create() {

    var fragmentSrc = [
                       "#ifdef GL_ES",
                       "precision mediump float;",
                       "#endif",
                       
                       //Learning fractals...
                       
                       "uniform float time;",
                       "uniform vec2 resolution;",
                       
                       "const int max_iter = 100;",
                       
                       "void main( void ) {",
                       
                       "vec2 position = (( gl_FragCoord.xy / resolution.xy ) / (1.0/4.0)) - 2.0;",
                       
                       "int io = 0;",
                       "vec2 z = position;",
                       "vec2 c = -1.75+.25*vec2(cos(time-length(position)*7.), sin(time))*sqrt((position.x*position.x) + (position.y*position.y));",
                       "for(int i=0;i<max_iter;i++)",
                       "{",
                       "z = (z*z) + c;",
                       
                       "if(length(z) > 2.3)",
                       "break;",
                       
                       "io = i;",
                       "}",
                       
                       "vec3 val = vec3(io,io,io);",
                       
                       "gl_FragColor = vec4( val.x/45.0, val.y/15.0, val.z/100.0, 1 );",
                       
                       "}"
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
