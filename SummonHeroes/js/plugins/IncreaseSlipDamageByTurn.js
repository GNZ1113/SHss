//=============================================================================
// IncreaseSlipDamageByTurn.js
//=============================================================================

/*:
 * @plugindesc make state of dynamic hrg(Hp ReGenerate rate) by turn
 * @author Sasuke KANNAZUKI
 * *
 * @help This plugin does not provide plugin commands.
 * 
 *  At default, the value of HP Regenerate rate(or slip damage as minus) is
 * constant by the traits.
 *  This plugin enables manipulate this rate
 * by increasing/decreasing the rate by the turn, during the state lasts.
 *  This configuration will be set in the note in state.
 *
 * State Note:
 *  <turnPlusHrg:-5> : increase 5% HP slip damage rate by each turn.
 *  <turnPlusHrg:5> : increase 5% Hp ReGenerate rate by each turn.
 * 
 * The value is evaluated by eval(). So you also can use following setting.
 *
 * <turnPlusHrg:$gameVariables.value(5)> :increase rate is based on variable #5. *
 * The turn since the state affected is set the variable named turn.
 *
 *  <turnPlusHrg:turn> : increase rate is the same as turn% by each turn.
 *  <turnPlusHrg:turn*(-2)> : slip damage rate increases the twice of turn.
 *
 * Copyright:
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

/*:ja
 * @plugindesc スリップダメージ率やHP再生率をターンごとに増減します
 * @author 神無月サスケ
 * *
 * @help このプラグインには、プラグインコマンドはありません。
 * 
 * 通常、特徴の「HP再生率」の数値は固定されており、変更は出来ませんでした。
 * このプラグインは、ターン毎にこの数値の増減を可能にします。
 * これにより、スリップダメージやリジェネの回復率を、
 * ターン毎に徐々に上下していく……といったことが可能になります。
 *
 * 注意：現バージョンでは、設定可能なのはステートだけです。
 * すなわち、ステートが続いている間のみ、効果があります。
 *
 * ■設定方法
 * 該当するステートのメモに、以下の書式で書いてください。
 * 
 *  <turnPlusHrg:-5> : スリップダメージ率が、毎ターン5%ずつ増加します。
 *  <turnPlusHrg:5>  : リジェネのHP再生率が、毎ターン5%ずつ増加します。
 *   ※スリップダメージ率は、マイナスのHP再生率と同じ意味なので、こうなります。
 * 
 * なお、設定値はeval()で評価されますので、数値以外の設定も自由です。
 *
 * <turnPlusHrg:$gameVariables.value(5)> : 設定が変数5番を設定します。
 *
 * ステートをかけてからのターン数は、turn で参照できます。
 * なお、ステートにかかったターンを0ターン目として計算しています。
 *
 *  <turnPlusHrg:turn> : increase rate is the same as turn% by each turn.
 *  <turnPlusHrg:turn*(-2)> : slip damage rate increases the twice of turn.
 *
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(function() {

  //
  // Add new properties to Game_BattlerBase
  //
  var _Game_BattlerBase_clearStates = Game_BattlerBase.prototype.clearStates;
  Game_BattlerBase.prototype.clearStates = function() {
    _Game_BattlerBase_clearStates.call(this);
    this._statePassedTurns = {};
    this._stateAddedHrg = {};    // hrg stands for Hp ReGeneration rate.
  };

  var _Game_BattlerBase_addNewState = Game_BattlerBase.prototype.addNewState;
  Game_BattlerBase.prototype.addNewState = function(stateId) {
    _Game_BattlerBase_addNewState.call(this, stateId);
    this._statePassedTurns[stateId] = 0;
    this._stateAddedHrg[stateId] = 0;
  };

  var _Game_BattlerBase_eraseState = Game_BattlerBase.prototype.eraseState;
  Game_BattlerBase.prototype.eraseState = function(stateId) {
    _Game_BattlerBase_eraseState.call(this, stateId);
    delete this._statePassedTurns[stateId];
    delete this._stateAddedHrg[stateId];
  };

  //
  // change the return value of hrg (Hp ReGeneration rate).
  //
  var _Game_BattlerBase_xparam = Game_BattlerBase.prototype.xparam;
  Game_BattlerBase.prototype.xparam = function(xparamId) {
    var hrg = _Game_BattlerBase_xparam.call(this, xparamId);
    var hrgAdded = 0;
    if (xparamId === 7) { // this.hrg (Hp ReGeneration rate)
      var stateIds = Object.getOwnPropertyNames(this._stateAddedHrg);
      for (var i = 0; i < stateIds.length; i++) {
        hrgAdded += this._stateAddedHrg[stateIds[i]];
      }
    }
    return hrgAdded ? hrg + hrgAdded * 0.01 : hrg;
  };

  //
  // for each turn, change hrg (Hp ReGeneration rate).
  //
  var _Game_BattlerBase_isStateExpired =
   Game_BattlerBase.prototype.isStateExpired;
  Game_BattlerBase.prototype.isStateExpired = function(stateId) {
    return _Game_BattlerBase_isStateExpired.call(this, stateId) &&
     $dataStates[stateId].autoRemovalTiming !== 0;
  };

  var _Game_BattlerBase_updateStateTurns =
   Game_BattlerBase.prototype.updateStateTurns;
  Game_BattlerBase.prototype.updateStateTurns = function() {
    this._states.forEach(function(stateId) {
      if (!this.isStateExpired()) {
        var turn = ++this._statePassedTurns[stateId];
        this._stateAddedHrg[stateId] += this.currentTurnPlusHrg(turn, stateId);
      }
    }, this);
    _Game_BattlerBase_updateStateTurns.call(this);
  };

  Game_Battler.prototype.currentTurnPlusHrg = function(turn, stateId) {
    var value = $dataStates[stateId].meta.turnPlusHrg;
    return value ? eval(value) : 0;
  };

})();
