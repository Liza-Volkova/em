const Db = require('#libs/database');

const UpdateCourseService = async (courseId, updateData) => {
	const { name, description } = updateData;
	const updates = [];
	const values = [];
	let paramIndex = 1;

	if (name !== undefined) {
		updates.push(`name = $${paramIndex++}`);
		values.push(name);
	}

	if (description !== undefined) {
		updates.push(`description = $${paramIndex++}`);
		values.push(description);
	}

	if (updates.length === 0) {
		const course = await Db.one('SELECT * FROM courses WHERE id = $1', [courseId]);
		return course;
	}

	values.push(courseId);

	const course = await Db.one(
		`UPDATE courses SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
		values
	);

	return course;
}

module.exports = UpdateCourseService;
