"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Executor;
        (function (Executor) {
            let Forward;
            (function (Forward) {
                Forward[Forward["DIRECT"] = 0] = "DIRECT";
                Forward[Forward["BATCH"] = 1] = "BATCH";
                Forward[Forward["ASYNC"] = 2] = "ASYNC";
            })(Forward = Executor.Forward || (Executor.Forward = {}));
            Executor.clock = new Script.Clock();
            const methods = new Map();
            function push_as_module(worker) {
                const primary_id = worker.id;
                delete worker.id;
                if (methods.get(primary_id) !== undefined) {
                    throw new Error(`${primary_id} is already existed`);
                }
                methods.set(primary_id, worker);
                return;
            }
            Executor.push_as_module = push_as_module;
            function defined_or_default(argument, key, defined_value) {
                if (argument[key] === undefined) {
                    argument[key] = defined_value;
                }
                return;
            }
            Executor.defined_or_default = defined_or_default;
            function load_bigint(argument, key, configuration, rule, title) {
                Script.Console.argument(title);
                if (argument[key] !== undefined) {
                    if (rule.map((e) => e[1]).includes(argument[key])) {
                        if (Sen.Shell.is_gui()) {
                            Sen.Kernel.Console.print(argument[key]);
                        }
                        else {
                            Sen.Kernel.Console.print(`    ${argument[key]}`);
                        }
                    }
                    else {
                        Script.Console.warning(Script.format(Sen.Kernel.Language.get("script.invalid_input_data"), argument[key]));
                        delete argument[key];
                        return load_bigint(argument, key, configuration, rule, title);
                    }
                    return;
                }
                if (configuration[key] === "?") {
                    return configurate_or_input(argument, key, rule);
                }
                if (configuration[key] !== "?") {
                    if (rule.includes(configuration[key])) {
                        if (Sen.Shell.is_gui()) {
                            Sen.Kernel.Console.print(configuration[key]);
                        }
                        else {
                            Sen.Kernel.Console.print(`    ${configuration[key]}`);
                        }
                        argument[key] = configuration[key];
                        return;
                    }
                    else {
                        Script.Console.error(Script.format(Sen.Kernel.Language.get("invalid.argument"), configuration[key]));
                        configuration[key] = "?";
                        return load_bigint(argument, key, configuration, rule, title);
                    }
                }
                return;
            }
            Executor.load_bigint = load_bigint;
            function input_range(argument, key, configuration, rule, title) {
                Script.Console.argument(title);
                if (argument[key] !== undefined) {
                    if (argument[key] <= rule[1] && argument[key] >= rule[0]) {
                        if (Sen.Shell.is_gui()) {
                            Sen.Kernel.Console.print(argument[key]);
                        }
                        else {
                            Sen.Kernel.Console.print(`    ${argument[key]}`);
                        }
                    }
                    else {
                        Script.Console.warning(Script.format(Sen.Kernel.Language.get("script.invalid_input_data"), argument[key]));
                        delete argument[key];
                        return input_range(argument, key, configuration, rule, title);
                    }
                    return;
                }
                if (configuration[key] === "?") {
                    let input = undefined;
                    while (true) {
                        input = Sen.Kernel.Console.readline();
                        if (/\d+/.test(input) && rule[0] <= BigInt(input) && rule[1] >= BigInt(input)) {
                            break;
                        }
                        Script.Console.error(Script.format(Sen.Kernel.Language.get("invalid.argument"), input));
                    }
                    argument[key] = BigInt(input);
                    return;
                }
                if (configuration[key] !== "?") {
                    if (/\d+/.test(configuration[key]) && rule[0] <= BigInt(configuration[key]) && rule[1] >= BigInt(configuration[key])) {
                        if (Sen.Shell.is_gui()) {
                            Sen.Kernel.Console.print(configuration[key]);
                        }
                        else {
                            Sen.Kernel.Console.print(`    ${configuration[key]}`);
                        }
                        argument[key] = BigInt(configuration[key]);
                        return;
                    }
                    else {
                        Script.Console.error(Script.format(Sen.Kernel.Language.get("invalid.argument"), configuration[key]));
                        configuration[key] = "?";
                        return load_bigint(argument, key, configuration, rule, title);
                    }
                }
                return;
            }
            Executor.input_range = input_range;
            function load_string(argument, key, configuration, title, rule) {
                Script.Console.argument(title);
                if (argument[key] !== undefined) {
                    if (rule !== undefined && !rule.includes(argument[key])) {
                        Script.Console.warning(Script.format(Sen.Kernel.Language.get("script.invalid_input_data"), argument[key]));
                        delete argument[key];
                        return load_string(argument, key, configuration, title, rule);
                    }
                    if (Sen.Shell.is_gui()) {
                        Sen.Kernel.Console.print(`${argument[key]}`);
                    }
                    else {
                        Sen.Kernel.Console.print(`    ${argument[key]}`);
                    }
                    return;
                }
                if (configuration[key] === "?") {
                    argument[key] = Sen.Kernel.Console.readline();
                    return;
                }
                if (configuration[key] !== "?") {
                    if (!rule) {
                        if (Sen.Shell.is_gui()) {
                            Sen.Kernel.Console.print(`${configuration[key]}`);
                        }
                        else {
                            Sen.Kernel.Console.print(`    ${configuration[key]}`);
                        }
                        argument[key] = configuration[key];
                        return;
                    }
                    if (rule.includes(configuration[key])) {
                        if (Sen.Shell.is_gui()) {
                            Sen.Kernel.Console.print(`${configuration[key]}`);
                        }
                        else {
                            Sen.Kernel.Console.print(`    ${configuration[key]}`);
                        }
                        argument[key] = configuration[key];
                        return;
                    }
                    else {
                        Script.Console.error(Script.format(Sen.Kernel.Language.get("invalid.argument"), configuration[key]));
                        configuration[key] = "?";
                        return load_string(argument, key, configuration, title, rule);
                    }
                }
                return;
            }
            Executor.load_string = load_string;
            function load_boolean(argument, key, configuration, title) {
                Script.Console.argument(title);
                if (argument[key] !== undefined) {
                    if (!(typeof argument[key] === "boolean")) {
                        Script.Console.warning(Script.format(Sen.Kernel.Language.get("script.invalid_input_data"), argument[key]));
                        delete argument[key];
                        return load_boolean(argument, key, configuration, title);
                    }
                    if (Sen.Shell.is_gui()) {
                        Sen.Kernel.Console.print(`${argument[key]}`);
                    }
                    else {
                        Sen.Kernel.Console.print(`    ${argument[key]}`);
                    }
                    return;
                }
                if (configuration[key] === "?") {
                    argument[key] = input_boolean();
                    return;
                }
                if (configuration[key] !== "?") {
                    if (/^(true|false)$/.test(configuration[key])) {
                        if (Sen.Shell.is_gui()) {
                            Sen.Kernel.Console.print(`${configuration[key]}`);
                        }
                        else {
                            Sen.Kernel.Console.print(`    ${configuration[key]}`);
                        }
                        argument[key] = Boolean(configuration[key]);
                        return;
                    }
                    Script.Console.send(`1. ${Sen.Kernel.Language.get("input.invalid_boolean_configuration")}`);
                    configuration[key] = "?";
                    return load_boolean(argument, key, configuration, title);
                }
                return;
            }
            Executor.load_boolean = load_boolean;
            function input_boolean() {
                if (Sen.Shell.is_gui()) {
                    const result = Sen.Shell.callback(["input_boolean"]);
                    return result === "1";
                }
                else {
                    Sen.Kernel.Console.print(`    1. ${Sen.Kernel.Language.get("input.set_argument_to_true")}`);
                    Sen.Kernel.Console.print(`    2. ${Sen.Kernel.Language.get("input.set_argument_to_false")}`);
                    const result = input_integer([1n, 2n]);
                    return result === 1n;
                }
            }
            Executor.input_boolean = input_boolean;
            function input_integer(rule) {
                let input = undefined;
                if (Sen.Shell.is_gui()) {
                    input = Sen.Shell.callback(["input_enumeration", ...rule.map((e) => e.toString())]);
                }
                else {
                    while (true) {
                        input = Sen.Kernel.Console.readline();
                        if (/^\d+$/.test(input) && rule.includes(BigInt(input))) {
                            break;
                        }
                        Script.Console.warning(Sen.Kernel.Language.get("js.invalid_input_value"));
                    }
                }
                return BigInt(input);
            }
            Executor.input_integer = input_integer;
            function configurate_or_input(argument, key, rule) {
                if (argument[key] === undefined) {
                    if (typeof rule[0] === "object") {
                        const new_rule = [];
                        rule.forEach(function make_rule(e) {
                            if (Sen.Shell.is_gui()) {
                                Sen.Kernel.Console.print(`${e[0]}. ${e[2]}`);
                            }
                            else {
                                Sen.Kernel.Console.print(`    ${e[0]}. ${e[2]}`);
                            }
                            new_rule.push(e[0]);
                        });
                        argument[key] = rule[Number(input_integer(new_rule) - 1n)][1];
                        return;
                    }
                    if (typeof rule[0] === "string") {
                        argument[key] = Sen.Kernel.Console.readline();
                        return;
                    }
                    if (typeof rule[0] === "bigint") {
                        argument[key] = input_integer(rule);
                        return;
                    }
                }
                return;
            }
            Executor.configurate_or_input = configurate_or_input;
            function test([type, pattern], source) {
                let is_valid = undefined;
                switch (type) {
                    case "file": {
                        is_valid = Sen.Kernel.FileSystem.is_file(source);
                        break;
                    }
                    case "directory": {
                        is_valid = Sen.Kernel.FileSystem.is_directory(source);
                        break;
                    }
                    case "any": {
                        is_valid = true;
                    }
                }
                is_valid &&= pattern.test(source);
                return is_valid;
            }
            Executor.test = test;
            function test_array([type, ...method], source) {
                let is_valid = true;
                switch (type) {
                    case "file": {
                        is_valid = source.every(function make_assert(e) {
                            return Sen.Kernel.FileSystem.is_file(e);
                        });
                        break;
                    }
                    case "directory": {
                        is_valid = source.every(function make_assert(e) {
                            return Sen.Kernel.FileSystem.is_directory(e);
                        });
                        break;
                    }
                    case "any": {
                        is_valid = true;
                    }
                }
                return (is_valid &&
                    method.every(function make_assert(e) {
                        return source.some(function make_some(i) {
                            return e.test(i);
                        });
                    }));
            }
            Executor.test_array = test_array;
            function run_as_module(id, argument, forward_type) {
                const worker = methods.get(id);
                if (worker === undefined) {
                    throw new Error(Script.format(Sen.Kernel.Language.get("js.method_not_found"), id));
                }
                worker.configuration = Sen.Kernel.JSON.deserialize_fs(worker.configuration_file);
                Script.Console.display(`${Sen.Kernel.Language.get("method_loaded")}:`, `${Sen.Kernel.Language.get(id)} | ${id}`, Script.Definition.Console.Color.GREEN);
                switch (forward_type) {
                    case Forward.BATCH: {
                        if (worker.batch_forward === undefined) {
                            throw new Error(Script.format(Sen.Kernel.Language.get("method_does_not_support_batch_implementation"), id));
                        }
                        worker.batch_forward(argument);
                        break;
                    }
                    case Forward.DIRECT: {
                        worker.direct_forward(argument);
                        break;
                    }
                    default: {
                        throw new Error(Script.format(Sen.Kernel.Language.get("js.method_does_not_execute")));
                    }
                }
                Executor.clock.stop_safe();
                Script.Console.send(`${Sen.Kernel.Language.get("execution_time")}: ${Executor.clock.duration.toFixed(3)}s`, Script.Definition.Console.Color.GREEN);
                return;
            }
            Executor.run_as_module = run_as_module;
            function display_argument(argument) {
                if (Script.is_string(argument)) {
                    Script.Console.display(`${Sen.Kernel.Language.get("execution_argument")}:`, argument, Script.Definition.Console.Color.CYAN);
                }
                else {
                    Script.Console.send(`${Sen.Kernel.Language.get("execution_argument")}:`, Script.Definition.Console.Color.CYAN);
                    argument.forEach(function call_print(e) {
                        if (Sen.Shell.is_gui()) {
                            Sen.Kernel.Console.print(e);
                        }
                        else {
                            Sen.Kernel.Console.print(`    ${e}`);
                        }
                    });
                }
                return;
            }
            Executor.display_argument = display_argument;
            function execute(argument, id, forward, load) {
                let result = undefined;
                try {
                    switch (load) {
                        case "simple":
                            run_as_module(id, argument, forward);
                            break;
                        case "whole":
                            Script.assert(Array.isArray(argument.source), Sen.Kernel.Language.get("argument_must_be_list_of_string"));
                            argument.source.forEach((e) => {
                                run_as_module(id, { ...argument, source: e }, forward);
                            });
                    }
                }
                catch (e) {
                    result = Script.Exception.make_exception(e);
                    Script.Console.error(result);
                }
                return result;
            }
            Executor.execute = execute;
            function load_module(argument, load) {
                let modules = new Map();
                const query = (callback, filter, source, [method_name, option_number]) => {
                    if (callback(filter, source)) {
                        modules.set(option_number, method_name);
                    }
                    return;
                };
                methods.forEach(function process_module(worker, method_name) {
                    if (!worker.is_enabled) {
                        return;
                    }
                    if (Script.is_string(argument.source)) {
                        query(test, worker.filter, argument.source, [method_name, worker.option]);
                    }
                    if (Script.is_array(argument.source)) {
                        query(test_array, worker.filter, argument.source, [method_name, worker.option]);
                    }
                });
                display_argument(argument.source);
                Script.Console.send(`${Sen.Kernel.Language.get("execution_argument")}: ${Sen.Kernel.Language.get("js.input_an_method_to_start")}`, Script.Definition.Console.Color.CYAN);
                modules = new Map([...modules.entries()].sort((a, b) => Number(a[0] - b[0])));
                modules.forEach(function print_statement(name, num) {
                    if (Sen.Shell.is_gui()) {
                        Sen.Kernel.Console.print(`${num}. ${Sen.Kernel.Language.get(name)}`);
                    }
                    else {
                        Sen.Kernel.Console.print(`    ${num}. ${Sen.Kernel.Language.get(name)}`);
                    }
                });
                const view = Array.from(modules.keys());
                switch (view.length) {
                    case 0: {
                        Script.Console.error(Sen.Kernel.Language.get("js.argument_ignored"));
                        break;
                    }
                    case 1: {
                        execute(argument, modules.get(view[0]), Forward.DIRECT, load);
                        break;
                    }
                    default: {
                        const input_value = input_integer(view);
                        execute(argument, modules.get(input_value), Forward.DIRECT, load);
                    }
                }
                return;
            }
            Executor.load_module = load_module;
            function is_valid_source(argument, is_directory) {
                if (argument.source === undefined) {
                    argument.source = Script.Console.path(Sen.Kernel.Language.get("input_argument"), is_directory ? "directory" : "file");
                    return;
                }
                if (typeof argument.source !== "string") {
                    delete argument.source;
                    return is_valid_source(argument, is_directory);
                }
                if (is_directory && Sen.Kernel.FileSystem.is_file(argument.source)) {
                    delete argument.source;
                    return is_valid_source(argument, is_directory);
                }
                if (!is_directory && Sen.Kernel.FileSystem.is_directory(argument.source)) {
                    delete argument.source;
                    return is_valid_source(argument, is_directory);
                }
                return;
            }
            Executor.is_valid_source = is_valid_source;
            function exchange_argument_value(value) {
                if (/^(((\d+)[f|n]))$/.test(value)) {
                    if (value.endsWith("f")) {
                        return Number(value.substring(0, value.length - 1));
                    }
                    return BigInt(value.substring(0, value.length - 1));
                }
                if (/(((true|false)))/i.test(value)) {
                    return (value === "true");
                }
                return value;
            }
            Executor.exchange_argument_value = exchange_argument_value;
            function parse_argument(argument, temporary) {
                let raw = argument.source;
                for (let i = 0; i < raw.length; ++i) {
                    if (raw[i].startsWith("-")) {
                        temporary[raw[i++].slice(1)] = exchange_argument_value(raw[i]);
                    }
                }
                return;
            }
            Executor.parse_argument = parse_argument;
            function maybe_contains_atlas(argument, temporary) {
                for (let e of argument.source) {
                    if (["popcap.atlas.split_by_resource_group", "popcap.atlas.split_by_res_info"].includes(e)) {
                        temporary.source = [];
                        return true;
                    }
                }
                return false;
            }
            Executor.maybe_contains_atlas = maybe_contains_atlas;
            function parse_atlas(argument, temporary) {
                let raw = argument.source;
                for (let i = 0; i < raw.length; ++i) {
                    if (raw[i].startsWith("-source")) {
                        ++i;
                        for (; i < raw.length && !raw[i].startsWith("-"); ++i) {
                            temporary.source.push(exchange_argument_value(raw[i]));
                        }
                        --i;
                    }
                    else if (raw[i].startsWith("-")) {
                        temporary[raw[i].slice(1)] = exchange_argument_value(raw[i + 1]);
                        ++i;
                    }
                }
                return;
            }
            Executor.parse_atlas = parse_atlas;
            function input_path(argument) {
                let input = undefined;
                while (true) {
                    input = Script.Console.path(Sen.Kernel.Language.get("script.input_any_path_to_continue"), "any");
                    if (input === "") {
                        break;
                    }
                    argument.source.push(input);
                }
                return;
            }
            Executor.input_path = input_path;
            function forward(argument) {
                {
                    const loader = { method: undefined };
                    const has_atlas = maybe_contains_atlas(argument, loader);
                    if (has_atlas) {
                        parse_atlas(argument, loader);
                    }
                    else {
                        parse_argument(argument, loader);
                    }
                    if (loader.method !== undefined) {
                        const method = loader.method;
                        delete loader.method;
                        execute(loader, method, Forward.DIRECT, "simple");
                        return;
                    }
                }
                if (argument.source.length === 0) {
                    input_path(argument);
                }
                argument.source = argument.source.map((e) => Script.normalize(e));
                if (argument.source.length > 1) {
                    Script.Console.send(`${Sen.Kernel.Language.get("js.make_host.argument_obtained")}:`, Script.Definition.Console.Color.CYAN);
                    argument.source.forEach((e, i) => {
                        if (Sen.Shell.is_gui())
                            Sen.Kernel.Console.print(`${i + 1}. ${e}`);
                        else
                            Sen.Kernel.Console.print(`    ${i + 1}. ${e}`);
                    });
                    Script.Console.send(Script.format(`${Sen.Kernel.Language.get("js.obtained_argument")}:`, argument.source.length), Script.Definition.Console.Color.CYAN);
                    if (Sen.Shell.is_gui()) {
                        Sen.Kernel.Console.print(`${1n}. ${Sen.Kernel.Language.get("js.process_whole")}`);
                        Sen.Kernel.Console.print(`${2n}. ${Sen.Kernel.Language.get("js.process_in_queue")}`);
                        Sen.Kernel.Console.print(`${3n}. ${Sen.Kernel.Language.get("popcap.atlas.split_by_resource_group")}`);
                        Sen.Kernel.Console.print(`${4n}. ${Sen.Kernel.Language.get("popcap.atlas.split_by_res_info")}`);
                    }
                    else {
                        Sen.Kernel.Console.print(`    ${1n}. ${Sen.Kernel.Language.get("js.process_whole")}`);
                        Sen.Kernel.Console.print(`    ${2n}. ${Sen.Kernel.Language.get("js.process_in_queue")}`);
                        Sen.Kernel.Console.print(`    ${3n}. ${Sen.Kernel.Language.get("popcap.atlas.split_by_resource_group")}`);
                        Sen.Kernel.Console.print(`    ${4n}. ${Sen.Kernel.Language.get("popcap.atlas.split_by_res_info")}`);
                    }
                    const input = input_integer([1n, 2n, 3n, 4n]);
                    switch (input) {
                        case 1n: {
                            load_module({ source: argument.source }, "whole");
                            Script.Console.finished(Script.format(Sen.Kernel.Language.get("total_n_files_are_executed"), argument.source).length.toString());
                            break;
                        }
                        case 2n: {
                            load_module({ source: argument.source }, "simple");
                            break;
                        }
                        case 3n: {
                            execute(argument, "popcap.atlas.split_by_resource_group", Forward.DIRECT, "simple");
                            break;
                        }
                        case 4n: {
                            execute(argument, "popcap.atlas.split_by_res_info", Forward.DIRECT, "simple");
                            break;
                        }
                    }
                }
                else {
                    argument.source.forEach(function process_package(e) {
                        load_module({ source: e }, "simple");
                    });
                }
                return;
            }
            Executor.forward = forward;
            function basic_batch(thiz, argument, is_directory, other) {
                let callback = is_directory ? Sen.Kernel.FileSystem.is_directory : Sen.Kernel.FileSystem.is_file;
                const files = Sen.Kernel.FileSystem.read_directory(argument.directory).filter((path) => callback(path) && thiz.filter[1].test(path));
                files.forEach((source) => thiz.direct_forward({ source: source, ...other }));
                Script.Console.finished(Script.format(Sen.Kernel.Language.get("batch.process.count"), files.length));
                return;
            }
            Executor.basic_batch = basic_batch;
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
