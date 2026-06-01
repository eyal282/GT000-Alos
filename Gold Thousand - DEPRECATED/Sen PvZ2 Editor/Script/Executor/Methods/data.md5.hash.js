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
                    var MD5;
                    (function (MD5) {
                        var Hash;
                        (function (Hash) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "data.md5.hash",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/data.md5.hash.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.clock.start_safe();
                                        Script.Console.output(Sen.Kernel.Encryption.MD5.hash_fs(argument.source));
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: false,
                                    configuration: undefined,
                                    filter: ["file", /.*/],
                                    option: 2n,
                                });
                                return;
                            }
                            Hash.forward = forward;
                        })(Hash = MD5.Hash || (MD5.Hash = {}));
                    })(MD5 = Data.MD5 || (Data.MD5 = {}));
                })(Data = Methods.Data || (Methods.Data = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.Data.MD5.Hash.forward();
