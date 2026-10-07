# Saint Mary's University – Online Enrollment Portal

Open `index.html` in a browser. No install needed.

New students: click Enroll Now, register with a unique email address, and sign in using that email and the generated password. The student number remains available for reference.

On a fresh browser, choose the administrator setup link on the login page to create the first staff account. Admin-created student accounts require a password to be set at creation.

## Security limitation

This is a front-end demonstration: account records and passwords are stored in browser local storage, not in a secure server-side authentication system. Do not use it for real student records or passwords. Publishing this repository shares the source code only; it does not include browser local-storage data.

## Open it on a phone

To test it on a phone while your computer is running it:

1. Connect the phone and computer to the same Wi-Fi network.
2. Make sure Node.js is installed. Open PowerShell in this `smu-enrollment` folder and start the web server:
   ```powershell
   node server.js
   ```
3. In another PowerShell window, run `ipconfig` and find the IPv4 address under the computer's Wi-Fi adapter (for example, `192.168.1.25`).
4. On the phone, open `http://192.168.1.25:8000` in a browser, replacing the example address with the computer's IPv4 address.
5. If Windows Firewall asks, allow access on private networks. Keep the server window open while using the site; press Ctrl+C there when finished.

Students see only their own enrollment and payment figures on the dashboard. Staff dashboards show aggregate figures, including the total student count.

The site is responsive on smaller screens. Its data is stored in that browser's local storage, so phone and computer data do not sync. This local server is for testing on your own network, not public hosting.

## Files
- `index.html` – page shell
- `server.js` – local web server for phone testing
- `css/style.css` – all styling
- `js/store.js` – seed data, fees, save/load (localStorage)
- `js/helpers.js` – roles, formatting, assessment/balance math
- `js/views.js` – the module screens
- `js/actions.js` – add/submit/pay/confirm logic and validation
- `js/public.js` – landing and login pages
- `js/auth.js` – login/logout
- `js/main.js` – render and start
- `assets/` – put the school logo and photos here
