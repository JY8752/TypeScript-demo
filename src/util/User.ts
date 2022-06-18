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

  getAnimalName(animal: Cat | Dog): string {
    if (animal.type === 'cat') {
      if (animal.isCat) return animal.name;
    } else {
      if (animal.isDog) return animal.name;
    }
    return 'Not found animal...';
  }

  abstract hello(): string;
}

type Cat = {
  type: 'cat';
  name: string;
  isCat: boolean;
};

type Dog = {
  type: 'dog';
  name: string;
  isDog: boolean;
};

type SayGoodBye = {
  sayGoodBye: () => string;
};

type Optional<T> =
  | {
      hasValue: true;
      value: T;
    }
  | {
      hasValue: false;
    };

export const printOptionalNumber = (value: Optional<number>) => {
  if (value.hasValue) console.log(value.value);
};

export class User extends AbstractUser implements SayGoodBye {
  constructor(name: string, age: number, private hasPet: boolean) {
    super(name, age);
  }

  private readonly nameAndAgeMap = {
    tanaka: 17,
    yamada: 20,
    satou: 30,
  };

  getHasPet() {
    return this.hasPet;
  }

  override hello(): string {
    return 'Hello World';
  }

  sayGoodBye(): string {
    return 'Good Bye';
  }

  getAgeByName(name: 'tanaka' | 'yamada' | 'satou') {
    this.getKey(this.nameAndAgeMap, name);
  }

  getSatouAge(name: unknown): number {
    this.assertSatou(name);
    return this.nameAndAgeMap[name];
  }

  private getKey<T, K extends keyof T>(map: T, key: K): T[K] {
    return map[key];
  }

  private assertSatou(name: unknown): asserts name is 'satou' {
    if (name !== 'satou') {
      throw new Error('satou以外はダメです');
    }
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
