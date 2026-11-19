import { Message } from './message';
import { Segment } from './segment';

/**
 * Acknowledgement builder.
 *
 * MSA-1 is the verdict (AA accepted, AE error, AR rejected) and MSA-2 echoes MSH-10, which is how
 * the sender correlates the ACK with what it sent. An ACK without that echo is indistinguishable
 * from a stale one.
 */
export class Ack {
  static readonly ACCEPT = 'AA';
  static readonly ERROR = 'AE';
  static readonly REJECT = 'AR';

  static build(inbound: Message, code: string = Ack.ACCEPT, text = ''): Message {
    const msh = inbound.segment('MSH');
    const now = new Date();
    const stamp =
      now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0') +
      String(now.getHours()).padStart(2, '0') +
      String(now.getMinutes()).padStart(2, '0') +
      String(now.getSeconds()).padStart(2, '0');
    const controlId = Math.random().toString(16).slice(2, 18);

    const mshFields = [
      '|',
      '^~\\&',
      msh?.get('5') ?? '',
      msh?.get('6') ?? '',
      msh?.get('3') ?? '',
      msh?.get('4') ?? '',
      stamp,
      '',
      'ACK',
      controlId,
      'P',
      msh?.get('12.1') || '2.5.1',
    ];
    const msa = new Segment('MSA', { 1: code, 2: inbound.controlId(), 3: text });

    return Message.fromSegments([Segment.fromParts(['MSH', ...mshFields.slice(1)]), msa]);
  }

  static error(inbound: Message, reason: string): Message {
    return Ack.build(inbound, Ack.ERROR, reason.slice(0, 200));
  }
}
