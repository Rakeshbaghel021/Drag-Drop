import { useState } from "react";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import SideBar from "./components/SideBar";
import "./App.css";

function App() {
  const [disableFormulaInput, setDisableFormulaInput] = useState(true);
  const [formula, setFormula] = useState("");

  return (
    <div className="App">
      <div className="left-section">
        <SideBar
          setFormula={setFormula}
          disableFormulaInput={disableFormulaInput}
        />
      </div>
      <div className="right-section">
        <Header />
        <HomePage
          formula={formula}
          setDisableFormulaInput={setDisableFormulaInput}
        />
      </div>
    </div>
  );
}

export default App;
