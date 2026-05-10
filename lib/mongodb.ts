import { MongoClient, ObjectId, type Db } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
	throw new Error('MONGODB_URI is not defined');
}

const client = new MongoClient(uri);

export async function getDb(): Promise<Db> {
	await client.connect();
	return client.db('rezepte');
}

// Hilfsfunktion: MongoDB-Dokument in ein reines Objekt umwandeln
export function convertMongoDoc<T extends Record<string, unknown>>(
	doc: T | null | undefined,
): (Omit<T, '_id'> & { id?: string }) | null {
	if (!doc) return null;

	const plainDoc: Record<string, unknown> = { ...doc };
	if (plainDoc._id) {
		plainDoc.id = String(plainDoc._id);
		delete plainDoc._id;
	}

	// Date-Objekte in Strings umwandeln
	for (const key in plainDoc) {
		if (plainDoc[key] instanceof Date) {
			plainDoc[key] = plainDoc[key].toISOString();
		} else if (plainDoc[key] instanceof ObjectId) {
			plainDoc[key] = plainDoc[key].toString();
		}
	}

	return plainDoc as Omit<T, '_id'> & { id?: string };
}
