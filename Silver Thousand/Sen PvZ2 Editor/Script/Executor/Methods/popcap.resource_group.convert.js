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
                    var ResourceGroup;
                    (function (ResourceGroup) {
                        var Convert;
                        (function (Convert) {
                            let Detail;
                            (function (Detail) {
                                function exchange_layout(layout) {
                                    switch (layout) {
                                        case "string": {
                                            return Script.Support.PopCap.ResourceGroup.PathStyle.WindowStyle;
                                        }
                                        case "array": {
                                            return Script.Support.PopCap.ResourceGroup.PathStyle.ArrayStyle;
                                        }
                                        default: {
                                            throw new Error(Script.format(Sen.Kernel.Language.get("popcap.resource_group.convert.cannot_exchange_layout"), layout));
                                        }
                                    }
                                }
                                Detail.exchange_layout = exchange_layout;
                                function style() {
                                    return [
                                        [1n, "string", Sen.Kernel.Language.get("popcap.resource_group.convert.layout.string")],
                                        [2n, "array", Sen.Kernel.Language.get("popcap.resource_group.convert.layout.array")],
                                    ];
                                }
                                Detail.style = style;
                            })(Detail = Convert.Detail || (Convert.Detail = {}));
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.resource_group.convert",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.resource_group.convert.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.dirname(argument.source)}/res.json`);
                                        Script.Console.output(argument.destination);
                                        Executor.load_bigint(argument, "layout", this.configuration, Detail.style(), Sen.Kernel.Language.get("popcap.atlas.split.style"));
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.ResourceGroup.convert_fs(argument.source, argument.destination, Detail.exchange_layout(argument.layout));
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)\.json$/i],
                                    option: 49n,
                                });
                                return;
                            }
                            Convert.forward = forward;
                        })(Convert = ResourceGroup.Convert || (ResourceGroup.Convert = {}));
                    })(ResourceGroup = PopCap.ResourceGroup || (PopCap.ResourceGroup = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.ResourceGroup.Convert.forward();
