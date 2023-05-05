"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector2d = void 0;
class Vector2d {
    constructor(x = 0, y = 0) {
        this.setX(x);
        this.setY(y);
    }
    add(x, y) {
        this.x += x;
        this.y += y;
    }
    setX(x) { this.x = x; }
    setY(y) { this.y = y; }
    getX() { return this.x; }
    getY() { return this.y; }
}
exports.Vector2d = Vector2d;
//# sourceMappingURL=vector2d.js.map