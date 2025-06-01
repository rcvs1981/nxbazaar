"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    businessName: "",
    businessDescription: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      router.push("/login");
   } catch (err: unknown) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError("Registration failed");
  }
}
  };

  return (
    <div className="container mx-auto py-8 max-w-md">
      <h1 className="text-2xl font-bold mb-6">अकाउंट बनाएं</h1>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">नाम</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="email">ईमेल</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="password">पासवर्ड</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        
        <div>
          <Label>आपकी भूमिका</Label>
          <RadioGroup
            defaultValue="customer"
            onValueChange={(value) => setFormData({ ...formData, role: value })}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="customer" id="customer" />
              <Label htmlFor="customer">ग्राहक</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="vendor" id="vendor" />
              <Label htmlFor="vendor">विक्रेता</Label>
            </div>
          </RadioGroup>
        </div>
        
        {formData.role === "vendor" && (
          <>
            <div>
              <Label htmlFor="businessName">व्यवसाय का नाम</Label>
              <Input
                id="businessName"
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                required={formData.role === "vendor"}
              />
            </div>
            
            <div>
              <Label htmlFor="businessDescription">व्यवसाय का विवरण</Label>
              <Input
                id="businessDescription"
                type="text"
                value={formData.businessDescription}
                onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                required={formData.role === "vendor"}
              />
            </div>
          </>
        )}
        
        <Button type="submit" disabled={loading}>
          {loading ? "प्रोसेसिंग..." : "रजिस्टर करें"}
        </Button>
      </form>
    </div>
  );
}