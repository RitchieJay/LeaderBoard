DECLARE @url_name NVARCHAR(100) = :url_name,
		@archived_by NUMERIC(10, 0) = :archived_by

EXEC dbo.usp_archive_leaderboard_by_url_name
	@url_name = @url_name,
	@archived_by = @archived_by