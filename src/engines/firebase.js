import firebase from 'firebase';

export default class Database {
	constructor(configs) {
		console.log('Initializing connection with configs', configs);
		if(firebase.apps.length > 0) {
			console.log('Firebase is already initialized');
		} else {
			console.log('Initializing firebase client');
			firebase.initializeApp(configs);
		}
		this.db = firebase.firestore();
		console.log('Database is now initialized', this.db);
	}

	listen(collection, callback) {
		console.log('Setting a listener');
		this.db.collection(collection).onSnapshot(snapshot => {
			console.log('Got snapshot', snapshot);
			snapshot.docChanges().forEach(function(change) {
					let doc = change.doc;
					let data = doc.data();
					if (change.type === "added") {
							console.log("New: ", data);
							callback( {type: 'added', payload: {...data, id: doc.id}} );
					}
					if (change.type === "modified") {
							console.log("Modified: ", change.doc.data());
							callback( {type: 'modified', payload: {...data, id: doc.id}} );
					}
					if (change.type === "removed") {
							console.log("Removed: ", change.doc.data());
							callback( {type: 'removed', payload: {...data, id: doc.id}} );
					}
			});
		});
	}

	post(collection, data) {
		let parsedData;

		console.log('Parsing', data);

		try {
			parsedData = JSON.parse(JSON.stringify(data));
		} catch(e) {
			console.log('Beep!', e);
			return Promise.reject(e);
		}

		let docRef = this.db.collection(collection).doc();
		let docId = docRef.id;
		console.log('Setting data', parsedData, 'under ID', docId);

		return docRef.set(parsedData).then(() => {
			return Promise.resolve(docId);
		});
	}

	put(collection, id, data) {
		let parsedData;

		console.log('Parsing', data);

		try {
			parsedData = JSON.parse(JSON.stringify(data));
		} catch(e) {
			console.log('Beep!', e);
			return Promise.reject(e);
		}

		let docRef = this.db.collection(collection).doc(id);
		let docId = docRef.id;
		console.log('Setting data', parsedData, 'under ID', docId);

		return docRef.set(parsedData).then(() => {
			return Promise.resolve(docId);
		});
	}

	get(collection, id) {
		console.log('Loading document', id);
		return this.db.collection(collection).doc(id).get().then(doc => {
			console.log('Got', doc);
			if(doc.exists) {
				let docData = doc.data();
				console.log('It exists:', docData); 
				return Promise.resolve(docData);
			} else {
				return Promise.resolve();
			}
		});
	}

	generateId(collection) {
		collection = collection || '_none_';
		console.log('Generating a new ID on collection', collection);
		let docRef = this.db.collection(collection).doc();
		let docId = docRef.id;

		return Promise.resolve(docId);
	}

	list() {
		return this.db.collection('test').get().then(collection => {
			let docs = collection.docs.map(doc => {
				let id = doc.id;
				let data = doc.data();
				return {
					...data,
					id,
				}
			});
			console.log('Got collection', docs);
			return Promise.resolve(docs);
		});
	}

}
