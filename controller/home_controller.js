const Project = require('../models/project'); // Import the Project model

module.exports.home = async function(req,res){
    const project = await Project.find({});
    return res.render('home',{
        title: 'Home',
        projects: project
    })
}