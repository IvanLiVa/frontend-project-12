import { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Hello, World!</h1>
      <button type="button" onClick={() => setCount(count + 2)}>
        count is {count}
      </button>
    </div>
  );
};

export default App;
