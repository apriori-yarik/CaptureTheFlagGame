var game = new Phaser.Game(1000, 800, Phaser.Auto, '', {
    preload: preload,
    create: create, 
    update: update
} )

//Heroes
var hero1;
var hero2;
var heroes;

var cursors;
// Cursors Hero1,2
var shootHero1;
var shootHero2;

//Cursors Hero2
var leftHero2;
var rightHero2;
var upHero2;
var downHero2;
var shootHero2;

//Weapon
var weapon1;
var weapon2;

//walls
var walls;


var flags1;
var flags2;
var flag1;
var flag2;
var captured1 = false;
var captured2 = false;

var base1;
var base2;

var hero1Lives = 5;
var hero2Lives = 5;


function preload(){
    game.load.image('background', 'assets/background3.png');
    game.load.image('ork', 'assets/ork2.png');
    game.load.image('flyman', 'assets/flyman.png');
    game.load.image('bullet', 'assets/bullet.png');
    game.load.image('wall1', 'assets/wall1.png');
    game.load.image('flag1', 'assets/flag.png');
    game.load.image('base1', 'assets/base1.png');
    game.load.image('base2', 'assets/base2.png');
    game.load.image('wall', 'assets/wall.png');

}

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'background');

    //Bases
    base1 = game.add.sprite(0, game.world.height - 150, 'base1');
    base2 = game.add.sprite(game.world.width - 150, game.world.height - 150, 'base2');
    game.physics.arcade.enable(base1);
    game.physics.arcade.enable(base2);
    base1.body.immovable = true;
    base2.body.immovable = true;                

    hero1 = game.add.sprite(0, game.world.height - 77, 'ork');
    hero2 = game.add.sprite(game.world.width - 100, game.world.height - 100, 'flyman');
    game.physics.arcade.enable(hero1);
    game.physics.arcade.enable(hero2);
    hero1.body.collideWorldBounds = true;
    hero2.body.collideWorldBounds = true;
    hero1.body.immovable = false;
    hero2.body.immovable = false;
    heroes = game.add.group();
    heroes.enableBody = true;
    heroes.add(hero1);
    heroes.add(hero2);

    game.world.bringToTop(heroes);

    //Walls
    walls = game.add.group();
    walls.enableBody = true;
    walls.create(Math.floor(Math.random() * (450 - 200 + 1) + 200), 400, 'wall1');
    walls.create(Math.floor(Math.random() * (850 - 650 + 1) + 650), 300, 'wall1');
    walls.create(500, 100, 'wall');

    walls.setAll('body.immovable', true);

    //Cursors
    cursors = game.input.keyboard.createCursorKeys();
    cursors.upHero1 = game.input.keyboard.addKey(Phaser.Keyboard.W);
    cursors.downHero1 = game.input.keyboard.addKey(Phaser.Keyboard.S);
    cursors.leftHero1 = game.input.keyboard.addKey(Phaser.Keyboard.A);
    cursors.rightHero1 = game.input.keyboard.addKey(Phaser.Keyboard.D);
    cursors.shootHero2 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    cursors.shootHero1 = game.input.keyboard.addKey(Phaser.Keyboard.F);

    game.world.setBounds(0, 0, 1000, 800);

    //Weapon
    weapon1 = game.add.weapon(100, 'bullet');
    weapon1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon1.bulletKillType = game.physics.arcade.collide(weapon1.bullets, hero2);
    weapon1.bulletSpeed = 600;
    weapon1.fireRate = 300;
    weapon1.trackSprite(hero1, 77, 38.5, true);

    weapon2 = game.add.weapon(100, 'bullet');
    weapon2.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon2.bulletSpeed = -600;
    weapon2.fireRate = 200;
    weapon2.trackSprite(hero2, 0, 50, true);

    //Flags

    flag1 = game.add.sprite(0, 0, 'flag1');
    flag2 = game.add.sprite(game.world.width - 105, 0, 'flag1');
    game.physics.arcade.enable(flag1);
    game.physics.arcade.enable(flag2);

    // flags1 = game.add.group();
    // flags1.create(0, 0, 'flag1');
    // flags1.enableBody = true;
    // flags2 = game.add.group();
    // flag2 = flags2.create(game.world.width - 105, 0, 'flag1');
    // flags2.enableBody = true;

}

