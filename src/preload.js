const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("myApp", {
  sayHello: (arg) => ipcRenderer.invoke("say-hello", arg),
});
