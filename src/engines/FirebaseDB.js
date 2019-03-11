import firebase from 'firebase';

export default class Database {
	constructor(configs) {
		console.log('Initializing connection with configs', configs);
		firebase.initializeApp(configs)
		this.db = firebase.firestore();
		console.log('Database is not initialized', this.db);
	}

	post(data) {
		let parsedData;

		try {
			parsedData = JSON.parse(data);
		} catch(e) {
			console.log('Beep!', e);
			parsedData = {message: 'failed!'};
		}

		let docRef = this.db.collection('test').doc();
		console.log('REFREFERFEREFE', docRef);
		let docId = docRef.id;
		console.log('Setting data', parsedData, 'under ID', docId);

		return docRef.set(parsedData).then(() => {
			return Promise.resolve(docId);
		});
	}

	get(id) {
		console.log('Loading document', id);
		return this.db.collection('test').doc(id).get().then(doc => {
			console.log('Got', doc);
			if(doc.exists) {
				let docData = doc.data();
				console.log('It exists:', docData); 
				return Promise.resolve(docData);
			} else {
				return Promise.resolve('none');
			}
		});
	}

	list() {
		return new Promise((resolve, reject) => {
			let data = this.db;

			this._mockDelay().then(() => {
				resolve(data)
			});
		});
	}

}
