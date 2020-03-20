import { createLogger } from '../logger'

it('should return stored logs', () => {
  const logger = createLogger('Taras')
  expect(logger.getLogs()).toEqual([]);
});

it('should save log message', () => {
  const logger = createLogger('Taras')
  logger.log('login success');

  expect(logger.getLogs()).toEqual(['log - Taras - login success']);
});

it('should save log error', () => {
  const logger = createLogger('Taras')
  logger.log('error');

  expect(logger.getLogs()).toEqual(['log - Taras - error']);
})