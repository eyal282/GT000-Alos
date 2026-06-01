"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Helper;
        (function (Helper) {
            var PvZ2;
            (function (PvZ2) {
                var WorldMapData;
                (function (WorldMapData) {
                    var Merge;
                    (function (Merge) {
                        function process(source) {
                            const result = {
                                version: 1n,
                                objects: [],
                            };
                            const definition = Sen.Kernel.JSON.deserialize_fs(`${source}/map_list.json`);
                            for (const map_name of Object.keys(definition.objects)) {
                                const data = Sen.Kernel.JSON.deserialize_fs(`${source}/worldmap/${map_name}.json`);
                                data.objdata.m_worldName = map_name;
                                data.objdata.m_resGroupID = definition.objects[map_name].m_resGroupID;
                                data.objdata.m_worldId = definition.objects[map_name].m_worldId;
                                result.objects.push(data);
                            }
                            return result;
                        }
                        Merge.process = process;
                        function execute() {
                            const source = Script.Console.path(Sen.Kernel.Language.get("script.merge_worldmap_data.input_source_directory"), "directory");
                            Sen.Kernel.JSON.serialize_fs(`${source}/WorldMapData.json`, process(source), 1, false);
                            return;
                        }
                        Merge.execute = execute;
                    })(Merge = WorldMapData.Merge || (WorldMapData.Merge = {}));
                })(WorldMapData = PvZ2.WorldMapData || (PvZ2.WorldMapData = {}));
            })(PvZ2 = Helper.PvZ2 || (Helper.PvZ2 = {}));
        })(Helper = Script.Helper || (Script.Helper = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Helper.PvZ2.WorldMapData.Merge.execute();
