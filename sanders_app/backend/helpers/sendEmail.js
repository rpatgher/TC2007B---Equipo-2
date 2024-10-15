import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import hbs from "nodemailer-express-handlebars";
import fs from 'fs';
import juice from 'juice';
import path from 'path';

const sendEmail = async ({to, subject, template, context}) => {
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
    }));


    
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
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
}

export default sendEmail;