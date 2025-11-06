import * as PIXI from 'pixi.js';
import { Game } from "./game.js";
/**
 * システム初期処理
 */
const app = new PIXI.Application({
    width: 400,
    height: 600,
    backgroundColor: 0xadd8e6
});
let el = document.getElementById('app');
el.appendChild(app.view);
// ゲームcanvasのcssを定義する
// ここで定義した画面サイズ(width,height)は実際に画面に表示するサイズ
app.renderer.view.style.position = "relative";
app.renderer.view.style.width = "400px";
app.renderer.view.style.height = "600px";
app.renderer.view.style.display = "block";
app.stage.sortableChildren = true;
/**
 * ゲーム初期処理
 */
var game = new Game(app);
game.init();
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
    game.render();
}
//# sourceMappingURL=main.js.map