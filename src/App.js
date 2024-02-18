import './components/style.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
// import { Checklist } from './components/Checklist';
import { Checklist } from './components/Checklist';
import { Navbar } from './components/Navbar';
import { About } from './components/About';
import { Resources } from './components/Resources';
import { Focus } from './components/Focus';
import { Login } from './components/Login';
function App() {
  return (
		<Router>
			<div className="App">
                <Navbar/>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/about" element={<About />} />
					{/* <Route path="/resources" element={<Resources />} /> */}
                    <Route path="/checklist" element={<Checklist />} />
                    <Route path="/focus" element={<Focus />} />
				</Routes>
			</div>
		</Router>
  );
}

export default App;
