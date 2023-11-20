var Canvas = /** @class */ (function () {
    function Canvas(options) {
        var _a, _b, _c;
        this._canvas = document.createElement('canvas');
        if (options === null || options === void 0 ? void 0 : options.id)
            this.canvas.id = options.id;
        if (options === null || options === void 0 ? void 0 : options.parent)
            this.parent = options.parent;
        this.canvas.height = (_a = options === null || options === void 0 ? void 0 : options.height) !== null && _a !== void 0 ? _a : 0;
        this.canvas.width = (_b = options === null || options === void 0 ? void 0 : options.width) !== null && _b !== void 0 ? _b : 0;
        this._context = this.canvas.getContext((_c = options === null || options === void 0 ? void 0 : options.context) !== null && _c !== void 0 ? _c : '2d');
    }
    Object.defineProperty(Canvas.prototype, "canvas", {
        get: function () {
            return this._canvas;
        },
        set: function (value) {
            this._canvas = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Canvas.prototype, "context", {
        get: function () {
            return this._context;
        },
        set: function (value) {
            this._context = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Canvas.prototype, "height", {
        get: function () {
            return this.canvas.height;
        },
        set: function (value) {
            this.canvas.height = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Canvas.prototype, "parent", {
        get: function () {
            return this.canvas.parentElement;
        },
        set: function (value) {
            var _a;
            (_a = this.canvas.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(this.canvas);
            value.appendChild(this.canvas);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Canvas.prototype, "width", {
        get: function () {
            return this.canvas.width;
        },
        set: function (value) {
            this.canvas.width = value;
        },
        enumerable: false,
        configurable: true
    });
    return Canvas;
}());
export default Canvas;
