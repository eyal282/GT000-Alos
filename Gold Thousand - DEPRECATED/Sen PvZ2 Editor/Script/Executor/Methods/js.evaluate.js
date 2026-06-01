"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Executor;
        (function (Executor) {
            var Methods;
            (function (Methods) {
                var JS;
                (function (JS) {
                    var Evaluate;
                    (function (Evaluate) {
                        let Detail;
                        (function (Detail) {
                            Detail.argument = undefined;
                        })(Detail = Evaluate.Detail || (Evaluate.Detail = {}));
                        function forward() {
                            Sen.Script.Executor.push_as_module({
                                id: "js.evaluate",
                                configuration_file: Script.Home.query("~/Executor/Configuration/js.evaluate.json"),
                                direct_forward(argument) {
                                    Executor.is_valid_source(argument, false);
                                    Script.Console.obtained(argument.source);
                                    Executor.clock.start_safe();
                                    const result = Sen.Kernel.JavaScript.evaluate_fs(argument.source);
                                    Script.Console.display(Sen.Kernel.Language.get("js.process.done"), result, Script.Definition.Console.Color.GREEN);
                                    Executor.clock.stop_safe();
                                    return;
                                },
                                batch_forward(argument) {
                                    return Executor.basic_batch(this, argument, false);
                                },
                                is_enabled: true,
                                configuration: undefined,
                                filter: ["file", /(.+)\.js$/i],
                                option: 1n,
                            });
                            return;
                        }
                        Evaluate.forward = forward;
                    })(Evaluate = JS.Evaluate || (JS.Evaluate = {}));
                })(JS = Methods.JS || (Methods.JS = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.JS.Evaluate.forward();
