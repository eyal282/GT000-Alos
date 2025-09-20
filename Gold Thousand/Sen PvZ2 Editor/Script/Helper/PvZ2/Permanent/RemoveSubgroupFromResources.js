"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Helper;
        (function (Helper) {
            var PvZ2;
            (function (PvZ2) {
                var Permanent;
                (function (Permanent) {
                    var RemoveSubgroupFromResources;
                    (function (RemoveSubgroupFromResources) {
                        function rewrite_slot_count(resources) {
                            let slot_index = 0n;
                            const slot_group = {};
                            for (let element of resources.groups) {
                                if (element.resources !== undefined) {
                                    for (let c of element.resources) {
                                        if (!slot_group.hasOwnProperty(c.id)) {
                                            c.slot = slot_index;
                                            slot_group[c.id] = slot_index++;
                                        }
                                        else {
                                            c.slot = slot_group[c.id];
                                        }
                                    }
                                }
                            }
                            resources.slot_count = slot_index;
                            return;
                        }
                        RemoveSubgroupFromResources.rewrite_slot_count = rewrite_slot_count;
                        function process(source, destination, keyword_list) {
                            const resources = Sen.Kernel.JSON.deserialize_fs(source);
                            for (const keyword of keyword_list) {
                                const regex = new RegExp(`_${keyword}$`, "i");
                                let index = 0;
                                while (index < resources.groups.length) {
                                    const resource = resources.groups[index];
                                    if (resource.type === "composite") {
                                        let subgroup_index = 0;
                                        while (subgroup_index < resource.subgroups.length) {
                                            const subgroup = resource.subgroups[subgroup_index];
                                            if (regex.test(subgroup.id)) {
                                                resources.groups[index].subgroups.splice(subgroup_index, 1);
                                            }
                                            else {
                                                ++subgroup_index;
                                            }
                                        }
                                        ++index;
                                    }
                                    else {
                                        if (regex.test(resource.id)) {
                                            resources.groups.splice(index, 1);
                                        }
                                        else {
                                            ++index;
                                        }
                                    }
                                }
                            }
                            rewrite_slot_count(resources);
                            Sen.Kernel.JSON.serialize_fs(destination, resources, 1, true);
                            return;
                        }
                        RemoveSubgroupFromResources.process = process;
                        function execute() {
                            const keyword_list = ["384", "768"];
                            const source = Script.Console.path(Sen.Kernel.Language.get("script.orgainize_resources.source_file"), "file");
                            process(source, source.replace(/((\.json))?$/i, ".trim.json"), keyword_list);
                            return;
                        }
                        RemoveSubgroupFromResources.execute = execute;
                    })(RemoveSubgroupFromResources = Permanent.RemoveSubgroupFromResources || (Permanent.RemoveSubgroupFromResources = {}));
                })(Permanent = PvZ2.Permanent || (PvZ2.Permanent = {}));
            })(PvZ2 = Helper.PvZ2 || (Helper.PvZ2 = {}));
        })(Helper = Script.Helper || (Script.Helper = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Helper.PvZ2.Permanent.RemoveSubgroupFromResources.execute();
