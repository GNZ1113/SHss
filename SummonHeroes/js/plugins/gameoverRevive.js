/*:

@plugindesc
全滅した際に、いったんゲームオーバー画面を
表示させてから復活することができます 

@author
シトラス

@param returnTitleSwitch
@desc
この番号のスイッチがＯＮになっていると、
復活せずにタイトル画面に戻ります
@default 1

@param gameoverSwitch
@desc
ゲームオーバーになったとき、
この番号のスイッチをオンにします
@default 14

@param gameoverCounter
@desc
ゲームオーバーになった回数を
カウントするための変数のＩＤです
@default 1

@param respawnMapId
@desc
復活先マップのＩＤを代入するための変数です
@default 2

@param respawnX
@desc
復活先マップのX座標を代入するための変数です
@default 3

@param respawnY
@desc
復活先マップのＹ座標を代入するための変数です
@default 4

@param respawnDirection
@desc
復活した時のキャラクターの向きを代入するための変数です
@default 5

@help
このプラグインでゲームオーバーから復活した場合
パーティメンバーは全回復しています。

デスペナルティなどを実装したい場合、
イベントコマンドで行ってください

また、ゲーム開始時に復活するマップのＩＤと
座標を指定しておいてください

*/
(function(){
	Scene_Gameover.prototype.update = function() {
		var pluginName = "gameoverRevive";
		if (this.isActive() && !this.isBusy() && this.isTriggered()) {
			if($gameSwitches.value(Number(PluginManager.parameters(pluginName).returnTitleSwitch) ) ){
				this.gotoTitle();
			}else{
				//全メンバーを全回復させる
				for(var i = 0;i < $gameParty.allMembers().length;i++){
					$gameParty.allMembers()[i].recoverAll();
				}
				
				//イベント処理を中断する
				$gameMap._interpreter.clear();
				
				//全滅スイッチをＯＮにする
				$gameSwitches.setValue(Number(PluginManager.parameters(pluginName).gameoverSwitch),true);
				
				//全滅カウンターを１増やす
				var oldValue = $gameVariables.value(Number(PluginManager.parameters(pluginName).gameoverCounter) );
				$gameVariables.setValue(Number(PluginManager.parameters(pluginName).gameoverCounter),oldValue + 1);
				
				//パーティを復活ポイントに移動させる
				var respawnMapId      = $gameVariables.value(Number(PluginManager.parameters(pluginName).respawnMapId) );
				var respawnX          = $gameVariables.value(Number(PluginManager.parameters(pluginName).respawnX) );
				var respawnY          = $gameVariables.value(Number(PluginManager.parameters(pluginName).respawnY) );
				var respawnDirection  = $gameVariables.value(Number(PluginManager.parameters(pluginName).respawnDirection) );
				$gamePlayer.reserveTransfer(respawnMapId,respawnX,respawnY,respawnDirection,0);
				
				//マップシーンに戻る
				SceneManager.goto(Scene_Map);
			}
		}
		Scene_Base.prototype.update.call(this);
	};
})();