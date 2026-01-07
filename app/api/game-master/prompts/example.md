### 1) Example: Turn that asks for a roll
You send this to the model (system = GM prompt from before, user = this JSON as text):

```json
{
  "adventurePlan": {
    "title": "The Giggle Forest Rescue",
    "setting": "A bright, happy forest where animals talk and trees like to tell jokes.",
    "heroName": "Jonas",
    "recommendedAgeRange": "4-8",
    "overallGoal": "Jonas wants to help a lost baby dragon get back to its cozy cave.",
    "monster": {
      "name": "Tickle-Tummy Dragon",
      "description": "A big, wiggly dragon who loves giggles and snacks, not scary at all.",
      "isScary": false
    },
    "scenarios": [
      {
        "id": 1,
        "name": "Lost in the Giggle Forest",
        "description": "Jonas enters the forest and hears tiny sniffles. The trees whisper that someone needs help.",
        "location": "Forest edge",
        "keyNPCs": ["Whispering Tree", "Shy Squirrel"],
        "likelySkills": ["kind", "smart"],
        "hasChallenge": true,
        "notesForGM": "Introduce Jonas and let him notice the sounds of a sad or worried creature nearby."
      },
      {
        "id": 2,
        "name": "The Wobbly Log Bridge",
        "description": "Jonas finds a wobbly log over a giggling stream. The lost sounds seem to come from the other side.",
        "location": "Giggling stream",
        "keyNPCs": ["Chatty Frog"],
        "likelySkills": ["strong", "smart"],
        "hasChallenge": true,
        "notesForGM": "Crossing the bridge should probably require a roll. Falling off is silly, not dangerous."
      }
      // ...more scenarios...
    ],
    "expectedNumberOfScenes": 5,
    "designNotesForGM": "Keep the forest bright and friendly. Use tiny, gentle problems and build up to meeting the dragon, who should be silly and kind, not scary."
  },
  "gameState": {
    "currentScenarioId": 2,
    "hearts": 3,
    "maxHearts": 3,
    "monsterAppeared": false,
    "adventureComplete": false
  },
  "playerInput": "Jonas says, 'I carefully step onto the wobbly log and try to walk across to the other side.'",
  "rollInfo": null
}
```

Possible model response (asking for a roll):

```json
{
  "action": "request_roll",
  "skill": "strong",
  "difficulty": "normal",
  "narrative": "Jonas takes a brave breath and puts one foot on the wobbly log. The giggling stream splashes and the log wiggles under his shoes. Each careful step makes the log bounce a little more as he tries to cross to the other side. Let’s see if Jonas can keep his balance on the silly, shaky bridge! Please roll a STRONG check to see how well Jonas can cross."
}
```

Your code then:

Sees action: "request_roll".

Rolls dice (e.g. d20) and computes success/failure.

Calls the model again with rollInfo.

### 2) Example: Next turn, resolving a high roll
Say you rolled a 4 on a normal strong check and decided that’s a success.
You call the model again with the same system prompt, and a new user payload:

```json
{
  "adventurePlan": {
    "title": "The Giggle Forest Rescue",
    "setting": "A bright, happy forest where animals talk and trees like to tell jokes.",
    "heroName": "Jonas",
    "recommendedAgeRange": "4-8",
    "overallGoal": "Jonas wants to help a lost baby dragon get back to its cozy cave.",
    "monster": {
      "name": "Tickle-Tummy Dragon",
      "description": "A big, wiggly dragon who loves giggles and snacks, not scary at all.",
      "isScary": false
    },
    "scenarios": [
      {
        "id": 1,
        "name": "Lost in the Giggle Forest",
        "description": "Jonas enters the forest and hears tiny sniffles. The trees whisper that someone needs help.",
        "location": "Forest edge",
        "keyNPCs": ["Whispering Tree", "Shy Squirrel"],
        "likelySkills": ["kind", "smart"],
        "hasChallenge": true,
        "notesForGM": "Introduce Jonas and let him notice the sounds of a sad or worried creature nearby."
      },
      {
        "id": 2,
        "name": "The Wobbly Log Bridge",
        "description": "Jonas finds a wobbly log over a giggling stream. The lost sounds seem to come from the other side.",
        "location": "Giggling stream",
        "keyNPCs": ["Chatty Frog"],
        "likelySkills": ["strong", "smart"],
        "hasChallenge": true,
        "notesForGM": "Crossing the bridge should probably require a roll. Falling off is silly, not dangerous."
      }
      // ...more scenarios...
    ],
    "expectedNumberOfScenes": 5,
    "designNotesForGM": "Keep the forest bright and friendly. Use tiny, gentle problems and build up to meeting the dragon, who should be silly and kind, not scary."
  },
  "gameState": {
    "currentScenarioId": 2,
    "hearts": 3,
    "maxHearts": 3,
    "monsterAppeared": false,
    "adventureComplete": false
  },
  "playerInput": "Jonas tries to cross the wobbly log bridge.",
  "rollInfo": {
    "skill": "strong",
    "difficulty": "normal",
    "roll": 4,
    "success": true
  }
}
```

Possible model response (narration after a great success):

```json
{
  "action": "narrate",
  "narrative": "Jonas steps onto the wobbly log and holds his arms out wide. The log wiggles and jiggles, but Jonas stays steady and strong. With a few careful steps and a little hop at the end, he reaches the other side perfectly dry! The giggling stream splashes happily below, as if cheering for him. From the bushes ahead, Jonas hears a tiny sniffle and a small, squeaky hiccup, like someone trying not to cry.",
  "heartChange": 1,
  "isMonsterEncounter": false,
  "adventureComplete": false
}
```

Your code then:

Updates hearts by +1 (up to max).

Advances scenario (maybe to 3).

Renders this narrative to the player.

Waits for the next playerInput and repeats the loop.