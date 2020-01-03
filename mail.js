var ical = require('ical-generator')
var nodemailer = require('nodemailer')
var fs=require('fs')
var cal=ical()

var path=undefined

// replace the username and password by sender's email and password where ever mentioned as process.env.username and process.env.password

const options={
        pool:true,
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user: process.env.username,
            pass:process.env.password
        }
    }
  

const mail=(mailTo,subject,desc)=>new Promise((resolve,reject)=>{
  var transporter=nodemailer.createTransport(options,null)
  
  var mailOptions = {
    from: process.env.username,
    to: mailTo,
    subject,
    text: desc ,
    attachments:[{
        filename:'invite.ics',
        path:path
    }]
  }

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      reject(error)
    } else {
      console.log('Email sent: ' + info.response);
      resolve(info)
    }
  })
})


const mailMany=(send)=>{

  if(send.verified==false)
  {
    send.webinarData.description=send.webinarData.description + ". Verify your email using the following link " + send.verificationLink
  }

  var eventObj = {
    start : send.webinarData.startTime,
    end : send.webinarData.endTime,
    title : send.webinarData.name,
    description : send.webinarData.description,
    id : 'wdcwe76234e127eugb', //Some unique identifier
    organiser : {name : 'CODECHEF-VIT', email:process.env.username}
  }
  cal.createEvent({
    start: eventObj.start,
    end: eventObj.end,
    summary: eventObj.title,
    uid: eventObj.id, // Some unique identifier
    sequence: 0,
    description: eventObj.description,
    organizer: {
      name: eventObj.organiser.name,
      email: eventObj.organiser.email
},
    method: 'request'
  });

  //uploads folder has already been made to save invite.ics files to send invites
  path = __dirname + '/uploads/'+ 'invite' + '.ics';
  cal.saveSync(path);

  mail(send.email,send.webinarData.name,send.webinarData.description)
}
module.exports=mailMany
