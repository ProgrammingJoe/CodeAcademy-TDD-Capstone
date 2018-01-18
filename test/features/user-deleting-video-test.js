const {assert} = require('chai');

describe('Delete page', () => {
  describe('User deletes a video on the show page', () => {
    it('should allow the user to delete a video', () => {
      const title = 'Youll never believe this video!';
      const description = 'Watch the video to see what happens!';
      const url = 'Some url';

      browser.url('/create');
      browser.setValue('#title-input', title);
      browser.setValue('#description-input', description);
      browser.setValue('#url-input', url);
      browser.click('#video-submit');
      browser.click('#delete-button');

      assert.notInclude(browser.getText('body'), title);
      assert.include(browser.getText('body'), 'Landing Page');
    });
  });
});
