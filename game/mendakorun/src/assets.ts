import * as PIXI from 'pixi.js'

export class Assets {
    private static _instance: Assets;

    private textures = [];

    /**
     * コンストラクタ
     */
    private constructor() {
        this.textures['floor'] = PIXI.Texture.from('./img/floor.png');
        this.textures['object1'] = PIXI.Texture.from('./img/object1.png');
        this.textures['chara'] = PIXI.Texture.from('./img/chara.png');
        this.textures['title_logo'] = PIXI.Texture.from('./img/title_logo.png');
        this.textures['result_back'] = PIXI.Texture.from('./img/result_back.png');
        this.textures['button_retry'] = PIXI.Texture.from('./img/button_retry.png');
        this.textures['button_titleback'] = PIXI.Texture.from('./img/button_titleback.png');
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
    public getTexture(index: string) { return this.textures[index]; }
}