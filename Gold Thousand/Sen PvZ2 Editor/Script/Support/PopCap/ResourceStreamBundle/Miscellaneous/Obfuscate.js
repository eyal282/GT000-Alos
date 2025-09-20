"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Support;
        (function (Support) {
            var PopCap;
            (function (PopCap) {
                var ResourceStreamBundle;
                (function (ResourceStreamBundle) {
                    var Miscellaneous;
                    (function (Miscellaneous) {
                        var Obfuscate;
                        (function (Obfuscate) {
                            Obfuscate.versions = [3n, 4n];
                            function read_head(sen) {
                                sen.read_position = 16n;
                                const file_list_length = sen.readUint32();
                                const file_list_begin = sen.readUint32();
                                sen.read_position += 8n;
                                const rsg_list_length = sen.readUint32();
                                const rsg_list_begin = sen.readUint32();
                                const rsg_number = sen.readUint32();
                                const rsg_info_begin = sen.readUint32();
                                const rsg_info_each_length = sen.readUint32();
                                const composite_number = sen.readUint32();
                                const composite_info_begin = sen.readUint32();
                                const composite_info_each_length = sen.readUint32();
                                const composite_list_length = sen.readUint32();
                                const composite_list_begin = sen.readUint32();
                                const autopool_number = sen.readUint32();
                                const autopool_info_begin = sen.readUint32();
                                const autopool_info_each_length = sen.readUint32();
                                const ptx_number = sen.readUint32();
                                const ptx_info_begin = sen.readUint32();
                                const ptx_info_each_length = sen.readUint32();
                                sen.read_position += 12n;
                                const file_offset = sen.readUint32();
                                return {
                                    file_offset,
                                    file_list_length,
                                    file_list_begin,
                                    rsg_list_length,
                                    rsg_list_begin,
                                    rsg_number,
                                    rsg_info_begin,
                                    rsg_info_each_length,
                                    composite_number,
                                    composite_info_begin,
                                    composite_info_each_length,
                                    composite_list_length,
                                    composite_list_begin,
                                    autopool_number,
                                    autopool_info_begin,
                                    autopool_info_each_length,
                                    ptx_number,
                                    ptx_info_begin,
                                    ptx_info_each_length,
                                };
                            }
                            Obfuscate.read_head = read_head;
                            function make_random() {
                                let result = undefined;
                                while (true) {
                                    result = BigInt(Math.floor(Math.random() * 0xff));
                                    if (!Obfuscate.versions.includes(result)) {
                                        break;
                                    }
                                }
                                return result;
                            }
                            Obfuscate.make_random = make_random;
                            function disturb_header(sen) {
                                sen.write_position = 4n;
                                const version = make_random();
                                Script.Console.send(`${Sen.Kernel.Language.get("popcap.rsb.obfuscate.version_number")}: 0x${version.toString(16)}`, Script.Definition.Console.Color.GREEN);
                                sen.writeUint8(version);
                                return;
                            }
                            Obfuscate.disturb_header = disturb_header;
                            function process(sen) {
                                const rsb_head_info = read_head(sen);
                                disturb_header(sen);
                                sen.read_position = rsb_head_info.rsg_info_begin;
                                const subgroup_section = new ArrayBuffer(128);
                                Sen.Kernel.ArrayBuffer.random(subgroup_section);
                                const packet_section = new ArrayBuffer(16);
                                Sen.Kernel.ArrayBuffer.random(packet_section);
                                const rsg_section = new ArrayBuffer(64);
                                Sen.Kernel.ArrayBuffer.random(rsg_section);
                                Script.Console.send(`${Sen.Kernel.Language.get("popcap.rsb.obfuscate.modify_count")}: ${rsb_head_info.rsg_number}`, Script.Definition.Console.Color.GREEN);
                                for (let i = 0n; i < rsb_head_info.rsg_number; ++i) {
                                    const start_index = sen.read_position;
                                    const autopool_start_index = rsb_head_info.autopool_info_begin + i * 152n;
                                    sen.writeArrayBuffer(subgroup_section, start_index);
                                    sen.writeArrayBuffer(subgroup_section, autopool_start_index);
                                    sen.writeArrayBuffer(packet_section, start_index + 132n);
                                    const packet_offset = sen.readUint32(start_index + 128n);
                                    sen.writeArrayBuffer(rsg_section, packet_offset);
                                    sen.read_position = start_index + rsb_head_info.rsg_info_each_length;
                                }
                                return;
                            }
                            Obfuscate.process = process;
                            function process_fs(source, destination) {
                                const rsb = new Sen.Kernel.DataStreamView(source);
                                process(rsb);
                                rsb.out_file(destination);
                                return;
                            }
                            Obfuscate.process_fs = process_fs;
                        })(Obfuscate = Miscellaneous.Obfuscate || (Miscellaneous.Obfuscate = {}));
                    })(Miscellaneous = ResourceStreamBundle.Miscellaneous || (ResourceStreamBundle.Miscellaneous = {}));
                })(ResourceStreamBundle = PopCap.ResourceStreamBundle || (PopCap.ResourceStreamBundle = {}));
            })(PopCap = Support.PopCap || (Support.PopCap = {}));
        })(Support = Script.Support || (Script.Support = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
