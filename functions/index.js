const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const nodemailer = require('nodemailer');

const PDFDocument = require('pdfkit');

const gmailEmail = 'pruebashbchatb@gmail.com';
const gmailPassword = 'h4b1lgeh';

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: gmailEmail, //Cuenta de la que se enviará el correo
        pass: gmailPassword
    }
});

var mailOptions = {
    from: 'Tyr <noreply@firebase.com>',
    cc: 'ignaciopabloro2@gmail.com',
};

    exports.enviarCorreoConReporte = functions.database.ref('/InformacionReporte/{IdEnviarReporte}') //Cuando se crea un nuevo registroPostulante se ejecuta el código
    .onCreate((snapshot, context) => {

        const nombre = snapshot.child('Nombre').val();
        const correo = snapshot.child('Correo').val();
        const descripcionFalla = snapshot.child('Descripcion').val();
        const domicilio = snapshot.child('Domicilio').val();
        const folio = snapshot.child('Folio').val();
        const numCuenta = snapshot.child('No_cuenta').val();

        mailOptions.subject = 'Confirmación de reporte generado # ' + folio;
        mailOptions.to = correo;
        //mailOptions.attachments = [{filename: 'Reporte.pdf', path: "web/EjemWeb.pdf", contentType: 'application/pdf'  }];  

         mailOptions.html = "<center>" +
            "<img src='https://i.ibb.co/zbJFsPM/TYR.jpg' width='230' height='250'>" +
            "<hr color='blue' size=1 width='400'>" +
            "<h2><font color='#002080'> REPORTE DE FALLAS EN SERVICIO </font> </h2>" +
            "<hr color='blue' size='1' width='400'>" +
            "<br><br>" +
            "<TABLE BORDER '1' cellpadding='0' cellspacing='0' bgcolor='#f5f9ff'>" +
            "<TR><TH>NOMBRE</TH>" +
            "<TD>" + nombre + "</TD>" +
            "<TR><TH>CORREO</TH>" +
            "<TD>" + correo + "</TD>" +
            "<TR><TH>DESCRIPCIÓN</TH>" +
            "<TD>" + descripcionFalla + "</TD>" +
            "<TR><TH>DOMICILIO</TH>" +
            "<TD>" + domicilio + "</TD>" +
            "<TR><TH>FOLIO</TH>" +
            "<TD>" + folio + "</TD>" +
            "<TR><TH>NO_CUENTA</TH>" +
            "<TD>" + numCuenta + "</TD>" +
            "</TABLE>" +            
            "<br><br>" +
            "<h3><font color='#002080'>De inmediato, un técnico asistirá a su domicilio para solucionar su problema</font></h3>" +
            "<b>¡Que tenga un excelente día!</b>" +
            "</center>"/*  +
            "<font size=5&gt></font>" */;

        return transporter.sendMail(mailOptions).then(() => {
            console.log("Se envió el correo");
            return null;
        });
    }
    );

exports.enviarCorreoConContrato = functions.database.ref('/InformacionContrato/{IdEnviarReporte}') //Cuando se crea un nuevo registroPostulante se ejecuta el código
    .onCreate((snapshot, context) => {

        const correo = snapshot.child('Correo').val();
        const nombre = snapshot.child('Nombre').val();
        const domicilio = snapshot.child('Domicilio').val();
        const folio = snapshot.child('Folio').val();
        const telefono = snapshot.child('Telefono').val();
        const costo = snapshot.child('Costo').val();
        const tv = snapshot.child('Tv').val();
        const telefonia = snapshot.child('Telefonia').val();
        const internet = snapshot.child('Internet').val();


        mailOptions.subject = 'Te damos la bienvenida a TYR | Confirmación de contrato # ' + folio;
        mailOptions.to = correo;
        //mailOptions.attachments = [{filename: 'Reporte.pdf', path: "web/EjemWeb.pdf", contentType: 'application/pdf'  }];  

        mailOptions.html = "<center>" +
            "<img src='https://i.ibb.co/zbJFsPM/TYR.jpg' center width='80px'>" +
            "<div><h1>Contratación de servicio</h1></div>" +
            "<hr>" +
            "<h3><b>Información personal del cliente</b></h3>" +
            "</center>" + "<hr>" +
            "<br>Número de contrato del cliente: " + folio +
            "<br><br>Cliente: " + nombre +
            "<br><br>Domicilio del cliente: " + domicilio +
            "<br><br>Teléfono: " + telefono +
            "<hr>" +
            "<center><h3><b>Información del paquete adquirido</b></h3></center>" + "<hr>" +
            "<br>Servicio de internet contratado: " + internet +
            "<br><br>Número de canales incluidos: " + tv +
            "<br><br>Líneas teléfonicas contratadas: " + telefonia +
            "<br><br>Costo mensual: " + costo + " pesos";

        return transporter.sendMail(mailOptions).then(() => {
            console.log("Se envió el correo");
            return null;
        });
    }
    );


