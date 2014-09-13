//  Node Guess 100
//  Node Guess 100 is a simple guessing game written for being run on node.js
//  The user have to guess a random number between 1 and 100 and when
//  guessed right is given the choice to either exit the game or play another round.
//  Just run: node guess100.js to start the program.

//  (c) 2014 Jörgen Nilsson, http://jorgennilsson.com
//  Node Guess 100 may be freely distributed under the MIT license.
//  Code and details available at
//  http://guess100.jorgennilsson.com

(function() {
    'use strict';
    var guess100_game,
        nodeGuess100 = {

        nr_of_guesses: 0,
        secret_number: 0,
        io: {},

        run: function() {
            this.setup_io_interface();
            this.set_secret_number();
            this.welcome();
        },

        setup_io_interface: function() {
            var readline = require('readline');

            this.io = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
                terminal: true
            });
        },

        welcome: function() {
            var self = this;
            console.log('Welcome to Guess100!');
            console.log('S to start a new game!');
            console.log('Q to exit game.');
            console.log('Press ctrl+c to exit the game at any time.');

            this.io.question('S or Q: ', function(answer) {
                self.start_or_quit(answer);
            });
        },

        start_or_quit: function(answer) {
            var self = this,
                game_option = answer.toLowerCase();

            if(game_option === 'q') {
                this.end();
                return;
            }

            if(game_option === 's') {
                this.start();
                return;
            }

            console.log('S to start a new game or Q to quit and exit.');
            this.io.question('S or Q: ', function(new_answer) {
                self.start_or_quit(new_answer);
            });
        },

        start: function() {
            var self = this;
            this.io.question('Guess a number between 1 and 100: ', function(guessed_number) {
                self.evaluate_guess(guessed_number);
            });
        },

        evaluate_guess: function(guess) {
            var self = this,
                query = '',
                guessed_number = parseInt(guess, 0);

            if(guessed_number === this.secret_number) {
                this.increment_guesses();
                console.log('Woohoo, you guessed right!');
                console.log('The secret number was ' + this.secret_number + ' and it took you ' + this.nr_of_guesses + ' guesses!');
                this.restart();
                return;
            }

            if(isNaN(guessed_number) || guessed_number <= 0 || guessed_number >= 100) {
                query = 'Both you and me knows that what you just entered is not a number between 1 and 100.\n\rTry again: ';
            } else if(guessed_number < this.secret_number) {
                query = 'Not quite right. The secret number is higher than ' + guessed_number + '.\n\rTry again: ';
            } else {
                query = 'Not quite right. The secret number is lower than ' + guessed_number + '.\n\rTry again: ';
            }

            this.io.question(query, function(new_guess) {
                self.increment_guesses();
                self.evaluate_guess(new_guess);
            });
        },

        restart: function() {
            var self = this;

            this.secret_number = 0;
            this.nr_of_guesses = 0;

            this.io.question('Play another round? Y or N: ', function(answer) {
                var chosen_answer = answer.toLowerCase();
                if(chosen_answer === 'y') {
                    self.start();
                    return;
                }

                if(chosen_answer === 'n') {
                    console.log('Thanks for playing.');
                    self.end();
                    return;
                }

                self.restart();
            });
        },

        end: function() {
            console.log('Bye bye!');
            this.io.close();
        },

        set_secret_number: function() {
            this.secret_number = Math.floor(Math.random() * (100 - 1)) + 1;
        },

        increment_guesses: function() {
            this.nr_of_guesses = this.nr_of_guesses + 1;
        }
    };

    guess100_game = Object.create(nodeGuess100);
    guess100_game.run();

}());