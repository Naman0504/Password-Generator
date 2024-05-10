import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numallow, setnumallow] = useState(false);
  const [charallow, setcharallow] = useState(false);
  const [password, setpassword] = useState("");

  const passref = useRef(null);

  const copypass = useCallback(() => {
    passref.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numallow) str += "0123456789";
    if (charallow) str += "!@$%^&*-_+={}[]~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numallow, charallow]);

  useEffect(() => {
    passwordGen();
  }, [length, numallow, charallow]);
  return (
    <>
      <div className=" h-screen flex justify-center items-center">
        <div>
          <h1 className="text-4xl text-center p-auto  text-white">
            Password Generator
          </h1>
          <div className="w-full max-w-md mx-auto shadow-lg rounded-lg px-4 py-4 my-8 text-green-400 bg-gray-600">
            <div className="flex shadow rounded-lg overflow-hidden mb-4">
              <input
                type="text"
                value={password}
                className="outline-none w-full py-2 px-3"
                placeholder="password"
                readOnly
                ref={passref}
              />
              <button
                className="bg-green-600 outline-none text-black px-3 py-1 shrink-0"
                onClick={copypass}
              >
                Copy
              </button>
            </div>

            <div className="flex text-sm gap-x-2">
              <div className="flex items-center gap-x-1">
                <input
                  type="range"
                  min={6}
                  max={100}
                  value={length}
                  className="cursor-pointer"
                  onChange={(e) => {
                    setlength(e.target.value);
                  }}
                />
                <label>Length({length})</label>
              </div>
              <div className="flex items-center gap-x-1">
                <input
                  type="checkbox"
                  defaultChecked={numallow}
                  id="numinput"
                  onChange={() => {
                    setnumallow((prev) => !prev);
                  }}
                />
                <label>Numbers</label>

                <input
                  type="checkbox"
                  defaultChecked={charallow}
                  id="numinput"
                  onChange={() => {
                    setcharallow((prev) => !prev);
                  }}
                />
                <label>Characters</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
