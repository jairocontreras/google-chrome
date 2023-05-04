import ctypes, json, os, shutil, struct, sys, tempfile, urllib.request

def set_wallpaper(url):
  global response
  try:
    with urllib.request.urlopen(url) as response, tempfile.NamedTemporaryFile(delete=False) as temp:
      shutil.copyfileobj(response, temp)
    # SPI_SETDESKWALLPAPER, SPIF_UPDATEINIFILE, SPIF_SENDCHANGE
    ctypes.windll.user32.SystemParametersInfoW(0x0014, 0, temp.name, 0x01 | 0x02)
    os.remove(temp.name)
  except Exception as e:
    error = str(e)
    if error == "HTTP Error 403: Forbidden":
      if isinstance(url, str):
        set_wallpaper(urllib.request.Request(url, headers={"user-agent": "mozilla/5.0"}))
      else:
        response = "Cannot fetch file using web scraper"
    else:
      response = error
  else:
    response = ""

text_length_bytes = sys.stdin.buffer.read(4)
text_length = struct.unpack("i", text_length_bytes)[0]
text = sys.stdin.buffer.read(text_length).decode()
message = json.loads(text)
set_wallpaper(message["url"])
text = json.dumps(response)
sys.stdout.buffer.write(struct.pack("i", len(text)))
sys.stdout.write(text)
sys.stdout.flush()