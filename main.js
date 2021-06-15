var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    //console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 3) {
        var newName = 'Harvester' + Game.time;
        //console.log('Spawning new harvester: ' + newName);
        //Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], newName, //требует 550 энергии
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
    }
    
    if(upgraders.length < 8) {
        var newName = 'Upgrader' + Game.time;
        //console.log('Spawning new harvester: ' + newName);
        //Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], newName, //требует 550 энергии
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'upgrader'}});
    }
    
    if(builders.length < 7) {
        var newName = 'Builder' + Game.time;
        //console.log('Spawning new harvester: ' + newName);
        //Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], newName, //требует 550 энергии
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'builder'}});
    }

    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
};
