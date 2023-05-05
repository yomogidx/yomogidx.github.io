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
exports.Assets = void 0;
const PIXI = __importStar(require("pixi.js"));
class Assets {
    /**
     * コンストラクタ
     */
    constructor() {
        this.textures = [];
        this.textures['floor'] = PIXI.Texture.from('./img/floor.png');
        this.textures['object1'] = PIXI.Texture.from('./img/object1.png');
        this.textures['chara'] = PIXI.Texture.from('./img/chara.png');
        this.textures['title_logo'] = PIXI.Texture.from('./img/title_logo.png');
        this.textures['result_back'] = PIXI.Texture.from('./img/result_back.png');
        this.textures['button_retry'] = PIXI.Texture.from('./img/button_retry.png');
        this.textures['button_titleback'] = PIXI.Texture.from('./img/button_titleback.png');
        this.textures['window'] = PIXI.Texture.from('./img/window.png');
    }
    static get instance() {
        // instanceがなければ生成
        if (!this._instance) {
            this._instance = new Assets();
        }
        // 自身が持つインスタンスを返す
        return this._instance;
    }
    /**
     * getter
     */
    getTexture(index) { return this.textures[index]; }
}
exports.Assets = Assets;
//# sourceMappingURL=assets.js.map