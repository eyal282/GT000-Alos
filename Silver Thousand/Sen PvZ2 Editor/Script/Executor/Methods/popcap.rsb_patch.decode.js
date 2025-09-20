"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Executor;
        (function (Executor) {
            var Methods;
            (function (Methods) {
                var PopCap;
                (function (PopCap) {
                    var RSBPatch;
                    (function (RSBPatch) {
                        var Decode;
                        (function (Decode) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.rsb_patch.decode",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.rsb_patch.decode.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        argument.before_file = Script.Console.path(Sen.Kernel.Language.get("popcap.rsb_patch.decode.before_file"), "file");
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.rsb`);
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.RSBPatch.decode_fs(argument.source, argument.before_file, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward: undefined,
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)(\.rsbpatch)$/i],
                                    option: 52n,
                                });
                                return;
                            }
                            Decode.forward = forward;
                        })(Decode = RSBPatch.Decode || (RSBPatch.Decode = {}));
                    })(RSBPatch = PopCap.RSBPatch || (PopCap.RSBPatch = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.RSBPatch.Decode.forward();
