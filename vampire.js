class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
      this.offspring.push(vampire);
      vampire.creator = this;
    }
  

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfPeople = 0;
    let currentVampire = this;

    // climb "up" the tree (using iteration), counting nodes, until no boss is found
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfPeople++;
    }

    return numberOfPeople;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true
    }
    return false
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    let currentVampire = this;
    if (currentVampire.name === name) return currentVampire;
    for (let child of currentVampire.offspring) {
      let a = child.vampireWithName(name)
      if (a) {
        return a
      }
    }
    return null
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let totalDescendents = 0; // 1

    for (let child of this.offspring) {
      totalDescendents += 1;
      const descendantsUnder = child.totalDescendents
      totalDescendents += descendantsUnder
    }

    return totalDescendents;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let vampires = []
    if (this.yearConverted > 1980) {
      vampires.push(this); // 2
    }
    for (const child of this.offspring) {
      const millenialOffspring = child.allMillennialVampires;
      vampires = vampires.concat(millenialOffspring);
    }
    return vampires;
  }
  
  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let ancestors = [vampire];
    let currentVampire = vampire;

    // climb "up" the tree (using iteration), counting nodes, until no boss is found
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      ancestors.push(currentVampire);
    }
    currentVampire = this
    if (ancestors.indexOf(currentVampire) > -1) {
      return currentVampire
    }
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      if (ancestors.indexOf(currentVampire) > -1) {
        return currentVampire
      }
      
      }
    
  }
}

module.exports = Vampire;

