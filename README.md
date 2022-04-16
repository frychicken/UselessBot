## UselessBot

Very nice gambling bot.

### Gamble features

+ !gamble (amount || all || percentage) to gamble. ex: ``` !gamble 50%```

+ !checkbank userID (optional) to check your/other user balance. ex ``` !checkbank ```

+ !richness to check who is the richest and your rank. ex ``` !richness```

+ !givebob userID (amount || all || percentage) to give away bobcoins to a user. ex ``` !givebob 420696969420 all```

+ !donatebob (amount || all || percentage) random(optional) to donate money to a bank or to random user. ex ```!donatebob 100 random```

+ !stats userID (optional) to see your win to loss ratio. ex: ```!stats ```

#### NOTES:

amount: specific amount; all: all of what you have; percentage: give in percent 

You can use bobcoins to buy/sell roles on the server! (!buyroles or !sellroles)

<hr>

On the front-end,

- Edit `views/index.html` to change the content of the webpage
- `public/client.js` is the javacript that runs when you load the webpage
- `public/style.css` is the styles for `views/index.html`
- Drag in `assets`, like images or music, to add them to your project

On the back-end,

- your app starts at `server.js`
- add frameworks and packages in `package.json`
- safely store app secrets in `.env` (where token is stored)