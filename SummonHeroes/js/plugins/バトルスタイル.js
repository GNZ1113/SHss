//=============================================================================
// バトルスタイル.js
//=============================================================================

/*:ja
 * v0.5.5
 * @plugindesc
 * メニューにバトルスタイルコマンドを追加し
 * 選択したバトルコマンドに応じたステートを付加する
 * 
 * @author Declare War
 *
 * @param UseBattleStyleComamnd
 * @default true
 * @desc メニューコマンドにスタイル設定コマンドを追加するかどうか(true/false)
 *
 * @param BattleStyleComamnd
 * @default スタイル設定
 * @desc メニューコマンドに追加するコマンド名
 *
 * @param BattleStyleCommandIndex
 * @default 2
 * @desc コマンドのインデックス
 *
 * @param BattleStyleUsePicture1
 * @default true
 * @desc 背景画像を使うかどうか(true/false)
 *
 * @param BattleStyleBackPicture1
 * @default Battle_Style_Back1
 * @desc 背景画像名(Picturesフォルダに入れる)
 *
 * @param BattleStyleUsePicture2
 * @default true
 * @desc 背景の上の画像を使うかどうか(true/false trueなら全ウィンドウ透明化)
 *
 * @param BattleStyleBackPicture2
 * @default Battle_Style_Back2
 * @desc 背景の上の画像名(Picturesフォルダに入れる、ウィンドウの代わり)
 *
 * @param BattleStyleUsePicture3
 * @default true
 * @desc アクター画像を使うかどうか(true/false)
 *
 * @param BattleStyleActorPicture
 * @default Battle_Style_Actor_
 * @desc アクター画像(Picturesフォルダに入れる、ヘルプで補足有)
 *
 * @param UseParameterLine
 * @default true
 * @desc スタイル選択時にパラメータの変化を線で描画するかどうか(true/false)
 *
 * @param BasicBattleStyle
 * @default 11,12,13
 * @desc 始めから使えるバトルスタイル(ステートのIDを,で区切って記述)
 *
 * @param DefaultBattleStyle
 * @default 11
 * @desc 
 * 始めにセットされているバトルスタイル(0ならスタイル無し)
 * BasicBattleStyle で指定したステートIDにする必要あり
 *
 * @param BattleStyleWord1
 * @default スタイル選択
 * @desc ワードの設定
 *
 * @param BattleStyleWord2
 * @default 現在のスタイル
 * @desc ワードの設定
 *
 * @param BattleStyleWord3
 * @default 未設定
 * @desc ワードの設定
 *
 * @help
 * ●バトルスタイルとして扱うステートについて
 * ステートのメモ欄に <battleStyleDesc:説明文> と書く
 *
 * ●セットできないバトルスタイルの設定
 * アクターのメモ欄に <noFitBattleStyle:1,2,3> のように書く
 * 
 * ●アクター画像について
 * ファイル名の最後にアクターIDをつける
 * 初期設定でID1 なら Battle_Style_Actor_1
 * 画像のサイズは最大で300×60程度
 *
 * ●イベントコマンドでスタイル追加(idはステートID)
 * $gameSystem.getBattleStyle(id)
 *
 * ●イベントコマンドでスタイル削除(idはステートID、初期からあるものは削除不可)
 * $gameSystem.deleteBattleStyle(id)
 *
 * ●イベントコマンドでスタイルを変更(a_idはアクターID   s_idはステートID、0なら外す)
 * var actor = $gameActors.actor(a_id); 
 * actor.setBattleStyle(s_id); 
 */
 
