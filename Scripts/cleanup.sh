#!/bin/bash
#|---/ /+--------------------------------------+---/ /|#
#|--/ /-| Script for post installation cleanup |--/ /-|#
#|-/ /--| Prasanth Rangan                      |-/ /--|#
#|/ /---+--------------------------------------+/ /---|#

source global_fn.sh

if pkg_installed plasma-welcome
then
    sudo pacman -Rdd plasma-welcome
fi

if pkg_installed kate
then
    sudo pacman -Rns kate
fi

if pkg_installed rofi
then
    if [ -f /usr/share/applications/rofi.desktop ]
    then
        sudo rm /usr/share/applications/rofi*.desktop
    fi
fi

if [ -d ~/Documents ]
then
    rmdir ~/Documents
fi

if [ -d ~/Music ]
then
    rmdir ~/Music
fi

if [ -d ~/Pictures ]
then
    rmdir ~/Pictures
fi

if [ -d ~/Public ]
then
    rmdir ~/Public
fi

if [ -d ~/Templates ]
then
    rmdir ~/Templates
fi

if [ -d ~/Videos ]
then
    rmdir ~/Videos
fi

sudo pacman -Sc
pacman -Qtdq | sudo pacman -Rns -
pacman -Qqd | sudo pacman -Rsu -
