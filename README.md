# **Discord Bot - Server Nuker**  

This Discord bot script is designed to **delete all channels, ban members, remove admin roles, and delete roles** when a specific command is executed.  

## **🚀 Features**  

- Deletes all channels except a temporary one.  
- Bans all non-bot members except the server owner.  
- Removes admin roles from members before banning them.  
- Deletes all roles except essential ones.  
- Sends a final message in the temporary channel confirming completion.  

---

## **📦 Requirements**  

- **Node.js** (latest LTS recommended)  
- **Discord.js v14+**  

### **Install Dependencies**  

```sh
npm install discord.js
```

---

## **🛠 Setup & Usage**  

1. **Clone the Repository**  

   ```sh
   git clone (https://github.com/sk1dk/Discord-Cleaner)
   cd Discord-Cleaner
   ```

2. **Add Your Bot Token**  
   Open the script file and replace `TOKEN` with your bot token.  

3. **Run the Bot**  

   ```sh
   node main.js
   ```

4. **Use the Command**  
   - Type `!clear` in any channel (requires Admin permissions).  
   - The bot will **delete channels, ban members, and remove roles**.  
   - A temporary channel will be created for confirmation.  

---

## **📂 Folder Structure**  

```
repository-name/
│-- bot.js          # Main script
│-- README.md       # Documentation
│-- package.json    # Dependencies
│-- node_modules/   # Installed modules
```

---

## **📜 Breakdown**  

1. **Bot Initialization**  
   - Logs in using a **bot token**.  
   - Listens for messages starting with `!`.  

2. **Command Handling** (`!clear`)  
   - **Checks for Admin permissions** before executing.  

3. **Channel & Role Management**  
   - **Creates a temporary channel** before deleting others.  
   - **Deletes all channels** except the new one.  
   - **Removes admin roles** before banning users.  
   - **Deletes roles** except essential ones.  

4. **User Management**  
   - **Fetches all members and bans them**, excluding the owner.  

5. **Completion Message**  
   - Sends a confirmation message in the **temporary channel**.  

---

## **🔒 Disclaimer**  
This bot can **permanently damage a server**. Use at your **own risk**.  

---
