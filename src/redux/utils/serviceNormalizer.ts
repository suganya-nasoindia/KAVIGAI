import { UserService } from '../../modules/ServicesHome/servicesHomeModel';

export const normalizeService = (service: any): UserService => ({
  ...service, // ✅ keep ALL backend fields

  serialNo: service.serialNo,
  serviceID: service.serviceID,
  serviceName: service.serviceName,
  serviceType: service.serviceType,
  description: service.description,

  menuStatus: service.menuStatus,
  status: service.status,

  // single source of truth for UI
  isActive: service.menuStatus === true,

  userID: service.userID,

});
