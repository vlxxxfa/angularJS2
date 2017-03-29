import { FrontendForBAPage } from './app.po';

describe('frontend-for-ba App', () => {
  let page: FrontendForBAPage;

  beforeEach(() => {
    page = new FrontendForBAPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
