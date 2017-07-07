//=============================================================================
// TMPlugin - リンククレジット
// バージョン: 2.0.0
// 最終更新日: 2016/08/12
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc タイトル画面にクレジットコマンドを追加します。
 * 制作スタッフの紹介をWebサイトへのリンク付きで表示できます。
 * 
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param creditsCommand
 * @desc タイトルメニューに表示するコマンド名。
 * 初期値: クレジット
 * @default クレジット
 *
 * @param itemHeight
 * @desc ひとつの要素を表示する領域の高さ。
 * 初期値: 84
 * @default 84
 *
 * @param useHelpWindow
 * @desc ヘルプウィンドウを使う。
 * 初期値: 1 ( 0 で無効 / 1 で有効 )
 * @default 1
 *
 * @param helpWindowText
 * @desc ヘルプウィンドウに表示するテキスト。 ( \n で改行)
 * 空（何も書かない）の場合は各項目の説明が表示されます。
 * @default 選択したサイトを開くことができます。\n（ブラウザがポップアップを禁止していると機能しません）
 *
 * @param helpFontSize
 * @desc 説明表示のフォントサイズ。
 * 初期値: 16 ( 0 で説明が非表示になります )
 * @default 16
 *
 * @param urlFontSize
 * @desc アドレス表示のフォントサイズ。
 * 初期値: 16 ( 0 でアドレスが非表示になります )
 * @default 16
 *
 * @param urlMaxLength
 * @desc アドレスの最大文字数。
 * 初期値: 50
 * @default 50
 *
 * @param credit1
 * @desc クレジット 1 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default <name:\C[16]自分のサイト名><help:制作><url:自分のサイトアドレス>
 *
 * @param credit2
 * @desc クレジット 2 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default <name:\C[16]RPGツクールMV><help:制作ツール ©2015 KADOKAWA CORPORATION./YOJI OJIMA\nゲームデータの抽出、改変、二次利用(有償・無償問わず)は禁止されています。><url:https://tkool.jp/mv/>
 *
 * @param credit3
 * @desc クレジット 3 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit4
 * @desc クレジット 4 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit5
 * @desc クレジット 5 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit6
 * @desc クレジット 6 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit7
 * @desc クレジット 7 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit8
 * @desc クレジット 8 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit9
 * @desc クレジット 9 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit10
 * @desc クレジット 10 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit11
 * @desc クレジット 11 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit12
 * @desc クレジット 12 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit13
 * @desc クレジット 13 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit14
 * @desc クレジット 14 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit15
 * @desc クレジット 15 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit16
 * @desc クレジット 16 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit17
 * @desc クレジット 17 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit18
 * @desc クレジット 18 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit19
 * @desc クレジット 19 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit20
 * @desc クレジット 20 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit21
 * @desc クレジット 21 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit22
 * @desc クレジット 22 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit23
 * @desc クレジット 23 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit24
 * @desc クレジット 24 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit25
 * @desc クレジット 25 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit26
 * @desc クレジット 26 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit27
 * @desc クレジット 27 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit28
 * @desc クレジット 28 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit29
 * @desc クレジット 29 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param credit30
 * @desc クレジット 30 の設定。
 * 書式: <name:名前><help:説明><url:アドレス>
 * @default 
 *
 * @param titleCommandAlign
 * @desc タイトルコマンドのアライメント。
 * 初期値: center ( left / center / right ）
 * @default center
 *
 * @param versionText
 * @desc バージョン情報としてタイトル画面に表示するテキスト。
 * 初期値: ver1.0
 * @default ver1.0
 *
 * @param versionTextX
 * @desc バージョン情報を表示するＸ座標。
 * 初期値: 0
 * @default 0
 *
 * @param versionTextY
 * @desc バージョン情報を表示するＹ座標。
 * 初期値: 0
 * @default 0
 *
 * @param versionTextFontSize
 * @desc バージョン情報のフォントサイズ。
 * 初期値: 24
 * @default 24
 *
 * @param versionTextColor
 * @desc バージョン情報のテキストカラー。
 * 初期値: white
 * @default white
 *
 * @param versionTextOutlineColor
 * @desc バージョン情報の縁取りカラー。
 * 初期値: black
 * @default black
 *
 * @param versionTextOutlineWidth
 * @desc バージョン情報の縁取りサイズ。
 * 初期値: 4
 * @default 4
 *
 * @param licenseText
 * @desc 著作権情報としてタイトル画面に表示するテキスト。
 * 初期値: ©著作者名 2016
 * @default ©著作者名 2016
 *
 * @param licenseTextShiftY
 * @desc 著作権情報を画面下部からどれだけずらすか
 * 初期値: -8
 * @default -8
 *
 * @param licenseTextFontSize
 * @desc 著作権情報のフォントサイズ。
 * 初期値: 24
 * @default 24
 *
 * @param licenseTextColor
 * @desc 著作権情報のテキストカラー。
 * 初期値: white
 * @default white
 *
 * @param licenseTextOutlineColor
 * @desc 著作権情報の縁取りカラー。
 * 初期値: black
 * @default black
 *
 * @param licenseTextOutlineWidth
 * @desc 著作権情報の縁取りサイズ。
 * 初期値: 4
 * @default 4
 *
 * @help
 * 使い方:
 *
 *   プラグインパラメータ credit1 ～ credit30 に使用ツールや素材などの情報を
 *   設定してください。<name:名前><help:説明><url:アドレス> のように 3 つの
 *   タグで 1 つの項目を設定します。
 *
 *   ブラウザ側でポップアップが制限されている環境では、リンク機能が
 *   動作しません。
 *
 *   タイトル画面に著作権情報とバージョン情報を表示する機能もあります、
 *   こちらもプラグインパラメータで文字色や表示位置を調整することが可能です。
 *
 *   このプラグインは RPGツクールMV Version 1.3.0 で動作確認をしています。
 *
 *
 * プラグインコマンド:
 *
 *   callCredit
 *     クレジットシーンを呼び出します。
 *
 *
 * プラグインパラメータ補足:
 *
 *   creditsCommand
 *     このパラメータを空（何も書かない）にすると、クレジットコマンドが
 *     表示されなくなります。
 *
 *   credit1 ～ credit30
 *     <name> と <help> タグの内容は、制御文字を使って文字色を変更したり、
 *     アイコンを表示することができます。イベントコマンド『文章の表示』と
 *     ほぼ同等の機能となります。
 *     <help> タグの内容は \n があるところで改行されます。
 *
 *   versionTextOutlineColor
 *   licenseTextOutlineColor
 *     これらのパラメータには、black や blue といったカラーネームと、
 *     #000000 や #0000ff のようなカラーコードを指定することができます。
 */

var Imported = Imported || {};
Imported.TMLinkCredit = true;

var TMPlugin = TMPlugin || {};
TMPlugin.LinkCredit = {};
TMPlugin.LinkCredit.Parameters = PluginManager.parameters('TMLinkCredit');
TMPlugin.LinkCredit.CreditsCommand = TMPlugin.LinkCredit.Parameters['creditsCommand'];
TMPlugin.LinkCredit.ItemHeight = +(TMPlugin.LinkCredit.Parameters['itemHeight'] || 84);
TMPlugin.LinkCredit.UseHelpWindow = TMPlugin.LinkCredit.Parameters['useHelpWindow'] === '1';
TMPlugin.LinkCredit.HelpWindowText = TMPlugin.LinkCredit.Parameters['helpWindowText'].replace(/\\n/g, '\n');
TMPlugin.LinkCredit.HelpFontSize = +(TMPlugin.LinkCredit.Parameters['helpFontSize'] || 16);
TMPlugin.LinkCredit.UrlFontSize = +(TMPlugin.LinkCredit.Parameters['urlFontSize'] || 16);
TMPlugin.LinkCredit.UrlMaxLength = +(TMPlugin.LinkCredit.Parameters['urlMaxLength'] || 50);
TMPlugin.LinkCredit.Credits = [];
  for (var i = 0; i < 30; i++) {
    TMPlugin.LinkCredit.Credits[i] = TMPlugin.LinkCredit.Parameters['credit' + (i + 1)];
  }
TMPlugin.LinkCredit.TitleCommandAlign = TMPlugin.LinkCredit.Parameters['titleCommandAlign'];
TMPlugin.LinkCredit.VersionText = TMPlugin.LinkCredit.Parameters['versionText'];
TMPlugin.LinkCredit.VersionTextX = +(TMPlugin.LinkCredit.Parameters['versionTextX'] || 0);
TMPlugin.LinkCredit.VersionTextY = +(TMPlugin.LinkCredit.Parameters['versionTextY'] || 0);
TMPlugin.LinkCredit.VersionTextFontSize = +(TMPlugin.LinkCredit.Parameters['versionTextFontSize'] || 24);
TMPlugin.LinkCredit.VersionTextColor = TMPlugin.LinkCredit.Parameters['versionTextColor'] || 'white';
TMPlugin.LinkCredit.VersionTextOutlineColor = TMPlugin.LinkCredit.Parameters['versionTextOutlineColor'] || 'black';
TMPlugin.LinkCredit.VersionTextOutlineWidth = +(TMPlugin.LinkCredit.Parameters['versionTextOutlineWidth'] || 4);
TMPlugin.LinkCredit.LicenseText = TMPlugin.LinkCredit.Parameters['licenseText'];
TMPlugin.LinkCredit.LicenseTextShiftY = +(TMPlugin.LinkCredit.Parameters['licenseTextShiftY'] || -8);
TMPlugin.LinkCredit.LicenseTextFontSize = +(TMPlugin.LinkCredit.Parameters['licenseTextFontSize'] || 24);
TMPlugin.LinkCredit.LicenseTextColor = TMPlugin.LinkCredit.Parameters['licenseTextColor'] || 'white';
TMPlugin.LinkCredit.LicenseTextOutlineColor = TMPlugin.LinkCredit.Parameters['licenseTextOutlineColor'] || 'black';
TMPlugin.LinkCredit.LicenseTextOutlineWidth = +(TMPlugin.LinkCredit.Parameters['licenseTextOutlineWidth'] || 4);

(function() {

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'callCredit') SceneManager.push(Scene_Credits);
  };

  //-----------------------------------------------------------------------------
  // Window_TitleCommand
  //

  var _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
  Window_TitleCommand.prototype.makeCommandList = function() {
    _Window_TitleCommand_makeCommandList.call(this);
    if (TMPlugin.LinkCredit.CreditsCommand) this.addCommand(TMPlugin.LinkCredit.CreditsCommand,
                                                            'credits');
  };

  var _Window_TitleCommand_itemTextAlign = Window_TitleCommand.prototype.itemTextAlign;
  Window_TitleCommand.prototype.itemTextAlign = function() {
    return TMPlugin.LinkCredit.TitleCommandAlign || _Window_TitleCommand_itemTextAlign.call(this);
  };

  //-----------------------------------------------------------------------------
  // Window_Credits
  //

  function Window_Credits() {
    this.initialize.apply(this, arguments);
  }

  Window_Credits.prototype = Object.create(Window_Selectable.prototype);
  Window_Credits.prototype.constructor = Window_Credits;

  Window_Credits.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._data = [];
    var re = /<name:(.+?)><help:(.+?)><url:(.+?)>/;
    for (var i = 0; i < TMPlugin.LinkCredit.Credits.length; i++) {
      var match = re.exec(TMPlugin.LinkCredit.Credits[i]);
      if (match) {
        var credit = {}
        credit.name = match[1];
        credit.help = match[2].replace(/\\n/g, '\n');
        credit.url  = match[3];
        this._data.push(credit);
      }
    }
    this.refresh();
    this.select(0);
    this.activate();
  };

  var _Window_Credits_standardFontSize = Window_Credits.prototype.standardFontSize;
  Window_Credits.prototype.standardFontSize = function() {
    return this._standardFontSize || _Window_Credits_standardFontSize.call(this);
  };

  Window_Credits.prototype.itemHeight = function() {
    return TMPlugin.LinkCredit.ItemHeight;
  };

  Window_Credits.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
  };

  Window_Credits.prototype.item = function() {
    var index = this.index();
    return this._data && index >= 0 ? this._data[index] : null;
  };

  Window_Credits.prototype.drawItem = function(index) {
    var item = this._data[index];
    if (item) {
      var rect = this.itemRectForText(index);
      var lineHeight = this.lineHeight();
      this.resetFontSettings();
      this.drawTextEx(item.name, rect.x, rect.y);
      if (TMPlugin.LinkCredit.UrlFontSize > 0) {
        this.resetFontSettings();
        this.contents.fontSize = TMPlugin.LinkCredit.UrlFontSize;
        var urlLineNums = Math.floor(this.itemHeight() / TMPlugin.LinkCredit.UrlFontSize);
        for (var i = 0; i < urlLineNums; i++) {
          var urlIndex = TMPlugin.LinkCredit.UrlMaxLength * i;
          if (urlIndex >= item.url.length) break;
          var y = rect.y + TMPlugin.LinkCredit.UrlFontSize * i;
          this.contents.drawText(item.url.substr(urlIndex, TMPlugin.LinkCredit.UrlMaxLength),
                                 rect.x, y, rect.width, lineHeight, 'right');
        }
      }
      if (TMPlugin.LinkCredit.HelpFontSize > 0) {
        this._standardFontSize = TMPlugin.LinkCredit.HelpFontSize;
        this.resetFontSettings();
        this.drawTextEx(item.help, rect.x, rect.y + lineHeight);
        this._standardFontSize = null;
      }
    }
  };

  Window_Credits.prototype.updateHelp = function() {
    var text = TMPlugin.LinkCredit.HelpWindowText || this._dataHelp[this.index()];
    this._helpWindow.setText(text);
  };

  Window_Credits.prototype.urlOpen = function() {
    window.open(this._data[this.index()].url, '_blank');
  };

  //-----------------------------------------------------------------------------
  // Scene_Title
  //

  var _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
  Scene_Title.prototype.createCommandWindow = function() {
    _Scene_Title_createCommandWindow.call(this);
    this._commandWindow.setHandler('credits', this.commandCredits.bind(this));
  };

  Scene_Title.prototype.commandCredits = function() {
    this._commandWindow.close();
    SceneManager.push(Scene_Credits);
  };

  var _Scene_Title_createForeground = Scene_Title.prototype.createForeground;
  Scene_Title.prototype.createForeground = function() {
    _Scene_Title_createForeground.call(this);
    if (TMPlugin.LinkCredit.VersionText) this.drawVersionText();
    if (TMPlugin.LinkCredit.LicenseText) this.drawLicenseText();
  };

  Scene_Title.prototype.drawVersionText = function() {
    var textHeight = TMPlugin.LinkCredit.VersionTextFontSize +
                     TMPlugin.LinkCredit.VersionTextOutlineWidth * 2;
    var x = TMPlugin.LinkCredit.VersionTextX;
    var y = TMPlugin.LinkCredit.VersionTextY;
    var maxWidth = Graphics.width - x;
    this._gameTitleSprite.bitmap.textColor = TMPlugin.LinkCredit.VersionTextColor;
    this._gameTitleSprite.bitmap.outlineColor = TMPlugin.LinkCredit.VersionTextOutlineColor;
    this._gameTitleSprite.bitmap.outlineWidth = TMPlugin.LinkCredit.VersionTextOutlineWidth;
    this._gameTitleSprite.bitmap.fontSize = TMPlugin.LinkCredit.VersionTextFontSize;
    this._gameTitleSprite.bitmap.drawText(TMPlugin.LinkCredit.VersionText, x, y, maxWidth,
                                          textHeight, 'left');
  };

  Scene_Title.prototype.drawLicenseText = function() {
    var textHeight = TMPlugin.LinkCredit.LicenseTextFontSize +
                     TMPlugin.LinkCredit.LicenseTextOutlineWidth * 2;
    var x = TMPlugin.LinkCredit.LicenseTextOutlineWidth;
    var y = Graphics.height - textHeight + TMPlugin.LinkCredit.LicenseTextShiftY;
    var maxWidth = Graphics.width - TMPlugin.LinkCredit.LicenseTextOutlineWidth * 2;
    this._gameTitleSprite.bitmap.textColor    = TMPlugin.LinkCredit.LicenseTextColor;
    this._gameTitleSprite.bitmap.outlineColor = TMPlugin.LinkCredit.LicenseTextOutlineColor;
    this._gameTitleSprite.bitmap.outlineWidth = TMPlugin.LinkCredit.LicenseTextOutlineWidth;
    this._gameTitleSprite.bitmap.fontSize = TMPlugin.LinkCredit.LicenseTextFontSize;
    this._gameTitleSprite.bitmap.drawText(TMPlugin.LinkCredit.LicenseText, x, y, maxWidth,
                                          textHeight, 'left');
  };

  //-----------------------------------------------------------------------------
  // Scene_Credits
  //

  function Scene_Credits() {
    this.initialize.apply(this, arguments);
  }

  Scene_Credits.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_Credits.prototype.constructor = Scene_Credits;

  Scene_Credits.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
  };

  Scene_Credits.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    if (TMPlugin.LinkCredit.UseHelpWindow) this.createHelpWindow();
    this.createCreditsWindow();
  };

  Scene_Credits.prototype.createCreditsWindow = function() {
    if (TMPlugin.LinkCredit.UseHelpWindow) {
      var wy = this._helpWindow.height;
      var wh = Graphics.boxHeight - this._helpWindow.height;
    } else {
      var wy = 0;
      var wh = Graphics.boxHeight;
    }
    this._creditsWindow = new Window_Credits(0, wy, Graphics.boxWidth, wh);
    this._creditsWindow.setHandler('ok',     this.onCreditsOk.bind(this));
    this._creditsWindow.setHandler('cancel', this.popScene.bind(this));
    if (this._helpWindow) {
      this._creditsWindow.setHelpWindow(this._helpWindow);
    }
    this.addWindow(this._creditsWindow);
  };

  Scene_Credits.prototype.onCreditsOk = function() {
    this._creditsWindow.urlOpen();
    this._creditsWindow.activate();
  };

})();
