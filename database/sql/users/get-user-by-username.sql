DECLARE @username NVARCHAR(100) = :username

SELECT 	TOP(1) u.*
FROM 	dbo.ufn_get_user_by_username(
	@username
) u