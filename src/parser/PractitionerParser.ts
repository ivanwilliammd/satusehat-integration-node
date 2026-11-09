import { OAuth2Client, OAuth2ClientConfig } from '../ssrequest/OAuth2Client';

export class PractitionerParser extends OAuth2Client {
  private practitioner: Record<string, any> | null;

  constructor(practitioner: Record<string, any> | null = null, config: OAuth2ClientConfig = { override: true }) {
    super(config);
    this.practitioner = practitioner;
  }

  async getSSNik(nik: string): Promise<Record<string, any> | null> {
    const [statusCode, res] = await this.get_by_nik('Practitioner', nik);
    if (statusCode !== 200) {
      return null;
    }

    this.practitioner = res?.entry?.[0]?.resource ?? null;
    return this.practitioner;
  }

  getId(): string | null {
    return !this.practitioner ? null : (this.practitioner['id'] ?? null);
  }

  getIdentifiers(): any {
    return this.practitioner?.['identifier'] ?? null;
  }

  getActive(): any {
    return this.practitioner?.['active'] ?? null;
  }

  getName(): any {
    return this.practitioner?.['name'] ?? null;
  }

  getTelecom(): any {
    return this.practitioner?.['telecom'] ?? null;
  }

  getAddress(): any {
    return this.practitioner?.['address'] ?? null;
  }

  getAddressLine(): any {
    return this.practitioner?.['address']?.[0]?.['line']?.[0] ?? null;
  }

  getCity(): any {
    return this.practitioner?.['address']?.[0]?.['extension']?.[0]?.['extension']?.[1]?.['valueCode'] ?? null;
  }

  getVillage(): any {
    return this.practitioner?.['address']?.[0]?.['extension']?.[0]?.['extension']?.[3]?.['valueCode'] ?? null;
  }

  getGender(): any {
    return this.practitioner?.['gender'] ?? null;
  }

  getBirthDate(): any {
    return this.practitioner?.['birthDate'] ?? null;
  }

  getPhoto(): any {
    return this.practitioner?.['photo'] ?? null;
  }

  getQualifications(): any {
    return this.practitioner?.['qualification']?.[0]?.['identifier']?.[0]?.['value'] ?? null;
  }

  getCommunication(): any {
    return this.practitioner?.['communication'] ?? null;
  }
}
