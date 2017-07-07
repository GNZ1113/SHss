/*:
@plugindesc
特定のスイッチがONになっているときに勝利のポーズを
とらなくすることができます。

@author
シトラス

@param notWinActionSwitchId
@desc ここで指定した番号のスイッチがONになっていると勝利ポーズをとりません
@default	1
*/
(function(){
	var notWinActionSwitchId = Number(PluginManager.parameters("notWinAction").notWinActionSwitchId);
	Game_Actor.prototype.performVictory = function() {
		if (this.canMove() && $gameSwitches.value(notWinActionSwitchId) === false) {
			this.requestMotion('victory');
		}
	};
})();
