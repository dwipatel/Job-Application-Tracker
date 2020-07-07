const router = require('express').Router();
let Application = require('../models/applications.model');
const { model } = require('mongoose');

router.route('/').get((req, res) => {
    Application.find()
        .then(applications => res.json(applications))
        .catch(err => res.status(404).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const company = req.body.company;
    const title = req.body.title;
    const link = req.body.link;
    const date = Date.parse(req.body.date);
    const notes = req.body.notes;
    const newApplication = new Application({
        company,
        title,
        link,
        date,
        notes,
    })

    newApplication.save()
        .then(() => res.json('Application added'))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req, res) => {
    Application.findById(req.params.id)
        .then(applications => res.json(applications))
        .catch(err => res.status(400).json('Error: ' + err));
});
  
router.route('/:id').delete((req, res) => {
    Application.findByIdAndDelete(req.params.id)
        .then(() => res.json('Application deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Application.findById(req.params.id)
        .then(applications => {
            applications.company = req.body.company;
            applications.title = req.body.title;
            applications.link = req.body.link;
            applications.date = Date.parse(req.body.date);
            applications.notes = req.body.notes;
    
            applications.save()
                .then(() => res.json('Application updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;