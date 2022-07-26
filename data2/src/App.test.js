describe('App.js', () => {
  beforeAll(async () => {
    await page.goto("http://localhost:3000");
  });

  it('should be titled "Data2"', async () => {
    await expect(page.title()).resolves.toMatch('Data2');
  });
  it('should be redirected to matches/professional', async () => {
    await expect(page.url()).toMatch('http://localhost:3000/matches/professional');
  });
});