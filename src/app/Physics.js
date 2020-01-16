"use strict";
exports.__esModule = true;
var Physics = /** @class */ (function () {
    function Physics() {
        this.update = function (dt) {
            var i;
            var e;
            var velocity;
            var entities = game.entities;
            for (i = entities.length - 1; i >= 0; i--) {
                e = entities[i];
                velocity = Vector2d.vectorScalarMultiply(e.direction, e.speed);
                e.position = Vector2d.vectorAdd(e.position, Vector2d.vectorScalarMultiply(velocity, dt));
            }
        };
    }
    return Physics;
}());
exports.Physics = Physics;
var Vector2d = /** @class */ (function () {
    function Vector2d(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2d.vectorAdd = function (v1, v2) {
        return new Vector2d(v1.x + v2.x, v1.y + v2.y);
    };
    Vector2d.vectorSubtract = function (v1, v2) {
        return new Vector2d(v1.x - v2.x, v1.y - v2.y);
    };
    Vector2d.vectorScalarMultiply = function (v, s) {
        return new Vector2d(v.x * s, v.y * s);
    };
    Vector2d.vectorLength = function (v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    };
    Vector2d.vectorNormalise = function (v) {
        var reciprocal = 1.0 / (Vector2d.vectorLength(v) + 1.0e-037);
        return Vector2d.vectorScalarMultiply(v, reciprocal);
    };
    return Vector2d;
}());
exports.Vector2d = Vector2d;
var Rectangle = /** @class */ (function () {
    function Rectangle(x, y, width, height) {
        var _this = this;
        this.left = function () {
            return _this.x;
        };
        this.right = function () {
            return _this.x + _this.width;
        };
        this.top = function () {
            return _this.y;
        };
        this.bottom = function () {
            _this.y + _this.height;
        };
        this.intersects = function (rectangle) {
            return _this.right() >= rectangle.left() && _this.left() <= rectangle.right() && _this.top() <= rectangle.botom() && _this.bottom() >= rectangle.top();
        };
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Rectangle.rectUnion = function (r1, r2) {
        if (r1 === undefined) {
            return r2;
        }
        if (r2 === undefined) {
            return r1;
        }
        var x = Math.min(r1.x, r2.x);
        var y = Math.min(r1.y, r2.y);
        var width = Math.max(r1.right(), r2.right()) - Math.min(r1.left(), r2.left());
        var height = Math.max(r1.bottom(), r2.bottom()) - Math.min(r1.top(), r2.top());
        return new Rectangle(x, y, width, height);
    };
    return Rectangle;
}());
