class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  };

  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';

    return console.log(`
      ${this.#brand} ${this.#model} Speed: ${this.speed} km/h Trunk: ${this.isTrunkOpen}`);
  };

  go() {
    if (this.isTrunkOpen) {
      console.warn(`${this.brand} ${this.model} cannot accelerate while the truck is open!`);
      return;
    }

    this.speed = Math.min(200, this.speed + 5);
  }

  brake() {
    this.speed = Math.max(0, this.speed - 5);
  }

  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }

}

class Racecar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails);

    this.acceleration = carDetails.acceleration;
  }

  go() {
    this.speed = Math.min(300, this.speed + this.acceleration);
  }

  // Polymorphism: Overriding trunk features to do nothing since racecars don't have trunks
  openTrunk() {}
  closeTrunk() {}
}

//--- Execution Sandbox ---
const car1 = new Car({ brand: 'Toyota', model: 'Corolla' });
const car2 = new Car({ brand: 'Tesla', model: 'Model 3' });

car1.displayInfo();
car2.displayInfo();

car1.go();
car1.go();
car1.go();
car2.go();

car1.displayInfo(); //should have 15 km/h
car2.displayInfo(); //should have 5 km/h

car1.brake(); //speed becomes 10 km/h
car2.brake(); //speed becomes 0 km/h
car2.brake(); //should not execute since speed is 0 km/h

car1.displayInfo(); //should have 10 km/h
car2.displayInfo(); //should have 0 km/h

car1.openTrunk(); //should not execute, car is moving
car2.openTrunk(); //should execute car is stationary

car1.displayInfo(); //same as before
car2.displayInfo(); //isTrunkOpen should be true
car2.go(); //should not execute, give warning - trunk is open

car2.closeTrunk();

car2.displayInfo(); //isTrunkOpen should be false

const raceCar1 = new Racecar({
  brand: 'McLaren',
  model: 'F1',
  acceleration: 20
});

raceCar1.displayInfo();
raceCar1.go(); // Safely leaps to 20 km/h
raceCar1.displayInfo(); //speed should be 20 km/h
