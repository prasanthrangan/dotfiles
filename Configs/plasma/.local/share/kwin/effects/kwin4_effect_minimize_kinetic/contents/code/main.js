/*
 * Copyright (C) 2018 Vlad Zagorodniy <vladzzag@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

function interpolate(from, to, t) {
    return from * (1 - t) + to * t;
}

function morphRect(fromRect, toRect, t) {
    var targetScale = (toRect.width > toRect.height)
        ? toRect.width / fromRect.width
        : toRect.height / fromRect.height;
    var toCenter = {
        x: toRect.x + toRect.width / 2,
        y: toRect.y + toRect.height / 2
    };

    var targetRect = {
        x: toCenter.x - targetScale * fromRect.width / 2,
        y: toCenter.y - targetScale * fromRect.height / 2,
        width: targetScale * fromRect.width,
        height: targetScale * fromRect.height
    };

    var morphedRect = {
        x: interpolate(fromRect.x, targetRect.x, t),
        y: interpolate(fromRect.y, targetRect.y, t),
        width: interpolate(fromRect.width, targetRect.width, t),
        height: interpolate(fromRect.height, targetRect.height, t)
    };

    return morphedRect;
}

var minimizeScaleEffect = {
    duration: animationTime(317),
    minimizeScale: 0.05,
    unminimizeScale: 0.05,
    slotWindowMinimized: function (window) {
        "use strict";
        var iconRect = window.iconGeometry;
        if (iconRect.width == 0 || iconRect.height == 0) {
            return;
        }

        var windowRect = window.geometry;
        if (windowRect.width == 0 || windowRect.height == 0) {
            return;
        }

        if (window.unminimizeAnimation) {
            cancel(window.unminimizeAnimation);
            delete window.unminimizeAnimation;
        }

        var targetRect = morphRect(windowRect, iconRect, 1.0 - minimizeScaleEffect.minimizeScale);

        window.minimizeAnimation = animate({
            window: window,
            duration: minimizeScaleEffect.duration,
            animations: [
                {
                    type: Effect.Size,
                    from: {
                        value1: windowRect.width + 0.3 * (targetRect.width - windowRect.width),
                        value2: windowRect.height + 0.3 * (targetRect.height - windowRect.height)
                    },
                    to: {
                        value1: targetRect.width,
                        value2: targetRect.height
                    },
                    curve: QEasingCurve.OutExpo
                },
                {
                    type: Effect.Translation,
                    from: {
                        value1: 0.3 * (targetRect.x - windowRect.x - (windowRect.width - targetRect.width) / 2),
                        value2: 0.3 * (targetRect.y - windowRect.y - (windowRect.height - targetRect.height) / 2)
                    },
                    to: {
                        value1: targetRect.x - windowRect.x - (windowRect.width - targetRect.width) / 2,
                        value2: targetRect.y - windowRect.y - (windowRect.height - targetRect.height) / 2
                    },
                    curve: QEasingCurve.OutExpo
                },
                {
                    type: Effect.Opacity,
                    from: 0.9,
                    to: 0.0,
                    curve: QEasingCurve.OutQuad,
                }
            ]
        });
    },
    slotWindowUnminimized: function (window) {
        "use strict";
        var iconRect = window.iconGeometry;
        if (iconRect.width == 0 || iconRect.height == 0) {
            return;
        }

        var windowRect = window.geometry;
        if (windowRect.width == 0 || windowRect.height == 0) {
            return;
        }

        if (window.minimizeAnimation) {
            cancel(window.minimizeAnimation);
            delete window.minimizeAnimation;
        }

        var targetRect = morphRect(windowRect, iconRect, 1.0 - minimizeScaleEffect.unminimizeScale);

        window.unminimizeAnimation = animate({
            window: window,
            curve: QEasingCurve.OutExpo,
            duration: minimizeScaleEffect.duration,
            animations: [
                {
                    type: Effect.Size,
                    from: {
                        value1: targetRect.width + 0.3 * (windowRect.width - targetRect.width),
                        value2: targetRect.height + 0.3 * (windowRect.height - targetRect.height)
                    },
                    to: {
                        value1: windowRect.width,
                        value2: windowRect.height
                    }
                },
                {
                    type: Effect.Translation,
                    from: {
                        value1: 0.7 * (targetRect.x - windowRect.x - (windowRect.width - targetRect.width) / 2),
                        value2: 0.7 * (targetRect.y - windowRect.y - (windowRect.height - targetRect.height) / 2)
                    },
                    to: {
                        value1: 0.0,
                        value2: 0.0
                    }
                },
                {
                    type: Effect.Opacity,
                    from: 0.1,
                    to: 1.0,
                    curve: QEasingCurve.Linear,
                    duration: 150
                }
            ]
        });
    },
    init: function () {
        "use strict";
        effects.windowMinimized.connect(minimizeScaleEffect.slotWindowMinimized);
        effects.windowUnminimized.connect(minimizeScaleEffect.slotWindowUnminimized);
        }
};

minimizeScaleEffect.init();
