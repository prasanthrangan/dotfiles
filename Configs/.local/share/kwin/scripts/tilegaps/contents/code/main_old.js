/*
KWin Script Tile Gaps
(C) 2021 Natalie Clarius <natalie_clarius@yahoo.de>
GNU General Public License v3.0
*/


///////////////////////
// configuration
///////////////////////

const config = {
    // size of gap to screen edges
    gapTop:    readConfig("gapTop",    12),
    gapLeft:   readConfig("gapLeft",   12),
    gapRight:  readConfig("gapRight",  12),
    gapBottom: readConfig("gapBottom", 12),
    // size of gap between windows
    gapMid:    readConfig("gapMid",    12),
    // offsets from floating panels
    offsetTop:    readConfig("offsetTop",    0),
    offsetLeft:   readConfig("offsetLeft",   0),
    offsetRight:  readConfig("offsetRight",  0),
    offsetBottom: readConfig("offsetBottom", 0),
    // whether to apply gaps on centered and maximized windows
    includeCentered:  readConfig("includeCentered",  true),
    includeMaximized: readConfig("includeMaximized", false),
    // divergence margin within which windows are still considered tiled
    tolerance: readConfig("tolerance", 24),
    // list of excluded/included applications
    excludeMode:  readConfig("excludeMode",  true),
    includeMode:  readConfig("includeMode",  false),
    excludedApps: readConfig("excludedApps", "").split(", "),
    includedApps: readConfig("includedApps", "").split(", ")
};


///////////////////////
// initialization
///////////////////////

debugMode = false;
function debug(...args) {if (debugMode) console.debug("Tile Gaps:", ...args);}
debug("intializing");
debug("gap sizes (t/l/r/b/m):", config.gapTop, config.gapLeft, config.gapRight, config.gapBottom, config.gapMid);
debug("gap layout:", "centered:", config.includeCentered, "maximized:", config.includeMaximized, "tolerance", config.tolerance);
debug("applications:", "exclude:", config.excludeMode, String(config.excludedApps), "include:", config.includeMode, String(config.includedApps));
console.debug("");


///////////////////////
// set up triggers
///////////////////////

// trigger applying tile gaps when client is initially present or added
workspace.clientList().forEach(client => onAdded(client));
workspace.clientAdded.connect(onAdded);
function onAdded(client) {
    tileGaps(client);

    // trigger applying tile gaps when client is moved or resized
    client.geometryChanged.connect(tileGaps);
    client.clientGeometryChanged.connect(tileGaps);
    client.frameGeometryChanged.connect(tileGaps);
    client.clientFinishUserMovedResized.connect(tileGaps);
    client.moveResizedChanged.connect(tileGaps);
    client.fullScreenChanged.connect(tileGaps);
    client.clientMaximizedStateChanged.connect(tileGaps);
    client.screenChanged.connect(tileGaps);
    client.desktopChanged.connect(tileGaps);
}

// trigger reapplying tile gaps for all windows when screen geometry changes
workspace.currentDesktopChanged.connect(tileGapsAll);
workspace.desktopPresenceChanged.connect(tileGapsAll);
workspace.numberDesktopsChanged.connect(tileGapsAll);
workspace.numberScreensChanged.connect(tileGapsAll);
workspace.screenResized.connect(tileGapsAll);
workspace.currentActivityChanged.connect(tileGapsAll);
workspace.activitiesChanged.connect(tileGapsAll);
workspace.virtualScreenSizeChanged.connect(tileGapsAll);
workspace.virtualScreenGeometryChanged.connect(tileGapsAll);
workspace.clientAdded.connect(function(client) {if (client.dock) tileGapsAll();});
function tileGapsAll() {
    workspace.clientList().forEach(client => tileGaps(client));
}


///////////////////////
// get area geometry
///////////////////////

// available screen area
function getArea(client) {
    var clientArea = workspace.clientArea(KWin.MaximizeArea, client);
    return {
        x: clientArea.x + config.offsetLeft,
        y: clientArea.y + config.offsetTop,
        width: clientArea.width - config.offsetLeft - config.offsetRight,
        height: clientArea.height - config.offsetTop - config.offsetBottom
    };
}

// anchor coordinates without and with gaps
function getGrid(client) {
    var area = getArea(client);
    return {
        // x
        left: {
            closed: area.x,
            gapped: area.x + config.gapLeft
        },
        midH: {
            closed: area.x + area.width/4,
            gapped: area.x + (area.width + config.gapLeft - config.gapRight + config.gapMid)/4
        },
        right: {
            closed: area.x + area.width/2,
            gapped: area.x + (area.width + config.gapLeft - config.gapRight + config.gapMid)/2
        },
        // y
        top: {
            closed: area.y,
            gapped: area.y + config.gapTop
        },
        midV: {
            closed: area.y + area.height/4,
            gapped: area.y + (area.height + config.gapTop - config.gapBottom + config.gapMid)/4
        },
        bottom: {
            closed: area.y + area.height/2,
            gapped: area.y + (area.height + config.gapTop - config.gapBottom + config.gapMid)/2
        },
        // width
        fullWidth: {
            closed: area.width,
            gapped: area.width - config.gapLeft - config.gapRight
        },
        halfWidth: {
            closed: area.width/2,
            gapped: (area.width - config.gapLeft - config.gapRight - config.gapMid)/2
        },
        // height
        fullHeight: {
            closed: area.height,
            gapped: area.height - config.gapTop - config.gapBottom
        },
        halfHeight: {
            closed: area.height/2,
            gapped: (area.height - config.gapTop - config.gapBottom - config.gapMid)/2
        }
    };
}

