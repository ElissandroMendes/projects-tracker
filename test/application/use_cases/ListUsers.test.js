const { UserRepository } = require('../../../src/domain/users')
const mockUserRepository = new UserRepository()
const ListUsers = require('../../../src/application/use_cases/ListUsers')

test('should resolve with all the users persisted in repository', async () => {
  // given
  mockUserRepository.find = () => ['John', 'Jane']

  // when
  const users = await ListUsers({ userRepository: mockUserRepository })

  // then
  expect(users).toEqual(['John', 'Jane'])
})
