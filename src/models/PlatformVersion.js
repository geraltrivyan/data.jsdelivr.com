const Joi = require('joi');
const BaseModel = require('./BaseModel');

const schema = {
	id: Joi.number().integer().min(0).required().allow(null),
	platformId: Joi.number().integer().min(0).required().allow(null),
	version: Joi.string().max(255).required(),
};

class PlatformVersion extends BaseModel {
	static get table () {
		return 'platform_version';
	}

	static get schema () {
		return schema;
	}

	static get unique () {
		return [ 'id', 'platformId', 'version' ];
	}

	constructor (properties = {}) {
		super();

		/** @type {number} */
		this.id = null;

		/** @type {number} */
		this.platformId = null;

		/** @type {string} */
		this.version = null;

		Object.assign(this, properties);
		return new Proxy(this, BaseModel.ProxyHandler);
	}

	toSqlFunctionCall () {
		return db.raw(`set @lastIdPlatformVersion = updateOrInsertPlatformVersion(@lastIdPlatform, ?);`, [ this.version ]);
	}
}

module.exports = PlatformVersion;
