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
                            var Encode;
                            (function (Encode) {
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
                                })(Detail = Encode.Detail || (Encode.Detail = {}));
                                function forward() {
                                    Sen.Script.Executor.push_as_module({
                                        id: "pvz2.custom.scg.encode",
                                        configuration_file: Script.Home.query("~/Executor/Configuration/pvz2.custom.scg.encode.json"),
                                        direct_forward(argument) {
                                            Executor.is_valid_source(argument, true);
                                            Script.Console.obtained(argument.source);
                                            Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.scg`);
                                            Script.Console.output(argument.destination);
                                            Executor.load_boolean(argument, "enable_debug", this.configuration, Sen.Kernel.Language.get("pvz2.custom.scg.enable_debug"));
                                            const generic = Detail.generic();
                                            if (!argument.enable_debug) {
                                                generic.pop();
                                            }
                                            Executor.load_bigint(argument, "generic", this.configuration, generic, Sen.Kernel.Language.get("pvz2.custom.scg.encode.generic"));
                                            if (argument.generic == 1n) {
                                                Executor.load_boolean(argument, "animation_split_label", this.configuration, Sen.Kernel.Language.get("pvz2.custom.scg.animation_split_label"));
                                            }
                                            const setting = {
                                                decode_method: argument.generic,
                                                animation_split_label: argument.animation_split_label ?? false,
                                            };
                                            Executor.clock.start_safe();
                                            Sen.Kernel.Support.Miscellaneous.Custom.StreamCompressedGroup.encode_fs(argument.source, argument.destination, setting);
                                            Executor.clock.stop_safe();
                                            return;
                                        },
                                        batch_forward(argument) {
                                            return Executor.basic_batch(this, argument, false);
                                        },
                                        is_enabled: true,
                                        configuration: undefined,
                                        filter: ["directory", /(.*)\.package$/i],
                                        option: 74n,
                                    });
                                    return;
                                }
                                Encode.forward = forward;
                            })(Encode = SCG.Encode || (SCG.Encode = {}));
                        })(SCG = Custom.SCG || (Custom.SCG = {}));
                    })(Custom = PvZ2.Custom || (PvZ2.Custom = {}));
                })(PvZ2 = Methods.PvZ2 || (Methods.PvZ2 = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PvZ2.Custom.SCG.Encode.forward();
