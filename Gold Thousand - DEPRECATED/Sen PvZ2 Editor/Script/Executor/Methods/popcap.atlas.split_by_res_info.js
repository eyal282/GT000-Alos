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
                        var SplitByResInfo;
                        (function (SplitByResInfo) {
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
                            })(Detail = SplitByResInfo.Detail || (SplitByResInfo.Detail = {}));
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.atlas.split_by_res_info",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.atlas.split_by_res_info.json"),
                                    configuration: undefined,
                                    direct_forward(argument) {
                                        const jsons = argument.source.filter((e) => /\.json$/gi.test(e));
                                        if (jsons.length === 0) {
                                            throw new Error(Sen.Kernel.Language.get("popcap.atlas.split_by_res_info.source_file_must_be_json"));
                                        }
                                        const pngs = argument.source.filter((e) => /\.png$/gi.test(e));
                                        jsons.forEach((json) => {
                                            const category = [json, ...pngs];
                                            category.forEach((e) => Script.Console.obtained(e));
                                            Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(json)}.sprite`);
                                            Script.Console.output(argument.destination);
                                            Executor.load_bigint(argument, "split_method", this.configuration, Detail.method(), Sen.Kernel.Language.get("popcap.atlas.split.method"));
                                            Executor.clock.start_safe();
                                            Script.Support.PopCap.Atlas.Split.ResInfo.process_fs(category, argument.destination, argument.split_method);
                                            Executor.clock.stop_safe();
                                        });
                                        return;
                                    },
                                    batch_forward: undefined,
                                    is_enabled: true,
                                    filter: ["files", /(.+)\.json$/i, /(.+)\.png$/i],
                                    option: undefined,
                                });
                                return;
                            }
                            SplitByResInfo.forward = forward;
                        })(SplitByResInfo = Atlas.SplitByResInfo || (Atlas.SplitByResInfo = {}));
                    })(Atlas = PopCap.Atlas || (PopCap.Atlas = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.Atlas.SplitByResInfo.forward();
