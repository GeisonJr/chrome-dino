var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import Entity from '../entity/index.js';
var Dinosaur = /** @class */ (function (_super) {
    __extends(Dinosaur, _super);
    function Dinosaur(options) {
        var _this = _super.call(this, __assign({ image: './assets/dinosaur/0.bmp', x: 0, y: 0 }, options)) || this;
        // States
        _this._alive = true;
        _this._duck = false;
        _this._jump = false;
        _this._sprite = 0;
        _this._duration = 0;
        _this._updated = 0;
        // Score
        _this._score = 0;
        _this._highscore = 0;
        // Physics
        _this._velocity = 0;
        return _this;
    }
    Object.defineProperty(Dinosaur.prototype, "alive", {
        get: function () {
            return this._alive;
        },
        set: function (value) {
            this._alive = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Dinosaur.prototype, "duck", {
        get: function () {
            return this._duck;
        },
        set: function (value) {
            this._duck = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Dinosaur.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        set: function (value) {
            this._duration = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Dinosaur.prototype, "jump", {
        get: function () {
            return this._jump;
        },
        set: function (value) {
            this._jump = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Dinosaur.prototype, "highscore", {
        get: function () {
            return this._highscore;
        },
        set: function (value) {
            this._highscore = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Dinosaur.prototype, "updated", {
        get: function () {
            return this._updated;
        },
        set: function (value) {
            this._updated = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Dinosaur.prototype, "score", {
        get: function () {
            return this._score;
        },
        set: function (value) {
            this._score = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Dinosaur.prototype, "sprite", {
        get: function () {
            return this._sprite;
        },
        set: function (value) {
            this._sprite = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Dinosaur.prototype, "velocity", {
        get: function () {
            return this._velocity;
        },
        set: function (value) {
            this._velocity = value;
        },
        enumerable: false,
        configurable: true
    });
    Dinosaur.prototype.animate = function () {
        if (!this.alive)
            return;
        if (!this.duration)
            return;
        var now = performance.now();
        if (now - this.updated < this.duration)
            return;
        this.updated = now;
        if (this.duck) {
            this.image.src = "./assets/dinosaur/".concat(this.sprite, ".bmp");
            if (this.sprite === 0)
                this.sprite = 1;
            else if (this.sprite === 1)
                this.sprite = 4;
            else if (this.sprite === 2)
                this.sprite = 3;
            else if (this.sprite === 3)
                this.sprite = 4;
            else if (this.sprite === 4)
                this.sprite = 3;
        }
        else if (this.jump) {
            this.image.src = "./assets/dinosaur/".concat(this.sprite, ".bmp");
            this.sprite = 0;
        }
        else {
            this.image.src = "./assets/dinosaur/".concat(this.sprite, ".bmp");
            if (this.sprite === 0)
                this.sprite = 1;
            else if (this.sprite === 1)
                this.sprite = 2;
            else if (this.sprite === 2)
                this.sprite = 1;
            else if (this.sprite === 3)
                this.sprite = 2;
            else if (this.sprite === 4)
                this.sprite = 1;
        }
    };
    Dinosaur.prototype.draw = function (context) {
        // TODO: Draw the dinosaur
        //...
        _super.prototype.draw.call(this, context);
    };
    return Dinosaur;
}(Entity));
export default Dinosaur;
