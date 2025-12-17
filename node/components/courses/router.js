const Express = require('express');
const CreateCourseController = require('./controllers/create-course');
const SubscribeOnCourseController = require('./controllers/subscribe-on-course');
const GetCourseController = require('./controllers/get-course');
const UpdateCourseController = require('./controllers/update-course');
const DeleteCourseController = require('./controllers/delete-course');
const GetMentorCoursesController = require('./controllers/get-mentor-courses');
const GetStudentCoursesController = require('./controllers/get-student-courses');
const GetAllCoursesController = require('./controllers/get-all-courses');
const AuthorizationMiddleware = require('#middlewares/auth');
const IsMentorMiddleware = require('#middlewares/is-mentor');
const IsAdminMiddleware = require('#middlewares/is-admin');

const Router = Express.Router();

Router.post('/courses', AuthorizationMiddleware, IsMentorMiddleware, CreateCourseController.run);

Router.post('/courses/subscribe', AuthorizationMiddleware, IsMentorMiddleware, SubscribeOnCourseController.run);

Router.get('/courses/mentor/my', AuthorizationMiddleware, IsMentorMiddleware, GetMentorCoursesController.run);

Router.get('/courses/student/my', AuthorizationMiddleware, GetStudentCoursesController.run);

Router.get('/courses', AuthorizationMiddleware, IsAdminMiddleware, GetAllCoursesController.run);

Router.get('/courses/:id', AuthorizationMiddleware, GetCourseController.run);

Router.patch('/courses/:id', AuthorizationMiddleware, IsMentorMiddleware, UpdateCourseController.run);

Router.delete('/courses/:id', AuthorizationMiddleware, IsAdminMiddleware, DeleteCourseController.run);

module.exports = Router;
