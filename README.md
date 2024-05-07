# mineflayer-gpt
A mineflayer bot which acts as an assistant to all your minecraft queries powered by gpt 3.5.


# features
1. Admin Commands with an authentication to execute involving the owner's minecraft username along with their password.

📝 **Syntax:** `/tell your_bot_username admin_command your_admin_password`

➡️ **Stop Command:** Exits the script resulting in the bot disconnecting.

➡️ **Restart Command:** Restarts the bot resulting in the bot to rejoin.


2. The assistant to answer all your minecraft queries. Access it by prompting your question to the bot by either using `/msg` or /`tell`


# how to use?
1. Create a minecraft server if you don't have one and enable cracked in it. If you don't know how, [click here](https://shockbyte.com/billing/knowledgebase/70/Disable-Online-Mode-for-Your-Minecraft-Server-Allow-Cracked-Clients-to-Join.html)
2. Download this repo if you haven't already (an obvious step)
3. Also download [nodejs](https://nodejs.org/en/download)
4. Open index.js add your server's ip address and port, along with the bot's username and add your minecraft username along with any random password in the `ADMIN_USERNAME` and `ADMIN_PASSWORD` fields respectively. And just a side note do not tamper with the `API_URL` and `API_KEY` values they have already been set by me beforehand. If you want your own api key (although not sure why would you since it's already provided) you can contact me on my discord username: `nostorian`
5. run `npm install` and wait for all modules to install.
6. run `node index.js` and wait for the bot to join your server if you did all the steps correctly.

# bugs-and-suggestions
As I am not that yet advanced with node.js the script might have a few bugs and performance issues, although as of now the script seems to be working fine without any hassle, but if you catch any such noticeable bug or have an idea for improvement feel free to open an issue or PR respectively.
