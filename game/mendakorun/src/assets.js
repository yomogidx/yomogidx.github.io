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
const sound_1 = require("@pixi/sound");
class Assets {
    /**
     * コンストラクタ
     */
    constructor() {
        this.textures = [];
        this.sounds = [];
        //テクスチャ
        this.textures['floor'] = PIXI.Texture.from('./img/floor.png');
        for (var i = 1; i <= 10; i++) {
            var name = 'object' + i;
            this.textures[name] = PIXI.Texture.from('./img/' + name + '.png');
        }
        this.textures['chara'] = PIXI.Texture.from('./img/chara.png');
        this.textures['title_logo'] = PIXI.Texture.from('./img/title_logo.png');
        this.textures['result_back'] = PIXI.Texture.from('./img/result_back.png');
        this.textures['button_retry'] = PIXI.Texture.from('./img/button_retry.png');
        this.textures['button_titleback'] = PIXI.Texture.from('./img/button_titleback.png');
        this.textures['window'] = PIXI.Texture.from('./img/window.png');
        this.textures['back'] = PIXI.Texture.from('./img/back.png');
        this.textures['back_cloud'] = PIXI.Texture.from('./img/back_cloud.png');
        this.textures['start_logo'] = PIXI.Texture.from('./img/start_logo.png');
        this.textures['item1'] = PIXI.Texture.from('./img/item1.png');
        this.textures['item2'] = PIXI.Texture.from('./img/item2.png');
        this.textures['effect_good'] = PIXI.Texture.from('./img/effect_good.png');
        this.textures['title_start'] = PIXI.Texture.from('./img/title_start.png');
        //曲
        this.sounds['start'] = sound_1.Sound.from('./sound/start.mp3'); //スタート
        this.sounds['jump'] = sound_1.Sound.from('./sound/jump.mp3'); //ジャンプ
        this.sounds['landing'] = sound_1.Sound.from('./sound/landing.mp3'); //着地
        this.sounds['itemget1'] = sound_1.Sound.from('./sound/itemget1.mp3'); //アイテム(ハート)取得音
        this.sounds['itemget2'] = sound_1.Sound.from('./sound/itemget2.mp3'); //アイテム(エビ)取得音
        this.sounds['collide'] = sound_1.Sound.from('./sound/collide.mp3'); //ぶつかった音
        this.sounds['button'] = sound_1.Sound.from('./sound/button.mp3'); //ボタンクリック音
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
    getSound(index) { return this.sounds[index]; }
}
exports.Assets = Assets;
//# sourceMappingURL=assets.js.map