namespace SpriteKind {
    export const Gas = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    Bomb += -1
    projectile2 = sprites.createProjectileFromSprite(img`
        . . . . 2 2 2 2 2 2 2 2 . . . . 
        . . . 2 4 4 4 5 5 4 4 4 2 2 2 . 
        . 2 2 5 5 d 4 5 5 5 4 4 4 4 2 . 
        . 2 4 5 5 5 5 d 5 5 5 4 5 4 2 2 
        . 2 4 d d 5 5 5 5 5 5 d 4 4 4 2 
        2 4 5 5 d 5 5 5 d d d 5 5 5 4 4 
        2 4 5 5 4 4 4 d 5 5 d 5 5 5 4 4 
        4 4 4 4 . . 2 4 5 5 . . 4 4 4 4 
        . . b b b b 2 4 4 2 b b b b . . 
        . b d d d d 2 4 4 2 d d d d b . 
        b d d b b b 2 4 4 2 b b b d d b 
        b d d b b b b b b b b b b d d b 
        b b d 1 1 3 1 1 d 1 d 1 1 d b b 
        . . b b d d 1 1 3 d d 1 b b . . 
        . . 2 2 4 4 4 4 4 4 4 4 2 2 . . 
        . . . 2 2 4 4 4 4 4 2 2 2 . . . 
        `, mySprite, 0, -21)
    projectile2.startEffect(effects.halo, 5000)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`galgaDart1`, mySprite, 0, -100)
    projectile.startEffect(effects.warmRadial, 500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gas, function (sprite, otherSprite) {
    statusbar.value = 100
    otherSprite.destroy()
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.over(false, effects.confetti)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 200)
    projectile.destroy(effects.spray, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    mySprite.startEffect(effects.fire, 2000)
    otherSprite.destroy(effects.disintegrate, 500)
})
let MyEnemy: Sprite = null
let MyFuel: Sprite = null
let projectile: Sprite = null
let projectile2: Sprite = null
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
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
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
let Bomb = 3
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, -25, 0)
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
    MyEnemy = sprites.createProjectileFromSide(assets.image`Blue Rocket`, randint(-25, -75), randint(20, 50))
    MyEnemy.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(1000, function () {
    MyEnemy = sprites.createProjectileFromSide(assets.image`Blue Rocket`, randint(25, 75), randint(20, 50))
    MyEnemy.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(300, function () {
    statusbar.value += -1
})