/*:en
 * @plugindesc
 * BattleStyle
 * 
 * @author Declare War
 *
 * @param UseBattleStyleComamnd
 * @default true
 * @desc add battle style setting command in menu?  (true/false)
 *
 * @param BattleStyleComamnd
 * @default Style Setting
 * @desc command name
 *
 * @param BattleStyleCommandIndex
 * @default 2
 * @desc command index
 *
 * @param BattleStyleUsePicture1
 * @default true
 * @desc background picture(bottom layer) use? (true/false)
 *
 * @param BattleStyleBackPicture1
 * @default Battle_Style_Back1
 * @desc background picture file name (in Pictures directory)
 *
 * @param BattleStyleUsePicture2
 * @default true
 * @desc background picture(middle layer) use? (true/false if true, window no visible)
 *
 * @param BattleStyleBackPicture2
 * @default Battle_Style_Back2
 * @desc background picture file name (in Pictures directory)
 *
 * @param BattleStyleUsePicture3
 * @default true
 * @desc actor picture use?(true/false)
 *
 * @param BattleStyleActorPicture
 * @default Battle_Style_Actor_
 * @desc actor picture file name(in Pictures directory   Desc in help)
 *
 * @param UseParameterLine
 * @default true
 * @desc draw parameter change line in style setting screen (true/false)
 *
 * @param BasicBattleStyle
 * @default 11,12,13
 * @desc battle style state (state_id,state_id...)
 *
 * @param DefaultBattleStyle
 * @default 11
 * @desc 
 * init set battle style(if 0 : no set battle style)
 * (init set battle style in BasicBattleStyle)
 *
 * @param BattleStyleWord1
 * @default style choice
 * @desc word setting
 *
 * @param BattleStyleWord2
 * @default equip style
 * @desc word setting
 *
 * @param BattleStyleWord3
 * @default no set
 * @desc word setting
 *
 * @help
 * ●battle style state setting
 * state memo : <battleStyleDesc:style desc aaaaaaa> 
 *
 * ●cannot set battle style
 * actor memo : <noFitBattleStyle:1,2,3> 
 * 
 * ●actor picture setting
 * file name last : plus actor id
 * ex. if id1     : Battle_Style_Actor_1
 * maxsize        : 300×60
 *
 * ●event command   add style
 * $gameSystem.getBattleStyle(state_id)
 *
 * ●event command   delete style(BasicBattleStyle can not delete)
 * $gameSystem.deleteBattleStyle(state_id)
 *
 * ●event command  style change(a_id:actor_id   s_id:state_id, if 0: no style)
 * var actor = $gameActors.actor(a_id); 
 * actor.setBattleStyle(s_id); 
 */
 
