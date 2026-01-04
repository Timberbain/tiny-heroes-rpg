
1. What are you trynig to do? What is the goal of the project?
A role playing web application game named Tiny Heroes RPG. Game design document can be found here /docs/tiny_heroes_rpg_game_design_document.md. 
It should be an interactive application where users can go on adventures, using AI as the game master. When starting a new adventure, user should be able to select their character and name. They should also be able to lay the foundation of the adventure by giving some inspiration and direction to the game master, which setting (fantasy, sci-fi, horror), short or long adventure, and more...
During the adventure, the game master will lead the player through the story and ask for user input. There will be challenges to overcome, and some times finding treasure. 
The application should be built using nextjs + tailwind. Use mongodb as the database. For the AI integration, use chat-gpt api.


2. What are the milestones of functionality you want?

MVP - A simple landing page with a "start adventure" button. User should be able to select character, name and adventure setting. Play a short scenario with 5 interaction that ends in a fight with a monster.

Version 1 - User should be able to continue adventures and start new adventures based on a previous - reusing the character and its history.