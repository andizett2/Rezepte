"use server";

import { join } from 'node:path';
import { readFile } from 'node:fs/promises';
import { getRezept_db } from '@/components/db';

// Die User-Objekte werden aus einem JSON-File in die DB geschrieben
export async function setupUsers( filename ) {
	const data = await readJSONFile(filename);
	console.log(data);
	const deleted = data.map(user => deleteUser(user.email));
	//const db = getRezept_db();
	//const response = await db.compact();
	//console.log(response);
	const results = data.map(user => insertUser(user));
	return data;
}

// Einlesen eines JSON-Files aus dem public-Ordner im Filesystem
async function readJSONFile(filename) {
	const filepath = join(process.cwd(), 'public', filename);
	const file = await readFile(filepath)
	const data = JSON.parse(file);

	return data
};

async function deleteUser(id) {
	const db = getRezept_db();

	try {
		const doc = await db.get(id);
		if ( doc ) {
			const response = await db.destroy(doc.email, doc._rev);
			console.log( 'Dokument gelöscht', id);
		} else {
			console.log( 'Dokument nicht gefunden', id);
		}
	} catch ( error ) {
		console.log( 'Fehler beim Abrufen des Users' + error);
	}

}

// Ein User in die DB schreiben
async function insertUser(user) {
	const db = getRezept_db();
	const { firstname, lastname = '', email, password, isadmin = false, slogan = '' } = user;

	const userDoc = {
		_id: email,
		type: 'user',
		firstname,
		lastname,
		email,
		password,
		isadmin,
		created_at: new Date().toISOString(),
		slogan,
	};

	try {
		const response = await db.insert(userDoc);
		console.log(response);
		return response;
	} catch (error) {
		return {
			error: 'Fehler beim Erstellen des Users' + error
		};
	}
}
