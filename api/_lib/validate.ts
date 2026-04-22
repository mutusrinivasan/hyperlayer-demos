// Thin ajv wrapper. Today's three read tools take no input schema; write tools
// (sub-prompt 3) will pass their schemas here for body validation.

import Ajv, { type Schema } from 'ajv';

const ajv = new Ajv({ allErrors: true });

export type ValidationResult<T> =
  | { valid: true; data: T }
  | { valid: false; errors: string[] };

export function validate<T>(schema: Schema, body: unknown): ValidationResult<T> {
  const validator = ajv.compile<T>(schema);
  if (validator(body)) {
    return { valid: true, data: body };
  }
  const errors = (validator.errors ?? []).map(
    (e) => `${e.instancePath || '(root)'} ${e.message ?? 'invalid'}`,
  );
  return { valid: false, errors };
}
