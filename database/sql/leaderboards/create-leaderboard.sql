DECLARE @name NVARCHAR(100) = :name,
		@url_name NVARCHAR(100) = :url_name,
		@ranking_methods_id INT = :ranking_methods_id,
		@theme NVARCHAR(100) = :theme,
		@created_by NUMERIC(10, 0) = :created_by

EXEC dbo.usp_create_leaderboard
	@name = @name,
	@url_name = @url_name,
	@ranking_methods_id = @ranking_methods_id,
	@theme = @theme,
	@created_by = @created_by