"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Support;
        (function (Support) {
            var Texture;
            (function (Texture) {
                var Upscaler;
                (function (Upscaler) {
                    let Detail;
                    (function (Detail) {
                        function sprite_generic() {
                            return [
                                [1n, 0n, Sen.Kernel.Language.get("popcap.animation.miscellaneous.to_apng.enable_all")],
                                [2n, 1n, Sen.Kernel.Language.get("popcap.animation.miscellaneous.to_apng.disable_all")],
                                [3n, 2n, Sen.Kernel.Language.get("popcap.animation.miscellaneous.to_apng.select_to_disable")],
                            ];
                        }
                        Detail.sprite_generic = sprite_generic;
                    })(Detail = Upscaler.Detail || (Upscaler.Detail = {}));
                    function load_string_by_int(rule) {
                        const new_rule = [];
                        rule.forEach(function make_rule(e) {
                            if (Sen.Shell.is_gui()) {
                                Sen.Kernel.Console.print(`${e[0]}. ${e[1]}`);
                            }
                            else {
                                Sen.Kernel.Console.print(`    ${e[0]}. ${e[1]}`);
                            }
                            new_rule.push(e[0]);
                        });
                        return rule[Number(Sen.Script.Executor.input_integer(new_rule) - 1n)][1];
                    }
                    Upscaler.load_string_by_int = load_string_by_int;
                    function process(source, destination) {
                        const operating_system = Sen.Kernel.OperatingSystem.current();
                        Script.assert(operating_system === "Windows" || operating_system === "macOS" || operating_system === "Linux", "unsupported_operating_system");
                        const real_esrgan_program_third_path = Script.Home.query("~/../thirdapp/real_esrgan");
                        const real_esrgan_program_file_path = `${real_esrgan_program_third_path}/realesrgan-ncnn-vulkan${operating_system === "Windows" ? ".exe" : ""}`;
                        Script.assert(Sen.Kernel.FileSystem.is_file(real_esrgan_program_file_path), "cannot_find_third");
                        Script.assert(Sen.Kernel.FileSystem.is_directory(`${real_esrgan_program_third_path}/models`), "cannot_find_real_esrgan_models_folder");
                        const model_list = Sen.Kernel.FileSystem.read_directory_only_file(`${real_esrgan_program_third_path}/models`).filter((e) => Sen.Kernel.Path.extname(e).toLowerCase() === ".param");
                        Script.assert(model_list.length > 0, "real_esrgan_model_folder_is_empty");
                        const model_rule = model_list.map((e, i) => [BigInt(i + 1), Sen.Kernel.Path.base_without_extension(e).toLowerCase()]);
                        Script.Console.argument("Enter model");
                        const model_selected = load_string_by_int(model_rule);
                        const command = `${real_esrgan_program_file_path} -i "${source}" -o "${destination}" -n "${model_selected}" > nul 2>&1`;
                        Sen.Kernel.FileSystem.Operation.remove(destination);
                        Sen.Kernel.Process.execute(command);
                        Script.assert(Sen.Kernel.FileSystem.is_file(destination), "failed_to_upscale_image");
                        return;
                    }
                    Upscaler.process = process;
                    function process_fs(source, destination) {
                        process(source, destination);
                        return;
                    }
                    Upscaler.process_fs = process_fs;
                })(Upscaler = Texture.Upscaler || (Texture.Upscaler = {}));
            })(Texture = Support.Texture || (Support.Texture = {}));
        })(Support = Script.Support || (Script.Support = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
