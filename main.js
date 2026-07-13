require("dotenv").config();
const {exec} = require("child_process");
const { Client, Events, GatewayIntentBits, BaseChannel, TextChannel, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, LabelBuilder, TextInputBuilder, TextInputStyle, MessageFlags } = require('discord.js');
const client = new Client({intents:[GatewayIntentBits.Guilds]});

client.once(Events.ClientReady, (clientready) => {
    console.log(`Logged in as ${clientready.user.tag}`);
    client.channels.fetch(process.env.VCHANNEL).then(channel =>{
        channel.messages.fetch()
        .then(messages => {
            if(messages.first().author.displayName != "MCVerifier"){
                const verifyEmbed = new EmbedBuilder()
                    .setColor("Green")
                    .setTitle("Fehérlist-whitelist")
                    .setAuthor({name:"MCVerifier", iconURL: client.user.avatarURL()})
                    .setDescription("Az alábbi gombbal a szerver whitelist-jére felkerül a neved amit megadsz. \n \n For reviewers: With the button below, you can provide your username on minecraft, and it will be added to my whitelist, but will be removed after done testing");
                const wlButton = new ButtonBuilder().setCustomId("wlr").setLabel("Fehérlista-whitelist").setStyle(ButtonStyle.Success);
                const wlRow = new ActionRowBuilder().addComponents(wlButton);
                channel.send({embeds: [verifyEmbed], components: [wlRow]});
            }
        })
        .catch(console.error);
    });
});

client.on(Events.InteractionCreate, async (interact) =>{
    if(interact.isButton()){
        const rRole = interact.guild.roles.cache.find(roles => roles.id == process.env.REGROLE);
        if(interact.member.roles.cache.some(role => role == rRole)){
            await interact.reply({content: "Már felkerültél a fehérlistára. Ha valami probléma van, keresd fel" + ` <@${process.env.OWNERID}>-t.`, flags: MessageFlags.Ephemeral});
            return;
        }
        const wlModal = new ModalBuilder().setCustomId("wlModal").setTitle("Fehérlista-whitlist");
        const wlInput = new TextInputBuilder()
            .setCustomId("wlInput")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("Pl: DDani6");
        const nameLabel = new LabelBuilder()
            .setLabel("Minecraft player név")
            .setTextInputComponent(wlInput);
        wlModal.addLabelComponents(nameLabel);
        await interact.showModal(wlModal);
        interact.member.roles.add(rRole);
    }
    if (interact.isModalSubmit()){
        const mcName = interact.fields.getTextInputValue("wlInput");
        const confEmbed = new EmbedBuilder()
            .setColor("Green")
            .setTitle("Fehérlist-whitelist")
            .setAuthor({name:"MCVerifier", iconURL: client.user.avatarURL()})
            .setDescription("Ez a jóváhagyó üzenet, hogy a " + `${mcName} nevű fiókot feladtuk a fehérlistára. Biztonsági okok miatt, a többi csatorna más rang mögött van, azzal <@${process.env.OWNERID}>-t keresd meg, és szólj neki, hogy ki vagy.` + `\n \n For reviewers: This is the end of the line for your testing. For obvious reasons, I won't let y'all up on my friends' smp. I will remove your ${mcName} profile from records afterwards.`);
        interact.user.send({embeds: [confEmbed]});
        interact.reply({content: "A továbbiak a privát üzenetek (DM) közt.", flags: MessageFlags.Ephemeral});

        //This is if you use screen. If you want to host this bot for yourself, and use something else, change it. The README gives instructions on how to use screen.
        exec(`screen -S minecraft -X stuff "whitelist add ${mcName}\n"`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
        });
    }
});
client.login(process.env.TOKEN);