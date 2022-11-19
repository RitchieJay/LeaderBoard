DECLARE @url_name NVARCHAR(100) = :url_name

SELECT 		TOP(1) l.*
FROM 		dbo.ufn_get_leaderboard_by_url_name(
	@url_name
) l