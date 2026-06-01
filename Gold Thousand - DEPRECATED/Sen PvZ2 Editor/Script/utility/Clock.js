"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        class Clock {
            _duration;
            _start;
            constructor() {
                this._start = null;
                this._duration = 0;
            }
            reset() {
                this._start = null;
                this._duration = 0;
                return;
            }
            start() {
                if (this.is_started) {
                    throw new Error(Sen.Kernel.Language.get("clock_has_already_been_started"));
                }
                this._start = Sen.Kernel.Thread.now();
                return;
            }
            stop() {
                if (this.is_stopped) {
                    throw new Error(Sen.Kernel.Language.get("clock_has_not_started"));
                }
                this._duration += Sen.Kernel.Thread.now() - this._start;
                this._start = null;
                return;
            }
            get duration() {
                return this._duration;
            }
            get start_time() {
                return this._start;
            }
            get is_started() {
                return this._start !== null;
            }
            get is_stopped() {
                return this._start === null;
            }
            start_safe() {
                if (this.is_stopped) {
                    this.start();
                }
                return;
            }
            stop_safe() {
                if (this.is_started) {
                    this.stop();
                }
                return;
            }
        }
        Script.Clock = Clock;
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
