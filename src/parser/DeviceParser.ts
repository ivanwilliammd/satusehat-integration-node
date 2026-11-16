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

  getId(): any {
    return this.device?.['id'] ?? null;
  }

  getIdentifier(): any {
    return this.device?.['identifier'] ?? null;
  }

  getDeviceName(): any {
    return this.device?.['deviceName'] ?? null;
  }

  getPatient(): any {
    return this.device?.['patient'] ?? null;
  }

  getOwner(): any {
    return this.device?.['owner'] ?? null;
  }

  getLocation(): any {
    return this.device?.['location'] ?? null;
  }

  getSerialNumber(): any {
    return this.device?.['serialNumber'] ?? null;
  }

  getNote(): any {
    return this.device?.['note'] ?? null;
  }
}
