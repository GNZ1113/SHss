//=============================================================================
// MPP_ScrollBar.js
//=============================================================================
// Copyright (c) 2017 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 【ver.1.1】ウィンドウにスクロールバーを追加します。
 * @author 木星ペンギン
 *
 * @help 
 * ================================
 * 制作 : 木星ペンギン
 * URL : http://woodpenguin.blog.fc2.com/
 * 
 * @param Veiw Type
 * @desc 表示タイプ(0:常時, 1:スクロール時のみ)
 * @default 1
 * 
 * @param Scroll Bar Color
 * @desc スクロールバーの色
 * @default 160,160,160
 * 
 * @param Scroll Bar Width
 * @desc スクロールバーの幅
 * @default 6
 * 
 * @param UpDown Padding
 * @desc スクロールバー上下の余白
 * @default 18
 * 
 * @param Right Padding
 * @desc スクロールバー右の余白
 * @default 5
 * 
 * 
 * 
 */

(function () {

var MPPlugin = { params: PluginManager.parameters('MPP_ScrollBar') };

MPPlugin.VeiwType = Number(MPPlugin.params['Veiw Type'] || 0);
MPPlugin.ScrollBarColor = 'rgb(%1)'.format(MPPlugin.params['Scroll Bar Color'] || '160,160,160');
MPPlugin.ScrollBarWidth = Number(MPPlugin.params['Scroll Bar Width'] || 6);
MPPlugin.UpDownPadding = Number(MPPlugin.params['UpDown Padding'] || 18);
MPPlugin.RightPadding = Number(MPPlugin.params['Right Padding'] || 5);

var Alias = {};

//-----------------------------------------------------------------------------
// Window_Selectable

if (Window_Selectable.prototype.hasOwnProperty('updateTransform')) {
    Alias.WiSe_updateTransform =Window_Selectable.prototype.updateTransform;
}
Window_Selectable.prototype.updateTransform = function () {
    this._updateScrollBar();
    if (Alias.WiSe_updateTransform) {
        Alias.WiSe_updateTransform.call(this);
    } else {
        Window_Base.prototype.updateTransform.call(this);
    }
};

if (Window_Selectable.prototype.hasOwnProperty('_refreshAllParts')) {
    Alias.WiSe__refreshAllParts = Window_Selectable.prototype._refreshAllParts;
}
Window_Selectable.prototype._refreshAllParts = function () {
    this._refreshScrollBar();
    if (Alias.WiSe__refreshAllParts) {
        Alias.WiSe__refreshAllParts.call(this);
    } else {
        Window_Base.prototype._refreshAllParts.call(this);
    }
};

Window_Selectable.prototype._refreshScrollBar = function () {
    var maxRow = this.maxRows();
    var maxPageRows = this.maxPageRows();
    if (maxRow > maxPageRows) {
        if (!this._scrollBarSprite) {
            this._scrollBarSprite = new Sprite();
            this._scrollBarSprite.opacity = 0;
            this.addChild(this._scrollBarSprite);
        }
        this._scrollBarSprite.visible = true;
        var height = this.height - MPPlugin.UpDownPadding * 2;
        var barHeight = Math.ceil(height * maxPageRows / maxRow);
        var bitmap = new Bitmap(MPPlugin.ScrollBarWidth, barHeight);
        bitmap.fillAll(MPPlugin.ScrollBarColor);
        this._scrollBarSprite.bitmap = bitmap;
    } else if (this._scrollBarSprite) {
        this._scrollBarSprite.visible = false;
    }
};

Window_Selectable.prototype._updateScrollBar = function () {
    if (this._scrollBarSprite) {
        var barX = this.width - MPPlugin.RightPadding - MPPlugin.ScrollBarWidth;
        var topY = this._scrollY + this.origin.y;
        var maxHeight = this.maxRows() * this.itemHeight();
        var height = this.height - MPPlugin.UpDownPadding * 2;
        var barY = Math.floor(height * topY / maxHeight) + MPPlugin.UpDownPadding;
        this._scrollBarSprite.x = barX;
        this._scrollBarSprite.y = barY;
        if (this._lastOy !== this.origin.y) {
            this._lastOy = this.origin.y;
            this._showScrollBar = true;
        }
        if (this.isScrollBarActive()) {
            this._scrollBarSprite.opacity += 32;
            if (this._scrollBarSprite.opacity === 255) {
                this._showScrollBar = false;
            }
        } else {
            this._scrollBarSprite.opacity -= 4;
            this._showScrollBar = false;
        }
    }
};

Window_Selectable.prototype.isScrollBarActive = function() {
    return (this.active && (MPPlugin.VeiwType === 0 || this._showScrollBar));
};

if (Window_Selectable.prototype.hasOwnProperty('createContents')) {
    Alias.WiSe_createContents = Window_Selectable.prototype.createContents;
}
Window_Selectable.prototype.createContents = function() {
    if (Alias.WiSe_createContents) {
        Alias.WiSe_createContents.call(this);
    } else {
        Window_Base.prototype.createContents.call(this);
    }
    this._refreshScrollBar();
};

//110
Alias.WiSe_setTopRow = Window_Selectable.prototype.setTopRow;
Window_Selectable.prototype.setTopRow = function(row) {
    Alias.WiSe_setTopRow.call(this, row);
    this._showScrollBar = true;
};



})();
