import { AdminUser, User } from './User';

describe('UserTest', () => {
  describe('User', () => {
    it('should be normal', () => {
      const user = new User('user1', 20, false);
      expect(user.getName()).toBe('user1');
      expect(user.getAge()).toBe(20);
      expect(user.getHasPet()).toBe(false);
      expect(user.hello()).toBe('Hello World');
      expect(user.sayGoodBye()).toBe('Good Bye');
    });
  });
  describe('AdminUser', () => {
    it('should be normal', () => {
      const admin = new AdminUser('admin1', 30, true);
      expect(admin.getName()).toBe('admin1');
      expect(admin.getAge()).toBe(30);
      expect(admin.getIsAdmin()).toBe(true);
      expect(admin.hello()).toBe('Hello World!!');
      expect(admin.sayGoodBye()).toBe('Good Bye!!');
    });
  });
});
