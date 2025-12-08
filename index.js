const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { name, email, studentId, batch, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Modern, responsive email design
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Message</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8fafc;
            margin: 0;
            padding: 20px;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .email-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 30px;
            text-align: center;
            color: white;
        }
        
        .email-header h1 {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        
        .email-header p {
            font-size: 16px;
            opacity: 0.9;
            margin: 0;
        }
        
        .email-content {
            padding: 40px 30px;
        }
        
        .subject-box {
            background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 30px;
            border-left: 4px solid #667eea;
        }
        
        .subject-box h2 {
            color: #667eea;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .subject-box .subject-text {
            font-size: 22px;
            font-weight: 700;
            color: #2d3748;
            line-height: 1.3;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 50px;
        }
        
        .info-card {
            background: #f8fafc;
            padding: 20px;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
        }
        
        .info-card h3 {
            font-size: 12px;
            text-transform: uppercase;
            color: #64748b;
            font-weight: 600;
            margin-bottom: 8px;
            letter-spacing: 0.5px;
        }
        
        .info-card p {
            font-size: 16px;
            font-weight: 500;
            color: #1e293b;
            margin-bottom: 20px;
        }
        
        .info-card .email-link {
            color: #667eea;
            text-decoration: none;
            font-weight: 500;
        }
        
        .info-card .email-link:hover {
            text-decoration: underline;
        }
        
        .message-section {
            background: #f1f5f9;
            padding: 25px;
            border-radius: 12px;
            margin-bottom: 30px;
        }
        
        .message-section h3 {
            font-size: 16px;
            color: #475569;
            font-weight: 600;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .message-section .message-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            font-size: 15px;
            line-height: 1.7;
            color: #4a5568;
            white-space: pre-line;
        }
        
        .action-buttons {
            display: flex;
            gap: 15px;
            margin-top: 30px;
            flex-wrap: wrap;
        }
        
        .btn {
            padding: 14px 28px;
            border-radius: 10px;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            min-width: 160px;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .btn-secondary {
            background: #f1f5f9;
            color: #475569;
            border: 1px solid #cbd5e1;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .email-footer {
            background: #1e293b;
            color: #cbd5e1;
            padding: 25px;
            text-align: center;
            font-size: 13px;
            line-height: 1.6;
        }
        
        .email-footer a {
            color: #667eea;
            text-decoration: none;
        }
        
        .badge {
            display: inline-block;
            padding: 6px 12px;
            background: #10b981;
            color: white;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            margin-left: 10px;
        }
        
        /* Responsive styles */
        @media (max-width: 480px) {
            .email-content {
                padding: 25px 20px;
            }
            
            .info-grid {
                grid-template-columns: 1fr;
            }
            
            .email-header {
                padding: 25px 20px;
            }
            
            .email-header h1 {
                font-size: 20px;
            }
            
            .subject-box .subject-text {
                font-size: 18px;
            }
            
            .action-buttons {
                flex-direction: column;
            }
            
            .btn {
                width: 100%;
                min-width: unset;
            }
        }
        
        @media (max-width: 320px) {
            .email-container {
                border-radius: 12px;
            }
            
            .email-content {
                padding: 20px 15px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <h1>📚 Student Contact Portal</h1>
            <p>New Message Received</p>
        </div>
        
        <!-- Content -->
        <div class="email-content">
            <!-- Subject -->
            <div class="subject-box">
                <h2>Subject</h2>
                <div class="subject-text">${subject || "Student Inquiry"}</div>
            </div>
            
            <!-- Student Information Grid -->
            <div class="info-grid">
                <div class="info-card">
                    <h3>Student Name</h3>
                    <p>${name}</p>
                </div>
                
                <div class="info-card">
                    <h3>Student Email</h3>
                    <p>
                        <a href="mailto:${email}" class="email-link">${email}</a>
                       
                    </p>
                </div>
                
                <div class="info-card">
                    <h3>Student ID</h3>
                    <p>${studentId}</p>
                </div>
                
                <div class="info-card">
                    <h3>Batch</h3>
                    <p>${batch}</p>
                </div>
            </div>
            
            <!-- Message Section -->
            <div class="message-section">
                <h3>📝 Student Message</h3>
                <div class="message-content">${message.replace(
                  /\n/g,
                  "<br>"
                )}</div>
            </div>
            
            <!-- Action Buttons -->
            <div class="action-buttons">
                <a href="https://github.com/AbrarShazid/mail-smtp-backend" class="btn btn-secondary">
                    Go to GitHub
                </a>
                
            </div>
        </div>
        
        <!-- Footer -->
        <div class="email-footer">
            <p>This email was sent from the Student Contact Portal.</p>
            <p>You can reply directly to this email to contact the student.</p>
            <p style="margin-top: 15px; font-size: 12px; color: #94a3b8;">
                <a href="#">Privacy Policy</a> • 
                <a href="#">Unsubscribe</a> • 
                <a href="#">Help Center</a>
            </p>
            <p style="margin-top: 20px; color: #64748b; font-size: 12px;">
                © ${new Date().getFullYear()} Student Portal. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
    `;

    await transporter.sendMail({
      from: `"Student Portal" <${process.env.SMTP_USER}>`, // Branded sender
      to: "2222081036@uttarauniversity.edu.bd",
      subject: subject || `New Message from ${name} - Student Portal`,
      html: htmlContent,
      replyTo: email,
      text: `
NEW STUDENT MESSAGE
===================

Subject: ${subject || "Student Inquiry"}

STUDENT INFORMATION:
-------------------
Name: ${name}
Email: ${email}
Student ID: ${studentId}
Batch: ${batch}

MESSAGE:
--------
${message}

---
You can reply directly to this email to contact ${name}.
This message was sent from the Student Contact Portal.
      `,
    });

    res.json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    console.error("Email sending error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to send email. Please try again later.",
      error: err.message,
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "Student Contact Portal API",
    status: "Running",
    version: "1.0.0",
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
