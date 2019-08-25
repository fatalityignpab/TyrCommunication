const functions = require('firebase-functions');
const admin = require('firebase-admin');


admin.initializeApp();

const nodemailer = require('nodemailer');

const PDFDocument = require('pdfkit');

/* const doc = new PDFDocument;
const blobStream = require('blob-stream');
const stream = doc.pipe(blobStream()); */

const gmailEmail = 'pruebashbchatb@gmail.com';
const gmailPassword = 'h4b1lgeh';
//const serviceAccount = require("./ad-tyr-klnfuw-firebase-adminsdk-xb4q7-fd677373b0.json");

//V2 Enviar correo
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: gmailEmail, //Cuenta de la que se enviará el correo
    pass: gmailPassword
  }
});
/** 
const APP_NAME = 'AD-Tyr';
const PROJECT_ID = "ad-tyr-klnfuw";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${PROJECT_ID}.firebaseio.com`,
    storageBucket: `${PROJECT_ID}.appspot.com`
});
*/
var mailOptions = {
  from: 'Tyr <noreply@firebase.com>',
  to: 'ignaciopabloro2@gmail.com', 
  subject: 'Nuevo TYR'
};

//var config = {
  //  projectId: `${PROJECT_ID}`,
    //keyFilename: './ad-tyr-klnfuw-firebase-adminsdk-xb4q7-fd677373b0.json'
//};

//const {Storage} = require('@google-cloud/storage')(config);
//const {Datastore} = require('@google-cloud/datastore')(config);
//const storage = new Storage();

exports.enviarCorreoConReporte = functions.database.ref('/InformacionReporte/{IdEnviarReporte}') //Cuando se crea un nuevo registroPostulante se ejecuta el código
    .onCreate((snapshot, context) => {
/*         const myPdfFile = admin.storage().bucket().file('/test/Reporte.pdf');
        const doc = new PDFDocument;
        const stream = doc.pipe(myPdfFile.createWriteStream());
        doc.fontSize(25).text('Test 4 PDF!', 100, 100);
        doc.end(); */
      const correo=snapshot.child('Correo').val();
      const descripcionFalla=snapshot.child('Descripcion').val();
      const domicilio=snapshot.child('Domicilio').val();
      const folio=snapshot.child('Folio').val();
      const numCuenta=snapshot.child('No_cuenta').val();

        //doc.pipe(fs.createWriteStream('output.pdf'));
                /* doc.text('Some text with an embedded font!', 100, 100);
                doc.end();
                doc.save('Reporte.pdf'); */

               // stream.on('finish', function() {

                    
        mailOptions.attachments = [{filename: 'Reporte.pdf', path: "web/EjemWeb.pdf", contentType: 'application/pdf'  }];  

                    // or get a blob URL for display in the browser
                    //const url = stream.toBlobURL('application/pdf');
                    //iframe.src = url;
               // });

     
        mailOptions.html = "<font color=\"gray\"><b>Buen día estimados</b>," +
        "<br><br>El usuario <b>" + numCuenta + "</b>, solicita información de la filial: HÁBIL  <b>" + 
        "</b><br><br>Información de contacto del solicitante:<blockquote>" +
        "Correo: <b>" + descripcionFalla + domicilio + "</b>" +
        "<br>Teléfono: <b>" + folio + "</b>" +
        "<br>Favor de dar seguimiento a la solicitud.</blockquote>" +
        "<br><br><b>Saludos</b>.</font>";


        return transporter.sendMail(mailOptions).then(() => {
            console.log("Se envió el correo");
            return null;
        });
    }
    );