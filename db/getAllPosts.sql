SELECT p.*, u.username FROM posts p
INNER JOIN users u
    ON p.user_id = u.user_id
ORDER BY p.post_id DESC;