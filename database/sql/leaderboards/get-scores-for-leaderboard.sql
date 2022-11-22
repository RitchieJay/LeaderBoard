DECLARE @url_name NVARCHAR(100) = :url_name

SELECT 		ls.*
FROM 		dbo.ufn_get_scores_for_leaderboard(
	@url_name
) ls
ORDER BY 	ls.created_at DESC