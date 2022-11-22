DECLARE @include_inactive BIT = :include_inactive

SELECT 		u.*
FROM 		dbo.ufn_get_users(
	@include_inactive
) u
ORDER BY 	u.display_name, u.users_id