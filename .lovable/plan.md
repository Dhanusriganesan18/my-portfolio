Plan: Connect Contact Form to EmailJS

Your credentials are already provided — I will wire them directly into the project.

Scope
1. Install the @emailjs/browser package.
2. Replace the current no-op form handler in the Contact section with a real EmailJS send call using:
   - Service ID: service_6z7j6ke
   - Template ID: template_5u8supn
   - Public Key: w-x-ZFGEvp4GwRVDs
3. Use react-hook-form + zod for field validation (required on all four fields, email format check).
4. Add a loading state on the Send Message button while the request is in flight.
5. Show sonner toast feedback:
   - Success: "Thank you! Your message has been sent successfully."
   - Error: a toast error if EmailJS returns a failure.
6. Clear all form fields after a successful send.
7. Keep the existing glass-card styling and animation untouched.

What stays the same
- Page layout, colors, typography, and nav.
- All other sections (Hero, About, Projects, etc.).

What the user should do
- In your EmailJS template, map these variable names exactly so they populate correctly:
  - from_name  (maps to Name field)
  - from_email (maps to Email field)
  - subject    (maps to Subject field)
  - message    (maps to Message field)
  - to_email   (hardcode as dhanusrig90@gmail.com or set as the template default To address in EmailJS)

Approval needed to proceed.