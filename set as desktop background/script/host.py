import ctypes, json, os, shutil, struct, sys, tempfile, urllib.error, urllib.request

text_length_bytes = sys.stdin.buffer.read(4)
text_length = struct.unpack("i", text_length_bytes)[0]
text = sys.stdin.buffer.read(text_length).decode()
message = json.loads(text)
url = message["url"]

for i in range(2):
  try:
    with urllib.request.urlopen(url) as httpresponse, tempfile.NamedTemporaryFile(delete=False) as temp:
      shutil.copyfileobj(httpresponse, temp)
  except urllib.error.HTTPError as e:
    # python user agent blocked by server
    if "HTTP Error 403: Forbidden" in str(e):
      url = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
  else:
    # SPI_SETDESKWALLPAPER, SPIF_UPDATEINIFILE, SPIF_SENDCHANGE
    ctypes.windll.user32.SystemParametersInfoW(0x0014, 0, temp.name, 0x01 | 0x02)
    os.remove(temp.name)
    break

# prevent error: native host has exited
response = "{}" # must be json format to prevent error: STATUS_ACCESS_VIOLATION
sys.stdout.buffer.write(struct.pack("i", len(response)))
sys.stdout.write(response)
sys.stdout.flush()