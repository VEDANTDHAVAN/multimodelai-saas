"use client";

import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { Code2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import Loader from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";

// Define our message format similar to Together.ai expected format
type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

const CodegenPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: Message = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/codegen", {
        messages: newMessages,
      });

      const assistantMessage: Message = {
        role: "assistant",
        content: response.data.result,
      };

      setMessages([...newMessages, assistantMessage]);
      form.reset();
    } catch (error: unknown) {
      if(error?.response?.status === 403){
        proModal.onOpen();
      }else{
        toast.error("Something went wrong!!")
      }
      console.error("API error:", error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Code Generation"
        description="From Concept to Code – Instantly"
        icon={Code2}
        iconColor="text-pink-500"
        bgColor="bg-pink-500/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-1 focus-visible:ring-pink-200 focus-visible:bg-pink-100"
                      disabled={isLoading}
                      placeholder="Generate code snippet for simple toggle button using react hooks."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
              Generate
            </Button>
          </form>
        </Form>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
             <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
           <Empty label="No Conversation started yet."/>
          )}
          <div className="relative p-8 md:p-12 h-[500px] overflow-y-auto flex flex-col-reverse px-1 py-2">
          {messages.slice().reverse().map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-start" : "justify-end"}`}>
            <div className={`max-w-[80%] md:max-w-[60%] mt-5 flex p-4 py-2 rounded-lg ${message.role === "user" 
              ? "bg-green-100 text-left text-black rounded-bl-none" : "bg-gray-200 text-black rounded-br-none"}`}>
            {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
            <p className="text-sm bg-white m-3 rounded-2xl shadow-2xl z-10 p-4 whitespace-pre-wrap items-start">
            {typeof message.content === "string"
          ? message.content
          : JSON.stringify(message.content, null, 2)}
            </p>
            </div>
            </div>
           ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodegenPage;
