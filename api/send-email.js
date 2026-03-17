export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const { email } = req.body;

  console.log("Sending to:", email);
  console.log("Key exists:", !!process.env.RESEND_API_KEY);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Get Grounded <hello@getgroundedwellness.com>",
        to: email,
        subject: "Welcome to Get Grounded 🌿",
        html: `
          <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; padding: 40px 24px; background: #F5F1EC; color: #2C2420;">
            <h1 style="font-size: 28px; font-weight: 500; margin-bottom: 16px;">Welcome to Get Grounded</h1>
            <p style="font-size: 16px; color: #6B5E56; line-height: 1.65; margin-bottom: 24px;">
              Your account has been created. This is your private space to think things through — whenever you need it.
            </p>
            <a href="https://www.getgroundedwellness.com"
               style="display: inline-block; background: #5C4D40; color: #F5F1EC; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 15px;">
              Start a Reflection →
            </a>
            <p style="font-size: 12px; color: #A0948A; margin-top: 40px;">
              This is not therapy. Get Grounded is a thinking tool, not a substitute for professional support.
            </p>
          </div>
        `,
      }),
    });
    const data = await response.json();
    console.log("Resend response:", JSON.stringify(data));
    res.status(200).json(data);
  } catch (e) {
    console.log("Error:", e.message);
    res.status(500).json({ error: e.message });
  }
}