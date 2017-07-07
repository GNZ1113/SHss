//=============================================================================
// SpecialExhaustSkill.js
//=============================================================================
/*:
 * @plugindesc Enables Skill that exhausts HP or MP.
 * @author Sasuke KANNAZUKI
 *
 * @param After HP Exhausted Log
 * @desc %1 is replaced to subject name. If empty string, no display.
 * @default %1 is exhausted all physical energy...
 *
 * @param After MP Exhausted Log
 * @desc %1 is replaced to subject name. If empty string, no display.
 * @default %1 is exhausted all mental power...
 *
 * @help
 * This plugin does not provide plugin commands.
 *
 * [Summary]
 * write down item or skill's note following notation:
 * <skillSpType:exhaustHp>
 *  after executing the skill, subject will be die.
 * <skillSpType:exhaustMp>
 *  after executing the skill, subject's mp will be 0.
 *
 * [Useful usage sample]
 * These skills are so risky, so much effect is expected by the user.
 * - set "Certain Hit', and 100% success.
 * - the range is "all enemies".
 * - Recommended damage formula:
 *  - for HP exhaust skill: a.hp * 4.5
 *  - for MP exhaust skill: (a.mp + 1) * 2.5
 *
 * [Important Note]
 * - if you use auto battle to actors who learns such skills,
 *  the actor almost often use these skills.(awful...)
 *  So I don't recommend you to use both this and auto battle plugin.
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

/*:ja
 * @plugindesc すべてのHPまたはMPを使って強力な攻撃を行うスキルが作成可能
 * @author 神無月サスケ
 *
 * @param After HP Exhausted Log
 * @desc 全HP技使用後の表示です。%1は使用者名に置き換わります。
 * 空文字を指定すると表示しません。
 * @default %1は力尽きて倒れた。
 *
 * @param After MP Exhausted Log
 * @desc 全MP技使用後の表示です。%1は使用者名に置き換わります。
 * 空文字を指定すると表示しません。
 * @default %1は魔力を使い果たした。
 *
 * @help
 * このプラグインには、プラグインコマンドはありません。
 *
 * ■概要
 * スキルまたはアイテムのメモに以下のように書いてください。
 * <skillSpType:exhaustHp>
 *  この記述がある場合、使用者が使用後に戦闘不能になります。
 * <skillSpType:exhaustMp>
 *  この記述がある場合、使用者のMPが使用後に0になります。
 *
 * ■有益な設定方法
 * このようなリスクの高い技には、強力な効果が求められます。
 * いくつか、設定のヒントを設けます。
 *
 * ・タイプは「必中」にしましょう。
 * ・範囲は「敵全体」、使用可能時は「バトル画面」にしましょう。
 * ・成功率は100％が望ましいです。
 * ・ダメージは「HPダメージ」で、MP全消費技の場合、『(a.mp + 1) * 2.5』、
 *   HP全消費技の場合、『a.hp * 4.5』あたりが、経験則上、丁度いいようです。
 *
 * ・HP消費技のメッセージの例：
 *  (使用者の名前)は自らの身体を爆発させた！
 *  強烈な熱波や衝撃波が巻き起こる！
 *
 * ・MP消費技のメッセージの例：
 *  (使用者の名前)は%1を放った！
 *  暴走する魔力が敵を襲う！
 *
 * アニメーションも工夫して、派手なものを選択すると、より雰囲気が増します。
 *
 * ■自動戦闘との併用に関する注意
 * アクターの側で、自動戦闘が可能に出来ますし、自動戦闘コマンドを追加する
 * プラグインも出回っています。しかし、このプラグインと併用しないのが無難です。
 * なぜなら、上記の技を覚えたアクターが自動戦闘を選ぶと、威力の大きさから、
 * ほぼ毎ターン、そればかり使うようになってしまうからです。
 * 十分用心しましょう。
 *
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(function() {

  //
  // process parameters
  //
  var parameters = PluginManager.parameters('SpecialExhaustSkill');
  var hpExhaustedLog = parameters['After HP Exhausted Log'] || '';
  var mpExhaustedLog = parameters['After MP Exhausted Log'] || '';

  //
  // main routine
  //
  var _BattleManager_endAction = BattleManager.endAction;
  BattleManager.endAction = function() {
    if (this._action.processExhaustMP() && mpExhaustedLog) {
      this._logWindow.push('addText', mpExhaustedLog.format(
       this._subject.name()));
    }
    if (this._action.processExhaustHP() && hpExhaustedLog) {
      this._logWindow.push('addText', hpExhaustedLog.format(
       this._subject.name()));
    }
    _BattleManager_endAction.call(this);
  };

  Game_Action.prototype.processExhaustHP = function () {
    if(this.item().meta.skillSpType === 'exhaustHp') {
      this.subject().clearActions();
      this.subject().addNewState(this.subject().deathStateId());      
      return true;
    }
    return false;
  };

  Game_Action.prototype.processExhaustMP = function () {
    if(this.item().meta.skillSpType === 'exhaustMp') {
      this.subject()._mp = 0;
      return true;
    }
    return false;
  };
})();
