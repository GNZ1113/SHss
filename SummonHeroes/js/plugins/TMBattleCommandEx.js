//=============================================================================
// TMVplugin - バトルコマンド拡張
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.0
// 最終更新日: 2016/07/21
//=============================================================================

/*:
 * @plugindesc バトルシーンのアクターコマンドサイズを変更します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param basicVisibleRows
 * @desc アクターコマンドの基本表示行数
 * 初期値: 4
 * @default 4
 *
 * @param maxVisibleRows
 * @desc アクターコマンドの最大表示行数
 * 初期値: 6
 * @default 6
 *
 * @param commandAutoResize
 * @desc アクターコマンド（高さ）の自動調整
 * 初期値: 1（ 0 で無効 / 1 で有効）
 * @default 1
 *
 * @param omitPartyCommand
 * @desc パーティコマンドを省略する
 * 初期値: 0（ 0 で通常どおり / 1 で省略）
 * @default 0
 *
 * @help
 * 使い方:
 *
 *   プラグインを導入すると戦闘中のアクターコマンドのサイズ（表示コマンド数）
 *   が可変（アクターのスキルタイプ数に依存）になります。
 *
 *   プラグインパラメータ commandAutoResize に 0 を設定した場合は、可変では
 *   なく、basicVisibleRows に設定したサイズに固定されます。
 *
 *   プラグインコマンドはありません。
 *
 *
 * プラグインパラメータ補足:
 *
 *   omitPartyCommand
 *     この値を 1 に設定すると、戦闘で戦うか逃げるかを選択するコマンドが
 *     省略されるようになります。当然逃げるコマンドは使用できなくなります。
 * 
 */

var Imported = Imported || {};
Imported.TMBattleCommandEx = true;

(function() {

  var parameters = PluginManager.parameters('TMBattleCommandEx');
  var basicVisibleRows  = +parameters['basicVisibleRows'];
  var maxVisibleRows    = +parameters['maxVisibleRows'];
  var commandAutoResize =  parameters['commandAutoResize'] === '1';
  var omitPartyCommand  =  parameters['omitPartyCommand'] === '1';
  
  //-----------------------------------------------------------------------------
  // Window_ActorCommand
  //

  Window_ActorCommand.prototype.numVisibleRows = function() {
    if (commandAutoResize) {
      var result = this._list ? this._list.length : basicVisibleRows;
      return Math.min(result, maxVisibleRows);
    } else {
      return basicVisibleRows;
    }
  };

  var _Window_ActorCommand_refresh = Window_ActorCommand.prototype.refresh;
  Window_ActorCommand.prototype.refresh = function() {
    if (commandAutoResize) {
      var wh = this.fittingHeight(this.numVisibleRows());
      var wy = Math.min(Graphics.boxHeight - wh, this.fittingHeight(basicVisibleRows));
      this.move(this.x, Graphics.boxHeight - wh, this.windowWidth(), wh);
    }
    _Window_ActorCommand_refresh.call(this);
  };

  //-----------------------------------------------------------------------------
  // Scene_Battle
  //

  var _Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
  Scene_Battle.prototype.startPartyCommandSelection = function() {
    _Scene_Battle_startPartyCommandSelection.call(this);
    this._partyCommandWindow.deactivate();
    if (omitPartyCommand) {
      this.selectNextCommand();
    }
  };

})();
