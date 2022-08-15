# install system updates

sudo apt update
sudo apt upgrade


# download and change wallpaper

#mkdir ~/Clone
#cd ~/Clone

#git clone https://github.com/dracula/wallpaper
#https://github.com/linuxdotexe/nordic-wallpapers/blob/master/wallpaper-preview.md
gsettings set org.gnome.desktop.background picture-uri file:////home/tittu/Wallpapers/bleach.jpg


# install gnome tweaks/extensions

sudo apt install gnome-tweaks gnome-menus gir1.2-gmenu-3.0

flatpak install flathub com.mattjakeman.ExtensionManager
flatpak run com.mattjakeman.ExtensionManager


# add/config extensions from ExtensionManager

#> Arcmenu
#> Blur Me
#> Floating Dock
#> OpenWeather
#> User Themes
#> Vitals


# gnome gtk3/4 themes

cd ~/Clone
#git clone https://github.com/vinceliuice/WhiteSur-gtk-theme

cd WhiteSur-gtk-theme
./install.sh -t grey -p 5 -P smaller -s 180 --round --roundedmaxwindow

sudo ./tweaks.sh -g -n -b "/home/tittu/Wallpapers/jpn_travelling.jpg"


# download and set icons

cd ~/Clone
#git clone https://github.com/vinceliuice/Tela-circle-icon-theme

cd Tela-circle-icon-theme/
./install.sh -a


# download and set cursors

cd ~/Clone
#https://www.gnome-look.org/p/1356095
sudo cp -r volantes_cursors /usr/share/icons/


# download and set fonts

cp ~/Clone/Fonts/* /home/tittu/.local/share/fonts/
fc-cache -vf


# customize terminal

sudo apt install zsh
echo $0
chsh /bin/zsh
reboot

echo $0
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

cd ~/Clone
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

sed -i 's,ZSH_THEME="robbyrussell",ZSH_THEME="powerlevel10k/powerlevel10k",' ~/.zshrc
#mod the .p10k.zsh typeset -g POWERLEVEL9K_OS_ICON_CONTENT_EXPANSION=''

sudo apt install kitty

THEME=https://raw.githubusercontent.com/dexpota/kitty-themes/master/themes/Chalkboard.conf
wget "$THEME" -P ~/.config/kitty/kitty-themes/themes


# uninstall libre office and firefox

sudo apt-get remove --purge libreoffice*
sudo apt-get purge firefox
sudo apt-get clean
sudo apt-get autoremove


# install brave browser

sudo apt install apt-transport-https curl
sudo curl -fsSLo /usr/share/keyrings/brave-browser-archive-keyring.gpg https://brave-browser-apt-release.s3.brave.com/brave-browser-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/brave-browser-archive-keyring.gpg arch=amd64] https://brave-browser-apt-release.s3.brave.com/ stable main" | sudo tee /etc/apt/sources.list.d/brave-browser-release.list

sudo apt update
sudo apt install brave-browser


# install spotify and steam

sudo apt install steam

curl -sS https://download.spotify.com/debian/pubkey_5E3C45D7B312C643.gpg | sudo apt-key add - 
echo "deb http://repository.spotify.com stable non-free" | sudo tee /etc/apt/sources.list.d/spotify.list
sudo apt-get update && sudo apt-get install spotify-client


sudo apt install fuse3
sudo apt upgrade

sudo add-apt-repository ppa:ubuntuhandbook1/gvfs
sudo apt install gvfs

sudo apt install dconf-editor
#open dconf-editor, navigate to org->gnome->desktop->privacy and uncheck the remember-recent-files key


# customize spotify

#git clone https://github.com/spicetify/spicetify-themes.git
cd spicetify-themes
cp -r * ~/.config/spicetify/Themes
sudo chmod -R 777 /usr/share/spotify/


./spicetify backup apply
./spicetify config current_theme Sleek
./spicetify config color_scheme Nord
./spicetify apply


# install openrgb
#git clone https://gitlab.com/CalcProgrammer1/OpenRGB.git
flatpak install flathub org.openrgb.OpenRGB
sudo cp ~/Clone/OpenRGB/60-openrgb.rules /usr/lib/udev/rules.d/
sudo udevadm control --reload-rules && sudo udevadm trigger
flatpak run org.openrgb.OpenRGB



