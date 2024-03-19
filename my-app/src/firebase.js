import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyDoZXrgEpytk2EerYNBG5z65eVHCE0a4Co',
	authDomain: 'taskproject-7d7c6.firebaseapp.com',
	projectId: 'taskproject-7d7c6',
	storageBucket: 'taskproject-7d7c6.appspot.com',
	messagingSenderId: '507310211705',
	appId: '1:507310211705:web:c075a7728e9d2023730aa8',
	databaseURL:
		'https://taskproject-7d7c6-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
