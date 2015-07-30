var game = new Phaser.Game(800, 600, Phaser.AUTO, 'shader', { create: create, update: update });

var filter;
var sprite;

function create() {

    var fragmentSrc = [
                       "#ifdef GL_ES",
                       "precision highp float;",
                       "#endif",
                       
                       "uniform float time;",
                       "uniform vec2 mouse;",
                       "uniform vec2 resolution;",
                       
                       "#define PI 3.14159265359",
                       
                       "vec3 hsv2rgb(vec3 c) {",
                       "vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);",
                       "vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);",
                       "return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);",
                       "}",
                       
                       "void main( void ) {",
                       
                       "vec2 position = ( gl_FragCoord.xy / resolution.xy);",
                       
                       "float x = (position.x - 0.5) * 0.5;",
                       "float y = (position.y - 0.5) * 0.4;",
                       "float col1 = 0.5 + 0.5 * sin( length(vec2(x,y)) * 100.0 - time);",
                       //float col2 = ( (atan(y,x)+PI)/(PI/2.0) + 1.0 - time/2.0);
                       //float col2 = 0.0;
                       "float col2 = (atan(y,x)/PI);",
                       "float color = 0.44 + 0.36 * sin((col1 + col2)/2.0 * PI * 2.0);",
                       //float color = mod((col1+col2)/2.0, 1.0);
                       
                       "gl_FragColor = vec4( hsv2rgb(vec3((color/5.)+0.1, 1, (0.3-color)+0.7)), 1.0 );",
                       //gl_FragColor = vec4( color, color, color, 1.0 );				
                       
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
