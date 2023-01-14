set install=%appdata%\Set as desktop background
robocopy . "%install%"
reg add "HKEY_CURRENT_USER\Software\Google\Chrome\NativeMessagingHosts\set.as.desktop.background" /ve /d "%install%\manifest.json" /f