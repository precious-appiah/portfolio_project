import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// import  TodoPage from './pages/TodoPage'
// import "./assets/styles.css"
import { UserContext } from './contexts/UserContext';

// pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import TodoPage from './pages/TodoPage';

function App() {
	const [user, setUser] = useState(null);
	return (
		<>
			<UserContext.Provider value={{ user, setUser }}>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/main-page' element={<TodoPage />} />
				</Routes>
			</UserContext.Provider>
		</>
	);
}

export default App;
