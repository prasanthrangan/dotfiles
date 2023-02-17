/***************************************************************************
 *   Copyright 2013 Sebastian Kügler <sebas@kde.org>                       *
 *   Copyright 2014, 2016 Kai Uwe Broulik <kde@privat.broulik.de>          *
 *                                                                         *
 *   This program is free software; you can redistribute it and/or modify  *
 *   it under the terms of the GNU Library General Public License as       *
 *   published by the Free Software Foundation; either version 2 of the    *
 *   License, or (at your option) any later version.                       *
 *                                                                         *
 *   This program is distributed in the hope that it will be useful,       *
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of        *
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
 *   GNU Library General Public License for more details.                  *
 *                                                                         *
 *   You should have received a copy of the GNU Library General Public     *
 *   License along with this program; if not, write to the                 *
 *   Free Software Foundation, Inc.,                                       *
 *   51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA .        *
 ***************************************************************************/

import QtQuick 2.4
import org.kde.plasma.core 2.0 as PlasmaCore


Item {

    readonly property real aspectRatio: albumArt.visible ? (albumArt.paintedWidth / albumArt.paintedHeight) : 1.0

    PlasmaCore.IconItem {
        anchors {
            horizontalCenter: parent.horizontalCenter
            verticalCenter: parent.verticalCenter
        }

        height: Math.min(parent.height, Math.max(PlasmaCore.Units.iconSizes.large, Math.round(parent.height / 2)))
        width: height

        source: mpris2Source.currentData["Desktop Icon Name"]
        visible: !albumArt.visible

        usesPlasmaTheme: false
    }

    Image {
        id: albumArt
        anchors {
            fill: parent
        }

        source: processArtUrl(root.albumArt)
        asynchronous: true
        fillMode: Image.PreserveAspectFit
        sourceSize: Qt.size(512, 512)
        visible: !!root.track && status === Image.Ready
    }

    // HACK: Spotify has changed the base URL of their album art images
    // but hasn't updated the URL reported by the MPRIS service
    // https://community.spotify.com/t5/Desktop-Linux/MPRIS-cover-art-url-file-not-found/td-p/4920104
    function processArtUrl(url) {
        let SPOTIFY_OLD_URL = "https://open.spotify.com"
        let SPOTIFY_NEW_URL = "https://i.scdn.co"

        if (url.startsWith(SPOTIFY_OLD_URL)) {
            return url.replace(SPOTIFY_OLD_URL, SPOTIFY_NEW_URL)
        }
        return url
    }
}
