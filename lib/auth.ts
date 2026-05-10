import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * Returns a hash of the password.
 */
export async function hashPassword(password: string): Promise<string> {
	return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Checks whether the password is correct.
 */
export async function comparePasswords(
	plainPassword: string,
	hashedPassword: string,
): Promise<boolean> {
	return await bcrypt.compare(plainPassword, hashedPassword);
}
