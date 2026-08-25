import { Router } from 'express'
import playersController from '../controllers/playersController'
import coachesController from '../controllers/coachesController'
import teamsController from '../controllers/teamsController'
import academiesController from '../controllers/academiesController'
import trainingSessionsController from '../controllers/trainingSessionsController'
import dashboardController from '../controllers/dashboardController'

const router = Router()

// مسارات اللاعبين
router.get('/players', playersController.getAllPlayers)
router.get('/players/:id', playersController.getPlayerById)
router.post('/players', playersController.createPlayer)
router.put('/players/:id', playersController.updatePlayer)
router.delete('/players/:id', playersController.deletePlayer)

// مسارات المدربين
router.get('/coaches', coachesController.getAllCoaches)
router.get('/coaches/:id', coachesController.getCoachById)
router.post('/coaches', coachesController.createCoach)
router.put('/coaches/:id', coachesController.updateCoach)
router.delete('/coaches/:id', coachesController.deleteCoach)

// مسارات الفرق
router.get('/teams', teamsController.getAllTeams)
router.get('/teams/:id', teamsController.getTeamById)
router.post('/teams', teamsController.createTeam)
router.put('/teams/:id', teamsController.updateTeam)
router.delete('/teams/:id', teamsController.deleteTeam)

// مسارات الأكاديميات
router.get('/academies', academiesController.getAllAcademies)
router.get('/academies/:id', academiesController.getAcademyById)
router.post('/academies', academiesController.createAcademy)
router.put('/academies/:id', academiesController.updateAcademy)
router.delete('/academies/:id', academiesController.deleteAcademy)

// مسارات جلسات التدريب
router.get('/training-sessions', trainingSessionsController.getAllTrainingSessions)
router.get('/training-sessions/:id', trainingSessionsController.getTrainingSessionById)
router.post('/training-sessions', trainingSessionsController.createTrainingSession)
router.put('/training-sessions/:id', trainingSessionsController.updateTrainingSession)
router.delete('/training-sessions/:id', trainingSessionsController.deleteTrainingSession)

// مسارات لوحة المعلومات
router.get('/dashboard/stats', dashboardController.getDashboardStats)
router.get('/dashboard/activities', dashboardController.getRecentActivities)

export default router