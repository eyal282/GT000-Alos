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
                    var Split;
                    (function (Split) {
                        function process(worldmap_data, destination) {
                            const definition = {
                                version: 1n,
                                objects: {},
                            };
                            if (!("objects" in worldmap_data)) {
                                throw new Error(Sen.Kernel.Language.get("object_cannot_be_null_in_worldmap_data"));
                            }
                            const standard = Object.keys(worldmap_data.objects);
                            const unique = [...new Set(standard)];
                            if (standard.length > unique.length) {
                                throw new Error(Sen.Kernel.Language.get("map_name_is_duplicated"));
                            }
                            Sen.Kernel.FileSystem.create_directory(`${destination}/worldmap`);
                            for (const worldmap of worldmap_data.objects) {
                                const map_name = worldmap.objdata.m_worldName;
                                const record_data = {
                                    m_worldId: worldmap.objdata.m_worldId,
                                    m_resGroupID: worldmap.objdata.m_resGroupID,
                                };
                                delete worldmap.objdata.m_worldName;
                                delete worldmap.objdata.m_worldId;
                                delete worldmap.objdata.m_resGroupID;
                                Sen.Kernel.JSON.serialize_fs(`${destination}/worldmap/${map_name}.json`, worldmap, 1, false);
                                definition.objects[map_name] = record_data;
                            }
                            Sen.Kernel.JSON.serialize_fs(`${destination}/map_list.json`, definition, 1, false);
                            return;
                        }
                        Split.process = process;
                        function execute() {
                            const source = Script.Console.path(Sen.Kernel.Language.get("script.split_worldmap_data.input_source_file"), "file");
                            process(Sen.Kernel.JSON.deserialize_fs(source), `${Sen.Kernel.Path.except_extension(source)}.map_list`);
                            return;
                        }
                        Split.execute = execute;
                    })(Split = WorldMapData.Split || (WorldMapData.Split = {}));
                })(WorldMapData = PvZ2.WorldMapData || (PvZ2.WorldMapData = {}));
            })(PvZ2 = Helper.PvZ2 || (Helper.PvZ2 = {}));
        })(Helper = Script.Helper || (Script.Helper = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Helper.PvZ2.WorldMapData.Split.execute();
