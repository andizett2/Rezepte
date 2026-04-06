import { getUsers } from "../../actions.js";

// Auflistung aller User
const AdminUsers = async () => {
	const users = await getUsers();

	return (
		<div className="container">
			<h1>Benutzerverwaltung</h1>
			<table className="admin-table">
				<thead>
					<tr>
						<th>Vorname</th>
						<th>Nachname</th>
						<th>E-Mail</th>
						<th>Admin</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.email}>
							<td>{user.firstname}</td>
							<td>{user.lastname}</td>
							<td>{user.email}</td>
							<td>{user.isadmin ? "Ja" : "Nein"}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default AdminUsers;
