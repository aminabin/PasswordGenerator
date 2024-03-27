import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] =useState("")

  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~"

    for(let i=0; i<=length; i++){
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])
  
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)}, [password])

  useEffect(() => {passwordGenerator()}, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
    <div className='relative top-20 flex items-center justify-center'>
      <div className='w-full bg-gray-300 mx-auto max-w-md shadow-lg rounded-lg p-4 my-8 font-bold text-lg'>
        <div className='flex shadow-md rounded-lg overflow-hidden mb-4'>
          <input type="text" name="" id="" value={password} className='outline-none w-full py-1 px-3' placeholder='Password here' readOnly ref={passwordRef }/>
          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white font-semibold px-3 py-0.5 shrink-0'>COPY</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={8} max={100} value={length} className="cursor-pointer" onChange={(e) => {setLength(e.target.value)}} name="" id="" />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' onChange={() => {setNumberAllowed((prev)=> !prev);}} />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={charAllowed} id='charInput' onChange={() => {setCharAllowed((prev)=> !prev);}} />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default App

