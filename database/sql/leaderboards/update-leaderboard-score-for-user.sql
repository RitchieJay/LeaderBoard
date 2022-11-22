DECLARE @leaderboard_url_name NVARCHAR(100) = :leaderboard_url_name,
		@user_display_name NVARCHAR(100) = :user_display_name,
		@score NVARCHAR(100) = :score,
		@updated_by NUMERIC(10, 0) = :updated_by

EXEC dbo.usp_update_leaderboard_score_for_user
	@leaderboard_url_name = @leaderboard_url_name,
	@user_display_name = @user_display_name,
	@score = @score,
	@updated_by = @updated_by