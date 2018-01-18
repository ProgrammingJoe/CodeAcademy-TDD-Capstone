const {assert} = require('chai');

const {generateRandomUrl} = require('../test-utils');

describe('Landing page', () => {
  describe('User visits landing page', () => {
    it('should be empty', () => {
      browser.url('/');

      assert.equal(browser.getText('#videos-container'), 'Landing Page Create a new video');
    });

    it('should have an iframe of existing videos', () => {
      browser.url('/create');

      const title = 'Youll never believe this video!';
      const description = 'Watch the video to see what happens!';
      const url = generateRandomUrl();

      browser.url('/create');
      browser.setValue('#title-input', title);
      browser.setValue('#description-input', description);
      browser.setValue('#url-input', url);
      browser.click('#video-submit');
      browser.url('/videos');

      assert.equal(browser.getAttribute('body iframe.video-url', 'src'), url);
    });

    it('should give an option for the user to visit the show page of a video', () => {
      browser.url('/create');

      const title = 'Youll never believe this video!';
      const description = 'Watch the video to see what happens!';
      const url = generateRandomUrl();

      browser.url('/create');
      browser.setValue('#title-input', title);
      browser.setValue('#description-input', description);
      browser.setValue('#url-input', url);
      browser.click('#video-submit');
      browser.url('/videos');
      browser.click('a.show-link');

      assert.include(browser.getText('body'), description);
    });
  });
});
