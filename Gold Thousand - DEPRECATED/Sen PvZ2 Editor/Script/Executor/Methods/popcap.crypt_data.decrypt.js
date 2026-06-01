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
                    var CryptData;
                    (function (CryptData) {
                        var Decrypt;
                        (function (Decrypt) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.crypt_data.decrypt",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.crypt_data.decrypt.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.bin`);
                                        Script.Console.output(argument.destination);
                                        Executor.load_string(argument, "key", this.configuration, Sen.Kernel.Language.get("popcap.crypt_data.decrypt.key"));
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.CryptData.decrypt_fs(argument.source, argument.destination, argument.key);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)\.bin$/i],
                                    option: 21n,
                                });
                                return;
                            }
                            Decrypt.forward = forward;
                        })(Decrypt = CryptData.Decrypt || (CryptData.Decrypt = {}));
                    })(CryptData = PopCap.CryptData || (PopCap.CryptData = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.CryptData.Decrypt.forward();
