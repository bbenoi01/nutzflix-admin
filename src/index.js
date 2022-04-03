import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import rootStore from './rootStore';
import App from './App';

render(
	<React.StrictMode>
		<Provider store={rootStore}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
