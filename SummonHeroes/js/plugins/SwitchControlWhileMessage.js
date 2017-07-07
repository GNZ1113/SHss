//=============================================================================
// SwitchControlWhileMessage.js
// ----------------------------------------------------------------------------
// <利用規約>
//  利用はRPGツクールMV/RPGMakerMVの正規ユーザーに限られます。
//  商用、非商用、ゲームの内容を問わず利用可能です。
//  ゲームへの利用の際、報告や出典元の記載等は必須ではありません。
//  二次配布や転載は禁止します。
//  ソースコードURL、ダウンロードURLへの直接リンクも禁止します。
//  不具合対応以外のサポートやリクエストは受け付けておりません。
//  スクリプト利用により生じたいかなる問題においても、一切責任を負いかねます。
// ----------------------------------------------------------------------------
//  Ver1.00  2016/02/05  初版
//=============================================================================

/*:
 * @plugindesc メッセージ表示中にスイッチの操作を実行します。
 * @author こま
 *
 * @help
 * メッセージに以下の制御文字を指定することで、メッセージ表示中にスイッチを切り換え
 * ることができます。
 *
 *  \SN[n]      # n番のスイッチをONにする
 *  \SF[n]      # n版のスイッチをOFFにする
 *
 * 使用例：あいうえお\SN[2]かきくけこ\SF[2]さしすせそ
 *
 * 上記例の場合、「かきくけこ」の「か」を表示すると同時にスイッチ2番がONになり、
 * 「こ」を表示したあとにスイッチ2番がOFFになります。
 */

(function(){
    var _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function(text) {
        text = _Window_Base_convertEscapeCharacters.call(this, text);
        text = text.replace(/\x1bSN\[(\d+)\]/gi, function() {
            return '%switch_on[' + parseInt(arguments[1]) + ']';
        }.bind(this));
        text = text.replace(/\x1bSF\[(\d+)\]/gi, function() {
            return '%switch_off[' + parseInt(arguments[1]) + ']';
        }.bind(this));
        return text;
    };

    var _Window_Base_processCharacter = Window_Base.prototype.processCharacter;
    Window_Base.prototype.processCharacter = function(textState) {
        var command = null;
        var id = 0;
        var text = textState.text.slice(textState.index).replace(/^\%(switch_on|switch_off)\[(\d+)\]/, function() {
            command = arguments[1];
            id = arguments[2];
            return '';
        }.bind(this));
        if (command) {
            switch (command) {
                case 'switch_on':
                    $gameSwitches.setValue(id, true);
                    break;
                case 'switch_off':
                    $gameSwitches.setValue(id, false);
                    break;
            }
            textState.text = textState.text.slice(0, textState.index) + text;
        }
        _Window_Base_processCharacter.call(this, textState);
    };
}());
