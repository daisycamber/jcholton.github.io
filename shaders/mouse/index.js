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
                       
                       "uniform sampler2D lastFrame;",
                       
                       "void main( void ) {",
                       "vec2 uv;",
                       "vec2 mousePos;",
                       "vec4 outColor;",
                       
                       "uv = gl_FragCoord.xy / resolution.xy - vec2(0.5);",
                       "uv.y *= resolution.y / resolution.x;",
                       
                       "mousePos = mouse - vec2(0.5);",
                       "mousePos.y *= resolution.y / resolution.x;",
                       
                       "outColor = vec4(1.0, 1.0, 1.0, 1.0);",
                       "outColor *= 0.05 / distance(uv, mousePos);",
                       
                       "gl_FragColor = mix(outColor, texture2D(lastFrame, gl_FragCoord.xy / resolution.xy), 0.98);",
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
