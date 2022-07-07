export interface Duck{
    name: string,
    numLegs: number,
    makeSound:(sound:string) => void;
}

const duck1:Duck ={
    name: 'huey',
    numLegs: 2,
    makeSound: (sound: any) => console.log(sound)
}

const duck2:Duck ={
    name: 'dewey',
    numLegs: 2,
    makeSound: (sound: any) => console.log(sound)
}

duck1.makeSound!('quack'); // !- exclamation overrides the makeSound method in the interface. Should be used if the method is optional (?)

export const ducks = [duck1,duck2]