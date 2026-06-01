"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        function format(str, ...args) {
            for (const arg of args) {
                str = str.replace("{}", arg.toString());
            }
            return str;
        }
        Script.format = format;
        function is_boolean(value) {
            return typeof value === "boolean";
        }
        Script.is_boolean = is_boolean;
        function is_bigint(value) {
            return typeof value === "bigint";
        }
        Script.is_bigint = is_bigint;
        function is_number(value) {
            return typeof value === "number";
        }
        Script.is_number = is_number;
        function is_string(value) {
            return typeof value === "string";
        }
        Script.is_string = is_string;
        function is_object(value) {
            return typeof value === "object";
        }
        Script.is_object = is_object;
        function is_actual_object(value) {
            return is_object(value) && value.constructor.name === "Object";
        }
        Script.is_actual_object = is_actual_object;
        function is_array(value) {
            return is_object(value) && value.constructor.name === "Array";
        }
        Script.is_array = is_array;
        function debug(value) {
            if (is_object(value)) {
                Script.Console.send(Sen.Kernel.JSON.serialize(value, 1, false));
                return;
            }
            Script.Console.send(value);
            return;
        }
        Script.debug = debug;
        function assert(condition, message) {
            if (!condition) {
                throw new Error(message);
            }
            return;
        }
        Script.assert = assert;
        function normalize(path) {
            return path.replaceAll("\\", "/");
        }
        Script.normalize = normalize;
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
