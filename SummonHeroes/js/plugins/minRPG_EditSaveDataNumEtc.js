// minRPG_EditSaveDataNumEtc.js
/*:
 *@plugindesc セーブデータ数変更＋同名エネミー識別子を削除するプラグイン
 *@author merusaia
 *
 * @param 同名の敵キャラ識別子削除
 * @desc ON=1、OFF=1以外の値。1だと、スライムが二匹以上いても、どちらも「スライム」になります。初期値1
 * @default 1

 * @param SAVEデータ数
 * @desc セーブファイルの数を指定します。初期値20
 * @default 200

 * @help バージョン1.7
 * ・パラメータ「SAVEデータ数」を変更することで、
 * 　セーブデータ数を好きな数に設定できます。
 * 　（PCで遊ぶユーザさん向けに、たくさんのセーブデータ数を確保したいときにおススメです）
 * 
 * ・また、パラメータ「同名の敵キャラ識別子削除」を1にすることで、
 *   同名エネミーに「スライムA」や「スライムB」の識別アルファベットを消すことができます。
 * 
 * 
 * 【競合について】
 * ・rpg_managers.jsのDataManager.maxSavefilesを上書きしています。
 * 　セーブデータ数を変更するプラグインとの競合に注意してください。
 * 
 * ・パラメータ「同名の敵キャラ識別子削除」が1の時だけ、
 *   rpg_object.jsのGame_Enemy.prototype.nameを上書きしています。
 *   敵キャラ名を管理するプラグインとの競合に注意してください。
 * 
 * 
 * 【著作権フリーについて】
 * このプラグインは「地球の共有物（パブリックドメイン）」です。
 * 　　・無償・有償問わず、あらゆる作品に使用でき、
 *      また自由に改変・改良・二次配布できます。
 * 　　・著作表示のわずらわしさを回避するため、著作権は放棄します。
 *      事後報告、クレジット記載も不要です。
 * 　　・もちろんクローズドに使っていただいてもOKです。
 *      是非、自分好みに改造してお使いください。
 *
 * ■謝辞
 * kurauさんのKu_Base.jsのソースを参考に、
 * 一部機能だけを抜き出し、競合対策したものを作成させていただきました。感謝！
 * 
 */

(function() {
    'use strict'; // javascriptの構文チェックを少しだけ厳密にします。 http://analogic.jp/use-strict/
    var Parameters = PluginManager.parameters('minRPG_EditSaveDataNumEtc');
    var $deleteSameNameEnemiesAlphabet_AorB = Number(Parameters["同名の敵キャラ識別子削除"]);
    var $saveDataNum = Number(Parameters["SAVEデータ数"]);


    ///エネミーレター 同名のエネミーにAやBの識別名を追加する処理
    if ($deleteSameNameEnemiesAlphabet_AorB == 1) { // パラメータが1の時だけ、メソッドを上書き。1以外だと競合しません。競合対策。
        Game_Enemy.prototype.name = function() {
            return this.originalName(); // 元のソースはこれ。return this.originalName() + (this._plural ? this._letter : '');
        }
    };

    //セーブファイル数の最大値を返します。
    DataManager.maxSavefiles = function() {
        return $saveDataNum; // 元のソースはこれ。 return 20;
    };

})();
