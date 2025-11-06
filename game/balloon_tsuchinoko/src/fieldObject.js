import { Vector2d } from "./vector2d";
export class FieldObject {
    id;
    pos;
    size;
    force;
    deleteFlag;
    splite;
    rotation;
    frame; //生成されてからのフレーム数
    constructor(posX = 0, posY = 0, sizeX = 0, sizeY = 0) {
        this.id = '';
        this.pos = new Vector2d(posX, posY);
        this.size = new Vector2d(sizeX, sizeY);
        this.deleteFlag = false;
        this.force = new Vector2d(0, 0);
        this.rotation = 0;
        this.frame = 0;
    }
    update() {
        this.frame += 1;
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
    setRotation(rotation) { this.rotation = rotation; }
    getId() { return this.id; }
    getPos() { return this.pos; }
    getSize() { return this.size; }
    getForce() { return this.force; }
    getDeleteFlag() { return this.deleteFlag; }
    getSplite() { return this.splite; }
    getRotation() { return this.rotation; }
    getFrame() { return this.frame; }
}
//# sourceMappingURL=fieldObject.js.map