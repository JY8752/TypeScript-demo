import { AbstractUser, AdminUser, User } from '../../../src/util/User';

describe('UserTest', () => {
  describe('User', () => {
    it('should be normal', () => {
      const user = new User('user1', 20, false);
      assertUser(user, { name: 'user1', age: 20 });
    });
  });
  describe('AdminUser', () => {
    it('should be normal', () => {
      const admin = new AdminUser('admin1', 30, true);
      assertAdminUser(admin, { name: 'admin1', age: 30 });
    });
  });

  type UserCommonProperty = {
    name?: string;
    age?: number;
    hello?: string;
  };

  type UserProperty = UserCommonProperty & {
    sayGoodBye?: string;
    hasPet?: boolean;
  };

  type AdminUserProperty = UserCommonProperty & {
    sayGoodBye?: string;
    isAdmin?: boolean;
  };

  const assertCommonUserProperty = (
    user: AbstractUser,
    expected: UserCommonProperty,
  ) => {
    expect(user.getName()).toBe(expected.name);
    expect(user.getAge()).toBe(expected.age);
  };
  const assertUser = (
    user: User,
    {
      name = 'user',
      age = 10,
      hello = 'Hello World',
      sayGoodBye = 'Good Bye',
      hasPet = false,
    }: UserProperty,
  ) => {
    assertCommonUserProperty(user, { name, age });
    expect(user.hello()).toBe(hello);
    expect(user.sayGoodBye()).toBe(sayGoodBye);
    expect(user.getHasPet()).toBe(hasPet);
  };
  const assertAdminUser = (
    user: AdminUser,
    {
      name = 'admin',
      age = 10,
      hello = 'Hello World!!',
      sayGoodBye = 'Good Bye!!',
      isAdmin = true,
    }: AdminUserProperty,
  ) => {
    assertCommonUserProperty(user, { name, age });
    expect(user.hello()).toBe(hello);
    expect(user.sayGoodBye()).toBe(sayGoodBye);
    expect(user.getIsAdmin()).toBe(isAdmin);
  };
});
