import { isFalsy, isNullOrUndefined } from '../../functions/typing/index.js';
var Entity = /** @class */ (function () {
    function Entity(options) {
        var _a, _b, _c;
        this._ready = false;
        this._id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this._x = 0;
        this._y = 0;
        this._image = new Image();
        this._text = '';
        // Position
        this.x = (_a = options === null || options === void 0 ? void 0 : options.x) !== null && _a !== void 0 ? _a : 0;
        this.y = (_b = options === null || options === void 0 ? void 0 : options.y) !== null && _b !== void 0 ? _b : 0;
        // Image
        if (options === null || options === void 0 ? void 0 : options.image)
            this.image.src = options.image;
        // Text
        this.text = (_c = options === null || options === void 0 ? void 0 : options.text) !== null && _c !== void 0 ? _c : '';
    }
    Object.defineProperty(Entity.prototype, "ready", {
        get: function () {
            return this._ready;
        },
        set: function (value) {
            this._ready = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "height", {
        get: function () {
            return this._image.height;
        },
        set: function (value) {
            this._image.height = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "width", {
        get: function () {
            return this._image.width;
        },
        set: function (value) {
            this._image.width = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (x) {
            this._x = x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (y) {
            this._y = y;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "image", {
        get: function () {
            return this._image;
        },
        set: function (value) {
            this._image = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (value) {
            this._text = value;
        },
        enumerable: false,
        configurable: true
    });
    Entity.prototype.draw = function (context) {
        this.drawImage(context);
        this.drawText(context);
    };
    Entity.prototype.drawImage = function (context) {
        if (isNullOrUndefined(this._image))
            return;
        if (isFalsy(this._image.src))
            return;
        if (this._image.complete === false)
            return;
        context.drawImage(this._image, this._x, this._y, this._image.width, this._image.height);
    };
    Entity.prototype.drawText = function (context) {
        if (isNullOrUndefined(this._text))
            return;
        if (isFalsy(this._text))
            return;
        context.fillText(this._text, this._x, this._y);
    };
    return Entity;
}());
export default Entity;
