"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Third;
        (function (Third) {
            var MaxRectsAlgorithm;
            (function (MaxRectsAlgorithm) {
                class Bin {
                    width;
                    height;
                    maxWidth;
                    maxHeight;
                    freeRects;
                    rects;
                    options;
                    data;
                    tag;
                    _dirty = 0;
                    get dirty() {
                        return this._dirty > 0 || this.rects.some((rect) => rect.dirty);
                    }
                    setDirty(value = true) {
                        this._dirty = value ? this._dirty + 1 : 0;
                        if (!value) {
                            for (let rect of this.rects) {
                                if (rect.setDirty)
                                    rect.setDirty(false);
                            }
                        }
                    }
                }
                MaxRectsAlgorithm.Bin = Bin;
                class MaxRectsBin extends Bin {
                    maxWidth;
                    maxHeight;
                    padding;
                    width;
                    height;
                    freeRects;
                    rects;
                    verticalExpand = false;
                    stage;
                    border;
                    options = {
                        smart: true,
                        pot: true,
                        square: true,
                        allowRotation: false,
                        tag: false,
                        exclusiveTag: true,
                        border: 0,
                        logic: PACKING_LOGIC.MAX_EDGE,
                    };
                    constructor(maxWidth = MaxRectsAlgorithm.EDGE_MAX_VALUE, maxHeight = MaxRectsAlgorithm.EDGE_MAX_VALUE, padding = 0, options = {}) {
                        super();
                        this.maxWidth = maxWidth;
                        this.maxHeight = maxHeight;
                        this.padding = padding;
                        this.freeRects = new Array();
                        this.rects = new Array();
                        this.options = { ...this.options, ...options };
                        this.width = this.options.smart ? 1 : maxWidth;
                        this.height = this.options.smart ? 1 : maxHeight;
                        this.border = this.options.border ? this.options.border : 0;
                        this.freeRects.push(new Rectangle(this.maxWidth + this.padding - this.border * 2, this.maxHeight + this.padding - this.border * 2, this.border, this.border));
                        this.stage = new Rectangle(this.width, this.height);
                    }
                    add(...args) {
                        let data;
                        let rect;
                        if (args.length === 1) {
                            if (typeof args[0] !== "object")
                                throw new Error("MacrectsBin.add(): Wrong parameters");
                            rect = args[0];
                            let tag = rect.data && rect.data.tag ? rect.data.tag : rect.tag ? rect.tag : undefined;
                            if (this.options.tag && this.options.exclusiveTag && this.tag !== tag)
                                return undefined;
                        }
                        else {
                            data = args.length > 2 ? args[2] : null;
                            if (this.options.tag && this.options.exclusiveTag) {
                                if (data && this.tag !== data.tag)
                                    return undefined;
                                if (!data && this.tag)
                                    return undefined;
                            }
                            rect = new Rectangle(args[0], args[1]);
                            rect.data = data;
                            rect.setDirty(false);
                        }
                        const result = this.place(rect);
                        if (result)
                            this.rects.push(result);
                        return result;
                    }
                    repack() {
                        let unpacked = [];
                        this.reset();
                        this.rects.sort((a, b) => {
                            const result = Math.max(b.width, b.height) - Math.max(a.width, a.height);
                            if (result === 0 && a.hash && b.hash) {
                                return a.hash > b.hash ? -1 : 1;
                            }
                            else
                                return result;
                        });
                        for (let rect of this.rects) {
                            if (!this.place(rect)) {
                                unpacked.push(rect);
                            }
                        }
                        for (let rect of unpacked)
                            this.rects.splice(this.rects.indexOf(rect), 1);
                        return unpacked.length > 0 ? unpacked : undefined;
                    }
                    reset(deepReset = false, resetOption = false) {
                        if (deepReset) {
                            if (this.data)
                                delete this.data;
                            if (this.tag)
                                delete this.tag;
                            this.rects = [];
                            if (resetOption) {
                                this.options = {
                                    smart: true,
                                    pot: true,
                                    square: true,
                                    allowRotation: false,
                                    tag: false,
                                    border: 0,
                                };
                            }
                        }
                        this.width = this.options.smart ? 0 : this.maxWidth;
                        this.height = this.options.smart ? 0 : this.maxHeight;
                        this.border = this.options.border ? this.options.border : 0;
                        this.freeRects = [new Rectangle(this.maxWidth + this.padding - this.border * 2, this.maxHeight + this.padding - this.border * 2, this.border, this.border)];
                        this.stage = new Rectangle(this.width, this.height);
                        this._dirty = 0;
                    }
                    clone() {
                        let clonedBin = new MaxRectsBin(this.maxWidth, this.maxHeight, this.padding, this.options);
                        for (let rect of this.rects) {
                            clonedBin.add(rect);
                        }
                        return clonedBin;
                    }
                    place(rect) {
                        let tag = rect.data && rect.data.tag ? rect.data.tag : rect.tag ? rect.tag : undefined;
                        if (this.options.tag && this.options.exclusiveTag && this.tag !== tag)
                            return undefined;
                        let node;
                        let allowRotation;
                        if (rect.hasOwnProperty("_allowRotation") && rect.allowRotation !== undefined) {
                            allowRotation = rect.allowRotation;
                        }
                        else {
                            allowRotation = this.options.allowRotation;
                        }
                        node = this.findNode(rect.width + this.padding, rect.height + this.padding, allowRotation);
                        if (node) {
                            this.updateBinSize(node);
                            let numRectToProcess = this.freeRects.length;
                            let i = 0;
                            while (i < numRectToProcess) {
                                if (this.splitNode(this.freeRects[i], node)) {
                                    this.freeRects.splice(i, 1);
                                    numRectToProcess--;
                                    i--;
                                }
                                i++;
                            }
                            this.pruneFreeList();
                            this.verticalExpand = this.width > this.height ? true : false;
                            rect.x = node.x;
                            rect.y = node.y;
                            if (rect.rot === undefined)
                                rect.rot = false;
                            rect.rot = node.rot ? !rect.rot : rect.rot;
                            this._dirty++;
                            return rect;
                        }
                        else if (!this.verticalExpand) {
                            if (this.updateBinSize(new Rectangle(rect.width + this.padding, rect.height + this.padding, this.width + this.padding - this.border, this.border)) ||
                                this.updateBinSize(new Rectangle(rect.width + this.padding, rect.height + this.padding, this.border, this.height + this.padding - this.border))) {
                                return this.place(rect);
                            }
                        }
                        else {
                            if (this.updateBinSize(new Rectangle(rect.width + this.padding, rect.height + this.padding, this.border, this.height + this.padding - this.border)) ||
                                this.updateBinSize(new Rectangle(rect.width + this.padding, rect.height + this.padding, this.width + this.padding - this.border, this.border))) {
                                return this.place(rect);
                            }
                        }
                        return undefined;
                    }
                    findNode(width, height, allowRotation) {
                        let score = Number.MAX_VALUE;
                        let areaFit;
                        let r;
                        let bestNode;
                        for (let i in this.freeRects) {
                            r = this.freeRects[i];
                            if (r.width >= width && r.height >= height) {
                                areaFit = this.options.logic === PACKING_LOGIC.MAX_AREA ? r.width * r.height - width * height : Math.min(r.width - width, r.height - height);
                                if (areaFit < score) {
                                    bestNode = new Rectangle(width, height, r.x, r.y);
                                    score = areaFit;
                                }
                            }
                            if (!allowRotation)
                                continue;
                            if (r.width >= height && r.height >= width) {
                                areaFit = this.options.logic === PACKING_LOGIC.MAX_AREA ? r.width * r.height - height * width : Math.min(r.height - width, r.width - height);
                                if (areaFit < score) {
                                    bestNode = new Rectangle(height, width, r.x, r.y, true);
                                    score = areaFit;
                                }
                            }
                        }
                        return bestNode;
                    }
                    splitNode(freeRect, usedNode) {
                        if (!freeRect.collide(usedNode))
                            return false;
                        if (usedNode.x < freeRect.x + freeRect.width && usedNode.x + usedNode.width > freeRect.x) {
                            if (usedNode.y > freeRect.y && usedNode.y < freeRect.y + freeRect.height) {
                                let newNode = new Rectangle(freeRect.width, usedNode.y - freeRect.y, freeRect.x, freeRect.y);
                                this.freeRects.push(newNode);
                            }
                            if (usedNode.y + usedNode.height < freeRect.y + freeRect.height) {
                                let newNode = new Rectangle(freeRect.width, freeRect.y + freeRect.height - (usedNode.y + usedNode.height), freeRect.x, usedNode.y + usedNode.height);
                                this.freeRects.push(newNode);
                            }
                        }
                        if (usedNode.y < freeRect.y + freeRect.height && usedNode.y + usedNode.height > freeRect.y) {
                            if (usedNode.x > freeRect.x && usedNode.x < freeRect.x + freeRect.width) {
                                let newNode = new Rectangle(usedNode.x - freeRect.x, freeRect.height, freeRect.x, freeRect.y);
                                this.freeRects.push(newNode);
                            }
                            if (usedNode.x + usedNode.width < freeRect.x + freeRect.width) {
                                let newNode = new Rectangle(freeRect.x + freeRect.width - (usedNode.x + usedNode.width), freeRect.height, usedNode.x + usedNode.width, freeRect.y);
                                this.freeRects.push(newNode);
                            }
                        }
                        return true;
                    }
                    pruneFreeList() {
                        let i = 0;
                        let j = 0;
                        let len = this.freeRects.length;
                        while (i < len) {
                            j = i + 1;
                            let tmpRect1 = this.freeRects[i];
                            while (j < len) {
                                let tmpRect2 = this.freeRects[j];
                                if (tmpRect2.contain(tmpRect1)) {
                                    this.freeRects.splice(i, 1);
                                    i--;
                                    len--;
                                    break;
                                }
                                if (tmpRect1.contain(tmpRect2)) {
                                    this.freeRects.splice(j, 1);
                                    j--;
                                    len--;
                                }
                                j++;
                            }
                            i++;
                        }
                    }
                    updateBinSize(node) {
                        if (!this.options.smart)
                            return false;
                        if (this.stage.contain(node))
                            return false;
                        let tmpWidth = Math.max(this.width, node.x + node.width - this.padding + this.border);
                        let tmpHeight = Math.max(this.height, node.y + node.height - this.padding + this.border);
                        if (this.options.allowRotation) {
                            const rotWidth = Math.max(this.width, node.x + node.height - this.padding + this.border);
                            const rotHeight = Math.max(this.height, node.y + node.width - this.padding + this.border);
                            if (rotWidth * rotHeight < tmpWidth * tmpHeight) {
                                tmpWidth = rotWidth;
                                tmpHeight = rotHeight;
                            }
                        }
                        if (this.options.pot) {
                            tmpWidth = Math.pow(2, Math.ceil(Math.log(tmpWidth) * Math.LOG2E));
                            tmpHeight = Math.pow(2, Math.ceil(Math.log(tmpHeight) * Math.LOG2E));
                        }
                        if (this.options.square) {
                            tmpWidth = tmpHeight = Math.max(tmpWidth, tmpHeight);
                        }
                        if (tmpWidth > this.maxWidth + this.padding || tmpHeight > this.maxHeight + this.padding) {
                            return false;
                        }
                        this.expandFreeRects(tmpWidth + this.padding, tmpHeight + this.padding);
                        this.width = this.stage.width = tmpWidth;
                        this.height = this.stage.height = tmpHeight;
                        return true;
                    }
                    expandFreeRects(width, height) {
                        this.freeRects.forEach((freeRect, index) => {
                            if (freeRect.x + freeRect.width >= Math.min(this.width + this.padding - this.border, width)) {
                                freeRect.width = width - freeRect.x - this.border;
                            }
                            if (freeRect.y + freeRect.height >= Math.min(this.height + this.padding - this.border, height)) {
                                freeRect.height = height - freeRect.y - this.border;
                            }
                        }, this);
                        this.freeRects.push(new Rectangle(width - this.width - this.padding, height - this.border * 2, this.width + this.padding - this.border, this.border));
                        this.freeRects.push(new Rectangle(width - this.border * 2, height - this.height - this.padding, this.border, this.height + this.padding - this.border));
                        this.freeRects = this.freeRects.filter((freeRect) => {
                            return !(freeRect.width <= 0 || freeRect.height <= 0 || freeRect.x < this.border || freeRect.y < this.border);
                        });
                        this.pruneFreeList();
                    }
                }
                MaxRectsAlgorithm.MaxRectsBin = MaxRectsBin;
                class Rectangle {
                    oversized = false;
                    constructor(width = 0, height = 0, x = 0, y = 0, rot = false, allowRotation = undefined) {
                        this._width = width;
                        this._height = height;
                        this._x = x;
                        this._y = y;
                        this._data = {};
                        this._rot = rot;
                        this._allowRotation = allowRotation;
                    }
                    static Collide(first, second) {
                        return first.collide(second);
                    }
                    static Contain(first, second) {
                        return first.contain(second);
                    }
                    area() {
                        return this.width * this.height;
                    }
                    collide(rect) {
                        return rect.x < this.x + this.width && rect.x + rect.width > this.x && rect.y < this.y + this.height && rect.y + rect.height > this.y;
                    }
                    contain(rect) {
                        return rect.x >= this.x && rect.y >= this.y && rect.x + rect.width <= this.x + this.width && rect.y + rect.height <= this.y + this.height;
                    }
                    _width;
                    get width() {
                        return this._width;
                    }
                    set width(value) {
                        if (value === this._width)
                            return;
                        this._width = value;
                        this._dirty++;
                    }
                    _height;
                    get height() {
                        return this._height;
                    }
                    set height(value) {
                        if (value === this._height)
                            return;
                        this._height = value;
                        this._dirty++;
                    }
                    _x;
                    get x() {
                        return this._x;
                    }
                    set x(value) {
                        if (value === this._x)
                            return;
                        this._x = value;
                        this._dirty++;
                    }
                    _y;
                    get y() {
                        return this._y;
                    }
                    set y(value) {
                        if (value === this._y)
                            return;
                        this._y = value;
                        this._dirty++;
                    }
                    _rot = false;
                    get rot() {
                        return this._rot;
                    }
                    set rot(value) {
                        if (this._allowRotation === false)
                            return;
                        if (this._rot !== value) {
                            const tmp = this.width;
                            this.width = this.height;
                            this.height = tmp;
                            this._rot = value;
                            this._dirty++;
                        }
                    }
                    _allowRotation = undefined;
                    get allowRotation() {
                        return this._allowRotation;
                    }
                    set allowRotation(value) {
                        if (this._allowRotation !== value) {
                            this._allowRotation = value;
                            this._dirty++;
                        }
                    }
                    _data;
                    get data() {
                        return this._data;
                    }
                    set data(value) {
                        if (value === null || value === this._data)
                            return;
                        this._data = value;
                        if (typeof value === "object" && value.hasOwnProperty("allowRotation")) {
                            this._allowRotation = value.allowRotation;
                        }
                        this._dirty++;
                    }
                    _dirty = 0;
                    get dirty() {
                        return this._dirty > 0;
                    }
                    setDirty(value = true) {
                        this._dirty = value ? this._dirty + 1 : 0;
                    }
                }
                MaxRectsAlgorithm.Rectangle = Rectangle;
                class OversizedElementBin extends Bin {
                    width;
                    height;
                    data;
                    maxWidth;
                    maxHeight;
                    options;
                    rects = [];
                    freeRects;
                    constructor(...args) {
                        super();
                        if (args.length === 1) {
                            if (typeof args[0] !== "object")
                                throw new Error("OversizedElementBin: Wrong parameters");
                            const rect = args[0];
                            this.rects = [rect];
                            this.width = rect.width;
                            this.height = rect.height;
                            this.data = rect.data;
                            rect.oversized = true;
                        }
                        else {
                            this.width = args[0];
                            this.height = args[1];
                            this.data = args.length > 2 ? args[2] : null;
                            const rect = new Rectangle(this.width, this.height);
                            rect.oversized = true;
                            rect.data = this.data;
                            this.rects.push(rect);
                        }
                        this.freeRects = [];
                        this.maxWidth = this.width;
                        this.maxHeight = this.height;
                        this.options = { smart: false, pot: false, square: false };
                    }
                    add() {
                        return undefined;
                    }
                    reset(deepReset = false) {
                    }
                    repack() {
                        return undefined;
                    }
                    clone() {
                        let clonedBin = new OversizedElementBin(this.rects[0]);
                        return clonedBin;
                    }
                }
                MaxRectsAlgorithm.OversizedElementBin = OversizedElementBin;
                MaxRectsAlgorithm.EDGE_MAX_VALUE = 4096;
                MaxRectsAlgorithm.EDGE_MIN_VALUE = 128;
                let PACKING_LOGIC;
                (function (PACKING_LOGIC) {
                    PACKING_LOGIC[PACKING_LOGIC["MAX_AREA"] = 0] = "MAX_AREA";
                    PACKING_LOGIC[PACKING_LOGIC["MAX_EDGE"] = 1] = "MAX_EDGE";
                })(PACKING_LOGIC = MaxRectsAlgorithm.PACKING_LOGIC || (MaxRectsAlgorithm.PACKING_LOGIC = {}));
                class MaxRectsPacker {
                    width;
                    height;
                    padding;
                    bins;
                    options = {
                        smart: true,
                        pot: true,
                        square: false,
                        allowRotation: false,
                        tag: false,
                        exclusiveTag: true,
                        border: 1,
                        logic: PACKING_LOGIC.MAX_EDGE,
                    };
                    constructor(width = MaxRectsAlgorithm.EDGE_MAX_VALUE, height = MaxRectsAlgorithm.EDGE_MAX_VALUE, padding = 2, options = {}) {
                        this.width = width;
                        this.height = height;
                        this.padding = padding;
                        this.bins = [];
                        this.options = { ...this.options, ...options };
                    }
                    add(...args) {
                        if (args.length === 1) {
                            if (typeof args[0] !== "object")
                                throw new Error("MacrectsPacker.add(): Wrong parameters");
                            const rect = args[0];
                            if (rect.width > this.width || rect.height > this.height) {
                                this.bins.push(new OversizedElementBin(rect));
                            }
                            else {
                                let added = this.bins.slice(this._currentBinIndex).find((bin) => bin.add(rect) !== undefined);
                                if (!added) {
                                    let bin = new MaxRectsBin(this.width, this.height, this.padding, this.options);
                                    let tag = rect.data && rect.data.tag ? rect.data.tag : rect.tag ? rect.tag : undefined;
                                    if (this.options.tag && tag)
                                        bin.tag = tag;
                                    bin.add(rect);
                                    this.bins.push(bin);
                                }
                            }
                            return rect;
                        }
                        else {
                            const rect = new Rectangle(args[0], args[1]);
                            if (args.length > 2)
                                rect.data = args[2];
                            if (rect.width > this.width || rect.height > this.height) {
                                this.bins.push(new OversizedElementBin(rect));
                            }
                            else {
                                let added = this.bins.slice(this._currentBinIndex).find((bin) => bin.add(rect) !== undefined);
                                if (!added) {
                                    let bin = new MaxRectsBin(this.width, this.height, this.padding, this.options);
                                    if (this.options.tag && rect.data.tag)
                                        bin.tag = rect.data.tag;
                                    bin.add(rect);
                                    this.bins.push(bin);
                                }
                            }
                            return rect;
                        }
                    }
                    addArray(rects) {
                        if (!this.options.tag || this.options.exclusiveTag) {
                            this.sort(rects, this.options.logic).forEach((rect) => this.add(rect));
                        }
                        else {
                            if (rects.length === 0)
                                return;
                            rects.sort((a, b) => {
                                const aTag = a.data && a.data.tag ? a.data.tag : a.tag ? a.tag : undefined;
                                const bTag = b.data && b.data.tag ? b.data.tag : b.tag ? b.tag : undefined;
                                return bTag === undefined ? -1 : aTag === undefined ? 1 : bTag > aTag ? -1 : 1;
                            });
                            let currentTag;
                            let currentIdx = 0;
                            let targetBin = this.bins.slice(this._currentBinIndex).find((bin, binIndex) => {
                                let testBin = bin.clone();
                                for (let i = currentIdx; i < rects.length; i++) {
                                    const rect = rects[i];
                                    const tag = rect.data && rect.data.tag ? rect.data.tag : rect.tag ? rect.tag : undefined;
                                    if (i === 0)
                                        currentTag = tag;
                                    if (tag !== currentTag) {
                                        currentTag = tag;
                                        this.sort(rects.slice(currentIdx, i), this.options.logic).forEach((r) => bin.add(r));
                                        currentIdx = i;
                                        this.addArray(rects.slice(i));
                                        return true;
                                    }
                                    if (tag === undefined) {
                                        this.sort(rects.slice(i), this.options.logic).forEach((r) => this.add(r));
                                        currentIdx = rects.length;
                                        return true;
                                    }
                                    if (testBin.add(rect) === undefined) {
                                        this.sort(rects.slice(currentIdx, i), this.options.logic).forEach((r) => bin.add(r));
                                        currentIdx = i;
                                        return false;
                                    }
                                }
                                this.sort(rects.slice(currentIdx), this.options.logic).forEach((r) => bin.add(r));
                                return true;
                            });
                            if (!targetBin) {
                                const rect = rects[currentIdx];
                                const bin = new MaxRectsBin(this.width, this.height, this.padding, this.options);
                                const tag = rect.data && rect.data.tag ? rect.data.tag : rect.tag ? rect.tag : undefined;
                                if (this.options.tag && this.options.exclusiveTag && tag)
                                    bin.tag = tag;
                                this.bins.push(bin);
                                bin.add(rect);
                                currentIdx++;
                                this.addArray(rects.slice(currentIdx));
                            }
                        }
                    }
                    reset() {
                        this.bins = [];
                        this._currentBinIndex = 0;
                    }
                    repack(quick = true) {
                        if (quick) {
                            let unpack = [];
                            for (let bin of this.bins) {
                                if (bin.dirty) {
                                    let up = bin.repack();
                                    if (up)
                                        unpack.push(...up);
                                }
                            }
                            this.addArray(unpack);
                            return;
                        }
                        if (!this.dirty)
                            return;
                        const allRects = this.rects;
                        this.reset();
                        this.addArray(allRects);
                    }
                    next() {
                        this._currentBinIndex = this.bins.length;
                        return this._currentBinIndex;
                    }
                    load(bins) {
                        bins.forEach((bin, index) => {
                            if (bin.maxWidth > this.width || bin.maxHeight > this.height) {
                                this.bins.push(new OversizedElementBin(bin.width, bin.height, {}));
                            }
                            else {
                                let newBin = new MaxRectsBin(this.width, this.height, this.padding, bin.options);
                                newBin.freeRects.splice(0);
                                bin.freeRects.forEach((r, i) => {
                                    newBin.freeRects.push(new Rectangle(r.width, r.height, r.x, r.y));
                                });
                                newBin.width = bin.width;
                                newBin.height = bin.height;
                                if (bin.tag)
                                    newBin.tag = bin.tag;
                                this.bins[index] = newBin;
                            }
                        }, this);
                    }
                    save() {
                        let saveBins = [];
                        this.bins.forEach((bin) => {
                            let saveBin = {
                                width: bin.width,
                                height: bin.height,
                                maxWidth: bin.maxWidth,
                                maxHeight: bin.maxHeight,
                                freeRects: [],
                                rects: [],
                                options: bin.options,
                            };
                            if (bin.tag)
                                saveBin = { ...saveBin, tag: bin.tag };
                            bin.freeRects.forEach((r) => {
                                saveBin.freeRects.push({
                                    x: r.x,
                                    y: r.y,
                                    width: r.width,
                                    height: r.height,
                                });
                            });
                            saveBins.push(saveBin);
                        });
                        return saveBins;
                    }
                    sort(rects, logic = PACKING_LOGIC.MAX_EDGE) {
                        return rects.slice().sort((a, b) => {
                            const result = logic === PACKING_LOGIC.MAX_EDGE ? Math.max(b.width, b.height) - Math.max(a.width, a.height) : b.width * b.height - a.width * a.height;
                            if (result === 0 && a.hash && b.hash) {
                                return a.hash > b.hash ? -1 : 1;
                            }
                            else
                                return result;
                        });
                    }
                    _currentBinIndex = 0;
                    get currentBinIndex() {
                        return this._currentBinIndex;
                    }
                    get dirty() {
                        return this.bins.some((bin) => bin.dirty);
                    }
                    get rects() {
                        let allRects = [];
                        for (let bin of this.bins) {
                            allRects.push(...bin.rects);
                        }
                        return allRects;
                    }
                }
                MaxRectsAlgorithm.MaxRectsPacker = MaxRectsPacker;
            })(MaxRectsAlgorithm = Third.MaxRectsAlgorithm || (Third.MaxRectsAlgorithm = {}));
        })(Third = Script.Third || (Script.Third = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
