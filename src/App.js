
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Home';
import Coffee from './Pages/Coffee';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route Component={HomePage} path='/'></Route>
      <Route Component={Coffee} path='/coffee'></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
