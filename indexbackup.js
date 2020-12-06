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
          .reply(message.from, `*[BOT] ${content}`, message.id)
          .then(() => {
            console.log(`${message.sender.pushname}:`, message.body);
          })
          .catch((erro) => {
            console.error('Erro ao enviar mensagem: ', erro);
          });
    };

    // Help menssage
    if (message.body === '!help') {
      client
          .sendText(`${message.from}`,
              '*[BOT]* \n Para criar uma figurinha digite *!sticker* \n Para criar um GIF digite *!gif*',
          )
          .then(() => {
            console.log(`${message.sender.pushname}:`, message.body);
          })
          .catch((erro) => {
            console.error('Erro ao enviar mensagem: ', erro);
          });
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
            .then((result) => {
              console.log('Result: ', result);
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
        if (err) throw err;
      });

      // Salvando o video
      fs.writeFile(videoFile, buffer, (err) => {
        if (err) throw err;
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
      customMessage('Renan é o caralho.*');
    }

    if (message.body === 'Fefah') {
      customMessage('Fefah é muito apetitosa, loirinha perfeita.*');
    }

    if (message.body === 'QI') {
      client
        .sendText(`${message.from}`, '*[BOT] Seu QI de Leo do caralho.*')
        .then(() => {
          console.log(`${message.sender.pushname}:`, message.body);
        })
        .catch((erro) => {
          console.error('Erro ao enviar mensagem: ', erro);
        });
    }

    if (message.body === 'qi') {
      client
        .sendText(`${message.from}`, '*[BOT] Seu QI de Leo do caralho.*')
        .then(() => {
          console.log(`${message.sender.pushname}:`, message.body);
        })
        .catch((erro) => {
          console.error('Erro ao enviar mensagem: ', erro);
        });
    }

    if (message.body === 'Qi') {
      client
        .sendText(`${message.from}`, '*[BOT] Seu QI de Leo do caralho.*')
        .then(() => {
          console.log(`${message.sender.pushname}:`, message.body);
        })
        .catch((erro) => {
          console.error('Erro ao enviar mensagem: ', erro);
        });
    }

    if (message.body === 'Léo' || message.body === 'Leo') {
      customMessage('Leo é o gordo todo fodido do grupo, ele é tão gordo que o DDD muda, quando ele troca o celular de bolso.*');
    }

    if (message.body === 'Leozita') {
      customMessage('Leozita é minha gordinha gostosa.*');
    }

    if (message.body === 'Jeff') {
      customMessage('Jeff é a nordestina safada do grupo.*');
    }

    if (message.body === 'Rodrigo' || message.body === 'Rodriguinha') {
      customMessage('Rodriguinha é a gótica do cuzão apetitoso.*');
    }

    if (message.body === 'Rafael') {
      customMessage('Rafael é pai de pet.*');
    }

    if (message.body === 'Augusto') {
      customMessage('Augusto foi encontrado chorando no banho :(*');
    }

    if (message.body === 'Marcos') {
      customMessage('Marcos está ocupado fazendo beats, tutututs*');
    }

    if (message.body === 'Ryan') {
      customMessage('O painel tá 200 reais, ou uma caixa de brahma.*');
    }

    if (message.body === 'Lipe') {
      customMessage('Lipe já comeu a própria irmã e fez meinha com Jhonny.*');
    }

    if (message.body === 'Jhonny') {
      customMessage('Jhonny é conhecido como ex-amor de Lipe <3*');
    }

    if (message.body === 'Kross') {
      customMessage('Kross está ocupado jogando GTA RP e fazendo websexo com traveco.*');
    }

    if (message.body === 'Vitor') {
      customMessage('Vitor é conhecido como mijão.*');
    }


  });
}
