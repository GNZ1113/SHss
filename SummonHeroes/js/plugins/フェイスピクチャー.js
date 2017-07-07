//=============================================================================
// フェイスピクチャー / FacePicture.js
//=============================================================================

/*:ja
 * v0.1.5
 * @plugindesc　
 * 文章の表示で指定した顔グラフィックと同名の画像ファイルを顔グラの代わりに表示する
 * 
 * @author Declare War
 * 
 * @param NormalModeSwitch
 * @default 10
 * @desc デフォルトの文章表示にするスイッチ
 *
 * @param TextStartX
 * @default 220
 * @desc 文章の描画開始X座標(フェイスピクチャーONの場合)
 *
 * @param TextStartY
 * @default 16
 * @desc 文章の描画開始Y座標(フェイスピクチャーONの場合)
 *
 * @param FontSize
 * @default 24
 * @desc フォントサイズ(デフォルトは28)
 *
 * @help このプラグインには、プラグインコマンドはありません。
 * 
 * ●立ち絵の画像について
 * 表情差分を使う場合画像ファイルの名前は
 * "顔グラのファイル名" + "_" + "インデックス" のようにする
 * 
 * ●名前欄の画像について
 * 画像名は "顔グラのファイル名" + "_" + "名前"
 * 
 * ●メッセージ欄の画像について
 * 画像名は "Message_Back"
 * 
 * 画像の表示優先度は
 * キャラ絵　＞　名前欄　＞　メッセージ欄
 * 
 */
 
(function(){
	// params --------------------------------------------------------
    var parameters = PluginManager.parameters('フェイスピクチャー');
	var normalModeSwitch = Number(parameters['NormalModeSwitch']);
	var textStartX = Number(parameters['TextStartX']);
	var textStartY = Number(parameters['TextStartY']);
	var fontSize = Number(parameters['FontSize']);
	// Window_Message ----------------------------------------------------------
	// initialize
	var _Window_Message_initialize = Window_Message.prototype.initialize;
	Window_Message.prototype.initialize = function() {
		this.createFacePictureSprite();
		_Window_Message_initialize.call(this);
	};
	// createFacePictureSprite
	Window_Message.prototype.createFacePictureSprite = function(){
		this._FacePictureSprite = new Sprite_Face_Picture(this);
	};
	//facePictureSprites
	Window_Message.prototype.facePictureSprites = function(){
		return this._FacePictureSprite.sprites();
	};
	// standardFontSize
	Window_Message.prototype.standardFontSize = function() {
		return $gameParty && !$gameParty.inBattle() ? fontSize : 28;
	};
	// startMessage
	var _Window_Message_startMessage = Window_Message.prototype.startMessage;
	Window_Message.prototype.startMessage = function() {
		var name = $gameMessage.faceName();
		var index = $gameMessage.faceIndex();
		if (this.normal()){
			this._FacePictureSprite.setVisFlag(false);
		}else{
			this._FacePictureSprite.setVisFlag(true);
			this._FacePictureSprite.set(name, index);
		}
		_Window_Message_startMessage.call(this);
	};
	// drawMessageFace
	var _Window_Message_drawMessageFace = Window_Message.prototype.drawMessageFace;
	Window_Message.prototype.drawMessageFace = function() {
		if (this.normal()) _Window_Message_drawMessageFace.call(this);
	};
	// normal
	Window_Message.prototype.normal = function() {
		return ($gameParty.inBattle() || $gameMessage.positionType() !== 2 ||
		$gameSwitches.value(normalModeSwitch) || $gameMessage.faceName() === '');
	};
	// newPage 
	Window_Message.prototype.newPage = function(textState) {
		this.contents.clear();
		this.resetFontSettings();
		this.clearFlags();
		this.loadMessageFace();
		textState.x = this.newLineX();
		textState.y = this.newLineY();
		textState.left = this.newLineX();
		textState.height = this.calcTextHeight(textState, false);
	};
	// newLineX
	var _Window_Message_newLineX = Window_Message.prototype.newLineX;
	Window_Message.prototype.newLineX = function() {
		return this.normal() ? 
		_Window_Message_newLineX.call(this) : textStartX;
	};
	// newLineY
	Window_Message.prototype.newLineY = function() {
		return this.normal() ? 0 : textStartY;
	};
	// terminateMessage
	var _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
	Window_Message.prototype.terminateMessage = function() {
		//this._FacePictureSprite.setVisFlag(false)
		_Window_Message_terminateMessage.call(this);
	};
	
	
	// Sprite_Face_Picture -----------------------------------------------------
	//
	function Sprite_Face_Picture() {
		this.initialize.apply(this, arguments);
	}

	Sprite_Face_Picture.prototype = Object.create(Sprite.prototype);
	Sprite_Face_Picture.prototype.constructor = Sprite_Face_Picture;

	Sprite_Face_Picture.prototype.initialize = function(window) {
		this._messageSprite = new Sprite();
		this._nameSprite = new Sprite();
		Sprite.prototype.initialize.call(this);
		this._window = window;
	};
	// sprites
	Sprite_Face_Picture.prototype.sprites = function() {
		return [this._messageSprite, this._nameSprite, this];
	};
	// update
	Sprite_Face_Picture.prototype.update = function() {
		Sprite.prototype.update.call(this);
		this.updateVisibility();
	};
	// updateVisibility
	Sprite_Face_Picture.prototype.updateVisibility = function() {
		var flag = this._window.isOpen() && this._window.visible && this._visFlag;
		this.visible = flag;
		this._messageSprite.visible = flag;
		this._nameSprite.visible = flag;
	};
	// set
	Sprite_Face_Picture.prototype.set = function(name, index) {
		if (name === '') return;
		var picName1 = name + "_" + String(index);
		var picName2 = name + "_名前";
		var picName3 = "Message_Back"
		
		this.bitmap = ImageManager.loadPicture(picName1);
		this.x = 0;
		this.y = 0
		
		this._messageSprite.bitmap = ImageManager.loadPicture(picName2);
		var sy = Graphics.boxHeight - this._messageSprite.bitmap.height;
		this._messageSprite.x = 0
		this._messageSprite.y = 0
		
		this._nameSprite.bitmap = ImageManager.loadPicture(picName3);
		var sy2 = Graphics.boxHeight - this._nameSprite.bitmap.height;
		this._nameSprite.x = 0
		this._nameSprite.y = 0
		
	};
	// setVisFlag
	Sprite_Face_Picture.prototype.setVisFlag = function(flag) {
		this._visFlag = flag
	};
	// Scene_Map ---------------------------------------------------------------
	// createMessageWindow
	Scene_Map.prototype.createMessageWindow = function() {
    this._messageWindow = new Window_Message();
	var array = this._messageWindow.facePictureSprites();
	this.addChild(array[1])
	this.addChild(array[0])
	this.addChild(array[2]);
	this.addWindow(this._messageWindow);
	this.addChild(this._messageWindow);
    this._messageWindow.subWindows().forEach(function(window) {
        this.addWindow(window);
    }, this);
};
	
})();
 
 