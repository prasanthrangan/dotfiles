# Window Gaps

Extension for KDE's window manager to add space around windows touching a screen edge or other window.

The size of the gap and the layouts and applications to be gapped are configurable.

Please note that this script does not do any automatic tiling. Its purpose is to reshape windows that have been manually positioned with the default KWin window management system.

![screenshot](.img/screenshot.png)

<img src=".img/config.png" alt="config" height="600"/>

## Installation

### Dependencies

`kwin` version ≥ 5.21.

### Method 1: via graphical interface

1. Install the script via *System Settings* > *Window Management* > *KWin Scripts* > *Get New Scripts …* > search for *Window Gaps* > *Install*.
2. Activate the script by selecting the checkbox in the *Window Gaps* entry.

### Method 2: via command line

```bash
git clone https://github.com/nclarius/tile-gaps.git
plasmapkg2 --type kwinscript -i tile-gaps
kwriteconfig5 --file kwinrc --group Plugins --key tilegapsEnabled true
qdbus org.kde.KWin /KWin reconfigure
```

## Configuration

*System Settings* > *Window Management* > *KWin Scripts* > configuration button in the *Window Gaps* entry.

You may have to disable the script, apply, reenable, and reapply in order for the changes to take effect.

If the configuration button is missing (this is due to a central limitation with the KWin script installation component), try the following:

````bash
mkdir -p ~/.local/share/kservices5
ln -sf ~/.local/share/kwin/scripts/tilegaps/metadata.desktop ~/.local/share/kservices5/tilegaps.desktop
````

## Usage

### Compatibility

- For compatibility with [sticky window snapping](https://store.kde.org/p/1112552/) you can use [my fork](https://github.com/nclarius/sticky-window-snapping), which adds an option in the configuration to set the tile gap size between windows, and will properly retain the gap when resizing adjacent windows.  
- I have not tried out combinations of the gaps script with tiling scripts (such as [Bismuth](https://store.kde.org/p/1603469/) or [KWin Tiling](https://store.kde.org/p/1112554/)); if you have experiences, please let me know.

### Issues

- If gaps are not applied in all cases, try increasing the tolerance in order to implement a more liberal edge touching detection. Conversely, if gaps are inserted when they shouldn’t, try decreasing the tolerance so as to enforce a stricter adjacency measurement. It is recommended to have tolerance set to twice the largest gap size.

## Small Print

© 2021 Natalie Clarius \<natalie_clarius@yahoo.de\>

This work is licensed under the GNU General Public License v3.0.  
This program comes with absolutely no warranty.  
This is free software, and you are welcome to redistribute and/or modify it under certain conditions.  

If you would like to thank me, you can always make me happy with a review or a cup of coffee:  
<a href="https://store.kde.org/p/1619642/"><img src="https://raw.githubusercontent.com/nclarius/Plasma-window-decorations/main/.img/kdestore.png" height="25"/></a>
<a href="https://www.paypal.com/donate/?hosted_button_id=7LUUJD83BWRM4"><img src="https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif" height="25"/></a>&nbsp;&nbsp;<a href="https://www.buymeacoffee.com/nclarius"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="25"/></a>
