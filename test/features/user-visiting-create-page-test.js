const {assert} = require('chai');

describe('Create page', () => {
  describe('User visits the create page', () => {
    it('should render the create page', () => {
      browser.url('/create');

      assert.equal(browser.getText('body'), 'Save a video');
    });
  });

  describe('User submits a new video on the create page', () => {
    it('should allow the user to submit a video with a title and description', () => {
      const title = 'Youll never believe this video!';
      const description = 'Watch the video to see what happens!';
      const url = 'Some url';

      browser.url('/create');
      browser.setValue('#title-input', title);
      browser.setValue('#description-input', description);
      browser.setValue('#url-input', url);
      browser.click('#video-submit');
      browser.url('/');

      assert.include(browser.getText('body'), title);
      assert.include(browser.getText('body'), description);
    });
  });
});
