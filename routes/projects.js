const express = require('express');
const router = express.Router();
const projectController = require('../controller/project_controller');

router.get('/create', projectController.create);
router.post('/create_projects', projectController.create_projects);
router.get('/:id',projectController.project_detail);
router.get('/:id/issues/create', projectController.create_issue);
router.post('/:id/issues', projectController.issue);
router.get('/issues/:id', projectController.getIssueById);

module.exports = router;