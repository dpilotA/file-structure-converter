import React from "react"
import ReactDOM from "react-dom"

async function clicked() {
    //const result = await myApp.sayHello("Hello from the render");
    const result = await myApp.selectDir();
    console.log(myApp.isMac);
    console.log(myApp.isWindows);
    console.log(result);
}

ReactDOM.render(
    <div>
        <button onClick={clicked}>Click Me</button>
        <h1>Hello From React</h1>
        <p>{window.myApp.isMac ? "mac" : "notMac"}</p>
        <p>{window.myApp.isWindows ? "win": "notWin"}</p>
    </div>
, document.getElementById("root"));