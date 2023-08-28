import React from 'react';
import Login from './Component/Login';

import Home from './Component/Home';
// import Trailer from './Component/Trailer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Component/Signup';
import Trade from './Component/Trade';
import MyList from './Component/MyList';
import Trailer from './Component/Trailer';
import Netflix from './Component/Netflix';


function App() {
return (
	<Router>
	{/* <Navbar /> */}

	<Routes>

	<Route path='/login' element={<Login/>}/>
	<Route path='/signup' element={<Signup/>}/>
	<Route path='/' element={<Home/>}/>
	<Route path='/list' element={<MyList/>}/>
	<Route path='/info/:id' element={<Trailer/>}/>
	<Route path='/netflix/:id' element={<Netflix/>}/>
	<Route path='/trailer' element={<Trade/>}/>
	{/* <Route path='/trailer' element={<Trailer/>}/> */}
		{/* <Route path='/' exact component={Home} />
		<Route path='/about' component={About} />
		<Route path='/events' component={Events} />
		<Route path='/annual' component={AnnualReport} />
		<Route path='/team' component={Teams} />
		<Route path='/blogs' component={Blogs} />
		<Route path='/sign-up' component={SignUp} /> */}
	</Routes>
	</Router>
);
}

export default App;
