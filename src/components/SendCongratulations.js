import React, { useState } from "react";
import axios from "axios"; // Add axios for sending API requests
import "../styles/Congratulations.css"
function SendCongratulations() {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!recipientEmail || !message) {
      setStatus("Please provide both email and a message.");
      return;
    }

    try {
      // Placeholder for API request to send the email.
      await axios.post("https://your-cloud-function-url/send-email", {
        recipientEmail,
        message,
      });

      setStatus("Congratulations message sent successfully!");
      setRecipientEmail(""); // Reset input fields
      setMessage("");
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("There was an error sending the message.");
    }
  };

  return (
    <div className="send-congratulations">
      <h3>Send Congratulations to the Mum</h3>
      <form onSubmit={handleEmailSubmit}>
        <div className="form-group">
          <label htmlFor="recipientEmail">Recipient's Email:</label>
          <input
            type="email"
            id="recipientEmail"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Send Congratulations</button>
      </form>
      {status && <p className="status">{status}</p>}
    </div>
  );
}

export default SendCongratulations;
