/***************************************************************************
 *   Copyright (C) 2014 by Weng Xuetian <wengxt@gmail.com>
 *   Copyright (C) 2013-2017 by Eike Hein <hein@kde.org>                   *
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

import QtQuick 2.4
import QtQuick.Layouts 1.1
import org.kde.plasma.plasmoid 2.0
import org.kde.plasma.core 2.0 as PlasmaCore
import org.kde.plasma.components 2.0 as PlasmaComponents
import org.kde.plasma.components 3.0 as PlasmaComponents3

import org.kde.plasma.extras 2.0 as PlasmaExtras

import org.kde.plasma.private.kicker 0.1 as Kicker
import org.kde.kcoreaddons 1.0 as KCoreAddons // kuser
import org.kde.plasma.private.shell 2.0

import org.kde.kwindowsystem 1.0
import QtGraphicalEffects 1.0
import org.kde.kquickcontrolsaddons 2.0
import org.kde.plasma.private.quicklaunch 1.0

import QtQuick.Controls 2.12

Item{

    id: main
    property int sizeImage: units.iconSizes.large * 2

    onVisibleChanged: {
        root.visible = !root.visible
    }

    PlasmaCore.Dialog {
        id: root

        objectName: "popupWindow"
        //flags: Qt.Window
        flags: Qt.WindowStaysOnTopHint
        location: PlasmaCore.Types.Floating
        hideOnWindowDeactivate: true

        property int iconSize: units.iconSizes.large
        property int cellSize: iconSize
                               + units.gridUnit * 2
                               + (2 * Math.max(highlightItemSvg.margins.top + highlightItemSvg.margins.bottom,
                                               highlightItemSvg.margins.left + highlightItemSvg.margins.right))
        property bool searching: (searchField.text != "")

        property bool showFavorites

        onVisibleChanged: {
            reset();
            if (visible) {
                root.showFavorites = plasmoid.configuration.showFavoritesFirst
                var pos = popupPosition(width, height);
                x = pos.x;
                y = pos.y;
                requestActivate();
                reset();
                animation1.start()

            }else{
                rootItem.opacity = 0
            }
        }

        onHeightChanged: {
            var pos = popupPosition(width, height);
            x = pos.x;
            y = pos.y;
        }

        onWidthChanged: {
            var pos = popupPosition(width, height);
            x = pos.x;
            y = pos.y;
        }

        function toggle(){
            main.visible =  !main.visible
        }

        function reset() {
            searchField.text = "";
            globalFavoritesGrid.model = globalFavorites
            allAppsGrid.model = rootModel.modelForRow(0);

            if(showFavorites)
                globalFavoritesGrid.tryActivate(0,0)
            else
                mainColumn.visibleGrid.tryActivate(0,0)


        }

        function popupPosition(width, height) {
            var screenAvail = plasmoid.availableScreenRect;
            var screenGeom = plasmoid.screenGeometry;

            var screen = Qt.rect(screenAvail.x + screenGeom.x,
                                 screenAvail.y + screenGeom.y,
                                 screenAvail.width,
                                 screenAvail.height);


            var offset = units.smallSpacing

            // Fall back to bottom-left of screen area when the applet is on the desktop or floating.
            var x = offset;
            var y = screen.height - height - offset;
            var appletTopLeft;
            var horizMidPoint;
            var vertMidPoint;


            if (plasmoid.configuration.displayPosition === 1) {
                horizMidPoint = screen.x + (screen.width / 2);
                vertMidPoint = screen.y + (screen.height / 2);
                x = horizMidPoint - width / 2;
                y = vertMidPoint - height / 2;
            } else if (plasmoid.configuration.displayPosition === 2) {
                horizMidPoint = screen.x + (screen.width / 2);
                vertMidPoint = screen.y + (screen.height / 2);
                x = horizMidPoint - width / 2;
                y = screen.y + screen.height - height - offset - panelSvg.margins.top;
            } else if (plasmoid.location === PlasmaCore.Types.BottomEdge) {
                horizMidPoint = screen.x + (screen.width / 2);
                appletTopLeft = parent.mapToGlobal(0, 0);
                x = (appletTopLeft.x < horizMidPoint) ? screen.x + offset : (screen.x + screen.width) - width - offset;
                y = screen.y + screen.height - height - offset - panelSvg.margins.top;
            } else if (plasmoid.location === PlasmaCore.Types.TopEdge) {
                horizMidPoint = screen.x + (screen.width / 2);
                var appletBottomLeft = parent.mapToGlobal(0, parent.height);
                x = (appletBottomLeft.x < horizMidPoint) ? screen.x + offset : (screen.x + screen.width) - width - offset;
                y = parent.height + panelSvg.margins.bottom + offset;
                y = screen.y + y + (plasmoid.configuration.viewUser ? main.sizeImage*0.5 : 0);
            } else if (plasmoid.location === PlasmaCore.Types.LeftEdge) {
                vertMidPoint = screen.y + (screen.height / 2);
                appletTopLeft = parent.mapToGlobal(0, 0);
                x = parent.width + panelSvg.margins.right + offset;
                y = (appletTopLeft.y < vertMidPoint) ? screen.y + offset : (screen.y + screen.height) - height - offset;
                y = screen.y + y + (plasmoid.configuration.viewUser ? main.sizeImage*0.5 : 0);
            } else if (plasmoid.location === PlasmaCore.Types.RightEdge) {
                vertMidPoint = screen.y + (screen.height / 2);
                appletTopLeft = parent.mapToGlobal(0, 0);
                x = appletTopLeft.x - panelSvg.margins.left - offset - width;
                y = (appletTopLeft.y < vertMidPoint) ? screen.y + offset : (screen.y + screen.height) - height - offset;
                y = screen.y + y + (plasmoid.configuration.viewUser ? main.sizeImage*0.5 : 0);
            }
            return Qt.point(x, y);
        }

        FocusScope {

            id: rootItem
            Layout.minimumWidth:  (root.cellSize *  plasmoid.configuration.numberColumns)+ units.largeSpacing
            Layout.maximumWidth:  (root.cellSize *  plasmoid.configuration.numberColumns)+ units.largeSpacing
            Layout.minimumHeight: (root.cellSize *  plasmoid.configuration.numberRows) + searchField.implicitHeight + (plasmoid.configuration.viewUser ? main.sizeImage*0.5 : units.largeSpacing * 1.5 ) +  units.largeSpacing * 6
            Layout.maximumHeight: (root.cellSize *  plasmoid.configuration.numberRows) + searchField.implicitHeight + (plasmoid.configuration.viewUser ? main.sizeImage*0.5 : units.largeSpacing * 1.5 ) +  units.largeSpacing * 6


            focus: true
            opacity: 0

            KCoreAddons.KUser {   id: kuser  }
            Logic {   id: logic }


            OpacityAnimator { id: animation1; target: rootItem; from: 0; to: 1; }

            PlasmaCore.DataSource {
                id: pmEngine
                engine: "powermanagement"
                connectedSources: ["PowerDevil", "Sleep States"]
                function performOperation(what) {
                    var service = serviceForSource("PowerDevil")
                    var operation = service.operationDescription(what)
                    service.startOperationCall(operation)
                }
            }

            PlasmaCore.DataSource {
                id: executable
                engine: "executable"
                connectedSources: []
                onNewData: {
                    var exitCode = data["exit code"]
                    var exitStatus = data["exit status"]
                    var stdout = data["stdout"]
                    var stderr = data["stderr"]
                    exited(sourceName, exitCode, exitStatus, stdout, stderr)
                    disconnectSource(sourceName)
                }
                function exec(cmd) {
                    if (cmd) {
                        connectSource(cmd)
                    }
                }
                signal exited(string cmd, int exitCode, int exitStatus, string stdout, string stderr)
            }

            PlasmaComponents.Highlight {
                id: delegateHighlight
                visible: false
                z: -1 // otherwise it shows ontop of the icon/label and tints them slightly
            }

            PlasmaExtras.Heading {
                id: dummyHeading
                visible: false
                width: 0
                level: 5
            }

            TextMetrics {
                id: headingMetrics
                font: dummyHeading.font
            }

            ActionMenu {
                id: actionMenu
                onActionClicked: visualParent.actionTriggered(actionId, actionArgument)
            }

            PlasmaCore.FrameSvgItem {
                id : headingSvg
                width: parent.width + backgroundSvg.margins.right + backgroundSvg.margins.left
                height:  root.cellSize * plasmoid.configuration.numberRows  + units.largeSpacing * 2 + backgroundSvg.margins.bottom - 1 //<>+ paginationBar.height
                y: globalFavoritesGrid.y - units.largeSpacing
                x: - backgroundSvg.margins.left
                imagePath: "widgets/plasmoidheading"
                prefix: "footer"
                opacity: 0.7
            }

            RowLayout{
                id: rowTop
                anchors {
                    left: parent.left
                    right: parent.right
                    top: parent.top
                    margins: units.smallSpacing
                    topMargin: units.largeSpacing / 2
                }

                PlasmaComponents3.ToolButton {
                    icon.name:  "configure"
                    onClicked: logic.openUrl("file:///usr/share/applications/systemsettings.desktop")
                    ToolTip.delay: 200
                    ToolTip.timeout: 1000
                    ToolTip.visible: hovered
                    ToolTip.text: i18n("System Preferences")
                }

                Item{
                    Layout.fillWidth: true
                }

                PlasmaComponents3.ToolButton {
                    icon.name:  "user-home"
                    onClicked: logic.openUrl("file:///usr/share/applications/org.kde.dolphin.desktop")
                    ToolTip.delay: 200
                    ToolTip.timeout: 1000
                    ToolTip.visible: hovered
                    ToolTip.text: i18n("User Home")
                }

                PlasmaComponents3.ToolButton {
                    icon.name:  "system-lock-screen"
                    onClicked: pmEngine.performOperation("lockScreen")
                    enabled: pmEngine.data["Sleep States"]["LockScreen"]
                    ToolTip.delay: 200
                    ToolTip.timeout: 1000
                    ToolTip.visible: hovered
                    ToolTip.text: i18nc("@action", "Lock Screen")
                }

                PlasmaComponents3.ToolButton {
                    icon.name:   "system-shutdown"
                    onClicked: pmEngine.performOperation("requestShutDown")
                    ToolTip.delay: 200
                    ToolTip.timeout: 1000
                    ToolTip.visible: hovered
                    ToolTip.text: i18nd("plasma_lookandfeel_org.kde.lookandfeel", "Leave ... ")
                }
            }

            PlasmaExtras.Heading {
                anchors {
                    top: rowTop.bottom
                    topMargin: units.largeSpacing
                    horizontalCenter: parent.horizontalCenter
                }
                level: 1
                color: theme.textColor
                text: i18n("Hi, ")+ kuser.fullName
                font.bold: true
                visible: plasmoid.configuration.viewUser
            }

            RowLayout {
                id: rowSearchField
                anchors{
                    top: plasmoid.configuration.viewUser ? parent.top : rowTop.bottom
                    topMargin: plasmoid.configuration.viewUser ? units.largeSpacing*3  + sizeImage/2 : units.largeSpacing/2
                    left: parent.left
                    right: parent.right
                    margins: units.smallSpacing
                }

                Item{
                    Layout.fillWidth: true
                }
                PlasmaComponents3.TextField {
                    id: searchField
                    Layout.fillWidth: true
                    placeholderText: i18n("Type here to search ...")
                    leftPadding: units.largeSpacing + units.iconSizes.small
                    text: ""
                    //clearButtonShown: true  // TODO: kubuntu 20.04
                    onTextChanged: {
                        runnerModel.query = text;
                    }

                    Keys.onPressed: {
                        if (event.key == Qt.Key_Down || event.key == Qt.Key_Tab || event.key == Qt.Key_Backtab) {
                            event.accepted = true;
                            if(root.showFavorites)
                                globalFavoritesGrid.tryActivate(0,0)
                            else
                                mainColumn.visibleGrid.tryActivate(0,0)
                        }
                    }

                    function backspace() {
                        if (!root.visible) {
                            return;
                        }
                        focus = true;
                        text = text.slice(0, -1);
                    }

                    function appendText(newText) {
                        if (!root.visible) {
                            return;
                        }
                        focus = true;
                        text = text + newText;
                    }
                    PlasmaCore.IconItem {
                        source: 'search'
                        anchors {
                            left: searchField.left
                            verticalCenter: searchField.verticalCenter
                            leftMargin: units.smallSpacing * 2

                        }
                        height: units.iconSizes.small
                        width: height
                    }

                }

                Item{
                    Layout.fillWidth: true
                }

                PlasmaComponents3.ToolButton {
                    id: btnFavorites
                    icon.name: 'favorites'
                    flat: !root.showFavorites
                    onClicked: {
                        searchField.text = ""
                        root.showFavorites = true
                    }
                    ToolTip.delay: 200
                    ToolTip.timeout: 1000
                    ToolTip.visible: hovered
                    ToolTip.text: i18n("Favorites")

                }
                PlasmaComponents3.ToolButton {
                    icon.name: "view-list-icons"
                    flat: root.showFavorites
                    onClicked: {
                        searchField.text = ""
                        root.showFavorites = false
                        //<>allAppsGrid.scrollBar.flickableItem.contentY = 0;
                    }
                    ToolTip.delay: 200
                    ToolTip.timeout: 1000
                    ToolTip.visible: hovered
                    ToolTip.text: i18n("All apps")
                }
            }

            //
            //
            //
            //
            //

            ItemGridView {
                id: globalFavoritesGrid
                visible: (plasmoid.configuration.showFavoritesFirst || root.showFavorites ) && !root.searching && root.showFavorites
                anchors {
                    top: rowSearchField.bottom
                    topMargin: units.largeSpacing * 2
                    left: parent.left
                    right: parent.right
                }

                width:  root.cellSize *  plasmoid.configuration.numberColumns + units.largeSpacing
                height: root.cellSize * plasmoid.configuration.numberRows
                focus: true
                cellWidth:   root.cellSize
                cellHeight:  root.cellSize
                iconSize:    root.iconSize                
                dragEnabled: true
                dropEnabled: true
                usesPlasmaTheme: true
                //verticalScrollBarPolicy: Qt.ScrollBarAlwaysOn
                onKeyNavUp: searchField.focus = true
                Keys.onPressed: {
                    if (event.key == Qt.Key_Tab) {
                        event.accepted = true;
                        searchField.focus = true
                    }
                }
            }

            //
            //
            //
            //
            //

            Item{
                id: mainGrids
                visible: (!plasmoid.configuration.showFavoritesFirst && !root.showFavorites ) || root.searching || !root.showFavorites //TODO

                anchors {
                    top: rowSearchField.bottom
                    topMargin: units.largeSpacing * 2
                    left: parent.left
                    right: parent.right

                }
                width: root.cellSize *  plasmoid.configuration.numberColumns + units.largeSpacing
                height: root.cellSize *  plasmoid.configuration.numberRows

                Item {
                    id: mainColumn
                    width: root.cellSize *  plasmoid.configuration.numberColumns + units.largeSpacing
                    height: root.cellSize * plasmoid.configuration.numberRows

                    property Item visibleGrid: allAppsGrid

                    function tryActivate(row, col) {
                        if (visibleGrid) {
                            visibleGrid.tryActivate(row, col);
                        }
                    }

                    ItemGridView {
                        id: allAppsGrid

                        width: root.cellSize *  plasmoid.configuration.numberColumns + units.largeSpacing
                        height: root.cellSize * plasmoid.configuration.numberRows

                        cellWidth:   root.cellSize
                        cellHeight:  root.cellSize
                        iconSize:    root.iconSize
                        enabled: (opacity == 1) ? 1 : 0
                        dropEnabled: false
                        dragEnabled: false
                        opacity: root.searching ? 0 : 1

                        onOpacityChanged: {
                            if (opacity == 1) {
                                allAppsGrid.scrollBar.flickableItem.contentY = 0;
                                mainColumn.visibleGrid = allAppsGrid;
                            }
                        }
                        onKeyNavUp: searchField.focus = true
                    }

                    ItemMultiGridView {
                        id: runnerGrid
                        width: root.cellSize *  plasmoid.configuration.numberColumns + units.largeSpacing
                        height: root.cellSize * plasmoid.configuration.numberRows
                        z: (opacity == 1.0) ? 1 : 0
                        aCellWidth: parent.width - units.largeSpacing
                        aCellHeight: root.cellSize
                        enabled: (opacity == 1.0) ? 1 : 0
                        model: runnerModel
                        grabFocus: true
                        opacity: root.searching ? 1.0 : 0.0
                        onOpacityChanged: {
                            if (opacity == 1.0) {
                                mainColumn.visibleGrid = runnerGrid;
                            }
                        }
                        onKeyNavUp: searchField.focus = true
                    }

                    Keys.onPressed: {
                        if (event.key == Qt.Key_Tab) {
                            event.accepted = true;
                            searchField.focus = true
                        } else if (event.key == Qt.Key_Backspace) {
                            event.accepted = true;
                            if(root.searching)
                                searchField.backspace();
                            else
                                searchField.focus = true
                        } else if (event.key == Qt.Key_Escape) {
                            event.accepted = true;
                            if(root.searching){
                                searchField.clear()
                            } else {
                                root.toggle()
                            }
                        } else if (event.text != "") {
                            event.accepted = true;
                            searchField.appendText(event.text);
                        }
                    }
                }
            }




            Keys.onPressed: {
                if (event.key == Qt.Key_Escape) {
                    event.accepted = true;
                    if (root.searching) {
                        reset();
                    } else {
                        root.visible = false;
                    }
                    return;
                }

                if (searchField.focus) {
                    return;
                }

                if (event.key == Qt.Key_Backspace) {
                    event.accepted = true;
                    searchField.backspace();
                }  else if (event.text != "") {
                    event.accepted = true;
                    searchField.appendText(event.text);
                }
            }

        }

        Component.onCompleted: {
            kicker.reset.connect(reset);
            reset();
        }
    }



    PlasmaCore.Dialog {
        id: dialog

        width:  main.sizeImage
        height: width

        visible: root.visible

        y: root.y - sizeImage/2
        x: root.x + root.width/2 - sizeImage/2

        objectName: "popupWindowIcon"
        //flags: Qt.WindowStaysOnTopHint
        flags: Qt.WindowStaysOnTopHint
        type: "Notification"
        location: PlasmaCore.Types.Floating

        hideOnWindowDeactivate: false
        backgroundHints: PlasmaCore.Dialog.NoBackground

        mainItem:  Rectangle{
            width: main.sizeImage
            height: width
            color: 'transparent'

            Image {
                id: iconUser
                //anchors.centerIn: parent
                source:  kuser.faceIconUrl.toString() || "user-identity"
                cache: false
                visible: source !== "" && plasmoid.configuration.viewUser
                sourceSize.width: main.sizeImage
                sourceSize.height: main.sizeImage

                fillMode: Image.PreserveAspectFit
                // Crop the avatar to fit in a circle, like the lock and login screens
                // but don't on software rendering where this won't render
                layer.enabled:true // iconUser.GraphicsInfo.api !== GraphicsInfo.Software
                layer.effect: OpacityMask {
                    // this Rectangle is a circle due to radius size
                    maskSource: Rectangle {
                        width: main.sizeImage
                        height: width
                        radius: height / 2
                        visible: false
                    }
                }
                state: "hide"
                states: [
                    State {
                        name: "show"
                        when: dialog.visible
                        PropertyChanges { target: iconUser; y: 0; opacity: 1; }
                    },
                    State {
                        name: "hide"
                        when: !dialog.visible
                        PropertyChanges { target: iconUser; y: sizeImage/2 ; opacity: 0; }
                    }
                ]
                transitions: Transition {
                    PropertyAnimation { properties: "opacity,y"; easing.type: Easing.InOutQuad; }
                }
                MouseArea {
                    anchors.fill: parent
                    acceptedButtons: Qt.LeftButton
                    onClicked: KCMShell.openSystemSettings("kcm_users")
                    visible: KCMShell.authorize("user_manager.desktop").length > 0
                }
            }
        }
    }
}
