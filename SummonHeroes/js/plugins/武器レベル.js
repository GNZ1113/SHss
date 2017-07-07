//=============================================================================
// 武器レベル / WeaponLevel.js
//=============================================================================

/*:ja
 * v0.1.0
 * @plugindesc 
 * レベルによってパラメータが増減する武器を作成できるようにする
 *
 * @author Declare War
 *
 * @param MaxLevel
 * @default 10
 * @desc 武器の最大レベル(～99まで)
 *
 * @param ExpRate
 * @default 0.05
 * @desc 武器の経験値の割合(1で与ダメの100%)
 * 
 * @param Word1
 * @default Lv
 * @desc ワードの設定(武器名の後)
 *
 * @param Word2
 * @default 【Max Level】
 * @desc 武器が最大レベルのときに追加する説明文
 *
 * @param Word3
 * @default 【Next Level】：
 * @desc 武器が最大レベル以外のときに追加する説明文
 *
 * @param Color1
 * @default Red
 * @desc ゲージのグラデーションの色１
 *
 * @param Color2
 * @default rgb(255,255,0)
 * @desc ゲージのグラデーションの色２
 *
 * @help 
 * レベルを使いたい武器のメモ欄に 
 * <levelUseClass:n> と書く ( n はクラスID)
 * 
 * 最大レベルを個別に変更する場合(～99まで)
 * <maxWeaponLevel:n> と書く ( n は最大レベル)
 *
 * このプラグインには、プラグインコマンドはありません。
 */

