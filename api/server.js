const express = require('express');

const Hobbits = require('../hobbits/hobbitsModel.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/hobbits', (req, res) => {
  Hobbits.getAll()
    .then(hobbits => {
      res.status(200).json(hobbits);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post('/hobbits', (req,res) => {
  Hobbits.insert(req.body).then(result => {
    res.status(201).json(result)
  })
  .catch(error => {
    res.status(500).json(error)
  })
})

server.put('/hobbits/:id', async (req,res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const updated = await Hobbits.findById(id)
    
    if(updated) {
      const updatedChar = await Hobbits.update(changes,id)
      res.json(updatedChar)
    } else {
      res.status(404).json({ message: 'Missing id from params' });
    }
  } catch(error) {
    res.status(500).json({message:'failed to update character'})
  }
})

server.delete('/hobbits/:id', async (req,res) => {
  const { id } = req.params;

  try {
    const deleted = await Hobbits.remove(id)
    
    if(deleted) {
      //removed is a TF value
      res.json({removed: deleted, id: id})
    } else {
      res.status(404).json({ message: 'Missing id from params' });
    }
  } catch(error) {
    res.status(500).json({message:'failed to delete character'})
  }
})


module.exports = server;
