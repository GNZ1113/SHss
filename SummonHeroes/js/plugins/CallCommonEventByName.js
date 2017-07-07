//=============================================================================
// CallCommonEventByName.js
//=============================================================================
// Copyright (c) 2015 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 【MPP ver.1.1】コモンイベントを名前で呼び出します。
 * @author 木星ペンギン
 *
 * @help コモンイベントの名前で呼び出しは『プラグインコマンド』を使います。
 * 『プラグインコマンド』で
 * CallCommon arg1
 * とした場合、arg1という名前のコモンイベントを呼び出します。
 * 
 * ※ CallCommonの大文字小文字に注意してください。
 * 
 * 名前で呼び出すため、IDが変わっても修正の必要がありません。
 * 
 * 一致する名前のコモンイベントが複数ある場合、後のものが呼び出されます。
 * （これにより前のコモンイベントを消去しなくとも、
 * 　同じ名前で新たにコモンイベントを作成すれば、上書きができます。）
 * 
 * ================================
 * 制作 : 木星ペンギン
 * URL : http://woodpenguin.blog.fc2.com/
 */

(function() {

var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'CallCommon' && args.length > 0) {
        for (var i = $dataCommonEvents.length - 1; i > 0; i--) {
            var event = $dataCommonEvents[i];
            if (event.name === args[0]) {
                var eventId = this.isOnCurrentMap() ? this._eventId : 0;
                this.setupChild(event.list, eventId);
                break;
            }
        }
    }
};

})();
