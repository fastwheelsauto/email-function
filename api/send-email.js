export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, service_type, preferred_date, preferred_time, vehicle_info, message } = req.body;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Fast Wheels Auto <onboarding@resend.dev>',
        to: [email],
        subject: 'Appointment Confirmed - Fast Wheels Auto',
        html: `
          <h1>Thank you, ${firstName}!</h1>
          <p>Your appointment has been confirmed.</p>
          <p><strong>Service:</strong> ${service_type}</p>
          <p><strong>Date:</strong> ${preferred_date}</p>
          <p><strong>Time:</strong> ${preferred_time}</p>
          <p><strong>Vehicle:</strong> ${vehicle_info}</p>
          <p>We'll see you soon!</p>
          <p>Fast Wheels Auto<br>(860) 484-4478</p>
        `,
      }),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
