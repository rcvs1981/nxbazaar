// src/types/user.d.ts
export interface User {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
  
  export interface UserWithRole extends User {
    role?: string;
  }