(function(){
	// params -----------------------------------------------------------------
	var parameters = PluginManager.parameters('武器レベル');
	var maxLevel = Number(parameters['MaxLevel']) || 10;
	var expRate = Number(parameters['ExpRate']) || 0.05
	var sysText = [parameters['Word1'], parameters['Word2'], parameters['Word3']];
	var gradColor = [parameters['Color1'], parameters['Color2']];
	// Game_System ------------------------------------------------------------
	// initialize
	var _Game_System_initialize = Game_System.prototype.initialize
	Game_System.prototype.initialize = function() {
		_Game_System_initialize.call(this);
		this.weaponLevelInit();
	};
	// weaponLevelInit
	Game_System.prototype.weaponLevelInit = function(){
		if (!this._weaponLevel) this._weaponLevel = {};
	}
	// weaponUseLevel
	Game_System.prototype.weaponUseLevel = function(weapon){
		return weapon.meta.levelUseClass ? true : false;
	}
	// setWeaponData
	Game_System.prototype.setWeaponData = function(weapon){
		this.weaponLevelInit();
		if (!this.weaponUseLevel(weapon)) return; 
		if (this._weaponLevel[weapon.id]) return;
		var data = [];
		data.push(Number(weapon.meta.levelUseClass));
		data.push(this.getMaxWeaponLevel(weapon));
		data.push(1);
		data.push(0);
		this._weaponLevel[weapon.id] = data;
	}
	// getMaxWeaponLevel
	Game_System.prototype.getMaxWeaponLevel = function(weapon){
		var result = weapon.meta.maxWeaponLevel;
		return result ? Number(result) : maxLevel
	}
	// weaponClass
	Game_System.prototype.weaponClass = function(weapon){
		var data = this._weaponLevel[weapon.id];
		return $dataClasses[data[0]];
	}
	// maxWeaponLevel
	Game_System.prototype.maxWeaponLevel = function(weapon){
		var data = this._weaponLevel[weapon.id];
		return data[1];
	}
	// weaponLevel
	Game_System.prototype.weaponLevel = function(weapon){
		var data = this._weaponLevel[weapon.id];
		return data[2];
	}
	// weaponExp
	Game_System.prototype.weaponExp = function(weapon){
		var data = this._weaponLevel[weapon.id];
		return data[3];
	}
	// getExp
	Game_System.prototype.getExp = function(weapon, exp, actor){
		this._weaponLevel[weapon.id][3] += exp;
		while (!this.isMaxLevel(weapon) && 
		        this.weaponExp(weapon) >= this.nextLevelExp(weapon)) {
			this.weaponLevelUp(weapon);
		}
		if (actor) actor.refresh();
	}
	// expForLevel
	Game_System.prototype.expForLevel = function(level, weapon) {
		var c = this.weaponClass(weapon);
		var basis = c.expParams[0];
		var extra = c.expParams[1];
		var acc_a = c.expParams[2];
		var acc_b = c.expParams[3];
		return Math.round(basis*(Math.pow(level-1, 0.9+acc_a/250))*level*
				(level+1)/(6+Math.pow(level,2)/50/acc_b)+(level-1)*extra);
	};
	// currentLevelExp
	Game_System.prototype.currentLevelExp = function(weapon) {
		var level = this.weaponLevel(weapon);
		return this.expForLevel(level, weapon);
	};
	// nextLevelExp
	Game_System.prototype.nextLevelExp = function(weapon) {
		var level = this.weaponLevel(weapon);
		return this.expForLevel(level + 1, weapon);
	};
	// nextRequiredExp 
	Game_System.prototype.nextRequiredExp = function(weapon) {
		return this.nextLevelExp(weapon) - this.currentLevelExp(weapon);
	};
	// isMaxLevel
	Game_System.prototype.isMaxLevel = function(weapon) {
		var level = this.weaponLevel(weapon);
		var maxLevel = this.maxWeaponLevel(weapon);
		return level >= maxLevel;
	};
    // weaponLevelUp
	Game_System.prototype.weaponLevelUp = function(weapon) {
	    this._weaponLevel[weapon.id][2]++;
	};
	// BattleManager ----------------------------------------------------------
	// setWeaponSubject
	BattleManager.setWeaponSubject = function(subject){
		this._weaponSubject = subject
	}
	// weaponSubject
	BattleManager.weaponSubject = function(){
		return this._weaponSubject;
	}
	// Game_Action -------------------------------------------------------------
	// executeDamage
	var _Game_Action_executeDamage = Game_Action.prototype.executeDamage;
	Game_Action.prototype.executeDamage = function(target, value) {
		BattleManager.setWeaponSubject(this.subject());
		_Game_Action_executeDamage.call(this, target, value);
	};
	// Game_Battler ------------------------------------------------------------
	// onDamage
	var _Game_Battler_onDamage = Game_Battler.prototype.onDamage;
	Game_Battler.prototype.onDamage = function(value) {
		_Game_Battler_onDamage.call(this, value);
		this.getWeaponExp(value);
	};
	// getWeaponExp
	Game_Battler.prototype.getWeaponExp = function(value){
		var flag = this.isEnemy();
		var sub = BattleManager.weaponSubject();
		if (flag && sub && sub.isActor()){
			var weapon = sub.weapons()[0];
			if (weapon && weapon.meta.levelUseClass){
				this.weaponGetExp(weapon, value);
			}
		}
		BattleManager.setWeaponSubject(null);
	};
	// Game_Actor --------------------------------------------------------------
	// WeaponParamBase
	Game_Actor.prototype.weaponParamBase = function(paramId) {
		var weapon = this.weapons()[0];
		if (!weapon || !weapon.meta.levelUseClass) return 0;
		$gameSystem.setWeaponData(weapon);
		var weaponClass = $gameSystem.weaponClass(weapon);
		var weaponLevel = $gameSystem.weaponLevel(weapon);
		return weaponClass.params[paramId][weaponLevel];
	};
    // paramPlus
	var _Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
	Game_Actor.prototype.paramPlus = function(paramId) {
		value = _Game_Actor_paramPlus.call(this, paramId);
		return value + this.weaponParamBase(paramId);
	};
	// weaponGetExp
	Game_Actor.prototype.weaponGetExp = function(weapon, value) {
		if (!value || value <= 0) return;
		var exp = Math.round(value * expRate);
		$gameSystem.getExp(weapon, exp, this);
	};
	// Game_Enemy -------------------------------------------------------------
	// weaponGetExp
	Game_Enemy.prototype.weaponGetExp = function(weapon, value) {
		if (!value || value <= 0) return;
		var exp = Math.round(value * expRate);
		$gameSystem.getExp(weapon, exp, this);
	};
	// Window_Base -------------------------------------------------------------
	// drawItemName
	var _Window_Base_drawItemName = Window_Base.prototype.drawItemName;
	Window_Base.prototype.drawItemName = function(item, x, y, width) {
		if (item && item.meta.levelUseClass){
			width = width || 312;
			var iconBoxWidth = Window_Base._iconWidth + 4;
			this.resetTextColor();
			$gameSystem.setWeaponData(item);
			if (!$gameSystem.isMaxLevel(item)){
				var color1 = gradColor[0];
				var color2 = gradColor[1];
				var gaugeMax = $gameSystem.nextRequiredExp(item);
				var curLvExp = $gameSystem.currentLevelExp(item);
				var exp = $gameSystem.weaponExp(item);
				var rate = (exp - curLvExp) / gaugeMax;
				var w = Math.min(this.contents.width,312) - 80
				this.drawGauge(x + iconBoxWidth, y-1, w, rate, color1, color2);	
			}
			var text = item.name + sysText[0] + String($gameSystem.weaponLevel(item));
			this.drawIcon(item.iconIndex, x + 2, y + 2);
			this.drawText(text, x + iconBoxWidth, y, width - iconBoxWidth);
		}else{
			_Window_Base_drawItemName.call(this, item, x, y, width);
		}
	};
	// Window_Help -------------------------------------------------------------
	// setItem
	var _Window_Help_setItem = Window_Help.prototype.setItem;
	Window_Help.prototype.setItem = function(item) {
		if (item && item.meta.levelUseClass){
			$gameSystem.setWeaponData(item);
			if ($gameSystem.isMaxLevel(item)){
				var text = sysText[1];
			}else{
				var nextExp = $gameSystem.nextLevelExp(item);
				var exp = $gameSystem.weaponExp(item);
				var text = sysText[2] + String(nextExp - exp);
			}
			this.setText(item.description + text);
		}else{
			_Window_Help_setItem.call(this, item);
		}
	};
		
})();
