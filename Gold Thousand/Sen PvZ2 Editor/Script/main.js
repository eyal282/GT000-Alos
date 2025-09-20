"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        let Console;
        (function (Console) {
            function display(title, message, color = Script.Definition.Console.Color.DEFAULT) {
                if (Sen.Shell.is_gui()) {
                    if (message)
                        Sen.Kernel.Console.print(title, message, color);
                    else
                        Sen.Kernel.Console.print(title, "", color);
                }
                else {
                    if (message)
                        Sen.Kernel.Console.print(`● ${title}`, `    ${message}`, color);
                    else
                        Sen.Kernel.Console.print(`● ${title}`, "", color);
                }
                return;
            }
            Console.display = display;
            function send(message, color = Script.Definition.Console.Color.DEFAULT) {
                return display(message, "", color);
            }
            Console.send = send;
            function error(str) {
                if (str !== undefined) {
                    Console.display(`${Sen.Kernel.Language.get("runtime_error")}:`, str, Script.Definition.Console.Color.RED);
                }
                return;
            }
            Console.error = error;
            function argument(str) {
                if (Sen.Shell.is_gui()) {
                    display(`${Sen.Kernel.Language.get("execution_argument")}:`, str, Script.Definition.Console.Color.CYAN);
                }
                else {
                    display(`${Sen.Kernel.Language.get("execution_argument")}: ${str}`, "", Script.Definition.Console.Color.CYAN);
                }
                return;
            }
            Console.argument = argument;
            function finished(subtitle, message) {
                if (Sen.Shell.is_gui()) {
                    display(`${Sen.Kernel.Language.get(`execution_finished`)}: ${subtitle}`, message, Script.Definition.Console.Color.GREEN);
                }
                else {
                    display(`${Sen.Kernel.Language.get(`execution_finished`)}: ${subtitle}`, message, Script.Definition.Console.Color.GREEN);
                }
                return;
            }
            Console.finished = finished;
            function obtained(source) {
                return display(`${Sen.Kernel.Language.get("input_argument")}:`, source, Script.Definition.Console.Color.CYAN);
            }
            Console.obtained = obtained;
            function output(source) {
                return display(`${Sen.Kernel.Language.get("output_argument")}:`, source, Script.Definition.Console.Color.GREEN);
            }
            Console.output = output;
            function warning(source) {
                Console.display(Sen.Kernel.Language.get("execution_warning"), source, Script.Definition.Console.Color.YELLOW);
                return;
            }
            Console.warning = warning;
            function path(source, type) {
                Console.argument(source);
                let destination = undefined;
                loop: do {
                    destination = Sen.Kernel.Console.readline();
                    switch (destination) {
                        case ":p": {
                            if (type === "file") {
                                destination = Sen.Shell.callback(["pick_file"]);
                            }
                            if (type === "directory") {
                                destination = Sen.Shell.callback(["pick_directory"]);
                            }
                            Console.obtained(destination);
                            break loop;
                        }
                        default: {
                            if (destination.startsWith('"') && destination.endsWith('"')) {
                                destination = destination.slice(1, destination.length - 1);
                            }
                            if (type === "file") {
                                if (Sen.Kernel.FileSystem.is_file(destination)) {
                                    break loop;
                                }
                                Console.warning(Script.format(Sen.Kernel.Language.get("file_not_found"), destination));
                            }
                            if (type === "directory") {
                                if (Sen.Kernel.FileSystem.is_directory(destination)) {
                                    break loop;
                                }
                                Console.warning(Script.format(Sen.Kernel.Language.get("directory_not_found"), destination));
                            }
                            if (type === "any") {
                                break loop;
                            }
                        }
                    }
                } while (true);
                if (destination !== "") {
                    Console.finished(Sen.Kernel.Language.get("argument_got"), destination);
                }
                return destination;
            }
            Console.path = path;
        })(Console = Script.Console || (Script.Console = {}));
        let Home;
        (function (Home) {
            Home.participant = undefined;
            function setup() {
                Home.participant = Sen.Kernel.Path.dirname(Sen.Kernel.Home.script());
                return;
            }
            Home.setup = setup;
            function query(path) {
                return Sen.Kernel.Path.resolve(path.replace(/^~(?=(\/|$))/gm, Home.participant));
            }
            Home.query = query;
        })(Home = Script.Home || (Script.Home = {}));
        let Exception;
        (function (Exception) {
            function make_stack(stack) {
                return stack
                    .replaceAll("at", `${Sen.Kernel.Language.get("at")}`)
                    .replace(/(?<=\()(.*)(?=(Kernel|Script))/m, "")
                    .replaceAll("\\", "/")
                    .split("\n")
                    .filter((e) => !/(\s)<eval>(\s)/m.test(e))
                    .join("\n");
            }
            Exception.make_stack = make_stack;
            function make_exception_cli(e) {
                let result = `${e.message}`;
                result += `\n● ${Sen.Kernel.Language.get("stack")}:\n`;
                result += make_stack(e.stack);
                result = result.replace(/\n$/, "");
                return result;
            }
            Exception.make_exception_cli = make_exception_cli;
            function make_exception(e) {
                if (Sen.Shell.is_gui()) {
                    Console.error(e.message);
                    Console.display(`${Sen.Kernel.Language.get("stack")}`, `${make_stack(e.stack).replace(/\n$/, "")}`, Script.Definition.Console.Color.RED);
                    return undefined;
                }
                return make_exception_cli(e);
            }
            Exception.make_exception = make_exception;
        })(Exception = Script.Exception || (Script.Exception = {}));
        Script.version = 2;
        function main() {
            const result = launch();
            Console.error(result);
            Console.finished(Sen.Kernel.Language.get("method_are_succeeded"));
            Sen.Shell.callback(["finish"]);
            return;
        }
        Script.main = main;
        function launch() {
            let result = undefined;
            try {
                const args = Sen.Kernel.arguments();
                args.splice(0, 3);
                Home.setup();
                Module.load();
                Console.send(`Sen ~ Shell: ${Sen.Shell.version()} & Kernel: ${Sen.Kernel.version()} & Script: ${Script.version} ~ ${Sen.Kernel.OperatingSystem.current()} & ${Sen.Kernel.OperatingSystem.architecture()}`);
                Script.Setting.load();
                Console.finished(Sen.Kernel.Language.get("current_status"), Script.format(Sen.Kernel.Language.get("js.environment_has_been_loaded"), 1n, 1n, Module.script_list.length + 1));
                Script.Executor.forward({ source: args });
            }
            catch (e) {
                result = Exception.make_exception(e);
            }
            return result;
        }
        Script.launch = launch;
        let Module;
        (function (Module) {
            function load() {
                for (const script of Module.script_list) {
                    Sen.Kernel.JavaScript.evaluate_fs(Home.query(script));
                }
                return;
            }
            Module.load = load;
            Module.script_list = [
                "~/Third/maxrects-packer/maxrects-packer.js",
                "~/utility/Miscellaneous.js",
                "~/Setting/Setting.js",
                "~/utility/Definition.js",
                "~/utility/Clock.js",
                "~/utility/CommandCounter.js",
                "~/Support/Texture/Format.js",
                "~/Support/PopCap/ResourceGroup/Convert.js",
                "~/Support/PopCap/Atlas/Structure.js",
                "~/Support/PopCap/Atlas/Split.js",
                "~/Support/PopCap/Atlas/Pack.js",
                "~/Support/PopCap/Atlas/MultiResolution.js",
                "~/Support/PopCap/Animation/Definition.js",
                "~/Support/PopCap/Animation/Miscellaneous/GenerateAnimation.js",
                "~/Support/PopCap/Animation/Miscellaneous/AddLibrary.js",
                "~/Support/PopCap/LawnStrings/Convert.js",
                "~/Support/PopCap/ResourceStreamBundle/Miscellaneous/Obfuscate.js",
                "~/Support/PopCap/ResourceStreamBundle/Miscellaneous/PlatformConverter.js",
                "~/Support/PopCap/ReflectionObjectNotation/DecodeByLooseConstraints.js",
                "~/Support/Wwise/Media/Common.js",
                "~/Support/Wwise/Media/Decode.js",
                "~/Support/Wwise/Media/Encode.js",
                "~/Executor/Executor.js",
                "~/Executor/Methods/js.evaluate.js",
                "~/Executor/Methods/data.md5.hash.js",
                "~/Executor/Methods/data.base64.encode.js",
                "~/Executor/Methods/data.base64.decode.js",
                "~/Executor/Methods/popcap.rton.decode.js",
                "~/Executor/Methods/popcap.rton.force_decode.js",
                "~/Executor/Methods/popcap.rton.encode.js",
                "~/Executor/Methods/popcap.rton.decrypt.js",
                "~/Executor/Methods/popcap.rton.encrypt.js",
                "~/Executor/Methods/popcap.rton.decrypt_and_decode.js",
                "~/Executor/Methods/popcap.rton.encode_and_encrypt.js",
                "~/Executor/Methods/popcap.resource_group.split.js",
                "~/Executor/Methods/popcap.resource_group.merge.js",
                "~/Executor/Methods/popcap.resource_group.convert.js",
                "~/Executor/Methods/popcap.res_info.split.js",
                "~/Executor/Methods/popcap.res_info.merge.js",
                "~/Executor/Methods/popcap.res_info.convert.js",
                "~/Executor/Methods/popcap.newton.decode.js",
                "~/Executor/Methods/popcap.newton.encode.js",
                "~/Executor/Methods/popcap.crypt_data.decrypt.js",
                "~/Executor/Methods/popcap.crypt_data.encrypt.js",
                "~/Executor/Methods/popcap.animation.decode.js",
                "~/Executor/Methods/popcap.animation.encode.js",
                "~/Executor/Methods/popcap.animation.to_flash.js",
                "~/Executor/Methods/popcap.animation.from_flash.js",
                "~/Executor/Methods/popcap.animation.decode_and_to_flash.js",
                "~/Executor/Methods/popcap.animation.from_flash_and_encode.js",
                "~/Executor/Methods/animation.flash.resize.js",
                "~/Executor/Methods/popcap.animation.to_apng.js",
                "~/Executor/Methods/popcap.cfw2.decode.js",
                "~/Executor/Methods/popcap.cfw2.encode.js",
                "~/Executor/Methods/popcap.compiled_text.decode.js",
                "~/Executor/Methods/popcap.compiled_text.encode.js",
                "~/Executor/Methods/popcap.ptx.encode.js",
                "~/Executor/Methods/popcap.ptx.decode.js",
                "~/Executor/Methods/popcap.zlib.compress.js",
                "~/Executor/Methods/popcap.zlib.uncompress.js",
                "~/Executor/Methods/popcap.particles.decode.js",
                "~/Executor/Methods/popcap.particles.encode.js",
                "~/Executor/Methods/popcap.particles.to_xml.js",
                "~/Executor/Methods/popcap.particles.from_xml.js",
                "~/Executor/Methods/popcap.render_effects.decode.js",
                "~/Executor/Methods/popcap.render_effects.encode.js",
                "~/Executor/Methods/wwise.soundbank.decode.js",
                "~/Executor/Methods/wwise.soundbank.encode.js",
                "~/Executor/Methods/wwise.media.decode.js",
                "~/Executor/Methods/wwise.media.encode.js",
                "~/Executor/Methods/marmalade.dzip.unpack.js",
                "~/Executor/Methods/marmalade.dzip.pack.js",
                "~/Executor/Methods/popcap.rsg.unpack.js",
                "~/Executor/Methods/popcap.rsg.pack.js",
                "~/Executor/Methods/popcap.pak.unpack.js",
                "~/Executor/Methods/popcap.pak.pack.js",
                "~/Executor/Methods/popcap.rsb.unpack.js",
                "~/Executor/Methods/popcap.rsb.pack.js",
                "~/Executor/Methods/popcap.rsb.unpack_resource.js",
                "~/Executor/Methods/popcap.rsb.pack_resource.js",
                "~/Executor/Methods/popcap.rsb.obfuscate.js",
                "~/Executor/Methods/popcap.rsb_patch.decode.js",
                "~/Executor/Methods/popcap.rsb_patch.encode.js",
                "~/Executor/Methods/popcap.reanim.decode.js",
                "~/Executor/Methods/popcap.reanim.encode.js",
                "~/Executor/Methods/popcap.reanim.to_xml.js",
                "~/Executor/Methods/popcap.reanim.from_xml.js",
                "~/Executor/Methods/popcap.reanim.to_flash.js",
                "~/Executor/Methods/popcap.reanim.from_flash.js",
                "~/Executor/Methods/popcap.reanim.from_flash_and_encode.js",
                "~/Executor/Methods/popcap.reanim.decode_and_to_flash.js",
                "~/Executor/Methods/popcap.rsb.unpack_by_loose_constraints.js",
                "~/Executor/Methods/popcap.rsb.init_project.js",
                "~/Executor/Methods/popcap.rsb.build_project.js",
                "~/Executor/Methods/popcap.atlas.split_by_resource_group.js",
                "~/Executor/Methods/popcap.atlas.pack_by_resource_group.js",
                "~/Executor/Methods/popcap.atlas.split_by_res_info.js",
                "~/Executor/Methods/popcap.atlas.pack_by_res_info.js",
                "~/Executor/Methods/popcap.pvz2.lawnstrings.convert.js",
                "~/Executor/Methods/popcap.player_info.decode.js",
                "~/Executor/Methods/popcap.player_info.encode.js",
                "~/Executor/Methods/pvz2.custom.scg.encode.js",
                "~/Executor/Methods/pvz2.custom.scg.decode.js",
                "~/Executor/Methods/popcap.rsb.trace.js",
                "~/Executor/Methods/popcap.animation.add_library.js",
                "~/Executor/Methods/popcap.rsb.convert_platform.js",
            ];
        })(Module = Script.Module || (Script.Module = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
