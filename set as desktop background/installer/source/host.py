import ctypes, json, os, shutil, struct, sys, urllib.request
wallpaper = os.getenv("appdata") + "\set as desktop background\wallpaper"

def set_wallpaper(url):
  global response
  try:
    with urllib.request.urlopen(url) as httpresponse, open(wallpaper, "wb") as file:
      shutil.copyfileobj(httpresponse, file)
  except Exception as e:
    error = str(e)
    if error == "HTTP Error 403: Forbidden":
      if isinstance(url, str):
        set_wallpaper(urllib.request.Request(url, headers={"user-agent": "mozilla/5.0"}))
        return
    response = error
  else:
    # SPI_SETDESKWALLPAPER, SPIF_UPDATEINIFILE, SPIF_SENDCHANGE
    ctypes.windll.user32.SystemParametersInfoW(0x0014, 0, wallpaper, 0x01 | 0x02)

text_length_bytes = sys.stdin.buffer.read(4)
text_length = struct.unpack("i", text_length_bytes)[0]
text = sys.stdin.buffer.read(text_length).decode()
message = json.loads(text)
url = message["url"]
response = ""

if url:
  set_wallpaper(url)

text = json.dumps(response)
sys.stdout.buffer.write(struct.pack("i", len(text)))
sys.stdout.write(text)
sys.stdout.flush()