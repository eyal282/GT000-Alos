"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Executor;
        (function (Executor) {
            var Methods;
            (function (Methods) {
                var PvZ2;
                (function (PvZ2) {
                    var Custom;
                    (function (Custom) {
                        var SCG;
                        (function (SCG) {
                            var Decode;
                            (function (Decode) {
                                let Detail;
                                (function (Detail) {
                                    function generic() {
                                        return [
                                            [1n, 0n, Sen.Kernel.Language.get("sen.scg.regular")],
                                            [2n, 1n, Sen.Kernel.Language.get("sen.scg.for_modding")],
                                            [3n, 2n, Sen.Kernel.Language.get("debug")],
                                        ];
                                    }
                                    Detail.generic = generic;
                                })(Detail = Decode.Detail || (Decode.Detail = {}));
                                function forward() {
                                    Sen.Script.Executor.push_as_module({
                                        id: "pvz2.custom.scg.decode",
                                        configuration_file: Script.Home.query("~/Executor/Configuration/pvz2.custom.scg.decode.json"),
                                        direct_forward(argument) {
                                            Executor.is_valid_source(argument, false);
                                            Script.Console.obtained(argument.source);
                                            Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.package`);
                                            Script.Console.output(argument.destination);
                                            Executor.load_boolean(argument, "enable_debug", this.configuration, Sen.Kernel.Language.get("pvz2.custom.scg.enable_debug"));
                                            const generic = Detail.generic();
                                            if (!argument.enable_debug) {
                                                generic.pop();
                                            }
                                            Executor.load_bigint(argument, "generic", this.configuration, generic, Sen.Kernel.Language.get("pvz2.custom.scg.decode.generic"));
                                            if (argument.generic == 1n) {
                                                Executor.load_boolean(argument, "animation_split_label", this.configuration, Sen.Kernel.Language.get("pvz2.custom.scg.animation_split_label"));
                                            }
                                            const setting = {
                                                decode_method: argument.generic,
                                                animation_split_label: argument.animation_split_label ?? false,
                                            };
                                            Executor.clock.start_safe();
                                            Sen.Kernel.Support.Miscellaneous.Custom.StreamCompressedGroup.decode_fs(argument.source, argument.destination, setting);
                                            Executor.clock.stop_safe();
                                            return;
                                        },
                                        batch_forward(argument) {
                                            return Executor.basic_batch(this, argument, true);
                                        },
                                        is_enabled: true,
                                        configuration: undefined,
                                        filter: ["file", /(.*)\.scg$/i],
                                        option: 73n,
                                    });
                                    return;
                                }
                                Decode.forward = forward;
                            })(Decode = SCG.Decode || (SCG.Decode = {}));
                        })(SCG = Custom.SCG || (Custom.SCG = {}));
                    })(Custom = PvZ2.Custom || (PvZ2.Custom = {}));
                })(PvZ2 = Methods.PvZ2 || (Methods.PvZ2 = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PvZ2.Custom.SCG.Decode.forward();
