
module.exports = {
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'password',
		database: 'bry',
		charset: 'utf8',
	},
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		directory: './src/database/migrations'
	},
	useNullAsDefault: true
};
