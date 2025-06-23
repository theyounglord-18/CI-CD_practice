const request = require('supertest');
const app = require('../src/index');

describe('Todo API', () => {
  beforeEach(async () => {
    await request(app).delete('/todos');
  });

  test('GET /todos should return empty array initially', async () => {
    const res = await request(app).get('/todos');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST /todos should add a new todo', async () => {
    const newTodo = { id: 1, task: 'Test writing', done: false };
    const res = await request(app).post('/todos').send(newTodo);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(newTodo);

    const getRes = await request(app).get('/todos');
    expect(getRes.body).toEqual([newTodo]);
  });
});
