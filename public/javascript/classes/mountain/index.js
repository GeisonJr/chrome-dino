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
var Mountain = /** @class */ (function (_super) {
    __extends(Mountain, _super);
    function Mountain(options) {
        var _this = this;
        var _a;
        _this = _super.call(this, __assign({ image: './assets/mountain/0.bmp', x: 0, y: 0 }, options)) || this;
        _this._distance = 0;
        _this.distance = (_a = options === null || options === void 0 ? void 0 : options.distance) !== null && _a !== void 0 ? _a : 0;
        return _this;
    }
    Object.defineProperty(Mountain.prototype, "distance", {
        get: function () {
            return this._distance;
        },
        set: function (value) {
            this._distance = value;
        },
        enumerable: false,
        configurable: true
    });
    Mountain.prototype.draw = function (context) {
        // TODO: Draw the mountain
        //...
        _super.prototype.draw.call(this, context);
    };
    return Mountain;
}(Entity));
export default Mountain;
