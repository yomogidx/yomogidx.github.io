import * as PIXI from 'pixi.js'
import { Sound } from '@pixi/sound'

export class Assets {
    private static _instance: Assets;

    private textures = [];
    private sounds = [];

    /**
     * コンストラクタ
     */
    private constructor() {
        //テクスチャ
        this.textures['floor'] = PIXI.Texture.from('./img/floor.png');
        for (var i = 1; i <= 10; i++) {
            var name = 'object' + i;
            this.textures[name] = PIXI.Texture.from('./img/'+name+'.png');
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
        this.sounds['start'] = Sound.from('./sound/start.mp3');  //スタート
        this.sounds['jump'] = Sound.from('./sound/jump.mp3');  //ジャンプ
        this.sounds['landing'] = Sound.from('./sound/landing.mp3');  //着地
        this.sounds['itemget1'] = Sound.from('./sound/itemget1.mp3'); //アイテム(ハート)取得音
        this.sounds['itemget2'] = Sound.from('./sound/itemget2.mp3'); //アイテム(エビ)取得音
        this.sounds['collide'] = Sound.from('./sound/collide.mp3'); //ぶつかった音
        this.sounds['button'] = Sound.from('./sound/button.mp3'); //ボタンクリック音
    }

    public static get instance(): Assets {
    // instanceがなければ生成
        if(!this._instance) {
            this._instance = new Assets();
        }
        // 自身が持つインスタンスを返す
        return this._instance;
    }

    /**
     * getter
     */
    public getTexture(index: string): PIXI.Texture { return this.textures[index]; }
    public getSound(index: string): Sound { return this.sounds[index]; }
}