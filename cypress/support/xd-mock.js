window.storageJSON = {
	_content: '',
	async read() {
		console.log('read', this._content);
		return this._content;
	},
	async write(content) {
		// cy.log('write');
		this._content = content;
	},
	isFile: true
};

window.logTSV = {
	async read() {
		return '';
	},
	async write() {},
	isFile: true
};

window.datafolder = {
	async getEntry(name) {
		// cy.log('getEntry', name);
		return name === 'storage.json' ? window.storageJSON : window.logTSV;
	},
	async createFile() {
		return {
			isFile: true,
			async write() {
				// cy.log(content);
			}
		};
	},
	async createEntry() {
		return window.storageJSON;
	}
};

window.uxp = {
	storage: {
		localFileSystem: {
			async getDataFolder() {
				return window.datafolder;
			}
		},
		types: {
			file: Symbol('file'),
			folder: Symbol('folder')
		},
		formats: { utf8: Symbol('utf-8') }
	}
};

window.scenegraph = {
	root: {
		pluginData: null
	}
};

window.application = {
	async editDocument(cb) {
		await cb([], window.scenegraph.root);
	}
};
window.viewport = {};

const superShowModal = HTMLDialogElement.prototype.showModal,
	superCloseModal = HTMLDialogElement.prototype.close;

HTMLDialogElement.prototype.showModal = function () {
	superShowModal.apply(this, arguments);

	return new Promise((resolve) => {
		this.resolve = resolve;
	});
};

HTMLDialogElement.prototype.close = function (returnString) {
	superCloseModal.apply(this, arguments);

	if (this.resolve) this.resolve(returnString);
};
