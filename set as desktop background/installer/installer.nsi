!include "logiclib.nsh"
!include "nsdialogs.nsh"
!include "include\browsefolder.nsh"
!include "include\replacetext.nsh"
!include "include\strcontains.nsh"
!include "include\strloc.nsh"

!define app "Set as desktop background"
!define key "software\google\chrome\nativemessaginghosts\set_as_desktop_background"

installdir "$programfiles\${app}"
xpstyle on
caption $app
subcaption 4 " "

var all
var dest
var free
var link
var mode
var path
var setup
var size
var size_src
var unit

page custom setup leave
page instfiles

function setup
  system::int64op $size_src * 1024 ; convert to bytes
  pop $size_src
  strcpy $size $size_src
  strcpy $unit "B"
  call size
  getdlgitem $setup $hwndparent 1
  nsdialogs::create 1018
  ${nsd_createlabel} 0 0 100% 8u "Install mode"
	${nsd_createradiobutton} 0 13u 37u 8u "All users"
	pop $all
	${nsd_createradiobutton} 0 26u 51u 8u "Current user"
	pop $0
  ${nsd_onclick} $0 mode
  ${nsd_creategroupbox} 0 44u 100% 32u "Destination"
	${nsd_createtext} 7u 56u 85% 12u ""
	pop $dest
  ${nsd_createbrowsebutton} -27u 55u 20u 14u "..."
  pop $0
  ${nsd_onclick} $0 browse
  ${nsd_createlabel} 0 -24u 100% 8u "Space required: $size $unit"
  ${nsd_createlabel} 0 -12u 50% 8u ""
  pop $free
  ${nsd_createlink} -102u -12u 100% 8u "https://jairocontreras.github.io"
  pop $link
  ${nsd_check} $all
  ${nsd_onclick} $all mode
  ${nsd_onchange} $dest validate
  ${nsd_onclick} $link open
  ${nsd_settext} $dest $instdir
  nsdialogs::show
functionend

function size
  strcpy $0 $0 1
  ${if} $size u> 1024
    ${if} $unit == "b"
      strcpy $unit "KB"
    ${elseif} $unit == "kb"
      strcpy $unit "MB"
    ${elseif} $unit == "mb"
      strcpy $unit "GB"
    ${endif}
    call convert
  ${elseif} $0 > 0
    strcpy $size "$size.$0"
  ${endif}
functionend

function convert
  strcpy $0 $0 2
  system::int64op $size % 1024
  pop $0
  system::int64op $size / 1024
  pop $size
  call size
functionend

function mode
  ${nsd_getstate} $all $mode
  ${if} $mode == 0
    ${nsd_settext} $dest "$appdata\${app}"
  ${else}
    ${nsd_settext} $dest "$programfiles\${app}"
  ${endif}
functionend

function validate
  var /global len
  var /global out
  var /global pos
  ${nsd_gettext} $dest $1
  strcpy $0 $1 1 ; root
  strcmp $0 "\" bad
  ${strcontains} $0 "\\" $1
  strcmp $0 "\\" bad
  strlen $len $1
  strcpy $path $1
  ${if} $len > 2
    ${strloc} $pos $1 ":" ""
    ${if} $pos == 1
      ${strloc} $pos $1 ":" <
      strcpy $path $1 "" -$pos
    ${endif}
  ${endif}
  strcpy $r0 '/:*?"<>|'
  strcpy $r1 0
  loop:
    strcpy $r2 $r0 1 $r1
    strcmp $r2 "" go
    intop $r1 $r1 + 1
    ${strcontains} $out $r2 $path
    ${if} $out == ":"
    ${andif} $len == 2
      goto go
    ${endif}
    strcmp $out $r2 bad
    goto loop
  go:
    strlen $0 $1
    system::call kernel32::GetDiskFreeSpaceEx(tr1,*l0r2,*l,*l)i.r0
    ${if} $0 == 1
      strcpy $path $1
      strcpy $size $2
      strcpy $unit "B"
      call size
      ${nsd_settext} $free "Space available: $size $unit"
      ${if} $2 u> $size_src
        enablewindow $setup 1
      ${else}
        enablewindow $setup 0
      ${endif}
    ${else}
      traverse:
        intop $0 $0 - 1
        strcpy $2 $1 1 $0
        ${if} $2 == "\"
          strcpy $1 $1 $0
          goto go
        ${endif}
        strcmp $2 "" 0 traverse
      bad:
        strcpy $path ""
        ${nsd_settext} $free "Space available:"
        enablewindow $setup 0
    ${endif}
functionend

function browse
  push ""
  push ""
  push $path
  call browseforfolder
  pop $0
  ${if} $0 != ""
    strlen $1 $0
    ${if} $1 == 3
      strcpy $1 ""
    ${else}
      strcpy $1 "\"
    ${endif}
    ${nsd_settext} $dest "$0$1${app}"
  ${endif}
functionend

function open
  ${nsd_gettext} $link $0
  execshell "open" $0
functionend

function leave
  ${nsd_getstate} $all $mode
  ${nsd_gettext} $dest $instdir
functionend

section "" section
  var /global val
  setoutpath $instdir
  file "source\*"
  strcpy $val "$instdir\manifest.json"
  ${if} $mode == 0
    push hklm
    push hkcu
    push all
    push all
    push "uninstall.bat"
    call advreplaceinfile
    writeregstr hkcu ${key} "" $val
  ${else}
    setregview 64
    writeregstr hklm ${key} "" $val
  ${endif}
sectionend

function .oninit
  var /global app
  strcpy $app "${app}"
  sectiongetsize ${section} $size_src ; function must be placed after section
functionend