(function(){
	// params --------------------------------------------------------
    var parameters = PluginManager.parameters('バトルスタイル');
    var Params = {};
    Params.battleStyleComamnd = parameters['BattleStyleComamnd'] || '';
    Params.battleStyleCommandIndex = Number(parameters['BattleStyleCommandIndex'] || 2);
	if (parameters['UseBattleStyleComamnd'] === 'true'){
		Params.useBattleStyleComamnd = true;
	}else{
		Params.useBattleStyleComamnd = false;
	}
	if (parameters['BattleStyleUsePicture1'] === 'true'){
		Params.battleStyleUsePicture1 = true;
	}else{
		Params.battleStyleUsePicture1 = false;
	}
	if (parameters['BattleStyleUsePicture2'] === 'true'){
		Params.battleStyleUsePicture2 = true;
	}else{
		Params.battleStyleUsePicture2 = false;
	}
	if (parameters['BattleStyleUsePicture3'] === 'true'){
		Params.battleStyleUsePicture3 = true;
	}else{
		Params.battleStyleUsePicture3 = false;
	}
	if (parameters['UseParameterLine'] === 'true'){
		Params.useParameterLine = true;
	}else{
		Params.useParameterLine = false;
	}
    Params.battleStyleBackPicture1 = parameters['BattleStyleBackPicture1'] || '';
	Params.battleStyleBackPicture2 = parameters['BattleStyleBackPicture2'] || '';
	Params.battleStyleActorPicture = parameters['BattleStyleActorPicture'] || '';
	if (parameters['BasicBattleStyle']){
		Params.basicBattleStyle = parameters['BasicBattleStyle'].split(",").map(function(id){
			return Number(id);
		})
	}else{
		Params.basicBattleStyle = [];
	}
	Params.defaultBattleStyle = Number(parameters['DefaultBattleStyle']);
	Params.battleStyleWord1 = parameters['BattleStyleWord1'] || 'スタイル選択';
	Params.battleStyleWord2 = parameters['BattleStyleWord2'] || '現在のスタイル';
	Params.battleStyleWord3 = parameters['BattleStyleWord3'] || '未設定';
	Params.opacity = Params.battleStyleUsePicture2 ? 0 : 192;
	Params.StandardPadding = 12;
	// Game_System  --------------------------------------------------------
	// addBattleStyleInit
	Game_System.prototype.addBattleStyleInit = function(){
		if (!this._addBattleStyle){
			this._addBattleStyle = [];	
		} 
	};
	// addBattleStyle
	Game_System.prototype.addBattleStyle = function(){
		this.addBattleStyleInit();
		return this._addBattleStyle;
	};
	// getBattleStyle
	Game_System.prototype.getBattleStyle = function(id){
		this.addBattleStyleInit();
		if ($dataStates[id].meta.battleStyleDesc){
			this._addBattleStyle.push(id);
			var array = this._addBattleStyle.filter(function (x, i, self) {
				return self.indexOf(x) === i;
			});
			this._addBattleStyle = array;
		}
	};
	// deleteBattleStyle
	Game_System.prototype.deleteBattleStyle = function(id){
		this.addBattleStyleInit();
		this._addBattleStyle.splice(this._addBattleStyle.indexOf(id), 1);
	};
	
	// Game_Actor  --------------------------------------------------------
	var _Game_Actor_states = Game_Actor.prototype.states;
	Game_Actor.prototype.states = function() {
		var result = _Game_Actor_states.call(this);
		result = result.concat(this.battleStyleState());
		return result
    };
	// battleStyleStateInit
	Game_Actor.prototype.battleStyleStateInit = function(){
		if (!this._battleStyleState){
			this._battleStyleState = [];
			if (Params.defaultBattleStyle > 0){
				this._battleStyleState.push(Params.defaultBattleStyle);
			}
			this.refresh();
		};
	};
	// battleStyleState
	Game_Actor.prototype.battleStyleState = function() {
		this.battleStyleStateInit();
		return this._battleStyleState.map(function(id) {
            return $dataStates[id];
        });
    };
	// setBattleStyle
	Game_Actor.prototype.setBattleStyle = function(id){
		this._battleStyleState = [];
		var num = Number(id || 0);
		if (num !== 0){
			this._battleStyleState.push(num);
		}
		this.refresh();
	};
	// noFitBattleStyle
	Game_Actor.prototype.noFitBattleStyle = function(){
		var data = this.actor().meta.noFitBattleStyle;
		if (!data) return [];
		return this.actor().meta.noFitBattleStyle.split(",").map(function(id){
			return Number(id);
		});
	}
	
	// Window_MenuCommand  --------------------------------------------------------
	// addOriginalCommands
	var _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands
	Window_MenuCommand.prototype.addOriginalCommands = function() {
		_Window_MenuCommand_addOriginalCommands.call(this);
		if (!Params.useBattleStyleComamnd) return;
		var data = { name: Params.battleStyleComamnd, symbol: 'battleStyle', enabled: true, ext: null};
		this._list.splice(Params.battleStyleCommandIndex, 0, data);
    };
	
	// Window_Battle_Style_Name  --------------------------------------------------------
	// 
	function Window_Battle_Style_Name() {
    this.initialize.apply(this, arguments);
	}
	Window_Battle_Style_Name.prototype = Object.create(Window_Base.prototype);
	Window_Battle_Style_Name.prototype.constructor = Window_Battle_Style_Name;
    // initialize
	Window_Battle_Style_Name.prototype.initialize = function() {
	    Window_Base.prototype.initialize.call(this, 0, 0, 360, 120);
		this.opacity = Params.opacity;
		this._actor = null;
	}
	// standardPadding
	Window_Battle_Style_Name.prototype.standardPadding = function() {
        return Params.StandardPadding;
    };
	// setActor
	Window_Battle_Style_Name.prototype.setActor = function(actor) {
		if (this._actor !== actor) {
			this._actor = actor;
			this.refresh();
		}
    };
	// refresh
	Window_Battle_Style_Name.prototype.refresh = function() {
    this.contents.clear();
		if (this._actor) {
			this.drawActorInfo();
		}
	};
	// drawActorInfo
	Window_Battle_Style_Name.prototype.drawActorInfo = function(){
		if (Params.battleStyleUsePicture3){
			this.drawActorName(6, 0, this.contents.width);
			var name = Params.battleStyleActorPicture + String(this._actor.actorId());
			var bitmap = ImageManager.loadPicture(name);
			this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 36);
		}else{
			this.drawActorSimpleStatus(this._actor, 6, 0);
		}
	};
	// drawActorName
	Window_Battle_Style_Name.prototype.drawActorName = function(x, y, width) {
		this.changeTextColor(this.hpColor(this._actor));
		this.drawText(this._actor.name(), x, y, width);
    };
	// drawActorSimpleStatus
	Window_Battle_Style_Name.prototype.drawActorSimpleStatus = function(actor, x, y) {
		this.drawActorName(x, y, this.contents.width);
		this.drawActorHp(actor, x, y + 30, 200);
		this.drawActorMp(actor, x, y + 62, 200);
    };
    // Window_Battle_Style_Label  --------------------------------------------------------
	// 
	function Window_Battle_Style_Label() {
    this.initialize.apply(this, arguments);
	}
	Window_Battle_Style_Label.prototype = Object.create(Window_Base.prototype);
	Window_Battle_Style_Label.prototype.constructor = Window_Battle_Style_Label;
    // initialize
	Window_Battle_Style_Label.prototype.initialize = function() {
	    Window_Base.prototype.initialize.call(this, 0, 120, 360, 60);
		this.opacity = Params.opacity;
		this.drawLabel(0, 0);
	}
	// standardPadding
	Window_Battle_Style_Label.prototype.standardPadding = function() {
    return Params.StandardPadding;
    };
	// drawLabel
	Window_Battle_Style_Label.prototype.drawLabel = function(x, y) {
		this.changeTextColor(this.systemColor());
		this.drawText(Params.battleStyleWord1, x, y, this.contents.width, 'center');
		this.resetTextColor();
    };
	// Window_Equip_Battle_Style  --------------------------------------------------------
	// 
	function Window_Equip_Battle_Style() {
    this.initialize.apply(this, arguments);
	}
	Window_Equip_Battle_Style.prototype = Object.create(Window_Base.prototype);
	Window_Equip_Battle_Style.prototype.constructor = Window_Equip_Battle_Style;
    // initialize
	Window_Equip_Battle_Style.prototype.initialize = function() {
	    Window_Base.prototype.initialize.call(this, 360, 0, 456, 108);
		this.opacity = Params.opacity;
	}
	// setActor
	Window_Equip_Battle_Style.prototype.setActor = function(actor) {
		if (this._actor !== actor) {
			this._actor = actor;
			this.refresh();
		}
    };
	// refresh
	Window_Equip_Battle_Style.prototype.refresh = function() {
        this.contents.clear();
		this.drawEquipBattleStyle();
	};
	// drawEquipBattleStyle 
	Window_Equip_Battle_Style.prototype.drawEquipBattleStyle = function(){
		this.changeTextColor(this.systemColor());
		this.drawText(Params.battleStyleWord2, 0, 0, this.contents.width, 'center');
		this.resetTextColor();
		if (this._actor) {
			var array = this._actor._battleStyleState;
			if (array.length === 0){
				this.drawText(Params.battleStyleWord3, 0, 36, this.contents.width, 'center');
			}else{
				this.drawItemName($dataStates[array[0]], 0, 36, this.contents.width);
			}
		}
	};
	// Window_Battle_Style_Command  --------------------------------------------------------
	//
	function Window_Battle_Style_Command() {
        this.initialize.apply(this, arguments);
	}
	Window_Battle_Style_Command.prototype = Object.create(Window_Command.prototype);
	Window_Battle_Style_Command.prototype.constructor = Window_Battle_Style_Command;
    // initialize
	Window_Battle_Style_Command.prototype.initialize = function() {
		Window_Command.prototype.initialize.call(this, 0, 180);
		this.opacity = Params.opacity;
	};
	// standardPadding
	Window_Battle_Style_Command.prototype.standardPadding = function() {
    return Params.StandardPadding;
    };
    // windowWidth
	Window_Battle_Style_Command.prototype.windowWidth = function() {
		return 360;
	};
    // numVisibleRows
	Window_Battle_Style_Command.prototype.numVisibleRows = function() {
		return 6;
	};
	// setActor
	Window_Battle_Style_Command.prototype.setActor = function(actor) {
		if (this._actor !== actor) {
			this._actor = actor;
			this.refresh();
			this.select(0);
		}
    };
	// makeCommandList
	Window_Battle_Style_Command.prototype.makeCommandList = function(){
		if (!this._actor) return;
		var array1 = Params.basicBattleStyle;
		var array2 = $gameSystem.addBattleStyle();
		var array3 = array1.concat(array2);
		var array4 = this._actor.noFitBattleStyle();
		for(var i = 0; i < array4.length; i++){
			var num = array4[i];
			var idx = array3.indexOf(num);
			if (idx >= 0) array3.splice(idx, 1);
		}
		array3 = array3.map(function(id) {
			return $dataStates[id];
		});
		for(var i = 0; i < array3.length; i++){
			this.addCommand(array3[i].name, array3[i]);
		}
	};
	// drawItem
	Window_Battle_Style_Command.prototype.drawItem = function(index) {
		var rect = this.itemRectForText(index);
		this.resetTextColor();
		this.changePaintOpacity(this.isCommandEnabled(index));
		this.drawItemName(this.commandSymbol(index), rect.x, rect.y, rect.width);
    };
	// processOk
	Window_Battle_Style_Command.prototype.processOk = function() {
		if (this.isCurrentItemEnabled()) {
			SoundManager.playEquip();
			this.updateInputData();
			this.activate();
			this.callOkHandler();
		} else {
			this.playBuzzerSound();
		}
    };
	// setStatusWindow
	Window_Battle_Style_Command.prototype.setStatusWindow = function(window){
		this._statusWindow = window;
	};
	// updateHelp
	Window_Battle_Style_Command.prototype.updateHelp = function() {
		if (this._helpWindow){
			this._helpWindow.setItem(this.currentSymbol());
		}
        if (this._actor && this._statusWindow && this.currentSymbol()){
			var actor = JsonEx.makeDeepCopy(this._actor);
			actor.setBattleStyle(this.currentSymbol().id);
			this._statusWindow.setTempActor(actor);
		}
    };
	// Window_Battle_Style_Help  --------------------------------------------------------
	//
	function Window_Battle_Style_Help() {
        this.initialize.apply(this, arguments);
	}
	Window_Battle_Style_Help.prototype = Object.create(Window_Base.prototype);
	Window_Battle_Style_Help.prototype.constructor = Window_Battle_Style_Help;
    // initialize
	Window_Battle_Style_Help.prototype.initialize = function() {
		var width = Graphics.boxWidth;
		Window_Base.prototype.initialize.call(this, 0, 420, width, 204);
		this.opacity = Params.opacity;
		this._text = '';
	};
	// standardPadding
	Window_Battle_Style_Help.prototype.standardPadding = function() {
        return Params.StandardPadding;
    };
    // setText
	Window_Battle_Style_Help.prototype.setText = function(text) {
		if (this._text !== text) {
			this._text = text;
			this.refresh();
		}
	};
    // clear
	Window_Battle_Style_Help.prototype.clear = function() {
		this.setText('');
	};
    // setItem
	Window_Battle_Style_Help.prototype.setItem = function(item) {
		if (item && item.meta.battleStyleDesc){
			this.setText(item.meta.battleStyleDesc);
		}else{
			this.clear();
		}
	};
	// refresh
	Window_Battle_Style_Help.prototype.refresh = function() {
		this.contents.clear();
		this.drawTextEx(this._text, this.textPadding(), 0);
    };
	// Window_Battle_Style_Status  --------------------------------------------------------
	//
	function Window_Battle_Style_Status() {
        this.initialize.apply(this, arguments);
	}
	Window_Battle_Style_Status.prototype = Object.create(Window_Base.prototype);
	Window_Battle_Style_Status.prototype.constructor = Window_Battle_Style_Status;
    // initialize
	Window_Battle_Style_Status.prototype.initialize = function() {
		Window_Base.prototype.initialize.call(this, 360, 108, 456, 312);
		this.opacity = Params.opacity;
		this._actor = null;
		this._tempActor = null;
		this.refresh();
	};
	// standardPadding
	Window_Battle_Style_Status.prototype.standardPadding = function() {
    return Params.StandardPadding;
    };
	// setActor
	Window_Battle_Style_Status.prototype.setActor = function(actor) {
		if (this._actor !== actor) {
			this._actor = actor;
			this.refresh();
		}
    };
	// refresh
	Window_Battle_Style_Status.prototype.refresh = function() {
		this.contents.clear();
		if (this._actor) {
			for (var i = 0; i < 8; i++) {
				this.drawItem(0, this.lineHeight() * i, i);
			}
		}
    };
	// setTempActor
	Window_Battle_Style_Status.prototype.setTempActor = function(tempActor) {
		if (this._tempActor !== tempActor) {
			this._tempActor = tempActor;
			this.refresh();
		}
    };
	// drawItem
	Window_Battle_Style_Status.prototype.drawItem = function(x, y, paramId) {
		if (this._actor && this._tempActor && Params.useParameterLine){
			this.drawStatusGauge(x, y, paramId);
		}
		this.drawParamName(x + this.textPadding(), y, paramId);
		if (this._actor) {
			this.drawCurrentParam(x + 200, y, paramId);
		}
		this.drawRightArrow(x + 264+32, y);
		if (this._tempActor) {
			this.drawNewParam(x + 298+48, y, paramId);
		}
    };
	// drawStatusGauge
	Window_Battle_Style_Status.prototype.drawStatusGauge = function(x, y, paramId) {
		var hw = this.contents.width / 2;
		var param = this._actor.param(paramId);
		var newParam = this._tempActor.param(paramId);
		var rate = newParam / param;
		if (rate > 1){
			var baseGauge = hw
			var plusGauge = Math.min(hw, Math.floor(hw * (rate - 1.0)));
		}else if (rate === 1){
			var baseGauge = hw
			var plusGauge = 0
		}else if (rate < 1){
			var plusGauge = Math.max(2, Math.ceil(hw * (1.0 - rate)));
			var baseGauge = hw - plusGauge;
		}
		var gaugeY = y + this.lineHeight() - 8;
		var baseColor = '#FFFFFF'
		this.contents.fillRect(x, gaugeY, baseGauge, 6, baseColor);
		if (rate !== 0){
			var plusColor = rate > 1 ? this.powerUpColor() : this.powerDownColor();
		    this.contents.fillRect(x + baseGauge, gaugeY, plusGauge, 6, plusColor);
		}
	};
	// drawParamName
	Window_Battle_Style_Status.prototype.drawParamName = function(x, y, paramId) {
		this.changeTextColor(this.systemColor());
		this.drawText(TextManager.param(paramId), x, y, 180);
    };
	// drawCurrentParam
	Window_Battle_Style_Status.prototype.drawCurrentParam = function(x, y, paramId) {
		this.resetTextColor();
		this.drawText(this._actor.param(paramId), x, y, 64, 'right');
	};
    // drawRightArrow
	Window_Battle_Style_Status.prototype.drawRightArrow = function(x, y) {
		this.changeTextColor(this.systemColor());
		this.drawText('\u2192', x, y, 32, 'center');
	};
    // drawNewParam
	Window_Battle_Style_Status.prototype.drawNewParam = function(x, y, paramId) {
		var newValue = this._tempActor.param(paramId);
		var diffvalue = newValue - this._actor.param(paramId);
		this.changeTextColor(this.paramchangeTextColor(diffvalue));
		this.drawText(newValue, x, y, 64, 'right');
    };
	// Scene_Menu  --------------------------------------------------------
	// createCommandWindow
	var _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
	Scene_Menu.prototype.createCommandWindow = function() {
		_Scene_Menu_createCommandWindow.call(this);
		this._commandWindow.setHandler('battleStyle', this.commandPersonal.bind(this));
		this.battleStyleImageLoad();
	};
	// commandPersonal
	var _Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk
	Scene_Menu.prototype.onPersonalOk = function() {
		_Scene_Menu_onPersonalOk.call(this);
		switch (this._commandWindow.currentSymbol()) {
		case 'battleStyle':
			SceneManager.push(Scene_BattleStyle);
			break;
		}
	};
	// battleStyleImageLoad
	Scene_Menu.prototype.battleStyleImageLoad = function(){
		if (Params.battleStyleUsePicture3){
			var members = $gameParty.members();
			for (i = 0; i < members.length; i++){
				var name = Params.battleStyleActorPicture + String(members[i].actorId());
				var bitmap = ImageManager.loadPicture(name);
			}
		}
			
	}
	
	// Scene_BattleStyle  --------------------------------------------------------
	//
	function Scene_BattleStyle() {
    this.initialize.apply(this, arguments);
    }
	Scene_BattleStyle.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_BattleStyle.prototype.constructor = Scene_BattleStyle;
    // initialize
	Scene_BattleStyle.prototype.initialize = function() {
		Scene_MenuBase.prototype.initialize.call(this);
	};
	// createBackground
	Scene_BattleStyle.prototype.createBackground = function() {
		this._backgroundSprite = new Sprite();
		if (Params.battleStyleUsePicture1){
	        this._backgroundSprite.bitmap = 
			ImageManager.loadPicture(Params.battleStyleBackPicture1, 0); 
		}else{
			this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
		}
		this.addChild(this._backgroundSprite);
        if (Params.battleStyleUsePicture2){
			this._backgroundSprite2 = new Sprite();
			this._backgroundSprite2.bitmap = 
			ImageManager.loadPicture(Params.battleStyleBackPicture2, 0);
			this.addChild(this._backgroundSprite2);
		}
    };
    // create
	Scene_BattleStyle.prototype.create = function() {
		Scene_MenuBase.prototype.create.call(this);
		this.createHelpWindow();
		this.createNameWindow();
		this.createStatusWindow();
		this.createLabelWindow();
		this.createEquipWindow();
		this.createCommandWindow();
		this.refreshActor();
	};
	// createHelpWindow
	Scene_BattleStyle.prototype.createHelpWindow = function(){
		this._helpWindow = new Window_Battle_Style_Help();
        this.addWindow(this._helpWindow);
	}
    // createNameWindow
	Scene_BattleStyle.prototype.createNameWindow = function(){
		this._nameWindow = new Window_Battle_Style_Name();
		this.addWindow(this._nameWindow);
	}
	// createStatusWindow
	Scene_BattleStyle.prototype.createStatusWindow = function(){
		this._statusWindow = new Window_Battle_Style_Status();
		this.addWindow(this._statusWindow);
	}
	// createLabelWindow
	Scene_BattleStyle.prototype.createLabelWindow = function(){
		this._labelWindow = new Window_Battle_Style_Label();
		this.addWindow(this._labelWindow);
	}
	// createEquipWindow
	Scene_BattleStyle.prototype.createEquipWindow = function(){
		this._equipWindow = new Window_Equip_Battle_Style();
		this.addWindow(this._equipWindow);
	}
	// createCommandWindow
	Scene_BattleStyle.prototype.createCommandWindow = function(){
		this._commandWindow = new Window_Battle_Style_Command();
		this._commandWindow.setHelpWindow(this._helpWindow);
		this._commandWindow.setStatusWindow(this._statusWindow);
		this._commandWindow.setHandler('ok',       this.setBattleStyle.bind(this));
		this._commandWindow.setHandler('cancel',   this.popScene.bind(this));
		this._commandWindow.setHandler('pagedown', this.nextActor.bind(this));
		this._commandWindow.setHandler('pageup',   this.previousActor.bind(this));
		this.addWindow(this._commandWindow);
	}
	// setBattleStyle
	Scene_BattleStyle.prototype.setBattleStyle = function(){
		var actor = this.actor();
		actor.setBattleStyle(this._commandWindow.currentSymbol().id);
		this._nameWindow.refresh();
		this._equipWindow.refresh();
		this._statusWindow.refresh();
		this._commandWindow.refresh();
	};
	// refreshActor
	Scene_BattleStyle.prototype.refreshActor = function() {
		var actor = this.actor();
		this._nameWindow.setActor(actor);
		this._statusWindow.setActor(actor);
		this._equipWindow.setActor(actor);
		this._commandWindow.setActor(actor);
	};
	// onActorChange
	Scene_BattleStyle.prototype.onActorChange = function() {
		this.refreshActor();
		this._commandWindow.activate();
	};
	
 })();