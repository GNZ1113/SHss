//=============================================================================
// アクター成長装備 / ActorGrowEquipment.js
//=============================================================================

/*:ja
 * v0.5.0
 * @plugindesc レベルアップ時にステータスが上昇する装備を作成する
 * @author Declare War
 *
 * @help このプラグインには、プラグインコマンドはありません。
 *
 * 武器、防具のメモ:
 *   <grow:param,n>      # param は mhp,mmp,atk,def,mat,mdf,agi,luk のどれか
 *                       # n はレベルアップ時の上昇量
 *  複数のステを上げたいときは上記のワードを1行に1つずつ必要な分記述する
 *
 * 例:
 *   <grow:atk,10>       # レベルアップ時に攻撃力を10上昇させる 
 */

/*:en
 * @plugindesc Actor grow equipment(when lvup)
 * @author Declare War
 *
 * @help This plugin does not provide plugin commands.
 *
 * Weapon, Armor Note:
 *   <grow:param,n>      # param : mhp,mmp,atk,def,mat,mdf,agi,luk
 *                       # n     : number
 */
 
(function(){
	// Game_BattlerBase
	// initMembers #a
	var _Game_BattlerBase_initMembers = Game_BattlerBase.prototype.initMembers;
	Game_BattlerBase.prototype.initMembers = function() {
	    _Game_BattlerBase_initMembers.call(this);
		this.initEquipParamPlus();	
	}
	// initEquipParamPlus #n
	Game_BattlerBase.prototype.initEquipParamPlus = function() {
		if (!this._equipParamPlus){
			this._equipParamPlus = [0,0,0,0,0,0,0,0]; 
		}
    };
	// paramPlus #a
	var _Game_BattlerBase_paramPlus = Game_BattlerBase.prototype.paramPlus;
	Game_BattlerBase.prototype.paramPlus = function(paramId) {
		if (this.isActor()){
			return _Game_BattlerBase_paramPlus.call(this, paramId) + this.growEquipParam(paramId);
		}else{
			return _Game_BattlerBase_paramPlus.call(this, paramId);
		}
    };
	// growEquipParam #n
	Game_BattlerBase.prototype.growEquipParam = function(paramId){
		this.initEquipParamPlus();
		return this._equipParamPlus[paramId];
	};
	// var
	var Reg = /<grow:([a-z]{3}),(\-?\d+)>/;
	var Result;
	// Game_Actor
	// levelUp #a
	var _Game_Actor_levelUp = Game_Actor.prototype.levelUp;
	Game_Actor.prototype.levelUp = function() {
		_Game_Actor_levelUp.call(this);
		this.getGrowEquipBonus();
	};
	// getGrowEquipBonus #n
	Game_Actor.prototype.getGrowEquipBonus = function(){
		this.makeGrowEquipParamter();
		for(var i = 0; i < 8; i++){
			this._equipParamPlus[i] += this._growParam[i];
		}
	};
	// growEquips #n
	Game_Actor.prototype.growEquips = function(){
	    return this.equips().filter(function(item){
			return item && item.note.match(Reg);
		});
    };
	// makeGrowEquipParamter #n // lvup時の上昇パラメータ計算
	Game_Actor.prototype.makeGrowEquipParamter = function(){
		this._growParam = [0,0,0,0,0,0,0,0];
		this.growEquips().forEach(function(item){
			item.note.split('\n').forEach(function(line){
				if (Result = Reg.exec(line)){
					switch (Result[1]){
					case 'mhp':
					    this._growParam[0] += Number(Result[2]);
						break;
					case 'mmp':
					    this._growParam[1] += Number(Result[2]);
						break;
					case 'atk':
					    this._growParam[2] += Number(Result[2]);
						break;
					case 'def':
					    this._growParam[3] += Number(Result[2]);
						break;
					case 'mat':
					    this._growParam[4] += Number(Result[2]);
						break;
					case 'mdf':
					    this._growParam[5] += Number(Result[2]);
						break;
					case 'agi':
					    this._growParam[6] += Number(Result[2]);
						break;
					case 'luk':
					    this._growParam[7] += Number(Result[2]);
						break;
					default:
					    break;
					}; // switch
				} // if
			}, this); // split forEach
		}, this); // forEach
	};
})();
