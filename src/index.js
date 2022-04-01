import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { DarkModeContextProvider } from './context/darkModeContext';

render(
	<React.StrictMode>
		<DarkModeContextProvider>
			<App />
		</DarkModeContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
