# Graphical Web Game with JavaScript and Phaser

## Short Link to This Page: [bit.ly/db-phaser](https://bit.ly/db-phaser)

## Resources
- [JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [Phaser 3 Documentation](https://photonstorm.github.io/phaser3-docs/)
- [Phaser 3 Examples](https://labs.phaser.io/index.html)
- [Piskel Sprite Editor](https://www.piskelapp.com/)
- [Krita](https://krita.org/en/) painting program (for your own computer)
- [OpenGameArt](https://opengameart.org/)
- Dave’s [phaser-learning](https://github.com/dcbriccetti/phaser-lessons/) Github repository
- More about [Dave’s teaching](https://davebsoft.com/programming-for-kids/)

### Goals
- Know what JavaScript and Phaser are
- Understand and be able to modify some simple Phaser programs
- Be able to create small games of your own design

### Introduction
#### [JavaScript](https://en.wikipedia.org/wiki/JavaScript)
#### [Phaser](http://phaser.io)

### Lessons and Exercises

#### Using repl.it
Creating an account. All your repls are public.

##### [Hello, World](https://repl.it/@dcbriccetti/hello)
This short example shows the code required to run Phaser from an
HTML page, and present the greeting, “Hello, World”. (Read about [the
tradition](https://en.wikipedia.org/wiki/%22Hello,_World!%22_program)
if you like.) Try changing:
- the greeting
- the text size and color
- the background color

##### [Hello, World with a Sprite](https://repl.it/@dcbriccetti/hello-sprite)
Instead of using text to display “Hello, World”,
this example displays a rotating sprite containing the text.
- Make the sprite rotate faster
- Reverse the rotation direction

##### [Moving Character](https://repl.it/@dcbriccetti/moving-character)
This program has a pretty eagle flying in a blue sky. It’s programmed to
move right when you press the right arrow.
- Make the character move in all four directions
- Change the movement speed
- Experiment with different drag values

##### [Two Collect](https://repl.it/@dcbriccetti/two-collect)
This game is about a cat and a monkey that collect diamonds. Only
the monkey moves in all four directions and shows a score.
- Let the cat move all four ways
- Show the cat’s score
- Optional:
    - Have pieces of coal, or some other enemy sprite randomly
    appear and take points away when collected by one of the characters

##### [Bounce](https://repl.it/@dcbriccetti/bounce)
A tennis ball drops and bounces and rolls somewhat realistically, using
the “Arcade” physics engine of Phaser.
- Experiment with different values for gravity, drag and bounce
- Replace the graphic with one that you draw or find, considering appropriate use
    - Consider using [Creative Commons Search](https://search.creativecommons.org/)

##### [Multi-Bounce](https://repl.it/@dcbriccetti/multi-bounce)
Multiple tennis balls drop and interact with each other. Eventually,
each one fades away and disappears.
- Change the ball-generation rate
- Change the ball spawn position
- Change the range of random X axis velocities
- Change the fade-out time (look for “alpha”)
- Change the number of balls that can exist
- Change the way the balls spin (angular velocity)
- Have the ball sizes be random

##### [Platform](https://repl.it/@dcbriccetti/platform)
This game is adapted from [a Phaser tutorial](https://phaser.io/tutorials/making-your-first-phaser-3-game), and improved
with modern JavaScript features and other changes. Collect the stars
and avoid the bombs.
- Change how high the character jumps
- Add another platform
- Let the character leave the screen
- Allow jumping even when the character is not on a surface

##### [Classify or Lose (aka Save the Animals)](https://repl.it/@dcbriccetti/classify-or-lose)
This game, which has you save animals by classifying them as monkeys,
birds or cats, is written in such a way that the theme can be changed
by bringing in new graphics and sounds.
- Change the theme (to a happy one?)
