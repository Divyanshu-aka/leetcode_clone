import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendMail = async (options) => {
	// Configure mailgen by setting a theme and your product info
	const mailGenerator = new Mailgen({
		theme: "default",
		product: {
			// Appears in header & footer of e-mails
			name: "Task Manager",
			link: "https://mailgen.js/",
			// Optional product logo
			// logo: 'https://mailgen.js/img/logo.png'
		},
	});
	var emailText = mailGenerator.generatePlaintext(options.mailGenContent);
	var emailHTML = mailGenerator.generate(options.mailGenContent);

	const transporter = nodemailer.createTransport({
		host: process.env.MAILTRAP_SMTP_HOST,
		port: process.env.MAILTRAP_SMTP_PORT,
		secure: false, // true for 465, false for other ports
		auth: {
			user: process.env.MAILTRAP_SMTP_USER,
			pass: process.env.MAILTRAP_SMTP_PASSWORD,
		},
	});

	const mail = {
		from: "123@abc",
		to: options.email,
		subject: options.subject,
		text: emailText, // plain‑text body
		html: emailHTML, // HTML body
	};

	try {
		await transporter.sendMail(mail);
		console.log("Email sent successfully to:", options.email);
	} catch (error) {
		console.error("Error sending email:", error);
	}
};

const verificationEmailContentGen = (username, verificationUrl) => {
	return {
		body: {
			name: username,
			intro: "Welcome to our App! We're very excited to have you on board.",
			action: {
				instructions: "To get started with our App, please click here:",
				button: {
					color: "#22BC66", // Optional action button color
					text: "Verify your email address",
					link: verificationUrl,
				},
			},
			outro:
				"Need help, or have questions? Just reply to this email, we'd love to help.",
		},
	};
};

const forgotPasswordEmailContentGen = (username, passwordResetUrl) => {
	return {
		body: {
			name: username,
			intro: "You have requested to reset your password.",
			action: {
				instructions: "To reset your password, please click here:",
				button: {
					color: "#22BC66", // Optional action button color
					text: "Reset your password",
					link: passwordResetUrl,
				},
			},
			outro:
				"Need help, or have questions? Just reply to this email, we'd love to help.",
		},
	};
};

// sendMail({
// 	email: user.email,
// 	subject: "qwerty",
// 	mailGenContent: verificationEmailContentGen(username, ``),
// });

export { sendMail, verificationEmailContentGen, forgotPasswordEmailContentGen };
// For instance methods (called on user documents)
