import { cookies } from "next/headers";
import { getAdminStatus } from "@/lib/admin-status";

export interface BuilderModeStatus {
  isAdmin: boolean;
  builderEnabled: boolean;
}

export async function getBuilderModeStatus(): Promise<BuilderModeStatus> {
  const { isAdmin } = await getAdminStatus();
  if (!isAdmin) return { isAdmin: false, builderEnabled: false };

  const cookieStore = await cookies();
  const builderCookie = cookieStore.get("builder_mode");
  const builderEnabled = builderCookie?.value === "1";

  return { isAdmin: true, builderEnabled };
}
