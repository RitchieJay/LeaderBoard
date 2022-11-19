DECLARE @existing_url_name NVARCHAR(100) = :existing_url_name,
		@name NVARCHAR(100) = :name,
		@url_name NVARCHAR(100) = :url_name,
		@ranking_methods_id INT = :ranking_methods_id,
		@theme NVARCHAR(100) = :theme,
		@updated_by NUMERIC(10, 0) = :updated_by

EXEC dbo.usp_update_leaderboard_by_url_name
	@existing_url_name = @existing_url_name,
	@name = @name,
	@url_name = @url_name,
	@ranking_methods_id = @ranking_methods_id,
	@theme = @theme,
	@updated_by = @updated_by