//===========================================================================
// MPI_QuickPlayAudio.js
//===========================================================================

/*:
 * @plugindesc 一部実行条件下において音声再生が遅い問題を解消します。
 * @author 奏ねこま（おとぶき ねこま）
 *
 * @param RPGアツマールモード対象URL
 * @desc RPGアツマール用の動作モードで実行するURLを指定してください。（部分指定、およびカンマ区切りで複数指定可）
 * @default
 *
 * @param プラグイン適用対象外URL
 * @desc 本プラグインの動作を無効にするURLを指定してください。（部分指定、およびカンマ区切りで複数指定可）
 * @default
 *
 * @param プラグイン適用対象外UserAgent
 * @desc 本プラグインの動作を無効にするUserAgentを指定してください。（部分指定、およびカンマ区切りで複数指定可）
 * @default
 *
 * @help
 * [ 概要 ] ...
 *  RPGアツマールにて配布されている「dwango_ForceWebAudio.js」プラグインを適用し
 *  たRPGツクールMVを、Android端末＋Chromeブラウザという条件で実行した際に発生す
 *  る「音声再生開始の大きな遅れ」を、ある程度改善します。PCのWebブラウザ上での
 *  実行においても、多少の改善効果が期待できます。
 *
 * [ 使用方法 ] ...
 *  本プラグインを適用するだけで効果を発揮します。
 *
 * [ プラグインパラメータ ] ...
 * ・RPGアツマールモード対象URL
 *   このパラメータに、ツクールMVを実行するURLの一部を設定することで、そのURLで
 *   ツクールMVが実行されたときは、RPGアツマールモード（後述）で動作します。
 *   ※RPGアツマールのURLは設定する必要はありません。
 *
 *   <設定例>
 *    google.co.jp
 *    google.co.jp,yahoo.co.jp
 *   
 * ・プラグイン適用対象外URL
 *   このパラメータに、ツクールMVを実行するURLの一部を設定することで、そのURLで
 *   ツクールMVが実行されたときは、本プラグインが機能しないようにします。
 *   
 *   <設定例>
 *    google.co.jp
 *    google.co.jp,yahoo.co.jp
 *   
 * ・プラグイン適用対象外UserAgent
 *   このパラメータに、ツクールMVが実行されるブラウザや端末のUserAgentの一部を設
 *   定することで、そのブラウザや端末でツクールMVが実行されたときは、本プラグイ
 *   ンが機能しないようにします。
 *   ※iOS端末は、パラメータ設定の有無に関わらず対象外です。
 *   
 *   <設定例>
 *    Chrome
 *    Chrome,Opera
 *   
 * [ RPGアツマールモード ] ...
 *  本プラグインは、RPGアツマール上で動作する場合、内部で実行される処理が、デフ
 *  ォルトの動作とは異なります。この状態を、便宜上「RPGアツマールモード」と呼び
 *  ます。RPGアツマール以外の場所、主にゲーム投稿サイトで本プラグインを使用した
 *  場合に、本プラグインに発生したときは、RPGアツマールモードにすることで解決す
 *  る可能性があります。RPGアツマールモードで動作させたい場合は、プラグインパラ
 *  メータの「RPGアツマールモード対象URL」に、URLの一部を設定してください。
 *  （RPGアツマールモードでも動作しない場合は、適用対象外としてください。）
 *
 * [ 制限事項 ] ...
 *  以下の条件では、本プラグインは動作しません。
 *  （機能が有効にならないだけであり、ゲーム実行自体には問題ありません。）
 *
 *  ・Game.exeからのローカル実行
 *  ・iOS端末（iPhone/iPad/iPod）での実行
 *
 * [ プラグインコマンド ] ...
 *  プラグインコマンドはありません。
 *
 * [ 利用規約 ] ................................................................
 *  ・本プラグインの利用は、RPGツクールMV/RPGMakerMVの正規ユーザーに限られます。
 *  ・商用、非商用、有償、無償、一般向け、成人向けを問わず、利用可能です。
 *  ・利用の際、連絡や報告は必要ありません。また、製作者名の記載等も不要です。
 *  ・プラグインを導入した作品に同梱する形以外での再配布、転載はご遠慮ください。
 *  ・不具合対応以外のサポートやリクエストは、基本的に受け付けておりません。
 *  ・本プラグインにより生じたいかなる問題についても、一切の責任を負いかねます。
 * [ 改訂履歴 ] ................................................................
 *   Version 1.00  2016/12/10  First edition.
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 *  Web Site: http://makonet.sakura.ne.jp/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 *  Copylight (c) 2016 Nekoma Otobuki
 */

var Imported = Imported || {};
Imported.MPI_QuickPlayAudio = true;

