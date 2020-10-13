import { handleSubmit } from '../client/js/app.js';


describe('Function existence check', () => {
  test('Return true', () => {
    expect(handleSubmit).toBeDefined();
  });
});