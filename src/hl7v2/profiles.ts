import { Profile } from './profile';

/** The two profiles that cover most hospital traffic: transfer and results. */
export const Profiles = {
  adtA01: (): Profile =>
    Profile.from({
      name: 'ADT_A01',
      messageType: 'ADT',
      trigger: 'A01',
      requiredSegments: ['MSH', 'EVN', 'PID', 'PV1'],
      requiredFields: {
        'MSH.10': 'Message control ID',
        'PID.3': 'Patient identifier',
        'PID.5.1': 'Patient family name',
        'PV1.2': 'Patient class (I/O/E)',
      },
      allowedValues: {
        'PID.8.1': ['F', 'M', 'O', 'U', 'A', 'N'],
        'PV1.2': ['I', 'O', 'E', 'P', 'R', 'B', 'C', 'N'],
      },
    }),

  /** A08 is "update patient information"; PV1 is often absent, so it is not required. */
  adtA08: (): Profile =>
    Profile.from({
      name: 'ADT_A08',
      messageType: 'ADT',
      trigger: 'A08',
      requiredSegments: ['MSH', 'EVN', 'PID'],
      requiredFields: {
        'MSH.10': 'Message control ID',
        'PID.3': 'Patient identifier',
        'PID.5.1': 'Patient family name',
      },
      allowedValues: { 'PID.8.1': ['F', 'M', 'O', 'U', 'A', 'N'] },
    }),

  oruR01: (): Profile =>
    Profile.from({
      name: 'ORU_R01',
      messageType: 'ORU',
      trigger: 'R01',
      requiredSegments: ['MSH', 'PID', 'OBR', 'OBX'],
      requiredFields: {
        'MSH.10': 'Message control ID',
        'PID.3': 'Patient identifier',
        'OBR.4.1': 'Universal service identifier',
        'OBX.5': 'Observation value',
      },
      allowedValues: { 'OBX.11': ['F', 'P', 'C', 'X'] },
    }),
};
