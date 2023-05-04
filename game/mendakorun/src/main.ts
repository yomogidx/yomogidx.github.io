// PixiJSを読み込み
import * as PIXI from 'pixi.js'

// PIXI.JSアプリケーションを呼び出す (この数字はゲーム内の画面サイズ)
const app = new PIXI.Application<HTMLCanvasElement>({ width: 1280, height: 720, backgroundColor: 0xadd8e6 });

// index.htmlのbodyにapp.viewを追加する (app.viewはcanvasのdom要素)
document.body.appendChild(app.view);

// ゲームcanvasのcssを定義する
// ここで定義した画面サイズ(width,height)は実際に画面に表示するサイズ
app.renderer.view.style.position = "relative";
app.renderer.view.style.width = "1280px";
app.renderer.view.style.height = "720px";
app.renderer.view.style.display = "block";

// ゲームで使用する画像をあらかじめ読み込んでおく(プリロードという)
// v5.3.2　だと PIXI.Loader.shared.addでプリロードする
//PIXI.loader.shared.add("./img/chara.png");
