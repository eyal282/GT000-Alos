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
                        var Encode;
                        (function (Encode) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.rsb_patch.encode",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.rsb_patch.encode.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        argument.after_file = Script.Console.path(Sen.Kernel.Language.get("popcap.rsb_patch.encode.after_file"), "file");
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.after_file)}.rsbpatch`);
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.RSBPatch.encode_fs(argument.source, argument.after_file, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward: undefined,
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)(\.rsb|\.obb)$/i],
                                    option: 53n,
                                });
                                return;
                            }
                            Encode.forward = forward;
                        })(Encode = RSBPatch.Encode || (RSBPatch.Encode = {}));
                    })(RSBPatch = PopCap.RSBPatch || (PopCap.RSBPatch = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.RSBPatch.Encode.forward();
