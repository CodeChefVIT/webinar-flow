var nodemailer = require('nodemailer')
var webinar=require('./models/emailIdsListModel')
var send=[]

webinar.find({}).then((emails)=>{
  send=emails
})

const options={
        pool:true,
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.email,
            pass:process.env.password
        }
    }

    var transporter=nodemailer.createTransport(options,null)
      
      var mailOptions = {
        from: 'senders email',
        to: send,
        subject: 'testing',
        text: 'your message',
        attachments:[
          {
            filename:'filename of attachment',
            path:'path for attachment'
          }
        ]
      };
      transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
