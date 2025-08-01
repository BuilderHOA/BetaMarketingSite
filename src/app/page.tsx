'use client';
import Image from "next/image";
import {ChevronDownIcon} from "lucide-react";
import {FormProvider, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Label} from "@/components/ui/label";
import React from "react";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ContactUsFormSchema} from "@/lib/utils";


const defaultValues = {
    email: "",
    companyName: "",
    firstName: "",
    lastName: "",
    message: "",
}
export default function Home() {
    const form = useForm<z.infer<typeof ContactUsFormSchema>>({
        resolver: zodResolver(ContactUsFormSchema),
        defaultValues,
        mode: "onChange",
    })

    const onSubmit = async (data: z.infer<typeof ContactUsFormSchema>) => {
        fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((response) => {
            toast.success("Your message has been sent successfully! A copy will be sent to your email.");
            form.reset();
        }).catch((error) => {
            console.error("Error sending message:", error);
            toast.error("Failed to send your message. Please try again later.");
        });
    }

    const onError = (errors: any) => {
        console.warn("Form submission errors:", errors);
        toast.error(`Failed to create event: ${errors ? Object.keys(errors).map(s => errors[s].message).join(", ") : "Unknown error"}`);
    }
    return (
        <>
            <div className={"flex flex-col items-center justify-center min-h-screen min-w-screen"}>
                <div className={"flex flex-col items-center justify-center mb-4"}>
                    <Image src={"/logo.png"} alt={"BuilderHOA Logo"} width={200} height={200}
                           className={"rounded-full mb-4"}/>
                </div>
                <div className={"position-relative overflow-hidden pt-2"}>
                    <iframe src="https://share.synthesia.io/embeds/videos/90ea75de-0ca0-453c-a015-09b9334d0161"
                            loading="lazy"
                            title="Synthesia video player - BuilderHOA Introduction V5" allowFullScreen
                            allow="encrypted-media; fullscreen;"
                            className={"position-relative w-[calc(100vw-10rem)] h-[calc(100vh-20rem)] rounded-lg shadow-lg"}></iframe>
                </div>
                <div>
                    <div className={"mt-8 text-center justify-center flex flex-col items-center"}>
                        <p className={"text-gray-500"}>If you would like to participate in our pilot program, fill out
                            the
                            contact form below.</p>
                        <p className={"font-semibold mt-2"}>Contact Us</p>
                        <ChevronDownIcon/>
                    </div>
                </div>
            </div>
            <div className={"flex min-h-screen min-w-screen items-center justify-center"}>
                <Card className={"w-5/12 p-6"}>
                    <CardHeader>
                        <CardTitle className={"text-2xl font-bold"}>
                            Contact Us
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Contact us form or information can go here */}
                        <FormProvider {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit, onError)}
                                  className={"flex flex-col justify-start gap-4"}>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="location"
                                                type="email"
                                                placeholder="me@example.com"
                                                {...field}
                                            />
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({field}) => (
                                        <FormItem>
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input
                                                id="firstName"
                                                type="text"
                                                placeholder="John"
                                                {...field}
                                            />
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({field}) => (
                                        <FormItem>
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input
                                                id="lastName"
                                                type="text"
                                                placeholder="Doe"
                                                {...field}
                                            />
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({field}) => (
                                        <FormItem>
                                            <Label htmlFor="message">Message</Label>
                                            <Textarea
                                                id="message"
                                                placeholder="Your message here..."
                                                {...field}
                                                rows={4}
                                            />
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                                <FormField
                                    control={form.control}
                                    name="companyName"
                                    render={({field}) => (
                                        <FormItem>
                                            <Label htmlFor="companyName">Company Name</Label>
                                            <Input
                                                id="location"
                                                type="text"
                                                placeholder="Acme, LLC"
                                                {...field}
                                            />
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className={"w-full mt-4"}>Send Message</Button>
                            </form>
                        </FormProvider>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
