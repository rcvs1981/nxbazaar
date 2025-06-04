import toast from "react-hot-toast";

interface RequestOptions {
  setLoading: (isLoading: boolean) => void;
  endpoint: string;
  data: unknown;
  resourceName: string;
  reset?: () => void;
  redirect?: () => void;
}

export async function makePostRequest({
  setLoading,
  endpoint,
  data,
  resourceName,
  reset,
  redirect,
}: RequestOptions): Promise<void> {
  try {
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    
    if (!baseUrl) {
      throw new Error("BASE_URL is not configured");
    }

    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: 'no-store' // Recommended for Next.js
    });

    const responseData = await response.json();

    if (response.ok) {
      toast.success(`New ${resourceName} created successfully`);
      reset?.();
      redirect?.();
    } else {
      if (response.status === 409) {
        throw new Error(responseData.message);
      } else {
        throw new Error("Something went wrong, please try again");
      }
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    toast.error(errorMessage);
    console.error("POST request error:", error);
  } finally {
    setLoading(false);
  }
}

export async function makePutRequest({
  setLoading,
  endpoint,
  data,
  resourceName,
  redirect,
  reset,
}: RequestOptions): Promise<void> {
  try {
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    
    if (!baseUrl) {
      throw new Error("BASE_URL is not configured");
    }

    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: 'no-store' // Recommended for Next.js
    });

    if (response.ok) {
      toast.success(`${resourceName} updated successfully`);
      redirect?.();
      reset?.();
    } else {
      const responseData = await response.json();
      throw new Error(responseData.message || "Something went wrong");
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    toast.error(errorMessage);
    console.error("PUT request error:", error);
  } finally {
    setLoading(false);
  }
}