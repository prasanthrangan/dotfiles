import QtQuick 2.0
import QtQuick.Controls 2.0
import QtQuick.Layouts 1.15
import QtQuick.Dialogs 1.0
import org.kde.plasma.core 2.0 as PlasmaCore

RowLayout {
    id: root
    property var color;

    Label {
        text: i18n("Font Color")
    }             
    Rectangle {
        id: colorbutton
        height: PlasmaCore.Units.gridUnit * 1.3; width: height
        border.width: 1
        color: root.color
        border.color: "gray"
        MouseArea {
            anchors.fill: parent
            onClicked: {
                colordialog.visible=true
            }
        }
    }
    ColorDialog {
        id: colordialog
        title: i18n("Select a color")
        onAccepted: {
            root.color=color
        }
    }
}

