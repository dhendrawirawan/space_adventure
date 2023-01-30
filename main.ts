namespace SpriteKind {
    export const Gas = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (statusbar.value > 25 && Bomb_available > 0) {
        Bomb_available += -1
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
            `, mySprite, 50, 100)
        projectile2.startEffect(effects.halo, 5000)
        mySprite.startEffect(effects.spray, 2000)
        projectile2.setVelocity(0, -40)
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
let MyEnemy: Sprite = null
let MyEnemyBoss: Sprite = null
let MyFuel: Sprite = null
let projectile: Sprite = null
let projectile2: Sprite = null
let statusbar: StatusBarSprite = null
let Bomb_available = 0
let mySprite: Sprite = null
info.setScore(0)
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . . a . . . . . . . 
    . . . . . 4 . . 3 . . 4 . . . . 
    . . . . . 9 . e 3 e . 9 . . . . 
    . . . . . 9 e f 2 f e 9 . . . . 
    . . . . . e f 2 2 2 2 e . . . . 
    . . . . . 2 2 2 2 2 2 4 . . . . 
    . 4 . . . 2 4 2 9 2 2 2 . . . 4 
    . 2 4 . 2 2 2 9 9 9 4 2 2 . 4 2 
    . 2 2 c 2 4 e 9 d 9 c 2 c 2 2 2 
    . . 2 2 2 2 9 9 d 9 9 2 2 2 c . 
    . . . c 2 2 2 9 9 9 2 2 2 e . . 
    . . . . 2 2 2 e e e 2 2 2 . . . 
    . . . d c d . . . . . d c d . . 
    . . . c 2 c . . . . . c 2 c . . 
    . . . 5 4 5 . . . . . 5 4 5 . . 
    . . 5 4 5 4 5 . . . 5 4 5 4 5 . 
    `, SpriteKind.Player)
mySprite.setPosition(80, 106)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
Bomb_available = 1
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, -25, 0)
music.play(music.createSong(assets.song`SpaceSong`), music.PlaybackMode.LoopingInBackground)
game.onUpdateInterval(5000, function () {
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
        `, randint(-10, 10), randint(50, 75))
    MyFuel.x = randint(5, 155)
    MyFuel.setKind(SpriteKind.Gas)
})
game.onUpdateInterval(5000, function () {
    if (game.runtime() > 15000) {
        MyEnemyBoss = sprites.create(assets.image`EnemyBoss`, SpriteKind.Enemy)
        animation.runImageAnimation(
        MyEnemyBoss,
        [img`
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
            . . f f f . . . . . . . . . . . 
            f f f c c . . . . . . . . f f f 
            f f c c c . c c . . . f c b b c 
            f f c 3 c c 3 c c f f b b b c . 
            f f c 3 b c 3 b c f b b c c c . 
            f c b b b b b b c f b c b c c . 
            c c 1 b b b 1 b c b b c b b c . 
            c b b b b b b b b b c c c b c . 
            c b 1 f f 1 c b b c c c c c . . 
            c f 1 f f 1 f b b b b f c . . . 
            f f f f f f f b b b b f c . . . 
            f f 2 2 2 2 f b b b b f c c . . 
            . f 2 2 2 2 2 b b b c f . . . . 
            . . f 2 2 2 b b b c f . . . . . 
            . . . f f f f f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
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
            c 1 1 b b b 1 1 b b b f c . . . 
            f b b b b b b b b b b f c c . . 
            f b c b b b c b b b b f . . . . 
            . f 1 f f f 1 b b b c f . . . . 
            . . f b b b b b b c f . . . . . 
            . . . f f f f f f f . . . . . . 
            `],
        500,
        false
        )
        MyEnemyBoss.setPosition(randint(5, 155), -5)
        MyEnemyBoss.setScale(2, ScaleAnchor.Middle)
        MyEnemyBoss.follow(mySprite, 75)
    }
})
game.onUpdateInterval(2000, function () {
    MyEnemy = sprites.createProjectileFromSide(assets.image`Blue Rocket0`, randint(-25, -75), randint(20, 50))
    MyEnemy.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(1000, function () {
    MyEnemy = sprites.createProjectileFromSide(assets.image`Blue Rocket`, randint(25, 75), randint(20, 50))
    MyEnemy.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(300, function () {
    statusbar.value += -1
})
