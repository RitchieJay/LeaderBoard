DECLARE @existing_display_name NVARCHAR(100) = :existing_display_name,
		@new_display_name NVARCHAR(100) = :new_display_name,
		@person_code NUMERIC(10, 0) = :person_code,
		@is_admin BIT = :is_admin,
		@updated_by NUMERIC(10, 0) = :updated_by

EXEC dbo.usp_update_user_by_display_name
	@existing_display_name = @existing_display_name,
	@new_display_name = @new_display_name,
	@person_code = @person_code,
	@is_admin = @is_admin,
	@updated_by = @updated_by