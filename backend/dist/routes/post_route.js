const express = require('express');
const router = express.Router();
const post = require('../controllers/post.js');
router.get('/', post.getPosts);
router.get('/:id', post.getPostById);
router.post('/', post.addNewPost);
router.put('/:id', post.updatePostById);
module.exports = router;
//# sourceMappingURL=post_route.js.map