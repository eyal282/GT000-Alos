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
                    var Zlib;
                    (function (Zlib) {
                        var Uncompress;
                        (function (Uncompress) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.zlib.uncompress",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.zlib.uncompress.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${argument.source}.bin`);
                                        Script.Console.output(argument.destination);
                                        Executor.load_boolean(argument, "use_64_bit_variant", this.configuration, Sen.Kernel.Language.get("popcap.zlib.uncompress.use_64_bit_variant"));
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.Zlib.uncompress_fs(argument.source, argument.destination, argument.use_64_bit_variant);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)\.(compiled|smf|bin)$/i],
                                    option: 72n,
                                });
                                return;
                            }
                            Uncompress.forward = forward;
                        })(Uncompress = Zlib.Uncompress || (Zlib.Uncompress = {}));
                    })(Zlib = PopCap.Zlib || (PopCap.Zlib = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.Zlib.Uncompress.forward();
