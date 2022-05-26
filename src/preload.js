const { ipcRenderer, contextBridge } = require("electron");
const path = require("path");

contextBridge.exposeInMainWorld("myApp", {
  sayHello: (arg) => ipcRenderer.invoke("say-hello", arg),
  selectDir: (arg) => ipcRenderer.invoke("select-dir", arg),
  readFiles: (arg) => ipcRenderer.invoke("read-files", arg),
  startDrag: (dirPath) => ipcRenderer.invoke('on-drag-start', dirPath/*path.join(process.cwd(), fileName)*/),
  listenForProgress: (callBack) => ipcRenderer.on('progress-update', (event, args) => {
    callBack(args);
  }),
  isMac: process.platform === "darwin",
  isWindows: process.platform === "win32",
});
