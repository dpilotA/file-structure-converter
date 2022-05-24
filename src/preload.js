const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("myApp", {
  sayHello: (arg) => ipcRenderer.invoke("say-hello", arg),
  selectDir: (arg) => ipcRenderer.invoke("select-dir", arg),
  isMac: process.platform === "darwin",
  isWindows: process.platform === "win32",
});
