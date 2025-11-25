DELETE FROM users
WHERE id IN (
	SELECT id FROM users
	ORDER BY id
	LIMIT 2
);

