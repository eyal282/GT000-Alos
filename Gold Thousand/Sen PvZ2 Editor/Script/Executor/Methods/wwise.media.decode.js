"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Executor;
        (function (Executor) {
            var Methods;
            (function (Methods) {
                var WWise;
                (function (WWise) {
                    var Media;
                    (function (Media) {
                        var Decode;
                        (function (Decode) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "wwise.media.decode",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/wwise.media.decode.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.wav`);
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Script.Support.Wwise.Media.Decode.process_fs(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)\.wem$/i],
                                    option: 75n,
                                });
                                return;
                            }
                            Decode.forward = forward;
                        })(Decode = Media.Decode || (Media.Decode = {}));
                    })(Media = WWise.Media || (WWise.Media = {}));
                })(WWise = Methods.WWise || (Methods.WWise = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.WWise.Media.Decode.forward();
