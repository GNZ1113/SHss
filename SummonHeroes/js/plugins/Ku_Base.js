/*:ja
 *@plugindesc 下記パラメータによる項目を設定できます。
 *また、命中率と回避率の計算式を独立から総合に変更します。
 *@author kurau バージョン1.7
 *
 * @param 最低ダメージ保障
 * @desc 最低ダメージの保障値　初期値1
 * @default 1
 *
 * @param 保障無効ステート
 * @desc 最低ダメージ保障を無効にするステートIDを指定※4,5のように複数指定も可能。
 * @default
 *  
 * @param クリティカル倍率
 * @desc クリティカル倍率　初期値3
 * @default 3
 *
 * @param agirate
 * @desc 通常攻撃回数の増加割合　敏捷性÷設定値＝追加回数　初期値100
 * @default 100
 *
 * @param lukrate
 * @desc 命中と回避による回避と別に独立したLUKによる回避力を設定します。LUK*0.001*lukrateで回避率を計算する。0を指定すると無効化 初期値1
 * @default 1
 *
 * @param EnemyName
 * @desc 同名エネミーにAやBの識別を表記するかON=1 OFF=1以外の値　初期値1
 * @default 1

 * @param SAVEファイル
 * @desc セーブファイルの数を指定します。　初期値20
 * @default 20 

 * @help バージョン1.7
 * 与えるダメージの最低値を保障とクリティカルの倍率を変更できます。
 * 敏捷性の値によって通常攻撃回数を増加します。敏捷性/指定した値
 * 100と指定した場合は敏捷性/100となります。敏捷性が200だった場合÷100され攻撃回数が2回増加します。
 * 0以下を指定すると動作しません。また、機能させたくない場合は2000など高い値にすれば
 * 実質無効にできます。（ゲーム内で到達できない値を設定してください）
 * セーブファイルの数を指定できます。
 * また同じエネミーの場合、名前につくAやBの表記をなくすことが可能です。
 * 
 * 命中率と回避率の独立計算を命中率と回避率の総合計算へ変更します。
 *---------------------------------------------------------------------------------------
 * 利用規約：ツクールMV正規ユーザーであること
 * 表記有無：使用報告や表記は自由です
 *
 */

var Parameters = PluginManager.parameters('Ku_Base');
var $dmax = Number(Parameters["最低ダメージ保障"]);
var $sid = Number(Parameters["保障無効ステート"]);
var $cri = Number(Parameters["クリティカル倍率"]);
var $agir = Number(Parameters["agirate"]);
var $lukr = Number(Parameters["lukrate"]);
var $en = Number(Parameters["EnemyName"]);
var $save = Number(Parameters["SAVEファイル"]);
var $star_load_flag = null;

//=============================================================================
// rpg_objects.js
//=============================================================================

//-----------------------------------------------------------------------------
// Game_Temp
//
// The game object class for temporary data that is not included in save data.

Game_Action.prototype.makeDamageValue = function(target, critical) {
    var item = this.item();
    var baseValue = this.evalDamageFormula(target);
    var value = baseValue * this.calcElementRate(target);
    if (this.isPhysical()) {
        value *= target.pdr;
    }
    if (this.isMagical()) {
        value *= target.mdr;
    }
    if (baseValue < 0) {
        value *= target.rec;
    }
    if (critical) {
        value = this.applyCritical(value);
    }
    value = this.applyVariance(value, item.damage.variance);
    value = this.applyGuard(value, target);
    value = Math.round(value);


if (target && target._states.contains($sid)) {///ステート状態をチェック
    return value; ///最低ダメージ保障無効の処理
    }

if (value <= 1) {///最低ダメージ保障の処理
    return value + $dmax;
    }

    return value
};

Game_Action.prototype.applyCritical = function(damage) {
    return damage * $cri;///kurau
};

///攻撃回数kurau
Game_BattlerBase.prototype.attackTimesAdd = function() {
    return Math.max(this.traitsSumAll(Game_BattlerBase.TRAIT_ATTACK_TIMES) + (this.agi / $agir) , 0);
};

///エネミーレター 同名のエネミーにAやBの識別名を追加する処理
Game_Enemy.prototype.name = function() {

if ($en == 1) {
return this.originalName();
}
else {
return this.originalName() + (this._plural ? this._letter : '');
}
};


DataManager.maxSavefiles = function() {
    return $save;///セーブファイルの数
};

Game_Action.prototype.itemHit = function(target) {
    if (this.isPhysical()) {
        return this.item().successRate * 0.01 * this.subject().hit - target.eva;///命中率を総合計算にする。
    } else {
        return this.item().successRate * 0.01;
    }
};

Game_Action.prototype.itemEva = function(target) {
    if (this.isPhysical()) {
///        return target.eva;
        return target.luk * 0.001 * $lukr;
    } else if (this.isMagical()) {
        return target.mev;
    } else {
        return 0;
    }
};
