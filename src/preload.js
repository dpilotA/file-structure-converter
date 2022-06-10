const { ipcRenderer, contextBridge } = require("electron");
const path = require("path");

contextBridge.exposeInMainWorld("myApp", {
  selectDir: (arg) => ipcRenderer.invoke("select-dir", arg),
  readFiles: (arg) => ipcRenderer.invoke("read-files", arg),
  startDrag: (dirPath) => ipcRenderer.invoke("on-drag-start", dirPath),
  listenForProgress: (callBack) =>
    ipcRenderer.on("progress-update", (event, args) => {
      callBack(args);
    }),
  deleteTmpDir: (arg) => ipcRenderer.invoke("delete-tmp", arg),
  isMac: process.platform === "darwin",
  isWindows: process.platform === "win32",
});
