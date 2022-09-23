const {
	default: makeWASocket,
	useSingleFileAuthState,
	DisconnectReason,
	getContentType ,
	jidDecode
} = require('@adiwajshing/baileys')


const config = require('./config');


const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep } = require('./lib/functions')
const fs = require('fs');
const ownerNumber = ['94701629707']
const prefix = '/'

async function cmd(conn , mek ) {

try {
  
mek = mek.messages[0]
			if (!mek.message) return
			
			mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
			if (mek.key && mek.key.remoteJid === 'status@broadcast') return
			if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
			const type = getContentType(mek.message)
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			
			const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
			const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : ( type == 'listResponseMessage') && mek.message.listResponseMessage.singleSelectReply.selectedRowId? mek.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && mek.message.buttonsResponseMessage.selectedButtonId  ? mek.message.buttonsResponseMessage.selectedButtonId  : (type == "templateButtonReplyMessage") && mek.message.templateButtonReplyMessage.selectedId ? mek.message.templateButtonReplyMessage.selectedId  :  (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
			
			const isCmd = body.startsWith(prefix)
			const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
			
			const args = body.trim().split(/ +/).slice(1)
			const q = args.join(' ')
			const isGroup = from.endsWith('@g.us')
			const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
			const senderNumber = sender.split('@')[0]
			const botNumber = conn.user.id.split(':')[0]
			const pushname = mek.pushName || 'unknown'
			
			const isMe = botNumber.includes(senderNumber)
			const isOwner = ownerNumber.includes(senderNumber) || isMe
      
      
      switch (command) {
      
		    // alive //  
		      
      case 'alive': {
		conn.sendMessage(from , { text: 'I am Online Now' }, { quoted: mek } )
         } 
        break
		           

      }

}catch(e) {
const isError = String(e)
console.log( isError )
}


}

module.exports = cmd
	
