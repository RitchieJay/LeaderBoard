SELECT 	TOP(1) u.*
FROM 	dbo.vw_users u
WHERE 	u.private_username = :username
AND 	u.is_active = 1