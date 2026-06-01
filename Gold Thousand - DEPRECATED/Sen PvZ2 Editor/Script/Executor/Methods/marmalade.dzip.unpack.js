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
                        var Unpack;
                        (function (Unpack) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "marmalade.dzip.unpack",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/marmalade.dzip.unpack.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.data_package`);
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.Marmalade.DZip.unpack_fs(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.*)\.dz$/i],
                                    option: 5n,
                                });
                                return;
                            }
                            Unpack.forward = forward;
                        })(Unpack = DZip.Unpack || (DZip.Unpack = {}));
                    })(DZip = Marmalade.DZip || (Marmalade.DZip = {}));
                })(Marmalade = Methods.Marmalade || (Methods.Marmalade = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.Marmalade.DZip.Unpack.forward();