var Makonet = Makonet || {};
Makonet.QPA = {};

(function(){
    'use strict';

    var QPA               = Makonet.QPA;
    QPA.product           = 'MPI_QuickPlayAudio';
    QPA.parameters        = PluginManager.parameters(QPA.product);
    QPA.atsumaru_mode_url = QPA.parameters['RPGアツマールモード対象URL'].trim().split(/ *, */);
    QPA.not_apply_url     = QPA.parameters['プラグイン適用対象外URL'].trim().split(/ *, */);
    QPA.not_apply_agent   = QPA.parameters['プラグイン適用対象外UserAgent'].trim().split(/ *, */);

    if (Utils.isNwjs()) return;

    var url = QPA.not_apply_url.join('|');
    if (url && window.location.href.match(url)) return;

    QPA.not_apply_agent.push('iPhone', 'iPad', 'iPod');
    var agent = QPA.not_apply_agent.join('|');
    if (agent && navigator.userAgent.match(agent)) return;
    
    QPA.atsumaru_mode_url.push('html5.nicogame.jp');
    url = QPA.atsumaru_mode_url.join('|');
    var isAtsumaruMode = url && window.location.href.match(url);

    var $_ = QPA.product;

    //==============================================================================
    // AudioManager
    //==============================================================================
    
    AudioManager.shouldUseHtml5Audio = function() {
        return false;
    };

    // RPGアツマール用
    if (isAtsumaruMode) {
        
        //==============================================================================
        // WebAudio
        //==============================================================================

        WebAudio.prototype.initialize = function(url) {
            if (!WebAudio._initialized) {
                WebAudio.initialize();
            }
            this[$_] = {
                array_buffer: null,
                decode_bytes: 25600 * 3,
                decoded: 0
            };
            this.clear();
            this._url = url;
            this._load(url);
        };

        WebAudio.prototype._onXhrLoad = function(xhr) {
            var array = this._updateArrayBuffer(xhr.response);
            if(Decrypter.hasEncryptedAudio) array = Decrypter.decryptArrayBuffer(array);
            this._readLoopComments(new Uint8Array(array));
            WebAudio._context.decodeAudioData(array, function(buffer) {
                this._buffer = buffer;
                this._totalTime = buffer.duration;
                if (this._loopLength > 0 && this._sampleRate > 0) {
                    this._loopStart /= this._sampleRate;
                    this._loopLength /= this._sampleRate;
                } else {
                    this._loopStart = 0;
                    this._loopLength = this._totalTime;
                }
                this._onLoad();
            }.bind(this));
        };

        WebAudio.prototype._startPlaying = function(loop, offset) {
            var load_data = this[$_];
            this._removeEndTimer();
            this._removeNodes();
            this._createNodes();
            this._connectNodes();
            this._sourceNode.loop = loop;
            this._sourceNode.start(0, offset);
            this._startTime = WebAudio._context.currentTime - offset / this._pitch;
            this._createEndTimer();
            if (load_data.array_buffer && load_data.decoded < load_data.array_buffer.byteLength) {
                this._decodeAudioData(this._updateArrayBuffer(load_data.array_buffer.buffer));
            } else {
                load_data.array_buffer = null;
            }
        };

        WebAudio.prototype._updateArrayBuffer = function(array) {
            var load_data = this[$_];
            var decode_bytes = Math.min(load_data.decode_bytes, array.byteLength);
            if (!load_data.array_buffer) {
                load_data.array_buffer = new Uint8Array(array);
                load_data.decode_bytes = Math.min(25600 * 9, array.byteLength);
            } else {
                load_data.decode_bytes = array.byteLength;
            }
            load_data.decoded = decode_bytes;
            return load_data.array_buffer.buffer.slice(0, decode_bytes);
        };

        WebAudio.prototype._decodeAudioData = function(array) {
            var load_data = this[$_];
            WebAudio._context.decodeAudioData(array, function(buffer) {
                this._buffer = buffer;
                if (this._loopLength == this._totalTime) {
                    this._loopLength = buffer.duration;
                }
                this._totalTime = buffer.duration;
                if (this._sourceNode) {
                    var node = this._sourceNode;
                    var pos = this.seek();
                    this._removeEndTimer();
                    this._sourceNode = WebAudio._context.createBufferSource();
                    this._sourceNode.buffer = this._buffer;
                    this._sourceNode.loopStart = this._loopStart;
                    this._sourceNode.loopEnd = this._loopStart + this._loopLength;
                    this._sourceNode.playbackRate.value = this._pitch;
                    this._sourceNode.loop = node.loop;
                    this._sourceNode.connect(this._gainNode);
                    this._sourceNode.start(0, pos);
                    this._createEndTimer();
                    node.disconnect();
                }
                if (load_data.array_buffer && load_data.decoded < load_data.array_buffer.byteLength) {
                    this._decodeAudioData(this._updateArrayBuffer(load_data.array_buffer.buffer));
                } else {
                    load_data.array_buffer = null;
                }
            }.bind(this));
        };
        
    // RPGアツマール以外
    } else {

        //==============================================================================
        // WebAudio
        //==============================================================================

        WebAudio.prototype.initialize = function(url) {
            if (!WebAudio._initialized) {
                WebAudio.initialize();
            }
            this[$_] = {
                array_buffer: null,
                load_bytes: 25600 * 3,
                file_bytes: 0,
                received: 0
            };
            this.clear();
            this._url = url;
            this._load(url);
        };

        WebAudio.prototype._load = function(url) {
            if (WebAudio._context) {
                var load_data = this[$_];
                var xhr = new XMLHttpRequest();
                if(Decrypter.hasEncryptedAudio) url = Decrypter.extToEncryptExt(url);
                xhr.open('GET', url);
                xhr.setRequestHeader('Range', 'bytes=' + load_data.received + '-' + (load_data.received + load_data.load_bytes - 1));
                xhr.responseType = 'arraybuffer';
                xhr.onload = function() {
                    if (xhr.status < 400) {
                        if (!load_data.file_bytes) {
                            load_data.file_bytes = +xhr.getResponseHeader('Content-Range').split('/')[1];
                        }
                        this._onXhrLoad(xhr);
                    }
                }.bind(this);
                xhr.onerror = function() {
                    this._hasError = true;
                }.bind(this);
                xhr.send();
            }
        };

        WebAudio.prototype._onXhrLoad = function(xhr) {
            var load_data = this[$_];
            var init_load = !load_data.received;
            var array = this._updateArrayBuffer(xhr.response);
            if(Decrypter.hasEncryptedAudio) array = Decrypter.decryptArrayBuffer(array);
            if (init_load) this._readLoopComments(new Uint8Array(array));
            WebAudio._context.decodeAudioData(array, function(buffer) {
                if (!this._buffer) {
                    this._buffer = buffer;
                    this._totalTime = buffer.duration;
                    if (this._loopLength > 0 && this._sampleRate > 0) {
                        this._loopStart /= this._sampleRate;
                        this._loopLength /= this._sampleRate;
                    } else {
                        this._loopStart = 0;
                        this._loopLength = this._totalTime;
                    }
                    this._onLoad();
                } else {
                    this._buffer = buffer;
                    if (this._loopLength == this._totalTime) {
                        this._loopLength = buffer.duration;
                    }
                    this._totalTime = buffer.duration;
                    if (this._sourceNode) {
                        var node = this._sourceNode;
                        var pos = this.seek();
                        this._removeEndTimer();
                        this._sourceNode = WebAudio._context.createBufferSource();
                        this._sourceNode.buffer = this._buffer;
                        this._sourceNode.loopStart = this._loopStart;
                        this._sourceNode.loopEnd = this._loopStart + this._loopLength;
                        this._sourceNode.playbackRate.value = this._pitch;
                        this._sourceNode.loop = node.loop;
                        this._sourceNode.connect(this._gainNode);
                        this._sourceNode.start(0, pos);
                        this._createEndTimer();
                        node.disconnect();
                    }
                    if (load_data.received < load_data.file_bytes) {
                        this._load(this._url);
                    } else {
                        load_data.array_buffer = null;
                    }
                }
            }.bind(this));
        };

        WebAudio.prototype._startPlaying = function(loop, offset) {
            var load_data = this[$_];
            this._removeEndTimer();
            this._removeNodes();
            this._createNodes();
            this._connectNodes();
            this._sourceNode.loop = loop;
            this._sourceNode.start(0, offset);
            this._startTime = WebAudio._context.currentTime - offset / this._pitch;
            this._createEndTimer();
            if (load_data.received < load_data.file_bytes) {
                this._load(this._url);
            } else {
                load_data.array_buffer = null;
            }
        };

        WebAudio.prototype._updateArrayBuffer = function(array) {
            var load_data = this[$_];
            if (!load_data.array_buffer) {
                load_data.array_buffer = new Uint8Array(load_data.file_bytes);
                load_data.load_bytes = 25600 * 6;
            } else {
                load_data.load_bytes = load_data.file_bytes - load_data.received - array.byteLength;
            }
            load_data.array_buffer.set(new Uint8Array(array), load_data.received);
            load_data.received += array.byteLength;
            return load_data.array_buffer.buffer.slice(0, load_data.received);
        };
        
    }
}());