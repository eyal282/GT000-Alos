"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Support;
        (function (Support) {
            var PopCap;
            (function (PopCap) {
                var LawnStrings;
                (function (LawnStrings) {
                    var Convert;
                    (function (Convert) {
                        function make_list(text) {
                            const text_list = text.split("\n");
                            const arr = new Array();
                            for (let i = 0; i < text_list.length; ++i) {
                                if (/^\[.*\]\s*$/.test(text_list[i])) {
                                    arr.push(text_list[i].slice(1, -1));
                                    let destination = -1;
                                    find_next: for (let j = i + 1; j < text_list.length; ++j) {
                                        if (/^\[.*\]\s*$/.test(text_list[j])) {
                                            destination = j;
                                            break find_next;
                                        }
                                    }
                                    let text_ripe = "";
                                    if (destination !== -1) {
                                        for (let k = i + 1; k < destination - 1; ++k) {
                                            test_case: switch (text_list[k]) {
                                                case "": {
                                                    text_ripe = text_ripe.concat("\r\n");
                                                    break test_case;
                                                }
                                                default: {
                                                    if (text_ripe !== "") {
                                                        text_ripe = text_ripe.concat("\r\n");
                                                    }
                                                    text_ripe = text_ripe.concat(text_list[k]);
                                                    break test_case;
                                                }
                                            }
                                            ++i;
                                        }
                                    }
                                    else {
                                        find_last: for (let j = text_list.length - 1; j > i; --j) {
                                            if (text_list[j] === "") {
                                                destination = j;
                                                break find_last;
                                            }
                                        }
                                        for (let k = i + 1; k < destination - 1; ++k) {
                                            switch (text_list[k]) {
                                                case "": {
                                                    text_ripe = text_ripe.concat("\r\n");
                                                    break;
                                                }
                                                default: {
                                                    text_ripe = text_ripe.concat(text_list[k]);
                                                }
                                            }
                                            ++i;
                                        }
                                    }
                                    arr.push(text_ripe);
                                }
                            }
                            return arr;
                        }
                        Convert.make_list = make_list;
                        function text_to_map(text) {
                            const json_map = {
                                objects: [
                                    {
                                        aliases: ["LawnStringsData"],
                                        objclass: "LawnStringsData",
                                        objdata: {
                                            LocStringValues: {},
                                        },
                                    },
                                ],
                                version: 1n,
                            };
                            const list_text = make_list(text);
                            if (list_text.length < 1) {
                                return json_map;
                            }
                            for (let i = 0; i < list_text.length; ++i) {
                                json_map.objects[0].objdata.LocStringValues[list_text[i]] = list_text[i + 1];
                                ++i;
                            }
                            return json_map;
                        }
                        Convert.text_to_map = text_to_map;
                        function text_to_array(text) {
                            return {
                                objects: [
                                    {
                                        aliases: ["LawnStringsData"],
                                        objclass: "LawnStringsData",
                                        objdata: {
                                            LocStringValues: make_list(text),
                                        },
                                    },
                                ],
                                version: 1n,
                            };
                        }
                        Convert.text_to_array = text_to_array;
                        function map_to_text(source) {
                            let text = "";
                            const keys = Object.keys(source.objects[0].objdata.LocStringValues);
                            keys.forEach((key) => {
                                text = text.concat(`[${key}]`);
                                text = text.concat("\n");
                                text = text.concat(`${source.objects[0].objdata.LocStringValues[key].replace(/\r/g, ``)}`);
                                text = text.concat("\n");
                                text = text.concat("\n");
                            });
                            return text;
                        }
                        Convert.map_to_text = map_to_text;
                        function array_to_text(information) {
                            let text = "";
                            for (let i = 0; i < information.objects[0].objdata.LocStringValues.length; ++i) {
                                text = text.concat(`[${information.objects[0].objdata.LocStringValues[i]}]`);
                                text = text.concat("\n");
                                text = text.concat(`${information.objects[0].objdata.LocStringValues[i + 1].replace(/\r/g, ``)}`);
                                text = text.concat("\n");
                                text = text.concat("\n");
                                ++i;
                            }
                            return text;
                        }
                        Convert.array_to_text = array_to_text;
                        function array_to_map(information) {
                            const json_map = {
                                version: 1n,
                                objects: [
                                    {
                                        aliases: ["LawnStringsData"],
                                        objclass: "LawnStringsData",
                                        objdata: {
                                            LocStringValues: {},
                                        },
                                    },
                                ],
                            };
                            for (let i = 0; i < information.objects[0].objdata.LocStringValues.length; ++i) {
                                json_map.objects[0].objdata.LocStringValues[information.objects[0].objdata.LocStringValues[i]] = information.objects[0].objdata.LocStringValues[i + 1];
                                ++i;
                            }
                            return json_map;
                        }
                        Convert.array_to_map = array_to_map;
                        function map_to_array(information) {
                            const json_array = {
                                version: 1n,
                                objects: [
                                    {
                                        aliases: ["LawnStringsData"],
                                        objclass: "LawnStringsData",
                                        objdata: {
                                            LocStringValues: [],
                                        },
                                    },
                                ],
                            };
                            const keys = Object.keys(information.objects[0].objdata.LocStringValues);
                            for (let key of keys) {
                                json_array.objects[0].objdata.LocStringValues.push(key);
                                json_array.objects[0].objdata.LocStringValues.push(information.objects[0].objdata.LocStringValues[key]);
                            }
                            return json_array;
                        }
                        Convert.map_to_array = map_to_array;
                        function process(source, source_type, destination_type) {
                            if (source_type === destination_type) {
                                throw new Error(Sen.Kernel.Language.get("popcap.lawnstrings.convert.invalid_conversion_type"));
                            }
                            switch (source_type) {
                                case "cn-text":
                                case "text": {
                                    if (destination_type === "array") {
                                        return text_to_array(source);
                                    }
                                    else {
                                        return text_to_map(source);
                                    }
                                }
                                case "array": {
                                    if (destination_type === "text") {
                                        return array_to_text(source);
                                    }
                                    else {
                                        return array_to_map(source);
                                    }
                                }
                                case "map": {
                                    if (destination_type === "text") {
                                        return map_to_text(source);
                                    }
                                    else {
                                        return map_to_array(source);
                                    }
                                }
                            }
                        }
                        Convert.process = process;
                        function process_fs(source, destination, source_type, destination_type) {
                            let source_data = undefined;
                            switch (source_type) {
                                case "text": {
                                    source_data = Sen.Kernel.FileSystem.read_file_encode_with_utf16le(source);
                                    break;
                                }
                                case "cn-text": {
                                    source_data = Sen.Kernel.FileSystem.read_file(source);
                                    break;
                                }
                                case "array":
                                case "map": {
                                    source_data = Sen.Kernel.JSON.deserialize_fs(source);
                                    break;
                                }
                                default: {
                                    throw new Error(Script.format(Sen.Kernel.Language.get("popcap.lawnstrings.convert.unsupported_type"), source_type));
                                }
                            }
                            const destination_data = process(source_data, source_type, destination_type);
                            switch (destination_type) {
                                case "text": {
                                    Sen.Kernel.FileSystem.write_file_encode_with_utf16le(destination, destination_data);
                                    break;
                                }
                                case "cn-text": {
                                    Sen.Kernel.FileSystem.write_file(destination, destination_data);
                                    break;
                                }
                                case "map":
                                case "array": {
                                    Sen.Kernel.JSON.serialize_fs(destination, destination_data, 1, false);
                                    break;
                                }
                                default: {
                                    throw new Error(Script.format(Sen.Kernel.Language.get("popcap.lawnstrings.convert.unsupported_type"), source_type));
                                }
                            }
                            return;
                        }
                        Convert.process_fs = process_fs;
                    })(Convert = LawnStrings.Convert || (LawnStrings.Convert = {}));
                })(LawnStrings = PopCap.LawnStrings || (PopCap.LawnStrings = {}));
            })(PopCap = Support.PopCap || (Support.PopCap = {}));
        })(Support = Script.Support || (Script.Support = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
