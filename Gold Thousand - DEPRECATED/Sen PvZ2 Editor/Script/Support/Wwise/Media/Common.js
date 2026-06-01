"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Support;
        (function (Support) {
            var Wwise;
            (function (Wwise) {
                var Media;
                (function (Media) {
                    var Common;
                    (function (Common) {
                        Common.FormatX = ["pcm", "adpcm", "vorbis", "aac", "opus", "wemopus"];
                        function search_path(name) {
                            let result = null;
                            const item_delimiter = Sen.Kernel.OperatingSystem.current() === "Windows" ? ";" : ":";
                            Script.assert(Sen.Kernel.Process.is_exists_in_path_environment("PATH"), Sen.Kernel.Language.get("environment_path_not_found"));
                            const path_environment_list = Sen.Kernel.Process.get_path_environment("PATH").split(item_delimiter);
                            const path_extension_list = [""];
                            if (Sen.Kernel.OperatingSystem.current() === "Windows") {
                                Script.assert(Sen.Kernel.Process.is_exists_in_path_environment("PATHEXT"), Sen.Kernel.Language.get("environment_pathext_not_found"));
                                const path_extension_environment = Sen.Kernel.Process.get_path_environment("PATHEXT");
                                path_extension_list.push(...path_extension_environment.split(item_delimiter).map((value) => value.toLowerCase()));
                            }
                            for (let path of path_environment_list) {
                                let path_base = `${path}/${name}`;
                                let path_extension = path_extension_list.find((value) => Sen.Kernel.FileSystem.is_file(`${path_base}${value}`));
                                if (path_extension !== undefined) {
                                    result = `${path_base}${path_extension}`;
                                    break;
                                }
                            }
                            return result;
                        }
                        Common.search_path = search_path;
                    })(Common = Media.Common || (Media.Common = {}));
                })(Media = Wwise.Media || (Wwise.Media = {}));
            })(Wwise = Support.Wwise || (Support.Wwise = {}));
        })(Support = Script.Support || (Script.Support = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
