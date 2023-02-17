/***************************************************************************
 *   Copyright 2013 Sebastian Kügler <sebas@kde.org>                       *
 *   Copyright 2014, 2016 Kai Uwe Broulik <kde@privat.broulik.de>          *
 *   Copyright 2020 Ismael Asensio <isma.af@gmail.com>                     *
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
import QtQuick.Layouts 1.2
import org.kde.plasma.core 2.0 as PlasmaCore
import org.kde.plasma.components 3.0 as PlasmaComponents3


ColumnLayout {
    id: trackInfo

    property alias textAlignment: mainLabel.horizontalAlignment
    property bool oneLiner: false

    readonly property int implicitWidht: (oneLiner) ? mainLabel.implicitWidht
                                                    : Math.max(mainLabel.implicitWidht, secondLabel.implicitWidht)

    readonly property string album: {
        var metadata = root.currentMetadata

        if (!metadata) {
            return ""
        }
        var xesamAlbum = metadata["xesam:album"]
        if (xesamAlbum) {
            return xesamAlbum
        }

        // if we play a local file without title and artist, show its containing folder instead
        if (metadata["xesam:title"] || root.artist) {
            return ""
        }

        var xesamUrl = (metadata["xesam:url"] || "").toString()
        if (xesamUrl.indexOf("file:///") !== 0) { // "!startsWith()"
            return ""
        }

        var urlParts = xesamUrl.split("/")
        if (urlParts.length < 3) {
            return ""
        }

        var lastFolderPath = urlParts[urlParts.length - 2] // last would be filename
        if (lastFolderPath) {
            return lastFolderPath
        }

        return ""
    }

    PlasmaComponents3.Label {
        id: mainLabel
        Layout.fillWidth: true
        horizontalAlignment: Text.AlignHCenter

        maximumLineCount: 1
        elide: Text.ElideRight
        text: {
            if (!root.track) {
                return i18n("No media playing")
            }
            if (oneLiner && root.artist) {
                return i18nc("artist – track", "%1 – %2", root.artist, root.track)
            }
            return root.track
        }
        textFormat: Text.PlainText
    }

    PlasmaComponents3.Label {
        id: secondLabel
        Layout.fillWidth: true

        opacity: 0.6
        horizontalAlignment: textAlignment
        wrapMode: Text.NoWrap
        elide: Text.ElideRight
        visible: !oneLiner && text.length > 0
        text: {
            if (!album) { return root.artist }
            if (!root.artist) { return album }
            return i18nc("artist / album", "%1 / %2", root.artist, album)
        }
        textFormat: Text.PlainText
    }
}
