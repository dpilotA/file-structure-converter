import React, {useState, useEffect} from 'react';
import ArrowProgress from './ArrowProgress.jsx';
import ChooseFileBtn from "./ChooseFileBtn.jsx";
import Container from "./Container.jsx";
import FolderDispenser from "./FolderDispenser.jsx";

function HomePage() {

  const [tempDir, setTempDir] = useState("");
  const [folderPicked, setFolderPicked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [btnLoading, setBtnLoading] = useState(false);
  //errorMsg -> in React or in main
  
  //reset state
  function resetState() {
    //state
    setTempDir("");
    setProgress(0);
    setFolderPicked(false);
    setBtnLoading(false);
    //temp folder
    myApp.deleteTmpDir();
  }
  
  //pickDir
  async function readDir() {
    setBtnLoading(true);

    const result = await myApp.selectDir();
    if (result.canceled || result.filePaths.length === 0) {
      resetState();
      return;
    }
    setFolderPicked(true);

    return result.filePaths[0];
  }
  
  //convert
  async function convert() {
    
    //getFolder
    const folder = await readDir();

    //restructure files and copy to temp dir
    const dirResponse = await myApp.readFiles({folder});
    console.log(dirResponse);
    setBtnLoading(false);
    setTempDir(dirResponse);
  }
  
  //updateProgress
  function updateProgress(newProgress) {
    console.log("prog", newProgress);
    setProgress(newProgress);
  }
  
  //onDrag
  function onDrag(event)  {
    console.log(tempDir);
    event.preventDefault();
    myApp.startDrag(tempDir)
    //"/Users/adamsloup/Documents/Code Projects/file-structure-converter/tests/Content"
  }




  function onRepeat() {
    //reset state
    resetState();
    // convert();
  }

  useEffect(() => {
    myApp.listenForProgress(updateProgress);
  }, [])
  
  //ADD RESET

  return (
    <Container>
        <ChooseFileBtn loading={btnLoading} onUpload={convert} onRepeat={onRepeat} title={"Upload Folder"} filesPicked={folderPicked}/>
        <ArrowProgress progress={progress}/>
        <FolderDispenser isMac={myApp.isMac} folderDir={tempDir} onDragStart={onDrag}/>
    </Container>
  )
}

export default HomePage
