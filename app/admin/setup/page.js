import { setupUsers } from "@/app/actions";

const AdminSetup = async () => {


	const data = await setupUsers( 'users.json' );

	return (
		<>
			<h1>Alle Benutzer werden aus JSON-Daten erstellt</h1>
		</>
	)
}

export default AdminSetup;