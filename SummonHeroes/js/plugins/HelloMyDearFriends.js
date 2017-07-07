//=====================================
// HelloMyDearFriends.js
//=====================================
// Copyright (c) 2017 Tsumio
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2017/6/23 公開
// ----------------------------------------------------------------------------
// [Blog]   : http://ntgame.wpblog.jp/
// [Twitter]: https://twitter.com/TsumioNtGame
//=============================================================================
/*:
 * @plugindesc 戦闘開始時の出現メッセージを複数形に対応させます
 * @author ツミオ
 *
 * @param 複数時メッセージ
 * @type string
 * @desc 同一モンスターが複数いる場合のメッセージ
 * @default %1たちが現れた！
 * 
 * @param 単数時メッセージ
 * @type string
 * @desc 同一モンスターがいない場合のメッセージ
 * @default %1が現れた！
 * 
 * @help
 * 【プラグインコマンド】
 * このプラグインにプラグインコマンドはありません。
 * 
 * 【使用方法】
 * プラグインパラメーターを変更してください。
 * 
 * 
 * 利用規約：
 * 作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 * についても制限はありません。
 * 自由に使用してください。
 */

(function () {

    var N = 'HelloMyDearFriends';
  	var param = PluginManager.parameters(N);

    //NTMO名前空間の宣言
    var NTMO = NTMO || {};

    //表示文字列用の変数
    var $text_Enemy_NTMO = String(param['単数時メッセージ'])||'%1が現れた！';
    var $text_Enemies_NTMO = String(param['複数時メッセージ'])||'%1たちが現れた！';


//オーバーライド（競合発生率高）
BattleManager.displayStartMessages = function() {
    var enemies = [];
    enemies = NTMO.enemyHaveNoOtherFriendThanYou(enemies);
    $gameTroop.enemyNames().forEach(function(name) {
        if(enemies.contains(name))
        {
            //敵は複数
            $gameMessage.add($text_Enemies_NTMO.format(name));
        }else{
            //敵は単体
            $gameMessage.add($text_Enemy_NTMO.format(name));
        }
    });
    if (this._preemptive) {
        $gameMessage.add(TextManager.preemptive.format($gameParty.name()));
    } else if (this._surprise) {
        $gameMessage.add(TextManager.surprise.format($gameParty.name()));
    }
};

//単数か複数か取得
NTMO.enemyHaveNoOtherFriendThanYou = function(enemies) {
    var names = [];
    $gameTroop.members().forEach(function(enemy) {
        var name = enemy.originalName();
        if (enemy.isAlive() && !names.contains(name)) {
            names.push(name);
        }else{
            enemies.push(name);
        }
    });
    return enemies;
};

})();