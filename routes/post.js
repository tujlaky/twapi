const express = require('express');
const router = express.Router();
const db = require('../db');

const { validate } = require('express-validation');

const { postValidation } = require('../validators/post');

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const result = await db.query('SELECT * FROM post WHERE id=$1', [id]);

  if (!result || !result.rows || !result.rows[0]) {
    return res.status(404).end();
  }

  return res.json(result.rows[0]);
});

router.get('/', async (req, res, next) => {
  const result = await db.query('SELECT * FROM post ORDER BY created_at ASC');

  return res.json(result.rows);
});

router.post('/', validate(postValidation, {statusCode: 422}, {}), async (req, res, next) => {
  const query = 'INSERT INTO post (title, username, created_at) VALUES ($1, $2, now())';

  const values = [
    req.body.title,
    req.body.username,
  ];

  const result = await db.query(query, values);

  return res.status(201).end();
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  const result = await db.query('SELECT * FROM post WHERE id=$1', [id]);

  if (!result || !result.rows || !result.rows[0]) {
    return res.status(404).end();
  }

  await db.query('DELETE FROM post WHERE id=$1', [id]);

  return res.status(204).end();
});


module.exports = router;
