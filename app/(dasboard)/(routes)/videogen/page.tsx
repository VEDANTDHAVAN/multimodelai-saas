"use client";

import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { Video } from "lucide-react";
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
// Define our message format similar to Together.ai expected format
type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

const VideoGenerationPage = () => {
  const router = useRouter();
  const [video, setVideo] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);
      const response = await axios.post("/api/videogen", values);
      setVideo(response.data[0]);
      form.reset();
    } catch (error: any) {
      console.error("API error:", error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Video Generation"
        description="Bring Your Imagination to Motion"
        icon={Video}
        iconColor="text-yellow-500"
        bgColor="bg-yellow-500/10"
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
                      className="border-0 outline-none focus-visible:ring-1 focus-visible:ring-cyan-200 focus-visible:bg-cyan-100"
                      disabled={isLoading}
                      placeholder="Write a video scene… for example, 'A drone flying over a lush green forest with cinematic vibes.'"
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
          {!video && !isLoading && (
            <Empty label="No Video generated." />
          )}
          {video && (
            <video className="w-full aspect-video mt-8 rounded-lg border bg-black" controls>
             <source src={video} />
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoGenerationPage;
