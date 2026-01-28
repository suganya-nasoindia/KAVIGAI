export interface UserService {
  serviceID: number;
  serviceName: string;
  serviceType: string;
  description?: string;
  // 🔹 Backend fields (keep them)
  menuStatus?: boolean;
  status?: boolean;

  // 🔥 Derived field (UI uses ONLY this)
  isActive: boolean;

  icon?: string;
}
