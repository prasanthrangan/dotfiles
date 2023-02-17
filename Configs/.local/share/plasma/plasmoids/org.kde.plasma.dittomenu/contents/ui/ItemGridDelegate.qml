/***************************************************************************
 *   Copyright (C) 2015 by Eike Hein <hein@kde.org>                        *
 *                                                                         *
 *   This program is free software; you can redistribute it and/or modify  *
 *   it under the terms of the GNU General Public License as published by  *
 *   the Free Software Foundation; either version 2 of the License, or     *
 *   (at your option) any later version.                                   *
 *                                                                         *
 *   This program is distributed in the hope that it will be useful,       *
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of        *
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
 *   GNU General Public License for more details.                          *
 *                                                                         *
 *   You should have received a copy of the GNU General Public License     *
 *   along with this program; if not, write to the                         *
 *   Free Software Foundation, Inc.,                                       *
 *   51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA .        *
 ***************************************************************************/

import QtQuick 2.0

import org.kde.plasma.core 2.0 as PlasmaCore
import org.kde.plasma.components 2.0 as PlasmaComponents

import "../code/tools.js" as Tools

Item {
    id: item

    width:  GridView.view.cellWidth
    height: GridView.view.cellHeight

    property bool showLabel: true

    property int itemIndex: model.index
    property string favoriteId: model.favoriteId !== undefined ? model.favoriteId : ""
    property url url: model.url !== undefined ? model.url : ""
    property variant icon: model.decoration !== undefined ? model.decoration : ""
    property var m: model
    property bool hasActionList: ((model.favoriteId !== null)
                                  || (("hasActionList" in model) && (model.hasActionList === true)))

    Accessible.role: Accessible.MenuItem
    Accessible.name: model.display

    function openActionMenu(x, y) {
        var actionList = hasActionList ? model.actionList : [];
        Tools.fillActionMenu(i18n, actionMenu, actionList, GridView.view.model.favoritesModel, model.favoriteId);
        actionMenu.visualParent = item;
        actionMenu.open(x, y);
    }

    function actionTriggered(actionId, actionArgument) {
        var close = (Tools.triggerAction(plasmoid, GridView.view.model, model.index, actionId, actionArgument) === true);
        if (close) root.toggle();
    }

    Item{
        height: iconSize + units.gridUnit * 2 + units.smallSpacing
        width: parent.width
        anchors.centerIn: parent

        PlasmaCore.IconItem {
            id: icon
            anchors{
                top: parent.top
                horizontalCenter: parent.horizontalCenter
            }
            width: root.iconSize
            height: width
            colorGroup: PlasmaCore.Theme.ComplementaryColorGroup
            animated: false
            usesPlasmaTheme: item.GridView.view.usesPlasmaTheme
            source: model.decoration
        }

        PlasmaComponents.Label {
            id: label
            visible: showLabel
            anchors {
                top: icon.bottom
                topMargin: units.smallSpacing
                horizontalCenter: parent.horizontalCenter
            }
            maximumLineCount: plasmoid.configuration.labels2lines ? 2 : 1
            horizontalAlignment: Text.AlignHCenter
            width: parent.width - units.largeSpacing
            height: units.gridUnit * 2
            elide: Text.ElideRight
            wrapMode: Text.Wrap
            color: theme.textColor
            text: ("name" in model ? model.name : model.display)
        }
    }
    PlasmaCore.ToolTipArea {
        id: toolTip
        property string text: model.display
        anchors.fill: parent
        active: root.visible && label.truncated
        mainItem: toolTipDelegate
        onContainsMouseChanged: item.GridView.view.itemContainsMouseChanged(containsMouse)
    }

    Keys.onPressed: {
        if (event.key === Qt.Key_Menu && hasActionList) {
            event.accepted = true;
            openActionMenu(item);
        } else if ((event.key === Qt.Key_Enter || event.key === Qt.Key_Return)) {
            event.accepted = true;
            if ("trigger" in GridView.view.model) {
                GridView.view.model.trigger(index, "", null);
                root.toggle();
            }

            itemGrid.itemActivated(index, "", null);
        }
    }
}
