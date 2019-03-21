import Mock from './engines/mock';
import Firebase from './engines/firebase';

export default class Database {

	listen(collection, callback) {
		if(!collection || typeof(collection) !== 'string') {
			console.log(`The 'collection' parameter expects a string. Got %{typeof(collection)}`);
			return;
		}
		
		if(!callback || typeof(callback) !== 'function') {
			console.log(`The 'callback' parameter expects a function. Got %{typeof(callback)}`);
			return;
		}

		return this.db.listen(collection, callback);
	}

	get(collection, id) {
		if(!collection || typeof(collection) !== 'string') {
			console.log(`The 'collection' parameter expects a string. Got %{typeof(collection)}`);
			return;
		}
		
		if(!id || typeof(id) !== 'string') {
			console.log(`The 'id' parameter expects a string. Got %{typeof(id)}`);
			return;
		}
		
		return this.db.get(collection, id);
	}

	post(collection, data) {
		if(!collection || typeof(collection) !== 'string') {
			console.log(`The 'collection' parameter expects a string. Got %{typeof(collection)}`);
			return;
		}
		
		if(!data || typeof(data) !== 'object') {
			console.log(`The 'data' parameter expects an object. Got %{typeof(data)}`);
			return;
		}
		
		return this.db.post(collection, data);
	}

	put(collection, id, data) {
		if(!collection || typeof(collection) !== 'string') {
			console.log(`The 'collection' parameter expects a string. Got %{typeof(collection)}`);
			return;
		}
		
		if(!id || typeof(id) !== 'string') {
			console.log(`The 'id' parameter expects a string. Got %{typeof(id)}`);
			return;
		}
		
		if(!data || typeof(data) !== 'object') {
			console.log(`The 'data' parameter expects an object. Got %{typeof(data)}`);
			return;
		}
		
		return this.db.put(collection, id, data);
	}

	delete(collection, id) {
		if(!collection || typeof(collection) !== 'string') {
			console.log(`The 'collection' parameter expects a string. Got %{typeof(collection)}`);
			return;
		}
		
		if(!id || typeof(id) !== 'string') {
			console.log(`The 'id' parameter expects a string. Got %{typeof(id)}`);
			return;
		}
		
		return this.db.delete(collection, id);
	}

	list(collection) {
		if(!collection || typeof(collection) !== 'string') {
			console.log(`The 'collection' parameter expects a string. Got %{typeof(collection)}`);
			return;
		}

		return this.db.list(collection);
	}

	generateId(collection) {
		if(!collection || typeof(collection) !== 'string') {
			console.log(`The 'collection' parameter expects a string. Got %{typeof(collection)}`);
			return;
		}

		return this.db.generateId(collection);
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
