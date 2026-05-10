export type UserId = string;

export interface AppUser {
	_id?: UserId;
	email: string;
	firstname: string;
	lastname?: string;
	password?: string;
	isadmin?: boolean;
	slogan?: string;
	created_at?: string;
}

export interface UserWriteResult {
	acknowledged: boolean;
	insertedId: string;
}

export interface UserDeleteResult {
	acknowledged: boolean;
	deletedCount: number;
	deletedDocument: AppUser | null;
}
