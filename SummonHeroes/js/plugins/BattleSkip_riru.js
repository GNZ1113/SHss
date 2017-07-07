//=============================================================================
// BattleSkip_riru.js
//=============================================================================
/*:
 * @plugindesc テスト戦闘中にAキーを押すだけで瞬時に勝利させるスクリプトです
 * @author riru
 *
 * @help 
 *＜使い方＞
 *テスト戦闘中のアクターコマンド選択中にAキーを押すと自動的に敵が倒れ勝利になります
 *（不死身処理をしている場合は倒す扱いにならないまま勝利になるので経験値等は入りません）
 *通常テストプレイ、イベントテスト、戦闘テストいずれも適応されます
 *
 *・リザルトをいじっている場合は表示等に不具合がでる可能性がありますが、テストプレイ時のみですので公開に当たっては問題ありません。
 *・このプラグインは本来使わないキーを使用しています。別のプラグインでAキーを使用するものがあった場合は調整をする必要がありますのでご注意ください
 *
 * ＜規約＞
 * 有償無償問わず使用できます。改変もご自由にどうぞ。使用報告もいりません。２次配布は作成者を偽らなければOKです（ただし素材単品を有償でやりとりするのはNG）。
 *著作権は放棄していません。使用する場合は以下の作者とURLをreadmeなどどこかに記載してください
 *
 * ＜作者情報＞
 *作者：riru 
 *HP：ガラス細工の夢幻
 *URL：http://garasuzaikunomugen.web.fc2.com/index.html
 */

(function() {
var riru_bsk_BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    riru_bsk_BattleManager_initMembers.call(this);
    riru_bsk_victory_flug = false;//riru追加
};

var _riru_bsk_BattleManager_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function() {
    _riru_bsk_BattleManager_processVictory.call(this);
    riru_bsk_victory_flug = true;
};


var _riru_Scene_Battleskip_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    _riru_Scene_Battleskip_update.call(this);
    if ((DataManager.isBattleTest()||DataManager.isEventTest()||$gameTemp.isPlaytest()) && Input.isPressed('akey')&&!riru_bsk_victory_flug&&this._actorCommandWindow.active) {
    $gameTroop.members().forEach(function(enemy) {
        var alreadyDead = enemy.isDead();
        enemy._hp -= 9999999999;
            enemy.addState(1);
        if (enemy.isDead() && !alreadyDead) {
            enemy.performCollapse();
        }
        enemy.clearResult();
    }.bind(this));
    BattleManager.processVictory();
    }
};
//使えるキーを拡張（再定義）
Input.keyMapper = {
    65: 'akey',       // A//riru追加
    9: 'tab',       // tab
    13: 'ok',       // enter
    16: 'shift',    // shift
    17: 'control',  // control
    18: 'control',  // alt
    27: 'escape',   // escape
    32: 'ok',       // space
    33: 'pageup',   // pageup
    34: 'pagedown', // pagedown
    37: 'left',     // left arrow
    38: 'up',       // up arrow
    39: 'right',    // right arrow
    40: 'down',     // down arrow
    45: 'escape',   // insert
    81: 'pageup',   // Q
    87: 'pagedown', // W
    88: 'escape',   // X
    90: 'ok',       // Z
    96: 'escape',   // numpad 0
    98: 'down',     // numpad 2
    100: 'left',    // numpad 4
    102: 'right',   // numpad 6
    104: 'up',      // numpad 8
    120: 'debug'    // F9
};

})();

