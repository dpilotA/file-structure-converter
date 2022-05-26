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
  //errorMsg

  function updateProgress(newProgress) {
    setProgress(newProgress);
  }

  async function clicked() {
    setBtnLoading(true);

    const result = await myApp.selectDir();
    if (result.canceled) {
      //setErrorMsg();
      setBtnLoading(false);
      setFolderPicked(false);
      return;
    }
    setFolderPicked(true);
    console.log(updateProgress);
    const dirResponse = await myApp.readFiles({folder: result.filePaths[0] });
    console.log(dirResponse);
    setBtnLoading(false);
    setTempDir(dirResponse);
  }

  function onDrag(event)  {
    console.log(tempDir);
    event.preventDefault();
    myApp.startDrag(tempDir)
    //"/Users/adamsloup/Documents/Code Projects/file-structure-converter/tests/Content"
  }

  useEffect(() => {
    myApp.listenForProgress(setProgress);
  }, [])
  
  //ADD RESET, FIX IMAGE, ADD WINDOWS

  return (
    <Container>
        <ChooseFileBtn loading={btnLoading} onClick={clicked} title={"Upload Folder"} filesPicked={folderPicked}/>
        <ArrowProgress progress={progress}/>
        {/* Sipka dolu */}
        <FolderDispenser isMac={myApp.isMac} folderDir={tempDir} onDragStart={onDrag}/>
    </Container>
  )
}

export default HomePage
