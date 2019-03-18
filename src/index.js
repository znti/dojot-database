import Mock from './engines/mock';
import Firebase from './engines/firebase';

export default class Database {

	listen(callback) {
		this.db.listen(callback);
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

	generateId() {
		return this.db.generateId();
	}

	constructor(configs) {

		console.log('Initializing database with configs:', configs);

		let dbEngineName = configs && configs.engine;
		let dbEngine;

		switch(dbEngineName) {
			case 'firebase':
				console.log('Initializing with firebase');
				dbEngine = new Firebase(configs.configs);
				break;

			default:
				console.log('Initializing with mockdb');
				dbEngine = new Mock();
				break;
		}

		this.db = dbEngine;
		console.log('Loaded engine:', this.db);

	}
}
