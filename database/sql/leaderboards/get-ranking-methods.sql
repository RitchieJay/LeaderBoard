SELECT 		rm.*
FROM 		dbo.ufn_get_ranking_methods() rm
ORDER BY 	rm.sort_order, rm.name