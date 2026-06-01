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
                    var PvZ2;
                    (function (PvZ2) {
                        var LawnStrings;
                        (function (LawnStrings) {
                            var Convert;
                            (function (Convert) {
                                let Detail;
                                (function (Detail) {
                                    function type() {
                                        return [
                                            [1n, "text", Sen.Kernel.Language.get("popcap.pvz2.lawnstrings.convert.text")],
                                            [2n, "array", Sen.Kernel.Language.get("popcap.pvz2.lawnstrings.convert.array")],
                                            [3n, "map", Sen.Kernel.Language.get("popcap.pvz2.lawnstrings.convert.map")],
                                            [4n, "cn-text", Sen.Kernel.Language.get("popcap.pvz2.lawnstrings.convert.cn_text")],
                                        ];
                                    }
                                    Detail.type = type;
                                    Detail.rule = ["text", "array", "map", "cn-text"];
                                    function extension(destination) {
                                        switch (destination) {
                                            case "array":
                                            case "map": {
                                                return "json";
                                            }
                                            case "cn-text":
                                            case "text": {
                                                return "txt";
                                            }
                                            default: {
                                                return "unknown";
                                            }
                                        }
                                    }
                                    Detail.extension = extension;
                                })(Detail = Convert.Detail || (Convert.Detail = {}));
                                function forward() {
                                    Sen.Script.Executor.push_as_module({
                                        id: "popcap.pvz2.lawnstrings.convert",
                                        configuration_file: Script.Home.query("~/Executor/Configuration/popcap.pvz2.lawnstrings.convert.json"),
                                        configuration: undefined,
                                        direct_forward(argument) {
                                            Executor.is_valid_source(argument, false);
                                            Script.Console.obtained(argument.source);
                                            Executor.load_bigint(argument, "source_type", this.configuration, Detail.type(), Sen.Kernel.Language.get("popcap.pvz2.lawnstrings.convert.source_type"));
                                            Executor.load_bigint(argument, "destination_type", this.configuration, Detail.type(), Sen.Kernel.Language.get("popcap.pvz2.lawnstrings.destination.destination_type"));
                                            Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.${Detail.extension(argument.destination_type)}`);
                                            Script.Console.output(argument.destination);
                                            Executor.clock.start_safe();
                                            Script.Support.PopCap.LawnStrings.Convert.process_fs(argument.source, argument.destination, argument.source_type, argument.destination_type);
                                            Executor.clock.stop_safe();
                                            return;
                                        },
                                        batch_forward: undefined,
                                        is_enabled: true,
                                        filter: ["file", /(.+)(\.json|\.txt)$/i],
                                        option: 35n,
                                    });
                                    return;
                                }
                                Convert.forward = forward;
                            })(Convert = LawnStrings.Convert || (LawnStrings.Convert = {}));
                        })(LawnStrings = PvZ2.LawnStrings || (PvZ2.LawnStrings = {}));
                    })(PvZ2 = PopCap.PvZ2 || (PopCap.PvZ2 = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.PvZ2.LawnStrings.Convert.forward();
