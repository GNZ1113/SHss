//===========================================================================
// MpiSaveDataImportExport.js
//===========================================================================

/*:
 * @plugindesc セーブデータインポート・エクスポートプラグイン
 * @author 奏ねこま（おとぶき ねこま）
 *
 * @param Style Sheet File
 * @desc スタイルシートの場所を指定してください。
 * @default ./js/plugins/savedata-import-export.css
 * 
 * @param Background Image
 * @desc 背景画像のファイル名を指定してください。（拡張子は不要。背景画像ファイルはimg/systemフォルダ内に用意してください。）
 * @default
 * 
 * @param Ok Cancel Button
 * @desc 決定、キャンセルの選択ウインドウを設定します。
 * （"決定文字列", "キャンセル文字列", X座標, Y座標）
 * @default "決定", "キャンセル", 520, 510
 * 
 * @param Window-1
 * @desc 文章を表示するウインドウを設定します。
 * （"表示する文章", X座標, Y座標, 幅, 高さ）
 * @default "セーブデータのインポート・エクスポート", 0, 0, 816, 72
 * 
 * @param Window-2
 * @desc 文章を表示するウインドウを設定します。
 * （"表示する文章", X座標, Y座標, 幅, 高さ）
 * @default
 * 
 * @param Window-3
 * @desc 文章を表示するウインドウを設定します。
 * （"表示する文章", X座標, Y座標, 幅, 高さ）
 * @default
 * 
 * @param Window-4
 * @desc 文章を表示するウインドウを設定します。
 * （"表示する文章", X座標, Y座標, 幅, 高さ）
 * @default
 * 
 * @help
 * :[概要]:
 *  セーブデータのインポートとエクスポートの機能を提供します。
 *
 * :[説明]:
 *  RPGツクールMVのセーブデータ（file1.rpgsaveなど）をメモ帳などのテキストエディ
 *  タで開いてみると、中は英数字や記号の羅列になっています。本プラグインは、後述
 *  のスクリプトを実行することで、実行時点のゲーム状態をセーブデータ化したテキス
 *  トを表示したり、入力されたテキスト（セーブデータ）を元にゲームをロードする機
 *  能を提供します。
 * 
 * :[利用方法]:
 *  イベントコマンドの「スクリプト」等で、以下を実行してください。
 *  セーブデータを表示、入力する画面が表示されます。
 * 
 *   SceneManager.push(Scene_ImportExport);
 * 
 * :[テキストエリアについて]:
 *  :初期表示
 *   初期状態で表示されているのは、スクリプト実行時のゲーム状態をセーブデータ化
 *   したものです。コピーして保存したり、通常のセーブデータファイルに上書き保存
 *   することで、ロード画面から読み込んだりすることができます。
 * 
 *  :セーブデータのロード
 *   テキストエリアにセーブデータのテキストを入力し、決定キーを押すことで、その
 *   セーブデータをロードします。
 * 
 *  :位置やサイズ、文字の設定など
 *   スタイルシートで指定してください。指定方法については、本プラグインと一緒に
 *   配布している「savedata-import-export.css」を参考にしてください。なお、スタ
 *   イルシートの場所やファイル名は、プラグイン設定の「Style Sheet File」で変更
 *   できます。
 * 
 *  :制限事項
 *   テキストエリアにはキーボードによる文字入力が可能ですが、RPGツクールMVの仕様
 *   上、以下の入力はできません。
 *   ・Enterキー、Spaceキー、Zキー（決定扱いになります）
 *   ・Xキー（キャンセル扱いになります）
 *   ・右クリック（同上）
 *   ・十字キーによるテキストエリア内のカーソル移動
 * 
 *  :[決定・キャンセルボタンについて]:
 *   デフォルトでは「決定」が初期選択状態になっています。これを「キャンセル」に
 *   変更したい場合は、プラグイン設定の「Ok Cancel Button」の設定の最後に「,1」
 *   を追加してください。
 * 
 *    "決定", "キャンセル", 520, 510, 1
 * 
 *   なお、プラグイン設定の「Ok Cancel Button」が空欄の場合、決定・キャンセルの
 *   選択肢は表示されません。その場合、キーボードのみによる操作となります。
 * 
 * :[文章ウインドウについて]:
 *   プラグイン設定のWindow-1、Window-2、Window-3、Window-4に下記のような設定を
 *   することで、文章をウインドウに表示します。
 * 
 *    "表示したい文章", X座標, Y座標, 幅, 高さ
 * 
 *   "表示したい文章"は必ずダブルクォーテーションで挟んだ形で指定してください。
 *   文章の改行は「\n」と記述してください。
 * 
 * :[プラグインコマンド]:
 *  プラグインコマンドはありません。
 *
 * :[利用規約]: ................................................................
 *  - 本プラグインの利用は、RPGツクールMV/RPGMakerMVの正規ユーザーに限られます。
 *  - 商用、非商用、有償、無償、一般向け、成人向けを問わず、利用可能です。
 *  - 利用の際、連絡や報告は必要ありません。また、製作者名の記載等も不要です。
 *  - プラグインを導入した作品に同梱する形以外での再配布、転載はご遠慮ください。
 *  - 本プラグインにより生じたいかなる問題についても、一切の責任を負いかねます。
 * :[改訂履歴]: ................................................................
 *   Version 1.01  2017/04/08  セーブデータの読み込み前チェックを実装
 *                             決定・キャンセルボタンを実装
 *                             ブラウザ実行時、テキストエリアがずれる問題を修正
 *   Version 1.00  2017/04/07  First edition.
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 *  Web Site: http://makonet.sakura.ne.jp/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 *  Copylight (c) 2017 Nekoma Otobuki
 */

