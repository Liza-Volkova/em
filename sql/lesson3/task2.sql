SELECT age, COUNT(*) AS количество
FROM users
GROUP BY age
HAVING COUNT(*) > 2;