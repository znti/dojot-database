import MockDB from './engines/MockDB';
import FirebaseDB from './engines/FirebaseDB';

export default class Database {
	constructor(configs) {

		console.log('Initializing database with configs:', configs);

		let dbEngineName = configs && configs.engine;
		let dbEngine;

		switch(dbEngineName) {
			case 'firebase':
				console.log('Initializing with firebase');
				dbEngine = new FirebaseDB(configs.configs);
				break;

			default:
				console.log('Initializing with mockdb');
				dbEngine = new MockDB();
				break;
		}

		this.db = dbEngine;
		console.log('Loaded engine:', this.db);

	}

	post(data) {
		return this.db.post(data);
	}

	get(id) {
		return this.db.get(id);
	}

	list() {
		return this.db.list();
	}

}
