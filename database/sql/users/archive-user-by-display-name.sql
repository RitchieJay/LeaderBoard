DECLARE @display_name NVARCHAR(100) = :display_name,
		@archived_by NUMERIC(10, 0) = :archived_by

EXEC usp_archive_user_by_display_name
	@display_name = @display_name,
	@archived_by = @archived_by