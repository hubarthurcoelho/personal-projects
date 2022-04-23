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
const mageHpInput = document.getElementById("mageHp");
const mageMpInput = document.getElementById("mageMp");
const mageIntInput = document.getElementById("mageInt");
const warriorHpInput = document.getElementById("warriorHp");
const warriorStrInput = document.getElementById("warriorStr");
const warriorWeaponInput = document.getElementById("warriorWeapon");
const dragonHpInput = document.getElementById("dragonHp");
const dragonStrInput = document.getElementById("dragonStr");
mageHpInput.defaultValue = mage.healthPoints;
mageMpInput.defaultValue = mage.mana;
mageIntInput.defaultValue = mage.intelligence;
warriorHpInput.defaultValue = warrior.healthPoints;
warriorStrInput.defaultValue = warrior.strength;
warriorWeaponInput.defaultValue = warrior.weaponDmg;
dragonHpInput.defaultValue = dragon.healthPoints;
dragonStrInput.defaultValue = dragon.strength;
const mageDiv = document.getElementById("mage");
const warriorDiv = document.getElementById("warrior");
const dragonDiv = document.getElementById("dragon");
const mageDmgTaken = document.getElementById("mageDmgTaken");
const warriorDmgTaken = document.getElementById("warriorDmgTaken");
const dragonDmgTaken = document.getElementById("dragonDmgTaken");
const mageImg = document.getElementById("mageImg");
const warriorImg = document.getElementById("warriorImg");
const dragonImg = document.getElementById("dragonImg");
const MageImgHp = document.getElementById("MageImgHp");
const MageImgMp = document.getElementById("MageImgMp");
const warriorImgHp = document.getElementById("warriorImgHp");
const dragonImgHp = document.getElementById("dragonImgHp");
const battleInfo = document.getElementById("battleInfo");
const createBtn = document.getElementById("createBtn");
const mageTurnBtn = document.getElementById("mageTurn");
const warriorTurnBtn = document.getElementById("warriorTurn");
const dragonTurnBtn = document.getElementById("dragonTurn");
const dragonFire = document.getElementById("fire");
let inGameDiv = document.getElementById("inGameCharacters");
mageDmgTaken.style.opacity = 0;
warriorDmgTaken.style.opacity = 0;
dragonDmgTaken.style.opacity = 0;
mageTurnBtn.disabled = true;
warriorTurnBtn.disabled = true;
dragonTurnBtn.disabled = true;
let warriorFullHp;
let mageFullHp;
let dragonfullHp;

function addImages() {
  if (mage.healthPoints > 0) {
    mageImg.src = "./images/mage.png";
  }
  if (warrior.healthPoints > 0) {
    warriorImg.src = "./images/warrior.png";
  }
  dragonImg.src = "./images/dragon.png";
}

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

createBtn.addEventListener("click", () => {
  mage.healthPoints = parseInt(mageHpInput.value);
  mageFullHp = mage.healthPoints;
  mage.intelligence = parseInt(mageIntInput.value);
  mage.mana = parseInt(mageMpInput.value);
  warrior.healthPoints = parseInt(warriorHpInput.value);
  warriorFullHp = warrior.healthPoints;
  warrior.strength = parseInt(warriorStrInput.value);
  warrior.weaponDmg = parseInt(warriorWeaponInput.value);
  dragon.healthPoints = parseInt(dragonHpInput.value);
  dragonfullHp = dragon.healthPoints;
  dragon.strength = parseInt(dragonStrInput.value);
  addImages();
  addVisualHpMp();
  mageTurnBtn.disabled = false;
  warriorTurnBtn.disabled = false;
  dragonTurnBtn.disabled = false;
  document.getElementById("result").style.opacity = 1;
  MageImgHp.style.opacity = 1;
  MageImgMp.style.opacity = 1;
  warriorImgHp.style.opacity = 1;
  dragonImgHp.style.opacity = 1;
});

const battleMembers = { mage, warrior, dragon };

const DragonDmg = () => Math.floor(Math.random() * dragon.strength) + 15;
const warriorDmg = () =>
  Math.floor(
    Math.random() * (warrior.weaponDmg * warrior.strength - warrior.strength)
  ) + warrior.strength;

