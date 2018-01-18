const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');
const Video = require('../../models/video');

const {connectDatabase, disconnectDatabase} = require('../database-utilities');

describe('Index', () => {
  describe('GET', () => {
    beforeEach(connectDatabase);

    afterEach(disconnectDatabase);

    it('should render the html for a specific element', async () => {
      const newitem = {
        title: 'A single title',
        description: 'A single description',
        url: 'Some url'
      };

      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(newitem);

      const newVideo = await Video.findOne(newitem);

      const response_get = await request(app)
        .get(`/videos/${newVideo._id}`);

      assert.include(response_get.text, newitem.title);
      assert.include(response_get.text, newitem.description);
    });
  });
});
