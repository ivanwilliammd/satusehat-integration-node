export class DeviceParser {
  private device: Record<string, any>;

  constructor(device: Record<string, any> = {}) {
    this.device = device ?? {};
  }

  getIdentifiers(): any {
    return this.device['identifier'] ?? null;
  }

  getStatus(): any {
    return this.device['status'] ?? null;
  }

  getManufacturer(): any {
    return this.device['manufacturer'] ?? null;
  }

  getDeviceNames(): any {
    return this.device['deviceName'] ?? null;
  }

  getType(): any {
    return this.device['type'] ?? null;
  }
}
