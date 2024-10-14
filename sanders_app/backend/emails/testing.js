import { exit } from 'node:process';
import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import hbs from "nodemailer-express-handlebars";
import fs from 'fs';
import juice from 'juice';
import path from 'path';

// Env Variables
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// use handlebars templates
transporter.use('compile', hbs({
        viewEngine: {
            extname: 'handlebars',
            defaultLayout: false,
        },
        viewPath: './emails',
        extName: '.handlebars'
    })
);

const sendEmail = async ({to, subject, template, context}) => {
    // Read HTML file
    const templatePath = path.join('./emails', `${template}.handlebars`);
    const htmlContent = fs.readFileSync(templatePath, 'utf-8');
    // Read CSS file
    const cssPath = path.join('./emails', 'styles.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    
    // Compile HTML with Handlebars and Context
    const html = Handlebars.compile(htmlContent);
    const htmlCompiled = html(context);

    // Inline CSS with Juice in the HTML file
    const inlinedHtml = juice.inlineContent(htmlCompiled, cssContent);
    
    // Mail Options
    const mailOptions = {
        from: 'no-reply@sanders.com.mx',
        to,
        subject,
        html: inlinedHtml,
        attachments: [
            {
                filename: 'logo_sanders.webp',
                path: path.join('./emails/attachments', 'logo_sanders.webp'),
                cid: 'logo-sanders'
            }
        ]
    };

    // Send Mail
    try{
        const info = await transporter.sendMail(mailOptions);
        console.log('Email Sent: ', info);
    } catch (error) {
        console.log(error);
    }
}

console.log('Sending Email...');

// **************************** TESTING EMAILS *******************************


// ********** Email for User Registration **********
// sendEmail({
//     to: 'lewis@donors.org',
//     subject: '¡Bienvenido a la Fundación Sanders! Confirma tu cuenta',
//     template: 'confirm-account',
//     context: {
//         name: 'Lewis',
//         url: 'https://localhost:5173/dashboard/confirm-account',
//     }
// });


// ********** Email for Password Reset **********
// sendEmail({
//     to: 'lewis@donors.org',
//     subject: 'Instrucciones para restablecer tu contraseña',
//     template: 'reset-password',
//     context: {
//         name: 'Lewis',
//         url: 'https://localhost:5173/dashboard/reset-password',
//     }
// });


// ********** Email for Donation Confirmation **********
// sendEmail({
//     to: 'lewis@donors.org',
//     subject: '¡Gracias por tu generosa donación!',
//     template: 'donation-confirmation',
//     context: {
//         name: 'Lewis',
//         amount: '$500.00',
//         project: 'Salud Sexual Responsable',
//         percentage: 25,
//         url: 'https://localhost:5173/dashboard/reset-password',
//     }
// });


// ********** Email for Project Update **********
sendEmail({
    to: 'lewis@donors.org',
    subject: '¡Buenas noticias! El proyecto Salud Sexual Responsable ha avanzado',
    template: 'project-update',
    context: {
        name: 'Lewis',
        project: 'Salud Sexual Responsable',
        percentage: 25,
        url: 'https://localhost:5173/dashboard/reset-password',
    }
});


// ********** Email for Project Completion **********


// ********** Email for Project Cancellation **********


// ********** Email for Project Creation ************
