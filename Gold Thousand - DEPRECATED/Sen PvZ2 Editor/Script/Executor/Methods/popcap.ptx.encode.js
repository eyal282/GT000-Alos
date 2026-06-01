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
                    var PTX;
                    (function (PTX) {
                        var Encode;
                        (function (Encode) {
                            let Detail;
                            (function (Detail) {
                                function format() {
                                    return [
                                        [1n, "argb_8888", "argb_8888 (0, iOS)"],
                                        [2n, "rgba_8888", "rgba_8888 (0, Android)"],
                                        [3n, "rgba_4444", "rgba_4444 (1, Android & iOS)"],
                                        [4n, "rgb_565", "rgb_565 (2, Android)"],
                                        [5n, "rgba_5551", "rgba_5551 (3, Android & iOS)"],
                                        [6n, "rgba_4444_tiled", "rgba_4444_tiled (21, Android & iOS)"],
                                        [7n, "rgb_565_tiled", "rgb_565_tiled (22, Android)"],
                                        [8n, "rgba_5551_tiled", "rgba_5551_tiled (23, Android & iOS)"],
                                        [9n, "rgba_pvrtc4", "rgba_pvrtc4 (30, iOS)"],
                                        [10n, "rgb_etc1_a_8", "rgb_etc1_a_8 (147, Android)"],
                                        [11n, "rgb_etc1_a_palette", `rgb_etc1_a_palette (147, ${Sen.Kernel.Language.get("pvz2_android_cn")})`],
                                        [12n, "rgb_pvrtc4_a_8", "rgb_pvrtc4_a_8 (148, iOS)"],
                                    ];
                                }
                                Detail.format = format;
                                function exchange_format(m_format) {
                                    switch (m_format) {
                                        case "argb_8888": {
                                            return Script.Support.Texture.Format.ARGB_8888;
                                        }
                                        case "rgba_8888": {
                                            return Script.Support.Texture.Format.RGBA_8888;
                                        }
                                        case "rgba_4444": {
                                            return Script.Support.Texture.Format.RGBA_4444;
                                        }
                                        case "rgb_565": {
                                            return Script.Support.Texture.Format.RGB_565;
                                        }
                                        case "rgba_5551": {
                                            return Script.Support.Texture.Format.RGBA_5551;
                                        }
                                        case "rgba_4444_tiled": {
                                            return Script.Support.Texture.Format.RGBA_4444_TILED;
                                        }
                                        case "rgb_565_tiled": {
                                            return Script.Support.Texture.Format.RGB_565_TILED;
                                        }
                                        case "rgba_5551_tiled": {
                                            return Script.Support.Texture.Format.RGBA_5551_TILED;
                                        }
                                        case "rgba_pvrtc4": {
                                            return Script.Support.Texture.Format.RGBA_PVRTC_4BPP;
                                        }
                                        case "rgb_etc1_a_8": {
                                            return Script.Support.Texture.Format.RGB_ETC1_A_8;
                                        }
                                        case "rgb_etc1_a_palette": {
                                            return Script.Support.Texture.Format.RGB_ETC1_A_PALETTE;
                                        }
                                        case "rgb_pvrtc4_a_8": {
                                            return Script.Support.Texture.Format.RGB_PVRTC_4BPP_A_8;
                                        }
                                        default: {
                                            throw new Error(Script.format(Sen.Kernel.Language.get("popcap.ptx.unsupported_format"), format));
                                        }
                                    }
                                }
                                Detail.exchange_format = exchange_format;
                            })(Detail = Encode.Detail || (Encode.Detail = {}));
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.ptx.encode",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.ptx.encode.json"),
                                    configuration: undefined,
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.ptx`);
                                        Script.Console.output(argument.destination);
                                        Executor.load_bigint(argument, "format", this.configuration, Detail.format(), Sen.Kernel.Language.get("popcap.ptx.encode.format"));
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.Texture.encode_fs(argument.source, argument.destination, Detail.exchange_format(argument.format));
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    filter: ["file", /(.+)\.png$/i],
                                    option: 34n,
                                });
                                return;
                            }
                            Encode.forward = forward;
                        })(Encode = PTX.Encode || (PTX.Encode = {}));
                    })(PTX = PopCap.PTX || (PopCap.PTX = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.PTX.Encode.forward();
