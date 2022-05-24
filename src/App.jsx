import React from "react"
import ReactDOM from "react-dom"

async function clicked() {
    const result = await myApp.sayHello("Hello from the render");
    console.log(result);
}

ReactDOM.render(
    <div>
        <button onClick={clicked} >Click Me</button>
        <h1>Hello From React</h1>
    </div>
, document.getElementById("root"));