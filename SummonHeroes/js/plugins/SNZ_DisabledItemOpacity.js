//=============================================================================
// SNZ_DisabledItemOpacity.js
//=============================================================================

/*:
 * @plugindesc いわゆる「グレー表示」の不透明度を変えます。
 *
 * @author しんぞ
 * @param opacity
 * @desc グレー表示の際の不透明度（0-255）初期設定160
 * @default 80
 *
 * @help プラグイン名は「アイテム」ですが、アイテム以外の項目も不透明度を変えられます。
 * 使用転載改変ご自由にどうぞ。
 */
(function() {
    var parameters = PluginManager.parameters('SNZ_DisabledItemOpacity');
    var color = Number(parameters['opacity'] || 160);

var SNZ_Window_Base_prototype_translucentOpacity =
    Window_Base.prototype.translucentOpacity;
Window_Base.prototype.translucentOpacity = function() {
    SNZ_Window_Base_prototype_translucentOpacity.call(this);
    return color;
};
})();