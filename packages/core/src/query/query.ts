import { Edge, EdgeArgs, indenter } from '../edge';
import { Param } from '../param';

export interface QueryArgs extends EdgeArgs {
  queryName: string;
}

export class Query extends Edge {
  queryName: string;

  constructor(args: QueryArgs) {
    super(args);
    this.queryName = args.queryName;
  }

  projectionStr(extraDepth?: number) {
    return super.toString(extraDepth);
  }

  queryStr(extraDepth = 0) {
    const indent = indenter(extraDepth);

    return indent(
      this.queryName
      + this.projectionStr(extraDepth).trim()
    );
  }

  queryStrWithParams() {
    return `q(${
      Param.paramsDefineStr(this._params)
    }) {${
      this.queryStr(1)
    }\n}`;
  }

  toString() {
    return this.queryStrWithParams();
  }
}