const config = require('config');
const sgMail = require('@sendgrid/mail');



const SEND_GRID_APIKEY = config.get('SEND_GRID_APIKEY');
const SEND_GRID_FROM_EMAIL = config.get('SEND_GRID_FROM_EMAIL');
const SEND_GRID_CC_EMAIL = config.get('SEND_GRID_CC_EMAIL');

sgMail.setApiKey(SEND_GRID_APIKEY);



module.exports.SendMail =  function (To,Subject,MailBody) { 
    const msg = {
        to: To,
        from: SEND_GRID_FROM_EMAIL,
        cc:SEND_GRID_CC_EMAIL,
        subject: Subject,
        html: MailBody,
      };
  
      sgMail.send(msg).then(() => {
        }, error => {
                console.error(error);
                if (error.response) {
                    console.error(error.response.body)
                }
        });

}

