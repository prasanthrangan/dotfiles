#!/bin/bash
#|---/ /+--------------------------+---/ /|#
#|--/ /-| Main installation script |--/ /-|#
#|-/ /--| Prasanth Rangan          |-/ /--|#
#|/ /---+--------------------------+/ /---|#

source global_fn.sh

sudo ./enable_bt.sh

./install_pkg.sh essential_pkg.lst
./install_pkg.sh essential_kde.lst
./install_pkg.sh customize_zsh.lst
./install_pkg.sh customize_kde.lst

./git_sync.sh

./install_fnt.sh
./install_cfg.sh
./install_oth.sh
