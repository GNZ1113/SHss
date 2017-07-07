//=============================================================================
// AdjustHitRate.js
//=============================================================================

/*:
 * @plugindesc 戦闘時のヒット率を変更してくれるプラグイン
 * @author のん Twitter : non_non_cha
 *
 * @param HitEnable
 * @desc ヒット判定をONにします
 * @default true
 *
 * @param EvadeEnable
 * @desc 回避判定をONにします
 * @default true
 *
 * @param HitAdjust
 * @desc ヒット判定に補正をかけます
 * @default 0
 * @help
 *
 * 戦闘のヒット率を変更してくれるプラグイン。
 * 戦闘での命中判定はヒット率判定→回避判定の二重構造のなっており、
 *　設定された命中率も余計に回避してくれる余計な仕組みになっている。
 * そんな設定を回避してくれる雑に作ったもの。
 */


(function() {

    var parameters  = PluginManager.parameters('AdjustHitRate');
    var HitEnable   = eval(String(parameters['HitEnable']));
    var EvadeEnable = eval(String(parameters['EvadeEnable']));
    var HitAdjust   = Number(parameters['HitAdjust']);


    Game_ActionResult.prototype.isHit = function() {
        if(HitEnable == true && EvadeEnable == true){
          return this.used && !this.missed && !this.evaded;
        }else if(HitEnable == true){
          return this.used && !this.missed;
        }else if(EvadeEnable == true){
          return this.used && !this.evaded;
        }else{
          return this.used;
        }
    };

    Game_Action.prototype.itemHit = function(target) {
        if (this.isPhysical()) {
            return this.item().successRate * 0.01 * this.subject().hit + HitAdjust * 0.01;
        } else {
            return this.item().successRate * 0.01 + HitAdjust * 0.01;
        }
    };

})();