// coordinates for each tile
// to do: do this more elegantly?
function getTiles(client) {
    var grid = getGrid(client);
    var tiles = {
        full: {
            x: grid.left,
            y: grid.top,
            width: grid.fullWidth,
            height: grid.fullHeight
        },
        halfLeft: {
            x: grid.left,
            y: grid.top,
            width: grid.halfWidth,
            height: grid.fullHeight
        },
        halfHCenter: {
            x: grid.midH,
            y: grid.top,
            width: grid.halfWidth,
            height: grid.fullHeight
        },
        halfRight: {
            x: grid.right,
            y: grid.top,
            width: grid.halfWidth,
            height: grid.fullHeight
        },
        halfTop: {
            x: grid.left,
            y: grid.top,
            width: grid.fullWidth,
            height: grid.halfHeight
        },
        halfVCenter: {
            x: grid.left,
            y: grid.midV,
            width: grid.fullWidth,
            height: grid.halfHeight
        },
        halfBottom: {
            x: grid.left,
            y: grid.bottom,
            width: grid.fullWidth,
            height: grid.halfHeight
        },
        quarterLeftTop: {
            x: grid.left,
            y: grid.top,
            width: grid.halfWidth,
            height: grid.halfHeight
        },
        quarterCenterTop: {
            x: grid.midH,
            y: grid.top,
            width: grid.halfWidth,
            height: grid.halfHeight
        },
        quarterRightTop: {
            x: grid.right,
            y: grid.top,
            width: grid.halfWidth,
            height: grid.halfHeight
        },
        quarterLeftCenter: {
            x: grid.left,
            y: grid.midV,
            width: grid.halfWidth,
            height: grid.halfHeight
        },
        quarterCenterCenter: {
            x: grid.midH,
            y: grid.midV,
            width: grid.halfWidth,
            height: grid.halfHeight
        },
        quarterRightCenter: {
            x: grid.right,
            y: grid.midV,
            width: grid.halfWidth,
            height: grid.halfHeight
        },
        quarterLeftBottom: {
            x: grid.left,
            y: grid.bottom,
            width: grid.halfWidth,
            height: grid.halfHeight
        },
        quarterCenterBottom: {
            x: grid.midH,
            y: grid.bottom,
            width: grid.halfWidth,
            height: grid.halfHeight
        },
        quarterRightBottom: {
            x: grid.right,
            y: grid.bottom,
            width: grid.halfWidth,
            height: grid.halfHeight
        }
    };
    // filter out centered tiles if disabled
    if (!config.includeCentered) tiles = Object.keys(tiles)
      .filter(label => !(String(label).includes("Center")))
      .reduce((obj, label) => {
          obj[label] = tiles[label];
          return obj;
        }, {});
    // filter out maximized tile if disabled
    if (!config.includeMaximized) tiles = Object.keys(tiles)
      .filter(label => !(String(label).includes("full")))
      .reduce((obj, label) => {
          obj[label] = tiles[label];
          return obj;
        }, {});
    return tiles;
}

// window is considered tiled iff on all coordinates the difference between the actual and the expected geometry is within the tolerated divergence margin
function near(actual, expected) {
    return Object.keys(expected).every(coord =>
        Math.abs(actual[coord] - expected[coord]) <= config.tolerance);
}


///////////////////////
// make tile gaps
///////////////////////

// make tile gaps for given window
function tileGaps(win) {
    // get window to be gapped
    // if no window is provided, default to active window
    if (win == null) win = workspace.activeClient;
    // don't act on non-normal windows, fullscreen windows or windows that are still undergoing geometry change
    if (win == undefined || win == null || !win.normalWindow || win.fullScreen || win.move || win.resize) return;
    // don't act on excluded or non-included windows
    if ((config.excludeMode && config.excludedApps.includes(String(win.resourceClass)))
    || (config.includeMode && !(config.includedApps.includes(String(win.resourceClass)))))
         return;
    debug("gaps for", win.caption);
    debug("window geometry", ...Object.values(win.geometry));
    debug("area geometry", ...Object.values(getArea(win)));

    // iterate possible tiles
    var tiles = getTiles(win);
    for (var i = 0; i < Object.keys(tiles).length; i++) {
        // tile label
        var tile = {label: Object.keys(tiles)[i]};
        // tile coordinates
        coords = tiles[tile.label];
        // tile coordinates for layout without gaps (where windows are snapped to initially)
        tile.closed = {geometry:
            Object.keys(coords).reduce(function(obj, coord) {
                obj[coord] = coords[coord].closed;
                return obj;
            }, {})};
        // tile coordinates for layout with gaps (where windows should be reshaped to subsequently)
        tile.gapped = {geometry:
            Object.keys(coords).reduce(function(obj, coord) {
                obj[coord] = coords[coord].gapped;
                return obj;
            }, {})};

        // check if the window is approximately tiled there
        if (near(win.geometry, tile.closed.geometry)) {
            // window is tiled: apply gapped geometry
            debug("gapping", tile.label, ...Object.values(tile.gapped.geometry), "\n");
            win.geometry = tile.gapped.geometry;
            return;
        }
    }
    // window's geometry doesn't approximately match any possible tile: don't gap
    debug("not tiled\n");
 }
