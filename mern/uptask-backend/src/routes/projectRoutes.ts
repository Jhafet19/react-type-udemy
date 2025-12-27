import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskContoller";
import { validateProjectExist } from "../middleware/project";
import { taskBelongsToProject, taskExists } from "../middleware/task";
import {authenticate} from "../middleware/auth";

const router = Router()
router.param('projectId', validateProjectExist)


router.get('/', ProjectController.getAllProjects)

router.get('/:id',
    param('id').isMongoId().withMessage('Id no válido'),
    handleInputErrors,
    ProjectController.getProjectById)

router.post('/',
    authenticate,
    body('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description').notEmpty().withMessage('La descripcion del proyecto es obligatoria'),
    handleInputErrors,
    ProjectController.createproject)

router.put('/:id',
    param('id').isMongoId().withMessage('Id no válido'),
    body('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description').notEmpty().withMessage('La descripcion del proyecto es obligatoria'),
    handleInputErrors,
    ProjectController.updateProject)

router.delete('/:id',
    param('id').isMongoId().withMessage('Id no válido'),
    handleInputErrors,
    ProjectController.deleteProject)

/* Routes for task*/

router.post('/:projectId/tasks',
    body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
    body('description').notEmpty().withMessage('La descripcion de la tarea es obligatoria'),
    handleInputErrors,
    TaskController.createTask)



router.get('/:projectId/tasks',
    TaskController.getProjectTask
)

router.param('taskId', taskExists)
router.param('taskId', taskBelongsToProject)

router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Id no válido'),
    handleInputErrors,
    TaskController.getTaskById
)

router.put('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Id no válido'),
    body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
    body('description').notEmpty().withMessage('La descripcion de la tarea es obligatoria'),
    handleInputErrors,
    TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Id no válido'),
    handleInputErrors,
    TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('Id no válido'),
    body('status').notEmpty().withMessage('El estado es obligatorio'),
    TaskController.updateStatus,
    handleInputErrors,

)
export default router