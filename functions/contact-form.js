const nodemailer = require('nodemailer');
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Path to the Excel file
const excelFilePath = path.join(__dirname, 'contact-submissions.xlsx');

// Create Excel file if it doesn't exist
async function initExcelFile() {
  if (!fs.existsSync(excelFilePath)) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Contact Submissions');
    
    // Add headers
    worksheet.columns = [
      { header: 'Date', key: 'date' },
      { header: 'Name', key: 'name' },
      { header: 'Email', key: 'email' },
      { header: 'Message', key: 'message' }
    ];
    
    await workbook.xlsx.writeFile(excelFilePath);
  }
}

// Add submission to Excel file
async function addSubmissionToExcel(submission) {
  await initExcelFile();
  
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(excelFilePath);
  
  const worksheet = workbook.getWorksheet('Contact Submissions');
  
  // Add new row
  worksheet.addRow({
    date: new Date().toISOString(),
    name: submission.name,
    email: submission.email,
    message: submission.message
  });
  
  await workbook.xlsx.writeFile(excelFilePath);
}

// Send email notification
async function sendEmail(submission) {
  // Create reusable transporter
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS  // Your Gmail password or app password
    }
  });
  
  // Email content
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
}

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }
  
  try {
    // Parse the JSON body
    const submission = JSON.parse(event.body);
    
    // Validate submission
    if (!submission.name || !submission.email || !submission.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' })
      };
    }
    
    // Add to Excel file
    await addSubmissionToExcel(submission);
    
    // Send email notification
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await sendEmail(submission);
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submission successful' })
    };
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' })
    };
  }
};
