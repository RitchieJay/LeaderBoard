SELECT 		l.*
FROM 		dbo.ufn_get_leaderboards() l
ORDER BY 	l.created_at DESC, l.[name], l.leaderboards_id