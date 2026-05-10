'use client';

import './AdminNav.css';
import Link from 'next/link';
import { useStore } from '@/store';

const AdminNav = () => {
	const user = useStore((state) => state.currentUser);

	return (
		<>
			{user && user.isadmin && (
				<div className="admin-nav">
					<Link href="/admin/users">Benutzer</Link>&nbsp;|&nbsp;
					<Link href="/admin/rezepte">Rezepte</Link>&nbsp;|&nbsp;
					<Link href="/admin/setup">Benutzer Setup</Link>
				</div>
			)}
		</>
	);
};

export default AdminNav;
