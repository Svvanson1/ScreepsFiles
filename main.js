var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleReparier = require('role.repairer');

//  Spawning + Role Assignment:   Game.spawns['Spawn1'].createCreep( [WORK, CARRY, MOVE], 'Builder1',
//  { role: 'builder' } );


module.exports.loop = function () {
    
    
    //Auto Delete unused
        for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    //Variables for creeps
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    
    //Auto Spawn
    if(harvesters.length < 7) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    }
    else if(upgraders.length < 7) { 
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE, MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }
    else if(builders.length < 5) { 
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
    }
    else if(repairers.length < 2) { 
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'repairer'});
        console.log('Spawning new repairer: ' + newName);
    }
    

    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }
    // End Auto Spawn
    
    
    
    
    //Main Loop to run roles

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }
}
