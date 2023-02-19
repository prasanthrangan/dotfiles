#!/bin/bash
#|---/ /+------------------------------------+---/ /|#
#|--/ /-| Script to restore personel configs |--/ /-|#
#|-/ /--| Prasanth Rangan                    |-/ /--|#
#|/ /---+------------------------------------+/ /---|#

source global_fn.sh

if pkg_installed plasma-meta
then
    cp -r $HOME/Dots/Configs/plasma/. $HOME
fi

while read lst
do

app=`echo $lst | awk -F '|' '{print $1}'`
cfg=`echo $lst | awk -F '|' '{print $2}'`
pkg=`echo $lst | awk -F '|' '{print $3}'`

echo "restoring dot files for ${app}..."

echo "${pkg}" | xargs -n 1 | while read pkg_chk
do
    if pkg_installed $pkg_chk
    then
        echo "$pkg_chk check passed..."
    else
        echo "$pkg_chk check faied..."
        exit 1
    fi
done

echo "${cfg}" | xargs -n 1 | while read cfg_chk
do
    if config_check $cfg_chk
    then
        cp -r $cfgPath/$cfg_chk $tgtPath
    else
        echo "$cfg_chk configuration not found..."
        exit 1
    fi
done

done < restore_cfg.lst

