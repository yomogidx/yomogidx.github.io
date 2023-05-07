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
const game_js_1 = require("./game.js");
const assets_js_1 = require("./assets.js");
const PIXI = __importStar(require("pixi.js"));
// PIXI.JSアプリケーションを呼び出す
const app = new PIXI.Application({ width: 1280, height: 720, backgroundColor: 0xadd8e6 });
// index.htmlのbodyにapp.viewを追加する (app.viewはcanvasのdom要素)
let el = document.getElementById('app');
el.appendChild(app.view);
//document.body.appendChild(app.view);
// ゲームcanvasのcssを定義する
// ここで定義した画面サイズ(width,height)は実際に画面に表示するサイズ
app.renderer.view.style.position = "relative";
app.renderer.view.style.width = "1280px";
app.renderer.view.style.height = "720px";
app.renderer.view.style.display = "block";
app.stage.sortableChildren = true;
//背景
const backSprite = new PIXI.Sprite(assets_js_1.Assets.instance.getTexture("back"));
backSprite.x = 0;
backSprite.y = 0;
backSprite.zIndex = 1;
app.stage.addChild(backSprite);
//床
const floorSprite = new PIXI.Sprite(assets_js_1.Assets.instance.getTexture("floor"));
floorSprite.x = 0;
floorSprite.y = 600;
app.stage.addChild(floorSprite);
floorSprite.zIndex = 10;
//点数
const textPoint = new PIXI.Text('スコア：0点');
textPoint.x = 50;
textPoint.y = 20;
textPoint.zIndex = 50;
app.stage.addChild(textPoint);
/**
 * 初期処理
 */
var game = new game_js_1.Game(app);
game.init();
//クリック用オブジェ
const windowSprite = new PIXI.Sprite(assets_js_1.Assets.instance.getTexture("window"));
app.stage.addChild(windowSprite);
windowSprite.interactive = true;
windowSprite.on('pointerdown', () => { game.keyEvent(); });
windowSprite.zIndex = 20;
//pointertap
/**
 * メインループ
 *
 */
app.ticker.maxFPS = 60;
app.ticker.add(animate);
function animate(delta) {
    update();
    render();
}
/**
 * 更新処理
 */
function update() {
    game.update();
    //オブジェクト削除判定
}
/**
 * 描画
 */
function render() {
    //カメラ
    var dx = game.getCamera().getX();
    var dy = game.getCamera().getY();
    //キャラ
    game.getChara().getSplite().x = game.getChara().getPos().getX() - dx;
    game.getChara().getSplite().y = game.getChara().getPos().getY() - dy;
    //オブジェクト
    var num = game.getObjectNum();
    for (var i = 0; i < num; i++) {
        game.getObject(i).getSplite().x = game.getObject(i).getPos().getX() - dx;
        game.getObject(i).getSplite().y = game.getObject(i).getPos().getY() - dy;
    }
    //アイテム
    var num = game.getItemNum();
    for (var i = 0; i < num; i++) {
        game.getItem(i).getSplite().x = game.getItem(i).getPos().getX() - dx;
        game.getItem(i).getSplite().y = game.getItem(i).getPos().getY() - dy;
    }
    //エフェクト
    var num = game.getEffectNum();
    for (var i = 0; i < num; i++) {
        game.getEffect(i).getSplite().x = game.getEffect(i).getPos().getX() - dx;
        game.getEffect(i).getSplite().y = game.getEffect(i).getPos().getY() - dy;
    }
    //スコア
    textPoint.text = 'スコア：' + Math.floor(game.getScore()) + '点';
}
/**
 * キーイベント
 */
//window.addEventListener('keydown', function(e) {
//   game.keyEvent();
//});
/**
 * クリックイベント
 */
//window.addEventListener('mousedown', function(e) {
//    game.keyEvent();
//});
/**
 * スマホ
 */
//window.addEventListener('ontouchstart', function(e) {
//    game.keyEvent();
//});
//# sourceMappingURL=main.js.map