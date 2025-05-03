// Serverless function for handling contact form submissions
const nodemailer = require('nodemailer');

// Create a transporter using Gmail
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'tobiaribo@gmail.com',
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send email function
const sendEmail = async (submission) => {
  const transporter = createTransporter();
  
  // Email content for notification
  const mailOptions = {
    from: process.env.EMAIL_USER || 'tobiaribo@gmail.com',
    to: 'tobiaribo@gmail.com',
    subject: `New Portfolio Contact: ${submission.name}`,
    html: `
      <h2>New Portfolio Contact Form Submission</h2>
      <p><strong>Name:</strong> ${submission.name}</p>
      <p><strong>Email:</strong> ${submission.email}</p>
      <p><strong>Message:</strong> ${submission.message}</p>
    `
  };
  
  // Email content for record (for Google Sheets automation)
  const recordMailOptions = {
    from: process.env.EMAIL_USER || 'tobiaribo@gmail.com',
    to: process.env.EMAIL_USER || 'tobiaribo@gmail.com',
    subject: `[RECORD] Portfolio Contact: ${submission.name} - ${new Date().toISOString()}`,
    html: `
      <h2>CONTACT FORM SUBMISSION RECORD</h2>
      <p><strong>Date:</strong> ${new Date().toISOString()}</p>
      <p><strong>Name:</strong> ${submission.name}</p>
      <p><strong>Email:</strong> ${submission.email}</p>
      <p><strong>Message:</strong> ${submission.message}</p>
    `
  };
  
  // Send both emails
  await transporter.sendMail(mailOptions);
  await transporter.sendMail(recordMailOptions);
};

// Main handler function
module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
  
  try {
    const submission = req.body;
    
    // Validate submission
    if (!submission.name || !submission.email || !submission.message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }
    
    // Send emails
    await sendEmail(submission);
    
    // Return success response
    return res.status(200).json({ 
      success: true, 
      message: 'Form submission successful' 
    });
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    return res.status(500).json({ 
      success: false, 
      message: 'Error processing form submission', 
      error: error.message 
    });
  }
};
