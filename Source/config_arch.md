# Hardware


## kernel
```
sudo pacman -S linux-zen nvidia-dkms linux-zen-headers
sudo pacman -S linux-lts nvidia-lts linux-lts-headers
sudo pacman -S linux nvidia linux-headers
```

## nvidia
```
sudo pacman -S nvidia nvidia-settings nvidia-utils
pacman -Qs nvidia
```

## bluetooth
```
lsmod | grep btusb
sudo systemctl start bluetooth.service
sudo systemctl enable bluetooth.service
sed -i "s/#AutoEnable=true/AutoEnable=true/" /etc/bluetooth/main.conf
```

## disk
```
rmdir Documents Music Pictures Public Templates Videos
mkdir ~/Clone ~/Dots
lsblk -f
sudo cp /etc/fstab /etc/fstab.bkp

lsblk -f | grep sda | grep -v '^sda' | while read sdaList
do
    devName=`echo $sdaList | awk '{print $1}' | cut -c 5-`
    fstName=`echo $sdaList | awk '{print $2}'`
    dirName=`echo $sdaList | awk '{print $4}'`
    uidName=`echo $sdaList | awk '{print $5}'`
    #mkdir /mnt/$dirName
    echo "\n#/dev/$devName"
    echo "${uidName}   /mnt/${dirName} \t ${fstName} \t defaults \t 0  0"
done
```



# Installation


## pacman
```
sudo pacman -Rdd discover
sudo pacman -Rns kate
sudo pacman -S firefox kitty neofetch zsh git code baobab flatpak kvantum exa gwenview imagemagick qt5-imageformats steam gamemode
```

## yay
```
git clone https://aur.archlinux.org/yay.git ~/Clone/yay
cd ~/Clone/yay
makepkg -si
cd ~
```

## aur
```
yay -S pamac-aur kde-rounded-corners lightlyshaders-git latte-dock ulauncher spotify-adblock goverlay
```

## flatpak
```
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
```
git clone https://github.com/prasanthrangan/dotfiles.git ~/Dots
sed -i "/url = /c\\\turl = https://prasanthrangan:<token>@github.com/prasanthrangan/dotfiles.git" ~/Dots/.git/config
git config --global user.email "prasanthrangan@rediffmail.com"
git config --global user.name "Tittu"

cp -r ~/Dots/Configs/.config/kitty ~/.config/
cp -r ~/Dots/Configs/.config/neofetch ~/.config/
cp -r ~/Dots/Configs/.config/ulauncher ~/.config/
cp -r ~/Dots/Configs/.vim ~/
```

## zsh
```
chsh -s $(which zsh)
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

cp ~/Dots/Configs/.zshrc ~/Dots/Configs/.p10k.zsh ~/
```

## grub
```
ark --batch --destination /usr/share/grub/themes/ ~/Dots/Source/arcs/CatppuccinGrub.zip
sudo cp /etc/default/grub /etc/default/grub.bkp

sed -i "/^GRUB_DEFAULT=/c\GRUB_DEFAULT=saved
/^GRUB_CMDLINE_LINUX_DEFAULT=/c\GRUB_CMDLINE_LINUX_DEFAULT=\"loglevel=3 quiet splash nvidia_drm.modeset=1\"
/^GRUB_THEME=/c\GRUB_THEME=\"/usr/share/grub/themes/catppuccin/theme.txt\"
/^GRUB_SAVEDEFAULT=/c\GRUB_SAVEDEFAULT=true" /etc/default/grub

sudo cp /boot/grub/grub.cfg /boot/grub/grub.bkp
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

## sddm
```
ark --batch --destination /usr/share/sddm/themes/ ~/Dots/Source/arcs/CornersSddm.zip
sudo cp /etc/sddm.conf.d/kde_settings.conf /etc/sddm.conf.d/kde_settings.bkp
sed -i "/^Current=/c\Current=corners" /etc/sddm.conf.d/kde_settings.conf
```

