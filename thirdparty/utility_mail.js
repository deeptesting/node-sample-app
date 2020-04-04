const config = require('config');
const sgMail = require('@sendgrid/mail');



const SEND_GRID_APIKEY = config.get('SEND_GRID_APIKEY');
sgMail.setApiKey(SEND_GRID_APIKEY);



module.exports.SendMail =  function (To,Subject,MailBody) { 
    const msg = {
        to: To,
        from: 'deepjyotyroy@gmail.com',
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

