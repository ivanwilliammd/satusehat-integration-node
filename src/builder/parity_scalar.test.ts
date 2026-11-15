/**
 * Builder yang di Node masih kosong dan diisi dari sumber PHP.
 *
 * Golden-nya dibuat langsung dari builder PHP (`php -r` lewat runner), bukan
 * diterjemahkan, supaya yang dibandingkan benar-benar keluaran kanon.
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { Account } from './Account';
import { ChargeItem } from './ChargeItem';
import { ImagingStudy } from './ImagingStudy';
import { Invoice } from './Invoice';
import { RiskAssessment } from './RiskAssessment';

const golden = (nama: string) =>
  JSON.parse(readFileSync(new URL(`./testdata/${nama}_scalar_php_golden.json`, import.meta.url), 'utf8'));

describe('Account parity', () => {
  it('sama dengan golden PHP, termasuk status yang dihuruf-kecilkan', () => {
    const b = new Account();
    b.setId('acc-1');
    b.setStatus('ACTIVE');
    b.setType(
      'http://terminology.hl7.org/CodeSystem/v3-AccountTypes',
      'PBILLACCT',
      'Patient billing account',
      'Akun pasien'
    );
    b.setName('Akun Rawat Jalan');
    b.addSubject('Patient/1000000001', 'Budi Santoso');
    b.setServicePeriod('2026-01-05', '2026-01-06');
    b.addCoverage('Coverage/cov-1', 1);
    b.setOwner('Organization/1000000001');
    b.setDescription('Akun penagihan rawat jalan');
    expect(b.build()).toEqual(golden('account'));
  });

  it('menolak status di luar lima nilai sah', () => {
    const b = new Account();
    expect(() => b.setStatus('selesai')).toThrow(/tidak valid/);
  });
});

describe('ChargeItem parity', () => {
  it('sama dengan golden PHP, termasuk dua identifier dan dua performer', () => {
    const b = new ChargeItem();
    b.setId('ci-1');
    b.addIdentifier('http://sys.id/ni', 'NI-200');
    b.addIdentifier('http://sys.id/rm', 'RM-9');
    b.setStatus('billable');
    b.setPartOf('Encounter/enc-1');
    b.setCode('http://terminology.kemkes.go.id/CodeSystem/procedure', 'PROC-1', 'Konsultasi');
    b.setSubject('Patient/1000000001');
    b.setFocus('Procedure/proc-1');
    b.setEncounter('Encounter/enc-1');
    b.setPerformedDate('2026-01-05T09:00:00+07:00');
    b.setPerformerActor(
      'Practitioner/1000000002',
      'http://terminology.hl7.org/CodeSystem/v3-ParticipationType',
      'PPRF'
    );
    b.setPerformerCostCenter('Organization/1000000001');
    b.setOrganization('Organization/1000000001');
    b.setRequestingOrganization('Organization/1000000002');
    b.setQuantity(3);
    b.setBodysite('http://snomed.info/sct', '123', 'Toraks');
    b.setProductCode('http://sys-ids.kemkes.go.id/kfa', '93000515', 'Amoksisilin');
    b.setPriceOverride(150000.0, 'IDR');
    b.setOverrideReason('Harga khusus peserta');
    b.setEnterer('Practitioner/1000000003');
    b.setEnteredDate('2026-01-05T10:00:00+07:00');
    b.setReason('http://snomed.info/sct', '456', 'Tindakan');
    b.setService('ServiceRequest/sr-1');
    b.setAccount('Account/acc-1');
    expect(b.build()).toEqual(golden('charge_item'));
  });
});

describe('Invoice parity', () => {
  it('sama dengan golden PHP, termasuk priceComponent yang disisipkan ke lineItem yang sudah ada', () => {
    const b = new Invoice();
    b.setId('inv-1');
    b.addIdentifier('http://sys.id/ni', 'NI-300');
    b.setStatus('issued');
    b.setType('http://terminology.hl7.org/CodeSystem/invoice-type', 'inpatient', 'Rawat inap');
    b.setDate('2026-01-05');
    b.setParticipant(
      'http://terminology.hl7.org/CodeSystem/v3-ParticipationType',
      'PPRF',
      'Practitioner/1000000002',
      'dr. Budi'
    );
    b.setIssuer('Organization/1000000001');
    b.setCustomer('Patient/1000000001');
    b.setAccount('Account/acc-1');
    b.addLineItem(1, 'http://terminology.kemkes.go.id/CodeSystem/procedure', 'PROC-1', 'Konsultasi', 2);
    b.addLineItem(2, 'http://terminology.kemkes.go.id/CodeSystem/procedure', 'PROC-2', 'Visite', null, 150000.0, 1.0);
    b.addLineItemPriceComponent(0, 'discount', -5000.0, 'DISC');
    b.setTotalNet(300000.0, 'IDR');
    b.setTotalGross(350000.0, 'IDR');
    b.setTotalVAT(35000.0, 'IDR');
    b.setPaymentTerms('Tunai');
    b.addNote('Lunas');
    expect(b.build()).toEqual(golden('invoice'));
  });

  it('setCustomer menulis ke subject, bukan customer', () => {
    const b = new Invoice();
    b.setCustomer('Patient/1000000001');
    const isi = b.build();
    expect(isi['subject']).toEqual({ reference: 'Patient/1000000001' });
    expect(isi['customer']).toBeUndefined();
  });
});

describe('RiskAssessment parity', () => {
  it('sama dengan golden PHP, dua prediction dan extension bertipe', () => {
    const b = new RiskAssessment();
    b.setId('ra-1');
    b.addIdentifier('http://sys.id/ni', 'NI-400');
    b.setStatus('final');
    b.setCode({ text: 'Risiko sepsis' });
    b.setSubject('Patient/1000000001', 'Budi Santoso');
    b.setEncounter('Encounter/enc-1');
    b.setOccurrenceDateTime('2026-01-05T08:00:00+07:00');
    b.setCondition('Condition/cond-1');
    b.setPerformer('Practitioner/1000000002');
    b.addReasonReference('Observation/obs-1');
    b.addReasonReference('Observation/obs-2');
    b.addBasis('Observation/obs-3');
    const outcome = { coding: [{ system: 'http://snomed.info/sct', code: '91302008', display: 'Sepsis' }], text: 'Sepsis' };
    b.addPrediction(outcome, 0.72, { text: 'Tinggi' }, 2.5);
    b.addPrediction(outcome, 0.31);
    b.setMitigation('Antibiotik empiris dalam 1 jam');
    b.addNote('Dinilai ulang 6 jam');
    b.addExtension('https://fhir.kemkes.go.id/r4/StructureDefinition/risk-source', 'skor-qsofa', 'String');
    expect(b.build()).toEqual(golden('risk_assessment'));
  });

  it('prediction menumpuk, bukan menimpa', () => {
    const b = new RiskAssessment();
    b.addPrediction({ text: 'A' }, 0.1);
    b.addPrediction({ text: 'B' }, 0.2);
    expect(b.build()['prediction']).toHaveLength(2);
  });
});

describe('ImagingStudy parity', () => {
  const DICOM = 'http://dicom.nema.org/resources/ontology/DCM';

  function isi(b: ImagingStudy): ImagingStudy {
    b.setId('img-1');
    b.addIdentifier('http://sys.id/accession', 'ACC-77');
    b.setStatus('available');
    b.addModality(DICOM, 'CT', 'Computed Tomography');
    b.addModality(DICOM, 'MR', 'Magnetic Resonance');
    b.setSubject('Patient/1000000001');
    b.setEncounter('Encounter/enc-1');
    b.setStarted('2026-01-05T08:00:00+07:00');
    b.setEnded('2026-01-05T08:30:00+07:00');
    b.setLocation('Location/loc-1');
    b.addReferrer('Practitioner/1000000002');
    b.addReferrer('Practitioner/1000000003');
    b.addPartOf('ServiceRequest/sr-1');
    b.addSeries('1.2.840.113619.2.1', DICOM, 'CT', 'Computed Tomography', 'available', 'Potongan toraks', 1);
    b.addSeries('1.2.840.113619.2.2', DICOM, 'MR', 'Magnetic Resonance', null, 'Potongan kepala', 2);
    b.setSeriesStarted(1, '2026-01-05T09:00:00+07:00');
    b.setSeriesBodySite(0, 'http://snomed.info/sct', '51185008', 'Toraks');
    b.addSeriesInstance(0, '1.2.840.113619.2.1.1', DICOM, '1.2.840.10008.5.1.4.1.1.2', 'CT Image Storage');
    b.addSeriesInstance(0, '1.2.840.113619.2.1.2', DICOM, '1.2.840.10008.5.1.4.1.1.2', 'CT Image Storage');
    b.addSeriesInstanceNumber(0, 0, 1);
    b.addSeriesInstanceNumber(0, 1, 2);
    return b;
  }

  it('sama dengan golden PHP, termasuk instance bersarang dan nomor instance', () => {
    expect(isi(new ImagingStudy()).build()).toEqual(golden('imaging_study'));
  });

  it('addReferrer menimpa meski namanya add — quirk PHP yang sama', () => {
    const hasil = isi(new ImagingStudy()).build();
    expect(hasil['referrer']).toEqual({ reference: 'Practitioner/1000000003' });
  });

  it('bodySite dibungkus coding, modality tidak', () => {
    const hasil = isi(new ImagingStudy()).build();
    expect(hasil['modality'][0]['system']).toBe(DICOM);
    expect(hasil['series'][0]['bodySite']).toEqual({
      coding: [{ system: 'http://snomed.info/sct', code: '51185008', display: 'Toraks' }],
    });
  });
});
