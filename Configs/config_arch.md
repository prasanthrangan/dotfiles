# Hardware


## kernel
```shell
sudo pacman -S linux-zen nvidia-dkms linux-zen-headers
sudo pacman -S linux-lts nvidia-lts linux-lts-headers
sudo pacman -S linux nvidia linux-headers
```

## nvidia
```shell
sudo pacman -S nvidia nvidia-settings nvidia-utils
pacman -Qs nvidia
```

## bluetooth
```shell
lsmod | grep btusb
sudo systemctl start bluetooth.service
sudo systemctl enable bluetooth.service
sed -i "s/#AutoEnable=true/AutoEnable=true/" /etc/bluetooth/main.conf
```

## disk
```shell
rmdir Documents Music Pictures Public Templates Videos
mkdir ~/Clone ~/Dots
lsblk -f

unset devName fstName uidName dirName fstEntry
lsblk -io KNAME,TYPE,FSTYPE,UUID,MOUNTPOINT | awk '$1~/s.*[[:digit:]]/ && $2=="part" && $5==""' | while read sdaList
do
    devName=`echo $sdaList | awk '{print $1}'`
    fstName=`echo $sdaList | awk '{print $3}'`
    uidName=`echo $sdaList | awk '{print $4}'`
    dirName=`lsblk --noheadings --raw -o LABEL /dev/${devName}`
    [ ! -z "$dirName" ] && sudo mkdir /mnt/$dirName ; fstEntry=`echo "\n${fstEntry}\n# /dev/$devName \nUUID=${uidName}   /mnt/${dirName} \t ${fstName} \t nosuid,nodev,nofail,x-gvfs-show \t 0  0"`
done

sudo cp /etc/fstab /etc/fstab.bkp
echo "$fstEntry" | sudo tee -a /etc/fstab

e2label /dev/nvme0n1p2 Arch
e2label /dev/nvme0n1p3 Tittu
```



# Installation


## pacman
```shell
sudo pacman -Rdd discover
sudo pacman -Rns kate
sudo pacman -S firefox kitty neofetch zsh git code rofi kvantum exa gwenview imagemagick qt5-imageformats steam gamemode
sudo rm /usr/share/applications/rofi*.desktop
```

## yay
```shell
git clone https://aur.archlinux.org/yay.git ~/Clone/yay
cd ~/Clone/yay
makepkg -si
cd ~
```

## aur
```shell
yay -S pamac-aur kde-rounded-corners latte-dock-git spotify-adblock goverlay
yay -S oh-my-zsh-git zsh-theme-powerlevel10k-git zsh-syntax-highlighting-git zsh-autosuggestions-git pokemon-colorscripts-git
# optinal alternatives --> lightlyshaders-git ulauncher
```

## flatpak
```shell
flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
flatpak install --user flathub
com.github.Matoking.protontricks
net.davidotek.pupgui2
com.github.tchx84.Flatseal
org.gimp.GIMP
org.kde.krita
org.inkscape.Inkscape
org.darktable.Darktable
org.kde.audiotube
org.freedesktop.Piper
org.openrgb.OpenRGB
com.usebottles.bottles
org.gnome.World.PikaBackup
com.belmoussaoui.Authenticator
com.bitwarden.desktop
```



# Configuration


## git
```shell
git clone https://github.com/prasanthrangan/dotfiles.git ~/Dots
sed -i "/url = /c\\\turl = https://prasanthrangan:<token>@github.com/prasanthrangan/dotfiles.git" ~/Dots/.git/config

git config --global user.email "prasanthrangan@rediffmail.com"
git config --global user.name "Tittu"

cp -r ~/Dots/Configs/.config/* ~/.config/
```

## fonts
```shell
mkdir ~/.local/share/fonts/
tar -xvzf ~/Dots/Source/arcs/Font_CascadiaCove.tar.gz -C ~/.local/share/fonts/
tar -xvzf ~/Dots/Source/arcs/Font_MononokiNerd.tar.gz -C ~/.local/share/fonts/
tar -xvzf ~/Dots/Source/arcs/Font_JetBrainsMono.tar.gz -C ~/.local/share/fonts/
tar -xvzf ~/Dots/Source/arcs/Font_UzumasaMini.tar.gz -C /usr/share/fonts/

fc-cache -vf
fc-list
```

## zsh
```shell
chsh -s $(which zsh)
cp ~/Dots/Configs/.zshrc ~/Dots/Configs/.p10k.zsh ~/
# to reconfigure --> p10k configure
```

## grub
```shell
sudo tar -xvzf ~/Dots/Source/arcs/Grub_Pochita.tar.gz -C /usr/share/grub/themes/
sudo cp /etc/default/grub /etc/default/grub.bkp

sed -i "/^GRUB_DEFAULT=/c\GRUB_DEFAULT=saved
/^GRUB_CMDLINE_LINUX_DEFAULT=/c\GRUB_CMDLINE_LINUX_DEFAULT=\"loglevel=3 quiet splash nvidia_drm.modeset=1\"
/^GRUB_GFXMODE=/c\GRUB_GFXMODE=1280x1024x32
/^#GRUB_THEME=/c\GRUB_THEME=\"/usr/share/grub/themes/pochita/theme.txt\"
/^#GRUB_SAVEDEFAULT=true/c\GRUB_SAVEDEFAULT=true" /etc/default/grub

sudo cp /boot/grub/grub.cfg /boot/grub/grub.bkp
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

## sddm
```shell
ark --batch --destination /usr/share/sddm/themes/ ~/Dots/Source/arcs/Sddm_Corners.zip
sudo cp /etc/sddm.conf.d/kde_settings.conf /etc/sddm.conf.d/kde_settings.bkp
sed -i "/^Current=/c\Current=corners" /etc/sddm.conf.d/kde_settings.conf
```

## rofi
```shell
sudo cp ~/Dots/Configs/.config/rofi/cat_*.rasi /usr/share/rofi/themes/
```

## firefox
```shell
FoxRel=`ll ~/.mozilla/firefox/ | grep .default-release | awk '{print $NF}'`
mkdir ~/.mozilla/firefox/${FoxRel}/chrome
cp ~/Dots/Source/t2_firefox.css ~/.mozilla/firefox/${FoxRel}/chrome/userChrome.css

// about:profiles
// about:config
 -> toolkit.legacyUserProfileCustomizations.stylesheets - true
 -> browser.tabs.tabmanager.enabled - false
```

## steam
```shell
mkdir -p ~/.local/share/Steam/Skins/
ark --batch --destination ~/.local/share/Steam/Skins/ ~/Dots/Source/arcs/Steam_Metro.zip
```

## spotify
```shell
curl -fsSL https://raw.githubusercontent.com/spicetify/spicetify-cli/master/install.sh | sh
sudo chmod a+wr /opt/spotify
sudo chmod a+wr /opt/spotify/Apps -R

git clone --depth=1 https://github.com/spicetify/spicetify-themes.git ~/Clone/spicetithemes
cp -r ~/Clone/spicetithemes/* ~/.config/spicetify/Themes

~/.spicetify/spicetify config current_theme Sleek
~/.spicetify/spicetify config color_scheme Cherry
~/.spicetify/spicetify apply
```
