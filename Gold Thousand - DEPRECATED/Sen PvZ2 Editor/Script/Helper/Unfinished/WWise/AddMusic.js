"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Helper;
        (function (Helper) {
            var WWise;
            (function (WWise) {
                var AddMusic;
                (function (AddMusic) {
                    const music_type = "main_path";
                    ;
                    ;
                    ;
                    ;
                    ;
                    function encode_audio(data, source) {
                        const media_list = [];
                        Sen.Kernel.FileSystem.create_directory(`${source}/.cache`);
                        for (let media_element of data.media) {
                            const destination = new Sen.Kernel.UInteger32();
                            Sen.Kernel.Support.WWise.SoundBank.hash(media_element, destination);
                            media_list.push(destination.value);
                            Sen.Script.Support.Wwise.Media.Encode.process_fs(`${source}/media/${media_element}.wav`, `${source}/.cache/${destination.value}.wem`, data.setting.audio_format);
                        }
                        return media_list;
                    }
                    AddMusic.encode_audio = encode_audio;
                    function execute() {
                        const source = Script.Console.path(Sen.Kernel.Language.get("script.helper.wwise.add_music.input_music_path"), "directory");
                        const global_data_source = Script.Console.path(Sen.Kernel.Language.get("script.helper.wwise.add_music.input_global_data_path"), "file");
                        const data = Sen.Kernel.JSON.deserialize_fs(`${source}/data.json`);
                        const media_list = encode_audio(data, source);
                        Script.debug(media_list);
                        const temporary_path = Script.Home.query("~/../temporary");
                        const global_data_destination = `${temporary_path}/${Sen.Kernel.Path.basename(global_data_source)}.soundbank`;
                        Sen.Kernel.Support.WWise.SoundBank.decode_fs(global_data_source, global_data_destination);
                        Sen.Kernel.Support.WWise.SoundBank.Miscellaneous.add_music(source, global_data_destination, `${source}.cache`, media_list);
                        Sen.Kernel.Support.WWise.SoundBank.encode_fs(global_data_destination, `${Sen.Kernel.Path.except_extension(global_data_source)}_new.bnk`);
                        return;
                    }
                    AddMusic.execute = execute;
                })(AddMusic = WWise.AddMusic || (WWise.AddMusic = {}));
            })(WWise = Helper.WWise || (Helper.WWise = {}));
        })(Helper = Script.Helper || (Script.Helper = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
;
Sen.Script.Helper.WWise.AddMusic.execute();
