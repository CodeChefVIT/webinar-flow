let router      = require('express').Router({mergeParams: true}),
    request     = require('request'),
    middleware  = require('../middleware')


const Webinar = require('../models/webinarListModel');

// list of past and upcoming webinars
router.get('/', middleware.checkToken, (req,res) => {
    Webinar.find({})
            .then((allWebinars) => {
                res.json({'success' : true, 'webinars': allWebinars});
            })
            .catch((err) => {
                console.log('cant get the data. error = ',err)
                res.json({'success' : false});
            });
})

/*
add new webinar
route: /home/webinar
method: post

request: 
{
    name: String,
    eventDate: String,
    startTime: String,
    endTime: String,
    tutor: String,
    description: String,
    videoLink: String,
}

response: 
    case1: both webinar details typeform url saved to db
    {
        save: true
        id: webinar._id
        typeformLink: String (url for webinar registration)
    }

    case2: only webinar details saved to db
    {   save : true, 
        id: webinar._id 
        typeformLink: null
    }

    case3: webinar details failed to save to db
    {
        save: false
    }

*/
router.post('/newWebinar', middleware.checkToken, (req,res) => {   
      
    new Webinar(req.body)
            .save()
            .then((webinar) =>{
                let data = {
                    "title": `Webinar Registration`,
                    "settings":{
                        "is_public": true
                    },
                    "welcome_screens":[
                        {
                            "title": `${webinar.name}`,
                            "properties": {
                              "description": `Register for ${webinar.name} Webinar\nOn: ${webinar.eventDate}`,
                              "show_button": true,
                              "button_text": "Register"
                            }
                        }
                    ],
                    "fields": [
                      {
                        "type": "email",
                        "title": "Email id",
                        "validations": {
                            "required": true
                        }
                      }
                    ]
                };
                let JSONdata = JSON.stringify(data);
                request({                                                       // creating typeform
                    method: "POST",
                    body: JSONdata,
                    url: `https://api.typeform.com/forms`,
                    headers:{
                        'Authorization': `Bearer ${process.env.typeformToken}`
                    },
                    rejectUnauthorized: false
                }, (err, newRes)=>{

                    if(err){                    // if fail to create create typeform
                        res.json({'save' : true, id: webinar._id, typeformLink: null});
                    }else{
                        let output = JSON.parse(newRes.body)
                        console.log(output._links.display);

                        Webinar.findOneAndUpdate({_id: webinar._id},{typeformLink: output._links.display},{new: true})
                        .then((webinar) => {
                            console.log('updated webinar with typeform link : ', webinar);
                            res.json({'save' : true, id: webinar._id, typeformLink: output._links.display});
                        })
                        .catch((err) => {
                            console.log('error while saving typeform url to db: ',err);
                            res.json({'save' : true, id: webinar._id, typeformLink: null});
                        })
                    }
                })
            })
            .catch((err) => {
                console.log(err)
                res.json({'save' : false})
            })   
})


router.get('/:objId/edit', middleware.checkToken, (req,res) => {
    Webinar.findOne({_id: req.params.objId})
            .then((webinar) => {
                res.json({'found': true, 'data': webinar});
            })
            .catch((err) => {
                console.log('error=', err, 'while finding ',req.params.objId);
                res.json({'found': false});
            })
})

/*
received edited data of webinar and making changes to db
route: /home/:objId/edit
method: put

request: 
{
    name: String,
    eventDate: String,
    startTime: String,
    endTime: String,
    tutor: String,
    description: String,
    videoLink: String,
}

response: 
    case1: both webinar details in db and typeform updated
    {
        edit: true,
        formUpdate: true
    }

    case2: webiar updated, typeform failed to update
    {   
        edit: true,
        formUpdate: false
    }

    case3: both webinar and typeform failed to update
    {
        edit: false,
        formUpdate: false
    }

*/
router.put('/:objId/edit', middleware.checkToken, (req,res) => {
  
    Webinar.findOneAndUpdate({_id: req.params.objId},{$set: req.body},{new: true})
            .then((webinar) => {
                console.log('updated webinar is : ', webinar);

                let data = {
                    "title": `Webinar Registration`,
                    "settings":{
                        "is_public": true
                    },
                    "welcome_screens":[
                        {
                            "title": `${webinar.name}`,
                            "properties": {
                              "description": `Register for ${webinar.name} Webinar\nOn: ${webinar.eventDate}`,
                              "show_button": true,
                              "button_text": "Register"
                            }
                        }
                    ],
                    "fields": [
                      {
                        "type": "email",
                        "title": "Email id",
                        "validations": {
                            "required": true
                        }
                      }
                    ]
                };
                let JSONdata = JSON.stringify(data);

                request({
                    method: "PUT",
                    body: JSONdata,
                    url: `https://api.typeform.com/forms/${webinar.typeformLink.slice(-6)}`,
                    headers:{
                        'Authorization': `Bearer ${process.env.typeformToken}`
                    },
                    rejectUnauthorized: false
                }, (err, newRes)=>{
                    if(err){
                        res.json({'edit' : true, 'formUpdate': false});
                    }else{
                        res.json({'edit' : true, 'formUpdate': true});
                    }
                })
            })
            .catch((err) => {
                console.log('error while updating db: ',err);
                res.json({'edit' : false, 'formUpdate': false});
            })
})


// delete a webinar
router.delete('/:objId/delete', middleware.checkToken, (req,res) => {
    Webinar.findOneAndDelete({_id: req.params.objId})
            .then((webinar) => {
                console.log('deleted webinar=', webinar);
                res.json({'delete' : true});
            })
            .catch((err) => {
                console.log('error while deleting: ', err);
                res.json({'delete' : false});
            })
})

module.exports = router;