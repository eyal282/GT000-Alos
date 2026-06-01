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
                    var OrgainizeResources;
                    (function (OrgainizeResources) {
                        OrgainizeResources.Order = {
                            slot: 1n,
                            id: 2n,
                            path: 3n,
                            type: 4n,
                            atlas: 5n,
                            width: 6n,
                            height: 7n,
                            parent: 8n,
                            ah: 9n,
                            aw: 10n,
                            ax: 11n,
                            ay: 12n,
                            cols: 13n,
                            x: 14n,
                            y: 15n,
                            srcpath: 16n,
                            runtime: 17n,
                            forceOriginalVectorSymbolSize: 18n,
                        };
                        function orgainize_resources_content(res) {
                            const organize_property = Object.keys(OrgainizeResources.Order).sort((a, b) => Number(OrgainizeResources.Order[a] - OrgainizeResources.Order[b]));
                            res.resources.forEach((e, i) => {
                                const reorganizedObject = {};
                                for (const prop of organize_property) {
                                    if (e.hasOwnProperty(prop)) {
                                        reorganizedObject[prop] = e[prop];
                                    }
                                }
                                res.resources[i] = reorganizedObject;
                            });
                            res.resources.sort((a, b) => a.id.localeCompare(b.id));
                            return;
                        }
                        OrgainizeResources.orgainize_resources_content = orgainize_resources_content;
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
                        OrgainizeResources.rewrite_slot_count = rewrite_slot_count;
                        function process(source, destination) {
                            const resources = Sen.Kernel.JSON.deserialize_fs(source);
                            resources.groups.sort((a, b) => a.id.localeCompare(b.id));
                            resources.groups.forEach((res) => {
                                if (`resources` in res) {
                                    orgainize_resources_content(res);
                                }
                            });
                            rewrite_slot_count(resources);
                            Sen.Kernel.JSON.serialize_fs(destination, resources, 1, true);
                            return;
                        }
                        OrgainizeResources.process = process;
                        function execute() {
                            const source = Script.Console.path(Sen.Kernel.Language.get("script.orgainize_resources.source_file"), "file");
                            process(source, source.replace(/((\.json))?$/i, ".orgainize.json"));
                            return;
                        }
                        OrgainizeResources.execute = execute;
                    })(OrgainizeResources = Permanent.OrgainizeResources || (Permanent.OrgainizeResources = {}));
                })(Permanent = PvZ2.Permanent || (PvZ2.Permanent = {}));
            })(PvZ2 = Helper.PvZ2 || (Helper.PvZ2 = {}));
        })(Helper = Script.Helper || (Script.Helper = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Helper.PvZ2.Permanent.OrgainizeResources.execute();
