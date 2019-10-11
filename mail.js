var nodemailer = require('nodemailer')
var fs=require('fs')

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
  

const mail=(mailTo,filename,subject)=>new Promise((resolve,reject)=>{
  var transporter=nodemailer.createTransport(options,null)

  var html=fs.readFileSync(filename)

  var mailOptions = {
    from:process.env.sender,
    to: mailTo,
    subject,
    html
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

const mailMany=(recipients,template,subject)=>{
  const array=[]
  for(const i of recipients)
  {
    array.push(mail(i,template,subject))
  }
  return Promise.all(array)
}

module.exports=mailMany