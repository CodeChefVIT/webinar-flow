let router = require('express').Router({mergeParams: true});

const   Webinar       = require('../models/webinarListModel'),
        StagedEmail   = require('../models/stagedemailModel'),
        EmailId       = require('../models/emailIdsListModel'),
        EmailWebinar  = require('../models/emailsWebinarModel');
        mailMany = require('../mail')
        
// // sending webinar data
// router.get('/:objId/webinarRegistration', (req,res) => {
//     Webinar.findOne({_id: req.params.objId})
//             .then((webinar) => {
//                 res.json({'found': true, 'data': webinar});
//             })
//             .catch((err) => {
//                 console.log('cant get the data for reg. error = ', err);
//                 res.json({'found': false});
//             })
// })

/*
personData ={
    webinarData: data of webinar(obj),
    email: email of user(string),
    verified: true if email already in db else false(boolean),
    verificationLink: attach link to email if email is not verified(string)
}
*/

// receiving email from user
router.post('/:objId/webinarRegistration', (req,res) => {
    console.log(req.body.form_response.answers[0].email);
    
    let email = req.body.form_response.answers[0].email;
    Webinar.findOne({_id: req.params.objId})
    .then((webinar) => {

        //date and time sent for the calendar event should of the format: new Date("12 October 2019 17:00")
        webinar.startTime=new Date(webinar.eventDate+" "+webinar.startTime)
        webinar.endTime=new Date(webinar.eventDate+" "+webinar.endTime)

        let personData = {'webinarData':webinar, 'email': email}  // data to be sent in email

        EmailId.findOne({'email': email})
        .then((check) => {
            if(check){
                // email already in verified email list
                                
                personData['verified'] = true;
                // NAVYAA -> send mail without email verification link. Take personData as argument
                mailMany(personData);

                // adding email to email-webinar collection as email is already verified
                EmailWebinar.findOne({'email': email})
                .then((check2)=>{
                    if(!check2){                            // saving only unique registrations for a given webinar
                        new EmailWebinar({'email': email, 'webinarId': req.params.objId})
                            .save()
                            .then((data)=>{
                                console.log(data)
                                res.sendStatus(200);
                            })
                            .catch((err)=>{
                                console.log(err)
                                res.sendStatus(400);
                            })
                    }
                    else{                                  // when user has already registered for the webinar
                        res.sendStatus(200);
                    }
                })
                .catch((err)=>{
                    console.log('error while searching');
                    res.sendStatus(400)
                })
            }else{
                //email is not verfied yet
                // add email to staging collection for verification
                new StagedEmail({
                    'email': email,
                    'webinarId': req.params.objId
                }).save()
                    .then((data)=>{
                        let verificationLink = `http://localhost:3000/webinarRegistration/${data['_id']}/verifiy`

                        personData['verified'] = false;
                        personData['verificationLink'] = verificationLink;
                        // NAVYAA -> send mail with email verification link. Take personData as argument
                        mailMany(personData);

                        console.log(data);
                        res.sendStatus(200);
                    })
                    .catch((err)=>{
                        console.log(err);
                        res.sendStatus(400);
                    })
            }
        })
        .catch((err)=>{
            console.log(err);
            res.sendStatus(400);
        })
    })
    .catch((err) => {
        console.log('cant get the data for reg. error = ', err);
        res.sendStatus(400);
    })    
})

// verification of email
router.get('/webinarRegistration/:objId/verify', (req,res) => {
    let linkobjId = req.params.objId;

    // checking in staging collection
    StagedEmail.findByIdAndDelete(linkobjId)
                .then((data) => {
                    if(data){
                          // adding to email-webinar collection
                        new EmailWebinar({
                            'email' : data['email'],
                            'webinarId': data['webinarId']
                        })  .save()
                            .then((data) => {                                
                                console.log(data);
                            })
                            .catch((err) => console.log(err))
                    
                        new EmailId({
                            'email': data['email']
                            })  .save()
                                .then((data) => {
                                    console.log(data);
                                })
                                .catch((err)=>console.log(err))
                        
                        res.json({'verified': true});

                    }
                    else{
                        res.json({'verified': false});
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.json({'verified': false});
                })
})

module.exports = router;