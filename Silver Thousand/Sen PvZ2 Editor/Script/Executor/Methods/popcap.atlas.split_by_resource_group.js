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
                    var Atlas;
                    (function (Atlas) {
                        var SplitByResourceGroup;
                        (function (SplitByResourceGroup) {
                            let Detail;
                            (function (Detail) {
                                function method() {
                                    return [
                                        [1n, "id", Sen.Kernel.Language.get("popcap.atlas.split.method.id")],
                                        [2n, "path", Sen.Kernel.Language.get("popcap.atlas.split.method.path")],
                                    ];
                                }
                                Detail.method = method;
                                function style() {
                                    return [
                                        [1n, "string", Sen.Kernel.Language.get("popcap.atlas.split.style.string")],
                                        [2n, "array", Sen.Kernel.Language.get("popcap.atlas.split.style.array")],
                                    ];
                                }
                                Detail.style = style;
                            })(Detail = SplitByResourceGroup.Detail || (SplitByResourceGroup.Detail = {}));
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.atlas.split_by_resource_group",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.atlas.split_by_resource_group.json"),
                                    configuration: undefined,
                                    direct_forward(argument) {
                                        const jsons = argument.source.filter((e) => /\.json$/gi.test(e));
                                        if (jsons.length === 0) {
                                            throw new Error(Sen.Kernel.Language.get("popcap.atlas.split_by_resource_group.source_file_must_be_json"));
                                        }
                                        const pngs = argument.source.filter((e) => /\.png$/gi.test(e));
                                        jsons.forEach((json) => {
                                            const category = [json, ...pngs];
                                            category.forEach((e) => Script.Console.obtained(e));
                                            Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(json)}.sprite`);
                                            Script.Console.output(argument.destination);
                                            Executor.load_bigint(argument, "split_method", this.configuration, Detail.method(), Sen.Kernel.Language.get("popcap.atlas.split.method"));
                                            Executor.load_bigint(argument, "style", this.configuration, Detail.style(), Sen.Kernel.Language.get("popcap.atlas.split.style"));
                                            Executor.clock.start_safe();
                                            Script.Support.PopCap.Atlas.Split.ResourceGroup.process_fs(category, argument.destination, argument.split_method, argument.style);
                                            Executor.clock.stop_safe();
                                        });
                                        return;
                                    },
                                    batch_forward: undefined,
                                    is_enabled: true,
                                    filter: ["files", /(.+)\.json$/gi, /(.+)\.png$/gi],
                                    option: undefined,
                                });
                                return;
                            }
                            SplitByResourceGroup.forward = forward;
                        })(SplitByResourceGroup = Atlas.SplitByResourceGroup || (Atlas.SplitByResourceGroup = {}));
                    })(Atlas = PopCap.Atlas || (PopCap.Atlas = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.Atlas.SplitByResourceGroup.forward();
