const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: "Storage Converter",
    width: 400,
    height: 600,
    icon: path.join(__dirname, "icon.png"),
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      autoHideMenuBar: true,
      devTools: false,
    },
  });

  //mainWindow.setResizable(false);
  mainWindow.removeMenu();

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
  deleteTmpDir();
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.handle("say-hello", async (event, args) => {
  console.log(args);
  return "Hello from the main process: The app version is: " + app.getVersion();
});

ipcMain.handle("select-dir", async (event, args) => {
  console.log(args);
  var response = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  console.log(response);
  return response;
});

ipcMain.handle("read-files", async (event, args) => {
  console.log("read-files");
  console.log(args);
  const { folder } = args;

  function pad(num, size) {
    var n = "0000" + num;
    return n.substring(n.length - size);
  }

  var tempDir = "./tmp/Content";

  fs.readdir(folder, (err, files) => {
    //roztřídit podle orgId

    console.log("readDir");

    var dF = {};
    var ignored = [];
    files.forEach((file) => {
      var isValid = file.split("_").length === 3;
      if (isValid) {
        var orgId = pad(file.split("_")[1], 4);
        console.log(`${file} - ${orgId}`);
        if (dF[orgId] === undefined) {
          dF[orgId] = [file];
        } else {
          dF[orgId].push(file);
        }
      } else {
        console.log(`${file} - pass`);
        ignored.push(file);
      }
    });
    console.log(dF);
    console.log(ignored);
    //překopírovat do nové složky podle roztřízení
    var dir = tempDir;

    if (fs.existsSync("./tmp")) {
      deleteTmpDir();
      fs.mkdirSync(dir, { recursive: true });
    }
    Object.keys(dF).forEach((key, i, arr) => {
      var orgDir = `${dir}/${key}/titles`;

      if (!fs.existsSync(orgDir)) {
        fs.mkdirSync(orgDir, { recursive: true });
      }

      dF[key].forEach((file) => {
        fs.copyFile(`${folder}/${file}`, `${orgDir}/${file}`, (err) => {
          if (err) throw err;
          console.log(`${file} was copied to ${orgDir}/${file}`);
        });
      });
      //0 / 6-1
      event.sender.send("progress-update", i / (arr.length - 1));
    });

    console.log("preAppend");

    //zapsat ignorovane soubory do textoveho souboru
    fs.appendFile(
      `${dir}/ignored_files.txt`,
      ignored.join("\n"),
      function (err) {
        if (err) {
          // append failed
        } else {
          // done
        }
      }
    );

    console.log(dir);

    tempDir = dir;
  });

  console.log("tempDir");
  console.log(tempDir);

  return tempDir;
});

const iconName = path.join(
  __dirname,
  process.platform === "darwin"
    ? "macos_folder_icon.png"
    : "win10_folder_icon.png"
);

ipcMain.handle("on-drag-start", (event, dirPath) => {
  console.log(path.resolve(dirPath));
  //if tmp deleted
  //send error + popup dialog
  //check if copied file to destination is OK
  event.sender.startDrag({
    file: path.resolve(dirPath), //dirPath,//path.join(__dirname, filePath),
    icon: iconName,
  });
});

ipcMain.handle("delete-tmp", (event, args) => {
  deleteTmpDir();
});

function deleteTmpDir() {
  //delete tmp directory
  fs.rmSync("./tmp", { recursive: true, force: true });
}
