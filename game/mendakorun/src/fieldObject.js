"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldObject = void 0;
const vector2d_1 = require("./vector2d");
class FieldObject {
    constructor(posX = 0, posY = 0, sizeX = 0, sizeY = 0) {
        this.id = '';
        this.pos = new vector2d_1.Vector2d(posX, posY);
        this.size = new vector2d_1.Vector2d(sizeX, sizeY);
        this.deleteFlag = false;
        this.force = new vector2d_1.Vector2d(0, 0);
    }
    addPos(x, y) {
        this.pos.add(x, y);
    }
    addForce(x, y) {
        this.force.add(x, y);
    }
    isCollision(obj) {
        var x11 = obj.getPos().getX();
        var y11 = obj.getPos().getY();
        var x12 = x11 + obj.getSize().getX();
        var y12 = y11 + obj.getSize().getY();
        var x21 = this.pos.getX();
        var y21 = this.pos.getY();
        var x22 = x21 + this.size.getX();
        var y22 = y21 + this.size.getY();
        if (x11 >= x22) {
            return false;
        }
        if (x12 <= x21) {
            return false;
        }
        if (y11 >= y22) {
            return false;
        }
        if (y12 <= y21) {
            return false;
        }
        return true;
    }
    setId(id) { this.id = id; }
    setPosX(x) { this.pos.setX(x); }
    setPosY(y) { this.pos.setY(y); }
    setSizeX(x) { this.size.setX(x); }
    setSizeY(y) { this.size.setY(y); }
    setForceX(x) { this.force.setX(x); }
    setForceY(y) { this.force.setY(y); }
    setDeleteFlag(flag) { this.deleteFlag = flag; }
    setSplite(splite) { this.splite = splite; }
    getId() { return this.id; }
    getPos() { return this.pos; }
    getSize() { return this.size; }
    getForce() { return this.force; }
    getDeleteFlag() { return this.deleteFlag; }
    getSplite() { return this.splite; }
}
exports.FieldObject = FieldObject;
//# sourceMappingURL=fieldObject.js.map