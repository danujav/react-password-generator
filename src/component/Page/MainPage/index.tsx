import { useEffect, useState, useRef } from "react";

export default function MainPage() {
  const [range, setRange] = useState(8);
  const [pw, setPw] = useState("");
  const [isNumberInclude, setIsNumberInclude] = useState(false);
  const [isCharInclude, setIsCharInclude] = useState(false);

  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const pw = generatePw();
    setPw(pw);
  }, [range, isNumberInclude, isCharInclude]);

  function generateAlphabet(): string {
    let alphabet = "";

    // For Uppercase A-Z
    for (let i = 65; i <= 90; i++) {
      alphabet += String.fromCharCode(i);
    }

    // For Lowercase a-z
    for (let i = 97; i <= 122; i++) {
      alphabet += String.fromCharCode(i);
    }

    return alphabet;
  }

  function generatePw(): string {
    const alphabet = generateAlphabet();
    console.log(alphabet);

    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const numbers = "0123456789";

    let password = "";
    console.log(range);

    while (password.length < range) {
      if (isNumberInclude && password.length < range) {
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));
      }

      if (isCharInclude && password.length < range) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      if (password.length < range)
        password += alphabet.charAt(
          Math.floor(Math.random() * alphabet.length)
        );
    }
    return password;
  }

  function handleRangeInput(e) {
    setRange(e.target.value);
  }

  function handleIsNumberInclude() {
    setIsNumberInclude((prev) => !prev);
  }

  function handleIsCharInclude() {
    setIsCharInclude((prev) => !isCharInclude);
    // console.log(isCharInclude); // react runs Asynchronously. that' why this not showing updated value. if you want to see use useEffect
  }

  function handleCopyText() {
    window.navigator.clipboard.writeText(pw);
    passwordRef.current?.select();
  }

  return (
    <div className="bg-slate-700 h-screen flex justify-center items-center">
      <div className="bg-slate-300 bg-opacity-40 w-1/2 flex flex-col p-5">
        <div className="flex justify-center items-start">
          <p className="text-2xl font-bold">Password Generator</p>
        </div>
        <div className="grid grid-cols-2 gap-4 p-3 max-w-none">
          <input
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-dotted focus:border-blue-500 focus:ring-blue-500"
            type="text"
            readOnly
            value={pw}
            ref={passwordRef}
          />
          <button
            onClick={handleCopyText}
            className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg
              className="h-5 w-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M13 4H7a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2V6a2 2 0 00-2-2zm0 14H7V6h6v12zM5 4a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2H5z"
                clipRule="evenodd"
              />
            </svg>
            Copy
          </button>
        </div>
        <div className="flex flex-row justify-evenly">
          <div className="flex items-center">
            <span id="rangeValue" className="mr-2">
              {range}
            </span>
            <input
              type="range"
              id="rangeInput"
              min="8"
              max="100"
              value={range}
              onChange={handleRangeInput}
              className="w-full cursor-pointer"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="checkbox" className="mr-2">
              Include Number
            </label>
            <input
              type="checkbox"
              id="checkbox"
              checked={isNumberInclude}
              onChange={handleIsNumberInclude}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="checkbox" className="mr-2">
              Include Characters
            </label>
            <input
              type="checkbox"
              id="checkbox"
              checked={isCharInclude}
              onChange={handleIsCharInclude}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
