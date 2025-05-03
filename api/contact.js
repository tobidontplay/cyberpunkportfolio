// Simple contact form handler for Vercel API routes
const nodemailer = require('nodemailer');

// Vercel API route handler
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  
  try {
    // Parse the JSON body
    const submission = req.body;
    
    // Validate submission
    if (!submission.name || !submission.email || !submission.message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Check if email credentials are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email credentials not set. Check Vercel environment variables.');
      return res.status(500).json({ 
        message: 'Server configuration error: Email credentials not set', 
        debug: 'Check EMAIL_USER and EMAIL_PASS environment variables in Vercel dashboard'
      });
    }
    
    try {
      // Send email notification
      await sendEmail(submission);
      return res.status(200).json({ message: 'Form submission successful' });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      return res.status(500).json({ 
        message: 'Failed to send email', 
        error: emailError.message,
        debug: 'Check Gmail settings and ensure you are using an App Password if 2FA is enabled'
      });
    }
  } catch (error) {
    console.error('Error processing form submission:', error);
    return res.status(500).json({ 
      message: 'Internal Server Error', 
      error: error.message 
    });
  }
}

// Email sending function
async function sendEmail(submission) {
  // Create reusable transporter
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS  // Your Gmail password or app password
    }
  });
  
  // Email content for the main recipient
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'tobiaribo@gmail.com',
    subject: `New Portfolio Contact: ${submission.name}`,
    text: `
      Name: ${submission.name}
      Email: ${submission.email}
      Message: ${submission.message}
    `,
    html: `
      <h2>New Portfolio Contact Form Submission</h2>
      <p><strong>Name:</strong> ${submission.name}</p>
      <p><strong>Email:</strong> ${submission.email}</p>
      <p><strong>Message:</strong> ${submission.message}</p>
    `
  };
  
  // Send email
  await transporter.sendMail(mailOptions);
  
  // Send a copy to yourself as a backup/record
  let recordMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `[RECORD] Portfolio Contact: ${submission.name} - ${new Date().toISOString()}`,
    text: `
      CONTACT FORM SUBMISSION RECORD
      
      Date: ${new Date().toISOString()}
      Name: ${submission.name}
      Email: ${submission.email}
      Message: ${submission.message}
    `,
    html: `
      <h2>CONTACT FORM SUBMISSION RECORD</h2>
      <p><strong>Date:</strong> ${new Date().toISOString()}</p>
      <p><strong>Name:</strong> ${submission.name}</p>
      <p><strong>Email:</strong> ${submission.email}</p>
      <p><strong>Message:</strong> ${submission.message}</p>
    `
  };
  
  // Send record email
  await transporter.sendMail(recordMailOptions);
}
