import { ObjectOrValue } from '../ts-helpers';

export type RawProjection<T> = ObjectOrValue<string | boolean | 0 | 1 | T>;
export type Projection<T> = { [name: string]: string | false | T };

export function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function indenter(depth = 0, indentation = '  ') {
  const prefix = indentation.repeat(depth);
  return (str = ''): string => prefix + str;
}
