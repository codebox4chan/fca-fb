const dataUser = require('./data/datauser.json');
const setData = require('./setData');

function createCharacter({ data }) {
    if (typeof data !== 'object') {
        throw new Error('data must be an object');
    }
    const existingUser = dataUser.find(user => user.id == data.id);
    if (existingUser) return 403;
    return setData.createCharecter({
        data: {
            id: data.id,
            name: data.name,
            level: 1,
            exp: 0,
            hp: 1000,
            atk: 250,
            def: 200,
            spd: 100,
            the_luc: 500,
            buffs: null,
            weapon: null,
            locationID: null,
            bag: [
              {
      "type": "weapon",
      "id": 10,
      "name": "Iron Sword I",
      "usage": 0,
      "HP": 4000,
      "ATK": 210,
      "DEF": 210,
      "SPD": 2000,
      "durability": 100,
      "price": 1000,
      "image": "https://i.imgur.com/JB2JAEm.png"
    }
            ],
            monster: [],
            created: Date.now()
        }
    });
}

module.exports = createCharacter;