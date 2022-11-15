DECLARE @display_name NVARCHAR(100) = :display_name

SELECT 	TOP(1) u.*
FROM 	dbo.ufn_get_user_by_display_name(
	@display_name
) u