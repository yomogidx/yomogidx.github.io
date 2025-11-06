import { FieldObject } from "./fieldObject.js";
import { Vector2d } from "./vector2d.js";
import { Assets } from "./assets.js";
import * as PIXI from 'pixi.js';
export class Game {
    /**
     * フィールド
     */
    app;
    distance; // 距離
    socre; // スコア
    textScore; // スコア表示
    chara; // つちのこ
    balloon; // 風船
    objects; //障害物
    stage; // ステージオブジェクト
    line; // 風船とつちのこの線
    camera; //カメラ
    /**
     * コンストラクタ
     * @param app
     */
    constructor(app) {
        // オブジェクト生成
        this.app = app;
        this.chara = new FieldObject();
        this.balloon = new FieldObject();
        this.objects = new Array();
        this.stage = new Array();
        this.line = new PIXI.Graphics();
        this.camera = new Vector2d();
        // 線
        app.stage.addChild(this.line);
        // ウインドウ
        const windowSprite = new PIXI.Sprite(Assets.instance.getTexture("window"));
        app.stage.addChild(windowSprite);
        windowSprite.interactive = true;
        windowSprite.on('pointerdown', () => { this.keyEvent(); });
        windowSprite.zIndex = 30;
        // 風船
        const balloonSprite = new PIXI.Sprite(Assets.instance.getTexture("balloon"));
        this.balloon.setSizeX(100);
        this.balloon.setSizeY(70);
        this.balloon.setPosX(30);
        this.balloon.setPosY(420);
        balloonSprite.x = this.balloon.getPos().getX();
        balloonSprite.y = this.balloon.getPos().getY();
        balloonSprite.zIndex = 20;
        this.app.stage.addChild(balloonSprite);
        this.balloon.setSplite(balloonSprite);
        // キャラ
        const charaSprite = new PIXI.Sprite(Assets.instance.getTexture("chara"));
        this.chara.setSizeX(100);
        this.chara.setSizeY(50);
        this.chara.setPosX(30);
        this.chara.setPosY(450);
        charaSprite.x = this.chara.getPos().getX();
        charaSprite.y = this.chara.getPos().getY();
        charaSprite.zIndex = 21;
        this.app.stage.addChild(charaSprite);
        this.chara.setSplite(charaSprite);
        // ステージオブジェクト
        // 床
        var name = "stage1";
        var object = new FieldObject();
        object.setSizeX(400);
        object.setSizeY(50);
        object.setPosX(0);
        object.setPosY(550);
        this.stage.push(object);
        const splite1 = new PIXI.Sprite(Assets.instance.getTexture(name));
        object.setSplite(splite1);
        splite1.zIndex = 11;
        splite1.x = object.getPos().getX();
        splite1.y = object.getPos().getY();
        this.app.stage.addChild(splite1);
        // ダンボール
        var name = "stage2";
        var object = new FieldObject();
        object.setSizeX(158);
        object.setSizeY(100);
        object.setPosX(30);
        object.setPosY(480);
        this.stage.push(object);
        const splite2 = new PIXI.Sprite(Assets.instance.getTexture(name));
        object.setSplite(splite2);
        splite2.zIndex = 11;
        splite2.x = object.getPos().getX();
        splite2.y = object.getPos().getY();
        this.app.stage.addChild(splite2);
        // スコア
        this.textScore = new PIXI.Text('飛距離：0メートル');
        app.stage.addChild(this.textScore);
    }
    /**
     * 初期化処理
     */
    init() {
        this.distance = 0;
        this.socre = 0;
        //-----カメラ位置初期化
        this.camera.setX(0);
        this.camera.setY(0);
    }
    /**
     * 更新処理
     */
    update() {
        this.distance += 1;
        // 移動
        //this.chara.getSplite().x += 1;
        // 風船更新処理
        this.updateBalloon();
        // キャラ更新
        this.updateChara();
        // 線更新
        this.updateLine();
        // カメラ更新
        this.updateCamera();
        // スコア更新
        //this.textScore.text = 'スコア：' + Math.floor(this.distance) +'点';
        this.distance = Math.ceil((this.chara.getPos().getY() - 450) * -0.01);
        this.textScore.text = '飛距離' + this.distance + 'メートル';
    }
    /**
     * 風船更新処理
     */
    updateBalloon() {
        var dy = 0;
        // 重力
        this.balloon.addForce(0, 0.1);
        // 外力
        dy += this.balloon.getForce().getY();
        // 移動
        this.balloon.setPosY(this.balloon.getPos().getY() + dy);
        // 当たり判定
        if (this.balloon.getPos().getY() >= 420) {
            this.balloon.setPosY(420);
            this.balloon.setForceY(0);
        }
    }
    /**
     * キャラクター更新処理
     */
    updateChara() {
        var dy = 0;
        // 重力
        this.chara.addForce(0, 0.3);
        // 線の長さ
        var lineSize = this.chara.getPos().getY() - this.balloon.getPos().getY();
        if (lineSize >= 150) {
            this.chara.addForce(0, -0.5);
            //this.chara.setPosY(this.balloon.getPos().getY() + 150);
        }
        if (lineSize >= 200) {
            this.chara.setPosY(this.balloon.getPos().getY() + 200);
            this.chara.setForceY(0);
        }
        // 外力
        dy += this.chara.getForce().getY();
        // 移動
        this.chara.setPosY(this.chara.getPos().getY() + dy);
        // 当たり判定
        if (this.chara.getPos().getY() >= 450) {
            this.chara.setPosY(450);
            this.chara.setForceY(0);
        }
    }
    /**
     * 線の更新処理
     */
    updateLine() {
        // カメラ
        var cameraX = this.camera.getX();
        var cameraY = this.camera.getY();
        // 
        var x1 = cameraX + this.chara.getPos().getX() + this.chara.getSize().getX() / 2;
        var y1 = cameraY + this.chara.getPos().getY() + this.chara.getSize().getY() / 2;
        var x2 = cameraX + this.balloon.getPos().getX() + this.balloon.getSize().getX() / 2;
        var y2 = cameraY + this.balloon.getPos().getY() + this.balloon.getSize().getY() / 2;
        this.line.clear();
        this.line.lineStyle(2, 0x000000).moveTo(x1, y1).lineTo(x2, y2);
    }
    /**
     * 線の更新処理
     */
    updateCamera() {
        var y = this.chara.getPos().getY();
        if (y <= 300) {
            this.camera.setY(300 - y);
        }
        else {
            this.camera.setY(0);
        }
        //this.camera.setY(this.chara.getPos().getY());
    }
    /**
     * キー入力時の処理
     */
    keyEvent() {
        this.balloon.getForce().getY();
        this.balloon.setForceY(-5);
        //this.balloon.addForce(0, -5);
    }
    /**
     * 描画処理
     */
    render() {
        // カメラ
        var cameraX = this.camera.getX();
        var cameraY = this.camera.getY();
        // 風船
        this.balloon.getSplite().x = cameraX + this.balloon.getPos().getX();
        this.balloon.getSplite().y = cameraY + this.balloon.getPos().getY();
        // つちのこ
        this.chara.getSplite().x = cameraX + this.chara.getPos().getX();
        this.chara.getSplite().y = cameraY + this.chara.getPos().getY();
        // ステージオブジェクト
        this.stage[0].getSplite().x = cameraX + this.stage[0].getPos().getX();
        this.stage[0].getSplite().y = cameraY + this.stage[0].getPos().getY();
        this.stage[1].getSplite().x = cameraX + this.stage[1].getPos().getX();
        this.stage[1].getSplite().y = cameraY + this.stage[1].getPos().getY();
    }
}
//# sourceMappingURL=game.js.map