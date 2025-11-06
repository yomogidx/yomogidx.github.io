import * as PIXI from 'pixi.js'

export class Assets {
    private static _instance: Assets;

    private textures = [];
    private sounds = [];

    /**
     * コンストラクタ
     */
    private constructor() {
        //テクスチャ
        for (var i = 1; i <= 0; i++) {
            var name = 'object' + i;
            this.textures[name] = PIXI.Texture.from('./img/'+name+'.png');
        }
        for (var i = 1; i <= 2; i++) {
            var name = 'stage' + i;
            this.textures[name] = PIXI.Texture.from('./img/'+name+'.png');
        }
        this.textures['chara'] = PIXI.Texture.from('./img/chara.png');
        this.textures['balloon'] = PIXI.Texture.from('./img/balloon.png');
        this.textures['window'] = PIXI.Texture.from('./img/window.png');
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