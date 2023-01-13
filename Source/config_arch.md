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
grep AutoEnable /etc/bluetooth/main.conf
```

## disk
```
rmdir Documents Music Pictures Public Templates Videos
sudo mkdir /mnt/YoRHa /mnt/HinoKami /mnt/Sh1ro
mkdir ~/Clone ~/Dots
lsblk -f
cat /etc/fstab
```
```
#/dev/sda1
UUID=95830e44-5dd7-4158-9729-732493e0c0df   /mnt/YoRHa        ext4        defaults    0  0

#/dev/sda2
UUID=4509b32c-d4de-4828-b3ff-38b6b1d21813   /mnt/HinoKami     ext4        defaults    0  0

#/dev/sda1
UUID=e42238f1-09d2-442f-9c40-0ab9d5712be5   /mnt/Sh1ro        ext4        defaults    0  0
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

cp -r ~/Dots/MyConfig/.config/kitty ~/.config/
cp -r ~/Dots/MyConfig/.config/neofetch ~/.config/
cp -r ~/Dots/MyConfig/.config/ulauncher ~/.config/
cp -r ~/Dots/MyConfig/.vim ~/
```

## zsh
```
chsh -s $(which zsh)
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
cp ~/Dots/MyConfig/.zshrc ~/Dots/MyConfig/.p10k.zsh ~/
```

## grub
```
ark --batch --destination /usr/share/grub/themes/ ~/Dots/Source/arcs/CatppuccinGrub.zip
sudo cp /etc/default/grub /etc/default/grub.bkp

sed -i "
/^GRUB_DEFAULT=/c\GRUB_DEFAULT=saved
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


