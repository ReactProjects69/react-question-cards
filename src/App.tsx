import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Counter } from "./Counter.tsx";

function App() {

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <hr/>
            <Counter/>
        </>
    )
}

export default App
