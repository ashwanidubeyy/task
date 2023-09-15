

import { Route, Routes } from 'react-router';
import Home from './components/Home';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/register/:id" element={<RegistrationForm />} />
      </Routes>
    </div>
  );
}

export default App;