const mageDmgAndMana = (mage) => {
  let mageMana = mage.mana;
  let mageCurrentInfo = {
    damage:
      Math.floor(Math.random() * (mage.intelligence * 2 - mage.intelligence)) +
      mage.intelligence,
    manaUsed: 0,
  };
  if (mageMana < 15) {
    mageCurrentInfo.damage = "Não possui mana suficiente!";
  }
  mageCurrentInfo.damage =
    Math.floor(Math.random() * (mage.intelligence * 2 - mage.intelligence)) +
    mage.intelligence;
  mageCurrentInfo.manaUsed = 15;
  return mageCurrentInfo;
};

const gameActions = {
  warriorTurn: (warriorDamage) => {
    let warriorHit = warriorDamage();
    dragon.healthPoints -= warriorHit;
    warrior.damage = warriorHit;
  },
  mageTurn: (mageDamage) => {
    let mageHit = mageDamage(mage).damage;
    mage.mana -= mageDamage(mage).manaUsed;
    dragon.healthPoints -= mageHit;
    mage.damage = mageHit;
  },
  dragonTurn: (dragonDamage) => {
    let dragonHitMage = dragonDamage();
    let dragonHitWarrior = dragonDamage();
    if (mage.healthPoints != "dead") mage.healthPoints -= dragonHitMage;
    if (warrior.healthPoints > 0) warrior.healthPoints -= dragonHitWarrior;
    dragon.damage = dragonHitMage;
    dragon.damageWarrior = dragonHitWarrior;
  },
};

function createResetButton() {
  const resetBtn = document.createElement("button");
  resetBtn.innerText = "Reset Game";
  resetBtn.className = "buttons";
  document.getElementById("btnGameSettings").appendChild(resetBtn);
  resetBtn.addEventListener("click", () => document.location.reload(false));
}

function checkWinners() {
  if (mage.healthPoints === "dead" && warrior.healthPoints === "dead") {
    const result = document.getElementById("result");
    result.innerText =
      "The Dragon slaughtered the party! Better luck next time!";
    mageTurnBtn.disabled = true;
    warriorTurnBtn.disabled = true;
    dragonTurnBtn.disabled = true;
    createResetButton();
  }
  if (dragon.healthPoints <= 0) {
    const result = document.getElementById("result");
    result.innerText = "The Dragon is dead! Let the battle for loot begin!";
    mageTurnBtn.disabled = true;
    warriorTurnBtn.disabled = true;
    dragonTurnBtn.disabled = true;
    createResetButton();
  }
}

function fadeImg(image, timer, opacit) {
  setTimeout(() => (image.style.opacity = opacit), timer);
}

function createMotion(image) {
  let timer = 100;
  let opacity = 1;
  for (let index = 0; index < 15; index++) {
    fadeImg(image, timer, opacity);
    opacity -= 0.1;
    timer += 100;
  }
}
function checkSurvivors() {
  if (mage.healthPoints <= 0) {
    mageTurnBtn.disabled = true;
    mageImg.src = "./images/deadMage.png";
    mageDmgTaken.innerText = "The Dragon killed the mage!";
    createMotion(mageImg);
    setTimeout(() => {
      mageDmgTaken.style.opacity = 0;
      MageImgHp.style.opacity = 0;
      MageImgMp.style.opacity = 0;
    }, 1500);
    mage.healthPoints = "dead";
  }
  if (warrior.healthPoints <= 0) {
    warriorTurnBtn.disabled = true;
    warriorImg.src = "./images/deadWarrior.png";
    warriorDmgTaken.innerText = "The Dragon killed the warrior!";
    createMotion(warriorImg);
    setTimeout(() => {
      warriorDmgTaken.style.opacity = 0;
      warriorImgHp.style.opacity = 0;
    }, 1500);
    warrior.healthPoints = "dead";
  }
  if (dragon.healthPoints <= 0) {
    dragonImg.src = "./images/deadDragon.png";
    dragonDmgTaken.innerText = "The Dragon is dead!";
    createMotion(dragonImg);
    setTimeout(() => {
      dragonDmgTaken.style.opacity = 0;
      dragonImgHp.style.opacity = 0;
    }, 1500);
  }
}

