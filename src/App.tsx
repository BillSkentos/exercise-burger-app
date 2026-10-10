import { useState } from 'react';
import { LoginPage } from './features/auth/LoginPage';

function App() {
  const [token, setToken] = useState<string | null>(null);

  if (!token) {
    return <LoginPage onLogin={setToken} />;
  }

  return (
    <main>
      <h1 className="display">Signed in</h1>
    </main>
  );
}

export default App;
