import { EdgeBuilder, RawProjection, BuildEdgeArgs } from '../edge';
import { ArgsBuilderData } from '../args';
import { numberSeqGenerator } from '../utils';
import { paramNameGen } from '../param';
import { Query } from './query';

export type QueryNameGen = Generator<string, string>;

export interface BuildQueryArgs extends BuildEdgeArgs {
  qNameGen?: QueryNameGen;
}

export function* queryNameGen(startI = 0): QueryNameGen {
  const numGen = numberSeqGenerator(startI);
  while (true) {
    yield 'q' + numGen.next().value;
  }
}

export class QueryBuilder extends EdgeBuilder {
  protected queryName?: string;

  constructor(type?: string, queryName?: string) {
    super(type, {});
    this.queryName = queryName;
  }

  /** set query name */
  name(name: string) {
    this.queryName = name;
    return this;
  }

  func(func: ArgsBuilderData['func']) {
    this.args.setArg('func', func);
    return this;
  }

  project(projection: EdgeBuilder | RawProjection<EdgeBuilder>) {
    return this.setEdges(projection);
  }

  buildQueryArgs(pNameGen = paramNameGen(), qNameGen = queryNameGen()) {
    return {
      ...super.buildEdgeArgs(pNameGen),
      queryName: this.queryName || qNameGen.next().value,
    };
  }

  build<
    A extends BuildQueryArgs
  >(args: Partial<A> = {}) {
    return new Query(
      this.buildQueryArgs(args.pNameGen, args.qNameGen)
    );
  }
}
