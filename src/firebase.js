import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: 'nutzflix-ea082.firebaseapp.com',
	projectId: 'nutzflix-ea082',
	storageBucket: 'nutzflix-ea082.appspot.com',
	messagingSenderId: '265613645344',
	appId: '1:265613645344:web:693a9d70761f1e2e5c0e45',
	measurementId: 'G-EFE4CB9E8D',
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
export default storage;
