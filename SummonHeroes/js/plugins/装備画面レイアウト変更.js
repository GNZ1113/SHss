//=============================================================================
// 装備画面レイアウト変更 / AltEquipScreen.js
//=============================================================================

/*:ja
 * v0.5.0
 * @plugindesc 装備画面のレイアウトを変更します。
 * @author Declare War
 *
 * @help このプラグインには、プラグインコマンドはありません。
 */

/*:en
 * @plugindesc Alternative equip screen layout.
 * @author Declare War
 *
 * @help This plugin does not provide plugin commands.
 */

(function(){
	// Window_EquipItem ---------------------------------------------------
	// maxCols #w
	Window_EquipItem.prototype.maxCols = function() {
        return 1;
    };
	// update #a
	var _Window_EquipItem_update = Window_EquipItem.prototype.update;
	Window_EquipItem.prototype.update = function() {
	    _Window_EquipItem_update.call(this);
	    if (this.active) {
	    	this.show();
	    }else {
		    this.hide();
	    }
	};
	// Window_EquipStatus ---------------------------------------------------
	// initialize #w
	Window_EquipStatus.prototype.initialize = function() {
		var width = this.windowWidth();
		var height = this.windowHeight();
		var wy = Graphics.boxHeight - height;
		Window_Base.prototype.initialize.call(this, 0, wy, width, height);
		this._actor = null;
		this._tempActor = null;
		this.refresh();
    };
	// windowWidth #w
	Window_EquipStatus.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };
	// windowHeight #w
	Window_EquipStatus.prototype.windowHeight = function() {
        return 216 + 12;
    };
	// refresh #w
	Window_EquipStatus.prototype.refresh = function() {
		this.contents.clear();
		if (this._actor) {
			this.drawActorName(this._actor, this.textPadding(), 0);
			this.drawActorFace(this._actor, 6, this.lineHeight() + 18, 144, 144);
			this.drawHorzLine(this.lineHeight() / 2);
			var bx = 144 + this.textPadding();
			var wid = Graphics.boxWidth - bx - this.standardPadding();
			for (var i = 0; i < 8; i++) {
				if (i < 4) {
					var sx = bx;
				}else {
					var sx = bx + wid / 2;
				}
				this.drawItem(sx, 18 + this.lineHeight() * (1+(i % 4)), i);
			}
		}
    };
	// drawHorzLine #n
	Window_EquipStatus.prototype.drawHorzLine = function(y) {
        var lineY = y + this.lineHeight() / 2 - 1;
        this.contents.paintOpacity = 48;
        this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.lineColor());
        this.contents.paintOpacity = 255;
    };
    // lineColor #n
    Window_EquipStatus.prototype.lineColor = function() {
        return this.normalColor();
    };
	
    // Scene_Equip ---------------------------------------------------
	// createStatusWindow #w
	Scene_Equip.prototype.createStatusWindow = function() {
		this._statusWindow = new Window_EquipStatus();
		this.addWindow(this._statusWindow);
    };
	// createCommandWindow #w
	Scene_Equip.prototype.createCommandWindow = function() {
		var wy = this._helpWindow.height;
		var ww = Graphics.boxWidth / 2 + 100;
		this._commandWindow = new Window_EquipCommand(0, wy, ww);
		this._commandWindow.setHelpWindow(this._helpWindow);
		this._commandWindow.setHandler('equip',    this.commandEquip.bind(this));
		this._commandWindow.setHandler('optimize', this.commandOptimize.bind(this));
		this._commandWindow.setHandler('clear',    this.commandClear.bind(this));
		this._commandWindow.setHandler('cancel',   this.popScene.bind(this));
		this._commandWindow.setHandler('pagedown', this.nextActor.bind(this));
		this._commandWindow.setHandler('pageup',   this.previousActor.bind(this));
		this.addWindow(this._commandWindow);
    };
	// createSlotWindow #w
	Scene_Equip.prototype.createSlotWindow = function() {
		var wy = this._commandWindow.y + this._commandWindow.height;
		var ww = Graphics.boxWidth / 2 + 100;
		var wh = Graphics.boxHeight - wy - this._statusWindow.height;
		this._slotWindow = new Window_EquipSlot(0, wy, ww, wh);
		this._slotWindow.setHelpWindow(this._helpWindow);
		this._slotWindow.setStatusWindow(this._statusWindow);
		this._slotWindow.setHandler('ok',       this.onSlotOk.bind(this));
		this._slotWindow.setHandler('cancel',   this.onSlotCancel.bind(this));
		this.addWindow(this._slotWindow);
    };
	// createItemWindow #w
	Scene_Equip.prototype.createItemWindow = function() {
		var wx = Graphics.boxWidth / 2;
		var wy = this._helpWindow.height;
		var ww = Graphics.boxWidth / 2;
		var wh = Graphics.boxHeight - wy - this._statusWindow.height;
		this._itemWindow = new Window_EquipItem(wx, wy, ww, wh);
		this._itemWindow.setHelpWindow(this._helpWindow);
		this._itemWindow.setStatusWindow(this._statusWindow);
		this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
		this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
		this._slotWindow.setItemWindow(this._itemWindow);
		this.addWindow(this._itemWindow);
    };
})();