//=============================================================================
// Liquid Engine - Enemy Enmity
// Liquid_EnemyEnmity.js
//=============================================================================
var Imported = Imported || {};
Imported.Liquid_EnemyEnmity = true;
 
var Liquid = Liquid || {};
Liquid.Enmity = Liquid.Enmity || {};
 
//=============================================================================
/*:
 * @plugindesc v1.2 (Requires YEP_BattleEngineCore.js and YEP_BattleCoreAI.js) Basic functions are
 * added to the Battle Engine and AI Engine to support Enemy Enmity and MMO styled aggro.
 * 
 * @author Liquidize
 *
 *
 * @param Max Enmity
 * @desc The maximum value enmity can reach?
 * @default 50000
 * 
 * @param Allow Negative
 * @desc Allow Enmity to go into negative values? If false enmity will not change if the end result is below 0, unless enmity is above 0 in which case enmity becomes 0.
 * @default false
 *
 * @param Default Enmity
 * @desc Amount of enmity each battler starts with against all targets, at the begining of a battle.
 * @default 50
 * 
 * @param Window X
 * @default (Graphics.boxWidth / 2) - 150
 * @desc The x position of the enmity window.
 * 
 * @param Window Y
 * @default (Graphics.boxHeight /2) + 70
 * @desc The y position of the enmity window.
 * 
 * @param Face Icon Width
 * @default 48
 * @desc The width in pixels of your face icons.
 * 
 * @param Face Icon Height
 * @default 48
 * @desc The height in pixels of your face icons.
 * 
 * @param Icon Sheet
 * @default faceicons
 * @desc The icon sheet containing your face icons.
 * 
 * @param Show Window
 * @default true
 * @desc Should the enmity window be shown? True = yes, False = no.
 * 
 * @param Always Show Window
 * @default false
 * @desc Should the window only be shown during selection of enemies (false), or always (true)?
 * 
 * @help
 * v1.0 (Requires YEP_BattleEngineCore.js and YEP_BattleCoreAI.js) Basic functions are
 * added to the Battle Engine and AI Engine to support Enemny Enmity and MMO styled aggro.
 * Special thanks to Yanfly for creating an awesome Battle and AI plugin system!
 * 
 * 
 * USAGE
 *=================================================================================
 * ENMITY Increase/Decreasing:
 * Skills are able to add or decrease the amount of enmity an user has against a 
 * target, in the same fashion you change HP,MP or TP. See below.
 * 
 * ENMITY +X: target
 * ENMITY -X: target
 * ENMITY +X%: target
 * ENMITY -X%: target
 * ENMITY +VARIABLE X: target
 * ENMITY -VARIABLE X: target
 * ENMITY +VARIABLE X%: target
 * ENMITY -VARIABLE X%: target
 * ------------------------------------------------------------------------------
 * Target(s) gains Enmity towards the user equal to X values. Percentages can be used, 
 * but it is based off the MaxEnmity property. 
 * -------------------------------------------------------------------------------
 * Usage Example: enmity +5000: user
 *                enmity -variable 50: target
 *                enmity +10%: target
 *                enmity -variable 10: user
 * ===============================================================================
 * Item,Actor,Class,State Tags:
 * Items,Actors,Classes,and States are capable of having some tags as well. These
 * tags are as follows.
 * 
 * <Null Enmity Gain> - If an actor,class,or state has this tag, the target(s) are
 * unable to gain enmity against this attacker.
 * 
 * <Enmity Rate: +/-x> - If an actor,class,state,weapon,or armor has this tag the
 * rating of enmity gained against the battler with said thing will be increased or
 * decreased by the corresponding value + 1.0 (the base rating)
 * 
 * Example:
 * <Enmity Rate: +1.58> - Will give the battler an enmity rating of 2.58. 
 * 
 * <Bonus Enmity: +/-x> - If an actor,class,state,weapon,or armor has this tag
 * the amount of enmity added on after calculating enmity gain is value x.
 * 
 * Example:
 * <Bonus Enmity: +50> - Will give the target 50 additional enmity against the attacker.
 * 
 * ===============================================================================
 * Enmity in Battle CoreAI
 * Using enmity to actually target things in battle core ai, is the same as using
 * any other parameter to target something.
 * 
 *      Highest Enmity       Selects the target with the highest enmity against the battler.
 *      Lowest Enmity        Selects the target with the lowest enmity against the battler.
 *------------------------------------------------------------------------------ 
 * Usage Example: 
 *                State !== Courage: Cowardice, Lowest Enmity
 * 
 * =============================================================================
 * Face Icons
 * Using the Emnity Window Face Icon system is fairly simple. First put an icon
 * sheet in your img/system folder, and call it whatever you want. It has to be
 * a png though. Following that, go into the parameters, and change the value of
 * the Icon Sheet parameter to the name of your file (excluding the .png part).
 * After that, depending on the size of the icons in your icon sheet you may need
 * to change the Face Icon Width and Face Icon Height parameters. Then in the actors
 * database, add a <battleIcon:x> notetag to the notes field. The x value of this
 * notetag is the ID in the icon sheet of the icon you want to use for the face.
 * The ID can be found by starting in the top left corner of your icon sheet,
 * whatever icon is the first in the top left that is ID 0, the icon to the right
 * is ID 1, the ID to the right of 1 is 2. Following that pattern till you get to
 * the edge of the top right corner and go down a row. So for example if
 * your iconsheet is 480x480 and your icons are 48x48 pixels each, there will be
 * 10 icons per row, starting with 0 (top left corner) and below 0 is 10.
 * This logic only works if your icon sheet is 10x the size of your icons individaul
 * width though. But simply remember, the top left icon in the icon sheet will always
 * be 0. Then depending on the size of your icon sheet, go from there.
 * 
 * =============================================================================
 * Plugin Commands
 * To change the faceicon dynamically, through an event use the following plugin
 * command.
 * 
 * EnmityFace actorid faceid
 * 
 * Where actorid is the id of the actor in the database, and faceid is the id of the
 * faceicon you want to use in the icon sheet.
 * 
 * =============================================================================
 * Change Log:
 *            1.2: - Fixed a bug that caused negative enmity to not apply.
 *                 - Added the ability to have the Enmity Window show or hide.
 *                 - Added the ability to have the Enmity Window 'always' show.
 *            1.12:
 *                 - Reverted a fix I attempted to not require overwriting Yanfly
 *                   AI manager functions.
 *            1.1: - Added Enmity Window (Shows who has the most enmity against
 *                  the selected target Most->Least (left to right)).
 *                 - Changed how enmity is stored.
 *                 - Added new enmity tags.
 *                 - No longer directly overwrites Yanflys functions.
 *                 - Added plugin command to change battler face icon dynamically.
 *            1.0: Finished script.
 *           
 *============================================================================== 
 */
