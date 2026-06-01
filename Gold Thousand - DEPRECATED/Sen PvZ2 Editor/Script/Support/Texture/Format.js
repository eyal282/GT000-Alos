"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Support;
        (function (Support) {
            var Texture;
            (function (Texture) {
                let Format;
                (function (Format) {
                    Format[Format["RGBA_8888"] = 1] = "RGBA_8888";
                    Format[Format["ARGB_8888"] = 2] = "ARGB_8888";
                    Format[Format["RGBA_4444"] = 3] = "RGBA_4444";
                    Format[Format["RGB_565"] = 4] = "RGB_565";
                    Format[Format["RGBA_5551"] = 5] = "RGBA_5551";
                    Format[Format["RGBA_4444_TILED"] = 6] = "RGBA_4444_TILED";
                    Format[Format["RGB_565_TILED"] = 7] = "RGB_565_TILED";
                    Format[Format["RGBA_5551_TILED"] = 8] = "RGBA_5551_TILED";
                    Format[Format["RGB_ETC1_A_8"] = 9] = "RGB_ETC1_A_8";
                    Format[Format["RGB_ETC1_A_PALETTE"] = 10] = "RGB_ETC1_A_PALETTE";
                    Format[Format["RGBA_PVRTC_4BPP"] = 11] = "RGBA_PVRTC_4BPP";
                    Format[Format["RGB_PVRTC_4BPP_A_8"] = 12] = "RGB_PVRTC_4BPP_A_8";
                    Format[Format["A_8"] = 13] = "A_8";
                    Format[Format["ARGB_1555"] = 14] = "ARGB_1555";
                    Format[Format["ARGB_4444"] = 15] = "ARGB_4444";
                    Format[Format["RGB_ETC1"] = 16] = "RGB_ETC1";
                    Format[Format["L_8"] = 17] = "L_8";
                    Format[Format["LA_44"] = 18] = "LA_44";
                    Format[Format["LA_88"] = 19] = "LA_88";
                    Format[Format["RGB_PVRTC_4BPP"] = 20] = "RGB_PVRTC_4BPP";
                })(Format = Texture.Format || (Texture.Format = {}));
            })(Texture = Support.Texture || (Support.Texture = {}));
        })(Support = Script.Support || (Script.Support = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
