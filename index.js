/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const venom = require('venom-bot');
const fs = require('fs');
const mime = require('mime-types');
const ffmpeg = require('fluent-ffmpeg');

venom
    .create()
    .then((client) => start(client));

async function start(client) {
  client.onMessage(async (message) => {
    // Mensagens personalizadas layout
    const customMessage = (content) => {
      client
          .reply(message.from, `*[BOT] ${content}*`, message.id)
          .then(() => {
            console.log(`${message.sender.pushname}:`, message.body);
          })
          .catch((erro) => {
            console.error('Erro ao enviar mensagem: ', erro);
          });
    };

    // Audio messages layout
    const audioMessage = (nome, extension, reply) => {
      if (message.body === `#${nome}`) {
        client.sendFile(
            message.chatId,
            `./files/audios/${nome}.${extension}`,
            `${nome}`,
        ).then(() => {
          if (reply) customMessage('Pronto aew, vagabunda.');
          console.log(`${message.sender.pushname}:`, `Audio ${nome}`);
        }).catch((err) => {
          console.error('AudioMessage_ERROR: ', err);
        });
      }
    };

    // Help menssage
    if (message.body === '!help') {
      customMessage('[HELP] 🦅* \n\nPara criar uma figurinha, digite *!sticker.* \n \nPara criar um GIF, digite *!gif.* \n\nPara enviar áudios de zoação do grupo, use o *"#".* \n\nPara consultar os áudios, digite *!comandos.');
    }

    if (message.body === '!comandos') {
        customMessage('[COMANDOS] 🦅* \n *#caralhow - Caralhoooow pqp!* \n *#dados - Dados Pessoaix* \n *#desafiando - Tá desafiando?* \n *#eunaovi - Eu não vi, merda!* \n *#irmandade - Eu quero que se foda...* \n *#jeffgemendo - Jeff gemendo.* \n *#jhonny - Lipe e Jhonny* \n *#lipegay - Lipe Gay* \n *#mijao - Mijou sim!!* \n *#painel - Painel* \n *#qidejeff - Qi de Nordestino (Jeff)* \n *#qideleo - Qi de Leo* \n *#real - É real isso dai.* \n *#renanculpado - Renan culpado.* \n *#risada - Risada* \n *#rodriguinha - Palhaço Cacetão - Historia da Rodriguinha* \n *#superior - Quer tentar sair como superior?* \n *#tafudido - Tá fudido!* \n *#lipetrauma - Trauma do Lipe* \n *#yesbaby - Yes baby, thank you.* \n *#aline - Aline, por favor...* \n *#eliasorando - Elias orando.* \n *#poderoso - Esse filha da puta...* \n *#eliasgolpe - Elias golpe.* \n *#tranquilo - Tranquilaço.* \n *#skidedasong - Ski Deda Soundtrack* \n *#skidedasong2 - Ski Deda Soundtrack 2');
      }

    // Image sticker
    if (message.type === 'image') {
      if (message.caption === '!sticker') {
        const buffer = await client.decryptFile(message);
        const fileName = `./files/img-sticker_${message.sender.pushname}+${message.sender.id}.${mime.extension(message.mimetype)}`;
        await fs.writeFile(fileName, buffer, (err) => {
          if (err) throw err;
          client
              .sendImageAsSticker(message.chatId, fileName)
              .then(() => {
                console.log(`${message.sender.pushname}:`, 'image');
              });
        });
      }
    }

    // Gif sticker
    if (message.caption === '!gif') {
      const buffer = await client.decryptFile(message);

      const videoFile = `./files/img-gif-sticker_${message.sender.pushname}+${message.sender.id}.${mime.extension(message.mimetype)}`;
      const gifFile = `./files/img-gif-sticker_tmp_${message.sender.pushname}+${message.sender.id}.${mime.extension('image/gif')}`;

      // Verificando se existe arquivos antigos e removendo-os
      if (fs.existsSync(videoFile)) {
        try {
          fs.unlinkSync(videoFile);
        } catch (err) {
          console.log('WARNING: unlinkSync', err);
        }
      }
      if (fs.existsSync(gifFile)) {
        try {
          fs.unlinkSync(gifFile);
        } catch (err) {
          console.log('WARNING: unlinkSync', err);
        }
      }

      // Enviando gifsticker
      const messageSend = () => {
        client
            .sendImageAsStickerGif(message.chatId, gifFile)
            .then(() => {
              console.log('Result: ', 'Gifsticker');
            }).catch((err) => {
              console.log('saveVideo_INSIDE_FUNCTION_ERROR: ', err);
              customMessage('Erro ao criar sticker. Manda um gif curto, MACACO!');
            });
      };

      // Convertendo o video(input) para gif(output)
      const convert = (input, output) => {
        ffmpeg(input)
            .output(output)
            .size('256x256')
            .run();
      };

      // Salvando o gif
      await fs.writeFileSync(gifFile, buffer, (err) => {
        if (err) console.log('saveGif_INSIDE_FUNCTION_ERROR: ', err);
      });

      // Salvando o video
      fs.writeFile(videoFile, buffer, (err) => {
        if (err) console.log('saveVideo_INSIDE_FUNCTION_ERROR: ', err);
        try {
          convert(videoFile, gifFile);
        } catch (err) {
          console.log('convert_TRY_INSIDE_FUNCTION_ERROR: ', err);
        }
        setTimeout(messageSend, 500);
      });
    }

    // Mensagens personalizadas
    if (message.body === 'Renan') {
        customMessage('Renan é o caralho.');
      }
  
      if (message.body === 'Fefah') {
        customMessage('Fefah é muito apetitosa, loirinha perfeita.');
      }
  
      if (message.body === 'QI') {
        client
          .sendText(`${message.from}`, '*[BOT] Seu QI de Leo do caralho.')
          .then(() => {
            console.log(`${message.sender.pushname}:`, message.body);
          })
          .catch((erro) => {
            console.error('Erro ao enviar mensagem: ', erro);
          });
      }
  
      if (message.body === 'qi') {
        client
          .sendText(`${message.from}`, '*[BOT] Seu QI de Leo do caralho.')
          .then(() => {
            console.log(`${message.sender.pushname}:`, message.body);
          })
          .catch((erro) => {
            console.error('Erro ao enviar mensagem: ', erro);
          });
      }
  
      if (message.body === 'Qi') {
        client
          .sendText(`${message.from}`, '*[BOT] Seu QI de Leo do caralho.')
          .then(() => {
            console.log(`${message.sender.pushname}:`, message.body);
          })
          .catch((erro) => {
            console.error('Erro ao enviar mensagem: ', erro);
          });
      }
  
      if (message.body === 'Léo' || message.body === 'Leo') {
        customMessage('Leo é o gordo todo fodido do grupo, ele é tão gordo que o DDD muda, quando ele troca o celular de bolso.');
      }
  
      if (message.body === 'Leozita') {
        customMessage('Leozita é minha gordinha gostosa.');
      }
  
      if (message.body === 'Jeff') {
        customMessage('Jeff é a nordestina safada do grupo.');
      }
  
      if (message.body === 'Rodrigo' || message.body === 'Rodriguinha') {
        customMessage('Rodriguinha é a gótica do cuzão apetitoso.');
      }
  
      if (message.body === 'Rafael') {
        customMessage('Rafael é pai de pet.*');
      }
  
      if (message.body === 'Augusto') {
        customMessage('Augusto foi encontrado chorando no banho :(');
      }
  
      if (message.body === 'Marcos') {
        customMessage('Marcos está ocupado fazendo beats, tutututs');
      }
  
      if (message.body === 'Ryan') {
        customMessage('O painel tá 200 reais, ou uma caixa de brahma.');
      }
  
      if (message.body === 'Lipe') {
        customMessage('Lipe já comeu a própria irmã e fez meinha com Jhonny.');
      }
  
      if (message.body === 'Jhonny') {
        customMessage('Jhonny é conhecido como ex-amor de Lipe <3');
      }
  
      if (message.body === 'Kross') {
        customMessage('Kross está ocupado jogando GTA RP e fazendo websexo com traveco.');
      }
  
      if (message.body === 'Vitor') {
        customMessage('Vitor é conhecido como mijão.');
      }

    // Audio messsages using #
    // 1. Nome do áudio
    // 2. Extensão do arquivo
    // 3. Resposta => Se for setado "true" o bot irá responder com uma mensagem, se for "false" ele não responderá
    audioMessage('caralhow', 'mp3', true);
    audioMessage('dados', 'mp3', true);
    audioMessage('desafiando', 'mp3', true);
    audioMessage('eunaovi', 'mp3', true);
    audioMessage('irmandade', 'mpeg', true);
    audioMessage('jeffgemendo', 'mpeg', true);
    audioMessage('jhonny', 'mp3', true);
    audioMessage('lipegay', 'mpeg', true);
    audioMessage('mijao', 'mpeg', true);
    audioMessage('painel', 'mpeg', true);
    audioMessage('qidejeff', 'mpeg', true);
    audioMessage('qideleo', 'mpeg', true);
    audioMessage('real', 'mp3', true);
    audioMessage('renanculpado', 'mpeg', true);
    audioMessage('risada', 'mp3', true);
    audioMessage('rodriguinha', 'mpeg', true);
    audioMessage('superior', 'mpeg', true);
    audioMessage('tafudido', 'mp3', true);
    audioMessage('lipetrauma', 'mp3', true);
    audioMessage('yesbaby', 'mp3', true);
    audioMessage('aline', 'mpeg', true);
    audioMessage('eliasorando', 'mpeg', true);
    audioMessage('poderoso', 'ogg', true);
    audioMessage('eliasgolpe', 'mpeg', true);
    audioMessage('tranquilo', 'ogg', true);
    audioMessage('skidedasong', 'mpeg', true);
    audioMessage('skidedasong2', 'mpeg', true);


    /*  Adminstration and security  */
    if (message.sender.id === `${'35998402227' || '21966944292'}@c.us`) {
      // Profile config
      if (message.isMedia === false) {
        if (message.body.substring(17) === `!setProfileStatus`) {
          await client.setProfileStatus(message.body.substring(18));
        }

        if (message.body.substring(15) === `!setProfileName`) {
          await client.setProfileName(message.body.substring(16));
        }
      }

      if (message.caption === `!setProfilePic`) {
        const buffer = await client.decryptFile(message);
        const profilePic = `./files/bot-profile-img-by${message.sender.pushname}+${message.sender.id}.${mime.extension(message.mimetype)}`;

        await fs.writeFile(profilePic, buffer, (err) => {
          if (err) console.log('profilePic_ERROR:', err);
          client.setProfilePic(profilePic);
        });
      }

      // Device security
      if (message.body === `!battery`) {
        await client.getBatteryLevel();
      }

      if (message.body === `!kill`) {
        await client.killServiceWorker();
      }

      if (message.body === `!restart`) {
        await client.restartService();
      }

      if (message.body === `!device`) {
        await client.getHostDevice();
      }

    }
  });
}
