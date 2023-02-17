#!/bin/bash
#|---/ /+-----------------------------+---/ /|#
#|--/ /-| Script to configure my apps |--/ /-|#
#|-/ /--| Prasanth Rangan             |-/ /--|#
#|/ /---+-----------------------------+/ /---|#

source global_fn.sh


# rofi
if pkg_installed rofi
then
    sudo cp ~/Dots/Configs/.config/rofi/cat_*.rasi /usr/share/rofi/themes/
fi


# steam
if pkg_installed steam
then
    if [ ! -d ~/.local/share/Steam/Skins/ ]
    then
        mkdir -p ~/.local/share/Steam/Skins/
    fi
    tar -xvzf ~/Dots/Source/arcs/Steam_Metro.tar.gz -C ~/.local/share/Steam/Skins/
fi


# firefox
if pkg_installed firefox
then
    if [ -d ~/.mozilla/firefox/*.default-release ]
    then
        FoxRel=`ls -l ~/.mozilla/firefox/ | grep .default-release | awk '{print $NF}'`

        if [ ! -d ~/.mozilla/firefox/${FoxRel}/chrome ]
        then
            mkdir ~/.mozilla/firefox/${FoxRel}/chrome
        fi
        cp ~/Dots/Source/t2_firefox.css ~/.mozilla/firefox/${FoxRel}/chrome/userChrome.css
        echo 'user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);' > ~/.mozilla/firefox/${FoxRel}/user.js
        echo 'user_pref("browser.tabs.tabmanager.enabled", false);' >> ~/.mozilla/firefox/${FoxRel}/user.js
    else
        echo "launching firefox..."
        /usr/bin/firefox &
        ffox_pid=$!
        sleep 5
        kill -9 $ffox_pid
    fi
fi


# sddm
sudo tar -xvzf ~/Dots/Source/arcs/Sddm_Corners.tar.gz -C /usr/share/sddm/themes/

if [ ! -d /etc/sddm.conf.d ]
then
    sudo mkdir /etc/sddm.conf.d
fi

sudo mv /usr/share/sddm/themes/corners/kde_settings.conf /etc/sddm.conf.d/


# grub
sudo tar -xvzf ~/Dots/Source/arcs/Grub_Pochita.tar.gz -C /usr/share/grub/themes/
sudo cp /etc/default/grub /etc/default/grub.bkp

sudo sed -i "/^GRUB_DEFAULT=/c\GRUB_DEFAULT=saved
/^GRUB_CMDLINE_LINUX_DEFAULT=/c\GRUB_CMDLINE_LINUX_DEFAULT=\"loglevel=3 quiet splash nvidia_drm.modeset=1\"
/^GRUB_GFXMODE=/c\GRUB_GFXMODE=1280x1024x32
/^#GRUB_THEME=/c\GRUB_THEME=\"/usr/share/grub/themes/pochita/theme.txt\"
/^#GRUB_SAVEDEFAULT=true/c\GRUB_SAVEDEFAULT=true" /etc/default/grub

sudo cp /boot/grub/grub.cfg /boot/grub/grub.bkp
sudo grub-mkconfig -o /boot/grub/grub.cfg


# zsh
chsh -s $(which zsh)

