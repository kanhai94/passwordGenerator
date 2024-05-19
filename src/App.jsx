import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  // State variables to manage password generation options and the generated password
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");

  // Ref to store reference to the password input field
  const passwordRef = useRef(null);

  // Function to generate a random password based on current options
  const passwordGenerator = useCallback(() => {
    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) charset += "0123456789";
    if (charAllowed) charset += "+-(){}*&^%$#@!";
    let password = "";
    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(charIndex);
    }
    setGeneratedPassword(password);
  }, [length, numberAllowed, charAllowed]);

  // Function to copy the generated password to clipboard
  const copyPasswordToClipboard = useCallback(() => {
    // Select the text inside the password input field
    passwordRef.current?.select();
    // Execute a fake selection to ensure the text is copied
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(generatedPassword);
  }, [generatedPassword]);

  // useEffect hook to generate a new password whenever options change
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        {/* Input field to display the generated password */}
        <input
          type="text"
          value={generatedPassword}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef} // Assign the ref to the input field
        />
        {/* Button to copy the generated password to clipboard */}
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5"
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        {/* Checkbox to include numbers in the generated password */}
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInput">Include Numbers</label>
        </div>
        {/* Checkbox to include special characters in the generated password */}
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={charAllowed}
            id="charInput"
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="charInput">Include Special Characters</label>
        </div>
        {/* Range input to specify the length of the generated password */}
        <input
          type="range"
          min={6}
          max={100}
          value={length}
          className="cursor-pointer"
          onChange={(e) => setLength(e.target.value)}
        />
        {/* Label to display the current length of the generated password */}
        <label>Length: {length}</label>
      </div>
    </div>
  );
}

export default App;
