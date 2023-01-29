namespace SpriteKind {
    export const Gas = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (statusbar.value > 25 && Bomb_available == 1) {
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
            `, mySprite, 0, -100)
        projectile2.startEffect(effects.halo, 5000)
        pause(100)
        projectile2.changeScale(1, ScaleAnchor.Middle)
        pause(100)
        projectile2.setVelocity(0, -40)
        statusbar.value += -10
        music.play(music.createSoundEffect(WaveShape.Noise, 1768, 0, 255, 140, 3000, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        mySprite.startEffect(effects.spray, 500)
        for (let index = 0; index < 16; index++) {
            projectile2.changeScale(0.1, ScaleAnchor.Middle)
            pause(200)
        }
        projectile2.destroy(effects.confetti, 500)
        Bomb_available = 1
    } else {
        mySprite.startEffect(effects.spray, 500)
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
    sprite.destroy(effects.disintegrate, 200)
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
mySprite.setPosition(77, 100)
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
