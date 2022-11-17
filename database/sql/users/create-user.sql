DECLARE @display_name NVARCHAR(100) = :display_name,
		@person_code NUMERIC(10, 0) = :person_code,
		@is_admin BIT = :is_admin,
		@created_by NUMERIC(10, 0) = :created_by

EXEC usp_create_user
	@display_name = @display_name,
	@person_code = @person_code,
	@is_admin = @is_admin,
	@created_by = @created_by