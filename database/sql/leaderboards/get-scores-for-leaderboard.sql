DECLARE @leaderboards_id INT = :leaderboards_id

SELECT 		ls.*
FROM 		dbo.ufn_get_scores_for_leaderboard(
	@leaderboards_id
) ls
ORDER BY 	ls.created_at DESC