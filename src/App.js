import { useState } from "react";
import InputField from "./components/InputField";

function App() {

  const [alertText, setAlertText] = useState('');
  const [action, setAction] = useState('hide');


  function displayAlert(text, action) {
    setAlertText(text);
    setAction(action);

    setTimeout(() => {
      setAlertText('');
      setAction('hide');
    }, 1500);
  }

  return (
    <>
      <main className="main">
        <div className={`alert alert-${action}`}>{alertText}</div>
        <h1 className="heading">Grocery Bud</h1>
        <InputField displayAlert={displayAlert} />
      </main>
    </>
  );
}

export default App;
