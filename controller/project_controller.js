const Project = require('../models/project'); // Import the Project model
const Issue = require('../models/issue'); // Import the Issue model

// Project Creation Page
module.exports.create = async function(req, res){
    return res.render('projectCreate',{
      title: 'Create Project'
    });
}

// Create a new project
module.exports.create_projects = async function(req, res) {
    const { name, description, author } = req.body;
    try {
      const project = new Project({ name, description, author });
      await project.save();
      return res.redirect('/');
    } catch (err) {
      return res.status(500).send('Error creating project');
    }
  };
  
// Project Detail Page - Show bugs related to the project
module.exports.project_detail = async function(req, res) {
    const project = await Project.findById(req.params.id).populate('issues');
    return res.render('projectDetail', { 
        title: 'Project Details',
        project: project
    });
  };
  
// Issue Creation Page
module.exports.create_issue = async function(req, res) {
    const project = await Project.findById(req.params.id);
    return res.render('issueCreate', {
        title: 'Create Issue',
        project: project
    });
  };
  
// Create a new issue for a project
module.exports.issue = async function(req, res) {
    const { title, description, labels, author } = req.body;
    try {
      const project = await Project.findById(req.params.id);
      const issue = new Issue({ title, description, labels: labels.split(','), author, project });
      await issue.save();
      project.issues.push(issue);
      await project.save();
      return res.redirect(`/projects/${req.params.id}`);
    } catch (err) {
      return res.status(500).send('Error creating issue');
    }
  };
// Display the details of the issue
module.exports.getIssueById = async function(req, res){
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      return res.status(404).send('Issue not found');
    }
    return res.render('issueDetail', { 
      issues: issue,
      title: 'Issues' 
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching issue details');
  }
};
