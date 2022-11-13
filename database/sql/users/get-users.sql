SELECT 		u.*
FROM 		dbo.ufn_get_users() u
ORDER BY 	u.display_name, u.users_id