function checkTurn() {
  if (
    mageTurnBtn.disabled === true &&
    warriorTurnBtn.disabled === true &&
    dragonTurnBtn.disabled === true
  ) {
    if (mage.healthPoints != "dead") mageTurnBtn.disabled = false;
    if (warrior.healthPoints != "dead") warriorTurnBtn.disabled = false;
    dragonTurnBtn.disabled = false;
  }
}

function checkCharacterLife(character, characterFullHp, characterImg) {
  if (character.healthPoints < characterFullHp * 0.3) {
    characterImg.style.color = "red";
  } else if (character.healthPoints < characterFullHp * 0.8)
    characterImg.style.color = "yellow";
}

mageTurnBtn.addEventListener("click", () => {
  mageImg.src = "./images/mageAttacking.png";
  setTimeout(() => {
    mageImg.src = "./images/mage.png";
    dragonImg.src = "./images/dragonTakingDmgFromMageFinal.png";
    gameActions.mageTurn(mageDmgAndMana);
    MageImgHp.innerText = `${mage.healthPoints}HP`;
    MageImgMp.innerText = `${mage.mana}MP`;
    dragonImgHp.innerText = `${dragon.healthPoints}HP`;
    dragonDmgTaken.innerText = `${mage.damage} damage!`;
    dragonDmgTaken.style.opacity = 1;
  }, 700);
  setTimeout(() => {
    if (dragon.healthPoints > 0) dragonImg.src = "./images/dragon.png";
  }, 2000);

  setTimeout(() => checkSurvivors(), 2100);
  setTimeout(() => checkWinners(), 2100);
  mageTurnBtn.disabled = true;
  checkTurn();
  setTimeout(() => checkCharacterLife(dragon, dragonfullHp, dragonImgHp), 1000);
});

warriorTurnBtn.addEventListener("click", () => {
  warriorImg.src = "./images/warriorAttackBeise.png";
  dragonImg.src = "./images/dragonbeise.png";
  setTimeout(() => {
    dragonImg.src = "./images/dragon.png";
    warriorImg.src = "./images/warrior.png";
    gameActions.warriorTurn(warriorDmg);
    warriorImgHp.innerText = `${warrior.healthPoints}HP`;
    dragonImgHp.innerText = `${dragon.healthPoints}HP`;
    dragonDmgTaken.innerText = `${warrior.damage} damage!`;
    dragonDmgTaken.style.opacity = 1;
  }, 700);
  setTimeout(() => {
    if (dragon.healthPoints > 0) dragonImg.src = "./images/dragon.png";
  }, 1000);

  setTimeout(() => checkSurvivors(), 1100);
  setTimeout(() => checkWinners(), 1100);
  warriorTurnBtn.disabled = true;
  checkTurn();
  setTimeout(() => checkCharacterLife(dragon, dragonfullHp, dragonImgHp), 1000);
});

dragonTurnBtn.addEventListener("click", () => {
  dragonImg.src = "./images/esre.png";
  mageImg.src = "./images/mageTakingDmg.png";
  warriorImg.src = "./images/warriorTakingDmg.png";
  createMotion(dragonFire);
  setTimeout(() => {
    dragonImg.src = "./images/dragon.png";
    if (warrior.healthPoints > 0) warriorImg.src = "./images/warrior.png";
    if (mage.healthPoints > 0) mageImg.src = "./images/mage.png";
    if (mage.healthPoints != "dead") mageDmgTaken.style.opacity = 1;
    if (warrior.healthPoints != "dead") warriorDmgTaken.style.opacity = 1;
    gameActions.dragonTurn(DragonDmg);
    warriorImgHp.innerText = `${warrior.healthPoints}HP`;
    MageImgHp.innerText = `${mage.healthPoints}HP`;
    mageDmgTaken.innerText = `${dragon.damage} damage!`;
    warriorDmgTaken.innerText = `${dragon.damageWarrior} damage!`;
  }, 1500);
  setTimeout(() => checkSurvivors(), 1500);
  setTimeout(() => checkWinners(), 1500);
  dragonTurnBtn.disabled = true;
  checkTurn();
  setTimeout(() => {
    checkCharacterLife(mage, mageFullHp, MageImgHp);
    checkCharacterLife(warrior, warriorFullHp, warriorImgHp);
  }, 1000);
});
