import * as PIXI from 'pixi.js'

export class Assets {
    private static _instance: Assets;

    private textures = [];

    /**
     * コンストラクタ
     */
    private constructor() {
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
        this.textures['item_heart'] = PIXI.Texture.from('./img/item_heart.png');
        this.textures['effect_good'] = PIXI.Texture.from('./img/effect_good.png');
        this.textures['title_start'] = PIXI.Texture.from('./img/title_start.png');
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
}