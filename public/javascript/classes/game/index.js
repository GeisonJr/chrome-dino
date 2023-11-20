import { isArray } from '../../functions/typing/index.js';
import Cactus from '../cactus/index.js';
import Canvas from '../canvas/index.js';
import Cloud from '../cloud/index.js';
import Dinosaur from '../dinosaur/index.js';
import Ground from '../ground/index.js';
import Mountain from '../mountain/index.js';
var Game = /** @class */ (function () {
    function Game() {
        // FPS
        this._fps = 0;
        this._last = performance.now();
        this._lastUpdate = performance.now();
        // Canvas
        this._canvas = new Canvas();
        // Physics
        this._acceleration = 0.1;
        this._velocity = 10;
        this._gravity = 1.2;
        this._friction = 0.9;
        // Game
        this._state = 'stopped';
        this._cactus = [];
        this._clouds = [];
        this._dinosaurs = [];
        this._grounds = [];
        this._mountains = [];
        this._events = {};
        // Listen for events
        this.listen();
    }
    Object.defineProperty(Game.prototype, "velocity", {
        get: function () {
            return this._velocity;
        },
        set: function (value) {
            this._velocity = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "canvas", {
        get: function () {
            return this._canvas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "cactus", {
        get: function () {
            return this._cactus;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "clouds", {
        get: function () {
            return this._clouds;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "dinosaurs", {
        get: function () {
            return this._dinosaurs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "grounds", {
        get: function () {
            return this._grounds;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "mountains", {
        get: function () {
            return this._mountains;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "events", {
        get: function () {
            return this._events;
        },
        set: function (value) {
            this._events = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "fps", {
        get: function () {
            return this._fps;
        },
        set: function (value) {
            this._fps = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (value) {
            this._state = value;
        },
        enumerable: false,
        configurable: true
    });
    Game.prototype.gameOver = function () {
        this.state = 'gameover';
    };
    Game.prototype.pause = function () {
        this.state = 'paused';
    };
    Game.prototype.start = function (force) {
        if (force === void 0) { force = false; }
        if (force)
            this.preload();
        this.state = 'started';
    };
    Game.prototype.stop = function () {
        this.state = 'stopped';
    };
    Game.prototype.addEntity = function (value) {
        var values = [];
        if (isArray(value))
            values.push.apply(values, value);
        else
            values.push(value);
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value_1 = values_1[_i];
            if (value_1 instanceof Cactus)
                this.cactus.push(value_1);
            else if (value_1 instanceof Cloud)
                this.clouds.push(value_1);
            else if (value_1 instanceof Dinosaur)
                this.dinosaurs.push(value_1);
            else if (value_1 instanceof Ground)
                this.grounds.push(value_1);
            else if (value_1 instanceof Mountain)
                this.mountains.push(value_1);
        }
    };
    Game.prototype.draw = function () {
        // Clear canvas
        this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Mountains
        for (var _i = 0, _a = this.mountains; _i < _a.length; _i++) {
            var mountain = _a[_i];
            mountain.draw(this.canvas.context);
        }
        // Clouds
        for (var _b = 0, _c = this.clouds; _b < _c.length; _b++) {
            var cloud = _c[_b];
            cloud.draw(this.canvas.context);
        }
        // Grounds
        for (var _d = 0, _e = this.grounds; _d < _e.length; _d++) {
            var ground = _e[_d];
            ground.draw(this.canvas.context);
        }
        // Cactus
        for (var _f = 0, _g = this.cactus; _f < _g.length; _f++) {
            var cactus = _g[_f];
            cactus.draw(this.canvas.context);
        }
        // Dinosaurs
        for (var _h = 0, _j = this.dinosaurs; _h < _j.length; _h++) {
            var dinosaur = _j[_h];
            // dinosaur.duration -= 0.1
            dinosaur.animate();
            dinosaur.draw(this.canvas.context);
        }
        if (this.state === 'started') {
            // FPS Counter
            this.canvas.context.font = '12px monospace';
            if (this.fps < 30)
                this.canvas.context.fillStyle = 'red';
            else if (this.fps < 45)
                this.canvas.context.fillStyle = 'yellow';
            else
                this.canvas.context.fillStyle = 'green';
            var now = performance.now();
            if (now - this._lastUpdate >= 100) {
                this.fps = Math.round(1000 / (now - this._last));
                this._lastUpdate = now;
            }
            this._last = now;
            this.canvas.context.fillText("FPS: ".concat(this.fps), 10, 10 + 12);
            // Score
            var count = 0;
            for (var _k = 0, _l = this.dinosaurs; _k < _l.length; _k++) {
                var dinosaur = _l[_k];
                this.canvas.context.font = '12px monospace';
                this.canvas.context.fillStyle = 'white';
                this.canvas.context.fillText("Score: ".concat(Math.round(dinosaur.score)), 10, 10 + 12 + 12 + (12 * count++));
            }
        }
        else {
            // Apply overlay
            this.canvas.context.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.canvas.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            // Show game over
            if (this.state === 'gameover') {
                this.canvas.context.fillStyle = 'white';
                this.canvas.context.font = '36px monospace';
                this.canvas.context.fillText('Game Over', 10, 10 + 36);
            }
            // Show message to play
            this.canvas.context.fillStyle = 'white';
            this.canvas.context.font = '24px monospace';
            this.canvas.context.fillText('Press spacebar to play', 10, 10 + 36 + 24);
            // Show score
            if (this.state === 'gameover') {
                var count = 0;
                for (var _m = 0, _o = this.dinosaurs; _m < _o.length; _m++) {
                    var dinosaur = _o[_m];
                    this.canvas.context.fillStyle = 'white';
                    this.canvas.context.font = '24px monospace';
                    this.canvas.context.fillText("Score: ".concat(Math.round(dinosaur.score)), 10, 10 + 36 + 24 + 24 + (24 * count++));
                }
            }
        }
    };
    Game.prototype.gravity = function () {
        // Cactus
        //...
        // Clouds
        //...
        // Dinosaurs
        for (var _i = 0, _a = this.dinosaurs; _i < _a.length; _i++) {
            var dinosaur = _a[_i];
            var groundLevel = this.canvas.height - dinosaur.height - 10;
            if (dinosaur.jump && dinosaur.y === groundLevel) {
                // If the dinosaur can jump and is on the ground
                dinosaur.velocity = -15; // Adjust the jump strength as needed
            }
            // Simulate gravity
            var gravity = 1; // Adjust the gravity strength as needed
            dinosaur.velocity += gravity;
            // Update the dinosaur's position
            dinosaur.y += dinosaur.velocity;
            // Boundary check for the bottom of the canvas
            if (dinosaur.y >= groundLevel) {
                dinosaur.jump = false;
                dinosaur.y = groundLevel;
                // Reset velocity when on the ground to simulate smooth descent
                dinosaur.velocity = 0;
            }
        }
        // Grounds
        //...
        // Mountains
        //...
    };
    Game.prototype.parallax = function () {
        if (this.state !== 'started')
            return;
        // Cactus
        for (var _i = 0, _a = this.cactus; _i < _a.length; _i++) {
            var cactus = _a[_i];
            cactus.x -= this.velocity;
        }
        // Clouds
        for (var _b = 0, _c = this.clouds; _b < _c.length; _b++) {
            var cloud = _c[_b];
            cloud.x -= this.velocity / 5;
        }
        // Dinosaurs
        //...
        // Grounds
        for (var _d = 0, _e = this.grounds; _d < _e.length; _d++) {
            var ground = _e[_d];
            ground.x -= this.velocity;
        }
        // Mountains
        for (var _f = 0, _g = this.mountains; _f < _g.length; _f++) {
            var mountain = _g[_f];
            if (mountain.distance === 0)
                mountain.x -= this.velocity / 2;
            else if (mountain.distance === 1)
                mountain.x -= this.velocity / 3;
            else if (mountain.distance === 2)
                mountain.x -= this.velocity / 4;
        }
    };
    Game.prototype.repostion = function () {
        if (this.state !== 'started')
            return;
        // Update cactus
        for (var _i = 0, _a = this.cactus; _i < _a.length; _i++) {
            var cactus = _a[_i];
            // Reset cactus position if it's out of the screen
            if (cactus.x < -cactus.width) {
                cactus.image.src = "./assets/cactus/".concat(Math.round(Math.random() * 4), ".bmp");
                cactus.x = this.canvas.width;
                cactus.y = this.canvas.height - cactus.height - 10;
            }
        }
        // Update clouds
        for (var _b = 0, _c = this.clouds; _b < _c.length; _b++) {
            var cloud = _c[_b];
            // Reset cloud position if it's out of the screen
            if (cloud.x < -cloud.width) {
                // cloud.image.src = ''Ï
                cloud.x = this.canvas.width;
                cloud.y = Math.round(Math.random() * 30) + 30;
            }
        }
        // Update dinosaurs
        //...
        // Update grounds
        for (var _d = 0, _e = this.grounds; _d < _e.length; _d++) {
            var ground = _e[_d];
            // TODO: Fix bug where sprite is bigger than the canvas width
            // Reset ground position if it's out of the screen
            if (ground.x < -ground.width) {
                // ground.image.src = ''
                ground.x = this.canvas.width - this._velocity;
                ground.y = this.canvas.height - ground.height;
            }
        }
        // Update mountains
        for (var _f = 0, _g = this.mountains; _f < _g.length; _f++) {
            var mountain = _g[_f];
            // TODO: Fix bug where sprite is bigger than the canvas width
            // Reset mountain position if it's out of the screen
            if (mountain.x < -mountain.width)
                mountain.x = this.canvas.width - this._velocity;
        }
    };
    Game.prototype.preload = function () {
        // Cactus
        for (var _i = 0, _a = this.cactus; _i < _a.length; _i++) {
            var cactus = _a[_i];
            cactus.image.src = "./assets/cactus/".concat(Math.round(Math.random() * 4), ".bmp");
            // cactus.x = 0
            cactus.y = this.canvas.height - cactus.height - 10;
        }
        // Clouds
        for (var _b = 0, _c = this.clouds; _b < _c.length; _b++) {
            var cloud = _c[_b];
            // cloud.image.src = ''
            // cloud.x = 0
            cloud.y = Math.round(Math.random() * 30) + 30;
        }
        // Dinosaurs
        for (var _d = 0, _e = this.dinosaurs; _d < _e.length; _d++) {
            var dinosaur = _e[_d];
            // dinosaur.image.src = ''
            // dinosaur.x = 0
            dinosaur.y = this.canvas.height - dinosaur.height - 10;
            // Reset dinosaur
            dinosaur.duration = 100;
            dinosaur.ready = false;
            dinosaur.alive = true;
            dinosaur.score = 0;
        }
        // Grounds
        for (var _f = 0, _g = this.grounds; _f < _g.length; _f++) {
            var ground = _g[_f];
            // ground.image.src = ''
            // ground.x = 0
            ground.y = this.canvas.height - ground.height;
        }
        // Mountains
        for (var _h = 0, _j = this.mountains; _h < _j.length; _h++) {
            var mountain = _j[_h];
            // mountain.image.src = ''
            // mountain.x = 0
            mountain.y = this.canvas.height - mountain.height;
        }
    };
    Game.prototype.render = function () {
        var _this = this;
        this.gravity();
        this.repostion();
        this.parallax();
        // Update
        for (var _i = 0, _a = this.dinosaurs; _i < _a.length; _i++) {
            var dinosaur = _a[_i];
            var src = "./assets/dinosaur/".concat(dinosaur.sprite, ".bmp");
            if (dinosaur.image.src !== src)
                dinosaur.image.src = src;
            // Check collision
            for (var _b = 0, _c = this.cactus; _b < _c.length; _b++) {
                var cactus = _c[_b];
                // if (this.collision(dinosaur, cactus))
                // 	dinosaur.alive = false
            }
            // Update score
            dinosaur.score += 0.1;
        }
        // Check if has any dinosaur alive
        // for (const entity of this.entities) {
        // 	if (entity instanceof Dinosaur) {
        // 		const dinosaur = entity as Dinosaur
        // 		if (dinosaur.alive)
        // 			break
        // 		this.gameOver()
        // 	}
        // }
        this.draw();
        requestAnimationFrame(function () { return _this.render(); });
    };
    Game.prototype.collision = function (entity, target) {
        var entityX = entity.x + entity.width;
        var entityY = entity.y + entity.height;
        var targetX = target.x + target.width;
        var targetY = target.y + target.height;
        if (entityX >= target.x) // Check if entity is on the right of the target
            if (entityY >= target.y) // Check if entity is below the target
                if (targetX >= entity.x) // Check if target is on the right of the entity
                    if (targetY >= entity.y) // Check if target is below the entity
                        return true;
        return false;
    };
    Game.prototype.listen = function () {
        var _this = this;
        document.addEventListener('keypress', function (event) {
            if (_this.state === 'started')
                for (var _i = 0, _a = _this.dinosaurs; _i < _a.length; _i++) {
                    var dinosaur = _a[_i];
                    // Jump
                    if (['ArrowUp', 'KeyW', 'Space'].includes(event.code)) {
                        if (dinosaur.jump)
                            return;
                        dinosaur.jump = true;
                    }
                    // Duck
                    if (['ArrowDown', 'KeyS'].includes(event.code))
                        dinosaur.duck = true;
                }
            else if (_this.state === 'paused')
                _this.start();
            else if (_this.state === 'stopped')
                _this.start(true);
            else if (_this.state === 'gameover')
                _this.start(true);
        });
        document.addEventListener('keyup', function (event) {
            if (_this.state === 'started') {
                for (var _i = 0, _a = _this.dinosaurs; _i < _a.length; _i++) {
                    var dinosaur = _a[_i];
                    // Jump
                    //...
                    // Duck
                    if (['ArrowDown', 'KeyS'].includes(event.code))
                        dinosaur.duck = false;
                }
            }
        });
    };
    return Game;
}());
export default Game;
