const router = require('express').Router();

const Video = require('../models/video');

router.get('/videos', async (req, res, next) => {
  const videos = await Video.find({});
  res.render('videos/index', {videos});
});

router.post('/videos', async (req, res, next) => {
  const {title, description, url} = req.body;

  const newVideo = new Video({title, description, url});
  newVideo.validateSync();

  if (newVideo.errors) {
    res.status(400).render('videos/create', {error: 'Title, description, and url are required to save a video', video: newVideo});
  } else {
    await newVideo.save();
    res.render('videos/show', {video: newVideo});
  }
});

router.get('/videos/:videoId', async (req, res, next) => {
  const videoId = req.params.videoId;
  const video = await Video.findById(videoId);

  res.render('videos/show', {video: video});
});

router.post('/videos/:videoId/update', async (req, res, next) => {
  const videoId = req.params.videoId;
  const video = await Video.findById(videoId);

  video.title = req.body.title;
  video.description = req.body.description;
  video.url = req.body.url;

  video.validateSync();

  if (video.errors) {
    res.status(400).render('videos/edit', {error: 'Title, description, and url are required to edit a video', video: video});
  } else {
    await video.save();
    res.render('videos/show', {video: video});
  }
});

router.get('/videos/:videoId/update', async (req, res, next) => {
  const videoId = req.params.videoId;
  const video = await Video.findById(videoId);

  res.render('videos/edit', {video: video});
});

router.post('/videos/:videoId/delete', async (req, res, next) => {
  const videoId = req.params.videoId;

  await Video.remove(videoId, function(err, records){
    if (err) {
      console.log("Error: " + err);
    } else {
      console.log("Removed");
    }
  });

  res.render('videos/index');
});

router.get('/create', async (req, res, next) => {
  res.render('videos/create');
});

module.exports = router;
