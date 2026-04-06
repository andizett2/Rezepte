// lib/mongodb.js
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

export async function getDb() {
	await client.connect();
	return client.db("rezepte");
}

// Hilfsfunktion: MongoDB-Dokument in ein reines Objekt umwandeln
export function convertMongoDoc(doc) {
	if (!doc) return null;

	const plainDoc = { ...doc };
	if (plainDoc._id) {
		plainDoc.id = plainDoc._id.toString(); // _id → id (String)
		delete plainDoc._id; // _id entfernen
	}

	// Date-Objekte in Strings umwandeln
	for (const key in plainDoc) {
		if (plainDoc[key] instanceof Date) {
			plainDoc[key] = plainDoc[key].toISOString();
		} else if (plainDoc[key] instanceof ObjectId) {
			plainDoc[key] = plainDoc[key].toString();
		}
	}

	return plainDoc;
}

