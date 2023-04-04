const TreeTest = require('../models/TreeTest');

const addTreeTest = async (req, res) => {
  const { text, childIdArray } = req.body;
  const treeTest = new TreeTest({ text, childIdArray });
  await treeTest.save();
  res.status(201).json(treeTest);
};

// const getTree = async (Model, id) => {
//   const currentNode = await Model.findById(id).exec();
//   const { childIdArray } = currentNode;
//   if (childIdArray && childIdArray.length === 0) {
//     return { ...currentNode._doc, childNode: [] };
//   }
//   if (!childIdArray) {
//     return { ...currentNode._doc, childNode: [] };
//   }
//   // eslint-disable-next-line no-return-await
//   const childPromises = childIdArray.map(async (child) => await getTree(Model, child));
//   const childNodes = await Promise.all(childPromises);
//   return { ...currentNode._doc, childNode: childNodes };
// };

const getTree = async (Model, id) => {
  const currentNode = await Model.findById(id).exec();
  const { childIdArray } = currentNode;

  if (childIdArray && childIdArray.length === 0) {
    return [currentNode];
  }

  if (!childIdArray) {
    return [currentNode];
  }

  const childPromises = childIdArray.map(async (child) => {
    const childNodes = await getTree(Model, child);
    return childNodes;
  });

  const childNodes = await Promise.all(childPromises);

  return [currentNode, ...childNodes.flat()];
};

const getTreeById = async (req, res) => {
  const { id } = req.params;
  const nodeTree = await getTree(TreeTest, id);
  console.log(nodeTree);
  if (!nodeTree) {
    res.status(404).json({ error: 'Tree not found' });
    return;
  }
  res.json(nodeTree);
};

module.exports = {
  addTreeTest,
  getTreeById,
};
