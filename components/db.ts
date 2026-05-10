import nano from 'nano';

const couchDbUrl = process.env.COUCHDB_URL;
const couchDbUser = process.env.COUCHDB_USER;
const couchDbPassword = process.env.COUCHDB_PASSWORD;

if (!couchDbUrl || !couchDbUser || !couchDbPassword) {
	throw new Error('CouchDB environment variables are not fully configured');
}

const authenticatedUrl = new URL(couchDbUrl);
authenticatedUrl.username = couchDbUser;
authenticatedUrl.password = couchDbPassword;

const getRezept_db = () => {
	const couch = nano(authenticatedUrl.toString());

	return couch.use('rezept_db');
};

export { getRezept_db };
