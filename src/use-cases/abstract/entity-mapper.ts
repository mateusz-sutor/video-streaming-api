export abstract class EntityMapper<I, O> {
  abstract mapFrom(param: I): O;
  abstract mapTo(param: O): I;
}
