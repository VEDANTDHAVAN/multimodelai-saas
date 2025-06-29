"use client";

import { Empty } from "@/components/empty";
import { Heading } from "@/components/heading";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useProModal } from "@/hooks/use-pro-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Download, Eye, ImagesIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { formSchema, resolutionOptions } from "./constants";

// Dummy placeholder images
const dummyImages = [
  "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
];

const ImageGenerationPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [images, setImages] = useState<string[]>(dummyImages);
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      setError("");

      const response = await axios.post("/api/imagegen", values);

      if (response.data.success && response.data.images) {
        const imageUrls = response.data.images;

        // Validate that we have valid URLs
        const validUrls = imageUrls.filter(
          (url: string) =>
            url && typeof url === "string" && url.startsWith("http")
        );

        if (validUrls.length > 0) {
          setImages(validUrls);
        } else {
          setError("No valid image URLs received from the API");
        }
      } else {
        setError(response.data.error || "Failed to generate images");
      }

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong!!");
      }
      console.error("Frontend error:", error);
      const errorMessage =
        error.response?.data?.error || error.message || "Something went wrong";
      setError(errorMessage);
    } finally {
      router.refresh();
    }
  };

  // Function to download image
  const downloadImage = async (imageUrl: string, index: number) => {
    try {
      const response = await fetch(
        `/api/download-image?url=${encodeURIComponent(imageUrl)}`
      );

      if (!response.ok) throw new Error("Image fetch failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `generated-image-${index + 1}.jpeg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Image download failed:", error);
      window.open(imageUrl, "_blank"); // fallback
    }
  };

  // Function to view image in new tab
  const viewImage = (imageUrl: string) => {
    window.open(imageUrl, "_blank");
  };

  return (
    <div>
      <Heading
        title="Image Generation"
        description="Visualize Your Ideas - AI-Powered Design Studio"
        icon={ImagesIcon}
        iconColor="text-purple-500"
        bgColor="bg-purple-500/10"
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
                <FormItem className="col-span-12 lg:col-span-8">
                  <FormControl className="m-0 p-0">
                    <Textarea
                      rows={6}
                      className="border-0 p-2 outline-none focus-visible:ring-1 focus-visible:ring-purple-200 focus-visible:bg-purple-100 resize-none"
                      disabled={isLoading}
                      placeholder="Type your idea… like 'A futuristic city at sunset in cyberpunk style' or 'A hand-drawn sketch of a cat wearing glasses'"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="resolution"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} />
                    </SelectTrigger>
                    <SelectContent>
                      {resolutionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 lg:col-span-2 w-full"
              disabled={isLoading}
            >
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

          {error && (
            <div className="p-4 rounded-lg bg-red-100 border border-red-300 text-red-700">
              <p>
                <strong>Error:</strong> {error}
              </p>
            </div>
          )}

          {images.length === 0 && !isLoading && (
            <Empty label="No Images generated yet." />
          )}

          {images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 p-0">
              {images.map((imageUrl, index) => (
                <Card key={index} className="rounded-lg overflow-hidden">
                  <div className="relative aspect-square">
                    <Image
                      alt={`Generated Image ${index + 1}`}
                      fill
                      src={imageUrl}
                      className="object-cover"
                      onError={(e) => {
                        console.error(
                          `Failed to load image ${index + 1}:`,
                          imageUrl
                        );
                        e.currentTarget.src = "/placeholder-image.png"; // Add a fallback
                      }}
                    />
                  </div>
                  <CardFooter className="p-2">
                    <div className="flex gap-2 w-full">
                      <Button
                        onClick={() => viewImage(imageUrl)}
                        variant="outline"
                        className="flex-1 cursor-pointer"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button
                        onClick={() => downloadImage(imageUrl, index)}
                        variant="secondary"
                        className="flex-1 cursor-pointer"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerationPage;
