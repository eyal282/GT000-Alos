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
                    var Split;
                    (function (Split) {
                        let ResourceGroup;
                        (function (ResourceGroup) {
                            function destination(destination, resource, is_path) {
                                if (is_path) {
                                    return `${Sen.Kernel.Path.join(destination, resource.path.split("/").at(-1))}.png`;
                                }
                                return `${Sen.Kernel.Path.join(destination, resource.id)}.png`;
                            }
                            ResourceGroup.destination = destination;
                            function is_sprite_container(resource) {
                                if (resource.ax !== undefined && resource.ay !== undefined && resource.ah !== undefined && resource.aw !== undefined) {
                                    return true;
                                }
                                return false;
                            }
                            ResourceGroup.is_sprite_container = is_sprite_container;
                            function make_definition(resource, method, style) {
                                const definition = {
                                    method: method,
                                    expand_path: style,
                                    subgroup: resource.id,
                                    trim: false,
                                    res: resource.res,
                                    groups: {},
                                };
                                for (const subgroup of resource.resources) {
                                    if (is_sprite_container(subgroup)) {
                                        const wrapper = {
                                            path: subgroup.path,
                                            default: {
                                                x: subgroup.x ?? 0n,
                                                y: subgroup.y ?? 0n,
                                            },
                                        };
                                        if (subgroup.cols && subgroup.cols !== 1n) {
                                            wrapper.default.cols = subgroup.cols;
                                        }
                                        if (subgroup.rows && subgroup.rows !== 1n) {
                                            wrapper.default.rows = subgroup.rows;
                                        }
                                        definition.groups[subgroup.id] = wrapper;
                                    }
                                }
                                return definition;
                            }
                            ResourceGroup.make_definition = make_definition;
                            function process(resource, images, method, style, destination) {
                                const resources_used = {
                                    ...resource,
                                    resources: [],
                                };
                                const sprite_destination = Sen.Kernel.Path.join(destination, "media");
                                const by_path = method === "path";
                                const style_use_string = style === "string";
                                Sen.Kernel.FileSystem.create_directory(sprite_destination);
                                const image_wrapper = new Map();
                                images.forEach((e) => image_wrapper.set(e.toUpperCase(), []));
                                for (const current_resource of resource.resources) {
                                    if (is_sprite_container(current_resource)) {
                                        for (const png of images) {
                                            const current_parent = png.replaceAll(/\.png/gi, "").toUpperCase();
                                            if (current_resource.parent && current_parent.endsWith(current_resource.parent.replace("ATLASIMAGE_ATLAS_", ""))) {
                                                if (style_use_string) {
                                                    current_resource.path = current_resource.path.replaceAll("\\", "/");
                                                }
                                                else {
                                                    current_resource.path = current_resource.path.join("/");
                                                }
                                                image_wrapper.get(png).push({
                                                    x: Number(current_resource.ax),
                                                    y: Number(current_resource.ay),
                                                    width: Number(current_resource.aw),
                                                    height: Number(current_resource.ah),
                                                    destination: ResourceGroup.destination(sprite_destination, current_resource, by_path),
                                                });
                                                resources_used.resources.push(current_resource);
                                                break;
                                            }
                                        }
                                    }
                                }
                                if (by_path) {
                                    image_wrapper.forEach((data, source) => Sen.Kernel.Image.cut_multiple_fs(source, data));
                                }
                                else {
                                    image_wrapper.forEach((data, source) => Sen.Kernel.Image.cut_multiple_fs_asynchronous(source, data));
                                }
                                return make_definition(resources_used, method, style);
                            }
                            ResourceGroup.process = process;
                            function process_fs([json, ...images], destination, method, style) {
                                const definition = process(Sen.Kernel.JSON.deserialize_fs(json), images, method, style, destination);
                                Sen.Kernel.JSON.serialize_fs(Sen.Kernel.Path.join(destination, "atlas.json"), definition, 1, false);
                                return;
                            }
                            ResourceGroup.process_fs = process_fs;
                        })(ResourceGroup = Split.ResourceGroup || (Split.ResourceGroup = {}));
                        let ResInfo;
                        (function (ResInfo) {
                            function is_sprite_container(resource) {
                                if (resource.ax !== undefined && resource.ay !== undefined && resource.ah !== undefined && resource.aw !== undefined) {
                                    return true;
                                }
                                return false;
                            }
                            ResInfo.is_sprite_container = is_sprite_container;
                            function destination(destination, resource, id) {
                                if (id === undefined) {
                                    return `${Sen.Kernel.Path.join(destination, resource.path.split("/").at(-1))}.png`;
                                }
                                return `${Sen.Kernel.Path.join(destination, id)}.png`;
                            }
                            ResInfo.destination = destination;
                            function make_definition(resource, method, id, style) {
                                const definition = {
                                    method: method,
                                    expand_path: style ?? "array",
                                    subgroup: id,
                                    trim: false,
                                    res: resource.type,
                                    groups: {},
                                };
                                const parents = Object.keys(resource.packet);
                                for (const parent of parents) {
                                    const sub_keys = Object.keys(resource.packet[parent].data);
                                    for (const key of sub_keys) {
                                        const group = {
                                            default: {
                                                x: resource.packet[parent].data[key].default.x ?? 0n,
                                                y: resource.packet[parent].data[key].default.y ?? 0n,
                                            },
                                            path: resource.packet[parent].data[key].path,
                                        };
                                        if (resource.packet[parent].data[key].default.cols && resource.packet[parent].data[key].default.cols !== 1n) {
                                            group.default.cols = resource.packet[parent].data[key].default.cols;
                                        }
                                        if (resource.packet[parent].data[key].default.rows && resource.packet[parent].data[key].default.rows !== 1n) {
                                            group.default.rows = resource.packet[parent].data[key].default.rows;
                                        }
                                        definition.groups[key] = group;
                                    }
                                }
                                return definition;
                            }
                            ResInfo.make_definition = make_definition;
                            function process(resource, images, id, method, destination, style) {
                                const resources_used = {
                                    ...resource,
                                    packet: {},
                                };
                                const parents = Object.keys(resource.packet);
                                Sen.Kernel.FileSystem.create_directory(destination);
                                const sprite_destination = Sen.Kernel.Path.join(destination, "media");
                                Sen.Kernel.FileSystem.create_directory(sprite_destination);
                                const image_wrapper = new Map();
                                images.forEach((e) => image_wrapper.set(e, []));
                                const by_path = method === "path";
                                for (const parent of parents) {
                                    const ids = Object.keys(resource.packet[parent].data);
                                    resources_used.packet[parent] = {
                                        ...resource.packet[parent],
                                        data: {},
                                    };
                                    for (const id of ids) {
                                        const group = resource.packet[parent].data[id];
                                        const default_subinfo = resource.packet[parent].data[id].default;
                                        if (is_sprite_container(default_subinfo)) {
                                            for (const png of images) {
                                                const current_parent = png.replaceAll(/\.png$/gi, "").toUpperCase();
                                                if (current_parent.endsWith(parent.replace("ATLASIMAGE_ATLAS_", ""))) {
                                                    image_wrapper.get(png).push({
                                                        x: Number(default_subinfo.ax),
                                                        y: Number(default_subinfo.ay),
                                                        width: Number(default_subinfo.aw),
                                                        height: Number(default_subinfo.ah),
                                                        destination: ResInfo.destination(sprite_destination, group, by_path ? undefined : id),
                                                    });
                                                    resources_used.packet[parent].data[id] = {
                                                        default: {
                                                            ...default_subinfo,
                                                        },
                                                        path: group.path,
                                                        type: group.type,
                                                    };
                                                }
                                            }
                                        }
                                    }
                                }
                                if (by_path) {
                                    image_wrapper.forEach((data, source) => Sen.Kernel.Image.cut_multiple_fs(source, data));
                                }
                                else {
                                    image_wrapper.forEach((data, source) => Sen.Kernel.Image.cut_multiple_fs_asynchronous(source, data));
                                }
                                return make_definition(resources_used, method, id, style);
                            }
                            ResInfo.process = process;
                            function process_fs([json, ...images], destination, method, style) {
                                const definition = process(Sen.Kernel.JSON.deserialize_fs(json), images, Sen.Kernel.Path.base_without_extension(json), method, destination, style);
                                Sen.Kernel.JSON.serialize_fs(Sen.Kernel.Path.join(destination, "atlas.json"), definition, 1, false);
                                return;
                            }
                            ResInfo.process_fs = process_fs;
                        })(ResInfo = Split.ResInfo || (Split.ResInfo = {}));
                    })(Split = Atlas.Split || (Atlas.Split = {}));
                })(Atlas = PopCap.Atlas || (PopCap.Atlas = {}));
            })(PopCap = Support.PopCap || (Support.PopCap = {}));
        })(Support = Script.Support || (Script.Support = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
