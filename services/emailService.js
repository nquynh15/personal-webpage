// ===============================
// EMAIL SERVICE
// ===============================

// NOTE: This uses EmailJS for client-side email sending. 
// 1. Sign up at https://www.emailjs.com/
// 2. Create a template with placeholders: {from_name}, {from_email}, {subject}, {message}
// 3. Replace SERVICE_ID, TEMPLATE_ID, USER_ID below with your EmailJS credentials

const EMAILJS_SERVICE_ID = 'your_service_id';
const EMAILJS_TEMPLATE_ID = 'your_template_id';
const EMAILJS_USER_ID = 'your_user_id';
const EMAILJS_PUBLIC_KEY = 'your_public_key';

emailjs.init(EMAILJS_PUBLIC_KEY);

function sendEmail(formData) {
    // return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    //     from_name: formData.name,
    //     from_email: formData.email,
    //     subject: formData.subject,
    //     message: formData.message
    // }, EMAILJS_USER_ID)
    return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message
    })
    .then(response => {
        console.log('Email sent successfully!', response);
        return { success: true };
    })
    .catch(error => {
        console.error('Email sending failed:', error);
        return { success: false, error };
    });
}

// Export the function
window.emailService = { sendEmail };