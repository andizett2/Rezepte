import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10; // Anzahl der Hash-Runden

/**
 * Returns a hash of the password
 * @param {*} password
 * @returns
 */
export async function hashPassword(password) {
	return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Checks wether the password is correct
 * @param {*} plainPassword
 * @param {*} hashedPassword
 * @returns
 */
export async function comparePasswords(plainPassword, hashedPassword) {
	return await bcrypt.compare(plainPassword, hashedPassword);
}