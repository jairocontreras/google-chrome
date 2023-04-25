@echo off
echo Do you wish to unregister extension?
pause
reg delete HKEY_CURRENT_USER\Software\Google\Chrome\NativeMessagingHosts\set_as_desktop_background /f
echo The following files will be permanently deleted:
(goto) 2>nul & del "%~dp0"