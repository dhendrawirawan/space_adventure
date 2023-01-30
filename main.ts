namespace SpriteKind {
    export const Gas = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (statusbar.value > 25 && Bomb_available >= 5) {
        Bomb_available = 0
        projectile2 = sprites.createProjectileFromSprite(img`
            . . . . 2 2 2 2 2 2 2 2 4 . . . 
            . . . 2 4 4 4 5 5 4 4 4 2 2 2 . 
            . 2 2 5 5 d 4 5 5 5 4 4 4 4 2 . 
            . 2 4 5 5 5 5 d 5 5 5 4 5 4 2 2 
            . 2 4 d d 5 5 5 5 5 5 d 4 4 4 2 
            2 4 5 5 d 5 5 5 d d d 5 5 5 4 2 
            2 4 5 5 4 4 4 4 4 5 5 5 5 5 4 2 
            2 4 4 4 5 5 2 5 4 5 5 5 4 4 4 2 
            2 2 b b b b 2 4 4 2 b b b b 2 2 
            . 2 2 2 2 2 2 4 4 2 2 2 2 2 2 . 
            . . 2 2 2 5 2 4 4 2 5 2 2 2 . . 
            . . . b 2 2 b b b b 2 2 b . . . 
            . . 4 2 2 3 1 1 d 1 d 2 2 4 . . 
            . . 2 2 d 5 1 5 3 d 5 1 2 2 . . 
            . . 2 2 4 5 5 4 5 5 4 4 2 2 . . 
            . . . 2 2 4 4 4 4 4 2 2 2 . . . 
            `, mySprite, 0, -64)
        mySprite.startEffect(effects.halo, 3000)
        mySprite.setImage(assets.image`Ship_no_Bomb`)
        statusbar.value += -20
        music.play(music.createSoundEffect(WaveShape.Noise, 1768, 0, 255, 140, 3000, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        for (let index = 0; index < 32; index++) {
            projectile2.changeScale(0.5, ScaleAnchor.Middle)
            pause(100)
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`galgaDart1`, mySprite, 0, -100)
    projectile.startEffect(effects.warmRadial, 500)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
})
info.onScore(100, function () {
    game.showLongText("Time to finish (in seconds):", DialogLayout.Top)
    game.showLongText(game.runtime() / 1000, DialogLayout.Bottom)
    game.gameOver(true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gas, function (sprite, otherSprite) {
    statusbar.value = 100
    otherSprite.destroy()
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.over(false, effects.confetti)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 200)
    if (sprite == projectile) {
        sprite.destroy(effects.disintegrate, 200)
    }
    info.changeScoreBy(1)
    music.play(music.createSoundEffect(
    WaveShape.Square,
    742,
    0,
    255,
    0,
    500,
    SoundExpressionEffect.None,
    InterpolationCurve.Linear
    ), music.PlaybackMode.InBackground)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    mySprite.startEffect(effects.fire, 2000)
    otherSprite.destroy(effects.disintegrate, 500)
    music.play(music.createSoundEffect(WaveShape.Noise, 2125, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
})
let MyEnemyBoss: Sprite = null
let MyEnemy: Sprite = null
let MyFuel: Sprite = null
let projectile: Sprite = null
let projectile2: Sprite = null
let statusbar: StatusBarSprite = null
let Bomb_available = 0
let mySprite: Sprite = null
info.setScore(0)
effects.starField.startScreenEffect()
mySprite = sprites.create(assets.image`BombLoadedShip`, SpriteKind.Player)
mySprite.setPosition(80, 106)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
Bomb_available = 1
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, -25, 0)
music.play(music.createSong(assets.song`SpaceSong`), music.PlaybackMode.LoopingInBackground)
game.onUpdateInterval(9000, function () {
    MyFuel = sprites.createProjectileFromSide(img`
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        .....7977777777.....
        .....7777777777.....
        ......66666666......
        ......77222277......
        .....7727777777.....
        .....7927777777.....
        .....7972227777.....
        .....7727777777.....
        .....7727777777.....
        .....7772222776.....
        .....7777777776.....
        ......76666666......
        ....................
        ....................
        `, randint(-20, 20), randint(50, 100))
    MyFuel.x = randint(5, 155)
    MyFuel.setKind(SpriteKind.Gas)
})
game.onUpdateInterval(2000, function () {
    MyEnemy = sprites.createProjectileFromSide(assets.image`Blue Rocket0`, randint(-25, -75), randint(20, 50))
    MyEnemy.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(1000, function () {
    if (Bomb_available < 5) {
        Bomb_available += 1
    }
    if (Bomb_available == 4) {
        music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.InBackground)
        mySprite.setImage(assets.image`BombLoadedShip`)
    }
})
game.onUpdateInterval(1000, function () {
    MyEnemy = sprites.createProjectileFromSide(assets.image`Blue Rocket`, randint(25, 75), randint(20, 50))
    MyEnemy.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(4000, function () {
    MyEnemyBoss = sprites.create(assets.image`EnemyBoss`, SpriteKind.Enemy)
    animation.runImageAnimation(
    MyEnemyBoss,
    [img`
        f f f . . . . . . . . f f f . . 
        c b b c f . . . . . . c c f f . 
        . c b b c f . . . . . . c c f f 
        . c c c b f . . . . . . c f c f 
        . c c b b c f . c c . c c f f f 
        . c b b c b f c c 3 c c 3 c f f 
        . c b c c b f c b 3 c b 3 b f f 
        . . c c c b b c b 1 b b b 1 c . 
        . . . c c c c b b 1 b b b 1 c . 
        . . . . c c b b b b b b b b b c 
        . . . . f b b b b c 1 f f 1 b c 
        . . . c f b b b b f 1 f f 1 f f 
        . . c c f b b b b f 2 2 2 2 f f 
        . . . . f c b b b b 2 2 2 2 f . 
        . . . . . f c b b b b b b f . . 
        . . . . . . f f f f f f f . . . 
        `,img`
        . . . . . . . . . . . f f f . . 
        f f f . . . . . . . . c c f f f 
        c b b c f . . . c c . c c c f f 
        . c b b b f f c c 3 c c 3 c f f 
        . c c c b b f c b 3 c b 3 c f f 
        . c c b c b f c b b b b b b c f 
        . c b b c b b c b 1 b b b 1 c c 
        . c b c c c b b b b b b b b b c 
        . . c c c c c b b c 1 f f 1 b c 
        . . . c f b b b b f 1 f f 1 f c 
        . . . c f b b b b f f f f f f f 
        . . c c f b b b b f 2 2 2 2 f f 
        . . . . f c b b b 2 2 2 2 2 f . 
        . . . . . f c b b b 2 2 2 f . . 
        . . . . . . f f f f f f f . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . c c . c c . . . 
        . . . . . . c c c 3 c c 3 f . . 
        . . . . . c c c b 3 c b 3 c f . 
        . . . . f f b b b b b b b b c f 
        . . . . f f b b b 1 b b b 1 c c 
        . . . f f f c b b b b b b b b c 
        . . . f f f f b b c 1 f f 1 b c 
        . . . b b b c c b f 1 f f 1 f f 
        . . . c c c c f b f f f f f f f 
        . . c c c b b f b f 2 2 2 2 f f 
        . . . c b b c c b 2 2 2 2 2 f . 
        . . c b b c c f f b 2 2 2 f . . 
        . c c c c c f f f f f f f . . . 
        c c c c . . . . . . . . . . . . 
        `,img`
        . f f f . . . . . . . . f f f . 
        . c b b c f . . . . . . . c f f 
        . . c b b c f . . . . . . c c f 
        . . c c c b f . . . . . . . f c 
        . . c c b b f f . . . . . f f c 
        . . c b b c b f c c . c c f f f 
        . . c b c c b f c c c c c f f f 
        . . . c c c b c b 3 c c 3 c f . 
        . . . c c c c b b 3 c b 3 b c . 
        . . . . c c b b b b b b b b c c 
        . . . c f b b b 1 1 b b b 1 1 c 
        . . c c f b b b b b b b b b b f 
        . . . . f b b b b c b b b c b f 
        . . . . f c b b b 1 f f f 1 f . 
        . . . . . f c b b b b b b f . . 
        . . . . . . f f f f f f f . . . 
        `,img`
        . f f f . . . . . . . . f f f . 
        f f c . . . . . . . f c b b c . 
        f c c . . . . . . f c b b c . . 
        c f . . . . . . . f b c c c . . 
        c f f . . . . . f f b b c c . . 
        f f f c c . c c f b c b b c . . 
        f f f c c c c c f b c c b c . . 
        . f c 3 c c 3 b c b c c c . . . 
        . c b 3 b c 3 b b c c c c . . . 
        c c b b b b b b b b c c . . . . 
        c b 1 b b b 1 b b b b f c . . . 
        f b b b b b b b b b b f c c . . 
        f b c b b b c b b b b f . . . . 
        . f 1 f f f 1 b b b c f . . . . 
        . . f b b b b b b c f . . . . . 
        . . . f f f f f f f . . . . . . 
        `,img`
        . . f f f . . . . . . . . f f f 
        . f f c c . . . . . . f c b b c 
        f f c c . . . . . . f c b b c . 
        f c f c . . . . . . f b c c c . 
        f f f c c . c c . f c b b c c . 
        f f c 3 c c 3 c c f b c b b c . 
        f f b 3 b c 3 b c f b c c b c . 
        . c 1 b b b 1 b c b b c c c . . 
        . c 1 b b b 1 b b c c c c . . . 
        c b b b b b b b b b c c . . . . 
        c b 1 f f 1 c b b b b f . . . . 
        f f 1 f f 1 f b b b b f c . . . 
        f f 2 2 2 2 f b b b b f c c . . 
        . f 2 2 2 2 b b b b c f . . . . 
        . . f b b b b b b c f . . . . . 
        . . . f f f f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . c c . c c . . . . . . . . 
        . . f 3 c c 3 c c c . . . . . . 
        . f c 3 b c 3 b c c c . . . . . 
        f c b b b b b b b b f f . . . . 
        c c 1 b b b 1 b b b f f . . . . 
        c b b b b b b b b c f f f . . . 
        c b 1 f f 1 c b b f f f f . . . 
        f f 1 f f 1 f b c c b b b . . . 
        f f f f f f f b f c c c c . . . 
        f f 2 2 2 2 f b f b b c c c . . 
        . f 2 2 2 2 2 b c c b b c . . . 
        . . f 2 2 2 b f f c c b b c . . 
        . . . f f f f f f f c c c c c . 
        . . . . . . . . . . . . c c c c 
        `],
    500,
    false
    )
    MyEnemyBoss.setPosition(randint(5, 155), -5)
    MyEnemyBoss.setScale(2.5, ScaleAnchor.Middle)
    MyEnemyBoss.follow(mySprite, 75)
})
game.onUpdateInterval(300, function () {
    statusbar.value += -1
})
