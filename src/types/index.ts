// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericType = { [key: string]: Record<string, any> };

type UserRole = "participant" | "user" | "admin";

export interface User {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
