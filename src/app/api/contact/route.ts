import {NextResponse} from "next/server";
import {Resend} from "resend";
import {ContactUsFormSchema} from "@/lib/utils";
const resend = new Resend(process.env.RESEND_API_KEY);
const TO_ADDRESS = "matt@builderhoa.com";

export async function POST(request: Request) {
    const req_json = await request.json();
    if (!req_json || typeof req_json !== 'object') {
        return NextResponse.json(
            {error: 'Invalid input format'},
            {status: 400}
        );
    }
    try{
        ContactUsFormSchema.parse(req_json);
    } catch (error) {
        return NextResponse.json(
            {error: 'Invalid input format'},
            {status: 400}
        );
    }

    const {email, firstName, lastName, message, companyName} = req_json;

    const emailContent = `
        <p style="font-size: 20px;"><strong>
        New Contact Us Submission</strong></p>
        <p><strong>Company Name:</strong> ${companyName}</p>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        
        <p><strong>Message:</strong></p>
        
        <p>${message}</p>
        
        `;

    try {
        await resend.emails.send({
            from: "BuilderHOA <noreply@builderhoa.com>",
            to: TO_ADDRESS,
            subject: `New Contact Us Submission from ${firstName} ${lastName}`,
            html: emailContent,
            cc: email,
        });
        return NextResponse.json(
            {message: 'Email sent successfully'},
            {status: 200}
        );
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            {error: 'Failed to send email'},
            {status: 500}
        );
    }


}
