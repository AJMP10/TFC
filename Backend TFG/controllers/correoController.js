const {request,response} = require('express');
const nodeMailer = require('nodemailer');

const sendEmail = (req=request,resp=response) => {
    // Recogiendo los datos del formulario
    let body=req.body;
    // Plantilla para el correo
    contentHTML=`
        <h1>${body.name} ${body.lastName} ${body.surName}</h1>
        <ul>
            <li>Email: ${body.email}</li>
        </ul>
        <hr>
        <h2>Mensaje</h2>
        <hr>
        <p>${body.consult}</p>
    `;
    // Conexion y autenticación
    let config=nodeMailer.createTransport({
        service:'gmail',
        auth: {
            user: 'UnderDogToWin',
            pass: '12zdoD1i',
        }
    });

    // Configuración de las opciones del correo
    const options ={
        from: body.name,
        subject: body.name,
        to: 'underdogtowin@gmail.com',
        html:contentHTML
    };

    // Valdación y respuesta desde backend
    config.sendMail(options,(error,result)=>{
        if (error) return resp.json({ok:false,msg:error});
        return resp.json({
            ok:true,
            msg:result
        });
    });

}

// Exportando la función
module.exports = {
    sendEmail
}
