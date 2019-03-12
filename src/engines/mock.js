export default class Database {
	constructor(configs) {
		this.db = [];
	}

	listen(callback) {
		this.listener = callback;
	}

	post(data) {
		return new Promise((resolve, reject) => {
			let id = '' + Object.keys(this.db).length;
			let newEntry = {
				id,
				data,
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
