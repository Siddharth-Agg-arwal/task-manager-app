const brevo = require('@getbrevo/brevo');
let apiInstance = new brevo.TransactionalEmailsApi();

let apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = process.env.GET_BREVO_API_KEY;

// sendSmtpEmail.subject = "My {{params.subject}}";
// sendSmtpEmail.htmlContent = "<html><body><h1>Common: This is my first transactional email {{params.parameter}}</h1></body></html>";
// sendSmtpEmail.sender = { "name": "John", "email": "aggarwal.siddharth2003@gmail.com" };
// sendSmtpEmail.to = [
//   { "email": "saggarwal_be22@thapar.edu", "name": "supadhyay" }
// ];  

// apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
//   console.log('API called successfully. Returned data: ' + JSON.stringify(data));
// }, function (error) {
//   console.error(error);
// });

const sendWelcomeMail = (email, name) => {
    let sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = "Welcome to the app!";
    sendSmtpEmail.sender = {"name" : "Siddharth", "email" : "aggarwal.siddharth2003@gmail.com"};
    sendSmtpEmail.to = [
        {"email" : email, "name" : name},
        // {"email" : "aggarwal.siddharth2003@gmail.com", "name": "therapist"}
    ];
    sendSmtpEmail.htmlContent = `<html><body><h3>Let's have a lot of fun and productive moments together, ${name}!</h3></body></html>`;

    apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    }, function (error) {
        console.error(error);
    });
}

const sendCancellationMail = (email, name) => {
    let sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = "Welcome to the app!";
    sendSmtpEmail.sender = {"name" : "Siddharth", "email" : "aggarwal.siddharth2003@gmail.com"};
    sendSmtpEmail.to = [
        {"email" : `${email}`, "name" : `${name}`}
    ];
    sendSmtpEmail.htmlContent = `<html><body><h3>We are very sorry to lose you ${name}. Do let us know how we could have provided a better service.</h3></body></html>`;

    apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    }, function (error) {
        console.error(error);
    });

}

module.exports = {
    sendWelcomeMail, sendCancellationMail
}
