const { Router } = require('express');

const { addTreeTest, getTreeById } = require('../controllers/treeTest');

const treeRouter = Router();

treeRouter.post('', addTreeTest);
treeRouter.get('/:id',getTreeById);

module.exports = treeRouter;
