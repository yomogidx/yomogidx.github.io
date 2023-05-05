import { Vector2d } from "./vector2d";
import * as PIXI from 'pixi.js'

export class FieldObject {
    private id: string;
    private pos: Vector2d;
    private size: Vector2d;
    private force: Vector2d;
    private deleteFlag: boolean;
    private splite: PIXI.Sprite;

    constructor(
        posX: number = 0,
        posY: number = 0,
        sizeX: number = 0,
        sizeY: number = 0) {
        this.id = '';
        this.pos = new Vector2d(posX, posY);
        this.size = new Vector2d(sizeX, sizeY);
        this.deleteFlag = false;
        this.force = new Vector2d(0, 0);
    }

    public addPos(x: number, y: number): void {
        this.pos.add(x, y);
    }

    public addForce(x: number, y: number): void {
        this.force.add(x, y);
    }

    public isCollision(obj: FieldObject) {
        var x11 = obj.getPos().getX();
        var y11 = obj.getPos().getY();
        var x12 = x11 + obj.getSize().getX();
        var y12 = y11 + obj.getSize().getY();
        var x21 = this.pos.getX();
        var y21 = this.pos.getY();
        var x22 = x21 + this.size.getX();
        var y22 = y21 + this.size.getY();
    
        if (x11 >= x22) { return false; }
        if (x12 <= x21) { return false; }
        if (y11 >= y22) { return false; }
        if (y12 <= y21) { return false; }
        return true;
    }
    
    public setId(id: string): void { this.id = id; }
    public setPosX(x: number): void { this.pos.setX(x); }
    public setPosY(y: number): void { this.pos.setY(y); }
    public setSizeX(x: number): void { this.size.setX(x); }
    public setSizeY(y: number): void { this.size.setY(y); }
    public setForceX(x: number): void { this.force.setX(x); }
    public setForceY(y: number): void { this.force.setY(y); }
    public setDeleteFlag(flag: boolean) { this.deleteFlag = flag; }
    public setSplite(splite: PIXI.Sprite) { this.splite = splite; }

    public getId(): string { return this.id; }
    public getPos(): Vector2d { return this.pos; }
    public getSize(): Vector2d { return this.size; }
    public getForce(): Vector2d { return this.force; }
    public getDeleteFlag(): boolean { return this.deleteFlag; }
    public getSplite(): PIXI.Sprite { return this.splite; }
}