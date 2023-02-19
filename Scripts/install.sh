#!/bin/bash
#|---/ /+--------------------------+---/ /|#
#|--/ /-| Main installation script |--/ /-|#
#|-/ /--| Prasanth Rangan          |-/ /--|#
#|/ /---+--------------------------+/ /---|#

source global_fn.sh

sudo ./enable_ctl.sh

./install_pkg.sh custom_pkg.lst
./install_pkg.sh custom_kde.lst
./install_pkg.sh custom_zsh.lst
./install_pkg.sh custom_ext.lst

./git_sync.sh

./install_fnt.sh
./install_cfg.sh
./install_oth.sh
./install_sgz.sh