//==============================================================================
 
// Check if required plugins have been imported.
if (Imported.YEP_BattleAICore && Imported.YEP_BattleEngineCore) {
 
    // EnmityWindow object, located in this namespace.
    Liquid.Enmity.EnmityWindow = null;
    
    //==============================================================================
    // Parameters
    //==============================================================================
    Liquid.Parameters = PluginManager.parameters('Liquid_EnemyEnmity');
    Liquid.Param = Liquid.Param || {};
 
    Liquid.Param.MaxEnmity = Number(Liquid.Parameters['Max Enmity']);
    Liquid.Param.AllowNegativeEmn = Liquid.Parameters['Allow Negative'];
    Liquid.Param.DefaultEnmity = Number(Liquid.Parameters['Default Enmity']);
    Liquid.Param.WindowX = String(Liquid.Parameters['Window X']);
    Liquid.Param.WindowY = String(Liquid.Parameters['Window Y']);
    Liquid.Param.FaceIconWidth = Number(Liquid.Parameters['Face Icon Width']);
    Liquid.Param.FaceIconHeight = Number(Liquid.Parameters['Face Icon Height']);
    Liquid.Param.IconSheet = String(Liquid.Parameters['Icon Sheet']);
    Liquid.Param.ShowEnmityWindow = String(Liquid.Parameters['Show Window']);
    Liquid.Param.AlwaysShowWindow = String(Liquid.Parameters['Always Show Window']);
    //==================================================================================
    // Database Manager
    //==================================================================================
    
    Liquid.Enmity.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
 
    DataManager.isDatabaseLoaded = function () {
        if (!Liquid.Enmity.DataManager_isDatabaseLoaded.call(this)) return false;
        this.processEnmityNotetags($dataStates);
        this.processEnmityNotetags($dataClasses);
        this.processEnmityNotetags($dataWeapons);
        this.processEnmityNotetags($dataArmors);
        this.processEnmityNotetags($dataEnemies);
        this.processEnmityNotetags($dataActors);
        return true;
    };
 
    DataManager.processEnmityNotetags = function (group) {
        var enmratenote = /<(?:ENMITY RATE|enm rate):[ ]([-+]?[0-9]*\.?[0-9]+)>/i;
        var bonusenmnote = /<(?:BONUS ENMITY|bonus enm):[ ](\d+)>/i;
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);
 
            obj.enmityRate = 0.0;
            obj.bonusEnmity = 0;
            obj.nullEnmity = false;
 
            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(enmratenote)) {
                    obj.enmityRate = parseFloat(RegExp.$1);
                } else if (line.match(bonusenmnote)) {
                    obj.bonusEnmity = parseInt(RegExp.$1);
                } else if (line.match(/<(?:Null Enmity Gain)>/i)) {
                    obj.nullEnmity = true;
                }
            }
        }
    };
 
    //==============================================================================
    // Battle Manager - Yanfly Battle Engine Integration
    //==============================================================================
    
    // Store original functions that we plan to manipulate.
    Liquid.Enmity.BattleManager_processActionSequence = BattleManager.processActionSequence;
    Liquid.Enmity.BattleManager_setup = BattleManager.setup;
    Liquid.Enmity.BattleManager_processVictory = BattleManager.processVictory;
    Liquid.Enmity.BattleManager_processEscape = BattleManager.processEscape;
    Liquid.Enmity.BattleManager_processAbort = BattleManager.processAbort;
    Liquid.Enmity.BattleManager_processDefeat = BattleManager.processDefeat;
    
    // For defeat,abort,victory, and escape. We reset the enmity table.
    BattleManager.processDefeat = function () {
        $gameParty.removeEnmity();
        Liquid.Enmity.BattleManager_processDefeat.call(this);
    };
 
 
    BattleManager.processAbort = function () {
        $gameParty.removeEnmity();
        Liquid.Enmity.BattleManager_processAbort.call(this);
    };
 
    BattleManager.processEscape = function () {
        $gameParty.removeEnmity();
        Liquid.Enmity.BattleManager_processEscape.call(this);
    };
 
    BattleManager.processVictory = function () {
        $gameParty.removeEnmity();
        Liquid.Enmity.BattleManager_processVictory.call(this);
    };
    Liquid.Enmity.BattleManager_startTurn = BattleManager.processTurn;
 
    BattleManager.processTurn = function () {
        if (Liquid.Enmity.EnmityWindow && eval(Liquid.Param.AlwaysShowWindow)) {
            Liquid.Enmity.EnmityWindow.refresh(this._subject);
        }
        Liquid.Enmity.BattleManager_startTurn.call(this);
    };
    
    // When the battle starts, setup default enmity table.
    BattleManager.setup = function (troopId, canEscape, canLose) {
 
        Liquid.Enmity.BattleManager_setup.call(this, troopId, canEscape, canLose);
 
        var party = $gameParty.members();
        var troop = $gameTroop.members();
        
        // Build base/default enmity table for all Game_Enemies in the Troop.
        for (var i = 0; i < troop.length; i++) {
            troop[i]._enmitytable = [];
            // Build Base Enmity table against all actors in $gameParty.
            for (var a = 0; a < party.length; a++) {
                var enmityObj = { "enmity": Liquid.Param.DefaultEnmity, "battler": party[a] };
                troop[i]._enmitytable[party[a].index()] = enmityObj;
            }
        }
        // Build base enmity for all Game_Actors in Party.
        for (var i = 0; i < party.length; i++) {
            party[i]._enmitytable = [];
            // Build base enmity for all game enemies in troop.
            for (var e = 0; e < troop.length; e++) {
                var enmityObj = { "enmity": Liquid.Param.DefaultEnmity, "battler": troop[e] };
                party[i]._enmitytable[troop[e].index()] = enmityObj;
            }
        }
    };
 
    // Process action sequences. Modifying Enmity if needed, as determined
    // by the Yanfly Battle Engine Melody.
    BattleManager.processActionSequence = function (actionName, actionArgs) {
        // ENMITY +/- VALUE
        if (actionName.match(/ENMITY[ ](.*)/i)) {
            return this.actionEnmityModify(actionName, actionArgs);
        }
        return Liquid.Enmity.BattleManager_processActionSequence.call(this,
            actionName, actionArgs);
    };
 
    // Actually modify the enmity targets.
    BattleManager.actionEnmityModify = function (actionName, actionArgs) {
        var targets = this.makeActionTargets(actionArgs[0]);
        if (targets.length < 1) return false;
        var change;
        var percent;
        if (actionName.match(/ENMITY[ ]([+-])(?:VARIABLE|VAR)[ ](\d+)/i)) {
            change = parseInt($gameVariables.value(parseInt(RegExp.$2)));
            if (String(RegExp.$1) === '-') change *= -1;
            percent = false;
        } else if (actionName.match(/ENMITY[ ]([+-])(?:VARIABLE|VAR)[ ](\d+)([%ï¼…])/i)) {
            change = parseInt($gameVariables.value(parseInt(RegExp.$2)));
            if (String(RegExp.$1) === '-') change *= -1;
            percent = true;
        } else if (actionName.match(/ENMITY[ ]([\+\-]\d+)([%ï¼…])/i)) {
            change = parseInt(RegExp.$1);
            percent = true;
        } else if (actionName.match(/ENMITY[ ]([\+\-]\d+)/i)) {
            change = parseInt(RegExp.$1);
            percent = false;
        } else {
            return false;
        }
        var value;
        targets.forEach(function (target) {
            target.clearResult();
            value = percent ? ((change / 100) * target.getEnmity(this._subject)) : change;
            target.gainEnmity(this._subject, value);
        }, this);
        return true;
    };
 
 
    //==============================================================================
    // AIManager - Yanfly Battle AI Core Integration
    //==============================================================================
 
    // store a copy of the original AIManager Functions.
    Liquid.Enmity.AIManager_setProperTarget = AIManager.setProperTarget;
    Liquid.Enmity.AIManager_getParamId = AIManager.getParamId;
 
 
    
 
    // Overwrites Yanflys AIManager.getParamId() to include Enmity.
    AIManager.getParamId = function (string) {
        Liquid.Enmity.AIManager_getParamId.call(this, string);
        string = string.toUpperCase()
        switch (string) {
            case 'MAXHP':
            case 'MAX HP':
                return 0;
                break;
            case 'MAXMP':
            case 'MAX MP':
            case 'MAXSP':
            case 'MAX SP':
                return 1;
                break;
            case 'ATK':
            case 'STR':
                return 2;
                break;
            case 'DEF':
                return 3;
                break;
            case 'MAT':
            case 'INT':
            case 'SPI':
                return 4;
                break;
            case 'MDF':
            case 'RES':
                return 5;
                break;
            case 'AGI':
            case 'SPD':
                return 6;
                break;
            case 'LUK':
                return 7;
                break;
            case 'HP':
                return 8;
                break;
            case 'MP':
            case 'SP':
                return 9;
                break;
            case 'HP%':
                return 10;
                break;
            case 'MP%':
            case 'SP%':
                return 11;
                break;
            case 'LEVEL':
            case 'LV':
            case 'LVL':
                return 12;
                break;
            case 'ENMITY':
            case 'ENM':
            case 'EN':
                return 13;
                break;
        }
        return -1;
    };
 
    // Overwrites Yanflys AIManager.setProperTarget() function to include enmity.
    AIManager.setProperTarget = function (group) {
        Liquid.Enmity.AIManager_setProperTarget.call(this, group);
        var action = this.action();
        var randomTarget = group[Math.floor(Math.random() * group.length)];
        if (group.length <= 0) return action.setTarget(randomTarget.index());
        var line = this._aiTarget.toUpperCase();
        if (line.match(/HIGHEST[ ](.*)/i)) {
            var param = this.getParamId(String(RegExp.$1));
            if (param < 0) return action.setTarget(randomTarget.index());
            if (param === 8) return this.setHighestHpFlatTarget(group);
            if (param === 9) return this.setHighestMpFlatTarget(group);
            if (param === 10) return this.setHighestHpRateTarget(group);
            if (param === 11) return this.setHighestMpRateTarget(group);
            if (param === 12) return this.setHighestLevelTarget(group);
            if (param === 13) return this.setHighestEnmityTarget(group);
            if (param > 13) return action.setTarget(randomTarget.index());
            this.setHighestParamTarget(group, param);
        } else if (line.match(/LOWEST[ ](.*)/i)) {
            var param = this.getParamId(String(RegExp.$1));
            if (param < 0) return action.setTarget(randomTarget.index());
            if (param === 8) return this.setLowestHpFlatTarget(group);
            if (param === 9) return this.setLowestMpFlatTarget(group);
            if (param === 10) return this.setLowestHpRateTarget(group);
            if (param === 11) return this.setLowestMpRateTarget(group);
            if (param === 12) return this.setLowestLevelTarget(group);
            if (param === 13) return this.setLowestEnmityTarget(group);
            if (param > 13) return action.setTarget(randomTarget.index());
            this.setHighestParamTarget(group, param);
        } else {
            this.setRandomTarget(group);
        }
    };
 
    // Pick the target with the highest enmity against this battler.
    AIManager.setHighestEnmityTarget = function (group) {
        var maintarget = group[Math.floor(Math.random() * group.length)];
        var subject = this.battler();
 
        for (var i = 0; i < group.length; ++i) {
            var target = group[i];
            if (subject.getEnmity(target) > subject.getEnmity(maintarget)) {
                maintarget = target;
            }
        }
        this.action().setTarget(maintarget.index())
    };
 
    // Pick the target with the lowest enmity against this target.
    AIManager.setLowestEnmityTarget = function (group) {
        var maintarget = group[Math.floor(Math.random() * group.length)];
        var subject = this.battler();
 
        for (var i = 0; i < group.length; ++i) {
            var target = group[i];
            if (subject.getEnmity(target) < subject.getEnmity(maintarget)) {
                maintarget = target;
            }
        }
        this.action().setTarget(maintarget.index())
    };
 
    //================================================================================
    // Game_Party
    //================================================================================
    Game_Party.prototype.removeEnmity = function () {
        this.members().forEach(function (actor) {
            actor._enmitytable = [];
        });
    };
 
    //================================================================================
    // Game_Actor - adds icon property.
    //================================================================================
  
    Liquid.Enmity.Game_Actor_initMembers = Game_Actor.prototype.initMembers;
 
    Game_Actor.prototype.initMembers = function () {
        Liquid.Enmity.Game_Actor_initMembers.call(this);
        this._battleicon = 0;
    };
 
    Game_Actor.prototype.battleIcon = function () {
 
        if (this._battleicon > 0) {
            return this._battleicon;
        }
 
        if (this.actor().meta.battleIcon) {
            return Number(this.actor().meta.battleIcon);
        }
 
        return 0;
 
    }
 
    //================================================================================
    // Game_Battler - adds a enmitytable property, and methods to change it.
    //================================================================================
 
    Liquid.Enmity.Game_Battler_initMembers = Game_Battler.prototype.initMembers;
    
    // Initialize the Game_Battler, and gives it the enmitytable value.
    Game_Battler.prototype.initMembers = function () {
        Liquid.Enmity.Game_Battler_initMembers.call(this);
        this._enmitytable = [];
    };
 
    // Exposes the enmity table publically.
    Object.defineProperty(Game_Battler.prototype, 'enmitytable', {
        get: function () {
            return this._enmitytable;
        },
        configurable: true
    });
 
    // Gets whether or not this Game_Battler can nullify all enmity gain.
    // it only takes a single Null Enmity tag to nullify all enmity gain
    Game_Battler.prototype.getNullEnmityStatus = function () {
        if (this.isActor()) {
            if ($dataActors[this._actorId].nullEnmity) return true;
            for (var i = 0; i < this._equips.length; i++) {
                if (this._equips[i].itemId()) {
                    if (this._equips[i].isWeapon()) {
                        if ($dataWeapons[this._equips[i].itemId()].nullEnmity) return true;
                    }
                    else {
                        if ($dataArmors[this._equips[i].itemId()].nullEnmity) return true;
                    }
                }
            }
            if ($dataClasses[this._classId].nullEnmity) return true;
        }
        else {
            if ($dataEnemies[this._enemyId].nullEnmity) return true;
        }
 
        for (var i = 0, l = this._states.length; i < l; i++) {
            if ($dataStates[this._states[i]].nullEnmity) return true;
        }
        return false;
 
    };
 
    // Gets the effective enmity bonus for this battler
    // from all enmity bonus tags. A base enmity bonus of 0
    // is returned (no additional enmity gain from tags)
    // if no tags are found.
    Game_Battler.prototype.getEffectiveEnmityBonus = function () {
        var bonus = 0;
 
        if (this.isActor()) {
            bonus += $dataActors[this._actorId].bonusEnmity;
            for (var i = 0; i < this._equips.length; i++) {
                if (this._equips[i].itemId()) {
                    if (this._equips[i].isWeapon()) {
                        bonus += $dataWeapons[this._equips[i].itemId()].bonusEnmity;
                    }
                    else {
                        bonus += $dataArmors[this._equips[i].itemId()].bonusEnmity;
 
                    }
                }
            }
            bonus += $dataClasses[this._classId].bonusEnmity;
        }
        else {
 
            bonus += $dataEnemies[this._enemyId].bonusEnmity;
        }
 
        for (var i = 0, l = this._states.length; i < l; i++) {
 
            bonus += $dataStates[this._states[i]].bonusEnmity;
        }
        return bonus;
    };
 
    // Get the effective (total) enmity rating bonus from
    // all Enmity Rating tags, that this battler could have
    // if no additional tags are found, all battles have a rating of 1.0
    // (100% base) enmity gain.
    Game_Battler.prototype.getEffectiveEnmityRating = function () {
        var rating = 1.0;
 
        if (this.isActor()) {
            rating += $dataActors[this._actorId].enmityRate;
            for (var i = 0; i < this._equips.length; i++) {
                if (this._equips[i].itemId()) {
                    if (this._equips[i].isWeapon()) {
                        rating += $dataWeapons[this._equips[i].itemId()].enmityRate;
                    }
                    else {
                        rating += $dataArmors[this._equips[i].itemId()].enmityRate;
                    }
                }
            }
            rating += $dataClasses[this._classId].enmityRate;
        }
        else {
            rating += $dataEnemies[this._enemyId].enmityRate;
        }
 
        for (var i = 0, l = this._states.length; i < l; i++) {
            rating += $dataStates[this._states[i]].enmityRate;
        }
        return rating;
    };
 
    // Gives this Game_Battle enmity, the attacker argument is the attacker (subject of the action). 
    // the value is the amount to change by.
    Game_Battler.prototype.gainEnmity = function (attacker, value) {
        
        // You can't gain enmity against an ally, thats silly!
        if (attacker.isActor() && this.isActor()) return;
        if (attacker.isEnemy() && this.isEnemy()) return;
 
        // Prepare a new Enmity object to add to the enmity table if need be.
        var enmityObj = {};
        enmityObj.battler = attacker;
        
        // if attacker can nullify enmity gain, don't bother processing
        if (attacker.getNullEnmityStatus() == true) {
            return;
        }
 
        // rate to multiply by.
        var rate = attacker.getEffectiveEnmityRating();
        // end bonus to add.
        var bonus = attacker.getEffectiveEnmityBonus();
        // calculate final enmity gain.
        var enmity = (value * rate) + bonus;
        // supply the enmity gain value to the enmity object.
        enmityObj.enmity = enmity;
         
        // if when we add this enmity, the enmity of the attacker goes higher than max
        // just set it to max value.
        if (enmity + this.getEnmity(attacker) > Liquid.Param.MaxEnmity) {
            this._enmitytable[this.getEnmityId(attacker)].enmity = Liquid.Param.MaxEnmity;
           
            return;
        }
        
        // if we dont allow negative enmity, and this change will make the enmity of the
        // target go into the negatives, set it to 0.
        if (!eval(Liquid.Param.AllowNegativeEmn) && enmity + this.getEnmity(attacker) < 0) {
            this._enmitytable[this.getEnmityId(attacker)].enmity = 0;
            return;
        }
 
        // if the subject of this attacker doesn't exists in the enmity table, we add them
        // else we just add the new enmity change to existing enmity.
        if (typeof (this._enmitytable[this.getEnmityId(attacker)]) === 'undefined') {
            this._enmitytable[this.getEnmityId(attacker)] = enmityObj;
        } else {
            this._enmitytable[this.getEnmityId(attacker)].enmity += enmity;
           }
    };
 
    // Get the index of the attacker in the enmity table
    // we sort the table by highest to lowest so the
    // simple method of storing their index from their unit
    // as the index in the table doesn't work.
    // if the attacker isn't in the table, we just return 1 higher
    // than the max in the table.
    Game_Battler.prototype.getEnmityId = function (attacker) {
        var id = 0;
        for (var i = 0; i < this._enmitytable.length; i++) {
            id = i;
            if (this._enmitytable[i].battler.index() == attacker.index()) {
                return id;
            }
        }
        return id + 1;
    };
 
    // Gets the amount of enmity an attacker has against this battler, 
    // if it's undefined or not a number, return 0.
    Game_Battler.prototype.getEnmity = function (attacker) {
        // if the attacker is friendly, return 0.
        // you can't gain enmity against friendlies, thats
        // silly.
        if (this.isActor() && attacker.isActor()) return 0;
        if (this.isEnemy() && attacker.isEnemy()) return 0;
 
        var enmity = Number(this._enmitytable[this.getEnmityId(attacker)].enmity);
        if (Number.isNaN(enmity)) {
            return 0;
        }
        return enmity;
    };
 
    //================================================================================
    // Scene_Battle
    //================================================================================
    
    // Store the values of functions we plan to manipulate to call later.
    Liquid.Enmity.Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Liquid.Enmity.Scene_Battle_selectEnemySelection = Scene_Battle.prototype.selectEnemySelection;
    Liquid.Enmity.Scene_Battle_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
    Liquid.Enmity.Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
    
    // Overwrite the selectEnemyFunction (and then call the original)
    // to refresh the Enmity Window, and hide the battle log (it covers the window)
    Scene_Battle.prototype.selectEnemySelection = function () {
        Liquid.Enmity.Scene_Battle_selectEnemySelection.call(this);
        if (eval(Liquid.Param.ShowEnmityWindow)) {
            if (eval(Liquid.Param.AlwaysShowWindow) == false) {
                this._enmityWindow.refresh();
                this._enmityWindow.show();
                this._enmityWindow.activate();
                this._logWindow.hide();
            }
        }
    };
 
    // When we have selected an enemy, reshow the battle log
    // thus hiding the enmity window.
    Scene_Battle.prototype.onEnemyOk = function () {
        if (eval(Liquid.Param.ShowEnmityWindow)) {
            if (eval(Liquid.Param.AlwaysShowWindow) == false) {
                this._enmityWindow.hide();
             
            }
               this._logWindow.show();
        }
        Liquid.Enmity.Scene_Battle_onEnemyOk.call(this);
    };
    
    // When we cancel selection also hide the enmity window.
    Scene_Battle.prototype.onEnemyCancel = function () {
        console.info(eval(Liquid.Param.AlwaysShowWindow) == false);
        console.info(eval(Liquid.Param.AlwaysShowWindow));
        if (eval(Liquid.Param.ShowEnmityWindow)) {
            if (eval(Liquid.Param.AlwaysShowWindow) == false) {
                this._enmityWindow.hide();
               
            }
             this._logWindow.show();
        }
        Liquid.Enmity.Scene_Battle_onEnemyCancel.call(this);
    };
    
    // Overwrite the createAllWindows function, to put this window
    // below all other windows, so we don't hide any important information.
    // this also create the Enmity Window.
    Scene_Battle.prototype.createAllWindows = function () {
        if (eval(Liquid.Param.ShowEnmityWindow)) {
            this._enmityWindow = new Window_EnmityList(0, Graphics.boxHeight / 2);
            this.addWindow(this._enmityWindow);
            this._enmityWindow.x = eval(Liquid.Param.WindowX);
            this._enmityWindow.y = eval(Liquid.Param.WindowY);
            this._enmityWindow._logWindow = this._logWindow;
            Liquid.Enmity.EnmityWindow = this._enmityWindow;
        }
        Liquid.Enmity.Scene_Battle_createAllWindows.call(this);
 
        if (eval(Liquid.Param.AlwaysShowWindow) && eval(Liquid.Param.ShowEnmityWindow)) {
            
            this._enmityWindow.show();
        }
    };
    
    //================================================================================
    // Window_BattleEnemy Extensions
    //================================================================================
 
    // Store a value of the original select function, before we overwrite.
    Liquid.Enmity.Window_BattleEnemy_select = Window_BattleEnemy.prototype.select;
    
    // Call the original select method, and then execute ours.
    // this is used to update the enmity window with the new
    // enemy we are showing enmity for.
    Window_BattleEnemy.prototype.select = function (index) {
        Liquid.Enmity.Window_BattleEnemy_select.call(this, index);
        if (Liquid.Enmity.EnmityWindow) {
            Liquid.Enmity.EnmityWindow.refresh(this.enemy());
        }
    };
    
    //================================================================================
    // Window_Base Extensions
    //================================================================================
    
    // Function to draw battle face icons, store in a faceicons sprite sheet from
    // the system folder.
    Window_Base.prototype.drawBattlerFaceIcon = function (iconIndex, x, y) {
        var bitmap = ImageManager.loadSystem(Liquid.Param.IconSheet);
        var pw = Liquid.Param.FaceIconWidth; // all faces are 48px in width by default
        var ph = Liquid.Param.FaceIconHeight; // all faces are 48px in height by default
        var sx = iconIndex % 10 * pw;
        var sy = Math.floor(iconIndex / 10) * ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
    };
    
    //================================================================================
    // Enmity_Window - Window to show enmity from highest to lowest.
    //================================================================================
    
    // Window_Enmity object initializer
    function Window_EnmityList() {
        this.initialize.apply(this, arguments);
    }
    
    // Set the prototype and consturtor.
    Window_EnmityList.prototype = Object.create(Window_Base.prototype);
    Window_EnmityList.prototype.constructor = Window_EnmityList;
 
    // Initialize function
    Window_EnmityList.prototype.initialize = function (x, y) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._logWindow = null;
        this.opacity = 0;
        this.refresh($gameTroop.members()[0]);
        if (eval(Liquid.Param.AlwaysShowWindow) !== true){
        this.hide();
        }
    };
 
    Window_EnmityList.prototype.windowWidth = function () {
        return Liquid.Param.FaceIconWidth * this.maxFaces();
    };
 
 
    Window_EnmityList.prototype.windowHeight = function () {
        // We used 96, because the window "border" is 48px
        // and the face icons are 48px so if we use any lower
        // the faces don't show fully/at all.
        return Liquid.Param.FaceIconHeight * 2;
    };
 
    // When opened refresh!
    Window_EnmityList.prototype.open = function () {
        this.refresh();
    };
 
    // Max faces to show on the enmity bar.
    Window_EnmityList.prototype.maxFaces = function () {
        return 8;
    };
 
    // Refresh the enmity bar and show the faces in order of highest to lowest
    // enmity.
    Window_EnmityList.prototype.refresh = function (enemy) {
        this.contents.clear();
        if (enemy && enemy._enmitytable && enemy.isEnemy()) {
            this.drawBackground(0, 0, this.width, Liquid.Param.FaceIconHeight);
            var enmitytable = enemy._enmitytable.sort(function (a, b) { return b['enmity'] - a['enmity']; });;
            var drawX = 0;
            for (var k in enmitytable) {
                if (typeof enmitytable[k] !== 'function') {
                    if (enmitytable[k].battler.isActor()) {
                        this.drawBattlerFaceIcon(enmitytable[k].battler.battleIcon(), drawX, 0);
                        drawX += Liquid.Param.FaceIconWidth;
                    }
 
                }
            }
        }
    };
 
    // draw a dark background.
    Window_EnmityList.prototype.drawBackground = function (x, y, width, height) {
        var color1 = this.dimColor1();
        var color2 = this.dimColor2();
        this.contents.gradientFillRect(x, y, width / 2, height, color2, color1);
        this.contents.gradientFillRect(x + width / 2, y, width / 2, height, color1, color2);
    };
    
    //================================================================================
    // Command Processor
    //================================================================================
    
    var Liquid_Enmity_Game_Interpreter_pluginCommand =
 
        Game_Interpreter.prototype.pluginCommand;
 
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
 
        Liquid_Enmity_Game_Interpreter_pluginCommand.call(this, command, args);
 
        if (command === "EnmityFace") {
            if (args.length === 2) {
                if (Number.isNaN(args[0]) == false) {
                    if (Number.isNaN(args[1]) == false) {
                        $gameActors.actor(args[0])._battleicon = args[1];
                    }
                    else {
 
                        if (args[1] === 'reset') {
                            $gameActors.actor(args[0])._battleicon = 0;
                        }
                    }
                }
            }
        }
 
    };
 
        
    //================================================================================
    // End of File
    //================================================================================
};