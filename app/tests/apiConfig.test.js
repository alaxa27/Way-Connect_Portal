import sinon from 'sinon';

const sandbox = sinon.createSandbox();

describe('apiConfig.axiosInstancenstance', () => {
  beforeEach(() => {
    jest.resetModules(); // this is important
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should have the WayBox baseURL in production', async () => {
    sandbox.stub(process.env, 'NODE_ENV').value('production');
    const axiosInstance = await import('../apiConfig');

    const expectedResult = 'http://192.168.220.2:5000/portal';
    expect(axiosInstance.default.defaults.baseURL).toEqual(expectedResult);
  });

  it('should have the localhost baseURL in development', async () => {
    sandbox.stub(process.env, 'NODE_ENV').value('development');
    const axiosInstance = await import('../apiConfig');

    const expectedResult = 'http://localhost:5000/portal';
    expect(axiosInstance.default.defaults.baseURL).toEqual(expectedResult);
  });
});
