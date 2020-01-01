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
router.get('/:objId/webinarRegistration', (req,res) => {
    console.log(res.body);
    res.status(200);
    // let email = req.body.email;
    // let personData;
    // Webinar.findOne({_id: req.params.objId})
    //         .then((webinar) => {

    //              //date and time sent for the calendar event should of the format 
    //             // new Date("12 October 2019 17:00")
    //             webinar.startTime=new Date(webinar.eventDate+" "+webinar.startTime)
    //             webinar.endTime=new Date(webinar.eventDate+" "+webinar.endTime)

    //              personData = {
    //                  'webinarData':webinar,
    //                  'email': email
    //              }
    //         })
    //         .catch((err) => {
    //             console.log('cant get the data for reg. error = ', err);
    //             res.json({'save': false, 'found': false})
    //         })    

    // EmailId.findOne({'email': email})
    //         .then((check) => {
    //             if(check){
    //                 // email already in dump
                                       
    //                 personData['verified'] = true;
    //                 // NAVYAA -> send mail without email verification link. Take personData as argument
    //                 mailMany(personData);

    //                 // adding email to email-webinar collection as email is already verified
    //                 EmailWebinar.findOne({'email': email})
    //                             .then((check2)=>{
    //                                 if(!check2){                            // saving only unique registrations for a given webinar
    //                                     new EmailWebinar({
    //                                         'email': email,
    //                                         'webinarId': req.params.objId
    //                                     }).save()
    //                                         .then((data)=>{
    //                                             console.log(data)
    //                                             res.json({'save': true, 'found': true});
    //                                         })
    //                                         .catch((err)=>{
    //                                             console.log(err)
    //                                             res.json({'save': false, 'found': true});
    //                                         })
    //                                 }
    //                                 else{                                  // when user has already registered for the webinar
    //                                     res.json({'save': true, 'found': true});
    //                                 }
    //                             })
    //                             .catch((err)=>{
    //                                 console.log('error while searching');
    //                                 res.json({'save': false, 'found': true})
    //                             })

    //             }else{
    //                 //email is not verfied yet
    //                 // add email to staging collection for verification
    //                 new StagedEmail({
    //                     'email': email,
    //                     'webinarId': req.params.objId
    //                 }).save()
    //                     .then((data)=>{
    //                         let verificationLink = `http://localhost:3000/webinarRegistration/${data['_id']}/verifiy`

    //                         personData['verified'] = false;
    //                         personData['verificationLink'] = verificationLink;
    //                         // NAVYAA -> send mail with email verification link. Take personData as argument
    //                         mailMany(personData);

    //                         console.log(data);
    //                         res.json({'save': true, 'found': false});
    //                     })
    //                     .catch((err)=>{
    //                         console.log(err);
    //                         res.json({'save': false, 'found': false});
    //                     })
    //             }
    //         })
    //         .catch((err)=>{
    //             console.log(err);
    //             res.json({'save': false, 'found': false});
    //         })
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