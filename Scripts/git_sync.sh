#!/bin/bash
#|---/ /+-----------------------------+---/ /|#
#|--/ /-| Script to clone my git repo |--/ /-|#
#|-/ /--| Prasanth Rangan             |-/ /--|#
#|/ /---+-----------------------------+/ /---|#

source global_fn.sh

if pkg_installed git
then
    if [ -d ~/Dots ]
    then
        echo "~/Dots directory exists..."
        cd ~/Dots
        git status
    else
        mkdir ~/Dots
        echo "~/Dots directory created..."
        git clone https://github.com/prasanthrangan/dotfiles.git ~/Dots
        sed -i "/url = /c\\\turl = https://prasanthrangan:<token>@github.com/prasanthrangan/dotfiles.git" ~/Dots/.git/config
    fi
else
    echo "git is not installed..."
    exit 1
fi

if [[ `grep '<token>' ~/Dots/.git/config | awk '{print $1}'` == "url" ]]
then
    echo "git token not configured..."
    exit 0
else
    git pull
    git add .
    git status
    git commit -m "updates"
    git push
fi