var Imported = Imported || {};
Imported.MpiSaveDataImportExport = true;

var Makonet = Makonet || {};
Makonet.MpiSaveDataImportExport = {};

(function (global) {
    'use strict';

    var Mpi = Makonet.MpiSaveDataImportExport;
    Mpi.product = 'MpiSaveDataImportExport';
    Mpi.parameters = PluginManager.parameters(Mpi.product);
    Mpi.modules = {};

    Mpi.css        =  Mpi.parameters['Style Sheet File'];
    Mpi.background =  Mpi.parameters['Background Image'];
    Mpi.okcancel   =  Mpi.parameters['Ok Cancel Button'];
    Mpi.windows    = [Mpi.parameters['Window-1'],
                      Mpi.parameters['Window-2'],
                      Mpi.parameters['Window-3'],
                      Mpi.parameters['Window-4']];

    var _ = Mpi.product;

    //==============================================================================
    // Scene_ImortExport
    //==============================================================================

    function Scene_ImportExport() {
        this.initialize.apply(this, arguments);
    }
    Mpi.modules.Scene_ImportExport = Scene_ImportExport;
    global.Scene_ImportExport = Scene_ImportExport;

    Scene_ImportExport.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_ImportExport.prototype.constructor = Scene_ImportExport;

    Scene_ImportExport.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_ImportExport.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createElements();
        this.createHandler();
        this.createWindows();
    };

    Scene_ImportExport.prototype.start = function () {
        Scene_MenuBase.prototype.start.call(this);
        $gameSystem.onBeforeSave();
        var json = JsonEx.stringify(DataManager.makeSaveContents());
        var data = LZString.compressToBase64(json);
        this.elements.textarea.value = data;
        this.elements.textarea.focus();
        this.elements.textarea.select();
    };

    Scene_ImportExport.prototype.createElements = function () {
        this.elements = {
            link: document.createElement('link'),
            div: document.createElement('div'),
            textarea: document.createElement('textarea')
        };

        // link element
        this.elements.link.rel = 'stylesheet';
        this.elements.link.type = 'text/css';
        this.elements.link.href = Mpi.css;
        document.head.appendChild(this.elements.link);

        // div element
        var canvas = document.getElementById('GameCanvas');
        this.elements.div.style.width = canvas.style.width;
        this.elements.div.style.height = canvas.style.height;
        this.elements.div.style.position = 'absolute';
        this.elements.div.style.left = '0px';
        this.elements.div.style.top = '0px';
        this.elements.div.style.right = '0px';
        this.elements.div.style.bottom = '0px';
        this.elements.div.style.margin = 'auto';
        document.body.appendChild(this.elements.div);

        // textarea element
        this.elements.textarea.id = 'savedata-import-export';
        this.elements.textarea.addEventListener('keydown', function (e) {
            switch (e.keyCode) {
                case 13:
                case 32:
                case 88:
                case 90:
                    e.preventDefault();
                    break;
            }
        });
        this.elements.div.appendChild(this.elements.textarea);
    };

    Scene_ImportExport.prototype.removeElements = function () {
        this.elements.div.removeChild(this.elements.textarea);
        document.body.removeChild(this.elements.div);
        document.head.removeChild(this.elements.link);
    };

    Scene_ImportExport.prototype.createHandler = function () {
        if (Mpi.okcancel) {
            var p = eval('[' + Mpi.okcancel + ']');
            this.handler = new Window_HorzCommand(p[2], p[3]);
            this.handler.maxCols = function(){ return 2 };
            this.handler.makeCommandList = function () {
                this.addCommand(p[0], 'ok');
                this.addCommand(p[1], 'cancel');
            }.bind(this.handler);
            this.handler.playOkSound = function () {
                if (this.currentSymbol() === 'cancel') SoundManager.playCancel();
            }.bind(this.handler);
            this.handler.refresh();
            this.handler.select(p[4] || 0);
        } else {
            this.handler = new Window_Selectable(0, 0, 0, 0);
            this.handler.playOkSound = function(){};
            this.handler.visible = false;
            this.handler.activate();
        }
        this.handler.setHandler('ok', this.onOk.bind(this));
        this.handler.setHandler('cancel', this.onCancel.bind(this));
        this.addWindow(this.handler);
    };

    Scene_ImportExport.prototype.createBackground = function () {
        Scene_MenuBase.prototype.createBackground.call(this);
        if (Mpi.background) {
            this.background = new Sprite(ImageManager.loadSystem(Mpi.background));
            this.addChild(this.background);
        }
    };

    Scene_ImportExport.prototype.createWindows = function () {
        Mpi.windows.forEach(function (win) {
            if (win) {
                var p = eval('[' + win + ']');
                var w = new Window_Base(p[1], p[2], p[3], p[4]);
                w.drawTextEx(p[0], 0, 0);
                this.addWindow(w);
            }
        }, this);
    };

    Scene_ImportExport.prototype.onOk = function () {
        try {
            var data = this.elements.textarea.value;
            var json = LZString.decompressFromBase64(data);
            var contents = JsonEx.parse(json);
            if (this.checkSaveContents(contents)) {
                DataManager.createGameObjects();
                DataManager.extractSaveContents(contents);
            } else {
                this.handler.activate();
                SoundManager.playBuzzer();
                return;
            }
        } catch (e) {
            this.handler.activate();
            SoundManager.playBuzzer();
            return;
        }
        this.removeElements();
        this.fadeOutAll();
        this.reloadMapIfUpdated();
        SceneManager.goto(Scene_Map);
        SoundManager.playOk();
    };

    Scene_ImportExport.prototype.onCancel = function () {
        this.removeElements();
        this.popScene();
    };

    Scene_ImportExport.prototype.checkSaveContents = function (contents) {
        return !!contents.system &&
               !!contents.screen &&
               !!contents.timer &&
               !!contents.switches &&
               !!contents.variables &&
               !!contents.selfSwitches &&
               !!contents.actors &&
               !!contents.party &&
               !!contents.map &&
               !!contents.player;
    };

    // diverted from Scene_Load.
    Scene_ImportExport.prototype.reloadMapIfUpdated = function () {
        if ($gameSystem.versionId() !== $dataSystem.versionId) {
            $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
            $gamePlayer.requestMapReload();
        }
    };
}(this));
