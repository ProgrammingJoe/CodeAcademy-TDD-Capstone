const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');
const Video = require('../../models/video');

const {connectDatabase, disconnectDatabase} = require('../database-utilities');
const {newVideoDefault} = require('../video-util');

describe('Server path: /videos', () => {
  describe('POST', (req, res, next) => {
    beforeEach(connectDatabase);

    afterEach(disconnectDatabase);

    it('should respond to the video creation action', async () => {
      const newitem = newVideoDefault;

      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(newitem);

      assert.equal(response.status, 200);
    });

    it('should create a new video', async () => {
      const newitem = newVideoDefault;

      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(newitem);

      const newvideo = await Video.findOne(newitem);

      assert.equal(newvideo.title, newitem.title);
      assert.equal(newvideo.description, newitem.description);
      assert.equal(newvideo.url, newitem.url);
    });

    it('should not create a video without a title', async () => {
      const newitem = {
        description: 'A description',
        url: 'A url'
      };

      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(newitem);

      const newvideo = await Video.find({});

      assert.equal(newvideo.length, 0);
    });

    it('should return a 400 error for an incomplete video', async () => {
      const newitem = {
        description: 'A description',
        url: 'A url'
      };

      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(newitem);

      const newvideo = await Video.find({});

      assert.equal(response.status, 400);
    });

    it('should render the create form after a failed creation', async () => {
      const newitem = {
        description: 'A description'
      };

      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(newitem);

      const newvideo = await Video.find({});

      assert.include(response.text, 'title-input');
      assert.include(response.text, 'description-input');
    });

    it('should render an error message after a failed creation', async () => {
      const newitem = {
        description: 'A description',
        url: 'A url'
      };

      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(newitem);

      const newvideo = await Video.find({});

      assert.include(response.text, 'Title, description, and url are required to save a video');
    });

    it('should preserve the other fields after a failed creation', async () => {
      const newitem = {
        title: 'test',
        description: 'Crazy unique description'
      };

      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(newitem);

      const newvideo = await Video.find({});

      assert.include(response.text, newitem.description);
      assert.include(response.text, newitem.title);
    });

    it('should preserve the other fields after a failed creation', async () => {
      const newitem = {
        url: 'test',
        description: 'Crazy unique description'
      };

      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(newitem);

      const newvideo = await Video.find({});

      assert.include(response.text, newitem.description);
      assert.include(response.text, newitem.url);
    });

    it('should render an error when the url is missing', async () => {
      const newitem = {
        title: 'test',
        description: 'Crazy unique description'
      };

      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(newitem);

      const newvideo = await Video.find({});

      assert.include(response.text, 'Title, description, and url are required to save a video');
    });
  });
});
