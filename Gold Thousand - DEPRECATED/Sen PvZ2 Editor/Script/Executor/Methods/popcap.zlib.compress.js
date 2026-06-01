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
                        var Compress;
                        (function (Compress) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.zlib.compress",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.zlib.compress.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${argument.source}.bin`);
                                        Script.Console.output(argument.destination);
                                        Executor.load_boolean(argument, "use_64_bit_variant", this.configuration, Sen.Kernel.Language.get("popcap.zlib.compress.use_64_bit_variant"));
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.Zlib.compress_fs(argument.source, argument.destination, argument.use_64_bit_variant);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)\.(rsb|obb|bin|xml)$/i],
                                    option: 71n,
                                });
                                return;
                            }
                            Compress.forward = forward;
                        })(Compress = Zlib.Compress || (Zlib.Compress = {}));
                    })(Zlib = PopCap.Zlib || (PopCap.Zlib = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.Zlib.Compress.forward();
