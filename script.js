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
const mageHpInput = document.getElementById('mageHp');
const mageMpInput = document.getElementById('mageMp');
const mageIntInput = document.getElementById('mageInt');
const warriorHpInput = document.getElementById('warriorHp');
const warriorStrInput = document.getElementById('warriorStr');
const warriorWeaponInput = document.getElementById('warriorWeapon');
const dragonHpInput = document.getElementById('dragonHp');
const dragonStrInput = document.getElementById('dragonStr');
mageHpInput.defaultValue = mage.healthPoints;
mageMpInput.defaultValue = mage.mana;
mageIntInput.defaultValue = mage.intelligence;
warriorHpInput.defaultValue = warrior.healthPoints;
warriorStrInput.defaultValue = warrior.strength;
warriorWeaponInput.defaultValue = warrior.weaponDmg;
dragonHpInput.defaultValue = dragon.healthPoints;
dragonStrInput.defaultValue = dragon.strength;
const mageDiv = document.getElementById('mage');
const warriorDiv = document.getElementById('warrior');
const dragonDiv = document.getElementById('dragon');
const mageDmgTaken = document.getElementById('mageDmgTaken');
const warriorDmgTaken = document.getElementById('warriorDmgTaken');
const dragonDmgTaken = document.getElementById('dragonDmgTaken');
const mageImg = document.getElementById('mageImg');
const warriorImg = document.getElementById('warriorImg');
const dragonImg = document.getElementById('dragonImg');
const MageImgHp = document.getElementById('MageImgHp');
const MageImgMp = document.getElementById('MageImgMp');
const warriorImgHp = document.getElementById('warriorImgHp');
const dragonImgHp = document.getElementById('dragonImgHp');

const battleInfo = document.getElementById('battleInfo');
const createBtn = document.getElementById('createBtn');
const startBtn = document.getElementById('startBtn');
const mageTurnBtn = document.getElementById('mageTurn');
const warriorTurnBtn = document.getElementById('warriorTurn');
const dragonTurnBtn = document.getElementById('dragonTurn');
const dragonFire = document.getElementById('fire');

  function addImages() {
    if (mage.healthPoints > 0) {
      mageImg.src = './images/mage.png';
    }
    if (warrior.healthPoints > 0) {
      warriorImg.src = './images/warrior.png';
    }
    dragonImg.src = './images/dragon.png';
  };

  function addVisualHpMp() {
    if (mage.healthPoints > 0) {
      MageImgHp.innerText = `${mage.healthPoints}HP`;
      MageImgMp.innerText = `${mage.mana}MP`;
    }
    if (warrior.healthPoints > 0) {
      warriorImgHp.innerText = `${warrior.healthPoints}HP`;
    }
    if (dragon.healthPoints > 0) {
      dragonImgHp.innerText = `${dragon.healthPoints}HP`;
    }
  }

createBtn.addEventListener('click', () => {
    mage.healthPoints = parseInt(mageHpInput.value);
    mage.intelligence = parseInt(mageIntInput.value);
    mage.mana = parseInt(mageMpInput.value);
    warrior.healthPoints = parseInt(warriorHpInput.value);
    warrior.strength = parseInt(warriorStrInput.value);
    warrior.weaponDmg = parseInt(warriorWeaponInput.value);
    dragon.healthPoints = parseInt(dragonHpInput.value);
    dragon.strength = parseInt(dragonStrInput.value);
    addImages();
    addVisualHpMp();
})
  
  const battleMembers = { mage, warrior, dragon };


  
  const DragonDmg = () => Math.floor(Math.random() * (dragon.strength )) + 15;
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
          let dragonHitMage = dragonDamage();
          let dragonHitWarrior = dragonDamage();
          mage.healthPoints -= dragonHitMage;
          warrior.healthPoints -= dragonHitWarrior;
          dragon.damage = dragonHitMage;
          dragon.damageWarrior = dragonHitWarrior;
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

mageTurnBtn.addEventListener('click', () => {
  mageImg.src = './images/mageAttacking.png';
  setTimeout(() => {
    mageImg.src = './images/mage.png';
    dragonImg.src = './images/dragonTakingDmgFromMageFinal.png';
    gameActions.mageTurn(mageDmgAndMana);
    MageImgHp.innerText = `${mage.healthPoints}HP`;
    MageImgMp.innerText = `${mage.mana}MP`;
    dragonImgHp.innerText = `${dragon.healthPoints}HP`;
    dragonDmgTaken.innerText = `${mage.damage} damage!`;
  }, 700);
  setTimeout(() => dragonImg.src = './images/dragon.png', 2000);
})

warriorTurnBtn.addEventListener('click', () => {
    warriorImg.src = './images/warriorAttackBeise.png';
    dragonImg.src = './images/dragonbeise.png';
  setTimeout(() => {
    dragonImg.src = './images/dragon.png';
    warriorImg.src = './images/warrior.png';
    gameActions.warriorTurn(warriorDmg);
    warriorImgHp.innerText = `${warrior.healthPoints}HP`;
    dragonImgHp.innerText = `${dragon.healthPoints}HP`;
    dragonDmgTaken.innerText = `${warrior.damage} damage!`;
  }, 700)
})

 function baforada(timer, opacit) {
  setTimeout(() => dragonFire.style.opacity = opacit, timer);
}
dragonTurnBtn.addEventListener('click', () => {
  dragonImg.src = './images/esre.png';
  mageImg.src = './images/mageTakingDmg.png';
  warriorImg.src = './images/warriorTakingDmg.png';
  // warriorImg.src = './images';
  // mageimg.src = './images';
  let timer = 100;
  let opacity = 1;
  for (let index = 0; index < 15; index++) {
    baforada(timer, opacity);
    opacity -= 0.1;
    timer += 100;
    console.log(timer, opacity);
  }
  setTimeout(() => {
    dragonImg.src = './images/dragon.png';
    warriorImg.src = './images/warrior.png';
    mageImg.src = './images/mage.png';
    gameActions.dragonTurn(DragonDmg);
    warriorImgHp.innerText = `${warrior.healthPoints}HP`;
    MageImgHp.innerText = `${mage.healthPoints}HP`;
    mageDmgTaken.innerText = `${dragon.damage} damage!`;
    warriorDmgTaken.innerText = `${dragon.damageWarrior} damage!`;
  }, 1500)
})
