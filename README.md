# MCVerifier
A discord bot to make whitelisting easier for your community/friends.

## What it does
The bot allows server owners to make whitelisting easier, and automatic.
In the specified channel, it sends a simple embed, with a button, and asks for the player's name, and adds it to the whitelist. Then, it'll send a DM to the player for further instructions.

## How to host it yourself
The bot isn't just a simple "Add to server" one, because it depends on interacting with the server on a console level. But if you wanna host it yourself, you are welcome to fork it, change it up, and use it yourself. In it, I'll assume you are using Ubuntu Server 26.04, and screen.

- ### Step 1: Installing libraries
    This is a discord.js application, so to run it, you'll need to install node.js, and npm packages.
    ```
    sudo apt update
    sudo apt ugrade
    sudo apt install screen nodejs npm screen
    ```
    After, you can check if they installed correctly:
    ```
    node -v
    npm -v 
    screen -v
    ```
    Once npm is installed, in the root directory of the bot, you install the following packages:
    ```
    npm install dotenv discord.js
    ```
- ### Step 2: Setup
    First, you are gonna need a discord bot token from [Discord Developer Portal](https://discord.com/developers/home). Then, you create a .env file, and add the following variables:
    ```
    TOKEN = 
    VCHANNEL = 
    REGROLE = 
    OWNERID =
    ```
    where: 
    - ```TOKEN``` is your bot token, 
    - `VCHANNEL` is the ID of the channel you want the bot to send the verifaction message to, 
    - `REGROLE` is the ID of the role which it gives to players,
    -  and `OWNERID` is your/the owner's userID
- ### Step 3: Running it
    First, you start the Minecraft server in a screen instance
    
    ```
    screen -R minecraft
    (Then you start the server, and exit with Ctrl+A, Ctrl+D)
    ```
    In another screen, you start the bot
    ```
    screen -R bot
    node main.js
    Ctrl+A Ctrl+D
    ```
#
If you have any problems, either open an issue, or contact me on Slack (Dani, with Shingo as pfp)