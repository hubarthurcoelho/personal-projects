const mageHpInput = document.getElementById('mageHp');
const mageMpInput = document.getElementById('mageMp');
const mageIntInput = document.getElementById('mageInt');
const warriorHpInput = document.getElementById('warriorHp');
const warriorStrInput = document.getElementById('warriorStr');
const warriorWeaponInput = document.getElementById('warriorWeapon');
const dragonHpInput = document.getElementById('dragonHp');
const dragonStrInput = document.getElementById('dragonStr');
const battleInfo = document.getElementById('battleInfo');
const createBtn = document.getElementById('createBtn');
const startBtn = document.getElementById('startBtn');

const mage = {
    healthPoints: 130,
    intelligence: 45,
    mana: 125,
    damage: undefined,
  };
  
  const warrior = {
    healthPoints: 200,
    strength: 30,
    weaponDmg: 2,
    damage: undefined,
  };
  
  const dragon = {
    healthPoints: 350,
    strength: 50,
    damage: undefined,
  };

createBtn.addEventListener('click', () => {
    mage.healthPoints = parseInt(mageHpInput.value);
    mage.intelligence = parseInt(mageIntInput.value);
    mage.mana = parseInt(mageMpInput.value);
    warrior.healthPoints = parseInt(warriorHpInput.value);
    warrior.strength = parseInt(warriorStrInput.value);
    warrior.weaponDmg = parseInt(warriorWeaponInput.value);
    dragon.healthPoints = parseInt(dragonHpInput.value);
    dragon.strength = parseInt(dragonStrInput.value);
})
  
  const battleMembers = { mage, warrior, dragon };


  
  const DragonDmg = () => Math.floor(Math.random() * (dragon.strength - 15)) + 15;
  const warriorDmg = () => Math.floor(Math.random() * ((warrior.weaponDmg * warrior.strength) - warrior.strength)) + warrior.strength;
  
  const mageDmgAndMana = (mage) => {
    let mageMana = mage.mana;
    let mageCurrentInfo = 
      {
        damage: Math.floor(Math.random() * ((mage.intelligence * 2) - mage.intelligence)) + mage.intelligence,
        manaUsed: 0,
      }
      
      if (mageMana < 15) {
        mageCurrentInfo.damage = 'Não possui mana suficiente!';
      }
      mageCurrentInfo.damage = Math.floor(Math.random() * ((mage.intelligence * 2) - mage.intelligence)) + mage.intelligence;
      mageCurrentInfo.manaUsed = 15;
      return mageCurrentInfo;  
  }
  
  const gameActions = {
      warriorTurn: (warriorDamage) => {
          let warriorHit = warriorDamage();
          dragon.healthPoints -= warriorHit;
          warrior.damage = warriorHit;
        //   if (dragon.healthPoints <= 0) return `The Dragon is dead! May the battle for loot start!`
          let warriorTurnInfo = `The warrior dealt ${warrior.damage} damage to the dragon. The dragon now has ${dragon.healthPoints}HP!`
          return warriorTurnInfo;
      },
      mageTurn: (mageDamage) => {
          let mageHit = mageDamage(mage).damage;
          mage.mana -= mageDamage(mage).manaUsed;
          dragon.healthPoints -= mageHit;
          mage.damage = mageHit;
        //   if (dragon.healthPoints <= 0) return `The Dragon is dead! May the battle for loot start!`
          let MageTurnInfo = `The mage dealt ${mage.damage} damage to the dragon and has ${mage.mana}MP! The dragon now has ${dragon.healthPoints}HP!`
          return MageTurnInfo;
      },
      dragonTurn: (dragonDamage) => {
          let dragonHit = dragonDamage();
          mage.healthPoints -= dragonHit;
          warrior.healthPoints -= dragonHit;
          dragon.damage = dragonHit;
          if (mage.healthPoints <= 0 && warrior.healthPoints <= 0) return `The dragon slaughtered the party!`
          if (mage.healthPoints <= 0) return `The dragon dealt ${dragon.damage} damage to the party! 
          The mage is dead, and the warrior has ${warrior.healthPoints}!`
          if (warrior.healthPoints <= 0) return `The dragon dealt ${dragon.damage} damage to the party! 
          The mage now has ${mage.healthPoints}HP, and the warrior is dead!`
          let dragonTurnInfo = `The dragon dealt ${dragon.damage} damage to the party! 
  The mage now has ${mage.healthPoints}HP, and the warrior has ${warrior.healthPoints}HP!`
          return dragonTurnInfo;
      },
      turnResult: () => `Results:
      Mage: ${mage.healthPoints}HP ${mage.mana}MP
      Warrior: ${warrior.healthPoints}HP
      Dragon: ${dragon.healthPoints}HP
    `,
  };
  
//   console.log(gameActions.warriorTurn(warriorDmg))
//   console.log(gameActions.mageTurn(mageDmgAndMana))
//   console.log(gameActions.dragonTurn(DragonDmg))
//   console.log(gameActions.turnResult());

startBtn.addEventListener('click', () => {
    if (dragon.healthPoints <= 0) {
      const info = document.createElement('p');
      info.innerText = `The Dragon is dead! May the battle for loot start!`;
      battleInfo.appendChild(info);
      return;
    }
    if (mage.healthPoints > 0 && warrior.healthPoints > 0) {
      const info = document.createElement('p');
      info.innerText = `${gameActions.mageTurn(mageDmgAndMana)},
      ${gameActions.warriorTurn(warriorDmg)},
      ${gameActions.dragonTurn(DragonDmg)},
      ${gameActions.turnResult()}`;
      battleInfo.appendChild(info);
      return;
    }
    if (mage.healthPoints <= 0) {
      const info = document.createElement('p');
      info.innerText = `${gameActions.warriorTurn(warriorDmg)},
      ${gameActions.dragonTurn(DragonDmg)},
      ${gameActions.turnResult()}`;
      battleInfo.appendChild(info);
      return;
    }
    if (warrior.healthPoints <= 0) {
      const info = document.createElement('p');
      info.innerText = `${gameActions.mageTurn(mageDmgAndMana)},
      ${gameActions.dragonTurn(DragonDmg)},
      ${gameActions.turnResult()}`;
      battleInfo.appendChild(info);
      return;
    }
});

