"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Executor;
        (function (Executor) {
            var Methods;
            (function (Methods) {
                var Marmalade;
                (function (Marmalade) {
                    var DZip;
                    (function (DZip) {
                        var Pack;
                        (function (Pack) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "marmalade.dzip.pack",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/marmalade.dzip.pack.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, true);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.dz`);
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.Marmalade.DZip.pack_fs(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, true);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["directory", /(.*)\.data_package$/i],
                                    option: 6n,
                                });
                                return;
                            }
                            Pack.forward = forward;
                        })(Pack = DZip.Pack || (DZip.Pack = {}));
                    })(DZip = Marmalade.DZip || (Marmalade.DZip = {}));
                })(Marmalade = Methods.Marmalade || (Methods.Marmalade = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.Marmalade.DZip.Pack.forward();
