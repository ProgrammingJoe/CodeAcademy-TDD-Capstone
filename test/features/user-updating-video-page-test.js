const {assert} = require('chai');

describe('Edit page', () => {
  describe('User edits a video on the edit page', () => {
    it('should allow the user to edit a video', () => {
      const title = 'Youll never believe this video!';
      const newTitle = 'Youll never believe the second part of this video!';
      const description = 'Watch the video to see what happens!';
      const url = 'Some url';

      browser.url('/create');
      browser.setValue('#title-input', title);
      browser.setValue('#description-input', description);
      browser.setValue('#url-input', url);
      browser.click('#video-submit');
      browser.click('#edit-button');
      browser.setValue('#title-input', newTitle);
      browser.click('#video-submit');

      assert.include(browser.getText('body'), newTitle);
    });

    it('should not create a new video', () => {
      const title = 'Youll never believe this video!';
      const newTitle = 'Youll never believe the second part of this video!';
      const description = 'Watch the video to see what happens!';
      const url = 'Some url';

      browser.url('/create');
      browser.setValue('#title-input', title);
      browser.setValue('#description-input', description);
      browser.setValue('#url-input', url);
      browser.click('#video-submit');
      browser.click('#edit-button');
      browser.setValue('#title-input', newTitle);
      browser.click('#video-submit');
      browser.url('/')

      assert.notInclude(browser.getText('body'), title);
    });
  });
});
