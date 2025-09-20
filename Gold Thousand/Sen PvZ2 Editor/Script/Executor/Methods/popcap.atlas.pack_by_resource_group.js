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
                        var PackByResourceGroup;
                        (function (PackByResourceGroup) {
                            let Detail;
                            (function (Detail) {
                                Detail.dimension = [128n, 256n, 512n, 1024n, 2048n, 4096n, 8192n, 16384n];
                                Detail.padding = [1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n, 9n, 10n];
                            })(Detail = PackByResourceGroup.Detail || (PackByResourceGroup.Detail = {}));
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.atlas.pack_by_resource_group",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.atlas.pack_by_resource_group.json"),
                                    configuration: undefined,
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, true);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.dirname(argument.source)}`);
                                        Script.Console.output(argument.destination);
                                        argument.size = {};
                                        argument.detail = {};
                                        Executor.input_range(argument.size, "width", this.configuration.size, [64n, 16384n], Sen.Kernel.Language.get("popcap.atlas.pack.width"));
                                        Executor.input_range(argument.size, "height", this.configuration.size, [64n, 16384n], Sen.Kernel.Language.get("popcap.atlas.pack.height"));
                                        Executor.input_range(argument.size, "padding", this.configuration.size, [1n, 10n], Sen.Kernel.Language.get("popcap.atlas.pack.padding"));
                                        Executor.load_boolean(argument.detail, "smart", this.configuration.detail, Sen.Kernel.Language.get("popcap.atlas.pack.smart"));
                                        Executor.load_boolean(argument.detail, "pot", this.configuration.detail, Sen.Kernel.Language.get("popcap.atlas.pack.pot"));
                                        Executor.load_boolean(argument.detail, "allowRotation", this.configuration.detail, Sen.Kernel.Language.get("popcap.atlas.pack.allow_rotation"));
                                        Executor.load_boolean(argument.detail, "square", this.configuration.detail, Sen.Kernel.Language.get("popcap.atlas.pack.square"));
                                        argument.size.width = Number(argument.size.width);
                                        argument.size.height = Number(argument.size.height);
                                        argument.size.padding = Number(argument.size.padding);
                                        Executor.clock.start_safe();
                                        Script.Support.PopCap.Atlas.Pack.ResourceGroup.process_fs(argument.source, argument.size, argument.detail, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward: undefined,
                                    is_enabled: true,
                                    filter: ["directory", /(.+)\.sprite$/i],
                                    option: 16n,
                                });
                                return;
                            }
                            PackByResourceGroup.forward = forward;
                        })(PackByResourceGroup = Atlas.PackByResourceGroup || (Atlas.PackByResourceGroup = {}));
                    })(Atlas = PopCap.Atlas || (PopCap.Atlas = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.Atlas.PackByResourceGroup.forward();
