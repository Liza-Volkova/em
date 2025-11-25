SELECT a.address, u.surname
FROM addresses a
INNER JOIN users u ON a.users_id = u.id;