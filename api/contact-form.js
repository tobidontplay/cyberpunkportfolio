const nodemailer = require('nodemailer');
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

// For Vercel, we'll use a different approach for storing submissions
// since the filesystem is read-only in production
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
  
  // Send a copy to yourself as a backup/record (this serves as our "Excel" storage)
  // The emails will be organized in your inbox and can be exported to Excel if needed
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

export default async function handler(req, res) {
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
    
    // Send email notification (which also stores a record)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await sendEmail(submission);
    } else {
      console.log('Email credentials not set. Skipping email sending.');
      // For development, log the submission
      console.log('Form submission:', submission);
    }
    
    return res.status(200).json({ message: 'Form submission successful' });
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
