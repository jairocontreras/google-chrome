set install=%appdata%\wallpaper
robocopy . %install%
reg add "HKEY_CURRENT_USER\Software\Google\Chrome\NativeMessagingHosts\set_as_desktop_background" /ve /d "%install%\manifest.json" /f