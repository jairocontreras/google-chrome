@echo off
title Uninstall
echo Attempting to modify registry...
reg delete hklm\software\google\chrome\nativemessaginghosts\set_as_desktop_background /f || goto :error
echo The following files will be permanently deleted:
(goto) 2>nul & del "%~dp0"
:error
pause