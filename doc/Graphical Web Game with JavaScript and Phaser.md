# Graphical Web Game with JavaScript and Phaser

## Short Link to This Page: [bit.ly/db-phaser](https://bit.ly/db-phaser)

## Resources
- [JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [Phaser 3 Documentation](https://photonstorm.github.io/phaser3-docs/)
- [Phaser 3 Examples](https://labs.phaser.io/index.html)
- [Piskel Sprite Editor](https://www.piskelapp.com/)
- [Krita](https://krita.org/en/) painting program (for installing on
your own computer)
- [OpenGameArt](https://opengameart.org/) free game art
- Dave’s [phaser-learning](https://github.com/dcbriccetti/phaser-lessons/) Github repository
- [Dave’s YouTube Channel](www.youtube.com/dcbriccetti)
- More about [Dave’s teaching](https://davebsoft.com/programming-for-kids/)
- [Dave’s email](mailto:daveb@davebsoft.com)
- Lafayette Library and Learning Center’s [event calendar](www.lllcf.org/program-calendar/)

### Goals
- Know what JavaScript and Phaser are
- Understand and be able to modify some simple Phaser programs
- Be able to create small games of your own design

### Introduction
#### Your Teacher and Assistants
#### Getting to Know You
Let’s look at your names, ages, what grades you’re in, and
your programming experience.
### Class Format
Our classes consist of:
- Instruction
- Exercises, where you explore and modify programs
- Low-key, interactive quizzes (not for a grade)
- Creative project work, where you apply what you’ve learned in your own way
- Show and tell, where you, the assistants and the instructor share interesting creations
- A five-minute break near the middle

#### [JavaScript](https://en.wikipedia.org/wiki/JavaScript)
Take 60 seconds and skim the Wikipedia article at the link above
to find out about it.

#### [Phaser](http://phaser.io)
Take 60 seconds and skim the Phaser web page to get a feel for
what it is and what it can do.

#### Quick demo of “Platform” and “Classify or Lose”
These Phaser programs are examples of what we are working towards.

#### Using repl.it
Many of the following links take you to a software
development site called repl.it. If you create an account you can save
your work there. All of your “repls” are visible to the public (if
they know where to look and care to). When you click on one of these
links and then change any of the files, repl.it makes a copy of
the repl (a “fork”), which then belongs to you.

### Lectures and Exercises

##### [Hello, World](https://repl.it/@dcbriccetti/hello)
This short example shows the code required to run Phaser from an
HTML page, and present the greeting, “Hello, World”. (Read about [the
tradition](https://en.wikipedia.org/wiki/%22Hello,_World!%22_program)
if you like.) Change:
1. the greeting
1. the text size and color
1. the background color

##### [Hello, World with a Sprite](https://repl.it/@dcbriccetti/hello-sprite)
Instead of using text to display “Hello, World”,
this example displays a rotating sprite containing the text.
1. Make the sprite rotate faster
1. Reverse the rotation direction

##### [Moving Character](https://repl.it/@dcbriccetti/moving-character)
This program has a pretty eagle flying in a blue sky. It’s programmed to
move right when you press the right arrow.
1. Make the character move in all four directions
1. Change the movement speed
1. Experiment with different drag values

##### [Two Collect](https://repl.it/@dcbriccetti/two-collect)
This game is about a cat and a monkey that collect diamonds. Only
the monkey moves in all four directions and shows a score.
1. Let the cat move all four ways
1. Show the cat’s score
1. (Optional) Have pieces of coal, or some other enemy sprite randomly
    appear and take points away when collected by one of the characters

##### [Bounce](https://repl.it/@dcbriccetti/bounce)
A tennis ball drops and bounces and rolls somewhat realistically, using
the “Arcade” physics engine of Phaser.
1. Experiment with different values for gravity, drag and bounce
1. Replace the graphic with one that you draw or find, considering appropriate use
    - Consider using [Creative Commons Search](https://search.creativecommons.org/)

##### [Multi-Bounce](https://repl.it/@dcbriccetti/multi-bounce)
Multiple tennis balls drop and interact with each other. Eventually,
each one fades away and disappears.
1. Change the ball-generation rate
1. Change the ball spawn position
1. Change the range of random X axis velocities
1. Change the fade-out time (look for “alpha”)
1. Change the number of balls that can exist
1. Change the way the balls spin (angular velocity)
1. Have the ball sizes be random

##### [Platform](https://repl.it/@dcbriccetti/platform)
This game is adapted from [a Phaser tutorial](https://phaser.io/tutorials/making-your-first-phaser-3-game), and improved
with modern JavaScript features and other changes. Collect the stars
and avoid the bombs.
1. Change how high the character jumps
1. Add another platform
1. Let the character leave the screen
1. Allow jumping even when the character is not on a surface

##### [Classify or Lose (aka Save the Animals)](https://repl.it/@dcbriccetti/classify-or-lose)
This game, which has you save animals by classifying them as monkeys,
birds or cats, is written in such a way that the theme can be changed
by bringing in new graphics and sounds.
1. Change the theme (to a happy one?)

##### [Very Simple Animation](https://repl.it/@dcbriccetti/very-simple-animation)
Here is a very simple animation example.

##### [Accelerate with Drag](https://repl.it/@dcbriccetti/drag-accel)
This program lets you play with acceleration, drag and velocity. And
sound!

### Make Your Own Game
You now have examples for doing many things with a Phaser game. Now it’s
time to make your own game. Follow these steps, if you like.
1. Think of a theme
1. Add a background
1. Make the player character
    1. Find an existing spritesheet or make your own (perhaps with
    Piskel \[see above\])
1. Make your character appear in the game
1. Have it move around with cursor or WASD keys, if you like
1. Give it an animation (jumping, perhaps)
