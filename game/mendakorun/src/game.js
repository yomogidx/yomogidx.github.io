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
        this.items = new Array();
        this.effects = new Array();
        //キャラ
        this.chara = new fieldObject_js_1.FieldObject();
        this.chara.setSizeX(100);
        this.chara.setSizeY(60);
        const charaSprite = new PIXI.Sprite(assets_js_1.Assets.instance.getTexture("chara"));
        charaSprite.anchor.x = 0.0;
        charaSprite.anchor.y = 0.0;
        this.app.stage.addChild(charaSprite);
        this.chara.setSplite(charaSprite);
        charaSprite.zIndex = 12;
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
        this.jump2State = false;
        this.gravity = 1;
        this.floorPosY = 630;
        this.prevObjTime = 0;
        this.nextObjTime = 0;
        this.gameOverflag = false;
        this.prevItemTime = 0;
        this.sceneFrame = 0;
        this.distance = 0;
        this.good = 0;
        this.ebi = 0;
        this.jumpPower = 25;
        //スタートロゴ
        this.startLogoDispFlag = false;
        this.startLogoDeleteFlag = false;
        //タイトル
        this.titleStartDispFlag = false;
        //-----キャラを初期位置に設定
        this.chara.setPosX(100);
        this.chara.setPosY(550);
        this.chara.setForceX(0);
        this.chara.setForceY(0);
        this.chara.getSplite().anchor.x = 0.0;
        this.chara.getSplite().anchor.y = 0.0;
        this.chara.getSplite().rotation = 0;
        this.chara.setRotation(0);
        //-----カメラを初期位置に設定
        this.camera.setX(0);
        this.camera.setY(0);
        //-----オブジェクト削除
        this.deleteAllObject();
        this.deleteAllItem();
        this.deleteAllEffect();
    }
    /**
     * 更新処理
     */
    update() {
        //共通更新処理
        this.sceneFrame += 1;
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
     * シーンの変更
     */
    changeScene() {
        //
        if (this.gameState == this.nextGameState) {
            return;
        }
        //共通シーン変更処理
        this.sceneFrame = 0;
        //-----PREV
        if (this.gameState == GameState.Start) {
            this.app.stage.removeChild(this.titleLogo);
            this.app.stage.removeChild(this.titleStart);
        }
        if (this.gameState == GameState.Result) {
            this.app.stage.removeChild(this.resultBack);
            this.app.stage.removeChild(this.buttonRetry);
            this.app.stage.removeChild(this.buttonTitleback);
            this.app.stage.removeChild(this.resultScore);
            this.app.stage.removeChild(this.resultDetail);
        }
        //-----NEXT
        if (this.nextGameState == GameState.Start) {
            this.titleLogo = new PIXI.Sprite(assets_js_1.Assets.instance.getTexture("title_logo"));
            this.titleLogo.x = 0;
            this.titleLogo.y = 0;
            this.titleLogo.zIndex = 50;
            this.app.stage.addChild(this.titleLogo);
            this.titleStart = new PIXI.Sprite(assets_js_1.Assets.instance.getTexture("title_start"));
            this.titleStart.x = 1280 / 2;
            this.titleStart.y = 720 * 2 / 3;
            this.titleStart.zIndex = 50;
            this.titleStart.anchor.x = 0.5;
            this.titleStart.anchor.y = 0.5;
            this.app.stage.addChild(this.titleStart);
            //バージョン情報
            this.init();
        }
        if (this.nextGameState == GameState.Run) {
            this.init();
            //スタートの表示
            this.startLogo = new PIXI.Sprite(assets_js_1.Assets.instance.getTexture("start_logo"));
            this.startLogo.x = 1280 / 2;
            this.startLogo.y = 720 / 2;
            this.startLogo.zIndex = 50;
            this.startLogo.alpha = 0;
            this.startLogo.scale.x = 0;
            this.startLogo.scale.y = 0;
            this.startLogo.anchor.x = 0.5;
            this.startLogo.anchor.y = 0.5;
            this.startLogoDispFlag = true;
            this.app.stage.addChild(this.startLogo);
            //スタート音
            assets_js_1.Assets.instance.getSound("start").play();
        }
        if (this.nextGameState == GameState.Result) {
            //背景
            this.resultBack = new PIXI.Sprite(assets_js_1.Assets.instance.getTexture("result_back"));
            this.resultBack.zIndex = 50;
            this.app.stage.addChild(this.resultBack);
            //リトライボタン
            this.buttonRetry = new PIXI.Sprite(assets_js_1.Assets.instance.getTexture("button_retry"));
            this.buttonRetry.x = 185;
            this.buttonRetry.y = 460;
            this.buttonRetry.zIndex = 51;
            this.buttonRetry.interactive = true;
            this.buttonRetry.on('pointertap', () => {
                this.nextGameState = GameState.Run;
                assets_js_1.Assets.instance.getSound("button").play();
            });
            this.app.stage.addChild(this.buttonRetry);
            //タイトルにもどるボタン
            this.buttonTitleback = new PIXI.Sprite(assets_js_1.Assets.instance.getTexture("button_titleback"));
            this.buttonTitleback.x = 670;
            this.buttonTitleback.y = 460;
            this.buttonTitleback.zIndex = 51;
            this.buttonTitleback.interactive = true;
            this.buttonTitleback.on('pointertap', () => {
                this.nextGameState = GameState.Start;
                assets_js_1.Assets.instance.getSound("button").play();
            });
            this.app.stage.addChild(this.buttonTitleback);
            //スコア
            const scoreFontStyle = new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 48,
                fill: ['#000000'],
                align: 'right',
            });
            this.resultScore = new PIXI.Text(Math.floor(this.score) + "点", scoreFontStyle);
            this.resultScore.x = 430;
            this.resultScore.y = 185;
            this.resultScore.zIndex = 51;
            this.app.stage.addChild(this.resultScore);
            //詳細
            const detailFontStyle = new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 24,
                fill: ['#000000'],
                align: 'left',
            });
            this.resultDetail = new PIXI.Text("・移動距離：" + Math.floor(this.distance) + "（+" + Math.floor(this.distance) + "点）\n" +
                "・いいね：" + this.good + "（+" + (this.good * 10) + "点）\n" +
                "・エビ：" + this.ebi + "（+" + (this.ebi * 30) + "点）", detailFontStyle);
            this.resultDetail.x = 250;
            this.resultDetail.y = 275;
            this.resultDetail.zIndex = 51;
            this.app.stage.addChild(this.resultDetail);
        }
        this.gameState = this.nextGameState;
    }
    /**
     * タイトル画面の更新
     */
    udpateStart() {
        if (this.titleStartDispFlag) {
            this.titleStart.alpha += 0.01;
            if (this.titleStart.alpha >= 1) {
                this.titleStartDispFlag = false;
            }
        }
        else {
            this.titleStart.alpha -= 0.01;
            if (this.titleStart.alpha <= 0) {
                this.titleStartDispFlag = true;
            }
        }
    }
    /**
     * ゲーム画面の更新
     */
    udpateRun() {
        //スタートロゴ
        this.updateStartLogo();
        //キャラクター更新
        this.udpateChara();
        //オブジェクト更新
        this.updateObject();
        //カメラ更新
        this.updateCamera();
        //アイテム更新
        this.updateItem();
        //エフェクト更新
        this.updateEffect();
        //終了判定
        if (this.gameOverflag) {
            this.gameover();
        }
        //スコア更新
        this.score += this.moveSpeed / 100;
        this.distance += this.moveSpeed / 100;
        //移動速度アップ
        this.moveSpeed = 10 + Math.floor(this.distance / 30);
        //if (this.distance)
    }
    /**
     * リザルト画面の更新
     */
    udpateResult() {
        //キャラクター更新
        this.udpateChara();
    }
    /**
     * スタートの文字更新
     */
    updateStartLogo() {
        if (this.startLogoDispFlag) {
            this.startLogo.scale.x += 0.03;
            this.startLogo.scale.y += 0.03;
            //非表示
            if (this.startLogoDeleteFlag) {
                this.startLogo.alpha -= 0.05;
                if (this.startLogo.alpha <= 0) {
                    this.startLogoDispFlag = false;
                    this.app.stage.removeChild(this.startLogo);
                }
            }
            //表示
            else {
                this.startLogo.alpha += 0.1;
                if (this.startLogo.alpha >= 1.0) {
                    this.startLogoDeleteFlag = true;
                }
            }
        }
    }
    /**
     * キャラ更新
     */
    udpateChara() {
        //this.chara.getSplite().rotation += 0.05;
        //重力
        this.chara.addForce(0, this.gravity);
        //摩擦
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
        //回転
        this.chara.getSplite().rotation += this.chara.getRotation();
    }
    /**
     * オブジェクト更新
     */
    updateObject() {
        //
        this.prevObjTime += 1;
        //オブジェクト生成判定
        if (this.isGenerateObject()) {
            var id = Math.floor(Math.random() * 10) + 1;
            this.createObject(id);
        }
        //オブジェクト削除判定
        var n = this.getObjectNum();
        for (var i = n - 1; i >= 0; i--) {
            //画面アウトオブジェクトの削除
            if (this.isOutoffCamera(this.objects[i])) {
                this.app.stage.removeChild(this.objects[i].getSplite());
                this.objects.splice(i, 1);
            }
        }
    }
    /**
     * カメラ更新
     */
    updateCamera() {
        this.camera.setX(this.chara.getPos().getX() - 100);
    }
    /**
     * アイテムの更新
     */
    updateItem() {
        //アイテム生成判定
        this.prevItemTime += 1;
        if (this.isGenerateItem()) {
            var id = 1;
            //20%で海老出現
            if (Math.floor(Math.random() * 5) == 0) {
                id = 2;
            }
            this.createItem(id);
        }
        //アイテム削除判定
        var n = this.getItemNum();
        for (var i = n - 1; i >= 0; i--) {
            //いいね取得処理
            if (this.chara.isCollision(this.items[i])) {
                if (this.items[i].getId() == "item1") {
                    this.score += 10;
                    this.good += 1;
                    assets_js_1.Assets.instance.getSound("itemget1").play(); //効果音
                }
                if (this.items[i].getId() == "item2") {
                    this.score += 30;
                    this.ebi += 1;
                    assets_js_1.Assets.instance.getSound("itemget2").play(); //効果音
                }
                //エフェクト追加
                this.createEffect();
                //アイテム削除
                this.app.stage.removeChild(this.items[i].getSplite());
                this.items.splice(i, 1);
            }
            //画面外のオブジェクト削除
            else if (this.isOutoffCamera(this.items[i])) {
                //アイテム削除
                this.app.stage.removeChild(this.items[i].getSplite());
                this.items.splice(i, 1);
            }
        }
    }
    /**
     * エフェクト更新
     */
    updateEffect() {
        var n = this.getEffectNum();
        for (var i = n - 1; i >= 0; i--) {
            this.effects[i].update();
            this.effects[i].addPos(0, -1);
            this.effects[i].getSplite().alpha -= 0.05;
            if (this.effects[i].getFrame() >= 100) {
                this.app.stage.removeChild(this.effects[i].getSplite());
                this.effects.splice(i, 1);
            }
        }
    }
    /**
     * カメラ外判定
     * @param object
     * @returns
     */
    isOutoffCamera(object) {
        var x1 = object.getPos().getX() + object.getSize().getX();
        var x2 = this.chara.getPos().getX() - +100;
        if (x1 < x2) {
            return true;
        }
        return false;
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
            //物体との当たり判定
            if (this.checkObjectCollision()) {
                this.chara.addPos(-utilX, 0);
                this.camera.add(-utilX, 0);
                this.gameOverflag = true;
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
            //床との当たり判定
            if (this.checkObjectCollision() ||
                this.checkFloorCollision()) {
                //着地音
                if (this.jumpState) {
                    //Assets.instance.getSound("landing").play();
                }
                //着地処理
                this.chara.addPos(0, -utilY);
                this.chara.setForceY(0);
                this.jumpState = false;
                this.jump2State = false;
                break;
            }
        }
    }
    /**
     * オブジェクト生成処理
     */
    createObject(id) {
        //オブジェクト
        var name = "object" + id;
        var object = new fieldObject_js_1.FieldObject();
        object.setSizeX(assets_js_1.Assets.instance.getTexture(name).width);
        object.setSizeY(assets_js_1.Assets.instance.getTexture(name).height);
        object.setPosX(1280 + this.chara.getPos().getX());
        object.setPosY(this.floorPosY - object.getSize().getY());
        this.objects.push(object);
        //スプライト
        const splite = new PIXI.Sprite(assets_js_1.Assets.instance.getTexture(name));
        object.setSplite(splite);
        splite.zIndex = 11;
        splite.x = object.getPos().getX();
        splite.y = object.getPos().getY();
        this.app.stage.addChild(splite);
        //
        this.prevObjTime = 0;
        //次の
        this.nextObjTime = 30 + Math.floor(Math.random() * 100);
    }
    /**
     * アイテム生成処理
     */
    createItem(id) {
        var name = "item" + id;
        var item = new fieldObject_js_1.FieldObject();
        item.setPosX(1280 + this.chara.getPos().getX());
        item.setPosY(100 + Math.floor(Math.random() * 300));
        item.setSizeX(assets_js_1.Assets.instance.getTexture(name).width);
        item.setSizeY(assets_js_1.Assets.instance.getTexture(name).height);
        item.setId(name);
        this.items.push(item);
        //スプライト
        const splite = new PIXI.Sprite(assets_js_1.Assets.instance.getTexture(name));
        item.setSplite(splite);
        splite.zIndex = 12;
        splite.x = item.getPos().getX();
        splite.y = item.getPos().getY();
        this.app.stage.addChild(splite);
        //
        this.prevItemTime = 0;
    }
    /**
     *
     */
    createEffect() {
        var effect = new fieldObject_js_1.FieldObject();
        effect.setPosX(this.chara.getPos().getX() + 15);
        effect.setPosY(this.chara.getPos().getY());
        effect.setSizeX(70);
        effect.setSizeY(20);
        this.effects.push(effect);
        //スプライト
        const splite = new PIXI.Sprite(assets_js_1.Assets.instance.getTexture("effect_good"));
        effect.setSplite(splite);
        splite.zIndex = 12;
        splite.x = effect.getPos().getX();
        splite.y = effect.getPos().getY();
        this.app.stage.addChild(splite);
    }
    /**
     * 全オブジェクト削除
     */
    deleteAllObject() {
        //オブジェクト削除判定
        var n = this.getObjectNum();
        for (var i = n - 1; i >= 0; i--) {
            this.app.stage.removeChild(this.objects[i].getSplite());
            this.objects.splice(i, 1);
        }
    }
    /**
     * 全アイテム削除
     */
    deleteAllItem() {
        //オブジェクト削除判定
        var n = this.getItemNum();
        for (var i = n - 1; i >= 0; i--) {
            this.app.stage.removeChild(this.items[i].getSplite());
            this.items.splice(i, 1);
        }
    }
    /**
     * 全エフェクト削除
     */
    deleteAllEffect() {
        //オブジェクト削除判定
        var n = this.getEffectNum();
        for (var i = n - 1; i >= 0; i--) {
            this.app.stage.removeChild(this.effects[i].getSplite());
            this.effects.splice(i, 1);
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
        //メンダコを飛ばす
        this.moveSpeed = 0;
        this.chara.setForceX(-10);
        this.chara.setForceY(-20);
        this.chara.getSplite().anchor.x = 0.5;
        this.chara.getSplite().anchor.y = 0.5;
        this.chara.setRotation(0.1);
        //ぶつかる音
        assets_js_1.Assets.instance.getSound("collide").play();
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
                this.chara.addForce(0, -this.jumpPower);
                assets_js_1.Assets.instance.getSound("jump").play();
            }
            else if (!this.jump2State) {
                this.jump2State = true;
                this.chara.setForceY(-this.jumpPower);
                assets_js_1.Assets.instance.getSound("jump").play();
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
        if (this.prevObjTime >= this.nextObjTime) {
            return true;
        }
        return false;
    }
    /**
     * アイテム生成判定
     * @returns
     */
    isGenerateItem() {
        if (this.prevItemTime >= 30) {
            return true;
        }
        return false;
    }
    getChara() { return this.chara; }
    getObject(index) { return this.objects[index]; }
    getObjectNum() { return this.objects.length; }
    getCamera() { return this.camera; }
    getScore() { return this.score; }
    getItem(index) { return this.items[index]; }
    getItemNum() { return this.items.length; }
    getEffect(index) { return this.effects[index]; }
    getEffectNum() { return this.effects.length; }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map