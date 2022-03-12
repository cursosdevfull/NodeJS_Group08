import { v4 as uuidv4 } from 'uuid';

export class Trace {
  private static instance: Trace = null;
  private traceId: string;

  private constructor() {}

  static getTraceId(start = false): string {
    if (!Trace.instance) {
      Trace.instance = new Trace();
      Trace.instance.traceId = uuidv4();
    } else if (start) {
      Trace.instance.traceId = uuidv4();
    }

    return Trace.instance.traceId;
  }
}
