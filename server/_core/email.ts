import { ENV } from "./env";

type SendEmailInput = {
  to: string;
  subject: string;
  text: string;
};

function hasResendConfig() {
  return Boolean(ENV.resendApiKey && ENV.resendFromEmail);
}

export async function sendEmail(input: SendEmailInput): Promise<boolean> {
  if (!hasResendConfig()) {
    console.warn("[Email] RESEND_API_KEY or RESEND_FROM_EMAIL is not configured");
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ENV.resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: ENV.resendFromEmail,
        to: [input.to],
        subject: input.subject,
        text: input.text,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Email] Failed (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }

    return true;
  } catch (error) {
    console.warn("[Email] Error sending email:", error);
    return false;
  }
}
