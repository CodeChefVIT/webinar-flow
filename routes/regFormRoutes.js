let router = require('express').Router({mergeParams: true});

const   Webinar       = require('../models/webinarListModel'),
        StagedEmail   = require('../models/stagedemailModel'),
        EmailId       = require('../models/emailIdsListModel'),
        EmailWebinar  = require('../models/emailsWebinarModel');

// sending webinar data
router.get('/:objId/webinarRegistration', (req,res) => {
    Webinar.findOne({_id: req.params.objId})
            .then((webinar) => {
                res.json({'found': true, 'data': webinar});
            })
            .catch((err) => {
                console.log('cant get the data for reg. error = ', err);
                res.json({'found': false});
            })
})

// receiving email from user
router.post('/:objId/webinarRegistration', (req,res) => {
    let email = req.body.email;
    let personData;
    Webinar.findOne({_id: req.params.objId})
            .then((webinar) => {
                 personData = {
                     'webinarData':webinar,
                     'email': email
                 }
            })
            .catch((err) => {
                console.log('cant get the data for reg. error = ', err);
                // res.json({'found': false});
            })    

    EmailId.findOne({'email': email})
            .then((check) => {
                if(check){
                    // email already in dump
                                       
                    personData['verified'] = true;
                    // NAVYAA -> send mail without email verification link. Take personData as argument
                    mailMany(personData);

                    // adding email to email-webinar collection as email is already verified
                    new EmailWebinar({
                        'email': email,
                        'webinarId': req.params.objId
                    }).save()
                        .then((data)=>{
                            console.log(data)
                            res.json({'save': true, 'found': true});
                        })
                        .catch((err)=>{
                            console.log(err)
                            res.json({'save': false, 'found': true});
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
                            res.json({'save': true, 'found': false});
                        })
                        .catch((err)=>{
                            console.log(err);
                            res.json({'save': false, 'found': false});
                        })
                }
            })
            .catch((err)=>{
                console.log(err);
                res.json({'save': false, 'found': false});
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