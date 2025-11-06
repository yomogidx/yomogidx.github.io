export class Vector2d {
    x;
    y;
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
//# sourceMappingURL=vector2d.js.map