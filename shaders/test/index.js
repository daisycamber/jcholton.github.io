var game = new Phaser.Game(800, 600, Phaser.AUTO, 'shader', { create: create, update: update });

var filter;
var sprite;

function create() {

    //  From http://glslsandbox.com/e#18958.2

    var fragmentSrc = [
                       "#ifdef GL_ES",
                       "precision mediump float;",
                       "#endif",

                       "uniform float time;",
                       "uniform vec2 mouse;",
                       "uniform vec2 resolution;",

                       "float voronoi(in vec2 uv){",
                       "vec2 lp = abs(uv)*5.;",
                       "vec2 sp = fract(lp)-2.1;",
                       "lp = floor(lp);",

                       "float d = 2.;",
                       "for (int x = -1; x < 2; x++) {",
                       "for (int y = -3; y < 1; y++) {",
                       "vec2 mp = vec2(float(x), float(y));",
                       "vec2 p = lp+mp;",

                       "d = min(d, length(sp+(cos(p.x+time)+cos(p.y+time))*.6-mp));",
                       "}",
                       "}",
                       "return 0.2 * d / pow(length(uv),1.5);",
                       "}",

                       "void main(void) {",
                       "vec2 uv = 2. * (gl_FragCoord.xy / resolution.xy - vec2(.5));",
                       "uv.y *= resolution.y / resolution. x;",

                       "float ang = atan(uv.y, uv.x);",
                       "float dst = length(uv);",
                       "float cfade = clamp(dst*50.-3.+cos(ang*2.+cos(ang*10.)*2.+time*7.)*.68, 0.,2.);",

                       "float a = 0.;",
                       "for (int i = 5; i < 7; i++) {",
                       "float fi = float(i);",
                       "vec2 luv = uv+tan((ang-dst)*fi+time+uv+fi)*.3;",
                       "a += voronoi(luv)*(1.5+(cos(luv.x*14.234)+cos(luv.y*17.234))*.4);",
                       "}",
                       "vec3 color = vec3(0.86, .2 ,0.139);",
                       "gl_FragColor = vec4(color*a*cfade,1.);",
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
