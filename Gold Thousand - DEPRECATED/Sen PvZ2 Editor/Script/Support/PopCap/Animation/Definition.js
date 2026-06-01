"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Support;
        (function (Support) {
            var PopCap;
            (function (PopCap) {
                var Animation;
                (function (Animation) {
                    let State;
                    (function (State) {
                        State[State["state_null"] = 0] = "state_null";
                        State[State["state_false"] = 1] = "state_false";
                        State[State["state_true"] = 2] = "state_true";
                    })(State = Animation.State || (Animation.State = {}));
                })(Animation = PopCap.Animation || (PopCap.Animation = {}));
            })(PopCap = Support.PopCap || (Support.PopCap = {}));
        })(Support = Script.Support || (Script.Support = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
