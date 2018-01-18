const {assert} = require('chai');

const Video = require('../../models/video');

describe('Video', () => {
  it('should have a title that is a String', () => {
    const title = 123;
    const description = 'A description';

    const newvideo = Video({title, description});

    assert.strictEqual(newvideo.title, title.toString());
  });

  it('should have a description that is a String', () => {
    const title = 'A title';
    const description = 123;

    const newvideo = Video({title, description});

    assert.strictEqual(newvideo.description, description.toString());
  });

  it('should have a url that is a String', () => {
    const title = 'A title';
    const description = 123;
    const url = 123;

    const newvideo = Video({title, description, url});

    assert.strictEqual(newvideo.url, url.toString());
  });

  it('should have a url', () => {
    const title = 'A title';
    const description = 123;

    const newvideo = Video({title, description});
    const error = newvideo.validateSync();

    assert.strictEqual(error.errors.url.message, 'a URL is required');
  });
});
