"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Helper;
        (function (Helper) {
            var WWise;
            (function (WWise) {
                var HashID;
                (function (HashID) {
                    function execute() {
                        let input = undefined;
                        const destination = new Sen.Kernel.UInteger32();
                        while (input !== "") {
                            Script.Console.argument("input string");
                            input = Sen.Kernel.Console.readline();
                            Sen.Kernel.Support.WWise.SoundBank.hash(input, destination);
                            Script.Console.obtained(`${input}`);
                            Script.Console.finished(`${destination.value}`);
                        }
                        return;
                    }
                    HashID.execute = execute;
                })(HashID = WWise.HashID || (WWise.HashID = {}));
            })(WWise = Helper.WWise || (Helper.WWise = {}));
        })(Helper = Script.Helper || (Script.Helper = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Helper.WWise.HashID.execute();
