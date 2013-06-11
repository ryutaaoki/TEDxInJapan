function formulaireContactEmail(e) {
  try {
    var recipient = "your@address.email";
    var timestamp = e.values[0];
    var email = e.values[1];
    var objet = e.values[2];
    var message = e.values[3]
    var body = ' <'+email+'> vous a envoyé le message : '+message;
    var bodyHTML1 = '<p>Le '+timestamp+', <a href="mailto:'+email+'">'+email+'</a> vous a envoyé : </p>';
    var bodyHTML2 = '<blockquote>'+message+'</blockquote>';
    var advancedArgs = {htmlBody:bodyHTML1+bodyHTML2 , replyTo:email};
    MailApp.sendEmail(recipient, objet, body, advancedArgs);
  } catch(e){
    MailApp.sendEmail(recipient, "Error - Formulaire de contact", e.message);
  }
}