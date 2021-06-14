import { 
  useState, 
} from "react";

export function App() {
    const [count, setCount] = useState(0);

    return (
      <>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => {
          setTimeout(() => setCount(0), 1000);
        }}>
          Reset
        </button>
      </>
    );
  }