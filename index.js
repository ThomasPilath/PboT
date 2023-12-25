// Importation des dépendances
const { Client, Events, Partials, getMessages } =  require("discord.js");

// Création du client Discord
const client = new Client({
    intents: [65307],
    partials: [
        Partials.Message,
        Partials.Reaction
    ]
});

// import et configuration du .env
const dotenv = require("dotenv");
dotenv.config();
// Récupération du token
const token = process.env.TOKEN;

// On préviens que le bot est pret
client.on("ready", () => {
    console.log(`${client.user.tag} ready!`);
    // Paramétres affiché du bot
    client.user.setPresence({
        // Activité 'joue a'
        activities: [{
            name: "bidouiller le discord"
        }],
        // Status du bot
        status: "dnd"
    });
});

// SCRIPT
// Déclaration du préfix d'une commande
const PREFIX = "/!";

// Répondre a un message command
client.on("messageCreate", (message) => {
    if(message.content.startsWith(PREFIX)) {

    // Réagir au message
    // retire le prefix et entre chaque mot du contenu dans un tableau
        //splice: enleve le préfix / trim: enleve les espaces au début et a la fin / split: supprime les espaces entre les mots
        const input = message.content.slice(PREFIX.length).trim().split(" "); 
    // Sort le premier mot du tableau (enregistre le nom de la commande)
        const command = input.shift();
    // Enregistre le reste du message a part
        const content = "```" + " " + message.content.slice(PREFIX.length).slice(command.length + 1) + " " + "```";
        let channelLog = message.guild.channels.cache.get("1147165731235045497");
        if (command === "aide") {
            channelLog.send(`La commande ${command} a été envoyé par ${message.author.username} et contient : ${content} `);
        }

    // Répondre a une commande
        switch(command) {
        // Définition du text exacte de la command(ici 'aide')
            case "aide":
            // Définition du message envoyé en retour
                message.channel.send("Je vous envoie de l'aide!")
                // Mise en place d'une suppression du message command
                    .then(() => {
                        message.delete();
                    })
                    .catch(console.log);
            break;

        // Clear des messages du channel
            case "clear":
            // Récupération du channel id
                const channel = message.channelId
                const messages = getMessages(channel)
                console.log(messages)
            break

        // Définition du text exacte de la command(ici 'hello')
            case "hello":
            // Définition du message envoyé en retour
                message.channel.send("Bonjour!");
            break;

        // Mise en place d'une réponse direct au message command si le nom de commande n'est pas listé dans switch
            default:
                message.reply("Cette commande n'existe pas.");
        }
    }
});

// Réponse aux réaction
client.on("messageReactionAdd", async (reaction) => {
// Si l'autheur du message qui a la réaction définit, alors supprime le message
//! Le contexte / la gestion d'instance du bot ne permet pas de supprimer des messages généré avant un reboot ou autre.
    if (reaction.message.author !== null && reaction.message.author.username === "PboT" && reaction.emoji.name === "👌") {
        reaction.message.delete();
        let channelLog = reaction.message.guild.channels.cache.get("1147165731235045497");
        if (reaction.message.content !== null) {
            console.log(reaction.message)
            const message = "```" + " " + reaction.message.content + " " + "```"
            channelLog.send(`Le message du bot a été validé et supprimé. Message :` + message);
        } else {
            channelLog.send(`Le message du bot a été validé et supprimé.`);
        }
    }
});

// Connexion du bot avec sont token
client.login(token);