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
// PixiJSを読み込み
const PIXI = __importStar(require("pixi.js"));
// PIXI.JSアプリケーションを呼び出す (この数字はゲーム内の画面サイズ)
const app = new PIXI.Application({ width: 1280, height: 720, backgroundColor: 0xadd8e6 });
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
//# sourceMappingURL=main.js.map