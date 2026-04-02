import couchdb from 'nano';

const getRezept_db = () => {
	const couch = couchdb({
		url: process.env.COUCHDB_URL,
		auth: {
			username: process.env.COUCHDB_USER,
			password: process.env.COUCHDB_PASSWORD
		}
	});
	return couch.use('rezept_db');
}

export { getRezept_db};