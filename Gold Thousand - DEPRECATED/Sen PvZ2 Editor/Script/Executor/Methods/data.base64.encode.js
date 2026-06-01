"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Executor;
        (function (Executor) {
            var Methods;
            (function (Methods) {
                var Data;
                (function (Data) {
                    var Base64;
                    (function (Base64) {
                        var Encode;
                        (function (Encode) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "data.base64.encode",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/data.base64.encode.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", Sen.Kernel.Path.resolve(`${argument.source}.bin`));
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Encryption.Base64.encode_fs(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: false,
                                    configuration: undefined,
                                    filter: ["file", /.*/],
                                    option: 4n,
                                });
                                return;
                            }
                            Encode.forward = forward;
                        })(Encode = Base64.Encode || (Base64.Encode = {}));
                    })(Base64 = Data.Base64 || (Data.Base64 = {}));
                })(Data = Methods.Data || (Methods.Data = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.Data.Base64.Encode.forward();
