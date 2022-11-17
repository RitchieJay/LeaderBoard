DECLARE @query NVARCHAR(500) = TRIM(REPLACE(:query, '  ', ' ')),
		@offset INT = :offset,
		@take INT = :take

SELECT	p.*
FROM	dbo.ufn_search_people(
	@query,
	@offset,
	@take
) p