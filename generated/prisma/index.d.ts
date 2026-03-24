
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model TimelineEntry
 * 
 */
export type TimelineEntry = $Result.DefaultSelection<Prisma.$TimelineEntryPayload>
/**
 * Model ProjectMedia
 * 
 */
export type ProjectMedia = $Result.DefaultSelection<Prisma.$ProjectMediaPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ProjectStatus: {
  active: 'active',
  maintenance: 'maintenance',
  archived: 'archived'
};

export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus]


export const EntryType: {
  pr: 'pr',
  milestone: 'milestone',
  blog_post: 'blog_post',
  video: 'video',
  deployment: 'deployment',
  release: 'release'
};

export type EntryType = (typeof EntryType)[keyof typeof EntryType]


export const PRStatus: {
  merged: 'merged',
  closed: 'closed',
  open: 'open'
};

export type PRStatus = (typeof PRStatus)[keyof typeof PRStatus]

}

export type ProjectStatus = $Enums.ProjectStatus

export const ProjectStatus: typeof $Enums.ProjectStatus

export type EntryType = $Enums.EntryType

export const EntryType: typeof $Enums.EntryType

export type PRStatus = $Enums.PRStatus

export const PRStatus: typeof $Enums.PRStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Projects
 * const projects = await prisma.project.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Projects
   * const projects = await prisma.project.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.timelineEntry`: Exposes CRUD operations for the **TimelineEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TimelineEntries
    * const timelineEntries = await prisma.timelineEntry.findMany()
    * ```
    */
  get timelineEntry(): Prisma.TimelineEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectMedia`: Exposes CRUD operations for the **ProjectMedia** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectMedias
    * const projectMedias = await prisma.projectMedia.findMany()
    * ```
    */
  get projectMedia(): Prisma.ProjectMediaDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.5.0
   * Query Engine version: 280c870be64f457428992c43c1f6d557fab6e29e
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Project: 'Project',
    TimelineEntry: 'TimelineEntry',
    ProjectMedia: 'ProjectMedia'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "project" | "timelineEntry" | "projectMedia"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      TimelineEntry: {
        payload: Prisma.$TimelineEntryPayload<ExtArgs>
        fields: Prisma.TimelineEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TimelineEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TimelineEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEntryPayload>
          }
          findFirst: {
            args: Prisma.TimelineEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TimelineEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEntryPayload>
          }
          findMany: {
            args: Prisma.TimelineEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEntryPayload>[]
          }
          create: {
            args: Prisma.TimelineEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEntryPayload>
          }
          createMany: {
            args: Prisma.TimelineEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TimelineEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEntryPayload>[]
          }
          delete: {
            args: Prisma.TimelineEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEntryPayload>
          }
          update: {
            args: Prisma.TimelineEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEntryPayload>
          }
          deleteMany: {
            args: Prisma.TimelineEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TimelineEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TimelineEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEntryPayload>[]
          }
          upsert: {
            args: Prisma.TimelineEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimelineEntryPayload>
          }
          aggregate: {
            args: Prisma.TimelineEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTimelineEntry>
          }
          groupBy: {
            args: Prisma.TimelineEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<TimelineEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.TimelineEntryCountArgs<ExtArgs>
            result: $Utils.Optional<TimelineEntryCountAggregateOutputType> | number
          }
        }
      }
      ProjectMedia: {
        payload: Prisma.$ProjectMediaPayload<ExtArgs>
        fields: Prisma.ProjectMediaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectMediaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMediaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectMediaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMediaPayload>
          }
          findFirst: {
            args: Prisma.ProjectMediaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMediaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectMediaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMediaPayload>
          }
          findMany: {
            args: Prisma.ProjectMediaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMediaPayload>[]
          }
          create: {
            args: Prisma.ProjectMediaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMediaPayload>
          }
          createMany: {
            args: Prisma.ProjectMediaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectMediaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMediaPayload>[]
          }
          delete: {
            args: Prisma.ProjectMediaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMediaPayload>
          }
          update: {
            args: Prisma.ProjectMediaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMediaPayload>
          }
          deleteMany: {
            args: Prisma.ProjectMediaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectMediaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectMediaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMediaPayload>[]
          }
          upsert: {
            args: Prisma.ProjectMediaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMediaPayload>
          }
          aggregate: {
            args: Prisma.ProjectMediaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectMedia>
          }
          groupBy: {
            args: Prisma.ProjectMediaGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectMediaGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectMediaCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectMediaCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    project?: ProjectOmit
    timelineEntry?: TimelineEntryOmit
    projectMedia?: ProjectMediaOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    timeline_entries: number
    project_media: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    timeline_entries?: boolean | ProjectCountOutputTypeCountTimeline_entriesArgs
    project_media?: boolean | ProjectCountOutputTypeCountProject_mediaArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountTimeline_entriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimelineEntryWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountProject_mediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectMediaWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    title: string | null
    short_description: string | null
    long_description: string | null
    status: $Enums.ProjectStatus | null
    github_repo_url: string | null
    github_owner: string | null
    github_repo: string | null
    last_sync_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    title: string | null
    short_description: string | null
    long_description: string | null
    status: $Enums.ProjectStatus | null
    github_repo_url: string | null
    github_owner: string | null
    github_repo: string | null
    last_sync_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    title: number
    short_description: number
    long_description: number
    tech_stack: number
    status: number
    github_repo_url: number
    github_owner: number
    github_repo: number
    last_sync_at: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ProjectMinAggregateInputType = {
    id?: true
    title?: true
    short_description?: true
    long_description?: true
    status?: true
    github_repo_url?: true
    github_owner?: true
    github_repo?: true
    last_sync_at?: true
    created_at?: true
    updated_at?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    title?: true
    short_description?: true
    long_description?: true
    status?: true
    github_repo_url?: true
    github_owner?: true
    github_repo?: true
    last_sync_at?: true
    created_at?: true
    updated_at?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    title?: true
    short_description?: true
    long_description?: true
    tech_stack?: true
    status?: true
    github_repo_url?: true
    github_owner?: true
    github_repo?: true
    last_sync_at?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    title: string
    short_description: string
    long_description: string | null
    tech_stack: string[]
    status: $Enums.ProjectStatus
    github_repo_url: string | null
    github_owner: string | null
    github_repo: string | null
    last_sync_at: Date | null
    created_at: Date
    updated_at: Date
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    short_description?: boolean
    long_description?: boolean
    tech_stack?: boolean
    status?: boolean
    github_repo_url?: boolean
    github_owner?: boolean
    github_repo?: boolean
    last_sync_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    timeline_entries?: boolean | Project$timeline_entriesArgs<ExtArgs>
    project_media?: boolean | Project$project_mediaArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    short_description?: boolean
    long_description?: boolean
    tech_stack?: boolean
    status?: boolean
    github_repo_url?: boolean
    github_owner?: boolean
    github_repo?: boolean
    last_sync_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    short_description?: boolean
    long_description?: boolean
    tech_stack?: boolean
    status?: boolean
    github_repo_url?: boolean
    github_owner?: boolean
    github_repo?: boolean
    last_sync_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    title?: boolean
    short_description?: boolean
    long_description?: boolean
    tech_stack?: boolean
    status?: boolean
    github_repo_url?: boolean
    github_owner?: boolean
    github_repo?: boolean
    last_sync_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "short_description" | "long_description" | "tech_stack" | "status" | "github_repo_url" | "github_owner" | "github_repo" | "last_sync_at" | "created_at" | "updated_at", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    timeline_entries?: boolean | Project$timeline_entriesArgs<ExtArgs>
    project_media?: boolean | Project$project_mediaArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      timeline_entries: Prisma.$TimelineEntryPayload<ExtArgs>[]
      project_media: Prisma.$ProjectMediaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      short_description: string
      long_description: string | null
      tech_stack: string[]
      status: $Enums.ProjectStatus
      github_repo_url: string | null
      github_owner: string | null
      github_repo: string | null
      last_sync_at: Date | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    timeline_entries<T extends Project$timeline_entriesArgs<ExtArgs> = {}>(args?: Subset<T, Project$timeline_entriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimelineEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    project_media<T extends Project$project_mediaArgs<ExtArgs> = {}>(args?: Subset<T, Project$project_mediaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMediaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly title: FieldRef<"Project", 'String'>
    readonly short_description: FieldRef<"Project", 'String'>
    readonly long_description: FieldRef<"Project", 'String'>
    readonly tech_stack: FieldRef<"Project", 'String[]'>
    readonly status: FieldRef<"Project", 'ProjectStatus'>
    readonly github_repo_url: FieldRef<"Project", 'String'>
    readonly github_owner: FieldRef<"Project", 'String'>
    readonly github_repo: FieldRef<"Project", 'String'>
    readonly last_sync_at: FieldRef<"Project", 'DateTime'>
    readonly created_at: FieldRef<"Project", 'DateTime'>
    readonly updated_at: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.timeline_entries
   */
  export type Project$timeline_entriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEntry
     */
    select?: TimelineEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineEntry
     */
    omit?: TimelineEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineEntryInclude<ExtArgs> | null
    where?: TimelineEntryWhereInput
    orderBy?: TimelineEntryOrderByWithRelationInput | TimelineEntryOrderByWithRelationInput[]
    cursor?: TimelineEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TimelineEntryScalarFieldEnum | TimelineEntryScalarFieldEnum[]
  }

  /**
   * Project.project_media
   */
  export type Project$project_mediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMedia
     */
    select?: ProjectMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMedia
     */
    omit?: ProjectMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMediaInclude<ExtArgs> | null
    where?: ProjectMediaWhereInput
    orderBy?: ProjectMediaOrderByWithRelationInput | ProjectMediaOrderByWithRelationInput[]
    cursor?: ProjectMediaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectMediaScalarFieldEnum | ProjectMediaScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model TimelineEntry
   */

  export type AggregateTimelineEntry = {
    _count: TimelineEntryCountAggregateOutputType | null
    _avg: TimelineEntryAvgAggregateOutputType | null
    _sum: TimelineEntrySumAggregateOutputType | null
    _min: TimelineEntryMinAggregateOutputType | null
    _max: TimelineEntryMaxAggregateOutputType | null
  }

  export type TimelineEntryAvgAggregateOutputType = {
    sprint_number: number | null
    github_pr_number: number | null
  }

  export type TimelineEntrySumAggregateOutputType = {
    sprint_number: number | null
    github_pr_number: number | null
  }

  export type TimelineEntryMinAggregateOutputType = {
    id: string | null
    project_id: string | null
    entry_type: $Enums.EntryType | null
    date: Date | null
    sprint_number: number | null
    title: string | null
    description: string | null
    external_url: string | null
    external_title: string | null
    external_status: $Enums.PRStatus | null
    is_featured: boolean | null
    media_preview: string | null
    github_pr_number: number | null
    github_pr_title: string | null
    github_author: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TimelineEntryMaxAggregateOutputType = {
    id: string | null
    project_id: string | null
    entry_type: $Enums.EntryType | null
    date: Date | null
    sprint_number: number | null
    title: string | null
    description: string | null
    external_url: string | null
    external_title: string | null
    external_status: $Enums.PRStatus | null
    is_featured: boolean | null
    media_preview: string | null
    github_pr_number: number | null
    github_pr_title: string | null
    github_author: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TimelineEntryCountAggregateOutputType = {
    id: number
    project_id: number
    entry_type: number
    date: number
    sprint_number: number
    title: number
    description: number
    external_url: number
    external_title: number
    external_status: number
    is_featured: number
    media_preview: number
    github_pr_number: number
    github_pr_title: number
    github_author: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type TimelineEntryAvgAggregateInputType = {
    sprint_number?: true
    github_pr_number?: true
  }

  export type TimelineEntrySumAggregateInputType = {
    sprint_number?: true
    github_pr_number?: true
  }

  export type TimelineEntryMinAggregateInputType = {
    id?: true
    project_id?: true
    entry_type?: true
    date?: true
    sprint_number?: true
    title?: true
    description?: true
    external_url?: true
    external_title?: true
    external_status?: true
    is_featured?: true
    media_preview?: true
    github_pr_number?: true
    github_pr_title?: true
    github_author?: true
    created_at?: true
    updated_at?: true
  }

  export type TimelineEntryMaxAggregateInputType = {
    id?: true
    project_id?: true
    entry_type?: true
    date?: true
    sprint_number?: true
    title?: true
    description?: true
    external_url?: true
    external_title?: true
    external_status?: true
    is_featured?: true
    media_preview?: true
    github_pr_number?: true
    github_pr_title?: true
    github_author?: true
    created_at?: true
    updated_at?: true
  }

  export type TimelineEntryCountAggregateInputType = {
    id?: true
    project_id?: true
    entry_type?: true
    date?: true
    sprint_number?: true
    title?: true
    description?: true
    external_url?: true
    external_title?: true
    external_status?: true
    is_featured?: true
    media_preview?: true
    github_pr_number?: true
    github_pr_title?: true
    github_author?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type TimelineEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimelineEntry to aggregate.
     */
    where?: TimelineEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimelineEntries to fetch.
     */
    orderBy?: TimelineEntryOrderByWithRelationInput | TimelineEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TimelineEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimelineEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimelineEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TimelineEntries
    **/
    _count?: true | TimelineEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TimelineEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TimelineEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TimelineEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TimelineEntryMaxAggregateInputType
  }

  export type GetTimelineEntryAggregateType<T extends TimelineEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateTimelineEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTimelineEntry[P]>
      : GetScalarType<T[P], AggregateTimelineEntry[P]>
  }




  export type TimelineEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimelineEntryWhereInput
    orderBy?: TimelineEntryOrderByWithAggregationInput | TimelineEntryOrderByWithAggregationInput[]
    by: TimelineEntryScalarFieldEnum[] | TimelineEntryScalarFieldEnum
    having?: TimelineEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TimelineEntryCountAggregateInputType | true
    _avg?: TimelineEntryAvgAggregateInputType
    _sum?: TimelineEntrySumAggregateInputType
    _min?: TimelineEntryMinAggregateInputType
    _max?: TimelineEntryMaxAggregateInputType
  }

  export type TimelineEntryGroupByOutputType = {
    id: string
    project_id: string
    entry_type: $Enums.EntryType
    date: Date
    sprint_number: number
    title: string
    description: string | null
    external_url: string | null
    external_title: string | null
    external_status: $Enums.PRStatus | null
    is_featured: boolean
    media_preview: string | null
    github_pr_number: number | null
    github_pr_title: string | null
    github_author: string | null
    created_at: Date
    updated_at: Date
    _count: TimelineEntryCountAggregateOutputType | null
    _avg: TimelineEntryAvgAggregateOutputType | null
    _sum: TimelineEntrySumAggregateOutputType | null
    _min: TimelineEntryMinAggregateOutputType | null
    _max: TimelineEntryMaxAggregateOutputType | null
  }

  type GetTimelineEntryGroupByPayload<T extends TimelineEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TimelineEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TimelineEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TimelineEntryGroupByOutputType[P]>
            : GetScalarType<T[P], TimelineEntryGroupByOutputType[P]>
        }
      >
    >


  export type TimelineEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    project_id?: boolean
    entry_type?: boolean
    date?: boolean
    sprint_number?: boolean
    title?: boolean
    description?: boolean
    external_url?: boolean
    external_title?: boolean
    external_status?: boolean
    is_featured?: boolean
    media_preview?: boolean
    github_pr_number?: boolean
    github_pr_title?: boolean
    github_author?: boolean
    created_at?: boolean
    updated_at?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timelineEntry"]>

  export type TimelineEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    project_id?: boolean
    entry_type?: boolean
    date?: boolean
    sprint_number?: boolean
    title?: boolean
    description?: boolean
    external_url?: boolean
    external_title?: boolean
    external_status?: boolean
    is_featured?: boolean
    media_preview?: boolean
    github_pr_number?: boolean
    github_pr_title?: boolean
    github_author?: boolean
    created_at?: boolean
    updated_at?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timelineEntry"]>

  export type TimelineEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    project_id?: boolean
    entry_type?: boolean
    date?: boolean
    sprint_number?: boolean
    title?: boolean
    description?: boolean
    external_url?: boolean
    external_title?: boolean
    external_status?: boolean
    is_featured?: boolean
    media_preview?: boolean
    github_pr_number?: boolean
    github_pr_title?: boolean
    github_author?: boolean
    created_at?: boolean
    updated_at?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timelineEntry"]>

  export type TimelineEntrySelectScalar = {
    id?: boolean
    project_id?: boolean
    entry_type?: boolean
    date?: boolean
    sprint_number?: boolean
    title?: boolean
    description?: boolean
    external_url?: boolean
    external_title?: boolean
    external_status?: boolean
    is_featured?: boolean
    media_preview?: boolean
    github_pr_number?: boolean
    github_pr_title?: boolean
    github_author?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type TimelineEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "project_id" | "entry_type" | "date" | "sprint_number" | "title" | "description" | "external_url" | "external_title" | "external_status" | "is_featured" | "media_preview" | "github_pr_number" | "github_pr_title" | "github_author" | "created_at" | "updated_at", ExtArgs["result"]["timelineEntry"]>
  export type TimelineEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type TimelineEntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type TimelineEntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $TimelineEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TimelineEntry"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      project_id: string
      entry_type: $Enums.EntryType
      date: Date
      sprint_number: number
      title: string
      description: string | null
      external_url: string | null
      external_title: string | null
      external_status: $Enums.PRStatus | null
      is_featured: boolean
      media_preview: string | null
      github_pr_number: number | null
      github_pr_title: string | null
      github_author: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["timelineEntry"]>
    composites: {}
  }

  type TimelineEntryGetPayload<S extends boolean | null | undefined | TimelineEntryDefaultArgs> = $Result.GetResult<Prisma.$TimelineEntryPayload, S>

  type TimelineEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TimelineEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TimelineEntryCountAggregateInputType | true
    }

  export interface TimelineEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TimelineEntry'], meta: { name: 'TimelineEntry' } }
    /**
     * Find zero or one TimelineEntry that matches the filter.
     * @param {TimelineEntryFindUniqueArgs} args - Arguments to find a TimelineEntry
     * @example
     * // Get one TimelineEntry
     * const timelineEntry = await prisma.timelineEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TimelineEntryFindUniqueArgs>(args: SelectSubset<T, TimelineEntryFindUniqueArgs<ExtArgs>>): Prisma__TimelineEntryClient<$Result.GetResult<Prisma.$TimelineEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TimelineEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TimelineEntryFindUniqueOrThrowArgs} args - Arguments to find a TimelineEntry
     * @example
     * // Get one TimelineEntry
     * const timelineEntry = await prisma.timelineEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TimelineEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, TimelineEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TimelineEntryClient<$Result.GetResult<Prisma.$TimelineEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimelineEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineEntryFindFirstArgs} args - Arguments to find a TimelineEntry
     * @example
     * // Get one TimelineEntry
     * const timelineEntry = await prisma.timelineEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TimelineEntryFindFirstArgs>(args?: SelectSubset<T, TimelineEntryFindFirstArgs<ExtArgs>>): Prisma__TimelineEntryClient<$Result.GetResult<Prisma.$TimelineEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimelineEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineEntryFindFirstOrThrowArgs} args - Arguments to find a TimelineEntry
     * @example
     * // Get one TimelineEntry
     * const timelineEntry = await prisma.timelineEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TimelineEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, TimelineEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__TimelineEntryClient<$Result.GetResult<Prisma.$TimelineEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TimelineEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TimelineEntries
     * const timelineEntries = await prisma.timelineEntry.findMany()
     * 
     * // Get first 10 TimelineEntries
     * const timelineEntries = await prisma.timelineEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const timelineEntryWithIdOnly = await prisma.timelineEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TimelineEntryFindManyArgs>(args?: SelectSubset<T, TimelineEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimelineEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TimelineEntry.
     * @param {TimelineEntryCreateArgs} args - Arguments to create a TimelineEntry.
     * @example
     * // Create one TimelineEntry
     * const TimelineEntry = await prisma.timelineEntry.create({
     *   data: {
     *     // ... data to create a TimelineEntry
     *   }
     * })
     * 
     */
    create<T extends TimelineEntryCreateArgs>(args: SelectSubset<T, TimelineEntryCreateArgs<ExtArgs>>): Prisma__TimelineEntryClient<$Result.GetResult<Prisma.$TimelineEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TimelineEntries.
     * @param {TimelineEntryCreateManyArgs} args - Arguments to create many TimelineEntries.
     * @example
     * // Create many TimelineEntries
     * const timelineEntry = await prisma.timelineEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TimelineEntryCreateManyArgs>(args?: SelectSubset<T, TimelineEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TimelineEntries and returns the data saved in the database.
     * @param {TimelineEntryCreateManyAndReturnArgs} args - Arguments to create many TimelineEntries.
     * @example
     * // Create many TimelineEntries
     * const timelineEntry = await prisma.timelineEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TimelineEntries and only return the `id`
     * const timelineEntryWithIdOnly = await prisma.timelineEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TimelineEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, TimelineEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimelineEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TimelineEntry.
     * @param {TimelineEntryDeleteArgs} args - Arguments to delete one TimelineEntry.
     * @example
     * // Delete one TimelineEntry
     * const TimelineEntry = await prisma.timelineEntry.delete({
     *   where: {
     *     // ... filter to delete one TimelineEntry
     *   }
     * })
     * 
     */
    delete<T extends TimelineEntryDeleteArgs>(args: SelectSubset<T, TimelineEntryDeleteArgs<ExtArgs>>): Prisma__TimelineEntryClient<$Result.GetResult<Prisma.$TimelineEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TimelineEntry.
     * @param {TimelineEntryUpdateArgs} args - Arguments to update one TimelineEntry.
     * @example
     * // Update one TimelineEntry
     * const timelineEntry = await prisma.timelineEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TimelineEntryUpdateArgs>(args: SelectSubset<T, TimelineEntryUpdateArgs<ExtArgs>>): Prisma__TimelineEntryClient<$Result.GetResult<Prisma.$TimelineEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TimelineEntries.
     * @param {TimelineEntryDeleteManyArgs} args - Arguments to filter TimelineEntries to delete.
     * @example
     * // Delete a few TimelineEntries
     * const { count } = await prisma.timelineEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TimelineEntryDeleteManyArgs>(args?: SelectSubset<T, TimelineEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimelineEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TimelineEntries
     * const timelineEntry = await prisma.timelineEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TimelineEntryUpdateManyArgs>(args: SelectSubset<T, TimelineEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimelineEntries and returns the data updated in the database.
     * @param {TimelineEntryUpdateManyAndReturnArgs} args - Arguments to update many TimelineEntries.
     * @example
     * // Update many TimelineEntries
     * const timelineEntry = await prisma.timelineEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TimelineEntries and only return the `id`
     * const timelineEntryWithIdOnly = await prisma.timelineEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TimelineEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, TimelineEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimelineEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TimelineEntry.
     * @param {TimelineEntryUpsertArgs} args - Arguments to update or create a TimelineEntry.
     * @example
     * // Update or create a TimelineEntry
     * const timelineEntry = await prisma.timelineEntry.upsert({
     *   create: {
     *     // ... data to create a TimelineEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TimelineEntry we want to update
     *   }
     * })
     */
    upsert<T extends TimelineEntryUpsertArgs>(args: SelectSubset<T, TimelineEntryUpsertArgs<ExtArgs>>): Prisma__TimelineEntryClient<$Result.GetResult<Prisma.$TimelineEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TimelineEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineEntryCountArgs} args - Arguments to filter TimelineEntries to count.
     * @example
     * // Count the number of TimelineEntries
     * const count = await prisma.timelineEntry.count({
     *   where: {
     *     // ... the filter for the TimelineEntries we want to count
     *   }
     * })
    **/
    count<T extends TimelineEntryCountArgs>(
      args?: Subset<T, TimelineEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TimelineEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TimelineEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TimelineEntryAggregateArgs>(args: Subset<T, TimelineEntryAggregateArgs>): Prisma.PrismaPromise<GetTimelineEntryAggregateType<T>>

    /**
     * Group by TimelineEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimelineEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TimelineEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TimelineEntryGroupByArgs['orderBy'] }
        : { orderBy?: TimelineEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TimelineEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimelineEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TimelineEntry model
   */
  readonly fields: TimelineEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TimelineEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TimelineEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TimelineEntry model
   */
  interface TimelineEntryFieldRefs {
    readonly id: FieldRef<"TimelineEntry", 'String'>
    readonly project_id: FieldRef<"TimelineEntry", 'String'>
    readonly entry_type: FieldRef<"TimelineEntry", 'EntryType'>
    readonly date: FieldRef<"TimelineEntry", 'DateTime'>
    readonly sprint_number: FieldRef<"TimelineEntry", 'Int'>
    readonly title: FieldRef<"TimelineEntry", 'String'>
    readonly description: FieldRef<"TimelineEntry", 'String'>
    readonly external_url: FieldRef<"TimelineEntry", 'String'>
    readonly external_title: FieldRef<"TimelineEntry", 'String'>
    readonly external_status: FieldRef<"TimelineEntry", 'PRStatus'>
    readonly is_featured: FieldRef<"TimelineEntry", 'Boolean'>
    readonly media_preview: FieldRef<"TimelineEntry", 'String'>
    readonly github_pr_number: FieldRef<"TimelineEntry", 'Int'>
    readonly github_pr_title: FieldRef<"TimelineEntry", 'String'>
    readonly github_author: FieldRef<"TimelineEntry", 'String'>
    readonly created_at: FieldRef<"TimelineEntry", 'DateTime'>
    readonly updated_at: FieldRef<"TimelineEntry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TimelineEntry findUnique
   */
  export type TimelineEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEntry
     */
    select?: TimelineEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineEntry
     */
    omit?: TimelineEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineEntryInclude<ExtArgs> | null
    /**
     * Filter, which TimelineEntry to fetch.
     */
    where: TimelineEntryWhereUniqueInput
  }

  /**
   * TimelineEntry findUniqueOrThrow
   */
  export type TimelineEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEntry
     */
    select?: TimelineEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineEntry
     */
    omit?: TimelineEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineEntryInclude<ExtArgs> | null
    /**
     * Filter, which TimelineEntry to fetch.
     */
    where: TimelineEntryWhereUniqueInput
  }

  /**
   * TimelineEntry findFirst
   */
  export type TimelineEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEntry
     */
    select?: TimelineEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineEntry
     */
    omit?: TimelineEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineEntryInclude<ExtArgs> | null
    /**
     * Filter, which TimelineEntry to fetch.
     */
    where?: TimelineEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimelineEntries to fetch.
     */
    orderBy?: TimelineEntryOrderByWithRelationInput | TimelineEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimelineEntries.
     */
    cursor?: TimelineEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimelineEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimelineEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimelineEntries.
     */
    distinct?: TimelineEntryScalarFieldEnum | TimelineEntryScalarFieldEnum[]
  }

  /**
   * TimelineEntry findFirstOrThrow
   */
  export type TimelineEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEntry
     */
    select?: TimelineEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineEntry
     */
    omit?: TimelineEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineEntryInclude<ExtArgs> | null
    /**
     * Filter, which TimelineEntry to fetch.
     */
    where?: TimelineEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimelineEntries to fetch.
     */
    orderBy?: TimelineEntryOrderByWithRelationInput | TimelineEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimelineEntries.
     */
    cursor?: TimelineEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimelineEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimelineEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimelineEntries.
     */
    distinct?: TimelineEntryScalarFieldEnum | TimelineEntryScalarFieldEnum[]
  }

  /**
   * TimelineEntry findMany
   */
  export type TimelineEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEntry
     */
    select?: TimelineEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineEntry
     */
    omit?: TimelineEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineEntryInclude<ExtArgs> | null
    /**
     * Filter, which TimelineEntries to fetch.
     */
    where?: TimelineEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimelineEntries to fetch.
     */
    orderBy?: TimelineEntryOrderByWithRelationInput | TimelineEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TimelineEntries.
     */
    cursor?: TimelineEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimelineEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimelineEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimelineEntries.
     */
    distinct?: TimelineEntryScalarFieldEnum | TimelineEntryScalarFieldEnum[]
  }

  /**
   * TimelineEntry create
   */
  export type TimelineEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEntry
     */
    select?: TimelineEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineEntry
     */
    omit?: TimelineEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a TimelineEntry.
     */
    data: XOR<TimelineEntryCreateInput, TimelineEntryUncheckedCreateInput>
  }

  /**
   * TimelineEntry createMany
   */
  export type TimelineEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TimelineEntries.
     */
    data: TimelineEntryCreateManyInput | TimelineEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TimelineEntry createManyAndReturn
   */
  export type TimelineEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEntry
     */
    select?: TimelineEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineEntry
     */
    omit?: TimelineEntryOmit<ExtArgs> | null
    /**
     * The data used to create many TimelineEntries.
     */
    data: TimelineEntryCreateManyInput | TimelineEntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TimelineEntry update
   */
  export type TimelineEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEntry
     */
    select?: TimelineEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineEntry
     */
    omit?: TimelineEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a TimelineEntry.
     */
    data: XOR<TimelineEntryUpdateInput, TimelineEntryUncheckedUpdateInput>
    /**
     * Choose, which TimelineEntry to update.
     */
    where: TimelineEntryWhereUniqueInput
  }

  /**
   * TimelineEntry updateMany
   */
  export type TimelineEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TimelineEntries.
     */
    data: XOR<TimelineEntryUpdateManyMutationInput, TimelineEntryUncheckedUpdateManyInput>
    /**
     * Filter which TimelineEntries to update
     */
    where?: TimelineEntryWhereInput
    /**
     * Limit how many TimelineEntries to update.
     */
    limit?: number
  }

  /**
   * TimelineEntry updateManyAndReturn
   */
  export type TimelineEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEntry
     */
    select?: TimelineEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineEntry
     */
    omit?: TimelineEntryOmit<ExtArgs> | null
    /**
     * The data used to update TimelineEntries.
     */
    data: XOR<TimelineEntryUpdateManyMutationInput, TimelineEntryUncheckedUpdateManyInput>
    /**
     * Filter which TimelineEntries to update
     */
    where?: TimelineEntryWhereInput
    /**
     * Limit how many TimelineEntries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineEntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TimelineEntry upsert
   */
  export type TimelineEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEntry
     */
    select?: TimelineEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineEntry
     */
    omit?: TimelineEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the TimelineEntry to update in case it exists.
     */
    where: TimelineEntryWhereUniqueInput
    /**
     * In case the TimelineEntry found by the `where` argument doesn't exist, create a new TimelineEntry with this data.
     */
    create: XOR<TimelineEntryCreateInput, TimelineEntryUncheckedCreateInput>
    /**
     * In case the TimelineEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TimelineEntryUpdateInput, TimelineEntryUncheckedUpdateInput>
  }

  /**
   * TimelineEntry delete
   */
  export type TimelineEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEntry
     */
    select?: TimelineEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineEntry
     */
    omit?: TimelineEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineEntryInclude<ExtArgs> | null
    /**
     * Filter which TimelineEntry to delete.
     */
    where: TimelineEntryWhereUniqueInput
  }

  /**
   * TimelineEntry deleteMany
   */
  export type TimelineEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimelineEntries to delete
     */
    where?: TimelineEntryWhereInput
    /**
     * Limit how many TimelineEntries to delete.
     */
    limit?: number
  }

  /**
   * TimelineEntry without action
   */
  export type TimelineEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimelineEntry
     */
    select?: TimelineEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimelineEntry
     */
    omit?: TimelineEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimelineEntryInclude<ExtArgs> | null
  }


  /**
   * Model ProjectMedia
   */

  export type AggregateProjectMedia = {
    _count: ProjectMediaCountAggregateOutputType | null
    _min: ProjectMediaMinAggregateOutputType | null
    _max: ProjectMediaMaxAggregateOutputType | null
  }

  export type ProjectMediaMinAggregateOutputType = {
    id: string | null
    project_id: string | null
    storage_path: string | null
    public_url: string | null
    file_name: string | null
    created_at: Date | null
  }

  export type ProjectMediaMaxAggregateOutputType = {
    id: string | null
    project_id: string | null
    storage_path: string | null
    public_url: string | null
    file_name: string | null
    created_at: Date | null
  }

  export type ProjectMediaCountAggregateOutputType = {
    id: number
    project_id: number
    storage_path: number
    public_url: number
    file_name: number
    created_at: number
    _all: number
  }


  export type ProjectMediaMinAggregateInputType = {
    id?: true
    project_id?: true
    storage_path?: true
    public_url?: true
    file_name?: true
    created_at?: true
  }

  export type ProjectMediaMaxAggregateInputType = {
    id?: true
    project_id?: true
    storage_path?: true
    public_url?: true
    file_name?: true
    created_at?: true
  }

  export type ProjectMediaCountAggregateInputType = {
    id?: true
    project_id?: true
    storage_path?: true
    public_url?: true
    file_name?: true
    created_at?: true
    _all?: true
  }

  export type ProjectMediaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectMedia to aggregate.
     */
    where?: ProjectMediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMedias to fetch.
     */
    orderBy?: ProjectMediaOrderByWithRelationInput | ProjectMediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectMediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMedias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMedias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectMedias
    **/
    _count?: true | ProjectMediaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMediaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMediaMaxAggregateInputType
  }

  export type GetProjectMediaAggregateType<T extends ProjectMediaAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectMedia]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectMedia[P]>
      : GetScalarType<T[P], AggregateProjectMedia[P]>
  }




  export type ProjectMediaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectMediaWhereInput
    orderBy?: ProjectMediaOrderByWithAggregationInput | ProjectMediaOrderByWithAggregationInput[]
    by: ProjectMediaScalarFieldEnum[] | ProjectMediaScalarFieldEnum
    having?: ProjectMediaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectMediaCountAggregateInputType | true
    _min?: ProjectMediaMinAggregateInputType
    _max?: ProjectMediaMaxAggregateInputType
  }

  export type ProjectMediaGroupByOutputType = {
    id: string
    project_id: string
    storage_path: string
    public_url: string
    file_name: string
    created_at: Date
    _count: ProjectMediaCountAggregateOutputType | null
    _min: ProjectMediaMinAggregateOutputType | null
    _max: ProjectMediaMaxAggregateOutputType | null
  }

  type GetProjectMediaGroupByPayload<T extends ProjectMediaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectMediaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectMediaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectMediaGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectMediaGroupByOutputType[P]>
        }
      >
    >


  export type ProjectMediaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    project_id?: boolean
    storage_path?: boolean
    public_url?: boolean
    file_name?: boolean
    created_at?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectMedia"]>

  export type ProjectMediaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    project_id?: boolean
    storage_path?: boolean
    public_url?: boolean
    file_name?: boolean
    created_at?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectMedia"]>

  export type ProjectMediaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    project_id?: boolean
    storage_path?: boolean
    public_url?: boolean
    file_name?: boolean
    created_at?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectMedia"]>

  export type ProjectMediaSelectScalar = {
    id?: boolean
    project_id?: boolean
    storage_path?: boolean
    public_url?: boolean
    file_name?: boolean
    created_at?: boolean
  }

  export type ProjectMediaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "project_id" | "storage_path" | "public_url" | "file_name" | "created_at", ExtArgs["result"]["projectMedia"]>
  export type ProjectMediaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectMediaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectMediaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ProjectMediaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectMedia"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      project_id: string
      storage_path: string
      public_url: string
      file_name: string
      created_at: Date
    }, ExtArgs["result"]["projectMedia"]>
    composites: {}
  }

  type ProjectMediaGetPayload<S extends boolean | null | undefined | ProjectMediaDefaultArgs> = $Result.GetResult<Prisma.$ProjectMediaPayload, S>

  type ProjectMediaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectMediaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectMediaCountAggregateInputType | true
    }

  export interface ProjectMediaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectMedia'], meta: { name: 'ProjectMedia' } }
    /**
     * Find zero or one ProjectMedia that matches the filter.
     * @param {ProjectMediaFindUniqueArgs} args - Arguments to find a ProjectMedia
     * @example
     * // Get one ProjectMedia
     * const projectMedia = await prisma.projectMedia.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectMediaFindUniqueArgs>(args: SelectSubset<T, ProjectMediaFindUniqueArgs<ExtArgs>>): Prisma__ProjectMediaClient<$Result.GetResult<Prisma.$ProjectMediaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectMedia that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectMediaFindUniqueOrThrowArgs} args - Arguments to find a ProjectMedia
     * @example
     * // Get one ProjectMedia
     * const projectMedia = await prisma.projectMedia.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectMediaFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectMediaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectMediaClient<$Result.GetResult<Prisma.$ProjectMediaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectMedia that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMediaFindFirstArgs} args - Arguments to find a ProjectMedia
     * @example
     * // Get one ProjectMedia
     * const projectMedia = await prisma.projectMedia.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectMediaFindFirstArgs>(args?: SelectSubset<T, ProjectMediaFindFirstArgs<ExtArgs>>): Prisma__ProjectMediaClient<$Result.GetResult<Prisma.$ProjectMediaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectMedia that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMediaFindFirstOrThrowArgs} args - Arguments to find a ProjectMedia
     * @example
     * // Get one ProjectMedia
     * const projectMedia = await prisma.projectMedia.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectMediaFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectMediaFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectMediaClient<$Result.GetResult<Prisma.$ProjectMediaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectMedias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMediaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectMedias
     * const projectMedias = await prisma.projectMedia.findMany()
     * 
     * // Get first 10 ProjectMedias
     * const projectMedias = await prisma.projectMedia.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectMediaWithIdOnly = await prisma.projectMedia.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectMediaFindManyArgs>(args?: SelectSubset<T, ProjectMediaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMediaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectMedia.
     * @param {ProjectMediaCreateArgs} args - Arguments to create a ProjectMedia.
     * @example
     * // Create one ProjectMedia
     * const ProjectMedia = await prisma.projectMedia.create({
     *   data: {
     *     // ... data to create a ProjectMedia
     *   }
     * })
     * 
     */
    create<T extends ProjectMediaCreateArgs>(args: SelectSubset<T, ProjectMediaCreateArgs<ExtArgs>>): Prisma__ProjectMediaClient<$Result.GetResult<Prisma.$ProjectMediaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectMedias.
     * @param {ProjectMediaCreateManyArgs} args - Arguments to create many ProjectMedias.
     * @example
     * // Create many ProjectMedias
     * const projectMedia = await prisma.projectMedia.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectMediaCreateManyArgs>(args?: SelectSubset<T, ProjectMediaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectMedias and returns the data saved in the database.
     * @param {ProjectMediaCreateManyAndReturnArgs} args - Arguments to create many ProjectMedias.
     * @example
     * // Create many ProjectMedias
     * const projectMedia = await prisma.projectMedia.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectMedias and only return the `id`
     * const projectMediaWithIdOnly = await prisma.projectMedia.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectMediaCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectMediaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMediaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectMedia.
     * @param {ProjectMediaDeleteArgs} args - Arguments to delete one ProjectMedia.
     * @example
     * // Delete one ProjectMedia
     * const ProjectMedia = await prisma.projectMedia.delete({
     *   where: {
     *     // ... filter to delete one ProjectMedia
     *   }
     * })
     * 
     */
    delete<T extends ProjectMediaDeleteArgs>(args: SelectSubset<T, ProjectMediaDeleteArgs<ExtArgs>>): Prisma__ProjectMediaClient<$Result.GetResult<Prisma.$ProjectMediaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectMedia.
     * @param {ProjectMediaUpdateArgs} args - Arguments to update one ProjectMedia.
     * @example
     * // Update one ProjectMedia
     * const projectMedia = await prisma.projectMedia.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectMediaUpdateArgs>(args: SelectSubset<T, ProjectMediaUpdateArgs<ExtArgs>>): Prisma__ProjectMediaClient<$Result.GetResult<Prisma.$ProjectMediaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectMedias.
     * @param {ProjectMediaDeleteManyArgs} args - Arguments to filter ProjectMedias to delete.
     * @example
     * // Delete a few ProjectMedias
     * const { count } = await prisma.projectMedia.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectMediaDeleteManyArgs>(args?: SelectSubset<T, ProjectMediaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectMedias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMediaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectMedias
     * const projectMedia = await prisma.projectMedia.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectMediaUpdateManyArgs>(args: SelectSubset<T, ProjectMediaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectMedias and returns the data updated in the database.
     * @param {ProjectMediaUpdateManyAndReturnArgs} args - Arguments to update many ProjectMedias.
     * @example
     * // Update many ProjectMedias
     * const projectMedia = await prisma.projectMedia.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectMedias and only return the `id`
     * const projectMediaWithIdOnly = await prisma.projectMedia.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectMediaUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectMediaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMediaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectMedia.
     * @param {ProjectMediaUpsertArgs} args - Arguments to update or create a ProjectMedia.
     * @example
     * // Update or create a ProjectMedia
     * const projectMedia = await prisma.projectMedia.upsert({
     *   create: {
     *     // ... data to create a ProjectMedia
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectMedia we want to update
     *   }
     * })
     */
    upsert<T extends ProjectMediaUpsertArgs>(args: SelectSubset<T, ProjectMediaUpsertArgs<ExtArgs>>): Prisma__ProjectMediaClient<$Result.GetResult<Prisma.$ProjectMediaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectMedias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMediaCountArgs} args - Arguments to filter ProjectMedias to count.
     * @example
     * // Count the number of ProjectMedias
     * const count = await prisma.projectMedia.count({
     *   where: {
     *     // ... the filter for the ProjectMedias we want to count
     *   }
     * })
    **/
    count<T extends ProjectMediaCountArgs>(
      args?: Subset<T, ProjectMediaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectMediaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectMedia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMediaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectMediaAggregateArgs>(args: Subset<T, ProjectMediaAggregateArgs>): Prisma.PrismaPromise<GetProjectMediaAggregateType<T>>

    /**
     * Group by ProjectMedia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMediaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectMediaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectMediaGroupByArgs['orderBy'] }
        : { orderBy?: ProjectMediaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectMediaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectMediaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectMedia model
   */
  readonly fields: ProjectMediaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectMedia.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectMediaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectMedia model
   */
  interface ProjectMediaFieldRefs {
    readonly id: FieldRef<"ProjectMedia", 'String'>
    readonly project_id: FieldRef<"ProjectMedia", 'String'>
    readonly storage_path: FieldRef<"ProjectMedia", 'String'>
    readonly public_url: FieldRef<"ProjectMedia", 'String'>
    readonly file_name: FieldRef<"ProjectMedia", 'String'>
    readonly created_at: FieldRef<"ProjectMedia", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectMedia findUnique
   */
  export type ProjectMediaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMedia
     */
    select?: ProjectMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMedia
     */
    omit?: ProjectMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMediaInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMedia to fetch.
     */
    where: ProjectMediaWhereUniqueInput
  }

  /**
   * ProjectMedia findUniqueOrThrow
   */
  export type ProjectMediaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMedia
     */
    select?: ProjectMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMedia
     */
    omit?: ProjectMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMediaInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMedia to fetch.
     */
    where: ProjectMediaWhereUniqueInput
  }

  /**
   * ProjectMedia findFirst
   */
  export type ProjectMediaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMedia
     */
    select?: ProjectMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMedia
     */
    omit?: ProjectMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMediaInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMedia to fetch.
     */
    where?: ProjectMediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMedias to fetch.
     */
    orderBy?: ProjectMediaOrderByWithRelationInput | ProjectMediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectMedias.
     */
    cursor?: ProjectMediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMedias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMedias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectMedias.
     */
    distinct?: ProjectMediaScalarFieldEnum | ProjectMediaScalarFieldEnum[]
  }

  /**
   * ProjectMedia findFirstOrThrow
   */
  export type ProjectMediaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMedia
     */
    select?: ProjectMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMedia
     */
    omit?: ProjectMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMediaInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMedia to fetch.
     */
    where?: ProjectMediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMedias to fetch.
     */
    orderBy?: ProjectMediaOrderByWithRelationInput | ProjectMediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectMedias.
     */
    cursor?: ProjectMediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMedias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMedias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectMedias.
     */
    distinct?: ProjectMediaScalarFieldEnum | ProjectMediaScalarFieldEnum[]
  }

  /**
   * ProjectMedia findMany
   */
  export type ProjectMediaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMedia
     */
    select?: ProjectMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMedia
     */
    omit?: ProjectMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMediaInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMedias to fetch.
     */
    where?: ProjectMediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMedias to fetch.
     */
    orderBy?: ProjectMediaOrderByWithRelationInput | ProjectMediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectMedias.
     */
    cursor?: ProjectMediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMedias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMedias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectMedias.
     */
    distinct?: ProjectMediaScalarFieldEnum | ProjectMediaScalarFieldEnum[]
  }

  /**
   * ProjectMedia create
   */
  export type ProjectMediaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMedia
     */
    select?: ProjectMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMedia
     */
    omit?: ProjectMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMediaInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectMedia.
     */
    data: XOR<ProjectMediaCreateInput, ProjectMediaUncheckedCreateInput>
  }

  /**
   * ProjectMedia createMany
   */
  export type ProjectMediaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectMedias.
     */
    data: ProjectMediaCreateManyInput | ProjectMediaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectMedia createManyAndReturn
   */
  export type ProjectMediaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMedia
     */
    select?: ProjectMediaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMedia
     */
    omit?: ProjectMediaOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectMedias.
     */
    data: ProjectMediaCreateManyInput | ProjectMediaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMediaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectMedia update
   */
  export type ProjectMediaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMedia
     */
    select?: ProjectMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMedia
     */
    omit?: ProjectMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMediaInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectMedia.
     */
    data: XOR<ProjectMediaUpdateInput, ProjectMediaUncheckedUpdateInput>
    /**
     * Choose, which ProjectMedia to update.
     */
    where: ProjectMediaWhereUniqueInput
  }

  /**
   * ProjectMedia updateMany
   */
  export type ProjectMediaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectMedias.
     */
    data: XOR<ProjectMediaUpdateManyMutationInput, ProjectMediaUncheckedUpdateManyInput>
    /**
     * Filter which ProjectMedias to update
     */
    where?: ProjectMediaWhereInput
    /**
     * Limit how many ProjectMedias to update.
     */
    limit?: number
  }

  /**
   * ProjectMedia updateManyAndReturn
   */
  export type ProjectMediaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMedia
     */
    select?: ProjectMediaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMedia
     */
    omit?: ProjectMediaOmit<ExtArgs> | null
    /**
     * The data used to update ProjectMedias.
     */
    data: XOR<ProjectMediaUpdateManyMutationInput, ProjectMediaUncheckedUpdateManyInput>
    /**
     * Filter which ProjectMedias to update
     */
    where?: ProjectMediaWhereInput
    /**
     * Limit how many ProjectMedias to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMediaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectMedia upsert
   */
  export type ProjectMediaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMedia
     */
    select?: ProjectMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMedia
     */
    omit?: ProjectMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMediaInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectMedia to update in case it exists.
     */
    where: ProjectMediaWhereUniqueInput
    /**
     * In case the ProjectMedia found by the `where` argument doesn't exist, create a new ProjectMedia with this data.
     */
    create: XOR<ProjectMediaCreateInput, ProjectMediaUncheckedCreateInput>
    /**
     * In case the ProjectMedia was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectMediaUpdateInput, ProjectMediaUncheckedUpdateInput>
  }

  /**
   * ProjectMedia delete
   */
  export type ProjectMediaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMedia
     */
    select?: ProjectMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMedia
     */
    omit?: ProjectMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMediaInclude<ExtArgs> | null
    /**
     * Filter which ProjectMedia to delete.
     */
    where: ProjectMediaWhereUniqueInput
  }

  /**
   * ProjectMedia deleteMany
   */
  export type ProjectMediaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectMedias to delete
     */
    where?: ProjectMediaWhereInput
    /**
     * Limit how many ProjectMedias to delete.
     */
    limit?: number
  }

  /**
   * ProjectMedia without action
   */
  export type ProjectMediaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMedia
     */
    select?: ProjectMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMedia
     */
    omit?: ProjectMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMediaInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    title: 'title',
    short_description: 'short_description',
    long_description: 'long_description',
    tech_stack: 'tech_stack',
    status: 'status',
    github_repo_url: 'github_repo_url',
    github_owner: 'github_owner',
    github_repo: 'github_repo',
    last_sync_at: 'last_sync_at',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const TimelineEntryScalarFieldEnum: {
    id: 'id',
    project_id: 'project_id',
    entry_type: 'entry_type',
    date: 'date',
    sprint_number: 'sprint_number',
    title: 'title',
    description: 'description',
    external_url: 'external_url',
    external_title: 'external_title',
    external_status: 'external_status',
    is_featured: 'is_featured',
    media_preview: 'media_preview',
    github_pr_number: 'github_pr_number',
    github_pr_title: 'github_pr_title',
    github_author: 'github_author',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type TimelineEntryScalarFieldEnum = (typeof TimelineEntryScalarFieldEnum)[keyof typeof TimelineEntryScalarFieldEnum]


  export const ProjectMediaScalarFieldEnum: {
    id: 'id',
    project_id: 'project_id',
    storage_path: 'storage_path',
    public_url: 'public_url',
    file_name: 'file_name',
    created_at: 'created_at'
  };

  export type ProjectMediaScalarFieldEnum = (typeof ProjectMediaScalarFieldEnum)[keyof typeof ProjectMediaScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'ProjectStatus'
   */
  export type EnumProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectStatus'>
    


  /**
   * Reference to a field of type 'ProjectStatus[]'
   */
  export type ListEnumProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'EntryType'
   */
  export type EnumEntryTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EntryType'>
    


  /**
   * Reference to a field of type 'EntryType[]'
   */
  export type ListEnumEntryTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EntryType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'PRStatus'
   */
  export type EnumPRStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PRStatus'>
    


  /**
   * Reference to a field of type 'PRStatus[]'
   */
  export type ListEnumPRStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PRStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    title?: StringFilter<"Project"> | string
    short_description?: StringFilter<"Project"> | string
    long_description?: StringNullableFilter<"Project"> | string | null
    tech_stack?: StringNullableListFilter<"Project">
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    github_repo_url?: StringNullableFilter<"Project"> | string | null
    github_owner?: StringNullableFilter<"Project"> | string | null
    github_repo?: StringNullableFilter<"Project"> | string | null
    last_sync_at?: DateTimeNullableFilter<"Project"> | Date | string | null
    created_at?: DateTimeFilter<"Project"> | Date | string
    updated_at?: DateTimeFilter<"Project"> | Date | string
    timeline_entries?: TimelineEntryListRelationFilter
    project_media?: ProjectMediaListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    short_description?: SortOrder
    long_description?: SortOrderInput | SortOrder
    tech_stack?: SortOrder
    status?: SortOrder
    github_repo_url?: SortOrderInput | SortOrder
    github_owner?: SortOrderInput | SortOrder
    github_repo?: SortOrderInput | SortOrder
    last_sync_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    timeline_entries?: TimelineEntryOrderByRelationAggregateInput
    project_media?: ProjectMediaOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    github_repo_url?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    title?: StringFilter<"Project"> | string
    short_description?: StringFilter<"Project"> | string
    long_description?: StringNullableFilter<"Project"> | string | null
    tech_stack?: StringNullableListFilter<"Project">
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    github_owner?: StringNullableFilter<"Project"> | string | null
    github_repo?: StringNullableFilter<"Project"> | string | null
    last_sync_at?: DateTimeNullableFilter<"Project"> | Date | string | null
    created_at?: DateTimeFilter<"Project"> | Date | string
    updated_at?: DateTimeFilter<"Project"> | Date | string
    timeline_entries?: TimelineEntryListRelationFilter
    project_media?: ProjectMediaListRelationFilter
  }, "id" | "github_repo_url">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    short_description?: SortOrder
    long_description?: SortOrderInput | SortOrder
    tech_stack?: SortOrder
    status?: SortOrder
    github_repo_url?: SortOrderInput | SortOrder
    github_owner?: SortOrderInput | SortOrder
    github_repo?: SortOrderInput | SortOrder
    last_sync_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    title?: StringWithAggregatesFilter<"Project"> | string
    short_description?: StringWithAggregatesFilter<"Project"> | string
    long_description?: StringNullableWithAggregatesFilter<"Project"> | string | null
    tech_stack?: StringNullableListFilter<"Project">
    status?: EnumProjectStatusWithAggregatesFilter<"Project"> | $Enums.ProjectStatus
    github_repo_url?: StringNullableWithAggregatesFilter<"Project"> | string | null
    github_owner?: StringNullableWithAggregatesFilter<"Project"> | string | null
    github_repo?: StringNullableWithAggregatesFilter<"Project"> | string | null
    last_sync_at?: DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type TimelineEntryWhereInput = {
    AND?: TimelineEntryWhereInput | TimelineEntryWhereInput[]
    OR?: TimelineEntryWhereInput[]
    NOT?: TimelineEntryWhereInput | TimelineEntryWhereInput[]
    id?: StringFilter<"TimelineEntry"> | string
    project_id?: StringFilter<"TimelineEntry"> | string
    entry_type?: EnumEntryTypeFilter<"TimelineEntry"> | $Enums.EntryType
    date?: DateTimeFilter<"TimelineEntry"> | Date | string
    sprint_number?: IntFilter<"TimelineEntry"> | number
    title?: StringFilter<"TimelineEntry"> | string
    description?: StringNullableFilter<"TimelineEntry"> | string | null
    external_url?: StringNullableFilter<"TimelineEntry"> | string | null
    external_title?: StringNullableFilter<"TimelineEntry"> | string | null
    external_status?: EnumPRStatusNullableFilter<"TimelineEntry"> | $Enums.PRStatus | null
    is_featured?: BoolFilter<"TimelineEntry"> | boolean
    media_preview?: StringNullableFilter<"TimelineEntry"> | string | null
    github_pr_number?: IntNullableFilter<"TimelineEntry"> | number | null
    github_pr_title?: StringNullableFilter<"TimelineEntry"> | string | null
    github_author?: StringNullableFilter<"TimelineEntry"> | string | null
    created_at?: DateTimeFilter<"TimelineEntry"> | Date | string
    updated_at?: DateTimeFilter<"TimelineEntry"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type TimelineEntryOrderByWithRelationInput = {
    id?: SortOrder
    project_id?: SortOrder
    entry_type?: SortOrder
    date?: SortOrder
    sprint_number?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    external_url?: SortOrderInput | SortOrder
    external_title?: SortOrderInput | SortOrder
    external_status?: SortOrderInput | SortOrder
    is_featured?: SortOrder
    media_preview?: SortOrderInput | SortOrder
    github_pr_number?: SortOrderInput | SortOrder
    github_pr_title?: SortOrderInput | SortOrder
    github_author?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type TimelineEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    project_id_github_pr_number?: TimelineEntryProject_idGithub_pr_numberCompoundUniqueInput
    AND?: TimelineEntryWhereInput | TimelineEntryWhereInput[]
    OR?: TimelineEntryWhereInput[]
    NOT?: TimelineEntryWhereInput | TimelineEntryWhereInput[]
    project_id?: StringFilter<"TimelineEntry"> | string
    entry_type?: EnumEntryTypeFilter<"TimelineEntry"> | $Enums.EntryType
    date?: DateTimeFilter<"TimelineEntry"> | Date | string
    sprint_number?: IntFilter<"TimelineEntry"> | number
    title?: StringFilter<"TimelineEntry"> | string
    description?: StringNullableFilter<"TimelineEntry"> | string | null
    external_url?: StringNullableFilter<"TimelineEntry"> | string | null
    external_title?: StringNullableFilter<"TimelineEntry"> | string | null
    external_status?: EnumPRStatusNullableFilter<"TimelineEntry"> | $Enums.PRStatus | null
    is_featured?: BoolFilter<"TimelineEntry"> | boolean
    media_preview?: StringNullableFilter<"TimelineEntry"> | string | null
    github_pr_number?: IntNullableFilter<"TimelineEntry"> | number | null
    github_pr_title?: StringNullableFilter<"TimelineEntry"> | string | null
    github_author?: StringNullableFilter<"TimelineEntry"> | string | null
    created_at?: DateTimeFilter<"TimelineEntry"> | Date | string
    updated_at?: DateTimeFilter<"TimelineEntry"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id" | "project_id_github_pr_number">

  export type TimelineEntryOrderByWithAggregationInput = {
    id?: SortOrder
    project_id?: SortOrder
    entry_type?: SortOrder
    date?: SortOrder
    sprint_number?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    external_url?: SortOrderInput | SortOrder
    external_title?: SortOrderInput | SortOrder
    external_status?: SortOrderInput | SortOrder
    is_featured?: SortOrder
    media_preview?: SortOrderInput | SortOrder
    github_pr_number?: SortOrderInput | SortOrder
    github_pr_title?: SortOrderInput | SortOrder
    github_author?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: TimelineEntryCountOrderByAggregateInput
    _avg?: TimelineEntryAvgOrderByAggregateInput
    _max?: TimelineEntryMaxOrderByAggregateInput
    _min?: TimelineEntryMinOrderByAggregateInput
    _sum?: TimelineEntrySumOrderByAggregateInput
  }

  export type TimelineEntryScalarWhereWithAggregatesInput = {
    AND?: TimelineEntryScalarWhereWithAggregatesInput | TimelineEntryScalarWhereWithAggregatesInput[]
    OR?: TimelineEntryScalarWhereWithAggregatesInput[]
    NOT?: TimelineEntryScalarWhereWithAggregatesInput | TimelineEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TimelineEntry"> | string
    project_id?: StringWithAggregatesFilter<"TimelineEntry"> | string
    entry_type?: EnumEntryTypeWithAggregatesFilter<"TimelineEntry"> | $Enums.EntryType
    date?: DateTimeWithAggregatesFilter<"TimelineEntry"> | Date | string
    sprint_number?: IntWithAggregatesFilter<"TimelineEntry"> | number
    title?: StringWithAggregatesFilter<"TimelineEntry"> | string
    description?: StringNullableWithAggregatesFilter<"TimelineEntry"> | string | null
    external_url?: StringNullableWithAggregatesFilter<"TimelineEntry"> | string | null
    external_title?: StringNullableWithAggregatesFilter<"TimelineEntry"> | string | null
    external_status?: EnumPRStatusNullableWithAggregatesFilter<"TimelineEntry"> | $Enums.PRStatus | null
    is_featured?: BoolWithAggregatesFilter<"TimelineEntry"> | boolean
    media_preview?: StringNullableWithAggregatesFilter<"TimelineEntry"> | string | null
    github_pr_number?: IntNullableWithAggregatesFilter<"TimelineEntry"> | number | null
    github_pr_title?: StringNullableWithAggregatesFilter<"TimelineEntry"> | string | null
    github_author?: StringNullableWithAggregatesFilter<"TimelineEntry"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"TimelineEntry"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"TimelineEntry"> | Date | string
  }

  export type ProjectMediaWhereInput = {
    AND?: ProjectMediaWhereInput | ProjectMediaWhereInput[]
    OR?: ProjectMediaWhereInput[]
    NOT?: ProjectMediaWhereInput | ProjectMediaWhereInput[]
    id?: StringFilter<"ProjectMedia"> | string
    project_id?: StringFilter<"ProjectMedia"> | string
    storage_path?: StringFilter<"ProjectMedia"> | string
    public_url?: StringFilter<"ProjectMedia"> | string
    file_name?: StringFilter<"ProjectMedia"> | string
    created_at?: DateTimeFilter<"ProjectMedia"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type ProjectMediaOrderByWithRelationInput = {
    id?: SortOrder
    project_id?: SortOrder
    storage_path?: SortOrder
    public_url?: SortOrder
    file_name?: SortOrder
    created_at?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type ProjectMediaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectMediaWhereInput | ProjectMediaWhereInput[]
    OR?: ProjectMediaWhereInput[]
    NOT?: ProjectMediaWhereInput | ProjectMediaWhereInput[]
    project_id?: StringFilter<"ProjectMedia"> | string
    storage_path?: StringFilter<"ProjectMedia"> | string
    public_url?: StringFilter<"ProjectMedia"> | string
    file_name?: StringFilter<"ProjectMedia"> | string
    created_at?: DateTimeFilter<"ProjectMedia"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type ProjectMediaOrderByWithAggregationInput = {
    id?: SortOrder
    project_id?: SortOrder
    storage_path?: SortOrder
    public_url?: SortOrder
    file_name?: SortOrder
    created_at?: SortOrder
    _count?: ProjectMediaCountOrderByAggregateInput
    _max?: ProjectMediaMaxOrderByAggregateInput
    _min?: ProjectMediaMinOrderByAggregateInput
  }

  export type ProjectMediaScalarWhereWithAggregatesInput = {
    AND?: ProjectMediaScalarWhereWithAggregatesInput | ProjectMediaScalarWhereWithAggregatesInput[]
    OR?: ProjectMediaScalarWhereWithAggregatesInput[]
    NOT?: ProjectMediaScalarWhereWithAggregatesInput | ProjectMediaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProjectMedia"> | string
    project_id?: StringWithAggregatesFilter<"ProjectMedia"> | string
    storage_path?: StringWithAggregatesFilter<"ProjectMedia"> | string
    public_url?: StringWithAggregatesFilter<"ProjectMedia"> | string
    file_name?: StringWithAggregatesFilter<"ProjectMedia"> | string
    created_at?: DateTimeWithAggregatesFilter<"ProjectMedia"> | Date | string
  }

  export type ProjectCreateInput = {
    id?: string
    title: string
    short_description: string
    long_description?: string | null
    tech_stack?: ProjectCreatetech_stackInput | string[]
    status?: $Enums.ProjectStatus
    github_repo_url?: string | null
    github_owner?: string | null
    github_repo?: string | null
    last_sync_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    timeline_entries?: TimelineEntryCreateNestedManyWithoutProjectInput
    project_media?: ProjectMediaCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    title: string
    short_description: string
    long_description?: string | null
    tech_stack?: ProjectCreatetech_stackInput | string[]
    status?: $Enums.ProjectStatus
    github_repo_url?: string | null
    github_owner?: string | null
    github_repo?: string | null
    last_sync_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    timeline_entries?: TimelineEntryUncheckedCreateNestedManyWithoutProjectInput
    project_media?: ProjectMediaUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    short_description?: StringFieldUpdateOperationsInput | string
    long_description?: NullableStringFieldUpdateOperationsInput | string | null
    tech_stack?: ProjectUpdatetech_stackInput | string[]
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    github_repo_url?: NullableStringFieldUpdateOperationsInput | string | null
    github_owner?: NullableStringFieldUpdateOperationsInput | string | null
    github_repo?: NullableStringFieldUpdateOperationsInput | string | null
    last_sync_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    timeline_entries?: TimelineEntryUpdateManyWithoutProjectNestedInput
    project_media?: ProjectMediaUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    short_description?: StringFieldUpdateOperationsInput | string
    long_description?: NullableStringFieldUpdateOperationsInput | string | null
    tech_stack?: ProjectUpdatetech_stackInput | string[]
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    github_repo_url?: NullableStringFieldUpdateOperationsInput | string | null
    github_owner?: NullableStringFieldUpdateOperationsInput | string | null
    github_repo?: NullableStringFieldUpdateOperationsInput | string | null
    last_sync_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    timeline_entries?: TimelineEntryUncheckedUpdateManyWithoutProjectNestedInput
    project_media?: ProjectMediaUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    title: string
    short_description: string
    long_description?: string | null
    tech_stack?: ProjectCreatetech_stackInput | string[]
    status?: $Enums.ProjectStatus
    github_repo_url?: string | null
    github_owner?: string | null
    github_repo?: string | null
    last_sync_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    short_description?: StringFieldUpdateOperationsInput | string
    long_description?: NullableStringFieldUpdateOperationsInput | string | null
    tech_stack?: ProjectUpdatetech_stackInput | string[]
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    github_repo_url?: NullableStringFieldUpdateOperationsInput | string | null
    github_owner?: NullableStringFieldUpdateOperationsInput | string | null
    github_repo?: NullableStringFieldUpdateOperationsInput | string | null
    last_sync_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    short_description?: StringFieldUpdateOperationsInput | string
    long_description?: NullableStringFieldUpdateOperationsInput | string | null
    tech_stack?: ProjectUpdatetech_stackInput | string[]
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    github_repo_url?: NullableStringFieldUpdateOperationsInput | string | null
    github_owner?: NullableStringFieldUpdateOperationsInput | string | null
    github_repo?: NullableStringFieldUpdateOperationsInput | string | null
    last_sync_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimelineEntryCreateInput = {
    id?: string
    entry_type: $Enums.EntryType
    date: Date | string
    sprint_number: number
    title: string
    description?: string | null
    external_url?: string | null
    external_title?: string | null
    external_status?: $Enums.PRStatus | null
    is_featured?: boolean
    media_preview?: string | null
    github_pr_number?: number | null
    github_pr_title?: string | null
    github_author?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    project: ProjectCreateNestedOneWithoutTimeline_entriesInput
  }

  export type TimelineEntryUncheckedCreateInput = {
    id?: string
    project_id: string
    entry_type: $Enums.EntryType
    date: Date | string
    sprint_number: number
    title: string
    description?: string | null
    external_url?: string | null
    external_title?: string | null
    external_status?: $Enums.PRStatus | null
    is_featured?: boolean
    media_preview?: string | null
    github_pr_number?: number | null
    github_pr_title?: string | null
    github_author?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TimelineEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    entry_type?: EnumEntryTypeFieldUpdateOperationsInput | $Enums.EntryType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    sprint_number?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    external_url?: NullableStringFieldUpdateOperationsInput | string | null
    external_title?: NullableStringFieldUpdateOperationsInput | string | null
    external_status?: NullableEnumPRStatusFieldUpdateOperationsInput | $Enums.PRStatus | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    media_preview?: NullableStringFieldUpdateOperationsInput | string | null
    github_pr_number?: NullableIntFieldUpdateOperationsInput | number | null
    github_pr_title?: NullableStringFieldUpdateOperationsInput | string | null
    github_author?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutTimeline_entriesNestedInput
  }

  export type TimelineEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    project_id?: StringFieldUpdateOperationsInput | string
    entry_type?: EnumEntryTypeFieldUpdateOperationsInput | $Enums.EntryType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    sprint_number?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    external_url?: NullableStringFieldUpdateOperationsInput | string | null
    external_title?: NullableStringFieldUpdateOperationsInput | string | null
    external_status?: NullableEnumPRStatusFieldUpdateOperationsInput | $Enums.PRStatus | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    media_preview?: NullableStringFieldUpdateOperationsInput | string | null
    github_pr_number?: NullableIntFieldUpdateOperationsInput | number | null
    github_pr_title?: NullableStringFieldUpdateOperationsInput | string | null
    github_author?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimelineEntryCreateManyInput = {
    id?: string
    project_id: string
    entry_type: $Enums.EntryType
    date: Date | string
    sprint_number: number
    title: string
    description?: string | null
    external_url?: string | null
    external_title?: string | null
    external_status?: $Enums.PRStatus | null
    is_featured?: boolean
    media_preview?: string | null
    github_pr_number?: number | null
    github_pr_title?: string | null
    github_author?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TimelineEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    entry_type?: EnumEntryTypeFieldUpdateOperationsInput | $Enums.EntryType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    sprint_number?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    external_url?: NullableStringFieldUpdateOperationsInput | string | null
    external_title?: NullableStringFieldUpdateOperationsInput | string | null
    external_status?: NullableEnumPRStatusFieldUpdateOperationsInput | $Enums.PRStatus | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    media_preview?: NullableStringFieldUpdateOperationsInput | string | null
    github_pr_number?: NullableIntFieldUpdateOperationsInput | number | null
    github_pr_title?: NullableStringFieldUpdateOperationsInput | string | null
    github_author?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimelineEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    project_id?: StringFieldUpdateOperationsInput | string
    entry_type?: EnumEntryTypeFieldUpdateOperationsInput | $Enums.EntryType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    sprint_number?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    external_url?: NullableStringFieldUpdateOperationsInput | string | null
    external_title?: NullableStringFieldUpdateOperationsInput | string | null
    external_status?: NullableEnumPRStatusFieldUpdateOperationsInput | $Enums.PRStatus | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    media_preview?: NullableStringFieldUpdateOperationsInput | string | null
    github_pr_number?: NullableIntFieldUpdateOperationsInput | number | null
    github_pr_title?: NullableStringFieldUpdateOperationsInput | string | null
    github_author?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMediaCreateInput = {
    id?: string
    storage_path: string
    public_url: string
    file_name: string
    created_at?: Date | string
    project: ProjectCreateNestedOneWithoutProject_mediaInput
  }

  export type ProjectMediaUncheckedCreateInput = {
    id?: string
    project_id: string
    storage_path: string
    public_url: string
    file_name: string
    created_at?: Date | string
  }

  export type ProjectMediaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    storage_path?: StringFieldUpdateOperationsInput | string
    public_url?: StringFieldUpdateOperationsInput | string
    file_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutProject_mediaNestedInput
  }

  export type ProjectMediaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    project_id?: StringFieldUpdateOperationsInput | string
    storage_path?: StringFieldUpdateOperationsInput | string
    public_url?: StringFieldUpdateOperationsInput | string
    file_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMediaCreateManyInput = {
    id?: string
    project_id: string
    storage_path: string
    public_url: string
    file_name: string
    created_at?: Date | string
  }

  export type ProjectMediaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    storage_path?: StringFieldUpdateOperationsInput | string
    public_url?: StringFieldUpdateOperationsInput | string
    file_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMediaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    project_id?: StringFieldUpdateOperationsInput | string
    storage_path?: StringFieldUpdateOperationsInput | string
    public_url?: StringFieldUpdateOperationsInput | string
    file_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusFilter<$PrismaModel> | $Enums.ProjectStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TimelineEntryListRelationFilter = {
    every?: TimelineEntryWhereInput
    some?: TimelineEntryWhereInput
    none?: TimelineEntryWhereInput
  }

  export type ProjectMediaListRelationFilter = {
    every?: ProjectMediaWhereInput
    some?: ProjectMediaWhereInput
    none?: ProjectMediaWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TimelineEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectMediaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    short_description?: SortOrder
    long_description?: SortOrder
    tech_stack?: SortOrder
    status?: SortOrder
    github_repo_url?: SortOrder
    github_owner?: SortOrder
    github_repo?: SortOrder
    last_sync_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    short_description?: SortOrder
    long_description?: SortOrder
    status?: SortOrder
    github_repo_url?: SortOrder
    github_owner?: SortOrder
    github_repo?: SortOrder
    last_sync_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    short_description?: SortOrder
    long_description?: SortOrder
    status?: SortOrder
    github_repo_url?: SortOrder
    github_owner?: SortOrder
    github_repo?: SortOrder
    last_sync_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumProjectStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumEntryTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EntryType | EnumEntryTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EntryType[] | ListEnumEntryTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EntryType[] | ListEnumEntryTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEntryTypeFilter<$PrismaModel> | $Enums.EntryType
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumPRStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.PRStatus | EnumPRStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.PRStatus[] | ListEnumPRStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PRStatus[] | ListEnumPRStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPRStatusNullableFilter<$PrismaModel> | $Enums.PRStatus | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type TimelineEntryProject_idGithub_pr_numberCompoundUniqueInput = {
    project_id: string
    github_pr_number: number
  }

  export type TimelineEntryCountOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    entry_type?: SortOrder
    date?: SortOrder
    sprint_number?: SortOrder
    title?: SortOrder
    description?: SortOrder
    external_url?: SortOrder
    external_title?: SortOrder
    external_status?: SortOrder
    is_featured?: SortOrder
    media_preview?: SortOrder
    github_pr_number?: SortOrder
    github_pr_title?: SortOrder
    github_author?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TimelineEntryAvgOrderByAggregateInput = {
    sprint_number?: SortOrder
    github_pr_number?: SortOrder
  }

  export type TimelineEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    entry_type?: SortOrder
    date?: SortOrder
    sprint_number?: SortOrder
    title?: SortOrder
    description?: SortOrder
    external_url?: SortOrder
    external_title?: SortOrder
    external_status?: SortOrder
    is_featured?: SortOrder
    media_preview?: SortOrder
    github_pr_number?: SortOrder
    github_pr_title?: SortOrder
    github_author?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TimelineEntryMinOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    entry_type?: SortOrder
    date?: SortOrder
    sprint_number?: SortOrder
    title?: SortOrder
    description?: SortOrder
    external_url?: SortOrder
    external_title?: SortOrder
    external_status?: SortOrder
    is_featured?: SortOrder
    media_preview?: SortOrder
    github_pr_number?: SortOrder
    github_pr_title?: SortOrder
    github_author?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TimelineEntrySumOrderByAggregateInput = {
    sprint_number?: SortOrder
    github_pr_number?: SortOrder
  }

  export type EnumEntryTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EntryType | EnumEntryTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EntryType[] | ListEnumEntryTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EntryType[] | ListEnumEntryTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEntryTypeWithAggregatesFilter<$PrismaModel> | $Enums.EntryType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEntryTypeFilter<$PrismaModel>
    _max?: NestedEnumEntryTypeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumPRStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PRStatus | EnumPRStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.PRStatus[] | ListEnumPRStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PRStatus[] | ListEnumPRStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPRStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.PRStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumPRStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumPRStatusNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ProjectMediaCountOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    storage_path?: SortOrder
    public_url?: SortOrder
    file_name?: SortOrder
    created_at?: SortOrder
  }

  export type ProjectMediaMaxOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    storage_path?: SortOrder
    public_url?: SortOrder
    file_name?: SortOrder
    created_at?: SortOrder
  }

  export type ProjectMediaMinOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    storage_path?: SortOrder
    public_url?: SortOrder
    file_name?: SortOrder
    created_at?: SortOrder
  }

  export type ProjectCreatetech_stackInput = {
    set: string[]
  }

  export type TimelineEntryCreateNestedManyWithoutProjectInput = {
    create?: XOR<TimelineEntryCreateWithoutProjectInput, TimelineEntryUncheckedCreateWithoutProjectInput> | TimelineEntryCreateWithoutProjectInput[] | TimelineEntryUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TimelineEntryCreateOrConnectWithoutProjectInput | TimelineEntryCreateOrConnectWithoutProjectInput[]
    createMany?: TimelineEntryCreateManyProjectInputEnvelope
    connect?: TimelineEntryWhereUniqueInput | TimelineEntryWhereUniqueInput[]
  }

  export type ProjectMediaCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectMediaCreateWithoutProjectInput, ProjectMediaUncheckedCreateWithoutProjectInput> | ProjectMediaCreateWithoutProjectInput[] | ProjectMediaUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectMediaCreateOrConnectWithoutProjectInput | ProjectMediaCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectMediaCreateManyProjectInputEnvelope
    connect?: ProjectMediaWhereUniqueInput | ProjectMediaWhereUniqueInput[]
  }

  export type TimelineEntryUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<TimelineEntryCreateWithoutProjectInput, TimelineEntryUncheckedCreateWithoutProjectInput> | TimelineEntryCreateWithoutProjectInput[] | TimelineEntryUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TimelineEntryCreateOrConnectWithoutProjectInput | TimelineEntryCreateOrConnectWithoutProjectInput[]
    createMany?: TimelineEntryCreateManyProjectInputEnvelope
    connect?: TimelineEntryWhereUniqueInput | TimelineEntryWhereUniqueInput[]
  }

  export type ProjectMediaUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectMediaCreateWithoutProjectInput, ProjectMediaUncheckedCreateWithoutProjectInput> | ProjectMediaCreateWithoutProjectInput[] | ProjectMediaUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectMediaCreateOrConnectWithoutProjectInput | ProjectMediaCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectMediaCreateManyProjectInputEnvelope
    connect?: ProjectMediaWhereUniqueInput | ProjectMediaWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ProjectUpdatetech_stackInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumProjectStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProjectStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TimelineEntryUpdateManyWithoutProjectNestedInput = {
    create?: XOR<TimelineEntryCreateWithoutProjectInput, TimelineEntryUncheckedCreateWithoutProjectInput> | TimelineEntryCreateWithoutProjectInput[] | TimelineEntryUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TimelineEntryCreateOrConnectWithoutProjectInput | TimelineEntryCreateOrConnectWithoutProjectInput[]
    upsert?: TimelineEntryUpsertWithWhereUniqueWithoutProjectInput | TimelineEntryUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: TimelineEntryCreateManyProjectInputEnvelope
    set?: TimelineEntryWhereUniqueInput | TimelineEntryWhereUniqueInput[]
    disconnect?: TimelineEntryWhereUniqueInput | TimelineEntryWhereUniqueInput[]
    delete?: TimelineEntryWhereUniqueInput | TimelineEntryWhereUniqueInput[]
    connect?: TimelineEntryWhereUniqueInput | TimelineEntryWhereUniqueInput[]
    update?: TimelineEntryUpdateWithWhereUniqueWithoutProjectInput | TimelineEntryUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: TimelineEntryUpdateManyWithWhereWithoutProjectInput | TimelineEntryUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: TimelineEntryScalarWhereInput | TimelineEntryScalarWhereInput[]
  }

  export type ProjectMediaUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectMediaCreateWithoutProjectInput, ProjectMediaUncheckedCreateWithoutProjectInput> | ProjectMediaCreateWithoutProjectInput[] | ProjectMediaUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectMediaCreateOrConnectWithoutProjectInput | ProjectMediaCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectMediaUpsertWithWhereUniqueWithoutProjectInput | ProjectMediaUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectMediaCreateManyProjectInputEnvelope
    set?: ProjectMediaWhereUniqueInput | ProjectMediaWhereUniqueInput[]
    disconnect?: ProjectMediaWhereUniqueInput | ProjectMediaWhereUniqueInput[]
    delete?: ProjectMediaWhereUniqueInput | ProjectMediaWhereUniqueInput[]
    connect?: ProjectMediaWhereUniqueInput | ProjectMediaWhereUniqueInput[]
    update?: ProjectMediaUpdateWithWhereUniqueWithoutProjectInput | ProjectMediaUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectMediaUpdateManyWithWhereWithoutProjectInput | ProjectMediaUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectMediaScalarWhereInput | ProjectMediaScalarWhereInput[]
  }

  export type TimelineEntryUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<TimelineEntryCreateWithoutProjectInput, TimelineEntryUncheckedCreateWithoutProjectInput> | TimelineEntryCreateWithoutProjectInput[] | TimelineEntryUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TimelineEntryCreateOrConnectWithoutProjectInput | TimelineEntryCreateOrConnectWithoutProjectInput[]
    upsert?: TimelineEntryUpsertWithWhereUniqueWithoutProjectInput | TimelineEntryUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: TimelineEntryCreateManyProjectInputEnvelope
    set?: TimelineEntryWhereUniqueInput | TimelineEntryWhereUniqueInput[]
    disconnect?: TimelineEntryWhereUniqueInput | TimelineEntryWhereUniqueInput[]
    delete?: TimelineEntryWhereUniqueInput | TimelineEntryWhereUniqueInput[]
    connect?: TimelineEntryWhereUniqueInput | TimelineEntryWhereUniqueInput[]
    update?: TimelineEntryUpdateWithWhereUniqueWithoutProjectInput | TimelineEntryUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: TimelineEntryUpdateManyWithWhereWithoutProjectInput | TimelineEntryUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: TimelineEntryScalarWhereInput | TimelineEntryScalarWhereInput[]
  }

  export type ProjectMediaUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectMediaCreateWithoutProjectInput, ProjectMediaUncheckedCreateWithoutProjectInput> | ProjectMediaCreateWithoutProjectInput[] | ProjectMediaUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectMediaCreateOrConnectWithoutProjectInput | ProjectMediaCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectMediaUpsertWithWhereUniqueWithoutProjectInput | ProjectMediaUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectMediaCreateManyProjectInputEnvelope
    set?: ProjectMediaWhereUniqueInput | ProjectMediaWhereUniqueInput[]
    disconnect?: ProjectMediaWhereUniqueInput | ProjectMediaWhereUniqueInput[]
    delete?: ProjectMediaWhereUniqueInput | ProjectMediaWhereUniqueInput[]
    connect?: ProjectMediaWhereUniqueInput | ProjectMediaWhereUniqueInput[]
    update?: ProjectMediaUpdateWithWhereUniqueWithoutProjectInput | ProjectMediaUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectMediaUpdateManyWithWhereWithoutProjectInput | ProjectMediaUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectMediaScalarWhereInput | ProjectMediaScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutTimeline_entriesInput = {
    create?: XOR<ProjectCreateWithoutTimeline_entriesInput, ProjectUncheckedCreateWithoutTimeline_entriesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutTimeline_entriesInput
    connect?: ProjectWhereUniqueInput
  }

  export type EnumEntryTypeFieldUpdateOperationsInput = {
    set?: $Enums.EntryType
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumPRStatusFieldUpdateOperationsInput = {
    set?: $Enums.PRStatus | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProjectUpdateOneRequiredWithoutTimeline_entriesNestedInput = {
    create?: XOR<ProjectCreateWithoutTimeline_entriesInput, ProjectUncheckedCreateWithoutTimeline_entriesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutTimeline_entriesInput
    upsert?: ProjectUpsertWithoutTimeline_entriesInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutTimeline_entriesInput, ProjectUpdateWithoutTimeline_entriesInput>, ProjectUncheckedUpdateWithoutTimeline_entriesInput>
  }

  export type ProjectCreateNestedOneWithoutProject_mediaInput = {
    create?: XOR<ProjectCreateWithoutProject_mediaInput, ProjectUncheckedCreateWithoutProject_mediaInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutProject_mediaInput
    connect?: ProjectWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutProject_mediaNestedInput = {
    create?: XOR<ProjectCreateWithoutProject_mediaInput, ProjectUncheckedCreateWithoutProject_mediaInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutProject_mediaInput
    upsert?: ProjectUpsertWithoutProject_mediaInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutProject_mediaInput, ProjectUpdateWithoutProject_mediaInput>, ProjectUncheckedUpdateWithoutProject_mediaInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusFilter<$PrismaModel> | $Enums.ProjectStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumProjectStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumEntryTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EntryType | EnumEntryTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EntryType[] | ListEnumEntryTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EntryType[] | ListEnumEntryTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEntryTypeFilter<$PrismaModel> | $Enums.EntryType
  }

  export type NestedEnumPRStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.PRStatus | EnumPRStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.PRStatus[] | ListEnumPRStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PRStatus[] | ListEnumPRStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPRStatusNullableFilter<$PrismaModel> | $Enums.PRStatus | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumEntryTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EntryType | EnumEntryTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EntryType[] | ListEnumEntryTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EntryType[] | ListEnumEntryTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEntryTypeWithAggregatesFilter<$PrismaModel> | $Enums.EntryType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEntryTypeFilter<$PrismaModel>
    _max?: NestedEnumEntryTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumPRStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PRStatus | EnumPRStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.PRStatus[] | ListEnumPRStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PRStatus[] | ListEnumPRStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPRStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.PRStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumPRStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumPRStatusNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type TimelineEntryCreateWithoutProjectInput = {
    id?: string
    entry_type: $Enums.EntryType
    date: Date | string
    sprint_number: number
    title: string
    description?: string | null
    external_url?: string | null
    external_title?: string | null
    external_status?: $Enums.PRStatus | null
    is_featured?: boolean
    media_preview?: string | null
    github_pr_number?: number | null
    github_pr_title?: string | null
    github_author?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TimelineEntryUncheckedCreateWithoutProjectInput = {
    id?: string
    entry_type: $Enums.EntryType
    date: Date | string
    sprint_number: number
    title: string
    description?: string | null
    external_url?: string | null
    external_title?: string | null
    external_status?: $Enums.PRStatus | null
    is_featured?: boolean
    media_preview?: string | null
    github_pr_number?: number | null
    github_pr_title?: string | null
    github_author?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TimelineEntryCreateOrConnectWithoutProjectInput = {
    where: TimelineEntryWhereUniqueInput
    create: XOR<TimelineEntryCreateWithoutProjectInput, TimelineEntryUncheckedCreateWithoutProjectInput>
  }

  export type TimelineEntryCreateManyProjectInputEnvelope = {
    data: TimelineEntryCreateManyProjectInput | TimelineEntryCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type ProjectMediaCreateWithoutProjectInput = {
    id?: string
    storage_path: string
    public_url: string
    file_name: string
    created_at?: Date | string
  }

  export type ProjectMediaUncheckedCreateWithoutProjectInput = {
    id?: string
    storage_path: string
    public_url: string
    file_name: string
    created_at?: Date | string
  }

  export type ProjectMediaCreateOrConnectWithoutProjectInput = {
    where: ProjectMediaWhereUniqueInput
    create: XOR<ProjectMediaCreateWithoutProjectInput, ProjectMediaUncheckedCreateWithoutProjectInput>
  }

  export type ProjectMediaCreateManyProjectInputEnvelope = {
    data: ProjectMediaCreateManyProjectInput | ProjectMediaCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type TimelineEntryUpsertWithWhereUniqueWithoutProjectInput = {
    where: TimelineEntryWhereUniqueInput
    update: XOR<TimelineEntryUpdateWithoutProjectInput, TimelineEntryUncheckedUpdateWithoutProjectInput>
    create: XOR<TimelineEntryCreateWithoutProjectInput, TimelineEntryUncheckedCreateWithoutProjectInput>
  }

  export type TimelineEntryUpdateWithWhereUniqueWithoutProjectInput = {
    where: TimelineEntryWhereUniqueInput
    data: XOR<TimelineEntryUpdateWithoutProjectInput, TimelineEntryUncheckedUpdateWithoutProjectInput>
  }

  export type TimelineEntryUpdateManyWithWhereWithoutProjectInput = {
    where: TimelineEntryScalarWhereInput
    data: XOR<TimelineEntryUpdateManyMutationInput, TimelineEntryUncheckedUpdateManyWithoutProjectInput>
  }

  export type TimelineEntryScalarWhereInput = {
    AND?: TimelineEntryScalarWhereInput | TimelineEntryScalarWhereInput[]
    OR?: TimelineEntryScalarWhereInput[]
    NOT?: TimelineEntryScalarWhereInput | TimelineEntryScalarWhereInput[]
    id?: StringFilter<"TimelineEntry"> | string
    project_id?: StringFilter<"TimelineEntry"> | string
    entry_type?: EnumEntryTypeFilter<"TimelineEntry"> | $Enums.EntryType
    date?: DateTimeFilter<"TimelineEntry"> | Date | string
    sprint_number?: IntFilter<"TimelineEntry"> | number
    title?: StringFilter<"TimelineEntry"> | string
    description?: StringNullableFilter<"TimelineEntry"> | string | null
    external_url?: StringNullableFilter<"TimelineEntry"> | string | null
    external_title?: StringNullableFilter<"TimelineEntry"> | string | null
    external_status?: EnumPRStatusNullableFilter<"TimelineEntry"> | $Enums.PRStatus | null
    is_featured?: BoolFilter<"TimelineEntry"> | boolean
    media_preview?: StringNullableFilter<"TimelineEntry"> | string | null
    github_pr_number?: IntNullableFilter<"TimelineEntry"> | number | null
    github_pr_title?: StringNullableFilter<"TimelineEntry"> | string | null
    github_author?: StringNullableFilter<"TimelineEntry"> | string | null
    created_at?: DateTimeFilter<"TimelineEntry"> | Date | string
    updated_at?: DateTimeFilter<"TimelineEntry"> | Date | string
  }

  export type ProjectMediaUpsertWithWhereUniqueWithoutProjectInput = {
    where: ProjectMediaWhereUniqueInput
    update: XOR<ProjectMediaUpdateWithoutProjectInput, ProjectMediaUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectMediaCreateWithoutProjectInput, ProjectMediaUncheckedCreateWithoutProjectInput>
  }

  export type ProjectMediaUpdateWithWhereUniqueWithoutProjectInput = {
    where: ProjectMediaWhereUniqueInput
    data: XOR<ProjectMediaUpdateWithoutProjectInput, ProjectMediaUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectMediaUpdateManyWithWhereWithoutProjectInput = {
    where: ProjectMediaScalarWhereInput
    data: XOR<ProjectMediaUpdateManyMutationInput, ProjectMediaUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProjectMediaScalarWhereInput = {
    AND?: ProjectMediaScalarWhereInput | ProjectMediaScalarWhereInput[]
    OR?: ProjectMediaScalarWhereInput[]
    NOT?: ProjectMediaScalarWhereInput | ProjectMediaScalarWhereInput[]
    id?: StringFilter<"ProjectMedia"> | string
    project_id?: StringFilter<"ProjectMedia"> | string
    storage_path?: StringFilter<"ProjectMedia"> | string
    public_url?: StringFilter<"ProjectMedia"> | string
    file_name?: StringFilter<"ProjectMedia"> | string
    created_at?: DateTimeFilter<"ProjectMedia"> | Date | string
  }

  export type ProjectCreateWithoutTimeline_entriesInput = {
    id?: string
    title: string
    short_description: string
    long_description?: string | null
    tech_stack?: ProjectCreatetech_stackInput | string[]
    status?: $Enums.ProjectStatus
    github_repo_url?: string | null
    github_owner?: string | null
    github_repo?: string | null
    last_sync_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    project_media?: ProjectMediaCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutTimeline_entriesInput = {
    id?: string
    title: string
    short_description: string
    long_description?: string | null
    tech_stack?: ProjectCreatetech_stackInput | string[]
    status?: $Enums.ProjectStatus
    github_repo_url?: string | null
    github_owner?: string | null
    github_repo?: string | null
    last_sync_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    project_media?: ProjectMediaUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutTimeline_entriesInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutTimeline_entriesInput, ProjectUncheckedCreateWithoutTimeline_entriesInput>
  }

  export type ProjectUpsertWithoutTimeline_entriesInput = {
    update: XOR<ProjectUpdateWithoutTimeline_entriesInput, ProjectUncheckedUpdateWithoutTimeline_entriesInput>
    create: XOR<ProjectCreateWithoutTimeline_entriesInput, ProjectUncheckedCreateWithoutTimeline_entriesInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutTimeline_entriesInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutTimeline_entriesInput, ProjectUncheckedUpdateWithoutTimeline_entriesInput>
  }

  export type ProjectUpdateWithoutTimeline_entriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    short_description?: StringFieldUpdateOperationsInput | string
    long_description?: NullableStringFieldUpdateOperationsInput | string | null
    tech_stack?: ProjectUpdatetech_stackInput | string[]
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    github_repo_url?: NullableStringFieldUpdateOperationsInput | string | null
    github_owner?: NullableStringFieldUpdateOperationsInput | string | null
    github_repo?: NullableStringFieldUpdateOperationsInput | string | null
    last_sync_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    project_media?: ProjectMediaUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutTimeline_entriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    short_description?: StringFieldUpdateOperationsInput | string
    long_description?: NullableStringFieldUpdateOperationsInput | string | null
    tech_stack?: ProjectUpdatetech_stackInput | string[]
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    github_repo_url?: NullableStringFieldUpdateOperationsInput | string | null
    github_owner?: NullableStringFieldUpdateOperationsInput | string | null
    github_repo?: NullableStringFieldUpdateOperationsInput | string | null
    last_sync_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    project_media?: ProjectMediaUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutProject_mediaInput = {
    id?: string
    title: string
    short_description: string
    long_description?: string | null
    tech_stack?: ProjectCreatetech_stackInput | string[]
    status?: $Enums.ProjectStatus
    github_repo_url?: string | null
    github_owner?: string | null
    github_repo?: string | null
    last_sync_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    timeline_entries?: TimelineEntryCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutProject_mediaInput = {
    id?: string
    title: string
    short_description: string
    long_description?: string | null
    tech_stack?: ProjectCreatetech_stackInput | string[]
    status?: $Enums.ProjectStatus
    github_repo_url?: string | null
    github_owner?: string | null
    github_repo?: string | null
    last_sync_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    timeline_entries?: TimelineEntryUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutProject_mediaInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutProject_mediaInput, ProjectUncheckedCreateWithoutProject_mediaInput>
  }

  export type ProjectUpsertWithoutProject_mediaInput = {
    update: XOR<ProjectUpdateWithoutProject_mediaInput, ProjectUncheckedUpdateWithoutProject_mediaInput>
    create: XOR<ProjectCreateWithoutProject_mediaInput, ProjectUncheckedCreateWithoutProject_mediaInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutProject_mediaInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutProject_mediaInput, ProjectUncheckedUpdateWithoutProject_mediaInput>
  }

  export type ProjectUpdateWithoutProject_mediaInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    short_description?: StringFieldUpdateOperationsInput | string
    long_description?: NullableStringFieldUpdateOperationsInput | string | null
    tech_stack?: ProjectUpdatetech_stackInput | string[]
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    github_repo_url?: NullableStringFieldUpdateOperationsInput | string | null
    github_owner?: NullableStringFieldUpdateOperationsInput | string | null
    github_repo?: NullableStringFieldUpdateOperationsInput | string | null
    last_sync_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    timeline_entries?: TimelineEntryUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutProject_mediaInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    short_description?: StringFieldUpdateOperationsInput | string
    long_description?: NullableStringFieldUpdateOperationsInput | string | null
    tech_stack?: ProjectUpdatetech_stackInput | string[]
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    github_repo_url?: NullableStringFieldUpdateOperationsInput | string | null
    github_owner?: NullableStringFieldUpdateOperationsInput | string | null
    github_repo?: NullableStringFieldUpdateOperationsInput | string | null
    last_sync_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    timeline_entries?: TimelineEntryUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type TimelineEntryCreateManyProjectInput = {
    id?: string
    entry_type: $Enums.EntryType
    date: Date | string
    sprint_number: number
    title: string
    description?: string | null
    external_url?: string | null
    external_title?: string | null
    external_status?: $Enums.PRStatus | null
    is_featured?: boolean
    media_preview?: string | null
    github_pr_number?: number | null
    github_pr_title?: string | null
    github_author?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProjectMediaCreateManyProjectInput = {
    id?: string
    storage_path: string
    public_url: string
    file_name: string
    created_at?: Date | string
  }

  export type TimelineEntryUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    entry_type?: EnumEntryTypeFieldUpdateOperationsInput | $Enums.EntryType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    sprint_number?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    external_url?: NullableStringFieldUpdateOperationsInput | string | null
    external_title?: NullableStringFieldUpdateOperationsInput | string | null
    external_status?: NullableEnumPRStatusFieldUpdateOperationsInput | $Enums.PRStatus | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    media_preview?: NullableStringFieldUpdateOperationsInput | string | null
    github_pr_number?: NullableIntFieldUpdateOperationsInput | number | null
    github_pr_title?: NullableStringFieldUpdateOperationsInput | string | null
    github_author?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimelineEntryUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    entry_type?: EnumEntryTypeFieldUpdateOperationsInput | $Enums.EntryType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    sprint_number?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    external_url?: NullableStringFieldUpdateOperationsInput | string | null
    external_title?: NullableStringFieldUpdateOperationsInput | string | null
    external_status?: NullableEnumPRStatusFieldUpdateOperationsInput | $Enums.PRStatus | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    media_preview?: NullableStringFieldUpdateOperationsInput | string | null
    github_pr_number?: NullableIntFieldUpdateOperationsInput | number | null
    github_pr_title?: NullableStringFieldUpdateOperationsInput | string | null
    github_author?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimelineEntryUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    entry_type?: EnumEntryTypeFieldUpdateOperationsInput | $Enums.EntryType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    sprint_number?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    external_url?: NullableStringFieldUpdateOperationsInput | string | null
    external_title?: NullableStringFieldUpdateOperationsInput | string | null
    external_status?: NullableEnumPRStatusFieldUpdateOperationsInput | $Enums.PRStatus | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    media_preview?: NullableStringFieldUpdateOperationsInput | string | null
    github_pr_number?: NullableIntFieldUpdateOperationsInput | number | null
    github_pr_title?: NullableStringFieldUpdateOperationsInput | string | null
    github_author?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMediaUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    storage_path?: StringFieldUpdateOperationsInput | string
    public_url?: StringFieldUpdateOperationsInput | string
    file_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMediaUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    storage_path?: StringFieldUpdateOperationsInput | string
    public_url?: StringFieldUpdateOperationsInput | string
    file_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMediaUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    storage_path?: StringFieldUpdateOperationsInput | string
    public_url?: StringFieldUpdateOperationsInput | string
    file_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}