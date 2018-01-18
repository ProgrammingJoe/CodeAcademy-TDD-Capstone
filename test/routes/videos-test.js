const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');
const Video = require('../../models/video');

const {connectDatabase, disconnectDatabase} = require('../database-utilities');
const {newVideoDefault} = require('../video-util');

describe('Index', () => {
  describe('GET', () => {
    beforeEach(connectDatabase);

    afterEach(disconnectDatabase);

    it('should render existing videos in the list', async () => {
      const newitem = newVideoDefault;

      await request(app)
        .post('/videos')
        .type('form')
        .send(newitem);

      const response = await request(app)
        .get('/videos');

      const newvideo = await Video.findOne(newitem);

      assert.include(response.text, newvideo.title);
      assert.include(response.text, newvideo.description);
    });
  });
});

describe('Edit', () => {
  describe('GET /videos/:id/update', () => {
    beforeEach(connectDatabase);

    afterEach(disconnectDatabase);

    it('should render the edit form', async () => {
      const newitem = newVideoDefault;

      await request(app)
        .post('/videos')
        .type('form')
        .send(newitem);

      const newvideo = await Video.findOne(newitem);

      const response = await request(app)
        .get(`/videos/${newvideo._id}/update`);

      assert.include(response.text, 'Edit a video');
      assert.include(response.text, newvideo.title);
      assert.include(response.text, newvideo.description);
    });
  });

  describe('POST /videos/:id/update', () => {
    beforeEach(connectDatabase);

    afterEach(disconnectDatabase);

    it('should update the video', async () => {
      const newitem = newVideoDefault;

      await request(app)
        .post('/videos')
        .type('form')
        .send(newitem);

      const newvideo = await Video.findOne(newitem);

      const updateditem = {
        title: 'New title',
        description: 'New description',
        url: 'New url'
      };

      await request(app)
        .post(`/videos/${newvideo._id}/update`)
        .type('form')
        .send(updateditem);

      const updatedvideo = await Video.findById(newvideo._id);

      assert.include(updatedvideo.title, updateditem.title);
      assert.include(updatedvideo.description, updateditem.description);
      assert.include(updatedvideo.url, updateditem.url);
    });

    it('should return a success status and the show page', async () => {
      const newitem = newVideoDefault;

      await request(app)
        .post('/videos')
        .type('form')
        .send(newitem);

      const newvideo = await Video.findOne(newitem);

      const updateditem = {
        title: 'New title',
        description: 'New description',
        url: 'New url'
      };

      const response = await request(app)
        .post(`/videos/${newvideo._id}/update`)
        .type('form')
        .send(updateditem);

      assert.equal(response.status, 200);
      assert.include(response.text, 'Look a video');
    });

    it('should not save the record if invalid', async () => {
      const newitem = newVideoDefault;

      await request(app)
        .post('/videos')
        .type('form')
        .send(newitem);

      const newvideo = await Video.findOne(newitem);

      const updateditem = {
        title: 'New title',
        description: 'New description'
      };

      const response = await request(app)
        .post(`/videos/${newvideo._id}/update`)
        .type('form')
        .send(updateditem);

      const updatedvideo = await Video.findById(newvideo._id);

      assert.include(updatedvideo.title, newitem.title);
      assert.include(updatedvideo.description, newitem.description);
      assert.include(updatedvideo.url, newitem.url);
    });

    it('should return a 400 status if invalid', async () => {
      const newitem = newVideoDefault;

      await request(app)
        .post('/videos')
        .type('form')
        .send(newitem);

      const newvideo = await Video.findOne(newitem);

      const updateditem = {
        title: 'New title',
        description: 'New description'
      };

      const response = await request(app)
        .post(`/videos/${newvideo._id}/update`)
        .type('form')
        .send(updateditem);

      const updatedvideo = await Video.findById(newvideo._id);

      assert.equal(response.status, 400);
    });

    it('should render the edit form if invalid', async () => {
      const newitem = newVideoDefault;

      await request(app)
        .post('/videos')
        .type('form')
        .send(newitem);

      const newvideo = await Video.findOne(newitem);

      const updateditem = {
        title: 'New title',
        description: 'New description'
      };

      const response = await request(app)
        .post(`/videos/${newvideo._id}/update`)
        .type('form')
        .send(updateditem);

      const updatedvideo = await Video.findById(newvideo._id);

      assert.include(response.text, 'Edit a video');
    });
  });
});

describe('Delete', () => {
  describe('POST /videos/:id/delete', () => {
    beforeEach(connectDatabase);

    afterEach(disconnectDatabase);

    it('should delete the video', async () => {
      const newitem = newVideoDefault;

      await request(app)
        .post('/videos')
        .type('form')
        .send(newitem);

      const newvideo = await Video.findOne(newitem);

      const response = await request(app)
        .post(`/videos/${newvideo._id}/delete`);

      assert.notInclude(response.text, newitem.url);
      assert.notInclude(response.text, newitem.title);
      assert.notInclude(response.text, newitem.description);
      assert.include(response.text, 'Landing Page');
    });
  });
});
