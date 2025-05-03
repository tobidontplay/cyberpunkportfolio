// Simple Node.js script to handle contact form submissions
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { google } = require('googleapis');
const ExcelJS = require('exceljs');
require('dotenv').config();

// Path to the Excel file
const EXCEL_FILE_PATH = path.join(__dirname, 'contact-submissions.xlsx');

// Create Excel file if it doesn't exist
async function initExcelFile() {
  if (!fs.existsSync(EXCEL_FILE_PATH)) {
    console.log('Creating new Excel file for submissions...');
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Contact Submissions');
    
    // Add headers
    worksheet.columns = [
      { header: 'Date', key: 'date' },
      { header: 'Name', key: 'name' },
      { header: 'Email', key: 'email' },
      { header: 'Message', key: 'message' }
    ];
    
    await workbook.xlsx.writeFile(EXCEL_FILE_PATH);
    console.log('Excel file created successfully.');
  }
}

// Add submission to Excel file
async function addSubmissionToExcel(submission) {
  await initExcelFile();
  
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(EXCEL_FILE_PATH);
  
  const worksheet = workbook.getWorksheet('Contact Submissions');
  
  // Add new row
  worksheet.addRow({
    date: new Date().toISOString(),
    name: submission.name,
    email: submission.email,
    message: submission.message
  });
  
  await workbook.xlsx.writeFile(EXCEL_FILE_PATH);
  console.log('Submission added to Excel file.');
}

// Send email notification
async function sendEmail(submission) {
  console.log('Setting up email transport...');
  
  // Create reusable transporter
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'tobiaribo@gmail.com',
      pass: process.env.EMAIL_PASS
    }
  });
  
  console.log('Sending notification email...');
  
  // Email content for the main recipient
  let mailOptions = {
    from: process.env.EMAIL_USER || 'tobiaribo@gmail.com',
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
  console.log('Notification email sent successfully.');
  
  console.log('Sending record email...');
  
  // Send a copy to yourself as a backup/record
  let recordMailOptions = {
    from: process.env.EMAIL_USER || 'tobiaribo@gmail.com',
    to: process.env.EMAIL_USER || 'tobiaribo@gmail.com',
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
  console.log('Record email sent successfully.');
}

// Command line interface for form submissions
async function runCLI() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  console.log('===== Portfolio Contact Form Handler =====');
  console.log('Enter the details of the contact submission:');
  
  rl.question('Name: ', (name) => {
    rl.question('Email: ', (email) => {
      rl.question('Message: ', async (message) => {
        const submission = { name, email, message };
        
        try {
          console.log('\nProcessing submission...');
          
          // Add to Excel
          await addSubmissionToExcel(submission);
          
          // Send emails
          await sendEmail(submission);
          
          console.log('\n✅ Submission processed successfully!');
        } catch (error) {
          console.error('\n❌ Error processing submission:', error);
        }
        
        rl.close();
      });
    });
  });
}

// Check if EMAIL_PASS is set
if (!process.env.EMAIL_PASS) {
  console.error('Error: EMAIL_PASS environment variable is not set.');
  console.log('Please set it by running:');
  console.log('export EMAIL_PASS="your-password-here"');
  console.log('Or create a .env file with EMAIL_PASS=your-password-here');
  process.exit(1);
}

// Run the CLI
runCLI();
