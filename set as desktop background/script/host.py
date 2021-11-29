import ctypes
import json
import os
import shutil
import struct
import sys
import tempfile
import urllib.error
import urllib.request

SPI_SETDESKWALLPAPER = 0x0014
SPIF_UPDATEINIFILE = 0x01
SPIF_SENDCHANGE = 0x02

text_length_bytes = sys.stdin.buffer.read(4)
text_length = struct.unpack("i", text_length_bytes)[0]
text = sys.stdin.buffer.read(text_length).decode()
message = json.loads(text)
url = message["url"]

for i in range(2):
  try:
    with urllib.request.urlopen(url) as httpresponse, tempfile.NamedTemporaryFile(delete=False) as temp:
      shutil.copyfileobj(httpresponse, temp)
  except urllib.error.HTTPError as error:
    # python user agent blocked by server
    # e.g. https://www.planwallpaper.com/static/images/wallpapers-7020-7277-hd-wallpapers.jpg
    if "HTTP Error 403: Forbidden" in str(error):
      url = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
  else:
    filename = temp.name
    ctypes.windll.user32.SystemParametersInfoW(SPI_SETDESKWALLPAPER, 0, filename, SPIF_UPDATEINIFILE | SPIF_SENDCHANGE)
    os.remove(filename)
    break