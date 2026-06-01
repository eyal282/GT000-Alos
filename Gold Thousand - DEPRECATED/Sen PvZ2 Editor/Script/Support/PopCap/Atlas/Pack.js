"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Support;
        (function (Support) {
            var PopCap;
            (function (PopCap) {
                var Atlas;
                (function (Atlas) {
                    var Pack;
                    (function (Pack) {
                        let Detail;
                        (function (Detail) {
                            function reducer_trim(list) {
                                return list.reduce((acc, rect) => ({
                                    width: Math.max(acc.width, rect.x + rect.width),
                                    height: Math.max(acc.height, rect.y + rect.height),
                                }), {
                                    width: 0,
                                    height: 0,
                                });
                            }
                            Detail.reducer_trim = reducer_trim;
                            function square_trim(list) {
                                const result = reducer_trim(list);
                                return {
                                    width: Algorithm.create_2n_square(result.width),
                                    height: Algorithm.create_2n_square(result.height),
                                };
                            }
                            Detail.square_trim = square_trim;
                        })(Detail = Pack.Detail || (Pack.Detail = {}));
                        let Algorithm;
                        (function (Algorithm) {
                            function create_2n_square(num) {
                                return Math.pow(2, Math.ceil(Math.log2(num)));
                            }
                            Algorithm.create_2n_square = create_2n_square;
                            function to_packable(resource) {
                                const members = Object.keys(resource.groups);
                                const result = new Array();
                                for (const member of members) {
                                    const data = {
                                        id: member,
                                        path: resource.groups[member].path.split("/"),
                                        additional_x: Number(resource.groups[member].default.x) ?? 0,
                                        additional_y: Number(resource.groups[member].default.y) ?? 0,
                                        height: undefined,
                                        source: undefined,
                                        width: undefined,
                                    };
                                    if (resource.groups[member].default.cols) {
                                        data.cols = Number(resource.groups[member].default.cols);
                                    }
                                    if (resource.groups[member].default.rows) {
                                        data.rows = Number(resource.groups[member].default.rows);
                                    }
                                    result.push(data);
                                }
                                return result;
                            }
                            Algorithm.to_packable = to_packable;
                            function assert_oversize(list) {
                                for (const collection of list) {
                                    collection.forEach((e) => {
                                        if ("oversized" in e && e.oversized) {
                                            throw new Error(Sen.Kernel.Language.get("popcap.atlas.contains_oversized_image"));
                                        }
                                    });
                                }
                                return;
                            }
                            Algorithm.assert_oversize = assert_oversize;
                        })(Algorithm = Pack.Algorithm || (Pack.Algorithm = {}));
                        let ResourceGroup;
                        (function (ResourceGroup) {
                            function process(source, size, detail) {
                                const json_source = Sen.Kernel.Path.resolve(Sen.Kernel.Path.join(source, "atlas.json"));
                                const media_path = Sen.Kernel.Path.resolve(Sen.Kernel.Path.join(source, "media"));
                                const definition = Sen.Kernel.JSON.deserialize_fs(json_source);
                                const destination = [
                                    {
                                        id: definition.subgroup,
                                        parent: definition.subgroup.replace(`_${definition.res}`, ""),
                                        res: definition.res,
                                        resources: [],
                                        type: "simple",
                                    },
                                ];
                                const is_path = definition.method === "path";
                                const prepare = Sen.Script.Support.PopCap.Atlas.Pack.Algorithm.to_packable(definition);
                                const images = new Map();
                                for (const data of prepare) {
                                    let source_file = undefined;
                                    if (is_path) {
                                        source_file = Sen.Kernel.Path.resolve(Sen.Kernel.Path.join(media_path, `${data.path[data.path.length - 1]}.png`));
                                    }
                                    else {
                                        source_file = Sen.Kernel.Path.resolve(Sen.Kernel.Path.join(media_path, `${data.id}.png`));
                                    }
                                    const image = Sen.Kernel.Image.open(source_file);
                                    images.set(source_file, image);
                                    data.width = Number(image.width);
                                    data.height = Number(image.height);
                                    data.source = Sen.Kernel.Path.resolve(source_file);
                                }
                                const list_view = new Array();
                                const packer = new Sen.Script.Third.MaxRectsAlgorithm.MaxRectsPacker(size.width, size.height, size.padding, detail);
                                packer.addArray(prepare);
                                packer.bins.forEach((bin) => list_view.push(bin.rects));
                                Algorithm.assert_oversize(list_view);
                                if (definition.trim) {
                                    Script.Console.output(Sen.Kernel.Language.get("popcap.atlas.pack.use_trim"));
                                }
                                const is_string_style = definition.expand_path === "string";
                                for (const i in list_view) {
                                    const destination_size = definition.trim ? Detail.reducer_trim(list_view[i]) : Detail.square_trim(list_view[i]);
                                    if (destination_size.width !== size.width) {
                                        Script.Console.output(Script.format(Sen.Kernel.Language.get("popcap.atlas.pack_property_change"), Sen.Kernel.Language.get("width"), size.width, destination_size.width));
                                    }
                                    if (destination_size.height !== size.height) {
                                        Script.Console.output(Script.format(Sen.Kernel.Language.get("popcap.atlas.pack_property_change"), Sen.Kernel.Language.get("height"), size.height, destination_size.height));
                                    }
                                    const parent_name = `${destination[0].id}_${i < 10 ? `0${i}` : `${i}`}`;
                                    destination[0].resources.push({
                                        slot: undefined,
                                        id: `ATLASIMAGE_ATLAS_${parent_name.toUpperCase()}`,
                                        path: is_string_style ? `atlases\\${parent_name}` : ["atlases", parent_name],
                                        type: "Image",
                                        atlas: true,
                                        width: BigInt(destination_size.width),
                                        height: BigInt(destination_size.height),
                                        runtime: true,
                                    });
                                    for (const j in list_view[i]) {
                                        const resource_data = {
                                            slot: undefined,
                                            id: list_view[i][j].id,
                                            path: is_string_style ? list_view[i][j].path.join("\\") : list_view[i][j].path,
                                            type: "Image",
                                            parent: `ATLASIMAGE_ATLAS_${parent_name.toUpperCase()}`,
                                            ax: BigInt(list_view[i][j].x),
                                            ay: BigInt(list_view[i][j].y),
                                            aw: BigInt(list_view[i][j].width),
                                            ah: BigInt(list_view[i][j].height),
                                            x: BigInt(list_view[i][j].additional_x),
                                            y: BigInt(list_view[i][j].additional_y),
                                        };
                                        if (list_view[i][j].cols) {
                                            resource_data.cols = BigInt(list_view[i][j].cols);
                                        }
                                        if (list_view[i][j].rows) {
                                            resource_data.rows = BigInt(list_view[i][j].rows);
                                        }
                                        destination[0].resources.push(resource_data);
                                    }
                                    list_view[i].forEach((e) => {
                                        e.x = BigInt(e.x);
                                        e.y = BigInt(e.y);
                                        e.width = BigInt(e.width);
                                        e.height = BigInt(e.height);
                                    });
                                    const image = Sen.Kernel.Image.join(Sen.Kernel.Dimension.instance(BigInt(destination_size.width), BigInt(destination_size.height)), list_view[i].map((e) => ({ ...images.get(e.source), ...e })));
                                    image.source_file = `${parent_name.toUpperCase()}.png`;
                                    destination.push(image);
                                }
                                return destination;
                            }
                            ResourceGroup.process = process;
                            function process_fs(source, size, detail, destination) {
                                const [definition, ...images] = Sen.Script.Support.PopCap.Atlas.Pack.ResourceGroup.process(source, size, detail);
                                Sen.Kernel.JSON.serialize_fs(Sen.Kernel.Path.join(destination, `${definition.id}.json`), definition, 1, false);
                                images.forEach((image) => Sen.Kernel.Image.write(Sen.Kernel.Path.join(destination, image.source_file), image));
                                return;
                            }
                            ResourceGroup.process_fs = process_fs;
                        })(ResourceGroup = Pack.ResourceGroup || (Pack.ResourceGroup = {}));
                        let ResInfo;
                        (function (ResInfo) {
                            function process(source, size, detail) {
                                const json_source = Sen.Kernel.Path.resolve(Sen.Kernel.Path.join(source, "atlas.json"));
                                const media_path = Sen.Kernel.Path.resolve(Sen.Kernel.Path.join(source, "media"));
                                const definition = Sen.Kernel.JSON.deserialize_fs(json_source);
                                const destination = [
                                    {
                                        id: definition.subgroup,
                                        value: {
                                            packet: {},
                                            type: definition.res,
                                        },
                                    },
                                ];
                                const is_path = definition.method === "path";
                                const prepare = Sen.Script.Support.PopCap.Atlas.Pack.Algorithm.to_packable(definition);
                                const images = new Map();
                                for (const data of prepare) {
                                    let source_file = undefined;
                                    if (is_path) {
                                        source_file = Sen.Kernel.Path.resolve(Sen.Kernel.Path.join(media_path, `${data.path[data.path.length - 1]}.png`));
                                    }
                                    else {
                                        source_file = Sen.Kernel.Path.resolve(Sen.Kernel.Path.join(media_path, `${data.id}.png`));
                                    }
                                    const image = Sen.Kernel.Image.open(source_file);
                                    images.set(source_file, image);
                                    data.width = Number(image.width);
                                    data.height = Number(image.height);
                                    data.source = Sen.Kernel.Path.resolve(source_file);
                                }
                                const list_view = new Array();
                                const packer = new Sen.Script.Third.MaxRectsAlgorithm.MaxRectsPacker(size.width, size.height, size.padding + 2, detail);
                                packer.addArray(prepare);
                                packer.bins.forEach((bin) => list_view.push(bin.rects));
                                Algorithm.assert_oversize(list_view);
                                if (definition.trim) {
                                    Script.Console.output(Sen.Kernel.Language.get("popcap.atlas.pack.use_trim"));
                                }
                                for (const i in list_view) {
                                    const destination_size = definition.trim ? Detail.reducer_trim(list_view[i]) : Detail.square_trim(list_view[i]);
                                    if (destination_size.width !== size.width) {
                                        Script.Console.output(Script.format(Sen.Kernel.Language.get("popcap.atlas.pack_property_change"), Sen.Kernel.Language.get("width"), size.width, destination_size.width));
                                    }
                                    if (destination_size.height !== size.height) {
                                        Script.Console.output(Script.format(Sen.Kernel.Language.get("popcap.atlas.pack_property_change"), Sen.Kernel.Language.get("height"), size.height, destination_size.height));
                                    }
                                    const parent_name = `${definition.subgroup}_${i < 10 ? `0${i}` : `${i}`}`;
                                    const packet_name = `ATLASIMAGE_ATLAS_${parent_name.toUpperCase()}`;
                                    destination[0].value.packet[packet_name] = {
                                        type: "Image",
                                        path: `atlases/${parent_name}`,
                                        dimension: {
                                            width: BigInt(destination_size.width),
                                            height: BigInt(destination_size.height),
                                        },
                                        data: {},
                                    };
                                    for (const j in list_view[i]) {
                                        const resource_data = {
                                            default: {
                                                ax: BigInt(list_view[i][j].x),
                                                ay: BigInt(list_view[i][j].y),
                                                aw: BigInt(list_view[i][j].width),
                                                ah: BigInt(list_view[i][j].height),
                                                x: BigInt(list_view[i][j].additional_x),
                                                y: BigInt(list_view[i][j].additional_y),
                                            },
                                            path: list_view[i][j].path.join("/"),
                                            type: "Image",
                                        };
                                        if (list_view[i][j].cols) {
                                            resource_data.default.cols = BigInt(list_view[i][j].cols);
                                        }
                                        if (list_view[i][j].rows) {
                                            resource_data.default.rows = BigInt(list_view[i][j].rows);
                                        }
                                        destination[0].value.packet[packet_name].data[list_view[i][j].id] = resource_data;
                                    }
                                    list_view[i].forEach((e) => {
                                        e.x = BigInt(e.x);
                                        e.y = BigInt(e.y);
                                        e.width = BigInt(e.width);
                                        e.height = BigInt(e.height);
                                    });
                                    const image = Sen.Kernel.Image.join_extend(Sen.Kernel.Dimension.instance(BigInt(destination_size.width), BigInt(destination_size.height)), list_view[i].map((e) => ({ ...images.get(e.source), ...e })));
                                    image.source_file = `${parent_name.toUpperCase()}.png`;
                                    destination.push(image);
                                }
                                return destination;
                            }
                            ResInfo.process = process;
                            function process_fs(source, size, detail, destination) {
                                const [wrapper, ...images] = process(source, size, detail);
                                Sen.Kernel.JSON.serialize_fs(Sen.Kernel.Path.join(destination, `${wrapper.id}.json`), wrapper.value, 1, false);
                                images.forEach((image) => Sen.Kernel.Image.write(Sen.Kernel.Path.join(destination, image.source_file), image));
                                return;
                            }
                            ResInfo.process_fs = process_fs;
                        })(ResInfo = Pack.ResInfo || (Pack.ResInfo = {}));
                    })(Pack = Atlas.Pack || (Atlas.Pack = {}));
                })(Atlas = PopCap.Atlas || (PopCap.Atlas = {}));
            })(PopCap = Support.PopCap || (Support.PopCap = {}));
        })(Support = Script.Support || (Script.Support = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
