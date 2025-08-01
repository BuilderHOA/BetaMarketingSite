import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import {z} from "zod";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export const ContactUsFormSchema = z.object({
    email: z.email("Invalid email address").min(1, "Email is required"),
    companyName: z.string().min(1, "Company name is required"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    message: z.string().min(1, "Message is required"),
});
