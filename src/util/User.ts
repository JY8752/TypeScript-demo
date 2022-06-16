export abstract class AbstractUser {
  constructor(private name: string, private age: number) {}

  getName(): string {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getAge(): number {
    return this.age;
  }

  setAge(age: number) {
    this.age = age;
  }

  abstract hello(): string;
}

type SayGoodBye = {
  sayGoodBye: () => string;
};

export class User extends AbstractUser implements SayGoodBye {
  constructor(name: string, age: number, private hasPet: boolean) {
    super(name, age);
  }

  getHasPet() {
    return this.hasPet;
  }

  override hello(): string {
    return 'Hello World';
  }

  sayGoodBye(): string {
    return 'Good Bye';
  }
}

export class AdminUser extends AbstractUser implements SayGoodBye {
  constructor(name: string, age: number, private isAdmin: boolean) {
    super(name, age);
  }

  getIsAdmin() {
    return this.isAdmin;
  }

  override hello(): string {
    return 'Hello World!!';
  }

  sayGoodBye(): string {
    return 'Good Bye!!';
  }
}
