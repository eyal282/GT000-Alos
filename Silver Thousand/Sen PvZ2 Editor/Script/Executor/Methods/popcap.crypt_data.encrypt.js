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
                        var Encrypt;
                        (function (Encrypt) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.crypt_data.encrypt",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.crypt_data.encrypt.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.bin`);
                                        Script.Console.output(argument.destination);
                                        Executor.load_string(argument, "key", this.configuration, Sen.Kernel.Language.get("popcap.crypt_data.encrypt.key"));
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.CryptData.encrypt_fs(argument.source, argument.destination, argument.key);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)\.bin$/i],
                                    option: 22n,
                                });
                                return;
                            }
                            Encrypt.forward = forward;
                        })(Encrypt = CryptData.Encrypt || (CryptData.Encrypt = {}));
                    })(CryptData = PopCap.CryptData || (PopCap.CryptData = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.CryptData.Encrypt.forward();
