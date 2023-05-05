"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const fieldObject_js_1 = require("./fieldObject.js");
const vector2d_js_1 = require("./vector2d.js");
const assets_js_1 = require("./assets.js");
const PIXI = __importStar(require("pixi.js"));
var GameState;
(function (GameState) {
    GameState[GameState["Start"] = 0] = "Start";
    GameState[GameState["Run"] = 1] = "Run";
    GameState[GameState["Result"] = 2] = "Result";
})(GameState || (GameState = {}));
;
class Game {
    /**
     *
     * @param app
     */
    constructor(app) {
        this.app = app;
        this.chara = new fieldObject_js_1.FieldObject();
        this.objects = new Array();
        this.camera = new vector2d_js_1.Vector2d();
        //キャラ
        this.chara = new fieldObject_js_1.FieldObject();
        this.chara.setSizeX(100);
        this.chara.setSizeY(80);
        //タイトル
        this.nextGameState = GameState.Start;
    }
    /**
     * 初期化処理
     */
    init() {
        this.score = 0;
        this.moveSpeed = 10;
        this.jumpState = false;
        this.gravity = 1;
        this.floorPosY = 630;
        this.prevObjTime = 0;
        //-----キャラを初期位置に設定
        this.chara.setPosX(100);
        this.chara.setPosY(550);
        //-----カメラを初期位置に設定
        this.camera.setX(0);
        this.camera.setY(0);
        //-----オブジェクト削除
        this.deleteAllObject();
    }
    /**
     * 更新処理
     */
    update() {
        //シーン変更の処理
        this.changeScene();
        //シーン毎の処理
        if (this.gameState == GameState.Start) {
            this.udpateStart();
        }
        if (this.gameState == GameState.Run) {
            this.udpateRun();
        }
        if (this.gameState == GameState.Result) {
            this.udpateResult();
        }
    }
    /**
     *
     */
    changeScene() {
        if (this.gameState == this.nextGameState) {
            return;
        }
        //-----PREV
        if (this.gameState == GameState.Start) {
            this.app.stage.removeChild(this.titleLogo);
        }
        if (this.gameState == GameState.Result) {
            this.app.stage.removeChild(this.resultBack);
            this.app.stage.removeChild(this.buttonRetry);
            this.app.stage.removeChild(this.buttonTitleback);
            this.app.stage.removeChild(this.resultScore);
        }
        //-----NEXT
        if (this.nextGameState == GameState.Start) {
            this.titleLogo = new PIXI.Sprite(assets_js_1.Assets.instance.getTexture("title_logo"));
            this.titleLogo.x = 0;
            this.titleLogo.y = 0;
            this.titleLogo.zIndex = 10;
            this.app.stage.addChild(this.titleLogo);
            this.init();
        }
        if (this.nextGameState == GameState.Run) {
            this.init();
        }
        if (this.nextGameState == GameState.Result) {
            //背景
            this.resultBack = new PIXI.Sprite(assets_js_1.Assets.instance.getTexture("result_back"));
            this.resultBack.zIndex = 10;
            this.app.stage.addChild(this.resultBack);
            //リトライボタン
            this.buttonRetry = new PIXI.Sprite(assets_js_1.Assets.instance.getTexture("button_retry"));
            this.buttonRetry.x = 185;
            this.buttonRetry.y = 440;
            this.buttonRetry.zIndex = 21;
            this.buttonRetry.interactive = true;
            this.buttonRetry.on('pointertap', () => { this.nextGameState = GameState.Run; });
            this.app.stage.addChild(this.buttonRetry);
            //タイトルにもどるボタン
            this.buttonTitleback = new PIXI.Sprite(assets_js_1.Assets.instance.getTexture("button_titleback"));
            this.buttonTitleback.x = 670;
            this.buttonTitleback.y = 440;
            this.buttonTitleback.zIndex = 21;
            this.buttonTitleback.interactive = true;
            this.buttonTitleback.on('pointertap', () => { this.nextGameState = GameState.Start; });
            this.app.stage.addChild(this.buttonTitleback);
            //スコア
            this.resultScore = new PIXI.Text(Math.floor(this.score));
            this.resultScore.x = 1000;
            this.resultScore.y = 280;
            this.resultScore.zIndex = 11;
            this.app.stage.addChild(this.resultScore);
        }
        this.gameState = this.nextGameState;
    }
    /**
     *
     */
    udpateStart() {
    }
    /**
     *
     */
    udpateRun() {
        //キャラクター更新
        this.udpateChara();
        //オブジェクト更新
        this.updateObject();
        //スコア更新
        this.score += this.moveSpeed / 100;
    }
    /**
     *
     */
    udpateChara() {
        //this.chara.getSplite().rotation += 0.05;
        //重力
        this.chara.addForce(0, this.gravity);
        //横移動
        var dx = 0;
        var dy = 0;
        dx += this.moveSpeed;
        //外力
        dx += this.chara.getForce().getX();
        dy += this.chara.getForce().getY();
        //移動
        this.moveCharaX(dx);
        this.moveCharaY(dy);
    }
    /**
     *
     */
    updateObject() {
        //
        this.prevObjTime += 1;
        //オブジェクト生成判定
        if (this.isGenerateObject()) {
            this.createObject();
        }
        //オブジェクト削除判定
        var n = this.getObjectNum();
        for (var i = n - 1; i >= 0; i--) {
            //メンダコから200px以上離れていたら削除
            if (this.objects[i].getPos().getX() + 200 < this.chara.getPos().getX()) {
                this.app.stage.removeChild(this.objects[i].getSplite());
                this.objects.splice(i, 1);
            }
        }
    }
    udpateResult() {
    }
    /**
     * X軸方向のキャラ移動
     * @param dx
     */
    moveCharaX(dx) {
        var absX = dx;
        var utilX = 1;
        if (dx < 0) {
            absX = -dx;
            utilX = -1;
        }
        for (var i = 0; i < absX; i++) {
            this.chara.addPos(utilX, 0);
            this.camera.add(utilX, 0);
            //物体との当たり判定
            if (this.checkObjectCollision()) {
                this.chara.addPos(-utilX, 0);
                this.camera.add(-utilX, 0);
                this.gameover();
                break;
            }
        }
    }
    /**
     * Y軸方向のキャラ移動
     * @param dy
     */
    moveCharaY(dy) {
        var absY = dy;
        var utilY = 1;
        if (dy < 0) {
            absY = -dy;
            utilY = -1;
        }
        for (var i = 0; i < absY; i++) {
            this.chara.addPos(0, utilY);
            //物体との当たり判定
            if (this.checkObjectCollision()) {
                this.chara.addPos(0, -utilY);
                this.gameover();
                break;
            }
            //床との当たり判定
            if (this.checkFloorCollision()) {
                this.chara.addPos(0, -utilY);
                this.chara.setForceY(0);
                this.jumpState = false;
                break;
            }
        }
    }
    /**
     * オブジェクト生成処理
     */
    createObject() {
        //オブジェクト
        var object = new fieldObject_js_1.FieldObject();
        object.setPosX(1280 + this.chara.getPos().getX());
        object.setPosY(500);
        object.setSizeX(80);
        object.setSizeY(120);
        this.objects.push(object);
        //スプライト
        const splite = new PIXI.Sprite(assets_js_1.Assets.instance.getTexture("object1"));
        object.setSplite(splite);
        splite.zIndex = 1;
        splite.x = object.getPos().getX();
        splite.y = object.getPos().getY();
        this.app.stage.addChild(splite);
        //
        this.prevObjTime = 0;
    }
    deleteAllObject() {
        //オブジェクト削除判定
        var n = this.getObjectNum();
        for (var i = n - 1; i >= 0; i--) {
            this.app.stage.removeChild(this.objects[i].getSplite());
            this.objects.splice(i, 1);
        }
    }
    /**
     * 障害物との当たり判定
     * @returns
     */
    checkObjectCollision() {
        var num = this.getObjectNum();
        for (var i = 0; i < num; i++) {
            var obj = this.getObject(i);
            if (this.chara.isCollision(obj)) {
                return true;
            }
        }
        return false;
    }
    /**
     * 床との当たり判定
     * @returns
     */
    checkFloorCollision() {
        var y = this.chara.getPos().getY();
        y += this.chara.getSize().getY();
        if (y >= this.floorPosY) {
            return true;
        }
        return false;
    }
    /**
     * ゲームオーバー時の処理
     */
    gameover() {
        //状態更新
        this.nextGameState = GameState.Result;
    }
    /**
     * キー入力時の処理
     */
    keyEvent() {
        if (this.gameState == GameState.Start) {
            this.nextGameState = GameState.Run;
        }
        else if (this.gameState == GameState.Run) {
            if (!this.jumpState) {
                this.jumpState = true;
                this.chara.addForce(0, -25);
            }
        }
        else if (this.gameState == GameState.Result) {
        }
    }
    /**
     * オブジェクト生成判定
     * @returns
     */
    isGenerateObject() {
        if (this.prevObjTime >= 100) {
            return true;
        }
        return false;
    }
    getChara() { return this.chara; }
    getObject(index) { return this.objects[index]; }
    getObjectNum() { return this.objects.length; }
    getCamera() { return this.camera; }
    getScore() { return this.score; }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map