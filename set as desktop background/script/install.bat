set _path=%appdata%\Set as desktop background
robocopy . "%_path%"
reg add HKEY_CURRENT_USER\Software\Google\Chrome\NativeMessagingHosts\set_as_desktop_background /ve /d "%_path%\manifest.json" /f