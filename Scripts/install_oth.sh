#!/bin/bash
#|---/ /+-----------------------------+---/ /|#
#|--/ /-| Script to configure my apps |--/ /-|#
#|-/ /--| Prasanth Rangan             |-/ /--|#
#|/ /---+-----------------------------+/ /---|#

source global_fn.sh

if pkg_installed firefox
then
    FoxRel=`ls -l ~/.mozilla/firefox/ | grep .default-release | awk '{print $NF}'`
    mkdir ~/.mozilla/firefox/${FoxRel}/chrome
    cp ~/Dots/Source/t2_firefox.css ~/.mozilla/firefox/${FoxRel}/chrome/userChrome.css
    echo 'user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);' > ~/.mozilla/firefox/${FoxRel}/user.js
    echo 'user_pref("browser.tabs.tabmanager.enabled", false);' >> ~/.mozilla/firefox/${FoxRel}/user.js
fi

if pkg_installed steam
then
    mkdir -p ~/.local/share/Steam/Skins/
    tar -xvzf ~/Dots/Source/arcs/Steam_Metro.tar.gz -C ~/.local/share/Steam/Skins/
fi
