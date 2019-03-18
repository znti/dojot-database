export default class Database {
	constructor(configs) {
		this.db = [];
	}

	listen(callback) {
		this.listener = callback;
	}

	post(data) {
		return new Promise((resolve, reject) => {
			let id = 'id' + this.db.length;
			let newEntry = {
				...data,
				id,
			}
			this.db[id] = newEntry;

			this._mockDelay().then(() => {
				typeof(this.listener) === 'function' && this.listener(newEntry);
				resolve(id)
			});
		});
	}

	get(id) {
		return new Promise((resolve, reject) => {
			let data = this.db.find(entry => entry.id === id);

			this._mockDelay().then(() => {
				resolve(data)
			});
		});
	}

	generateId() {
		return this.db.length;
	}

	list() {
		return new Promise((resolve, reject) => {
			let data = this.db;

			this._mockDelay().then(() => {
				resolve(data)
			});
		});
	}

	_mockDelay() {
		const minMsDelay = 200;
		const maxMsDelay = 1000;

		return new Promise((resolve) => {
			let delayMs = minMsDelay + Math.random()*(maxMsDelay - minMsDelay);
			setTimeout(() => resolve(), delayMs);
		});
	}

}