function update(){
    //hitPlatform
    var hitPlatform1 = game.physics.arcade.collide(hero1, walls);
    var hitPlatform2 = game.physics.arcade.collide(hero2, walls);
    game.physics.arcade.overlap(weapon1.bullets, walls, killBullet);
    game.physics.arcade.overlap(weapon2.bullets, walls, killBullet);

    function killBullet(bullet, walls){
        bullet.kill();
    }
    
    if(!cursors.up.isDown && !cursors.down.isDown && !cursors.left.isDown && !cursors.right.isDown){
        hero2.body.velocity.x = 0;
        hero2.body.velocity.y = 0;
    }
    // Moving - hero2
    if(cursors.up.isDown && !hitPlatform2){
        hero2.body.velocity.y = -500;
    }
    if(cursors.down.isDown && !hitPlatform2){
        hero2.body.velocity.y = 500;
    }
    if(cursors.left.isDown && !hitPlatform2){
        hero2.body.velocity.x = -500;                    
    }
    if(cursors.right.isDown && !hitPlatform2){
        hero2.body.velocity.x = 500;                    
    }
    

    //Moving - hero1
    if(!cursors.upHero1.isDown && !cursors.downHero1.isDown && !cursors.leftHero1.isDown && !cursors.rightHero1.isDown){
        hero1.body.velocity.x = 0;
        hero1.body.velocity.y = 0;
    }
    
    if(cursors.upHero1.isDown && !hitPlatform1){
        hero1.body.velocity.y = -500;
    }
    if(cursors.downHero1.isDown && !hitPlatform1){
        hero1.body.velocity.y = 500;
    }
    if(cursors.leftHero1.isDown && !hitPlatform1){
        hero1.body.velocity.x = -500;                    
    }
    if(cursors.rightHero1.isDown && !hitPlatform1){
        hero1.body.velocity.x = 500;                    
    }

    //Shooting hero1
    if(cursors.shootHero1.isDown){
        weapon1.fire();
    }
    //shooting hero2
    if(cursors.shootHero2.isDown){
        weapon2.fire();
    }

    game.physics.arcade.overlap(weapon1.bullets, hero2, collideBullets1, null, this);
    game.physics.arcade.overlap(weapon2.bullets, hero1, collideBullets2, null, this);
    
    function collideBullets1(bullet, hero2){
        bullet.kill();
        hero2.kill();
        window.alert("Hero1 won!");
    }

    function collideBullets2(bullet, hero1){
        bullet.kill();
        hero1.kill();
        window.alert("Hero2 won!");
        }
    }

    //CollsionFlag
    var hitFlag1 = game.physics.arcade.collide(hero1, flag1);
    var hitFlag2 = game.physics.arcade.collide(hero2, flag2);

    // function captureFlag1(){
    //     flags1.callAll('kill');
    //     captured1 = true;
    // }

    // function captureFlag2(flag2){
    //     flags2.callAll('kill');
    //     captured2 = true;
    // }

    if(hitFlag1){
       flag1.kill();
       captured1 = true;
    }
    if(hitFlag2){
        flag2.kill();
        captured2 = true;
    } 

    //Collision base with flag
    var captureFlagBase1 = game.physics.arcade.overlap(hero1, base1);
    if(captureFlagBase1 && captured1){
        window.alert("Hero1 won");
        captured1 = false;
        flag1 = game.add.sprite(0, 0, 'flag1');
        game.physics.arcade.enable(flag1);
    }

    var captureFlagBase2 = game.physics.arcade.overlap(hero2, base2);
    if(captureFlagBase2 && captured2){
        window.alert("Hero2 won");
        captured2 = false;
        flag2 = game.add.sprite(game.world.width - 105, 0, 'flag1');
        game.physics.arcade.enable(flag2);
    }


function render(){
    weapon1.debug();
    weapon2.debug();
}