const express = require('express');

const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
   
    db('zoos')
    .then(zoos => {
      res.status(200).json(zoos)
    })
    .catch(error => {
      res.status(500).json(error)
    })
});
  
router.get('/:id', (req, res) => {
    db('zoos')
    .where({id: req.params.id})
    .then(zoo => {
        if(zoo) {
            res.status(200).json(zoo);

        } else {
            res.status(404).json({message: 'Zoo id not found'})
        }
    })
    .catch(error => {
        res.status(500).json(error);
    })
});
    
router.post('/', (req, res) => {

    db('zoos')
    .insert(req.body)
    .then(zoo => {
        const [id] = zoo;

        db('zoos')
        .where({id})
        .first()
        .then(zoo => {
            res.status(200).json(zoo)
        })
    })
    .catch(error => {
    res.status(500).json(error)
    })
});
    
router.put('/:id', (req, res) => {

    db('zoos')
    .where({id: req.params.id})
    .update(req.body)
    .then(count => {
        if(count > 0){
            db('zoos')
            .where({id: req.params.id})
            .first()
            .then(zoo => {
            res.status(200).json(zoo)
            })
        }else{
            res.status(404).json({message: 'Zoo id not found'})
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
});
    
router.delete('/:id', (req, res) => {
    db('zoos')
    .where({id: req.params.id})
    .del() 
    .then(count => {
        if(count > 0) {
            res.status(204).end();
        }else{
            res.status(404).json({message: 'Zoo id not found'})
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

module.exports = router;