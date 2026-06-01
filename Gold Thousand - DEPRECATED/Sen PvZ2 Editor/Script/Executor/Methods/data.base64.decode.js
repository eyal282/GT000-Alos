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
                        var Decode;
                        (function (Decode) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "data.base64.decode",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/data.base64.decode.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", Sen.Kernel.Path.resolve(`${argument.source}.bin`));
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Encryption.Base64.decode_fs(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: false,
                                    configuration: undefined,
                                    filter: ["file", /.*/],
                                    option: 3n,
                                });
                                return;
                            }
                            Decode.forward = forward;
                        })(Decode = Base64.Decode || (Base64.Decode = {}));
                    })(Base64 = Data.Base64 || (Data.Base64 = {}));
                })(Data = Methods.Data || (Methods.Data = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.Data.Base64.Decode.forward();
