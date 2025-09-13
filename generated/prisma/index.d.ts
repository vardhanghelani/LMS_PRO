
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model item_tran
 * 
 */
export type item_tran = $Result.DefaultSelection<Prisma.$item_tranPayload>
/**
 * Model item_tran_history
 * 
 */
export type item_tran_history = $Result.DefaultSelection<Prisma.$item_tran_historyPayload>
/**
 * Model library_items
 * 
 */
export type library_items = $Result.DefaultSelection<Prisma.$library_itemsPayload>
/**
 * Model fines
 * 
 */
export type fines = $Result.DefaultSelection<Prisma.$finesPayload>
/**
 * Model logs
 * 
 */
export type logs = $Result.DefaultSelection<Prisma.$logsPayload>
/**
 * Model notifications
 * 
 */
export type notifications = $Result.DefaultSelection<Prisma.$notificationsPayload>
/**
 * Model user_wishlist
 * 
 */
export type user_wishlist = $Result.DefaultSelection<Prisma.$user_wishlistPayload>
/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>
/**
 * Model contact_us
 * 
 */
export type contact_us = $Result.DefaultSelection<Prisma.$contact_usPayload>
/**
 * Model system_config
 * 
 */
export type system_config = $Result.DefaultSelection<Prisma.$system_configPayload>
/**
 * Model library_cards
 * 
 */
export type library_cards = $Result.DefaultSelection<Prisma.$library_cardsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const record_status: {
  active: 'active',
  inactive: 'inactive'
};

export type record_status = (typeof record_status)[keyof typeof record_status]


export const notifications_type: {
  issue: 'issue',
  return: 'return',
  overdue: 'overdue',
  reservation_available: 'reservation_available',
  reservation_expired: 'reservation_expired',
  fine_due: 'fine_due',
  system_maintenance: 'system_maintenance',
  new_item_added: 'new_item_added',
  item_damaged: 'item_damaged',
  item_lost: 'item_lost'
};

export type notifications_type = (typeof notifications_type)[keyof typeof notifications_type]


export const users_role: {
  patron: 'patron',
  librarian: 'librarian',
  admin: 'admin'
};

export type users_role = (typeof users_role)[keyof typeof users_role]


export const fines_status: {
  unpaid: 'unpaid',
  paid: 'paid'
};

export type fines_status = (typeof fines_status)[keyof typeof fines_status]


export const users_status: {
  active: 'active',
  banned: 'banned'
};

export type users_status = (typeof users_status)[keyof typeof users_status]


export const notifications_status: {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected'
};

export type notifications_status = (typeof notifications_status)[keyof typeof notifications_status]


export const gender: {
  male: 'male',
  female: 'female',
  other: 'other'
};

export type gender = (typeof gender)[keyof typeof gender]


export const library_item_type: {
  book: 'book',
  journal: 'journal',
  multimedia: 'multimedia',
  newspaper: 'newspaper',
  magazine: 'magazine',
  thesis: 'thesis',
  report: 'report',
  other: 'other'
};

export type library_item_type = (typeof library_item_type)[keyof typeof library_item_type]


export const item_tran_status: {
  available: 'available',
  not_available: 'not_available',
  reserved: 'reserved',
  lost: 'lost',
  damaged: 'damaged'
};

export type item_tran_status = (typeof item_tran_status)[keyof typeof item_tran_status]


export const item_tran_history_status: {
  issued: 'issued',
  returned: 'returned',
  pending: 'pending',
  rejected: 'rejected',
  overdue: 'overdue'
};

export type item_tran_history_status = (typeof item_tran_history_status)[keyof typeof item_tran_history_status]


export const reservation_status: {
  pending: 'pending',
  active: 'active',
  expired: 'expired',
  cancelled: 'cancelled',
  fulfilled: 'fulfilled'
};

export type reservation_status = (typeof reservation_status)[keyof typeof reservation_status]


export const card_status: {
  active: 'active',
  expired: 'expired',
  suspended: 'suspended',
  cancelled: 'cancelled'
};

export type card_status = (typeof card_status)[keyof typeof card_status]

}

export type record_status = $Enums.record_status

export const record_status: typeof $Enums.record_status

export type notifications_type = $Enums.notifications_type

export const notifications_type: typeof $Enums.notifications_type

export type users_role = $Enums.users_role

export const users_role: typeof $Enums.users_role

export type fines_status = $Enums.fines_status

export const fines_status: typeof $Enums.fines_status

export type users_status = $Enums.users_status

export const users_status: typeof $Enums.users_status

export type notifications_status = $Enums.notifications_status

export const notifications_status: typeof $Enums.notifications_status

export type gender = $Enums.gender

export const gender: typeof $Enums.gender

export type library_item_type = $Enums.library_item_type

export const library_item_type: typeof $Enums.library_item_type

export type item_tran_status = $Enums.item_tran_status

export const item_tran_status: typeof $Enums.item_tran_status

export type item_tran_history_status = $Enums.item_tran_history_status

export const item_tran_history_status: typeof $Enums.item_tran_history_status

export type reservation_status = $Enums.reservation_status

export const reservation_status: typeof $Enums.reservation_status

export type card_status = $Enums.card_status

export const card_status: typeof $Enums.card_status

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Item_trans
 * const item_trans = await prisma.item_tran.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * const prisma = new PrismaClient()
   * // Fetch zero or more Item_trans
   * const item_trans = await prisma.item_tran.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.item_tran`: Exposes CRUD operations for the **item_tran** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Item_trans
    * const item_trans = await prisma.item_tran.findMany()
    * ```
    */
  get item_tran(): Prisma.item_tranDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.item_tran_history`: Exposes CRUD operations for the **item_tran_history** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Item_tran_histories
    * const item_tran_histories = await prisma.item_tran_history.findMany()
    * ```
    */
  get item_tran_history(): Prisma.item_tran_historyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.library_items`: Exposes CRUD operations for the **library_items** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Library_items
    * const library_items = await prisma.library_items.findMany()
    * ```
    */
  get library_items(): Prisma.library_itemsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fines`: Exposes CRUD operations for the **fines** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Fines
    * const fines = await prisma.fines.findMany()
    * ```
    */
  get fines(): Prisma.finesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.logs`: Exposes CRUD operations for the **logs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Logs
    * const logs = await prisma.logs.findMany()
    * ```
    */
  get logs(): Prisma.logsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notifications`: Exposes CRUD operations for the **notifications** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notifications.findMany()
    * ```
    */
  get notifications(): Prisma.notificationsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user_wishlist`: Exposes CRUD operations for the **user_wishlist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more User_wishlists
    * const user_wishlists = await prisma.user_wishlist.findMany()
    * ```
    */
  get user_wishlist(): Prisma.user_wishlistDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contact_us`: Exposes CRUD operations for the **contact_us** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contact_uses
    * const contact_uses = await prisma.contact_us.findMany()
    * ```
    */
  get contact_us(): Prisma.contact_usDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.system_config`: Exposes CRUD operations for the **system_config** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more System_configs
    * const system_configs = await prisma.system_config.findMany()
    * ```
    */
  get system_config(): Prisma.system_configDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.library_cards`: Exposes CRUD operations for the **library_cards** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Library_cards
    * const library_cards = await prisma.library_cards.findMany()
    * ```
    */
  get library_cards(): Prisma.library_cardsDelegate<ExtArgs, ClientOptions>;
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
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 6.16.0
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


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
    item_tran: 'item_tran',
    item_tran_history: 'item_tran_history',
    library_items: 'library_items',
    fines: 'fines',
    logs: 'logs',
    notifications: 'notifications',
    user_wishlist: 'user_wishlist',
    users: 'users',
    contact_us: 'contact_us',
    system_config: 'system_config',
    library_cards: 'library_cards'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "item_tran" | "item_tran_history" | "library_items" | "fines" | "logs" | "notifications" | "user_wishlist" | "users" | "contact_us" | "system_config" | "library_cards"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      item_tran: {
        payload: Prisma.$item_tranPayload<ExtArgs>
        fields: Prisma.item_tranFieldRefs
        operations: {
          findUnique: {
            args: Prisma.item_tranFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_tranPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.item_tranFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_tranPayload>
          }
          findFirst: {
            args: Prisma.item_tranFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_tranPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.item_tranFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_tranPayload>
          }
          findMany: {
            args: Prisma.item_tranFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_tranPayload>[]
          }
          create: {
            args: Prisma.item_tranCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_tranPayload>
          }
          createMany: {
            args: Prisma.item_tranCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.item_tranDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_tranPayload>
          }
          update: {
            args: Prisma.item_tranUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_tranPayload>
          }
          deleteMany: {
            args: Prisma.item_tranDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.item_tranUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.item_tranUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_tranPayload>
          }
          aggregate: {
            args: Prisma.Item_tranAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItem_tran>
          }
          groupBy: {
            args: Prisma.item_tranGroupByArgs<ExtArgs>
            result: $Utils.Optional<Item_tranGroupByOutputType>[]
          }
          count: {
            args: Prisma.item_tranCountArgs<ExtArgs>
            result: $Utils.Optional<Item_tranCountAggregateOutputType> | number
          }
        }
      }
      item_tran_history: {
        payload: Prisma.$item_tran_historyPayload<ExtArgs>
        fields: Prisma.item_tran_historyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.item_tran_historyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_tran_historyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.item_tran_historyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_tran_historyPayload>
          }
          findFirst: {
            args: Prisma.item_tran_historyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_tran_historyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.item_tran_historyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_tran_historyPayload>
          }
          findMany: {
            args: Prisma.item_tran_historyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_tran_historyPayload>[]
          }
          create: {
            args: Prisma.item_tran_historyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_tran_historyPayload>
          }
          createMany: {
            args: Prisma.item_tran_historyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.item_tran_historyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_tran_historyPayload>
          }
          update: {
            args: Prisma.item_tran_historyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_tran_historyPayload>
          }
          deleteMany: {
            args: Prisma.item_tran_historyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.item_tran_historyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.item_tran_historyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_tran_historyPayload>
          }
          aggregate: {
            args: Prisma.Item_tran_historyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItem_tran_history>
          }
          groupBy: {
            args: Prisma.item_tran_historyGroupByArgs<ExtArgs>
            result: $Utils.Optional<Item_tran_historyGroupByOutputType>[]
          }
          count: {
            args: Prisma.item_tran_historyCountArgs<ExtArgs>
            result: $Utils.Optional<Item_tran_historyCountAggregateOutputType> | number
          }
        }
      }
      library_items: {
        payload: Prisma.$library_itemsPayload<ExtArgs>
        fields: Prisma.library_itemsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.library_itemsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$library_itemsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.library_itemsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$library_itemsPayload>
          }
          findFirst: {
            args: Prisma.library_itemsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$library_itemsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.library_itemsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$library_itemsPayload>
          }
          findMany: {
            args: Prisma.library_itemsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$library_itemsPayload>[]
          }
          create: {
            args: Prisma.library_itemsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$library_itemsPayload>
          }
          createMany: {
            args: Prisma.library_itemsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.library_itemsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$library_itemsPayload>
          }
          update: {
            args: Prisma.library_itemsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$library_itemsPayload>
          }
          deleteMany: {
            args: Prisma.library_itemsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.library_itemsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.library_itemsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$library_itemsPayload>
          }
          aggregate: {
            args: Prisma.Library_itemsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLibrary_items>
          }
          groupBy: {
            args: Prisma.library_itemsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Library_itemsGroupByOutputType>[]
          }
          count: {
            args: Prisma.library_itemsCountArgs<ExtArgs>
            result: $Utils.Optional<Library_itemsCountAggregateOutputType> | number
          }
        }
      }
      fines: {
        payload: Prisma.$finesPayload<ExtArgs>
        fields: Prisma.finesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.finesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$finesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.finesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$finesPayload>
          }
          findFirst: {
            args: Prisma.finesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$finesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.finesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$finesPayload>
          }
          findMany: {
            args: Prisma.finesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$finesPayload>[]
          }
          create: {
            args: Prisma.finesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$finesPayload>
          }
          createMany: {
            args: Prisma.finesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.finesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$finesPayload>
          }
          update: {
            args: Prisma.finesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$finesPayload>
          }
          deleteMany: {
            args: Prisma.finesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.finesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.finesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$finesPayload>
          }
          aggregate: {
            args: Prisma.FinesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFines>
          }
          groupBy: {
            args: Prisma.finesGroupByArgs<ExtArgs>
            result: $Utils.Optional<FinesGroupByOutputType>[]
          }
          count: {
            args: Prisma.finesCountArgs<ExtArgs>
            result: $Utils.Optional<FinesCountAggregateOutputType> | number
          }
        }
      }
      logs: {
        payload: Prisma.$logsPayload<ExtArgs>
        fields: Prisma.logsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.logsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$logsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.logsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$logsPayload>
          }
          findFirst: {
            args: Prisma.logsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$logsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.logsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$logsPayload>
          }
          findMany: {
            args: Prisma.logsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$logsPayload>[]
          }
          create: {
            args: Prisma.logsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$logsPayload>
          }
          createMany: {
            args: Prisma.logsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.logsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$logsPayload>
          }
          update: {
            args: Prisma.logsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$logsPayload>
          }
          deleteMany: {
            args: Prisma.logsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.logsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.logsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$logsPayload>
          }
          aggregate: {
            args: Prisma.LogsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLogs>
          }
          groupBy: {
            args: Prisma.logsGroupByArgs<ExtArgs>
            result: $Utils.Optional<LogsGroupByOutputType>[]
          }
          count: {
            args: Prisma.logsCountArgs<ExtArgs>
            result: $Utils.Optional<LogsCountAggregateOutputType> | number
          }
        }
      }
      notifications: {
        payload: Prisma.$notificationsPayload<ExtArgs>
        fields: Prisma.notificationsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.notificationsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.notificationsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>
          }
          findFirst: {
            args: Prisma.notificationsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.notificationsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>
          }
          findMany: {
            args: Prisma.notificationsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>[]
          }
          create: {
            args: Prisma.notificationsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>
          }
          createMany: {
            args: Prisma.notificationsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.notificationsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>
          }
          update: {
            args: Prisma.notificationsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>
          }
          deleteMany: {
            args: Prisma.notificationsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.notificationsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.notificationsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>
          }
          aggregate: {
            args: Prisma.NotificationsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotifications>
          }
          groupBy: {
            args: Prisma.notificationsGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationsGroupByOutputType>[]
          }
          count: {
            args: Prisma.notificationsCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationsCountAggregateOutputType> | number
          }
        }
      }
      user_wishlist: {
        payload: Prisma.$user_wishlistPayload<ExtArgs>
        fields: Prisma.user_wishlistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.user_wishlistFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_wishlistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.user_wishlistFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_wishlistPayload>
          }
          findFirst: {
            args: Prisma.user_wishlistFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_wishlistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.user_wishlistFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_wishlistPayload>
          }
          findMany: {
            args: Prisma.user_wishlistFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_wishlistPayload>[]
          }
          create: {
            args: Prisma.user_wishlistCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_wishlistPayload>
          }
          createMany: {
            args: Prisma.user_wishlistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.user_wishlistDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_wishlistPayload>
          }
          update: {
            args: Prisma.user_wishlistUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_wishlistPayload>
          }
          deleteMany: {
            args: Prisma.user_wishlistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.user_wishlistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.user_wishlistUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_wishlistPayload>
          }
          aggregate: {
            args: Prisma.User_wishlistAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser_wishlist>
          }
          groupBy: {
            args: Prisma.user_wishlistGroupByArgs<ExtArgs>
            result: $Utils.Optional<User_wishlistGroupByOutputType>[]
          }
          count: {
            args: Prisma.user_wishlistCountArgs<ExtArgs>
            result: $Utils.Optional<User_wishlistCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      contact_us: {
        payload: Prisma.$contact_usPayload<ExtArgs>
        fields: Prisma.contact_usFieldRefs
        operations: {
          findUnique: {
            args: Prisma.contact_usFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contact_usPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.contact_usFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contact_usPayload>
          }
          findFirst: {
            args: Prisma.contact_usFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contact_usPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.contact_usFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contact_usPayload>
          }
          findMany: {
            args: Prisma.contact_usFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contact_usPayload>[]
          }
          create: {
            args: Prisma.contact_usCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contact_usPayload>
          }
          createMany: {
            args: Prisma.contact_usCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.contact_usDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contact_usPayload>
          }
          update: {
            args: Prisma.contact_usUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contact_usPayload>
          }
          deleteMany: {
            args: Prisma.contact_usDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.contact_usUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.contact_usUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$contact_usPayload>
          }
          aggregate: {
            args: Prisma.Contact_usAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContact_us>
          }
          groupBy: {
            args: Prisma.contact_usGroupByArgs<ExtArgs>
            result: $Utils.Optional<Contact_usGroupByOutputType>[]
          }
          count: {
            args: Prisma.contact_usCountArgs<ExtArgs>
            result: $Utils.Optional<Contact_usCountAggregateOutputType> | number
          }
        }
      }
      system_config: {
        payload: Prisma.$system_configPayload<ExtArgs>
        fields: Prisma.system_configFieldRefs
        operations: {
          findUnique: {
            args: Prisma.system_configFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$system_configPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.system_configFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$system_configPayload>
          }
          findFirst: {
            args: Prisma.system_configFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$system_configPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.system_configFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$system_configPayload>
          }
          findMany: {
            args: Prisma.system_configFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$system_configPayload>[]
          }
          create: {
            args: Prisma.system_configCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$system_configPayload>
          }
          createMany: {
            args: Prisma.system_configCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.system_configDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$system_configPayload>
          }
          update: {
            args: Prisma.system_configUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$system_configPayload>
          }
          deleteMany: {
            args: Prisma.system_configDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.system_configUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.system_configUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$system_configPayload>
          }
          aggregate: {
            args: Prisma.System_configAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSystem_config>
          }
          groupBy: {
            args: Prisma.system_configGroupByArgs<ExtArgs>
            result: $Utils.Optional<System_configGroupByOutputType>[]
          }
          count: {
            args: Prisma.system_configCountArgs<ExtArgs>
            result: $Utils.Optional<System_configCountAggregateOutputType> | number
          }
        }
      }
      library_cards: {
        payload: Prisma.$library_cardsPayload<ExtArgs>
        fields: Prisma.library_cardsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.library_cardsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$library_cardsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.library_cardsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$library_cardsPayload>
          }
          findFirst: {
            args: Prisma.library_cardsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$library_cardsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.library_cardsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$library_cardsPayload>
          }
          findMany: {
            args: Prisma.library_cardsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$library_cardsPayload>[]
          }
          create: {
            args: Prisma.library_cardsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$library_cardsPayload>
          }
          createMany: {
            args: Prisma.library_cardsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.library_cardsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$library_cardsPayload>
          }
          update: {
            args: Prisma.library_cardsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$library_cardsPayload>
          }
          deleteMany: {
            args: Prisma.library_cardsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.library_cardsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.library_cardsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$library_cardsPayload>
          }
          aggregate: {
            args: Prisma.Library_cardsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLibrary_cards>
          }
          groupBy: {
            args: Prisma.library_cardsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Library_cardsGroupByOutputType>[]
          }
          count: {
            args: Prisma.library_cardsCountArgs<ExtArgs>
            result: $Utils.Optional<Library_cardsCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
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
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
    adapter?: runtime.SqlDriverAdapterFactory | null
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
  }
  export type GlobalOmitConfig = {
    item_tran?: item_tranOmit
    item_tran_history?: item_tran_historyOmit
    library_items?: library_itemsOmit
    fines?: finesOmit
    logs?: logsOmit
    notifications?: notificationsOmit
    user_wishlist?: user_wishlistOmit
    users?: usersOmit
    contact_us?: contact_usOmit
    system_config?: system_configOmit
    library_cards?: library_cardsOmit
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
   * Count Type Item_tranCountOutputType
   */

  export type Item_tranCountOutputType = {
    item_tran_history: number
    notifications: number
  }

  export type Item_tranCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item_tran_history?: boolean | Item_tranCountOutputTypeCountItem_tran_historyArgs
    notifications?: boolean | Item_tranCountOutputTypeCountNotificationsArgs
  }

  // Custom InputTypes
  /**
   * Item_tranCountOutputType without action
   */
  export type Item_tranCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item_tranCountOutputType
     */
    select?: Item_tranCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Item_tranCountOutputType without action
   */
  export type Item_tranCountOutputTypeCountItem_tran_historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: item_tran_historyWhereInput
  }

  /**
   * Item_tranCountOutputType without action
   */
  export type Item_tranCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: notificationsWhereInput
  }


  /**
   * Count Type Item_tran_historyCountOutputType
   */

  export type Item_tran_historyCountOutputType = {
    fines: number
  }

  export type Item_tran_historyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fines?: boolean | Item_tran_historyCountOutputTypeCountFinesArgs
  }

  // Custom InputTypes
  /**
   * Item_tran_historyCountOutputType without action
   */
  export type Item_tran_historyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item_tran_historyCountOutputType
     */
    select?: Item_tran_historyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Item_tran_historyCountOutputType without action
   */
  export type Item_tran_historyCountOutputTypeCountFinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: finesWhereInput
  }


  /**
   * Count Type Library_itemsCountOutputType
   */

  export type Library_itemsCountOutputType = {
    item_tran: number
    item_tran_history: number
    notifications: number
    user_wishlist: number
  }

  export type Library_itemsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item_tran?: boolean | Library_itemsCountOutputTypeCountItem_tranArgs
    item_tran_history?: boolean | Library_itemsCountOutputTypeCountItem_tran_historyArgs
    notifications?: boolean | Library_itemsCountOutputTypeCountNotificationsArgs
    user_wishlist?: boolean | Library_itemsCountOutputTypeCountUser_wishlistArgs
  }

  // Custom InputTypes
  /**
   * Library_itemsCountOutputType without action
   */
  export type Library_itemsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Library_itemsCountOutputType
     */
    select?: Library_itemsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Library_itemsCountOutputType without action
   */
  export type Library_itemsCountOutputTypeCountItem_tranArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: item_tranWhereInput
  }

  /**
   * Library_itemsCountOutputType without action
   */
  export type Library_itemsCountOutputTypeCountItem_tran_historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: item_tran_historyWhereInput
  }

  /**
   * Library_itemsCountOutputType without action
   */
  export type Library_itemsCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: notificationsWhereInput
  }

  /**
   * Library_itemsCountOutputType without action
   */
  export type Library_itemsCountOutputTypeCountUser_wishlistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_wishlistWhereInput
  }


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    item_tran: number
    item_tran_history_item_tran_history_requested_byTousers: number
    item_tran_history_item_tran_history_approved_byTousers: number
    fines: number
    logs: number
    notifications_notifications_from_user_idTousers: number
    notifications_notifications_to_user_idTousers: number
    user_wishlist: number
    library_cards: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item_tran?: boolean | UsersCountOutputTypeCountItem_tranArgs
    item_tran_history_item_tran_history_requested_byTousers?: boolean | UsersCountOutputTypeCountItem_tran_history_item_tran_history_requested_byTousersArgs
    item_tran_history_item_tran_history_approved_byTousers?: boolean | UsersCountOutputTypeCountItem_tran_history_item_tran_history_approved_byTousersArgs
    fines?: boolean | UsersCountOutputTypeCountFinesArgs
    logs?: boolean | UsersCountOutputTypeCountLogsArgs
    notifications_notifications_from_user_idTousers?: boolean | UsersCountOutputTypeCountNotifications_notifications_from_user_idTousersArgs
    notifications_notifications_to_user_idTousers?: boolean | UsersCountOutputTypeCountNotifications_notifications_to_user_idTousersArgs
    user_wishlist?: boolean | UsersCountOutputTypeCountUser_wishlistArgs
    library_cards?: boolean | UsersCountOutputTypeCountLibrary_cardsArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountItem_tranArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: item_tranWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountItem_tran_history_item_tran_history_requested_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: item_tran_historyWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountItem_tran_history_item_tran_history_approved_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: item_tran_historyWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountFinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: finesWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: logsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountNotifications_notifications_from_user_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: notificationsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountNotifications_notifications_to_user_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: notificationsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountUser_wishlistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_wishlistWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountLibrary_cardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: library_cardsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model item_tran
   */

  export type AggregateItem_tran = {
    _count: Item_tranCountAggregateOutputType | null
    _avg: Item_tranAvgAggregateOutputType | null
    _sum: Item_tranSumAggregateOutputType | null
    _min: Item_tranMinAggregateOutputType | null
    _max: Item_tranMaxAggregateOutputType | null
  }

  export type Item_tranAvgAggregateOutputType = {
    tran_id: number | null
    item_id: number | null
    user_id: number | null
  }

  export type Item_tranSumAggregateOutputType = {
    tran_id: number | null
    item_id: number | null
    user_id: number | null
  }

  export type Item_tranMinAggregateOutputType = {
    tran_id: number | null
    item_id: number | null
    status: $Enums.item_tran_status | null
    user_id: number | null
    record_status: $Enums.record_status | null
  }

  export type Item_tranMaxAggregateOutputType = {
    tran_id: number | null
    item_id: number | null
    status: $Enums.item_tran_status | null
    user_id: number | null
    record_status: $Enums.record_status | null
  }

  export type Item_tranCountAggregateOutputType = {
    tran_id: number
    item_id: number
    status: number
    user_id: number
    record_status: number
    _all: number
  }


  export type Item_tranAvgAggregateInputType = {
    tran_id?: true
    item_id?: true
    user_id?: true
  }

  export type Item_tranSumAggregateInputType = {
    tran_id?: true
    item_id?: true
    user_id?: true
  }

  export type Item_tranMinAggregateInputType = {
    tran_id?: true
    item_id?: true
    status?: true
    user_id?: true
    record_status?: true
  }

  export type Item_tranMaxAggregateInputType = {
    tran_id?: true
    item_id?: true
    status?: true
    user_id?: true
    record_status?: true
  }

  export type Item_tranCountAggregateInputType = {
    tran_id?: true
    item_id?: true
    status?: true
    user_id?: true
    record_status?: true
    _all?: true
  }

  export type Item_tranAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which item_tran to aggregate.
     */
    where?: item_tranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of item_trans to fetch.
     */
    orderBy?: item_tranOrderByWithRelationInput | item_tranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: item_tranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` item_trans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` item_trans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned item_trans
    **/
    _count?: true | Item_tranCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Item_tranAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Item_tranSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Item_tranMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Item_tranMaxAggregateInputType
  }

  export type GetItem_tranAggregateType<T extends Item_tranAggregateArgs> = {
        [P in keyof T & keyof AggregateItem_tran]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItem_tran[P]>
      : GetScalarType<T[P], AggregateItem_tran[P]>
  }




  export type item_tranGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: item_tranWhereInput
    orderBy?: item_tranOrderByWithAggregationInput | item_tranOrderByWithAggregationInput[]
    by: Item_tranScalarFieldEnum[] | Item_tranScalarFieldEnum
    having?: item_tranScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Item_tranCountAggregateInputType | true
    _avg?: Item_tranAvgAggregateInputType
    _sum?: Item_tranSumAggregateInputType
    _min?: Item_tranMinAggregateInputType
    _max?: Item_tranMaxAggregateInputType
  }

  export type Item_tranGroupByOutputType = {
    tran_id: number
    item_id: number | null
    status: $Enums.item_tran_status | null
    user_id: number | null
    record_status: $Enums.record_status | null
    _count: Item_tranCountAggregateOutputType | null
    _avg: Item_tranAvgAggregateOutputType | null
    _sum: Item_tranSumAggregateOutputType | null
    _min: Item_tranMinAggregateOutputType | null
    _max: Item_tranMaxAggregateOutputType | null
  }

  type GetItem_tranGroupByPayload<T extends item_tranGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Item_tranGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Item_tranGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Item_tranGroupByOutputType[P]>
            : GetScalarType<T[P], Item_tranGroupByOutputType[P]>
        }
      >
    >


  export type item_tranSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tran_id?: boolean
    item_id?: boolean
    status?: boolean
    user_id?: boolean
    record_status?: boolean
    library_items?: boolean | item_tran$library_itemsArgs<ExtArgs>
    users?: boolean | item_tran$usersArgs<ExtArgs>
    item_tran_history?: boolean | item_tran$item_tran_historyArgs<ExtArgs>
    notifications?: boolean | item_tran$notificationsArgs<ExtArgs>
    _count?: boolean | Item_tranCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["item_tran"]>



  export type item_tranSelectScalar = {
    tran_id?: boolean
    item_id?: boolean
    status?: boolean
    user_id?: boolean
    record_status?: boolean
  }

  export type item_tranOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"tran_id" | "item_id" | "status" | "user_id" | "record_status", ExtArgs["result"]["item_tran"]>
  export type item_tranInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    library_items?: boolean | item_tran$library_itemsArgs<ExtArgs>
    users?: boolean | item_tran$usersArgs<ExtArgs>
    item_tran_history?: boolean | item_tran$item_tran_historyArgs<ExtArgs>
    notifications?: boolean | item_tran$notificationsArgs<ExtArgs>
    _count?: boolean | Item_tranCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $item_tranPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "item_tran"
    objects: {
      library_items: Prisma.$library_itemsPayload<ExtArgs> | null
      users: Prisma.$usersPayload<ExtArgs> | null
      item_tran_history: Prisma.$item_tran_historyPayload<ExtArgs>[]
      notifications: Prisma.$notificationsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      tran_id: number
      item_id: number | null
      status: $Enums.item_tran_status | null
      user_id: number | null
      record_status: $Enums.record_status | null
    }, ExtArgs["result"]["item_tran"]>
    composites: {}
  }

  type item_tranGetPayload<S extends boolean | null | undefined | item_tranDefaultArgs> = $Result.GetResult<Prisma.$item_tranPayload, S>

  type item_tranCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<item_tranFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Item_tranCountAggregateInputType | true
    }

  export interface item_tranDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['item_tran'], meta: { name: 'item_tran' } }
    /**
     * Find zero or one Item_tran that matches the filter.
     * @param {item_tranFindUniqueArgs} args - Arguments to find a Item_tran
     * @example
     * // Get one Item_tran
     * const item_tran = await prisma.item_tran.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends item_tranFindUniqueArgs>(args: SelectSubset<T, item_tranFindUniqueArgs<ExtArgs>>): Prisma__item_tranClient<$Result.GetResult<Prisma.$item_tranPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Item_tran that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {item_tranFindUniqueOrThrowArgs} args - Arguments to find a Item_tran
     * @example
     * // Get one Item_tran
     * const item_tran = await prisma.item_tran.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends item_tranFindUniqueOrThrowArgs>(args: SelectSubset<T, item_tranFindUniqueOrThrowArgs<ExtArgs>>): Prisma__item_tranClient<$Result.GetResult<Prisma.$item_tranPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item_tran that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_tranFindFirstArgs} args - Arguments to find a Item_tran
     * @example
     * // Get one Item_tran
     * const item_tran = await prisma.item_tran.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends item_tranFindFirstArgs>(args?: SelectSubset<T, item_tranFindFirstArgs<ExtArgs>>): Prisma__item_tranClient<$Result.GetResult<Prisma.$item_tranPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item_tran that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_tranFindFirstOrThrowArgs} args - Arguments to find a Item_tran
     * @example
     * // Get one Item_tran
     * const item_tran = await prisma.item_tran.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends item_tranFindFirstOrThrowArgs>(args?: SelectSubset<T, item_tranFindFirstOrThrowArgs<ExtArgs>>): Prisma__item_tranClient<$Result.GetResult<Prisma.$item_tranPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Item_trans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_tranFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Item_trans
     * const item_trans = await prisma.item_tran.findMany()
     * 
     * // Get first 10 Item_trans
     * const item_trans = await prisma.item_tran.findMany({ take: 10 })
     * 
     * // Only select the `tran_id`
     * const item_tranWithTran_idOnly = await prisma.item_tran.findMany({ select: { tran_id: true } })
     * 
     */
    findMany<T extends item_tranFindManyArgs>(args?: SelectSubset<T, item_tranFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$item_tranPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Item_tran.
     * @param {item_tranCreateArgs} args - Arguments to create a Item_tran.
     * @example
     * // Create one Item_tran
     * const Item_tran = await prisma.item_tran.create({
     *   data: {
     *     // ... data to create a Item_tran
     *   }
     * })
     * 
     */
    create<T extends item_tranCreateArgs>(args: SelectSubset<T, item_tranCreateArgs<ExtArgs>>): Prisma__item_tranClient<$Result.GetResult<Prisma.$item_tranPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Item_trans.
     * @param {item_tranCreateManyArgs} args - Arguments to create many Item_trans.
     * @example
     * // Create many Item_trans
     * const item_tran = await prisma.item_tran.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends item_tranCreateManyArgs>(args?: SelectSubset<T, item_tranCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Item_tran.
     * @param {item_tranDeleteArgs} args - Arguments to delete one Item_tran.
     * @example
     * // Delete one Item_tran
     * const Item_tran = await prisma.item_tran.delete({
     *   where: {
     *     // ... filter to delete one Item_tran
     *   }
     * })
     * 
     */
    delete<T extends item_tranDeleteArgs>(args: SelectSubset<T, item_tranDeleteArgs<ExtArgs>>): Prisma__item_tranClient<$Result.GetResult<Prisma.$item_tranPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Item_tran.
     * @param {item_tranUpdateArgs} args - Arguments to update one Item_tran.
     * @example
     * // Update one Item_tran
     * const item_tran = await prisma.item_tran.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends item_tranUpdateArgs>(args: SelectSubset<T, item_tranUpdateArgs<ExtArgs>>): Prisma__item_tranClient<$Result.GetResult<Prisma.$item_tranPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Item_trans.
     * @param {item_tranDeleteManyArgs} args - Arguments to filter Item_trans to delete.
     * @example
     * // Delete a few Item_trans
     * const { count } = await prisma.item_tran.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends item_tranDeleteManyArgs>(args?: SelectSubset<T, item_tranDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Item_trans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_tranUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Item_trans
     * const item_tran = await prisma.item_tran.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends item_tranUpdateManyArgs>(args: SelectSubset<T, item_tranUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Item_tran.
     * @param {item_tranUpsertArgs} args - Arguments to update or create a Item_tran.
     * @example
     * // Update or create a Item_tran
     * const item_tran = await prisma.item_tran.upsert({
     *   create: {
     *     // ... data to create a Item_tran
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Item_tran we want to update
     *   }
     * })
     */
    upsert<T extends item_tranUpsertArgs>(args: SelectSubset<T, item_tranUpsertArgs<ExtArgs>>): Prisma__item_tranClient<$Result.GetResult<Prisma.$item_tranPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Item_trans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_tranCountArgs} args - Arguments to filter Item_trans to count.
     * @example
     * // Count the number of Item_trans
     * const count = await prisma.item_tran.count({
     *   where: {
     *     // ... the filter for the Item_trans we want to count
     *   }
     * })
    **/
    count<T extends item_tranCountArgs>(
      args?: Subset<T, item_tranCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Item_tranCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Item_tran.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Item_tranAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Item_tranAggregateArgs>(args: Subset<T, Item_tranAggregateArgs>): Prisma.PrismaPromise<GetItem_tranAggregateType<T>>

    /**
     * Group by Item_tran.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_tranGroupByArgs} args - Group by arguments.
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
      T extends item_tranGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: item_tranGroupByArgs['orderBy'] }
        : { orderBy?: item_tranGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, item_tranGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItem_tranGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the item_tran model
   */
  readonly fields: item_tranFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for item_tran.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__item_tranClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    library_items<T extends item_tran$library_itemsArgs<ExtArgs> = {}>(args?: Subset<T, item_tran$library_itemsArgs<ExtArgs>>): Prisma__library_itemsClient<$Result.GetResult<Prisma.$library_itemsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    users<T extends item_tran$usersArgs<ExtArgs> = {}>(args?: Subset<T, item_tran$usersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    item_tran_history<T extends item_tran$item_tran_historyArgs<ExtArgs> = {}>(args?: Subset<T, item_tran$item_tran_historyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$item_tran_historyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends item_tran$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, item_tran$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the item_tran model
   */
  interface item_tranFieldRefs {
    readonly tran_id: FieldRef<"item_tran", 'Int'>
    readonly item_id: FieldRef<"item_tran", 'Int'>
    readonly status: FieldRef<"item_tran", 'item_tran_status'>
    readonly user_id: FieldRef<"item_tran", 'Int'>
    readonly record_status: FieldRef<"item_tran", 'record_status'>
  }
    

  // Custom InputTypes
  /**
   * item_tran findUnique
   */
  export type item_tranFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran
     */
    select?: item_tranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran
     */
    omit?: item_tranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tranInclude<ExtArgs> | null
    /**
     * Filter, which item_tran to fetch.
     */
    where: item_tranWhereUniqueInput
  }

  /**
   * item_tran findUniqueOrThrow
   */
  export type item_tranFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran
     */
    select?: item_tranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran
     */
    omit?: item_tranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tranInclude<ExtArgs> | null
    /**
     * Filter, which item_tran to fetch.
     */
    where: item_tranWhereUniqueInput
  }

  /**
   * item_tran findFirst
   */
  export type item_tranFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran
     */
    select?: item_tranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran
     */
    omit?: item_tranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tranInclude<ExtArgs> | null
    /**
     * Filter, which item_tran to fetch.
     */
    where?: item_tranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of item_trans to fetch.
     */
    orderBy?: item_tranOrderByWithRelationInput | item_tranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for item_trans.
     */
    cursor?: item_tranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` item_trans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` item_trans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of item_trans.
     */
    distinct?: Item_tranScalarFieldEnum | Item_tranScalarFieldEnum[]
  }

  /**
   * item_tran findFirstOrThrow
   */
  export type item_tranFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran
     */
    select?: item_tranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran
     */
    omit?: item_tranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tranInclude<ExtArgs> | null
    /**
     * Filter, which item_tran to fetch.
     */
    where?: item_tranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of item_trans to fetch.
     */
    orderBy?: item_tranOrderByWithRelationInput | item_tranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for item_trans.
     */
    cursor?: item_tranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` item_trans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` item_trans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of item_trans.
     */
    distinct?: Item_tranScalarFieldEnum | Item_tranScalarFieldEnum[]
  }

  /**
   * item_tran findMany
   */
  export type item_tranFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran
     */
    select?: item_tranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran
     */
    omit?: item_tranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tranInclude<ExtArgs> | null
    /**
     * Filter, which item_trans to fetch.
     */
    where?: item_tranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of item_trans to fetch.
     */
    orderBy?: item_tranOrderByWithRelationInput | item_tranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing item_trans.
     */
    cursor?: item_tranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` item_trans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` item_trans.
     */
    skip?: number
    distinct?: Item_tranScalarFieldEnum | Item_tranScalarFieldEnum[]
  }

  /**
   * item_tran create
   */
  export type item_tranCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran
     */
    select?: item_tranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran
     */
    omit?: item_tranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tranInclude<ExtArgs> | null
    /**
     * The data needed to create a item_tran.
     */
    data?: XOR<item_tranCreateInput, item_tranUncheckedCreateInput>
  }

  /**
   * item_tran createMany
   */
  export type item_tranCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many item_trans.
     */
    data: item_tranCreateManyInput | item_tranCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * item_tran update
   */
  export type item_tranUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran
     */
    select?: item_tranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran
     */
    omit?: item_tranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tranInclude<ExtArgs> | null
    /**
     * The data needed to update a item_tran.
     */
    data: XOR<item_tranUpdateInput, item_tranUncheckedUpdateInput>
    /**
     * Choose, which item_tran to update.
     */
    where: item_tranWhereUniqueInput
  }

  /**
   * item_tran updateMany
   */
  export type item_tranUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update item_trans.
     */
    data: XOR<item_tranUpdateManyMutationInput, item_tranUncheckedUpdateManyInput>
    /**
     * Filter which item_trans to update
     */
    where?: item_tranWhereInput
    /**
     * Limit how many item_trans to update.
     */
    limit?: number
  }

  /**
   * item_tran upsert
   */
  export type item_tranUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran
     */
    select?: item_tranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran
     */
    omit?: item_tranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tranInclude<ExtArgs> | null
    /**
     * The filter to search for the item_tran to update in case it exists.
     */
    where: item_tranWhereUniqueInput
    /**
     * In case the item_tran found by the `where` argument doesn't exist, create a new item_tran with this data.
     */
    create: XOR<item_tranCreateInput, item_tranUncheckedCreateInput>
    /**
     * In case the item_tran was found with the provided `where` argument, update it with this data.
     */
    update: XOR<item_tranUpdateInput, item_tranUncheckedUpdateInput>
  }

  /**
   * item_tran delete
   */
  export type item_tranDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran
     */
    select?: item_tranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran
     */
    omit?: item_tranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tranInclude<ExtArgs> | null
    /**
     * Filter which item_tran to delete.
     */
    where: item_tranWhereUniqueInput
  }

  /**
   * item_tran deleteMany
   */
  export type item_tranDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which item_trans to delete
     */
    where?: item_tranWhereInput
    /**
     * Limit how many item_trans to delete.
     */
    limit?: number
  }

  /**
   * item_tran.library_items
   */
  export type item_tran$library_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the library_items
     */
    select?: library_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the library_items
     */
    omit?: library_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: library_itemsInclude<ExtArgs> | null
    where?: library_itemsWhereInput
  }

  /**
   * item_tran.users
   */
  export type item_tran$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * item_tran.item_tran_history
   */
  export type item_tran$item_tran_historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran_history
     */
    select?: item_tran_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran_history
     */
    omit?: item_tran_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tran_historyInclude<ExtArgs> | null
    where?: item_tran_historyWhereInput
    orderBy?: item_tran_historyOrderByWithRelationInput | item_tran_historyOrderByWithRelationInput[]
    cursor?: item_tran_historyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Item_tran_historyScalarFieldEnum | Item_tran_historyScalarFieldEnum[]
  }

  /**
   * item_tran.notifications
   */
  export type item_tran$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    where?: notificationsWhereInput
    orderBy?: notificationsOrderByWithRelationInput | notificationsOrderByWithRelationInput[]
    cursor?: notificationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationsScalarFieldEnum | NotificationsScalarFieldEnum[]
  }

  /**
   * item_tran without action
   */
  export type item_tranDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran
     */
    select?: item_tranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran
     */
    omit?: item_tranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tranInclude<ExtArgs> | null
  }


  /**
   * Model item_tran_history
   */

  export type AggregateItem_tran_history = {
    _count: Item_tran_historyCountAggregateOutputType | null
    _avg: Item_tran_historyAvgAggregateOutputType | null
    _sum: Item_tran_historySumAggregateOutputType | null
    _min: Item_tran_historyMinAggregateOutputType | null
    _max: Item_tran_historyMaxAggregateOutputType | null
  }

  export type Item_tran_historyAvgAggregateOutputType = {
    id: number | null
    item_id: number | null
    tran_id: number | null
    requested_by: number | null
    approved_by: number | null
  }

  export type Item_tran_historySumAggregateOutputType = {
    id: number | null
    item_id: number | null
    tran_id: number | null
    requested_by: number | null
    approved_by: number | null
  }

  export type Item_tran_historyMinAggregateOutputType = {
    id: number | null
    item_id: number | null
    tran_id: number | null
    status: $Enums.item_tran_history_status | null
    requested_by: number | null
    approved_by: number | null
    requested_at: Date | null
    approved_at: Date | null
    date_issued: Date | null
    date_due: Date | null
    date_returned: Date | null
    remarks: string | null
  }

  export type Item_tran_historyMaxAggregateOutputType = {
    id: number | null
    item_id: number | null
    tran_id: number | null
    status: $Enums.item_tran_history_status | null
    requested_by: number | null
    approved_by: number | null
    requested_at: Date | null
    approved_at: Date | null
    date_issued: Date | null
    date_due: Date | null
    date_returned: Date | null
    remarks: string | null
  }

  export type Item_tran_historyCountAggregateOutputType = {
    id: number
    item_id: number
    tran_id: number
    status: number
    requested_by: number
    approved_by: number
    requested_at: number
    approved_at: number
    date_issued: number
    date_due: number
    date_returned: number
    remarks: number
    _all: number
  }


  export type Item_tran_historyAvgAggregateInputType = {
    id?: true
    item_id?: true
    tran_id?: true
    requested_by?: true
    approved_by?: true
  }

  export type Item_tran_historySumAggregateInputType = {
    id?: true
    item_id?: true
    tran_id?: true
    requested_by?: true
    approved_by?: true
  }

  export type Item_tran_historyMinAggregateInputType = {
    id?: true
    item_id?: true
    tran_id?: true
    status?: true
    requested_by?: true
    approved_by?: true
    requested_at?: true
    approved_at?: true
    date_issued?: true
    date_due?: true
    date_returned?: true
    remarks?: true
  }

  export type Item_tran_historyMaxAggregateInputType = {
    id?: true
    item_id?: true
    tran_id?: true
    status?: true
    requested_by?: true
    approved_by?: true
    requested_at?: true
    approved_at?: true
    date_issued?: true
    date_due?: true
    date_returned?: true
    remarks?: true
  }

  export type Item_tran_historyCountAggregateInputType = {
    id?: true
    item_id?: true
    tran_id?: true
    status?: true
    requested_by?: true
    approved_by?: true
    requested_at?: true
    approved_at?: true
    date_issued?: true
    date_due?: true
    date_returned?: true
    remarks?: true
    _all?: true
  }

  export type Item_tran_historyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which item_tran_history to aggregate.
     */
    where?: item_tran_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of item_tran_histories to fetch.
     */
    orderBy?: item_tran_historyOrderByWithRelationInput | item_tran_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: item_tran_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` item_tran_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` item_tran_histories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned item_tran_histories
    **/
    _count?: true | Item_tran_historyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Item_tran_historyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Item_tran_historySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Item_tran_historyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Item_tran_historyMaxAggregateInputType
  }

  export type GetItem_tran_historyAggregateType<T extends Item_tran_historyAggregateArgs> = {
        [P in keyof T & keyof AggregateItem_tran_history]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItem_tran_history[P]>
      : GetScalarType<T[P], AggregateItem_tran_history[P]>
  }




  export type item_tran_historyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: item_tran_historyWhereInput
    orderBy?: item_tran_historyOrderByWithAggregationInput | item_tran_historyOrderByWithAggregationInput[]
    by: Item_tran_historyScalarFieldEnum[] | Item_tran_historyScalarFieldEnum
    having?: item_tran_historyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Item_tran_historyCountAggregateInputType | true
    _avg?: Item_tran_historyAvgAggregateInputType
    _sum?: Item_tran_historySumAggregateInputType
    _min?: Item_tran_historyMinAggregateInputType
    _max?: Item_tran_historyMaxAggregateInputType
  }

  export type Item_tran_historyGroupByOutputType = {
    id: number
    item_id: number | null
    tran_id: number | null
    status: $Enums.item_tran_history_status
    requested_by: number | null
    approved_by: number | null
    requested_at: Date | null
    approved_at: Date | null
    date_issued: Date | null
    date_due: Date | null
    date_returned: Date | null
    remarks: string | null
    _count: Item_tran_historyCountAggregateOutputType | null
    _avg: Item_tran_historyAvgAggregateOutputType | null
    _sum: Item_tran_historySumAggregateOutputType | null
    _min: Item_tran_historyMinAggregateOutputType | null
    _max: Item_tran_historyMaxAggregateOutputType | null
  }

  type GetItem_tran_historyGroupByPayload<T extends item_tran_historyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Item_tran_historyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Item_tran_historyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Item_tran_historyGroupByOutputType[P]>
            : GetScalarType<T[P], Item_tran_historyGroupByOutputType[P]>
        }
      >
    >


  export type item_tran_historySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    item_id?: boolean
    tran_id?: boolean
    status?: boolean
    requested_by?: boolean
    approved_by?: boolean
    requested_at?: boolean
    approved_at?: boolean
    date_issued?: boolean
    date_due?: boolean
    date_returned?: boolean
    remarks?: boolean
    library_items?: boolean | item_tran_history$library_itemsArgs<ExtArgs>
    item_tran?: boolean | item_tran_history$item_tranArgs<ExtArgs>
    users_item_tran_history_requested_byTousers?: boolean | item_tran_history$users_item_tran_history_requested_byTousersArgs<ExtArgs>
    users_item_tran_history_approved_byTousers?: boolean | item_tran_history$users_item_tran_history_approved_byTousersArgs<ExtArgs>
    fines?: boolean | item_tran_history$finesArgs<ExtArgs>
    _count?: boolean | Item_tran_historyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["item_tran_history"]>



  export type item_tran_historySelectScalar = {
    id?: boolean
    item_id?: boolean
    tran_id?: boolean
    status?: boolean
    requested_by?: boolean
    approved_by?: boolean
    requested_at?: boolean
    approved_at?: boolean
    date_issued?: boolean
    date_due?: boolean
    date_returned?: boolean
    remarks?: boolean
  }

  export type item_tran_historyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "item_id" | "tran_id" | "status" | "requested_by" | "approved_by" | "requested_at" | "approved_at" | "date_issued" | "date_due" | "date_returned" | "remarks", ExtArgs["result"]["item_tran_history"]>
  export type item_tran_historyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    library_items?: boolean | item_tran_history$library_itemsArgs<ExtArgs>
    item_tran?: boolean | item_tran_history$item_tranArgs<ExtArgs>
    users_item_tran_history_requested_byTousers?: boolean | item_tran_history$users_item_tran_history_requested_byTousersArgs<ExtArgs>
    users_item_tran_history_approved_byTousers?: boolean | item_tran_history$users_item_tran_history_approved_byTousersArgs<ExtArgs>
    fines?: boolean | item_tran_history$finesArgs<ExtArgs>
    _count?: boolean | Item_tran_historyCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $item_tran_historyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "item_tran_history"
    objects: {
      library_items: Prisma.$library_itemsPayload<ExtArgs> | null
      item_tran: Prisma.$item_tranPayload<ExtArgs> | null
      users_item_tran_history_requested_byTousers: Prisma.$usersPayload<ExtArgs> | null
      users_item_tran_history_approved_byTousers: Prisma.$usersPayload<ExtArgs> | null
      fines: Prisma.$finesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      item_id: number | null
      tran_id: number | null
      status: $Enums.item_tran_history_status
      requested_by: number | null
      approved_by: number | null
      requested_at: Date | null
      approved_at: Date | null
      date_issued: Date | null
      date_due: Date | null
      date_returned: Date | null
      remarks: string | null
    }, ExtArgs["result"]["item_tran_history"]>
    composites: {}
  }

  type item_tran_historyGetPayload<S extends boolean | null | undefined | item_tran_historyDefaultArgs> = $Result.GetResult<Prisma.$item_tran_historyPayload, S>

  type item_tran_historyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<item_tran_historyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Item_tran_historyCountAggregateInputType | true
    }

  export interface item_tran_historyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['item_tran_history'], meta: { name: 'item_tran_history' } }
    /**
     * Find zero or one Item_tran_history that matches the filter.
     * @param {item_tran_historyFindUniqueArgs} args - Arguments to find a Item_tran_history
     * @example
     * // Get one Item_tran_history
     * const item_tran_history = await prisma.item_tran_history.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends item_tran_historyFindUniqueArgs>(args: SelectSubset<T, item_tran_historyFindUniqueArgs<ExtArgs>>): Prisma__item_tran_historyClient<$Result.GetResult<Prisma.$item_tran_historyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Item_tran_history that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {item_tran_historyFindUniqueOrThrowArgs} args - Arguments to find a Item_tran_history
     * @example
     * // Get one Item_tran_history
     * const item_tran_history = await prisma.item_tran_history.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends item_tran_historyFindUniqueOrThrowArgs>(args: SelectSubset<T, item_tran_historyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__item_tran_historyClient<$Result.GetResult<Prisma.$item_tran_historyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item_tran_history that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_tran_historyFindFirstArgs} args - Arguments to find a Item_tran_history
     * @example
     * // Get one Item_tran_history
     * const item_tran_history = await prisma.item_tran_history.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends item_tran_historyFindFirstArgs>(args?: SelectSubset<T, item_tran_historyFindFirstArgs<ExtArgs>>): Prisma__item_tran_historyClient<$Result.GetResult<Prisma.$item_tran_historyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item_tran_history that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_tran_historyFindFirstOrThrowArgs} args - Arguments to find a Item_tran_history
     * @example
     * // Get one Item_tran_history
     * const item_tran_history = await prisma.item_tran_history.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends item_tran_historyFindFirstOrThrowArgs>(args?: SelectSubset<T, item_tran_historyFindFirstOrThrowArgs<ExtArgs>>): Prisma__item_tran_historyClient<$Result.GetResult<Prisma.$item_tran_historyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Item_tran_histories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_tran_historyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Item_tran_histories
     * const item_tran_histories = await prisma.item_tran_history.findMany()
     * 
     * // Get first 10 Item_tran_histories
     * const item_tran_histories = await prisma.item_tran_history.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const item_tran_historyWithIdOnly = await prisma.item_tran_history.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends item_tran_historyFindManyArgs>(args?: SelectSubset<T, item_tran_historyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$item_tran_historyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Item_tran_history.
     * @param {item_tran_historyCreateArgs} args - Arguments to create a Item_tran_history.
     * @example
     * // Create one Item_tran_history
     * const Item_tran_history = await prisma.item_tran_history.create({
     *   data: {
     *     // ... data to create a Item_tran_history
     *   }
     * })
     * 
     */
    create<T extends item_tran_historyCreateArgs>(args: SelectSubset<T, item_tran_historyCreateArgs<ExtArgs>>): Prisma__item_tran_historyClient<$Result.GetResult<Prisma.$item_tran_historyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Item_tran_histories.
     * @param {item_tran_historyCreateManyArgs} args - Arguments to create many Item_tran_histories.
     * @example
     * // Create many Item_tran_histories
     * const item_tran_history = await prisma.item_tran_history.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends item_tran_historyCreateManyArgs>(args?: SelectSubset<T, item_tran_historyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Item_tran_history.
     * @param {item_tran_historyDeleteArgs} args - Arguments to delete one Item_tran_history.
     * @example
     * // Delete one Item_tran_history
     * const Item_tran_history = await prisma.item_tran_history.delete({
     *   where: {
     *     // ... filter to delete one Item_tran_history
     *   }
     * })
     * 
     */
    delete<T extends item_tran_historyDeleteArgs>(args: SelectSubset<T, item_tran_historyDeleteArgs<ExtArgs>>): Prisma__item_tran_historyClient<$Result.GetResult<Prisma.$item_tran_historyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Item_tran_history.
     * @param {item_tran_historyUpdateArgs} args - Arguments to update one Item_tran_history.
     * @example
     * // Update one Item_tran_history
     * const item_tran_history = await prisma.item_tran_history.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends item_tran_historyUpdateArgs>(args: SelectSubset<T, item_tran_historyUpdateArgs<ExtArgs>>): Prisma__item_tran_historyClient<$Result.GetResult<Prisma.$item_tran_historyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Item_tran_histories.
     * @param {item_tran_historyDeleteManyArgs} args - Arguments to filter Item_tran_histories to delete.
     * @example
     * // Delete a few Item_tran_histories
     * const { count } = await prisma.item_tran_history.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends item_tran_historyDeleteManyArgs>(args?: SelectSubset<T, item_tran_historyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Item_tran_histories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_tran_historyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Item_tran_histories
     * const item_tran_history = await prisma.item_tran_history.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends item_tran_historyUpdateManyArgs>(args: SelectSubset<T, item_tran_historyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Item_tran_history.
     * @param {item_tran_historyUpsertArgs} args - Arguments to update or create a Item_tran_history.
     * @example
     * // Update or create a Item_tran_history
     * const item_tran_history = await prisma.item_tran_history.upsert({
     *   create: {
     *     // ... data to create a Item_tran_history
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Item_tran_history we want to update
     *   }
     * })
     */
    upsert<T extends item_tran_historyUpsertArgs>(args: SelectSubset<T, item_tran_historyUpsertArgs<ExtArgs>>): Prisma__item_tran_historyClient<$Result.GetResult<Prisma.$item_tran_historyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Item_tran_histories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_tran_historyCountArgs} args - Arguments to filter Item_tran_histories to count.
     * @example
     * // Count the number of Item_tran_histories
     * const count = await prisma.item_tran_history.count({
     *   where: {
     *     // ... the filter for the Item_tran_histories we want to count
     *   }
     * })
    **/
    count<T extends item_tran_historyCountArgs>(
      args?: Subset<T, item_tran_historyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Item_tran_historyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Item_tran_history.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Item_tran_historyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Item_tran_historyAggregateArgs>(args: Subset<T, Item_tran_historyAggregateArgs>): Prisma.PrismaPromise<GetItem_tran_historyAggregateType<T>>

    /**
     * Group by Item_tran_history.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_tran_historyGroupByArgs} args - Group by arguments.
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
      T extends item_tran_historyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: item_tran_historyGroupByArgs['orderBy'] }
        : { orderBy?: item_tran_historyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, item_tran_historyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItem_tran_historyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the item_tran_history model
   */
  readonly fields: item_tran_historyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for item_tran_history.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__item_tran_historyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    library_items<T extends item_tran_history$library_itemsArgs<ExtArgs> = {}>(args?: Subset<T, item_tran_history$library_itemsArgs<ExtArgs>>): Prisma__library_itemsClient<$Result.GetResult<Prisma.$library_itemsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    item_tran<T extends item_tran_history$item_tranArgs<ExtArgs> = {}>(args?: Subset<T, item_tran_history$item_tranArgs<ExtArgs>>): Prisma__item_tranClient<$Result.GetResult<Prisma.$item_tranPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    users_item_tran_history_requested_byTousers<T extends item_tran_history$users_item_tran_history_requested_byTousersArgs<ExtArgs> = {}>(args?: Subset<T, item_tran_history$users_item_tran_history_requested_byTousersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    users_item_tran_history_approved_byTousers<T extends item_tran_history$users_item_tran_history_approved_byTousersArgs<ExtArgs> = {}>(args?: Subset<T, item_tran_history$users_item_tran_history_approved_byTousersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    fines<T extends item_tran_history$finesArgs<ExtArgs> = {}>(args?: Subset<T, item_tran_history$finesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$finesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the item_tran_history model
   */
  interface item_tran_historyFieldRefs {
    readonly id: FieldRef<"item_tran_history", 'Int'>
    readonly item_id: FieldRef<"item_tran_history", 'Int'>
    readonly tran_id: FieldRef<"item_tran_history", 'Int'>
    readonly status: FieldRef<"item_tran_history", 'item_tran_history_status'>
    readonly requested_by: FieldRef<"item_tran_history", 'Int'>
    readonly approved_by: FieldRef<"item_tran_history", 'Int'>
    readonly requested_at: FieldRef<"item_tran_history", 'DateTime'>
    readonly approved_at: FieldRef<"item_tran_history", 'DateTime'>
    readonly date_issued: FieldRef<"item_tran_history", 'DateTime'>
    readonly date_due: FieldRef<"item_tran_history", 'DateTime'>
    readonly date_returned: FieldRef<"item_tran_history", 'DateTime'>
    readonly remarks: FieldRef<"item_tran_history", 'String'>
  }
    

  // Custom InputTypes
  /**
   * item_tran_history findUnique
   */
  export type item_tran_historyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran_history
     */
    select?: item_tran_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran_history
     */
    omit?: item_tran_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tran_historyInclude<ExtArgs> | null
    /**
     * Filter, which item_tran_history to fetch.
     */
    where: item_tran_historyWhereUniqueInput
  }

  /**
   * item_tran_history findUniqueOrThrow
   */
  export type item_tran_historyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran_history
     */
    select?: item_tran_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran_history
     */
    omit?: item_tran_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tran_historyInclude<ExtArgs> | null
    /**
     * Filter, which item_tran_history to fetch.
     */
    where: item_tran_historyWhereUniqueInput
  }

  /**
   * item_tran_history findFirst
   */
  export type item_tran_historyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran_history
     */
    select?: item_tran_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran_history
     */
    omit?: item_tran_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tran_historyInclude<ExtArgs> | null
    /**
     * Filter, which item_tran_history to fetch.
     */
    where?: item_tran_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of item_tran_histories to fetch.
     */
    orderBy?: item_tran_historyOrderByWithRelationInput | item_tran_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for item_tran_histories.
     */
    cursor?: item_tran_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` item_tran_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` item_tran_histories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of item_tran_histories.
     */
    distinct?: Item_tran_historyScalarFieldEnum | Item_tran_historyScalarFieldEnum[]
  }

  /**
   * item_tran_history findFirstOrThrow
   */
  export type item_tran_historyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran_history
     */
    select?: item_tran_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran_history
     */
    omit?: item_tran_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tran_historyInclude<ExtArgs> | null
    /**
     * Filter, which item_tran_history to fetch.
     */
    where?: item_tran_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of item_tran_histories to fetch.
     */
    orderBy?: item_tran_historyOrderByWithRelationInput | item_tran_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for item_tran_histories.
     */
    cursor?: item_tran_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` item_tran_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` item_tran_histories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of item_tran_histories.
     */
    distinct?: Item_tran_historyScalarFieldEnum | Item_tran_historyScalarFieldEnum[]
  }

  /**
   * item_tran_history findMany
   */
  export type item_tran_historyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran_history
     */
    select?: item_tran_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran_history
     */
    omit?: item_tran_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tran_historyInclude<ExtArgs> | null
    /**
     * Filter, which item_tran_histories to fetch.
     */
    where?: item_tran_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of item_tran_histories to fetch.
     */
    orderBy?: item_tran_historyOrderByWithRelationInput | item_tran_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing item_tran_histories.
     */
    cursor?: item_tran_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` item_tran_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` item_tran_histories.
     */
    skip?: number
    distinct?: Item_tran_historyScalarFieldEnum | Item_tran_historyScalarFieldEnum[]
  }

  /**
   * item_tran_history create
   */
  export type item_tran_historyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran_history
     */
    select?: item_tran_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran_history
     */
    omit?: item_tran_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tran_historyInclude<ExtArgs> | null
    /**
     * The data needed to create a item_tran_history.
     */
    data?: XOR<item_tran_historyCreateInput, item_tran_historyUncheckedCreateInput>
  }

  /**
   * item_tran_history createMany
   */
  export type item_tran_historyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many item_tran_histories.
     */
    data: item_tran_historyCreateManyInput | item_tran_historyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * item_tran_history update
   */
  export type item_tran_historyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran_history
     */
    select?: item_tran_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran_history
     */
    omit?: item_tran_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tran_historyInclude<ExtArgs> | null
    /**
     * The data needed to update a item_tran_history.
     */
    data: XOR<item_tran_historyUpdateInput, item_tran_historyUncheckedUpdateInput>
    /**
     * Choose, which item_tran_history to update.
     */
    where: item_tran_historyWhereUniqueInput
  }

  /**
   * item_tran_history updateMany
   */
  export type item_tran_historyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update item_tran_histories.
     */
    data: XOR<item_tran_historyUpdateManyMutationInput, item_tran_historyUncheckedUpdateManyInput>
    /**
     * Filter which item_tran_histories to update
     */
    where?: item_tran_historyWhereInput
    /**
     * Limit how many item_tran_histories to update.
     */
    limit?: number
  }

  /**
   * item_tran_history upsert
   */
  export type item_tran_historyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran_history
     */
    select?: item_tran_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran_history
     */
    omit?: item_tran_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tran_historyInclude<ExtArgs> | null
    /**
     * The filter to search for the item_tran_history to update in case it exists.
     */
    where: item_tran_historyWhereUniqueInput
    /**
     * In case the item_tran_history found by the `where` argument doesn't exist, create a new item_tran_history with this data.
     */
    create: XOR<item_tran_historyCreateInput, item_tran_historyUncheckedCreateInput>
    /**
     * In case the item_tran_history was found with the provided `where` argument, update it with this data.
     */
    update: XOR<item_tran_historyUpdateInput, item_tran_historyUncheckedUpdateInput>
  }

  /**
   * item_tran_history delete
   */
  export type item_tran_historyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran_history
     */
    select?: item_tran_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran_history
     */
    omit?: item_tran_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tran_historyInclude<ExtArgs> | null
    /**
     * Filter which item_tran_history to delete.
     */
    where: item_tran_historyWhereUniqueInput
  }

  /**
   * item_tran_history deleteMany
   */
  export type item_tran_historyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which item_tran_histories to delete
     */
    where?: item_tran_historyWhereInput
    /**
     * Limit how many item_tran_histories to delete.
     */
    limit?: number
  }

  /**
   * item_tran_history.library_items
   */
  export type item_tran_history$library_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the library_items
     */
    select?: library_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the library_items
     */
    omit?: library_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: library_itemsInclude<ExtArgs> | null
    where?: library_itemsWhereInput
  }

  /**
   * item_tran_history.item_tran
   */
  export type item_tran_history$item_tranArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran
     */
    select?: item_tranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran
     */
    omit?: item_tranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tranInclude<ExtArgs> | null
    where?: item_tranWhereInput
  }

  /**
   * item_tran_history.users_item_tran_history_requested_byTousers
   */
  export type item_tran_history$users_item_tran_history_requested_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * item_tran_history.users_item_tran_history_approved_byTousers
   */
  export type item_tran_history$users_item_tran_history_approved_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * item_tran_history.fines
   */
  export type item_tran_history$finesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the fines
     */
    select?: finesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the fines
     */
    omit?: finesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: finesInclude<ExtArgs> | null
    where?: finesWhereInput
    orderBy?: finesOrderByWithRelationInput | finesOrderByWithRelationInput[]
    cursor?: finesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FinesScalarFieldEnum | FinesScalarFieldEnum[]
  }

  /**
   * item_tran_history without action
   */
  export type item_tran_historyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran_history
     */
    select?: item_tran_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran_history
     */
    omit?: item_tran_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tran_historyInclude<ExtArgs> | null
  }


  /**
   * Model library_items
   */

  export type AggregateLibrary_items = {
    _count: Library_itemsCountAggregateOutputType | null
    _avg: Library_itemsAvgAggregateOutputType | null
    _sum: Library_itemsSumAggregateOutputType | null
    _min: Library_itemsMinAggregateOutputType | null
    _max: Library_itemsMaxAggregateOutputType | null
  }

  export type Library_itemsAvgAggregateOutputType = {
    item_id: number | null
    year: number | null
    librarian_id: number | null
    pages: number | null
    duration: number | null
  }

  export type Library_itemsSumAggregateOutputType = {
    item_id: number | null
    year: number | null
    librarian_id: number | null
    pages: number | null
    duration: number | null
  }

  export type Library_itemsMinAggregateOutputType = {
    item_id: number | null
    title: string | null
    author: string | null
    isbn: string | null
    year: number | null
    genre: string | null
    image_url: string | null
    description: string | null
    librarian_id: number | null
    item_type: $Enums.library_item_type | null
    location: string | null
    publisher: string | null
    language: string | null
    pages: number | null
    duration: number | null
    format: string | null
    subject: string | null
    keywords: string | null
    created_at: Date | null
    updated_at: Date | null
    record_status: $Enums.record_status | null
  }

  export type Library_itemsMaxAggregateOutputType = {
    item_id: number | null
    title: string | null
    author: string | null
    isbn: string | null
    year: number | null
    genre: string | null
    image_url: string | null
    description: string | null
    librarian_id: number | null
    item_type: $Enums.library_item_type | null
    location: string | null
    publisher: string | null
    language: string | null
    pages: number | null
    duration: number | null
    format: string | null
    subject: string | null
    keywords: string | null
    created_at: Date | null
    updated_at: Date | null
    record_status: $Enums.record_status | null
  }

  export type Library_itemsCountAggregateOutputType = {
    item_id: number
    title: number
    author: number
    isbn: number
    year: number
    genre: number
    image_url: number
    description: number
    librarian_id: number
    item_type: number
    location: number
    publisher: number
    language: number
    pages: number
    duration: number
    format: number
    subject: number
    keywords: number
    created_at: number
    updated_at: number
    record_status: number
    _all: number
  }


  export type Library_itemsAvgAggregateInputType = {
    item_id?: true
    year?: true
    librarian_id?: true
    pages?: true
    duration?: true
  }

  export type Library_itemsSumAggregateInputType = {
    item_id?: true
    year?: true
    librarian_id?: true
    pages?: true
    duration?: true
  }

  export type Library_itemsMinAggregateInputType = {
    item_id?: true
    title?: true
    author?: true
    isbn?: true
    year?: true
    genre?: true
    image_url?: true
    description?: true
    librarian_id?: true
    item_type?: true
    location?: true
    publisher?: true
    language?: true
    pages?: true
    duration?: true
    format?: true
    subject?: true
    keywords?: true
    created_at?: true
    updated_at?: true
    record_status?: true
  }

  export type Library_itemsMaxAggregateInputType = {
    item_id?: true
    title?: true
    author?: true
    isbn?: true
    year?: true
    genre?: true
    image_url?: true
    description?: true
    librarian_id?: true
    item_type?: true
    location?: true
    publisher?: true
    language?: true
    pages?: true
    duration?: true
    format?: true
    subject?: true
    keywords?: true
    created_at?: true
    updated_at?: true
    record_status?: true
  }

  export type Library_itemsCountAggregateInputType = {
    item_id?: true
    title?: true
    author?: true
    isbn?: true
    year?: true
    genre?: true
    image_url?: true
    description?: true
    librarian_id?: true
    item_type?: true
    location?: true
    publisher?: true
    language?: true
    pages?: true
    duration?: true
    format?: true
    subject?: true
    keywords?: true
    created_at?: true
    updated_at?: true
    record_status?: true
    _all?: true
  }

  export type Library_itemsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which library_items to aggregate.
     */
    where?: library_itemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of library_items to fetch.
     */
    orderBy?: library_itemsOrderByWithRelationInput | library_itemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: library_itemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` library_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` library_items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned library_items
    **/
    _count?: true | Library_itemsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Library_itemsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Library_itemsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Library_itemsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Library_itemsMaxAggregateInputType
  }

  export type GetLibrary_itemsAggregateType<T extends Library_itemsAggregateArgs> = {
        [P in keyof T & keyof AggregateLibrary_items]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLibrary_items[P]>
      : GetScalarType<T[P], AggregateLibrary_items[P]>
  }




  export type library_itemsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: library_itemsWhereInput
    orderBy?: library_itemsOrderByWithAggregationInput | library_itemsOrderByWithAggregationInput[]
    by: Library_itemsScalarFieldEnum[] | Library_itemsScalarFieldEnum
    having?: library_itemsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Library_itemsCountAggregateInputType | true
    _avg?: Library_itemsAvgAggregateInputType
    _sum?: Library_itemsSumAggregateInputType
    _min?: Library_itemsMinAggregateInputType
    _max?: Library_itemsMaxAggregateInputType
  }

  export type Library_itemsGroupByOutputType = {
    item_id: number
    title: string | null
    author: string
    isbn: string | null
    year: number | null
    genre: string | null
    image_url: string | null
    description: string | null
    librarian_id: number | null
    item_type: $Enums.library_item_type
    location: string | null
    publisher: string | null
    language: string | null
    pages: number | null
    duration: number | null
    format: string | null
    subject: string | null
    keywords: string | null
    created_at: Date | null
    updated_at: Date | null
    record_status: $Enums.record_status | null
    _count: Library_itemsCountAggregateOutputType | null
    _avg: Library_itemsAvgAggregateOutputType | null
    _sum: Library_itemsSumAggregateOutputType | null
    _min: Library_itemsMinAggregateOutputType | null
    _max: Library_itemsMaxAggregateOutputType | null
  }

  type GetLibrary_itemsGroupByPayload<T extends library_itemsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Library_itemsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Library_itemsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Library_itemsGroupByOutputType[P]>
            : GetScalarType<T[P], Library_itemsGroupByOutputType[P]>
        }
      >
    >


  export type library_itemsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    item_id?: boolean
    title?: boolean
    author?: boolean
    isbn?: boolean
    year?: boolean
    genre?: boolean
    image_url?: boolean
    description?: boolean
    librarian_id?: boolean
    item_type?: boolean
    location?: boolean
    publisher?: boolean
    language?: boolean
    pages?: boolean
    duration?: boolean
    format?: boolean
    subject?: boolean
    keywords?: boolean
    created_at?: boolean
    updated_at?: boolean
    record_status?: boolean
    item_tran?: boolean | library_items$item_tranArgs<ExtArgs>
    item_tran_history?: boolean | library_items$item_tran_historyArgs<ExtArgs>
    notifications?: boolean | library_items$notificationsArgs<ExtArgs>
    user_wishlist?: boolean | library_items$user_wishlistArgs<ExtArgs>
    _count?: boolean | Library_itemsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["library_items"]>



  export type library_itemsSelectScalar = {
    item_id?: boolean
    title?: boolean
    author?: boolean
    isbn?: boolean
    year?: boolean
    genre?: boolean
    image_url?: boolean
    description?: boolean
    librarian_id?: boolean
    item_type?: boolean
    location?: boolean
    publisher?: boolean
    language?: boolean
    pages?: boolean
    duration?: boolean
    format?: boolean
    subject?: boolean
    keywords?: boolean
    created_at?: boolean
    updated_at?: boolean
    record_status?: boolean
  }

  export type library_itemsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"item_id" | "title" | "author" | "isbn" | "year" | "genre" | "image_url" | "description" | "librarian_id" | "item_type" | "location" | "publisher" | "language" | "pages" | "duration" | "format" | "subject" | "keywords" | "created_at" | "updated_at" | "record_status", ExtArgs["result"]["library_items"]>
  export type library_itemsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item_tran?: boolean | library_items$item_tranArgs<ExtArgs>
    item_tran_history?: boolean | library_items$item_tran_historyArgs<ExtArgs>
    notifications?: boolean | library_items$notificationsArgs<ExtArgs>
    user_wishlist?: boolean | library_items$user_wishlistArgs<ExtArgs>
    _count?: boolean | Library_itemsCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $library_itemsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "library_items"
    objects: {
      item_tran: Prisma.$item_tranPayload<ExtArgs>[]
      item_tran_history: Prisma.$item_tran_historyPayload<ExtArgs>[]
      notifications: Prisma.$notificationsPayload<ExtArgs>[]
      user_wishlist: Prisma.$user_wishlistPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      item_id: number
      title: string | null
      author: string
      isbn: string | null
      year: number | null
      genre: string | null
      image_url: string | null
      description: string | null
      librarian_id: number | null
      item_type: $Enums.library_item_type
      location: string | null
      publisher: string | null
      language: string | null
      pages: number | null
      duration: number | null
      format: string | null
      subject: string | null
      keywords: string | null
      created_at: Date | null
      updated_at: Date | null
      record_status: $Enums.record_status | null
    }, ExtArgs["result"]["library_items"]>
    composites: {}
  }

  type library_itemsGetPayload<S extends boolean | null | undefined | library_itemsDefaultArgs> = $Result.GetResult<Prisma.$library_itemsPayload, S>

  type library_itemsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<library_itemsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Library_itemsCountAggregateInputType | true
    }

  export interface library_itemsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['library_items'], meta: { name: 'library_items' } }
    /**
     * Find zero or one Library_items that matches the filter.
     * @param {library_itemsFindUniqueArgs} args - Arguments to find a Library_items
     * @example
     * // Get one Library_items
     * const library_items = await prisma.library_items.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends library_itemsFindUniqueArgs>(args: SelectSubset<T, library_itemsFindUniqueArgs<ExtArgs>>): Prisma__library_itemsClient<$Result.GetResult<Prisma.$library_itemsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Library_items that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {library_itemsFindUniqueOrThrowArgs} args - Arguments to find a Library_items
     * @example
     * // Get one Library_items
     * const library_items = await prisma.library_items.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends library_itemsFindUniqueOrThrowArgs>(args: SelectSubset<T, library_itemsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__library_itemsClient<$Result.GetResult<Prisma.$library_itemsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Library_items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {library_itemsFindFirstArgs} args - Arguments to find a Library_items
     * @example
     * // Get one Library_items
     * const library_items = await prisma.library_items.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends library_itemsFindFirstArgs>(args?: SelectSubset<T, library_itemsFindFirstArgs<ExtArgs>>): Prisma__library_itemsClient<$Result.GetResult<Prisma.$library_itemsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Library_items that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {library_itemsFindFirstOrThrowArgs} args - Arguments to find a Library_items
     * @example
     * // Get one Library_items
     * const library_items = await prisma.library_items.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends library_itemsFindFirstOrThrowArgs>(args?: SelectSubset<T, library_itemsFindFirstOrThrowArgs<ExtArgs>>): Prisma__library_itemsClient<$Result.GetResult<Prisma.$library_itemsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Library_items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {library_itemsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Library_items
     * const library_items = await prisma.library_items.findMany()
     * 
     * // Get first 10 Library_items
     * const library_items = await prisma.library_items.findMany({ take: 10 })
     * 
     * // Only select the `item_id`
     * const library_itemsWithItem_idOnly = await prisma.library_items.findMany({ select: { item_id: true } })
     * 
     */
    findMany<T extends library_itemsFindManyArgs>(args?: SelectSubset<T, library_itemsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$library_itemsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Library_items.
     * @param {library_itemsCreateArgs} args - Arguments to create a Library_items.
     * @example
     * // Create one Library_items
     * const Library_items = await prisma.library_items.create({
     *   data: {
     *     // ... data to create a Library_items
     *   }
     * })
     * 
     */
    create<T extends library_itemsCreateArgs>(args: SelectSubset<T, library_itemsCreateArgs<ExtArgs>>): Prisma__library_itemsClient<$Result.GetResult<Prisma.$library_itemsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Library_items.
     * @param {library_itemsCreateManyArgs} args - Arguments to create many Library_items.
     * @example
     * // Create many Library_items
     * const library_items = await prisma.library_items.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends library_itemsCreateManyArgs>(args?: SelectSubset<T, library_itemsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Library_items.
     * @param {library_itemsDeleteArgs} args - Arguments to delete one Library_items.
     * @example
     * // Delete one Library_items
     * const Library_items = await prisma.library_items.delete({
     *   where: {
     *     // ... filter to delete one Library_items
     *   }
     * })
     * 
     */
    delete<T extends library_itemsDeleteArgs>(args: SelectSubset<T, library_itemsDeleteArgs<ExtArgs>>): Prisma__library_itemsClient<$Result.GetResult<Prisma.$library_itemsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Library_items.
     * @param {library_itemsUpdateArgs} args - Arguments to update one Library_items.
     * @example
     * // Update one Library_items
     * const library_items = await prisma.library_items.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends library_itemsUpdateArgs>(args: SelectSubset<T, library_itemsUpdateArgs<ExtArgs>>): Prisma__library_itemsClient<$Result.GetResult<Prisma.$library_itemsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Library_items.
     * @param {library_itemsDeleteManyArgs} args - Arguments to filter Library_items to delete.
     * @example
     * // Delete a few Library_items
     * const { count } = await prisma.library_items.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends library_itemsDeleteManyArgs>(args?: SelectSubset<T, library_itemsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Library_items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {library_itemsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Library_items
     * const library_items = await prisma.library_items.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends library_itemsUpdateManyArgs>(args: SelectSubset<T, library_itemsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Library_items.
     * @param {library_itemsUpsertArgs} args - Arguments to update or create a Library_items.
     * @example
     * // Update or create a Library_items
     * const library_items = await prisma.library_items.upsert({
     *   create: {
     *     // ... data to create a Library_items
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Library_items we want to update
     *   }
     * })
     */
    upsert<T extends library_itemsUpsertArgs>(args: SelectSubset<T, library_itemsUpsertArgs<ExtArgs>>): Prisma__library_itemsClient<$Result.GetResult<Prisma.$library_itemsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Library_items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {library_itemsCountArgs} args - Arguments to filter Library_items to count.
     * @example
     * // Count the number of Library_items
     * const count = await prisma.library_items.count({
     *   where: {
     *     // ... the filter for the Library_items we want to count
     *   }
     * })
    **/
    count<T extends library_itemsCountArgs>(
      args?: Subset<T, library_itemsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Library_itemsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Library_items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Library_itemsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Library_itemsAggregateArgs>(args: Subset<T, Library_itemsAggregateArgs>): Prisma.PrismaPromise<GetLibrary_itemsAggregateType<T>>

    /**
     * Group by Library_items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {library_itemsGroupByArgs} args - Group by arguments.
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
      T extends library_itemsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: library_itemsGroupByArgs['orderBy'] }
        : { orderBy?: library_itemsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, library_itemsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLibrary_itemsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the library_items model
   */
  readonly fields: library_itemsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for library_items.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__library_itemsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    item_tran<T extends library_items$item_tranArgs<ExtArgs> = {}>(args?: Subset<T, library_items$item_tranArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$item_tranPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    item_tran_history<T extends library_items$item_tran_historyArgs<ExtArgs> = {}>(args?: Subset<T, library_items$item_tran_historyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$item_tran_historyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends library_items$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, library_items$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user_wishlist<T extends library_items$user_wishlistArgs<ExtArgs> = {}>(args?: Subset<T, library_items$user_wishlistArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_wishlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the library_items model
   */
  interface library_itemsFieldRefs {
    readonly item_id: FieldRef<"library_items", 'Int'>
    readonly title: FieldRef<"library_items", 'String'>
    readonly author: FieldRef<"library_items", 'String'>
    readonly isbn: FieldRef<"library_items", 'String'>
    readonly year: FieldRef<"library_items", 'Int'>
    readonly genre: FieldRef<"library_items", 'String'>
    readonly image_url: FieldRef<"library_items", 'String'>
    readonly description: FieldRef<"library_items", 'String'>
    readonly librarian_id: FieldRef<"library_items", 'Int'>
    readonly item_type: FieldRef<"library_items", 'library_item_type'>
    readonly location: FieldRef<"library_items", 'String'>
    readonly publisher: FieldRef<"library_items", 'String'>
    readonly language: FieldRef<"library_items", 'String'>
    readonly pages: FieldRef<"library_items", 'Int'>
    readonly duration: FieldRef<"library_items", 'Int'>
    readonly format: FieldRef<"library_items", 'String'>
    readonly subject: FieldRef<"library_items", 'String'>
    readonly keywords: FieldRef<"library_items", 'String'>
    readonly created_at: FieldRef<"library_items", 'DateTime'>
    readonly updated_at: FieldRef<"library_items", 'DateTime'>
    readonly record_status: FieldRef<"library_items", 'record_status'>
  }
    

  // Custom InputTypes
  /**
   * library_items findUnique
   */
  export type library_itemsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the library_items
     */
    select?: library_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the library_items
     */
    omit?: library_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: library_itemsInclude<ExtArgs> | null
    /**
     * Filter, which library_items to fetch.
     */
    where: library_itemsWhereUniqueInput
  }

  /**
   * library_items findUniqueOrThrow
   */
  export type library_itemsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the library_items
     */
    select?: library_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the library_items
     */
    omit?: library_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: library_itemsInclude<ExtArgs> | null
    /**
     * Filter, which library_items to fetch.
     */
    where: library_itemsWhereUniqueInput
  }

  /**
   * library_items findFirst
   */
  export type library_itemsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the library_items
     */
    select?: library_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the library_items
     */
    omit?: library_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: library_itemsInclude<ExtArgs> | null
    /**
     * Filter, which library_items to fetch.
     */
    where?: library_itemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of library_items to fetch.
     */
    orderBy?: library_itemsOrderByWithRelationInput | library_itemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for library_items.
     */
    cursor?: library_itemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` library_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` library_items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of library_items.
     */
    distinct?: Library_itemsScalarFieldEnum | Library_itemsScalarFieldEnum[]
  }

  /**
   * library_items findFirstOrThrow
   */
  export type library_itemsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the library_items
     */
    select?: library_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the library_items
     */
    omit?: library_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: library_itemsInclude<ExtArgs> | null
    /**
     * Filter, which library_items to fetch.
     */
    where?: library_itemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of library_items to fetch.
     */
    orderBy?: library_itemsOrderByWithRelationInput | library_itemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for library_items.
     */
    cursor?: library_itemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` library_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` library_items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of library_items.
     */
    distinct?: Library_itemsScalarFieldEnum | Library_itemsScalarFieldEnum[]
  }

  /**
   * library_items findMany
   */
  export type library_itemsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the library_items
     */
    select?: library_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the library_items
     */
    omit?: library_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: library_itemsInclude<ExtArgs> | null
    /**
     * Filter, which library_items to fetch.
     */
    where?: library_itemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of library_items to fetch.
     */
    orderBy?: library_itemsOrderByWithRelationInput | library_itemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing library_items.
     */
    cursor?: library_itemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` library_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` library_items.
     */
    skip?: number
    distinct?: Library_itemsScalarFieldEnum | Library_itemsScalarFieldEnum[]
  }

  /**
   * library_items create
   */
  export type library_itemsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the library_items
     */
    select?: library_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the library_items
     */
    omit?: library_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: library_itemsInclude<ExtArgs> | null
    /**
     * The data needed to create a library_items.
     */
    data: XOR<library_itemsCreateInput, library_itemsUncheckedCreateInput>
  }

  /**
   * library_items createMany
   */
  export type library_itemsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many library_items.
     */
    data: library_itemsCreateManyInput | library_itemsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * library_items update
   */
  export type library_itemsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the library_items
     */
    select?: library_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the library_items
     */
    omit?: library_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: library_itemsInclude<ExtArgs> | null
    /**
     * The data needed to update a library_items.
     */
    data: XOR<library_itemsUpdateInput, library_itemsUncheckedUpdateInput>
    /**
     * Choose, which library_items to update.
     */
    where: library_itemsWhereUniqueInput
  }

  /**
   * library_items updateMany
   */
  export type library_itemsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update library_items.
     */
    data: XOR<library_itemsUpdateManyMutationInput, library_itemsUncheckedUpdateManyInput>
    /**
     * Filter which library_items to update
     */
    where?: library_itemsWhereInput
    /**
     * Limit how many library_items to update.
     */
    limit?: number
  }

  /**
   * library_items upsert
   */
  export type library_itemsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the library_items
     */
    select?: library_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the library_items
     */
    omit?: library_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: library_itemsInclude<ExtArgs> | null
    /**
     * The filter to search for the library_items to update in case it exists.
     */
    where: library_itemsWhereUniqueInput
    /**
     * In case the library_items found by the `where` argument doesn't exist, create a new library_items with this data.
     */
    create: XOR<library_itemsCreateInput, library_itemsUncheckedCreateInput>
    /**
     * In case the library_items was found with the provided `where` argument, update it with this data.
     */
    update: XOR<library_itemsUpdateInput, library_itemsUncheckedUpdateInput>
  }

  /**
   * library_items delete
   */
  export type library_itemsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the library_items
     */
    select?: library_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the library_items
     */
    omit?: library_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: library_itemsInclude<ExtArgs> | null
    /**
     * Filter which library_items to delete.
     */
    where: library_itemsWhereUniqueInput
  }

  /**
   * library_items deleteMany
   */
  export type library_itemsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which library_items to delete
     */
    where?: library_itemsWhereInput
    /**
     * Limit how many library_items to delete.
     */
    limit?: number
  }

  /**
   * library_items.item_tran
   */
  export type library_items$item_tranArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran
     */
    select?: item_tranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran
     */
    omit?: item_tranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tranInclude<ExtArgs> | null
    where?: item_tranWhereInput
    orderBy?: item_tranOrderByWithRelationInput | item_tranOrderByWithRelationInput[]
    cursor?: item_tranWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Item_tranScalarFieldEnum | Item_tranScalarFieldEnum[]
  }

  /**
   * library_items.item_tran_history
   */
  export type library_items$item_tran_historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran_history
     */
    select?: item_tran_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran_history
     */
    omit?: item_tran_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tran_historyInclude<ExtArgs> | null
    where?: item_tran_historyWhereInput
    orderBy?: item_tran_historyOrderByWithRelationInput | item_tran_historyOrderByWithRelationInput[]
    cursor?: item_tran_historyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Item_tran_historyScalarFieldEnum | Item_tran_historyScalarFieldEnum[]
  }

  /**
   * library_items.notifications
   */
  export type library_items$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    where?: notificationsWhereInput
    orderBy?: notificationsOrderByWithRelationInput | notificationsOrderByWithRelationInput[]
    cursor?: notificationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationsScalarFieldEnum | NotificationsScalarFieldEnum[]
  }

  /**
   * library_items.user_wishlist
   */
  export type library_items$user_wishlistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_wishlist
     */
    select?: user_wishlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_wishlist
     */
    omit?: user_wishlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_wishlistInclude<ExtArgs> | null
    where?: user_wishlistWhereInput
    orderBy?: user_wishlistOrderByWithRelationInput | user_wishlistOrderByWithRelationInput[]
    cursor?: user_wishlistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: User_wishlistScalarFieldEnum | User_wishlistScalarFieldEnum[]
  }

  /**
   * library_items without action
   */
  export type library_itemsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the library_items
     */
    select?: library_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the library_items
     */
    omit?: library_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: library_itemsInclude<ExtArgs> | null
  }


  /**
   * Model fines
   */

  export type AggregateFines = {
    _count: FinesCountAggregateOutputType | null
    _avg: FinesAvgAggregateOutputType | null
    _sum: FinesSumAggregateOutputType | null
    _min: FinesMinAggregateOutputType | null
    _max: FinesMaxAggregateOutputType | null
  }

  export type FinesAvgAggregateOutputType = {
    fine_id: number | null
    user_id: number | null
    item_tran_historyId: number | null
    amount: Decimal | null
  }

  export type FinesSumAggregateOutputType = {
    fine_id: number | null
    user_id: number | null
    item_tran_historyId: number | null
    amount: Decimal | null
  }

  export type FinesMinAggregateOutputType = {
    fine_id: number | null
    user_id: number | null
    item_tran_historyId: number | null
    amount: Decimal | null
    reason: string | null
    status: $Enums.fines_status | null
    created_at: Date | null
    paid_at: Date | null
  }

  export type FinesMaxAggregateOutputType = {
    fine_id: number | null
    user_id: number | null
    item_tran_historyId: number | null
    amount: Decimal | null
    reason: string | null
    status: $Enums.fines_status | null
    created_at: Date | null
    paid_at: Date | null
  }

  export type FinesCountAggregateOutputType = {
    fine_id: number
    user_id: number
    item_tran_historyId: number
    amount: number
    reason: number
    status: number
    created_at: number
    paid_at: number
    _all: number
  }


  export type FinesAvgAggregateInputType = {
    fine_id?: true
    user_id?: true
    item_tran_historyId?: true
    amount?: true
  }

  export type FinesSumAggregateInputType = {
    fine_id?: true
    user_id?: true
    item_tran_historyId?: true
    amount?: true
  }

  export type FinesMinAggregateInputType = {
    fine_id?: true
    user_id?: true
    item_tran_historyId?: true
    amount?: true
    reason?: true
    status?: true
    created_at?: true
    paid_at?: true
  }

  export type FinesMaxAggregateInputType = {
    fine_id?: true
    user_id?: true
    item_tran_historyId?: true
    amount?: true
    reason?: true
    status?: true
    created_at?: true
    paid_at?: true
  }

  export type FinesCountAggregateInputType = {
    fine_id?: true
    user_id?: true
    item_tran_historyId?: true
    amount?: true
    reason?: true
    status?: true
    created_at?: true
    paid_at?: true
    _all?: true
  }

  export type FinesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which fines to aggregate.
     */
    where?: finesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of fines to fetch.
     */
    orderBy?: finesOrderByWithRelationInput | finesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: finesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` fines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` fines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned fines
    **/
    _count?: true | FinesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FinesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FinesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FinesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FinesMaxAggregateInputType
  }

  export type GetFinesAggregateType<T extends FinesAggregateArgs> = {
        [P in keyof T & keyof AggregateFines]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFines[P]>
      : GetScalarType<T[P], AggregateFines[P]>
  }




  export type finesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: finesWhereInput
    orderBy?: finesOrderByWithAggregationInput | finesOrderByWithAggregationInput[]
    by: FinesScalarFieldEnum[] | FinesScalarFieldEnum
    having?: finesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FinesCountAggregateInputType | true
    _avg?: FinesAvgAggregateInputType
    _sum?: FinesSumAggregateInputType
    _min?: FinesMinAggregateInputType
    _max?: FinesMaxAggregateInputType
  }

  export type FinesGroupByOutputType = {
    fine_id: number
    user_id: number | null
    item_tran_historyId: number | null
    amount: Decimal | null
    reason: string | null
    status: $Enums.fines_status | null
    created_at: Date | null
    paid_at: Date | null
    _count: FinesCountAggregateOutputType | null
    _avg: FinesAvgAggregateOutputType | null
    _sum: FinesSumAggregateOutputType | null
    _min: FinesMinAggregateOutputType | null
    _max: FinesMaxAggregateOutputType | null
  }

  type GetFinesGroupByPayload<T extends finesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FinesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FinesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FinesGroupByOutputType[P]>
            : GetScalarType<T[P], FinesGroupByOutputType[P]>
        }
      >
    >


  export type finesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    fine_id?: boolean
    user_id?: boolean
    item_tran_historyId?: boolean
    amount?: boolean
    reason?: boolean
    status?: boolean
    created_at?: boolean
    paid_at?: boolean
    users?: boolean | fines$usersArgs<ExtArgs>
    item_tran_history?: boolean | fines$item_tran_historyArgs<ExtArgs>
  }, ExtArgs["result"]["fines"]>



  export type finesSelectScalar = {
    fine_id?: boolean
    user_id?: boolean
    item_tran_historyId?: boolean
    amount?: boolean
    reason?: boolean
    status?: boolean
    created_at?: boolean
    paid_at?: boolean
  }

  export type finesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"fine_id" | "user_id" | "item_tran_historyId" | "amount" | "reason" | "status" | "created_at" | "paid_at", ExtArgs["result"]["fines"]>
  export type finesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | fines$usersArgs<ExtArgs>
    item_tran_history?: boolean | fines$item_tran_historyArgs<ExtArgs>
  }

  export type $finesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "fines"
    objects: {
      users: Prisma.$usersPayload<ExtArgs> | null
      item_tran_history: Prisma.$item_tran_historyPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      fine_id: number
      user_id: number | null
      item_tran_historyId: number | null
      amount: Prisma.Decimal | null
      reason: string | null
      status: $Enums.fines_status | null
      created_at: Date | null
      paid_at: Date | null
    }, ExtArgs["result"]["fines"]>
    composites: {}
  }

  type finesGetPayload<S extends boolean | null | undefined | finesDefaultArgs> = $Result.GetResult<Prisma.$finesPayload, S>

  type finesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<finesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FinesCountAggregateInputType | true
    }

  export interface finesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['fines'], meta: { name: 'fines' } }
    /**
     * Find zero or one Fines that matches the filter.
     * @param {finesFindUniqueArgs} args - Arguments to find a Fines
     * @example
     * // Get one Fines
     * const fines = await prisma.fines.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends finesFindUniqueArgs>(args: SelectSubset<T, finesFindUniqueArgs<ExtArgs>>): Prisma__finesClient<$Result.GetResult<Prisma.$finesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Fines that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {finesFindUniqueOrThrowArgs} args - Arguments to find a Fines
     * @example
     * // Get one Fines
     * const fines = await prisma.fines.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends finesFindUniqueOrThrowArgs>(args: SelectSubset<T, finesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__finesClient<$Result.GetResult<Prisma.$finesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {finesFindFirstArgs} args - Arguments to find a Fines
     * @example
     * // Get one Fines
     * const fines = await prisma.fines.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends finesFindFirstArgs>(args?: SelectSubset<T, finesFindFirstArgs<ExtArgs>>): Prisma__finesClient<$Result.GetResult<Prisma.$finesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fines that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {finesFindFirstOrThrowArgs} args - Arguments to find a Fines
     * @example
     * // Get one Fines
     * const fines = await prisma.fines.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends finesFindFirstOrThrowArgs>(args?: SelectSubset<T, finesFindFirstOrThrowArgs<ExtArgs>>): Prisma__finesClient<$Result.GetResult<Prisma.$finesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Fines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {finesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Fines
     * const fines = await prisma.fines.findMany()
     * 
     * // Get first 10 Fines
     * const fines = await prisma.fines.findMany({ take: 10 })
     * 
     * // Only select the `fine_id`
     * const finesWithFine_idOnly = await prisma.fines.findMany({ select: { fine_id: true } })
     * 
     */
    findMany<T extends finesFindManyArgs>(args?: SelectSubset<T, finesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$finesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Fines.
     * @param {finesCreateArgs} args - Arguments to create a Fines.
     * @example
     * // Create one Fines
     * const Fines = await prisma.fines.create({
     *   data: {
     *     // ... data to create a Fines
     *   }
     * })
     * 
     */
    create<T extends finesCreateArgs>(args: SelectSubset<T, finesCreateArgs<ExtArgs>>): Prisma__finesClient<$Result.GetResult<Prisma.$finesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Fines.
     * @param {finesCreateManyArgs} args - Arguments to create many Fines.
     * @example
     * // Create many Fines
     * const fines = await prisma.fines.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends finesCreateManyArgs>(args?: SelectSubset<T, finesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Fines.
     * @param {finesDeleteArgs} args - Arguments to delete one Fines.
     * @example
     * // Delete one Fines
     * const Fines = await prisma.fines.delete({
     *   where: {
     *     // ... filter to delete one Fines
     *   }
     * })
     * 
     */
    delete<T extends finesDeleteArgs>(args: SelectSubset<T, finesDeleteArgs<ExtArgs>>): Prisma__finesClient<$Result.GetResult<Prisma.$finesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Fines.
     * @param {finesUpdateArgs} args - Arguments to update one Fines.
     * @example
     * // Update one Fines
     * const fines = await prisma.fines.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends finesUpdateArgs>(args: SelectSubset<T, finesUpdateArgs<ExtArgs>>): Prisma__finesClient<$Result.GetResult<Prisma.$finesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Fines.
     * @param {finesDeleteManyArgs} args - Arguments to filter Fines to delete.
     * @example
     * // Delete a few Fines
     * const { count } = await prisma.fines.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends finesDeleteManyArgs>(args?: SelectSubset<T, finesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {finesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Fines
     * const fines = await prisma.fines.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends finesUpdateManyArgs>(args: SelectSubset<T, finesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Fines.
     * @param {finesUpsertArgs} args - Arguments to update or create a Fines.
     * @example
     * // Update or create a Fines
     * const fines = await prisma.fines.upsert({
     *   create: {
     *     // ... data to create a Fines
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Fines we want to update
     *   }
     * })
     */
    upsert<T extends finesUpsertArgs>(args: SelectSubset<T, finesUpsertArgs<ExtArgs>>): Prisma__finesClient<$Result.GetResult<Prisma.$finesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Fines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {finesCountArgs} args - Arguments to filter Fines to count.
     * @example
     * // Count the number of Fines
     * const count = await prisma.fines.count({
     *   where: {
     *     // ... the filter for the Fines we want to count
     *   }
     * })
    **/
    count<T extends finesCountArgs>(
      args?: Subset<T, finesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FinesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Fines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FinesAggregateArgs>(args: Subset<T, FinesAggregateArgs>): Prisma.PrismaPromise<GetFinesAggregateType<T>>

    /**
     * Group by Fines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {finesGroupByArgs} args - Group by arguments.
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
      T extends finesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: finesGroupByArgs['orderBy'] }
        : { orderBy?: finesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, finesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFinesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the fines model
   */
  readonly fields: finesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for fines.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__finesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends fines$usersArgs<ExtArgs> = {}>(args?: Subset<T, fines$usersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    item_tran_history<T extends fines$item_tran_historyArgs<ExtArgs> = {}>(args?: Subset<T, fines$item_tran_historyArgs<ExtArgs>>): Prisma__item_tran_historyClient<$Result.GetResult<Prisma.$item_tran_historyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the fines model
   */
  interface finesFieldRefs {
    readonly fine_id: FieldRef<"fines", 'Int'>
    readonly user_id: FieldRef<"fines", 'Int'>
    readonly item_tran_historyId: FieldRef<"fines", 'Int'>
    readonly amount: FieldRef<"fines", 'Decimal'>
    readonly reason: FieldRef<"fines", 'String'>
    readonly status: FieldRef<"fines", 'fines_status'>
    readonly created_at: FieldRef<"fines", 'DateTime'>
    readonly paid_at: FieldRef<"fines", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * fines findUnique
   */
  export type finesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the fines
     */
    select?: finesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the fines
     */
    omit?: finesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: finesInclude<ExtArgs> | null
    /**
     * Filter, which fines to fetch.
     */
    where: finesWhereUniqueInput
  }

  /**
   * fines findUniqueOrThrow
   */
  export type finesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the fines
     */
    select?: finesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the fines
     */
    omit?: finesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: finesInclude<ExtArgs> | null
    /**
     * Filter, which fines to fetch.
     */
    where: finesWhereUniqueInput
  }

  /**
   * fines findFirst
   */
  export type finesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the fines
     */
    select?: finesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the fines
     */
    omit?: finesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: finesInclude<ExtArgs> | null
    /**
     * Filter, which fines to fetch.
     */
    where?: finesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of fines to fetch.
     */
    orderBy?: finesOrderByWithRelationInput | finesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for fines.
     */
    cursor?: finesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` fines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` fines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of fines.
     */
    distinct?: FinesScalarFieldEnum | FinesScalarFieldEnum[]
  }

  /**
   * fines findFirstOrThrow
   */
  export type finesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the fines
     */
    select?: finesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the fines
     */
    omit?: finesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: finesInclude<ExtArgs> | null
    /**
     * Filter, which fines to fetch.
     */
    where?: finesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of fines to fetch.
     */
    orderBy?: finesOrderByWithRelationInput | finesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for fines.
     */
    cursor?: finesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` fines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` fines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of fines.
     */
    distinct?: FinesScalarFieldEnum | FinesScalarFieldEnum[]
  }

  /**
   * fines findMany
   */
  export type finesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the fines
     */
    select?: finesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the fines
     */
    omit?: finesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: finesInclude<ExtArgs> | null
    /**
     * Filter, which fines to fetch.
     */
    where?: finesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of fines to fetch.
     */
    orderBy?: finesOrderByWithRelationInput | finesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing fines.
     */
    cursor?: finesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` fines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` fines.
     */
    skip?: number
    distinct?: FinesScalarFieldEnum | FinesScalarFieldEnum[]
  }

  /**
   * fines create
   */
  export type finesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the fines
     */
    select?: finesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the fines
     */
    omit?: finesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: finesInclude<ExtArgs> | null
    /**
     * The data needed to create a fines.
     */
    data?: XOR<finesCreateInput, finesUncheckedCreateInput>
  }

  /**
   * fines createMany
   */
  export type finesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many fines.
     */
    data: finesCreateManyInput | finesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * fines update
   */
  export type finesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the fines
     */
    select?: finesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the fines
     */
    omit?: finesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: finesInclude<ExtArgs> | null
    /**
     * The data needed to update a fines.
     */
    data: XOR<finesUpdateInput, finesUncheckedUpdateInput>
    /**
     * Choose, which fines to update.
     */
    where: finesWhereUniqueInput
  }

  /**
   * fines updateMany
   */
  export type finesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update fines.
     */
    data: XOR<finesUpdateManyMutationInput, finesUncheckedUpdateManyInput>
    /**
     * Filter which fines to update
     */
    where?: finesWhereInput
    /**
     * Limit how many fines to update.
     */
    limit?: number
  }

  /**
   * fines upsert
   */
  export type finesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the fines
     */
    select?: finesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the fines
     */
    omit?: finesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: finesInclude<ExtArgs> | null
    /**
     * The filter to search for the fines to update in case it exists.
     */
    where: finesWhereUniqueInput
    /**
     * In case the fines found by the `where` argument doesn't exist, create a new fines with this data.
     */
    create: XOR<finesCreateInput, finesUncheckedCreateInput>
    /**
     * In case the fines was found with the provided `where` argument, update it with this data.
     */
    update: XOR<finesUpdateInput, finesUncheckedUpdateInput>
  }

  /**
   * fines delete
   */
  export type finesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the fines
     */
    select?: finesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the fines
     */
    omit?: finesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: finesInclude<ExtArgs> | null
    /**
     * Filter which fines to delete.
     */
    where: finesWhereUniqueInput
  }

  /**
   * fines deleteMany
   */
  export type finesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which fines to delete
     */
    where?: finesWhereInput
    /**
     * Limit how many fines to delete.
     */
    limit?: number
  }

  /**
   * fines.users
   */
  export type fines$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * fines.item_tran_history
   */
  export type fines$item_tran_historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran_history
     */
    select?: item_tran_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran_history
     */
    omit?: item_tran_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tran_historyInclude<ExtArgs> | null
    where?: item_tran_historyWhereInput
  }

  /**
   * fines without action
   */
  export type finesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the fines
     */
    select?: finesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the fines
     */
    omit?: finesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: finesInclude<ExtArgs> | null
  }


  /**
   * Model logs
   */

  export type AggregateLogs = {
    _count: LogsCountAggregateOutputType | null
    _avg: LogsAvgAggregateOutputType | null
    _sum: LogsSumAggregateOutputType | null
    _min: LogsMinAggregateOutputType | null
    _max: LogsMaxAggregateOutputType | null
  }

  export type LogsAvgAggregateOutputType = {
    log_id: number | null
    user_id: number | null
  }

  export type LogsSumAggregateOutputType = {
    log_id: number | null
    user_id: number | null
  }

  export type LogsMinAggregateOutputType = {
    log_id: number | null
    description: string | null
    user_id: number | null
    created_at: Date | null
  }

  export type LogsMaxAggregateOutputType = {
    log_id: number | null
    description: string | null
    user_id: number | null
    created_at: Date | null
  }

  export type LogsCountAggregateOutputType = {
    log_id: number
    description: number
    user_id: number
    created_at: number
    _all: number
  }


  export type LogsAvgAggregateInputType = {
    log_id?: true
    user_id?: true
  }

  export type LogsSumAggregateInputType = {
    log_id?: true
    user_id?: true
  }

  export type LogsMinAggregateInputType = {
    log_id?: true
    description?: true
    user_id?: true
    created_at?: true
  }

  export type LogsMaxAggregateInputType = {
    log_id?: true
    description?: true
    user_id?: true
    created_at?: true
  }

  export type LogsCountAggregateInputType = {
    log_id?: true
    description?: true
    user_id?: true
    created_at?: true
    _all?: true
  }

  export type LogsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which logs to aggregate.
     */
    where?: logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of logs to fetch.
     */
    orderBy?: logsOrderByWithRelationInput | logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned logs
    **/
    _count?: true | LogsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LogsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LogsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LogsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LogsMaxAggregateInputType
  }

  export type GetLogsAggregateType<T extends LogsAggregateArgs> = {
        [P in keyof T & keyof AggregateLogs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLogs[P]>
      : GetScalarType<T[P], AggregateLogs[P]>
  }




  export type logsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: logsWhereInput
    orderBy?: logsOrderByWithAggregationInput | logsOrderByWithAggregationInput[]
    by: LogsScalarFieldEnum[] | LogsScalarFieldEnum
    having?: logsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LogsCountAggregateInputType | true
    _avg?: LogsAvgAggregateInputType
    _sum?: LogsSumAggregateInputType
    _min?: LogsMinAggregateInputType
    _max?: LogsMaxAggregateInputType
  }

  export type LogsGroupByOutputType = {
    log_id: number
    description: string
    user_id: number
    created_at: Date | null
    _count: LogsCountAggregateOutputType | null
    _avg: LogsAvgAggregateOutputType | null
    _sum: LogsSumAggregateOutputType | null
    _min: LogsMinAggregateOutputType | null
    _max: LogsMaxAggregateOutputType | null
  }

  type GetLogsGroupByPayload<T extends logsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LogsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LogsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LogsGroupByOutputType[P]>
            : GetScalarType<T[P], LogsGroupByOutputType[P]>
        }
      >
    >


  export type logsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    log_id?: boolean
    description?: boolean
    user_id?: boolean
    created_at?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["logs"]>



  export type logsSelectScalar = {
    log_id?: boolean
    description?: boolean
    user_id?: boolean
    created_at?: boolean
  }

  export type logsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"log_id" | "description" | "user_id" | "created_at", ExtArgs["result"]["logs"]>
  export type logsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $logsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "logs"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      log_id: number
      description: string
      user_id: number
      created_at: Date | null
    }, ExtArgs["result"]["logs"]>
    composites: {}
  }

  type logsGetPayload<S extends boolean | null | undefined | logsDefaultArgs> = $Result.GetResult<Prisma.$logsPayload, S>

  type logsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<logsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LogsCountAggregateInputType | true
    }

  export interface logsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['logs'], meta: { name: 'logs' } }
    /**
     * Find zero or one Logs that matches the filter.
     * @param {logsFindUniqueArgs} args - Arguments to find a Logs
     * @example
     * // Get one Logs
     * const logs = await prisma.logs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends logsFindUniqueArgs>(args: SelectSubset<T, logsFindUniqueArgs<ExtArgs>>): Prisma__logsClient<$Result.GetResult<Prisma.$logsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Logs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {logsFindUniqueOrThrowArgs} args - Arguments to find a Logs
     * @example
     * // Get one Logs
     * const logs = await prisma.logs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends logsFindUniqueOrThrowArgs>(args: SelectSubset<T, logsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__logsClient<$Result.GetResult<Prisma.$logsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {logsFindFirstArgs} args - Arguments to find a Logs
     * @example
     * // Get one Logs
     * const logs = await prisma.logs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends logsFindFirstArgs>(args?: SelectSubset<T, logsFindFirstArgs<ExtArgs>>): Prisma__logsClient<$Result.GetResult<Prisma.$logsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Logs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {logsFindFirstOrThrowArgs} args - Arguments to find a Logs
     * @example
     * // Get one Logs
     * const logs = await prisma.logs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends logsFindFirstOrThrowArgs>(args?: SelectSubset<T, logsFindFirstOrThrowArgs<ExtArgs>>): Prisma__logsClient<$Result.GetResult<Prisma.$logsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {logsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Logs
     * const logs = await prisma.logs.findMany()
     * 
     * // Get first 10 Logs
     * const logs = await prisma.logs.findMany({ take: 10 })
     * 
     * // Only select the `log_id`
     * const logsWithLog_idOnly = await prisma.logs.findMany({ select: { log_id: true } })
     * 
     */
    findMany<T extends logsFindManyArgs>(args?: SelectSubset<T, logsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Logs.
     * @param {logsCreateArgs} args - Arguments to create a Logs.
     * @example
     * // Create one Logs
     * const Logs = await prisma.logs.create({
     *   data: {
     *     // ... data to create a Logs
     *   }
     * })
     * 
     */
    create<T extends logsCreateArgs>(args: SelectSubset<T, logsCreateArgs<ExtArgs>>): Prisma__logsClient<$Result.GetResult<Prisma.$logsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Logs.
     * @param {logsCreateManyArgs} args - Arguments to create many Logs.
     * @example
     * // Create many Logs
     * const logs = await prisma.logs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends logsCreateManyArgs>(args?: SelectSubset<T, logsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Logs.
     * @param {logsDeleteArgs} args - Arguments to delete one Logs.
     * @example
     * // Delete one Logs
     * const Logs = await prisma.logs.delete({
     *   where: {
     *     // ... filter to delete one Logs
     *   }
     * })
     * 
     */
    delete<T extends logsDeleteArgs>(args: SelectSubset<T, logsDeleteArgs<ExtArgs>>): Prisma__logsClient<$Result.GetResult<Prisma.$logsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Logs.
     * @param {logsUpdateArgs} args - Arguments to update one Logs.
     * @example
     * // Update one Logs
     * const logs = await prisma.logs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends logsUpdateArgs>(args: SelectSubset<T, logsUpdateArgs<ExtArgs>>): Prisma__logsClient<$Result.GetResult<Prisma.$logsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Logs.
     * @param {logsDeleteManyArgs} args - Arguments to filter Logs to delete.
     * @example
     * // Delete a few Logs
     * const { count } = await prisma.logs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends logsDeleteManyArgs>(args?: SelectSubset<T, logsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {logsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Logs
     * const logs = await prisma.logs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends logsUpdateManyArgs>(args: SelectSubset<T, logsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Logs.
     * @param {logsUpsertArgs} args - Arguments to update or create a Logs.
     * @example
     * // Update or create a Logs
     * const logs = await prisma.logs.upsert({
     *   create: {
     *     // ... data to create a Logs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Logs we want to update
     *   }
     * })
     */
    upsert<T extends logsUpsertArgs>(args: SelectSubset<T, logsUpsertArgs<ExtArgs>>): Prisma__logsClient<$Result.GetResult<Prisma.$logsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {logsCountArgs} args - Arguments to filter Logs to count.
     * @example
     * // Count the number of Logs
     * const count = await prisma.logs.count({
     *   where: {
     *     // ... the filter for the Logs we want to count
     *   }
     * })
    **/
    count<T extends logsCountArgs>(
      args?: Subset<T, logsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LogsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LogsAggregateArgs>(args: Subset<T, LogsAggregateArgs>): Prisma.PrismaPromise<GetLogsAggregateType<T>>

    /**
     * Group by Logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {logsGroupByArgs} args - Group by arguments.
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
      T extends logsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: logsGroupByArgs['orderBy'] }
        : { orderBy?: logsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, logsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLogsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the logs model
   */
  readonly fields: logsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for logs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__logsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the logs model
   */
  interface logsFieldRefs {
    readonly log_id: FieldRef<"logs", 'Int'>
    readonly description: FieldRef<"logs", 'String'>
    readonly user_id: FieldRef<"logs", 'Int'>
    readonly created_at: FieldRef<"logs", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * logs findUnique
   */
  export type logsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logs
     */
    select?: logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the logs
     */
    omit?: logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: logsInclude<ExtArgs> | null
    /**
     * Filter, which logs to fetch.
     */
    where: logsWhereUniqueInput
  }

  /**
   * logs findUniqueOrThrow
   */
  export type logsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logs
     */
    select?: logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the logs
     */
    omit?: logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: logsInclude<ExtArgs> | null
    /**
     * Filter, which logs to fetch.
     */
    where: logsWhereUniqueInput
  }

  /**
   * logs findFirst
   */
  export type logsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logs
     */
    select?: logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the logs
     */
    omit?: logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: logsInclude<ExtArgs> | null
    /**
     * Filter, which logs to fetch.
     */
    where?: logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of logs to fetch.
     */
    orderBy?: logsOrderByWithRelationInput | logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for logs.
     */
    cursor?: logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of logs.
     */
    distinct?: LogsScalarFieldEnum | LogsScalarFieldEnum[]
  }

  /**
   * logs findFirstOrThrow
   */
  export type logsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logs
     */
    select?: logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the logs
     */
    omit?: logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: logsInclude<ExtArgs> | null
    /**
     * Filter, which logs to fetch.
     */
    where?: logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of logs to fetch.
     */
    orderBy?: logsOrderByWithRelationInput | logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for logs.
     */
    cursor?: logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of logs.
     */
    distinct?: LogsScalarFieldEnum | LogsScalarFieldEnum[]
  }

  /**
   * logs findMany
   */
  export type logsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logs
     */
    select?: logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the logs
     */
    omit?: logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: logsInclude<ExtArgs> | null
    /**
     * Filter, which logs to fetch.
     */
    where?: logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of logs to fetch.
     */
    orderBy?: logsOrderByWithRelationInput | logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing logs.
     */
    cursor?: logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` logs.
     */
    skip?: number
    distinct?: LogsScalarFieldEnum | LogsScalarFieldEnum[]
  }

  /**
   * logs create
   */
  export type logsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logs
     */
    select?: logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the logs
     */
    omit?: logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: logsInclude<ExtArgs> | null
    /**
     * The data needed to create a logs.
     */
    data: XOR<logsCreateInput, logsUncheckedCreateInput>
  }

  /**
   * logs createMany
   */
  export type logsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many logs.
     */
    data: logsCreateManyInput | logsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * logs update
   */
  export type logsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logs
     */
    select?: logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the logs
     */
    omit?: logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: logsInclude<ExtArgs> | null
    /**
     * The data needed to update a logs.
     */
    data: XOR<logsUpdateInput, logsUncheckedUpdateInput>
    /**
     * Choose, which logs to update.
     */
    where: logsWhereUniqueInput
  }

  /**
   * logs updateMany
   */
  export type logsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update logs.
     */
    data: XOR<logsUpdateManyMutationInput, logsUncheckedUpdateManyInput>
    /**
     * Filter which logs to update
     */
    where?: logsWhereInput
    /**
     * Limit how many logs to update.
     */
    limit?: number
  }

  /**
   * logs upsert
   */
  export type logsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logs
     */
    select?: logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the logs
     */
    omit?: logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: logsInclude<ExtArgs> | null
    /**
     * The filter to search for the logs to update in case it exists.
     */
    where: logsWhereUniqueInput
    /**
     * In case the logs found by the `where` argument doesn't exist, create a new logs with this data.
     */
    create: XOR<logsCreateInput, logsUncheckedCreateInput>
    /**
     * In case the logs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<logsUpdateInput, logsUncheckedUpdateInput>
  }

  /**
   * logs delete
   */
  export type logsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logs
     */
    select?: logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the logs
     */
    omit?: logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: logsInclude<ExtArgs> | null
    /**
     * Filter which logs to delete.
     */
    where: logsWhereUniqueInput
  }

  /**
   * logs deleteMany
   */
  export type logsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which logs to delete
     */
    where?: logsWhereInput
    /**
     * Limit how many logs to delete.
     */
    limit?: number
  }

  /**
   * logs without action
   */
  export type logsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logs
     */
    select?: logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the logs
     */
    omit?: logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: logsInclude<ExtArgs> | null
  }


  /**
   * Model notifications
   */

  export type AggregateNotifications = {
    _count: NotificationsCountAggregateOutputType | null
    _avg: NotificationsAvgAggregateOutputType | null
    _sum: NotificationsSumAggregateOutputType | null
    _min: NotificationsMinAggregateOutputType | null
    _max: NotificationsMaxAggregateOutputType | null
  }

  export type NotificationsAvgAggregateOutputType = {
    notification_id: number | null
    item_id: number | null
    from_user_id: number | null
    to_user_id: number | null
    tran_id: number | null
    reservation_id: number | null
  }

  export type NotificationsSumAggregateOutputType = {
    notification_id: number | null
    item_id: number | null
    from_user_id: number | null
    to_user_id: number | null
    tran_id: number | null
    reservation_id: number | null
  }

  export type NotificationsMinAggregateOutputType = {
    notification_id: number | null
    type: $Enums.notifications_type | null
    item_id: number | null
    from_user_id: number | null
    to_user_id: number | null
    tran_id: number | null
    reservation_id: number | null
    status: $Enums.notifications_status | null
    message: string | null
    created_at: Date | null
    resolved_at: Date | null
  }

  export type NotificationsMaxAggregateOutputType = {
    notification_id: number | null
    type: $Enums.notifications_type | null
    item_id: number | null
    from_user_id: number | null
    to_user_id: number | null
    tran_id: number | null
    reservation_id: number | null
    status: $Enums.notifications_status | null
    message: string | null
    created_at: Date | null
    resolved_at: Date | null
  }

  export type NotificationsCountAggregateOutputType = {
    notification_id: number
    type: number
    item_id: number
    from_user_id: number
    to_user_id: number
    tran_id: number
    reservation_id: number
    status: number
    message: number
    created_at: number
    resolved_at: number
    _all: number
  }


  export type NotificationsAvgAggregateInputType = {
    notification_id?: true
    item_id?: true
    from_user_id?: true
    to_user_id?: true
    tran_id?: true
    reservation_id?: true
  }

  export type NotificationsSumAggregateInputType = {
    notification_id?: true
    item_id?: true
    from_user_id?: true
    to_user_id?: true
    tran_id?: true
    reservation_id?: true
  }

  export type NotificationsMinAggregateInputType = {
    notification_id?: true
    type?: true
    item_id?: true
    from_user_id?: true
    to_user_id?: true
    tran_id?: true
    reservation_id?: true
    status?: true
    message?: true
    created_at?: true
    resolved_at?: true
  }

  export type NotificationsMaxAggregateInputType = {
    notification_id?: true
    type?: true
    item_id?: true
    from_user_id?: true
    to_user_id?: true
    tran_id?: true
    reservation_id?: true
    status?: true
    message?: true
    created_at?: true
    resolved_at?: true
  }

  export type NotificationsCountAggregateInputType = {
    notification_id?: true
    type?: true
    item_id?: true
    from_user_id?: true
    to_user_id?: true
    tran_id?: true
    reservation_id?: true
    status?: true
    message?: true
    created_at?: true
    resolved_at?: true
    _all?: true
  }

  export type NotificationsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which notifications to aggregate.
     */
    where?: notificationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notifications to fetch.
     */
    orderBy?: notificationsOrderByWithRelationInput | notificationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: notificationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned notifications
    **/
    _count?: true | NotificationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationsMaxAggregateInputType
  }

  export type GetNotificationsAggregateType<T extends NotificationsAggregateArgs> = {
        [P in keyof T & keyof AggregateNotifications]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotifications[P]>
      : GetScalarType<T[P], AggregateNotifications[P]>
  }




  export type notificationsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: notificationsWhereInput
    orderBy?: notificationsOrderByWithAggregationInput | notificationsOrderByWithAggregationInput[]
    by: NotificationsScalarFieldEnum[] | NotificationsScalarFieldEnum
    having?: notificationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationsCountAggregateInputType | true
    _avg?: NotificationsAvgAggregateInputType
    _sum?: NotificationsSumAggregateInputType
    _min?: NotificationsMinAggregateInputType
    _max?: NotificationsMaxAggregateInputType
  }

  export type NotificationsGroupByOutputType = {
    notification_id: number
    type: $Enums.notifications_type | null
    item_id: number | null
    from_user_id: number | null
    to_user_id: number | null
    tran_id: number | null
    reservation_id: number | null
    status: $Enums.notifications_status | null
    message: string | null
    created_at: Date | null
    resolved_at: Date | null
    _count: NotificationsCountAggregateOutputType | null
    _avg: NotificationsAvgAggregateOutputType | null
    _sum: NotificationsSumAggregateOutputType | null
    _min: NotificationsMinAggregateOutputType | null
    _max: NotificationsMaxAggregateOutputType | null
  }

  type GetNotificationsGroupByPayload<T extends notificationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationsGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationsGroupByOutputType[P]>
        }
      >
    >


  export type notificationsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    notification_id?: boolean
    type?: boolean
    item_id?: boolean
    from_user_id?: boolean
    to_user_id?: boolean
    tran_id?: boolean
    reservation_id?: boolean
    status?: boolean
    message?: boolean
    created_at?: boolean
    resolved_at?: boolean
    library_items?: boolean | notifications$library_itemsArgs<ExtArgs>
    users_notifications_from_user_idTousers?: boolean | notifications$users_notifications_from_user_idTousersArgs<ExtArgs>
    users_notifications_to_user_idTousers?: boolean | notifications$users_notifications_to_user_idTousersArgs<ExtArgs>
    item_tran?: boolean | notifications$item_tranArgs<ExtArgs>
  }, ExtArgs["result"]["notifications"]>



  export type notificationsSelectScalar = {
    notification_id?: boolean
    type?: boolean
    item_id?: boolean
    from_user_id?: boolean
    to_user_id?: boolean
    tran_id?: boolean
    reservation_id?: boolean
    status?: boolean
    message?: boolean
    created_at?: boolean
    resolved_at?: boolean
  }

  export type notificationsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"notification_id" | "type" | "item_id" | "from_user_id" | "to_user_id" | "tran_id" | "reservation_id" | "status" | "message" | "created_at" | "resolved_at", ExtArgs["result"]["notifications"]>
  export type notificationsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    library_items?: boolean | notifications$library_itemsArgs<ExtArgs>
    users_notifications_from_user_idTousers?: boolean | notifications$users_notifications_from_user_idTousersArgs<ExtArgs>
    users_notifications_to_user_idTousers?: boolean | notifications$users_notifications_to_user_idTousersArgs<ExtArgs>
    item_tran?: boolean | notifications$item_tranArgs<ExtArgs>
  }

  export type $notificationsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "notifications"
    objects: {
      library_items: Prisma.$library_itemsPayload<ExtArgs> | null
      users_notifications_from_user_idTousers: Prisma.$usersPayload<ExtArgs> | null
      users_notifications_to_user_idTousers: Prisma.$usersPayload<ExtArgs> | null
      item_tran: Prisma.$item_tranPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      notification_id: number
      type: $Enums.notifications_type | null
      item_id: number | null
      from_user_id: number | null
      to_user_id: number | null
      tran_id: number | null
      reservation_id: number | null
      status: $Enums.notifications_status | null
      message: string | null
      created_at: Date | null
      resolved_at: Date | null
    }, ExtArgs["result"]["notifications"]>
    composites: {}
  }

  type notificationsGetPayload<S extends boolean | null | undefined | notificationsDefaultArgs> = $Result.GetResult<Prisma.$notificationsPayload, S>

  type notificationsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<notificationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationsCountAggregateInputType | true
    }

  export interface notificationsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['notifications'], meta: { name: 'notifications' } }
    /**
     * Find zero or one Notifications that matches the filter.
     * @param {notificationsFindUniqueArgs} args - Arguments to find a Notifications
     * @example
     * // Get one Notifications
     * const notifications = await prisma.notifications.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends notificationsFindUniqueArgs>(args: SelectSubset<T, notificationsFindUniqueArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notifications that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {notificationsFindUniqueOrThrowArgs} args - Arguments to find a Notifications
     * @example
     * // Get one Notifications
     * const notifications = await prisma.notifications.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends notificationsFindUniqueOrThrowArgs>(args: SelectSubset<T, notificationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationsFindFirstArgs} args - Arguments to find a Notifications
     * @example
     * // Get one Notifications
     * const notifications = await prisma.notifications.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends notificationsFindFirstArgs>(args?: SelectSubset<T, notificationsFindFirstArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notifications that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationsFindFirstOrThrowArgs} args - Arguments to find a Notifications
     * @example
     * // Get one Notifications
     * const notifications = await prisma.notifications.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends notificationsFindFirstOrThrowArgs>(args?: SelectSubset<T, notificationsFindFirstOrThrowArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notifications.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notifications.findMany({ take: 10 })
     * 
     * // Only select the `notification_id`
     * const notificationsWithNotification_idOnly = await prisma.notifications.findMany({ select: { notification_id: true } })
     * 
     */
    findMany<T extends notificationsFindManyArgs>(args?: SelectSubset<T, notificationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notifications.
     * @param {notificationsCreateArgs} args - Arguments to create a Notifications.
     * @example
     * // Create one Notifications
     * const Notifications = await prisma.notifications.create({
     *   data: {
     *     // ... data to create a Notifications
     *   }
     * })
     * 
     */
    create<T extends notificationsCreateArgs>(args: SelectSubset<T, notificationsCreateArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {notificationsCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notifications = await prisma.notifications.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends notificationsCreateManyArgs>(args?: SelectSubset<T, notificationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Notifications.
     * @param {notificationsDeleteArgs} args - Arguments to delete one Notifications.
     * @example
     * // Delete one Notifications
     * const Notifications = await prisma.notifications.delete({
     *   where: {
     *     // ... filter to delete one Notifications
     *   }
     * })
     * 
     */
    delete<T extends notificationsDeleteArgs>(args: SelectSubset<T, notificationsDeleteArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notifications.
     * @param {notificationsUpdateArgs} args - Arguments to update one Notifications.
     * @example
     * // Update one Notifications
     * const notifications = await prisma.notifications.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends notificationsUpdateArgs>(args: SelectSubset<T, notificationsUpdateArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {notificationsDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notifications.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends notificationsDeleteManyArgs>(args?: SelectSubset<T, notificationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notifications = await prisma.notifications.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends notificationsUpdateManyArgs>(args: SelectSubset<T, notificationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notifications.
     * @param {notificationsUpsertArgs} args - Arguments to update or create a Notifications.
     * @example
     * // Update or create a Notifications
     * const notifications = await prisma.notifications.upsert({
     *   create: {
     *     // ... data to create a Notifications
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notifications we want to update
     *   }
     * })
     */
    upsert<T extends notificationsUpsertArgs>(args: SelectSubset<T, notificationsUpsertArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationsCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notifications.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends notificationsCountArgs>(
      args?: Subset<T, notificationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NotificationsAggregateArgs>(args: Subset<T, NotificationsAggregateArgs>): Prisma.PrismaPromise<GetNotificationsAggregateType<T>>

    /**
     * Group by Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationsGroupByArgs} args - Group by arguments.
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
      T extends notificationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: notificationsGroupByArgs['orderBy'] }
        : { orderBy?: notificationsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, notificationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the notifications model
   */
  readonly fields: notificationsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for notifications.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__notificationsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    library_items<T extends notifications$library_itemsArgs<ExtArgs> = {}>(args?: Subset<T, notifications$library_itemsArgs<ExtArgs>>): Prisma__library_itemsClient<$Result.GetResult<Prisma.$library_itemsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    users_notifications_from_user_idTousers<T extends notifications$users_notifications_from_user_idTousersArgs<ExtArgs> = {}>(args?: Subset<T, notifications$users_notifications_from_user_idTousersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    users_notifications_to_user_idTousers<T extends notifications$users_notifications_to_user_idTousersArgs<ExtArgs> = {}>(args?: Subset<T, notifications$users_notifications_to_user_idTousersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    item_tran<T extends notifications$item_tranArgs<ExtArgs> = {}>(args?: Subset<T, notifications$item_tranArgs<ExtArgs>>): Prisma__item_tranClient<$Result.GetResult<Prisma.$item_tranPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the notifications model
   */
  interface notificationsFieldRefs {
    readonly notification_id: FieldRef<"notifications", 'Int'>
    readonly type: FieldRef<"notifications", 'notifications_type'>
    readonly item_id: FieldRef<"notifications", 'Int'>
    readonly from_user_id: FieldRef<"notifications", 'Int'>
    readonly to_user_id: FieldRef<"notifications", 'Int'>
    readonly tran_id: FieldRef<"notifications", 'Int'>
    readonly reservation_id: FieldRef<"notifications", 'Int'>
    readonly status: FieldRef<"notifications", 'notifications_status'>
    readonly message: FieldRef<"notifications", 'String'>
    readonly created_at: FieldRef<"notifications", 'DateTime'>
    readonly resolved_at: FieldRef<"notifications", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * notifications findUnique
   */
  export type notificationsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * Filter, which notifications to fetch.
     */
    where: notificationsWhereUniqueInput
  }

  /**
   * notifications findUniqueOrThrow
   */
  export type notificationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * Filter, which notifications to fetch.
     */
    where: notificationsWhereUniqueInput
  }

  /**
   * notifications findFirst
   */
  export type notificationsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * Filter, which notifications to fetch.
     */
    where?: notificationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notifications to fetch.
     */
    orderBy?: notificationsOrderByWithRelationInput | notificationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for notifications.
     */
    cursor?: notificationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of notifications.
     */
    distinct?: NotificationsScalarFieldEnum | NotificationsScalarFieldEnum[]
  }

  /**
   * notifications findFirstOrThrow
   */
  export type notificationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * Filter, which notifications to fetch.
     */
    where?: notificationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notifications to fetch.
     */
    orderBy?: notificationsOrderByWithRelationInput | notificationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for notifications.
     */
    cursor?: notificationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of notifications.
     */
    distinct?: NotificationsScalarFieldEnum | NotificationsScalarFieldEnum[]
  }

  /**
   * notifications findMany
   */
  export type notificationsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * Filter, which notifications to fetch.
     */
    where?: notificationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notifications to fetch.
     */
    orderBy?: notificationsOrderByWithRelationInput | notificationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing notifications.
     */
    cursor?: notificationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notifications.
     */
    skip?: number
    distinct?: NotificationsScalarFieldEnum | NotificationsScalarFieldEnum[]
  }

  /**
   * notifications create
   */
  export type notificationsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * The data needed to create a notifications.
     */
    data?: XOR<notificationsCreateInput, notificationsUncheckedCreateInput>
  }

  /**
   * notifications createMany
   */
  export type notificationsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many notifications.
     */
    data: notificationsCreateManyInput | notificationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * notifications update
   */
  export type notificationsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * The data needed to update a notifications.
     */
    data: XOR<notificationsUpdateInput, notificationsUncheckedUpdateInput>
    /**
     * Choose, which notifications to update.
     */
    where: notificationsWhereUniqueInput
  }

  /**
   * notifications updateMany
   */
  export type notificationsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update notifications.
     */
    data: XOR<notificationsUpdateManyMutationInput, notificationsUncheckedUpdateManyInput>
    /**
     * Filter which notifications to update
     */
    where?: notificationsWhereInput
    /**
     * Limit how many notifications to update.
     */
    limit?: number
  }

  /**
   * notifications upsert
   */
  export type notificationsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * The filter to search for the notifications to update in case it exists.
     */
    where: notificationsWhereUniqueInput
    /**
     * In case the notifications found by the `where` argument doesn't exist, create a new notifications with this data.
     */
    create: XOR<notificationsCreateInput, notificationsUncheckedCreateInput>
    /**
     * In case the notifications was found with the provided `where` argument, update it with this data.
     */
    update: XOR<notificationsUpdateInput, notificationsUncheckedUpdateInput>
  }

  /**
   * notifications delete
   */
  export type notificationsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * Filter which notifications to delete.
     */
    where: notificationsWhereUniqueInput
  }

  /**
   * notifications deleteMany
   */
  export type notificationsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which notifications to delete
     */
    where?: notificationsWhereInput
    /**
     * Limit how many notifications to delete.
     */
    limit?: number
  }

  /**
   * notifications.library_items
   */
  export type notifications$library_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the library_items
     */
    select?: library_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the library_items
     */
    omit?: library_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: library_itemsInclude<ExtArgs> | null
    where?: library_itemsWhereInput
  }

  /**
   * notifications.users_notifications_from_user_idTousers
   */
  export type notifications$users_notifications_from_user_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * notifications.users_notifications_to_user_idTousers
   */
  export type notifications$users_notifications_to_user_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * notifications.item_tran
   */
  export type notifications$item_tranArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran
     */
    select?: item_tranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran
     */
    omit?: item_tranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tranInclude<ExtArgs> | null
    where?: item_tranWhereInput
  }

  /**
   * notifications without action
   */
  export type notificationsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
  }


  /**
   * Model user_wishlist
   */

  export type AggregateUser_wishlist = {
    _count: User_wishlistCountAggregateOutputType | null
    _avg: User_wishlistAvgAggregateOutputType | null
    _sum: User_wishlistSumAggregateOutputType | null
    _min: User_wishlistMinAggregateOutputType | null
    _max: User_wishlistMaxAggregateOutputType | null
  }

  export type User_wishlistAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    item_id: number | null
  }

  export type User_wishlistSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    item_id: number | null
  }

  export type User_wishlistMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    item_id: number | null
    created_at: Date | null
  }

  export type User_wishlistMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    item_id: number | null
    created_at: Date | null
  }

  export type User_wishlistCountAggregateOutputType = {
    id: number
    user_id: number
    item_id: number
    created_at: number
    _all: number
  }


  export type User_wishlistAvgAggregateInputType = {
    id?: true
    user_id?: true
    item_id?: true
  }

  export type User_wishlistSumAggregateInputType = {
    id?: true
    user_id?: true
    item_id?: true
  }

  export type User_wishlistMinAggregateInputType = {
    id?: true
    user_id?: true
    item_id?: true
    created_at?: true
  }

  export type User_wishlistMaxAggregateInputType = {
    id?: true
    user_id?: true
    item_id?: true
    created_at?: true
  }

  export type User_wishlistCountAggregateInputType = {
    id?: true
    user_id?: true
    item_id?: true
    created_at?: true
    _all?: true
  }

  export type User_wishlistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_wishlist to aggregate.
     */
    where?: user_wishlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_wishlists to fetch.
     */
    orderBy?: user_wishlistOrderByWithRelationInput | user_wishlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: user_wishlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_wishlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_wishlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned user_wishlists
    **/
    _count?: true | User_wishlistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: User_wishlistAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: User_wishlistSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: User_wishlistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: User_wishlistMaxAggregateInputType
  }

  export type GetUser_wishlistAggregateType<T extends User_wishlistAggregateArgs> = {
        [P in keyof T & keyof AggregateUser_wishlist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser_wishlist[P]>
      : GetScalarType<T[P], AggregateUser_wishlist[P]>
  }




  export type user_wishlistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_wishlistWhereInput
    orderBy?: user_wishlistOrderByWithAggregationInput | user_wishlistOrderByWithAggregationInput[]
    by: User_wishlistScalarFieldEnum[] | User_wishlistScalarFieldEnum
    having?: user_wishlistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: User_wishlistCountAggregateInputType | true
    _avg?: User_wishlistAvgAggregateInputType
    _sum?: User_wishlistSumAggregateInputType
    _min?: User_wishlistMinAggregateInputType
    _max?: User_wishlistMaxAggregateInputType
  }

  export type User_wishlistGroupByOutputType = {
    id: number
    user_id: number | null
    item_id: number | null
    created_at: Date | null
    _count: User_wishlistCountAggregateOutputType | null
    _avg: User_wishlistAvgAggregateOutputType | null
    _sum: User_wishlistSumAggregateOutputType | null
    _min: User_wishlistMinAggregateOutputType | null
    _max: User_wishlistMaxAggregateOutputType | null
  }

  type GetUser_wishlistGroupByPayload<T extends user_wishlistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<User_wishlistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof User_wishlistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], User_wishlistGroupByOutputType[P]>
            : GetScalarType<T[P], User_wishlistGroupByOutputType[P]>
        }
      >
    >


  export type user_wishlistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    item_id?: boolean
    created_at?: boolean
    users?: boolean | user_wishlist$usersArgs<ExtArgs>
    library_items?: boolean | user_wishlist$library_itemsArgs<ExtArgs>
  }, ExtArgs["result"]["user_wishlist"]>



  export type user_wishlistSelectScalar = {
    id?: boolean
    user_id?: boolean
    item_id?: boolean
    created_at?: boolean
  }

  export type user_wishlistOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "item_id" | "created_at", ExtArgs["result"]["user_wishlist"]>
  export type user_wishlistInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | user_wishlist$usersArgs<ExtArgs>
    library_items?: boolean | user_wishlist$library_itemsArgs<ExtArgs>
  }

  export type $user_wishlistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user_wishlist"
    objects: {
      users: Prisma.$usersPayload<ExtArgs> | null
      library_items: Prisma.$library_itemsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number | null
      item_id: number | null
      created_at: Date | null
    }, ExtArgs["result"]["user_wishlist"]>
    composites: {}
  }

  type user_wishlistGetPayload<S extends boolean | null | undefined | user_wishlistDefaultArgs> = $Result.GetResult<Prisma.$user_wishlistPayload, S>

  type user_wishlistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<user_wishlistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: User_wishlistCountAggregateInputType | true
    }

  export interface user_wishlistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user_wishlist'], meta: { name: 'user_wishlist' } }
    /**
     * Find zero or one User_wishlist that matches the filter.
     * @param {user_wishlistFindUniqueArgs} args - Arguments to find a User_wishlist
     * @example
     * // Get one User_wishlist
     * const user_wishlist = await prisma.user_wishlist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends user_wishlistFindUniqueArgs>(args: SelectSubset<T, user_wishlistFindUniqueArgs<ExtArgs>>): Prisma__user_wishlistClient<$Result.GetResult<Prisma.$user_wishlistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User_wishlist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {user_wishlistFindUniqueOrThrowArgs} args - Arguments to find a User_wishlist
     * @example
     * // Get one User_wishlist
     * const user_wishlist = await prisma.user_wishlist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends user_wishlistFindUniqueOrThrowArgs>(args: SelectSubset<T, user_wishlistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__user_wishlistClient<$Result.GetResult<Prisma.$user_wishlistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_wishlist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_wishlistFindFirstArgs} args - Arguments to find a User_wishlist
     * @example
     * // Get one User_wishlist
     * const user_wishlist = await prisma.user_wishlist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends user_wishlistFindFirstArgs>(args?: SelectSubset<T, user_wishlistFindFirstArgs<ExtArgs>>): Prisma__user_wishlistClient<$Result.GetResult<Prisma.$user_wishlistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_wishlist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_wishlistFindFirstOrThrowArgs} args - Arguments to find a User_wishlist
     * @example
     * // Get one User_wishlist
     * const user_wishlist = await prisma.user_wishlist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends user_wishlistFindFirstOrThrowArgs>(args?: SelectSubset<T, user_wishlistFindFirstOrThrowArgs<ExtArgs>>): Prisma__user_wishlistClient<$Result.GetResult<Prisma.$user_wishlistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more User_wishlists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_wishlistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all User_wishlists
     * const user_wishlists = await prisma.user_wishlist.findMany()
     * 
     * // Get first 10 User_wishlists
     * const user_wishlists = await prisma.user_wishlist.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const user_wishlistWithIdOnly = await prisma.user_wishlist.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends user_wishlistFindManyArgs>(args?: SelectSubset<T, user_wishlistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_wishlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User_wishlist.
     * @param {user_wishlistCreateArgs} args - Arguments to create a User_wishlist.
     * @example
     * // Create one User_wishlist
     * const User_wishlist = await prisma.user_wishlist.create({
     *   data: {
     *     // ... data to create a User_wishlist
     *   }
     * })
     * 
     */
    create<T extends user_wishlistCreateArgs>(args: SelectSubset<T, user_wishlistCreateArgs<ExtArgs>>): Prisma__user_wishlistClient<$Result.GetResult<Prisma.$user_wishlistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many User_wishlists.
     * @param {user_wishlistCreateManyArgs} args - Arguments to create many User_wishlists.
     * @example
     * // Create many User_wishlists
     * const user_wishlist = await prisma.user_wishlist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends user_wishlistCreateManyArgs>(args?: SelectSubset<T, user_wishlistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User_wishlist.
     * @param {user_wishlistDeleteArgs} args - Arguments to delete one User_wishlist.
     * @example
     * // Delete one User_wishlist
     * const User_wishlist = await prisma.user_wishlist.delete({
     *   where: {
     *     // ... filter to delete one User_wishlist
     *   }
     * })
     * 
     */
    delete<T extends user_wishlistDeleteArgs>(args: SelectSubset<T, user_wishlistDeleteArgs<ExtArgs>>): Prisma__user_wishlistClient<$Result.GetResult<Prisma.$user_wishlistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User_wishlist.
     * @param {user_wishlistUpdateArgs} args - Arguments to update one User_wishlist.
     * @example
     * // Update one User_wishlist
     * const user_wishlist = await prisma.user_wishlist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends user_wishlistUpdateArgs>(args: SelectSubset<T, user_wishlistUpdateArgs<ExtArgs>>): Prisma__user_wishlistClient<$Result.GetResult<Prisma.$user_wishlistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more User_wishlists.
     * @param {user_wishlistDeleteManyArgs} args - Arguments to filter User_wishlists to delete.
     * @example
     * // Delete a few User_wishlists
     * const { count } = await prisma.user_wishlist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends user_wishlistDeleteManyArgs>(args?: SelectSubset<T, user_wishlistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_wishlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_wishlistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many User_wishlists
     * const user_wishlist = await prisma.user_wishlist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends user_wishlistUpdateManyArgs>(args: SelectSubset<T, user_wishlistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User_wishlist.
     * @param {user_wishlistUpsertArgs} args - Arguments to update or create a User_wishlist.
     * @example
     * // Update or create a User_wishlist
     * const user_wishlist = await prisma.user_wishlist.upsert({
     *   create: {
     *     // ... data to create a User_wishlist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User_wishlist we want to update
     *   }
     * })
     */
    upsert<T extends user_wishlistUpsertArgs>(args: SelectSubset<T, user_wishlistUpsertArgs<ExtArgs>>): Prisma__user_wishlistClient<$Result.GetResult<Prisma.$user_wishlistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of User_wishlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_wishlistCountArgs} args - Arguments to filter User_wishlists to count.
     * @example
     * // Count the number of User_wishlists
     * const count = await prisma.user_wishlist.count({
     *   where: {
     *     // ... the filter for the User_wishlists we want to count
     *   }
     * })
    **/
    count<T extends user_wishlistCountArgs>(
      args?: Subset<T, user_wishlistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], User_wishlistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User_wishlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_wishlistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends User_wishlistAggregateArgs>(args: Subset<T, User_wishlistAggregateArgs>): Prisma.PrismaPromise<GetUser_wishlistAggregateType<T>>

    /**
     * Group by User_wishlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_wishlistGroupByArgs} args - Group by arguments.
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
      T extends user_wishlistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: user_wishlistGroupByArgs['orderBy'] }
        : { orderBy?: user_wishlistGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, user_wishlistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUser_wishlistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user_wishlist model
   */
  readonly fields: user_wishlistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user_wishlist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__user_wishlistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends user_wishlist$usersArgs<ExtArgs> = {}>(args?: Subset<T, user_wishlist$usersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    library_items<T extends user_wishlist$library_itemsArgs<ExtArgs> = {}>(args?: Subset<T, user_wishlist$library_itemsArgs<ExtArgs>>): Prisma__library_itemsClient<$Result.GetResult<Prisma.$library_itemsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the user_wishlist model
   */
  interface user_wishlistFieldRefs {
    readonly id: FieldRef<"user_wishlist", 'Int'>
    readonly user_id: FieldRef<"user_wishlist", 'Int'>
    readonly item_id: FieldRef<"user_wishlist", 'Int'>
    readonly created_at: FieldRef<"user_wishlist", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * user_wishlist findUnique
   */
  export type user_wishlistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_wishlist
     */
    select?: user_wishlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_wishlist
     */
    omit?: user_wishlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_wishlistInclude<ExtArgs> | null
    /**
     * Filter, which user_wishlist to fetch.
     */
    where: user_wishlistWhereUniqueInput
  }

  /**
   * user_wishlist findUniqueOrThrow
   */
  export type user_wishlistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_wishlist
     */
    select?: user_wishlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_wishlist
     */
    omit?: user_wishlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_wishlistInclude<ExtArgs> | null
    /**
     * Filter, which user_wishlist to fetch.
     */
    where: user_wishlistWhereUniqueInput
  }

  /**
   * user_wishlist findFirst
   */
  export type user_wishlistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_wishlist
     */
    select?: user_wishlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_wishlist
     */
    omit?: user_wishlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_wishlistInclude<ExtArgs> | null
    /**
     * Filter, which user_wishlist to fetch.
     */
    where?: user_wishlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_wishlists to fetch.
     */
    orderBy?: user_wishlistOrderByWithRelationInput | user_wishlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_wishlists.
     */
    cursor?: user_wishlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_wishlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_wishlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_wishlists.
     */
    distinct?: User_wishlistScalarFieldEnum | User_wishlistScalarFieldEnum[]
  }

  /**
   * user_wishlist findFirstOrThrow
   */
  export type user_wishlistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_wishlist
     */
    select?: user_wishlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_wishlist
     */
    omit?: user_wishlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_wishlistInclude<ExtArgs> | null
    /**
     * Filter, which user_wishlist to fetch.
     */
    where?: user_wishlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_wishlists to fetch.
     */
    orderBy?: user_wishlistOrderByWithRelationInput | user_wishlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_wishlists.
     */
    cursor?: user_wishlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_wishlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_wishlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_wishlists.
     */
    distinct?: User_wishlistScalarFieldEnum | User_wishlistScalarFieldEnum[]
  }

  /**
   * user_wishlist findMany
   */
  export type user_wishlistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_wishlist
     */
    select?: user_wishlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_wishlist
     */
    omit?: user_wishlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_wishlistInclude<ExtArgs> | null
    /**
     * Filter, which user_wishlists to fetch.
     */
    where?: user_wishlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_wishlists to fetch.
     */
    orderBy?: user_wishlistOrderByWithRelationInput | user_wishlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing user_wishlists.
     */
    cursor?: user_wishlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_wishlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_wishlists.
     */
    skip?: number
    distinct?: User_wishlistScalarFieldEnum | User_wishlistScalarFieldEnum[]
  }

  /**
   * user_wishlist create
   */
  export type user_wishlistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_wishlist
     */
    select?: user_wishlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_wishlist
     */
    omit?: user_wishlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_wishlistInclude<ExtArgs> | null
    /**
     * The data needed to create a user_wishlist.
     */
    data?: XOR<user_wishlistCreateInput, user_wishlistUncheckedCreateInput>
  }

  /**
   * user_wishlist createMany
   */
  export type user_wishlistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many user_wishlists.
     */
    data: user_wishlistCreateManyInput | user_wishlistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user_wishlist update
   */
  export type user_wishlistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_wishlist
     */
    select?: user_wishlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_wishlist
     */
    omit?: user_wishlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_wishlistInclude<ExtArgs> | null
    /**
     * The data needed to update a user_wishlist.
     */
    data: XOR<user_wishlistUpdateInput, user_wishlistUncheckedUpdateInput>
    /**
     * Choose, which user_wishlist to update.
     */
    where: user_wishlistWhereUniqueInput
  }

  /**
   * user_wishlist updateMany
   */
  export type user_wishlistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update user_wishlists.
     */
    data: XOR<user_wishlistUpdateManyMutationInput, user_wishlistUncheckedUpdateManyInput>
    /**
     * Filter which user_wishlists to update
     */
    where?: user_wishlistWhereInput
    /**
     * Limit how many user_wishlists to update.
     */
    limit?: number
  }

  /**
   * user_wishlist upsert
   */
  export type user_wishlistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_wishlist
     */
    select?: user_wishlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_wishlist
     */
    omit?: user_wishlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_wishlistInclude<ExtArgs> | null
    /**
     * The filter to search for the user_wishlist to update in case it exists.
     */
    where: user_wishlistWhereUniqueInput
    /**
     * In case the user_wishlist found by the `where` argument doesn't exist, create a new user_wishlist with this data.
     */
    create: XOR<user_wishlistCreateInput, user_wishlistUncheckedCreateInput>
    /**
     * In case the user_wishlist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<user_wishlistUpdateInput, user_wishlistUncheckedUpdateInput>
  }

  /**
   * user_wishlist delete
   */
  export type user_wishlistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_wishlist
     */
    select?: user_wishlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_wishlist
     */
    omit?: user_wishlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_wishlistInclude<ExtArgs> | null
    /**
     * Filter which user_wishlist to delete.
     */
    where: user_wishlistWhereUniqueInput
  }

  /**
   * user_wishlist deleteMany
   */
  export type user_wishlistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_wishlists to delete
     */
    where?: user_wishlistWhereInput
    /**
     * Limit how many user_wishlists to delete.
     */
    limit?: number
  }

  /**
   * user_wishlist.users
   */
  export type user_wishlist$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * user_wishlist.library_items
   */
  export type user_wishlist$library_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the library_items
     */
    select?: library_itemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the library_items
     */
    omit?: library_itemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: library_itemsInclude<ExtArgs> | null
    where?: library_itemsWhereInput
  }

  /**
   * user_wishlist without action
   */
  export type user_wishlistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_wishlist
     */
    select?: user_wishlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_wishlist
     */
    omit?: user_wishlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_wishlistInclude<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    user_id: number | null
  }

  export type UsersSumAggregateOutputType = {
    user_id: number | null
  }

  export type UsersMinAggregateOutputType = {
    user_id: number | null
    name: string | null
    email: string | null
    password_hash: string | null
    role: $Enums.users_role | null
    status: $Enums.users_status | null
    created_at: Date | null
    updated_at: Date | null
    gender: $Enums.gender | null
    phone_number: string | null
    birth_date: Date | null
    address: string | null
    profile_image_url: string | null
  }

  export type UsersMaxAggregateOutputType = {
    user_id: number | null
    name: string | null
    email: string | null
    password_hash: string | null
    role: $Enums.users_role | null
    status: $Enums.users_status | null
    created_at: Date | null
    updated_at: Date | null
    gender: $Enums.gender | null
    phone_number: string | null
    birth_date: Date | null
    address: string | null
    profile_image_url: string | null
  }

  export type UsersCountAggregateOutputType = {
    user_id: number
    name: number
    email: number
    password_hash: number
    role: number
    status: number
    created_at: number
    updated_at: number
    gender: number
    phone_number: number
    birth_date: number
    address: number
    profile_image_url: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    user_id?: true
  }

  export type UsersSumAggregateInputType = {
    user_id?: true
  }

  export type UsersMinAggregateInputType = {
    user_id?: true
    name?: true
    email?: true
    password_hash?: true
    role?: true
    status?: true
    created_at?: true
    updated_at?: true
    gender?: true
    phone_number?: true
    birth_date?: true
    address?: true
    profile_image_url?: true
  }

  export type UsersMaxAggregateInputType = {
    user_id?: true
    name?: true
    email?: true
    password_hash?: true
    role?: true
    status?: true
    created_at?: true
    updated_at?: true
    gender?: true
    phone_number?: true
    birth_date?: true
    address?: true
    profile_image_url?: true
  }

  export type UsersCountAggregateInputType = {
    user_id?: true
    name?: true
    email?: true
    password_hash?: true
    role?: true
    status?: true
    created_at?: true
    updated_at?: true
    gender?: true
    phone_number?: true
    birth_date?: true
    address?: true
    profile_image_url?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    user_id: number
    name: string | null
    email: string | null
    password_hash: string | null
    role: $Enums.users_role | null
    status: $Enums.users_status | null
    created_at: Date | null
    updated_at: Date | null
    gender: $Enums.gender | null
    phone_number: string | null
    birth_date: Date | null
    address: string | null
    profile_image_url: string | null
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    name?: boolean
    email?: boolean
    password_hash?: boolean
    role?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    gender?: boolean
    phone_number?: boolean
    birth_date?: boolean
    address?: boolean
    profile_image_url?: boolean
    item_tran?: boolean | users$item_tranArgs<ExtArgs>
    item_tran_history_item_tran_history_requested_byTousers?: boolean | users$item_tran_history_item_tran_history_requested_byTousersArgs<ExtArgs>
    item_tran_history_item_tran_history_approved_byTousers?: boolean | users$item_tran_history_item_tran_history_approved_byTousersArgs<ExtArgs>
    fines?: boolean | users$finesArgs<ExtArgs>
    logs?: boolean | users$logsArgs<ExtArgs>
    notifications_notifications_from_user_idTousers?: boolean | users$notifications_notifications_from_user_idTousersArgs<ExtArgs>
    notifications_notifications_to_user_idTousers?: boolean | users$notifications_notifications_to_user_idTousersArgs<ExtArgs>
    user_wishlist?: boolean | users$user_wishlistArgs<ExtArgs>
    library_cards?: boolean | users$library_cardsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>



  export type usersSelectScalar = {
    user_id?: boolean
    name?: boolean
    email?: boolean
    password_hash?: boolean
    role?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    gender?: boolean
    phone_number?: boolean
    birth_date?: boolean
    address?: boolean
    profile_image_url?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "name" | "email" | "password_hash" | "role" | "status" | "created_at" | "updated_at" | "gender" | "phone_number" | "birth_date" | "address" | "profile_image_url", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item_tran?: boolean | users$item_tranArgs<ExtArgs>
    item_tran_history_item_tran_history_requested_byTousers?: boolean | users$item_tran_history_item_tran_history_requested_byTousersArgs<ExtArgs>
    item_tran_history_item_tran_history_approved_byTousers?: boolean | users$item_tran_history_item_tran_history_approved_byTousersArgs<ExtArgs>
    fines?: boolean | users$finesArgs<ExtArgs>
    logs?: boolean | users$logsArgs<ExtArgs>
    notifications_notifications_from_user_idTousers?: boolean | users$notifications_notifications_from_user_idTousersArgs<ExtArgs>
    notifications_notifications_to_user_idTousers?: boolean | users$notifications_notifications_to_user_idTousersArgs<ExtArgs>
    user_wishlist?: boolean | users$user_wishlistArgs<ExtArgs>
    library_cards?: boolean | users$library_cardsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      item_tran: Prisma.$item_tranPayload<ExtArgs>[]
      item_tran_history_item_tran_history_requested_byTousers: Prisma.$item_tran_historyPayload<ExtArgs>[]
      item_tran_history_item_tran_history_approved_byTousers: Prisma.$item_tran_historyPayload<ExtArgs>[]
      fines: Prisma.$finesPayload<ExtArgs>[]
      logs: Prisma.$logsPayload<ExtArgs>[]
      notifications_notifications_from_user_idTousers: Prisma.$notificationsPayload<ExtArgs>[]
      notifications_notifications_to_user_idTousers: Prisma.$notificationsPayload<ExtArgs>[]
      user_wishlist: Prisma.$user_wishlistPayload<ExtArgs>[]
      library_cards: Prisma.$library_cardsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: number
      name: string | null
      email: string | null
      password_hash: string | null
      role: $Enums.users_role | null
      status: $Enums.users_status | null
      created_at: Date | null
      updated_at: Date | null
      gender: $Enums.gender | null
      phone_number: string | null
      birth_date: Date | null
      address: string | null
      profile_image_url: string | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const usersWithUser_idOnly = await prisma.users.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
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
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    item_tran<T extends users$item_tranArgs<ExtArgs> = {}>(args?: Subset<T, users$item_tranArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$item_tranPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    item_tran_history_item_tran_history_requested_byTousers<T extends users$item_tran_history_item_tran_history_requested_byTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$item_tran_history_item_tran_history_requested_byTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$item_tran_historyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    item_tran_history_item_tran_history_approved_byTousers<T extends users$item_tran_history_item_tran_history_approved_byTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$item_tran_history_item_tran_history_approved_byTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$item_tran_historyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    fines<T extends users$finesArgs<ExtArgs> = {}>(args?: Subset<T, users$finesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$finesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    logs<T extends users$logsArgs<ExtArgs> = {}>(args?: Subset<T, users$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications_notifications_from_user_idTousers<T extends users$notifications_notifications_from_user_idTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$notifications_notifications_from_user_idTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications_notifications_to_user_idTousers<T extends users$notifications_notifications_to_user_idTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$notifications_notifications_to_user_idTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user_wishlist<T extends users$user_wishlistArgs<ExtArgs> = {}>(args?: Subset<T, users$user_wishlistArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_wishlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    library_cards<T extends users$library_cardsArgs<ExtArgs> = {}>(args?: Subset<T, users$library_cardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$library_cardsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly user_id: FieldRef<"users", 'Int'>
    readonly name: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly password_hash: FieldRef<"users", 'String'>
    readonly role: FieldRef<"users", 'users_role'>
    readonly status: FieldRef<"users", 'users_status'>
    readonly created_at: FieldRef<"users", 'DateTime'>
    readonly updated_at: FieldRef<"users", 'DateTime'>
    readonly gender: FieldRef<"users", 'gender'>
    readonly phone_number: FieldRef<"users", 'String'>
    readonly birth_date: FieldRef<"users", 'DateTime'>
    readonly address: FieldRef<"users", 'String'>
    readonly profile_image_url: FieldRef<"users", 'String'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data?: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.item_tran
   */
  export type users$item_tranArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran
     */
    select?: item_tranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran
     */
    omit?: item_tranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tranInclude<ExtArgs> | null
    where?: item_tranWhereInput
    orderBy?: item_tranOrderByWithRelationInput | item_tranOrderByWithRelationInput[]
    cursor?: item_tranWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Item_tranScalarFieldEnum | Item_tranScalarFieldEnum[]
  }

  /**
   * users.item_tran_history_item_tran_history_requested_byTousers
   */
  export type users$item_tran_history_item_tran_history_requested_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran_history
     */
    select?: item_tran_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran_history
     */
    omit?: item_tran_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tran_historyInclude<ExtArgs> | null
    where?: item_tran_historyWhereInput
    orderBy?: item_tran_historyOrderByWithRelationInput | item_tran_historyOrderByWithRelationInput[]
    cursor?: item_tran_historyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Item_tran_historyScalarFieldEnum | Item_tran_historyScalarFieldEnum[]
  }

  /**
   * users.item_tran_history_item_tran_history_approved_byTousers
   */
  export type users$item_tran_history_item_tran_history_approved_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_tran_history
     */
    select?: item_tran_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_tran_history
     */
    omit?: item_tran_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_tran_historyInclude<ExtArgs> | null
    where?: item_tran_historyWhereInput
    orderBy?: item_tran_historyOrderByWithRelationInput | item_tran_historyOrderByWithRelationInput[]
    cursor?: item_tran_historyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Item_tran_historyScalarFieldEnum | Item_tran_historyScalarFieldEnum[]
  }

  /**
   * users.fines
   */
  export type users$finesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the fines
     */
    select?: finesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the fines
     */
    omit?: finesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: finesInclude<ExtArgs> | null
    where?: finesWhereInput
    orderBy?: finesOrderByWithRelationInput | finesOrderByWithRelationInput[]
    cursor?: finesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FinesScalarFieldEnum | FinesScalarFieldEnum[]
  }

  /**
   * users.logs
   */
  export type users$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the logs
     */
    select?: logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the logs
     */
    omit?: logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: logsInclude<ExtArgs> | null
    where?: logsWhereInput
    orderBy?: logsOrderByWithRelationInput | logsOrderByWithRelationInput[]
    cursor?: logsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LogsScalarFieldEnum | LogsScalarFieldEnum[]
  }

  /**
   * users.notifications_notifications_from_user_idTousers
   */
  export type users$notifications_notifications_from_user_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    where?: notificationsWhereInput
    orderBy?: notificationsOrderByWithRelationInput | notificationsOrderByWithRelationInput[]
    cursor?: notificationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationsScalarFieldEnum | NotificationsScalarFieldEnum[]
  }

  /**
   * users.notifications_notifications_to_user_idTousers
   */
  export type users$notifications_notifications_to_user_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    where?: notificationsWhereInput
    orderBy?: notificationsOrderByWithRelationInput | notificationsOrderByWithRelationInput[]
    cursor?: notificationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationsScalarFieldEnum | NotificationsScalarFieldEnum[]
  }

  /**
   * users.user_wishlist
   */
  export type users$user_wishlistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_wishlist
     */
    select?: user_wishlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_wishlist
     */
    omit?: user_wishlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_wishlistInclude<ExtArgs> | null
    where?: user_wishlistWhereInput
    orderBy?: user_wishlistOrderByWithRelationInput | user_wishlistOrderByWithRelationInput[]
    cursor?: user_wishlistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: User_wishlistScalarFieldEnum | User_wishlistScalarFieldEnum[]
  }

  /**
   * users.library_cards
   */
  export type users$library_cardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the library_cards
     */
    select?: library_cardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the library_cards
     */
    omit?: library_cardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: library_cardsInclude<ExtArgs> | null
    where?: library_cardsWhereInput
    orderBy?: library_cardsOrderByWithRelationInput | library_cardsOrderByWithRelationInput[]
    cursor?: library_cardsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Library_cardsScalarFieldEnum | Library_cardsScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Model contact_us
   */

  export type AggregateContact_us = {
    _count: Contact_usCountAggregateOutputType | null
    _avg: Contact_usAvgAggregateOutputType | null
    _sum: Contact_usSumAggregateOutputType | null
    _min: Contact_usMinAggregateOutputType | null
    _max: Contact_usMaxAggregateOutputType | null
  }

  export type Contact_usAvgAggregateOutputType = {
    id: number | null
  }

  export type Contact_usSumAggregateOutputType = {
    id: number | null
  }

  export type Contact_usMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    subject: string | null
    message: string | null
    created_at: Date | null
  }

  export type Contact_usMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    subject: string | null
    message: string | null
    created_at: Date | null
  }

  export type Contact_usCountAggregateOutputType = {
    id: number
    name: number
    email: number
    subject: number
    message: number
    created_at: number
    _all: number
  }


  export type Contact_usAvgAggregateInputType = {
    id?: true
  }

  export type Contact_usSumAggregateInputType = {
    id?: true
  }

  export type Contact_usMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    subject?: true
    message?: true
    created_at?: true
  }

  export type Contact_usMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    subject?: true
    message?: true
    created_at?: true
  }

  export type Contact_usCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    subject?: true
    message?: true
    created_at?: true
    _all?: true
  }

  export type Contact_usAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which contact_us to aggregate.
     */
    where?: contact_usWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of contact_uses to fetch.
     */
    orderBy?: contact_usOrderByWithRelationInput | contact_usOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: contact_usWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` contact_uses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` contact_uses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned contact_uses
    **/
    _count?: true | Contact_usCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Contact_usAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Contact_usSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Contact_usMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Contact_usMaxAggregateInputType
  }

  export type GetContact_usAggregateType<T extends Contact_usAggregateArgs> = {
        [P in keyof T & keyof AggregateContact_us]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContact_us[P]>
      : GetScalarType<T[P], AggregateContact_us[P]>
  }




  export type contact_usGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: contact_usWhereInput
    orderBy?: contact_usOrderByWithAggregationInput | contact_usOrderByWithAggregationInput[]
    by: Contact_usScalarFieldEnum[] | Contact_usScalarFieldEnum
    having?: contact_usScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Contact_usCountAggregateInputType | true
    _avg?: Contact_usAvgAggregateInputType
    _sum?: Contact_usSumAggregateInputType
    _min?: Contact_usMinAggregateInputType
    _max?: Contact_usMaxAggregateInputType
  }

  export type Contact_usGroupByOutputType = {
    id: number
    name: string | null
    email: string | null
    subject: string | null
    message: string | null
    created_at: Date | null
    _count: Contact_usCountAggregateOutputType | null
    _avg: Contact_usAvgAggregateOutputType | null
    _sum: Contact_usSumAggregateOutputType | null
    _min: Contact_usMinAggregateOutputType | null
    _max: Contact_usMaxAggregateOutputType | null
  }

  type GetContact_usGroupByPayload<T extends contact_usGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Contact_usGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Contact_usGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Contact_usGroupByOutputType[P]>
            : GetScalarType<T[P], Contact_usGroupByOutputType[P]>
        }
      >
    >


  export type contact_usSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    subject?: boolean
    message?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["contact_us"]>



  export type contact_usSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    subject?: boolean
    message?: boolean
    created_at?: boolean
  }

  export type contact_usOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "subject" | "message" | "created_at", ExtArgs["result"]["contact_us"]>

  export type $contact_usPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "contact_us"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string | null
      email: string | null
      subject: string | null
      message: string | null
      created_at: Date | null
    }, ExtArgs["result"]["contact_us"]>
    composites: {}
  }

  type contact_usGetPayload<S extends boolean | null | undefined | contact_usDefaultArgs> = $Result.GetResult<Prisma.$contact_usPayload, S>

  type contact_usCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<contact_usFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Contact_usCountAggregateInputType | true
    }

  export interface contact_usDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['contact_us'], meta: { name: 'contact_us' } }
    /**
     * Find zero or one Contact_us that matches the filter.
     * @param {contact_usFindUniqueArgs} args - Arguments to find a Contact_us
     * @example
     * // Get one Contact_us
     * const contact_us = await prisma.contact_us.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends contact_usFindUniqueArgs>(args: SelectSubset<T, contact_usFindUniqueArgs<ExtArgs>>): Prisma__contact_usClient<$Result.GetResult<Prisma.$contact_usPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Contact_us that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {contact_usFindUniqueOrThrowArgs} args - Arguments to find a Contact_us
     * @example
     * // Get one Contact_us
     * const contact_us = await prisma.contact_us.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends contact_usFindUniqueOrThrowArgs>(args: SelectSubset<T, contact_usFindUniqueOrThrowArgs<ExtArgs>>): Prisma__contact_usClient<$Result.GetResult<Prisma.$contact_usPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contact_us that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {contact_usFindFirstArgs} args - Arguments to find a Contact_us
     * @example
     * // Get one Contact_us
     * const contact_us = await prisma.contact_us.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends contact_usFindFirstArgs>(args?: SelectSubset<T, contact_usFindFirstArgs<ExtArgs>>): Prisma__contact_usClient<$Result.GetResult<Prisma.$contact_usPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contact_us that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {contact_usFindFirstOrThrowArgs} args - Arguments to find a Contact_us
     * @example
     * // Get one Contact_us
     * const contact_us = await prisma.contact_us.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends contact_usFindFirstOrThrowArgs>(args?: SelectSubset<T, contact_usFindFirstOrThrowArgs<ExtArgs>>): Prisma__contact_usClient<$Result.GetResult<Prisma.$contact_usPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Contact_uses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {contact_usFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contact_uses
     * const contact_uses = await prisma.contact_us.findMany()
     * 
     * // Get first 10 Contact_uses
     * const contact_uses = await prisma.contact_us.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contact_usWithIdOnly = await prisma.contact_us.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends contact_usFindManyArgs>(args?: SelectSubset<T, contact_usFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$contact_usPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Contact_us.
     * @param {contact_usCreateArgs} args - Arguments to create a Contact_us.
     * @example
     * // Create one Contact_us
     * const Contact_us = await prisma.contact_us.create({
     *   data: {
     *     // ... data to create a Contact_us
     *   }
     * })
     * 
     */
    create<T extends contact_usCreateArgs>(args: SelectSubset<T, contact_usCreateArgs<ExtArgs>>): Prisma__contact_usClient<$Result.GetResult<Prisma.$contact_usPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Contact_uses.
     * @param {contact_usCreateManyArgs} args - Arguments to create many Contact_uses.
     * @example
     * // Create many Contact_uses
     * const contact_us = await prisma.contact_us.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends contact_usCreateManyArgs>(args?: SelectSubset<T, contact_usCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Contact_us.
     * @param {contact_usDeleteArgs} args - Arguments to delete one Contact_us.
     * @example
     * // Delete one Contact_us
     * const Contact_us = await prisma.contact_us.delete({
     *   where: {
     *     // ... filter to delete one Contact_us
     *   }
     * })
     * 
     */
    delete<T extends contact_usDeleteArgs>(args: SelectSubset<T, contact_usDeleteArgs<ExtArgs>>): Prisma__contact_usClient<$Result.GetResult<Prisma.$contact_usPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Contact_us.
     * @param {contact_usUpdateArgs} args - Arguments to update one Contact_us.
     * @example
     * // Update one Contact_us
     * const contact_us = await prisma.contact_us.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends contact_usUpdateArgs>(args: SelectSubset<T, contact_usUpdateArgs<ExtArgs>>): Prisma__contact_usClient<$Result.GetResult<Prisma.$contact_usPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Contact_uses.
     * @param {contact_usDeleteManyArgs} args - Arguments to filter Contact_uses to delete.
     * @example
     * // Delete a few Contact_uses
     * const { count } = await prisma.contact_us.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends contact_usDeleteManyArgs>(args?: SelectSubset<T, contact_usDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contact_uses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {contact_usUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contact_uses
     * const contact_us = await prisma.contact_us.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends contact_usUpdateManyArgs>(args: SelectSubset<T, contact_usUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Contact_us.
     * @param {contact_usUpsertArgs} args - Arguments to update or create a Contact_us.
     * @example
     * // Update or create a Contact_us
     * const contact_us = await prisma.contact_us.upsert({
     *   create: {
     *     // ... data to create a Contact_us
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contact_us we want to update
     *   }
     * })
     */
    upsert<T extends contact_usUpsertArgs>(args: SelectSubset<T, contact_usUpsertArgs<ExtArgs>>): Prisma__contact_usClient<$Result.GetResult<Prisma.$contact_usPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Contact_uses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {contact_usCountArgs} args - Arguments to filter Contact_uses to count.
     * @example
     * // Count the number of Contact_uses
     * const count = await prisma.contact_us.count({
     *   where: {
     *     // ... the filter for the Contact_uses we want to count
     *   }
     * })
    **/
    count<T extends contact_usCountArgs>(
      args?: Subset<T, contact_usCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Contact_usCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contact_us.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Contact_usAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Contact_usAggregateArgs>(args: Subset<T, Contact_usAggregateArgs>): Prisma.PrismaPromise<GetContact_usAggregateType<T>>

    /**
     * Group by Contact_us.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {contact_usGroupByArgs} args - Group by arguments.
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
      T extends contact_usGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: contact_usGroupByArgs['orderBy'] }
        : { orderBy?: contact_usGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, contact_usGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContact_usGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the contact_us model
   */
  readonly fields: contact_usFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for contact_us.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__contact_usClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the contact_us model
   */
  interface contact_usFieldRefs {
    readonly id: FieldRef<"contact_us", 'Int'>
    readonly name: FieldRef<"contact_us", 'String'>
    readonly email: FieldRef<"contact_us", 'String'>
    readonly subject: FieldRef<"contact_us", 'String'>
    readonly message: FieldRef<"contact_us", 'String'>
    readonly created_at: FieldRef<"contact_us", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * contact_us findUnique
   */
  export type contact_usFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contact_us
     */
    select?: contact_usSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contact_us
     */
    omit?: contact_usOmit<ExtArgs> | null
    /**
     * Filter, which contact_us to fetch.
     */
    where: contact_usWhereUniqueInput
  }

  /**
   * contact_us findUniqueOrThrow
   */
  export type contact_usFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contact_us
     */
    select?: contact_usSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contact_us
     */
    omit?: contact_usOmit<ExtArgs> | null
    /**
     * Filter, which contact_us to fetch.
     */
    where: contact_usWhereUniqueInput
  }

  /**
   * contact_us findFirst
   */
  export type contact_usFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contact_us
     */
    select?: contact_usSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contact_us
     */
    omit?: contact_usOmit<ExtArgs> | null
    /**
     * Filter, which contact_us to fetch.
     */
    where?: contact_usWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of contact_uses to fetch.
     */
    orderBy?: contact_usOrderByWithRelationInput | contact_usOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for contact_uses.
     */
    cursor?: contact_usWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` contact_uses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` contact_uses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of contact_uses.
     */
    distinct?: Contact_usScalarFieldEnum | Contact_usScalarFieldEnum[]
  }

  /**
   * contact_us findFirstOrThrow
   */
  export type contact_usFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contact_us
     */
    select?: contact_usSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contact_us
     */
    omit?: contact_usOmit<ExtArgs> | null
    /**
     * Filter, which contact_us to fetch.
     */
    where?: contact_usWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of contact_uses to fetch.
     */
    orderBy?: contact_usOrderByWithRelationInput | contact_usOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for contact_uses.
     */
    cursor?: contact_usWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` contact_uses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` contact_uses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of contact_uses.
     */
    distinct?: Contact_usScalarFieldEnum | Contact_usScalarFieldEnum[]
  }

  /**
   * contact_us findMany
   */
  export type contact_usFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contact_us
     */
    select?: contact_usSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contact_us
     */
    omit?: contact_usOmit<ExtArgs> | null
    /**
     * Filter, which contact_uses to fetch.
     */
    where?: contact_usWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of contact_uses to fetch.
     */
    orderBy?: contact_usOrderByWithRelationInput | contact_usOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing contact_uses.
     */
    cursor?: contact_usWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` contact_uses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` contact_uses.
     */
    skip?: number
    distinct?: Contact_usScalarFieldEnum | Contact_usScalarFieldEnum[]
  }

  /**
   * contact_us create
   */
  export type contact_usCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contact_us
     */
    select?: contact_usSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contact_us
     */
    omit?: contact_usOmit<ExtArgs> | null
    /**
     * The data needed to create a contact_us.
     */
    data?: XOR<contact_usCreateInput, contact_usUncheckedCreateInput>
  }

  /**
   * contact_us createMany
   */
  export type contact_usCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many contact_uses.
     */
    data: contact_usCreateManyInput | contact_usCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * contact_us update
   */
  export type contact_usUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contact_us
     */
    select?: contact_usSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contact_us
     */
    omit?: contact_usOmit<ExtArgs> | null
    /**
     * The data needed to update a contact_us.
     */
    data: XOR<contact_usUpdateInput, contact_usUncheckedUpdateInput>
    /**
     * Choose, which contact_us to update.
     */
    where: contact_usWhereUniqueInput
  }

  /**
   * contact_us updateMany
   */
  export type contact_usUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update contact_uses.
     */
    data: XOR<contact_usUpdateManyMutationInput, contact_usUncheckedUpdateManyInput>
    /**
     * Filter which contact_uses to update
     */
    where?: contact_usWhereInput
    /**
     * Limit how many contact_uses to update.
     */
    limit?: number
  }

  /**
   * contact_us upsert
   */
  export type contact_usUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contact_us
     */
    select?: contact_usSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contact_us
     */
    omit?: contact_usOmit<ExtArgs> | null
    /**
     * The filter to search for the contact_us to update in case it exists.
     */
    where: contact_usWhereUniqueInput
    /**
     * In case the contact_us found by the `where` argument doesn't exist, create a new contact_us with this data.
     */
    create: XOR<contact_usCreateInput, contact_usUncheckedCreateInput>
    /**
     * In case the contact_us was found with the provided `where` argument, update it with this data.
     */
    update: XOR<contact_usUpdateInput, contact_usUncheckedUpdateInput>
  }

  /**
   * contact_us delete
   */
  export type contact_usDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contact_us
     */
    select?: contact_usSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contact_us
     */
    omit?: contact_usOmit<ExtArgs> | null
    /**
     * Filter which contact_us to delete.
     */
    where: contact_usWhereUniqueInput
  }

  /**
   * contact_us deleteMany
   */
  export type contact_usDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which contact_uses to delete
     */
    where?: contact_usWhereInput
    /**
     * Limit how many contact_uses to delete.
     */
    limit?: number
  }

  /**
   * contact_us without action
   */
  export type contact_usDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the contact_us
     */
    select?: contact_usSelect<ExtArgs> | null
    /**
     * Omit specific fields from the contact_us
     */
    omit?: contact_usOmit<ExtArgs> | null
  }


  /**
   * Model system_config
   */

  export type AggregateSystem_config = {
    _count: System_configCountAggregateOutputType | null
    _avg: System_configAvgAggregateOutputType | null
    _sum: System_configSumAggregateOutputType | null
    _min: System_configMinAggregateOutputType | null
    _max: System_configMaxAggregateOutputType | null
  }

  export type System_configAvgAggregateOutputType = {
    config_id: number | null
  }

  export type System_configSumAggregateOutputType = {
    config_id: number | null
  }

  export type System_configMinAggregateOutputType = {
    config_id: number | null
    config_key: string | null
    config_value: string | null
    description: string | null
    updated_at: Date | null
  }

  export type System_configMaxAggregateOutputType = {
    config_id: number | null
    config_key: string | null
    config_value: string | null
    description: string | null
    updated_at: Date | null
  }

  export type System_configCountAggregateOutputType = {
    config_id: number
    config_key: number
    config_value: number
    description: number
    updated_at: number
    _all: number
  }


  export type System_configAvgAggregateInputType = {
    config_id?: true
  }

  export type System_configSumAggregateInputType = {
    config_id?: true
  }

  export type System_configMinAggregateInputType = {
    config_id?: true
    config_key?: true
    config_value?: true
    description?: true
    updated_at?: true
  }

  export type System_configMaxAggregateInputType = {
    config_id?: true
    config_key?: true
    config_value?: true
    description?: true
    updated_at?: true
  }

  export type System_configCountAggregateInputType = {
    config_id?: true
    config_key?: true
    config_value?: true
    description?: true
    updated_at?: true
    _all?: true
  }

  export type System_configAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which system_config to aggregate.
     */
    where?: system_configWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of system_configs to fetch.
     */
    orderBy?: system_configOrderByWithRelationInput | system_configOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: system_configWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` system_configs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` system_configs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned system_configs
    **/
    _count?: true | System_configCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: System_configAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: System_configSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: System_configMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: System_configMaxAggregateInputType
  }

  export type GetSystem_configAggregateType<T extends System_configAggregateArgs> = {
        [P in keyof T & keyof AggregateSystem_config]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystem_config[P]>
      : GetScalarType<T[P], AggregateSystem_config[P]>
  }




  export type system_configGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: system_configWhereInput
    orderBy?: system_configOrderByWithAggregationInput | system_configOrderByWithAggregationInput[]
    by: System_configScalarFieldEnum[] | System_configScalarFieldEnum
    having?: system_configScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: System_configCountAggregateInputType | true
    _avg?: System_configAvgAggregateInputType
    _sum?: System_configSumAggregateInputType
    _min?: System_configMinAggregateInputType
    _max?: System_configMaxAggregateInputType
  }

  export type System_configGroupByOutputType = {
    config_id: number
    config_key: string
    config_value: string
    description: string | null
    updated_at: Date
    _count: System_configCountAggregateOutputType | null
    _avg: System_configAvgAggregateOutputType | null
    _sum: System_configSumAggregateOutputType | null
    _min: System_configMinAggregateOutputType | null
    _max: System_configMaxAggregateOutputType | null
  }

  type GetSystem_configGroupByPayload<T extends system_configGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<System_configGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof System_configGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], System_configGroupByOutputType[P]>
            : GetScalarType<T[P], System_configGroupByOutputType[P]>
        }
      >
    >


  export type system_configSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    config_id?: boolean
    config_key?: boolean
    config_value?: boolean
    description?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["system_config"]>



  export type system_configSelectScalar = {
    config_id?: boolean
    config_key?: boolean
    config_value?: boolean
    description?: boolean
    updated_at?: boolean
  }

  export type system_configOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"config_id" | "config_key" | "config_value" | "description" | "updated_at", ExtArgs["result"]["system_config"]>

  export type $system_configPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "system_config"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      config_id: number
      config_key: string
      config_value: string
      description: string | null
      updated_at: Date
    }, ExtArgs["result"]["system_config"]>
    composites: {}
  }

  type system_configGetPayload<S extends boolean | null | undefined | system_configDefaultArgs> = $Result.GetResult<Prisma.$system_configPayload, S>

  type system_configCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<system_configFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: System_configCountAggregateInputType | true
    }

  export interface system_configDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['system_config'], meta: { name: 'system_config' } }
    /**
     * Find zero or one System_config that matches the filter.
     * @param {system_configFindUniqueArgs} args - Arguments to find a System_config
     * @example
     * // Get one System_config
     * const system_config = await prisma.system_config.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends system_configFindUniqueArgs>(args: SelectSubset<T, system_configFindUniqueArgs<ExtArgs>>): Prisma__system_configClient<$Result.GetResult<Prisma.$system_configPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one System_config that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {system_configFindUniqueOrThrowArgs} args - Arguments to find a System_config
     * @example
     * // Get one System_config
     * const system_config = await prisma.system_config.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends system_configFindUniqueOrThrowArgs>(args: SelectSubset<T, system_configFindUniqueOrThrowArgs<ExtArgs>>): Prisma__system_configClient<$Result.GetResult<Prisma.$system_configPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first System_config that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {system_configFindFirstArgs} args - Arguments to find a System_config
     * @example
     * // Get one System_config
     * const system_config = await prisma.system_config.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends system_configFindFirstArgs>(args?: SelectSubset<T, system_configFindFirstArgs<ExtArgs>>): Prisma__system_configClient<$Result.GetResult<Prisma.$system_configPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first System_config that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {system_configFindFirstOrThrowArgs} args - Arguments to find a System_config
     * @example
     * // Get one System_config
     * const system_config = await prisma.system_config.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends system_configFindFirstOrThrowArgs>(args?: SelectSubset<T, system_configFindFirstOrThrowArgs<ExtArgs>>): Prisma__system_configClient<$Result.GetResult<Prisma.$system_configPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more System_configs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {system_configFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all System_configs
     * const system_configs = await prisma.system_config.findMany()
     * 
     * // Get first 10 System_configs
     * const system_configs = await prisma.system_config.findMany({ take: 10 })
     * 
     * // Only select the `config_id`
     * const system_configWithConfig_idOnly = await prisma.system_config.findMany({ select: { config_id: true } })
     * 
     */
    findMany<T extends system_configFindManyArgs>(args?: SelectSubset<T, system_configFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$system_configPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a System_config.
     * @param {system_configCreateArgs} args - Arguments to create a System_config.
     * @example
     * // Create one System_config
     * const System_config = await prisma.system_config.create({
     *   data: {
     *     // ... data to create a System_config
     *   }
     * })
     * 
     */
    create<T extends system_configCreateArgs>(args: SelectSubset<T, system_configCreateArgs<ExtArgs>>): Prisma__system_configClient<$Result.GetResult<Prisma.$system_configPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many System_configs.
     * @param {system_configCreateManyArgs} args - Arguments to create many System_configs.
     * @example
     * // Create many System_configs
     * const system_config = await prisma.system_config.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends system_configCreateManyArgs>(args?: SelectSubset<T, system_configCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a System_config.
     * @param {system_configDeleteArgs} args - Arguments to delete one System_config.
     * @example
     * // Delete one System_config
     * const System_config = await prisma.system_config.delete({
     *   where: {
     *     // ... filter to delete one System_config
     *   }
     * })
     * 
     */
    delete<T extends system_configDeleteArgs>(args: SelectSubset<T, system_configDeleteArgs<ExtArgs>>): Prisma__system_configClient<$Result.GetResult<Prisma.$system_configPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one System_config.
     * @param {system_configUpdateArgs} args - Arguments to update one System_config.
     * @example
     * // Update one System_config
     * const system_config = await prisma.system_config.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends system_configUpdateArgs>(args: SelectSubset<T, system_configUpdateArgs<ExtArgs>>): Prisma__system_configClient<$Result.GetResult<Prisma.$system_configPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more System_configs.
     * @param {system_configDeleteManyArgs} args - Arguments to filter System_configs to delete.
     * @example
     * // Delete a few System_configs
     * const { count } = await prisma.system_config.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends system_configDeleteManyArgs>(args?: SelectSubset<T, system_configDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more System_configs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {system_configUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many System_configs
     * const system_config = await prisma.system_config.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends system_configUpdateManyArgs>(args: SelectSubset<T, system_configUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one System_config.
     * @param {system_configUpsertArgs} args - Arguments to update or create a System_config.
     * @example
     * // Update or create a System_config
     * const system_config = await prisma.system_config.upsert({
     *   create: {
     *     // ... data to create a System_config
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the System_config we want to update
     *   }
     * })
     */
    upsert<T extends system_configUpsertArgs>(args: SelectSubset<T, system_configUpsertArgs<ExtArgs>>): Prisma__system_configClient<$Result.GetResult<Prisma.$system_configPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of System_configs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {system_configCountArgs} args - Arguments to filter System_configs to count.
     * @example
     * // Count the number of System_configs
     * const count = await prisma.system_config.count({
     *   where: {
     *     // ... the filter for the System_configs we want to count
     *   }
     * })
    **/
    count<T extends system_configCountArgs>(
      args?: Subset<T, system_configCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], System_configCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a System_config.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {System_configAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends System_configAggregateArgs>(args: Subset<T, System_configAggregateArgs>): Prisma.PrismaPromise<GetSystem_configAggregateType<T>>

    /**
     * Group by System_config.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {system_configGroupByArgs} args - Group by arguments.
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
      T extends system_configGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: system_configGroupByArgs['orderBy'] }
        : { orderBy?: system_configGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, system_configGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystem_configGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the system_config model
   */
  readonly fields: system_configFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for system_config.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__system_configClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the system_config model
   */
  interface system_configFieldRefs {
    readonly config_id: FieldRef<"system_config", 'Int'>
    readonly config_key: FieldRef<"system_config", 'String'>
    readonly config_value: FieldRef<"system_config", 'String'>
    readonly description: FieldRef<"system_config", 'String'>
    readonly updated_at: FieldRef<"system_config", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * system_config findUnique
   */
  export type system_configFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the system_config
     */
    select?: system_configSelect<ExtArgs> | null
    /**
     * Omit specific fields from the system_config
     */
    omit?: system_configOmit<ExtArgs> | null
    /**
     * Filter, which system_config to fetch.
     */
    where: system_configWhereUniqueInput
  }

  /**
   * system_config findUniqueOrThrow
   */
  export type system_configFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the system_config
     */
    select?: system_configSelect<ExtArgs> | null
    /**
     * Omit specific fields from the system_config
     */
    omit?: system_configOmit<ExtArgs> | null
    /**
     * Filter, which system_config to fetch.
     */
    where: system_configWhereUniqueInput
  }

  /**
   * system_config findFirst
   */
  export type system_configFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the system_config
     */
    select?: system_configSelect<ExtArgs> | null
    /**
     * Omit specific fields from the system_config
     */
    omit?: system_configOmit<ExtArgs> | null
    /**
     * Filter, which system_config to fetch.
     */
    where?: system_configWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of system_configs to fetch.
     */
    orderBy?: system_configOrderByWithRelationInput | system_configOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for system_configs.
     */
    cursor?: system_configWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` system_configs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` system_configs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of system_configs.
     */
    distinct?: System_configScalarFieldEnum | System_configScalarFieldEnum[]
  }

  /**
   * system_config findFirstOrThrow
   */
  export type system_configFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the system_config
     */
    select?: system_configSelect<ExtArgs> | null
    /**
     * Omit specific fields from the system_config
     */
    omit?: system_configOmit<ExtArgs> | null
    /**
     * Filter, which system_config to fetch.
     */
    where?: system_configWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of system_configs to fetch.
     */
    orderBy?: system_configOrderByWithRelationInput | system_configOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for system_configs.
     */
    cursor?: system_configWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` system_configs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` system_configs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of system_configs.
     */
    distinct?: System_configScalarFieldEnum | System_configScalarFieldEnum[]
  }

  /**
   * system_config findMany
   */
  export type system_configFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the system_config
     */
    select?: system_configSelect<ExtArgs> | null
    /**
     * Omit specific fields from the system_config
     */
    omit?: system_configOmit<ExtArgs> | null
    /**
     * Filter, which system_configs to fetch.
     */
    where?: system_configWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of system_configs to fetch.
     */
    orderBy?: system_configOrderByWithRelationInput | system_configOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing system_configs.
     */
    cursor?: system_configWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` system_configs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` system_configs.
     */
    skip?: number
    distinct?: System_configScalarFieldEnum | System_configScalarFieldEnum[]
  }

  /**
   * system_config create
   */
  export type system_configCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the system_config
     */
    select?: system_configSelect<ExtArgs> | null
    /**
     * Omit specific fields from the system_config
     */
    omit?: system_configOmit<ExtArgs> | null
    /**
     * The data needed to create a system_config.
     */
    data: XOR<system_configCreateInput, system_configUncheckedCreateInput>
  }

  /**
   * system_config createMany
   */
  export type system_configCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many system_configs.
     */
    data: system_configCreateManyInput | system_configCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * system_config update
   */
  export type system_configUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the system_config
     */
    select?: system_configSelect<ExtArgs> | null
    /**
     * Omit specific fields from the system_config
     */
    omit?: system_configOmit<ExtArgs> | null
    /**
     * The data needed to update a system_config.
     */
    data: XOR<system_configUpdateInput, system_configUncheckedUpdateInput>
    /**
     * Choose, which system_config to update.
     */
    where: system_configWhereUniqueInput
  }

  /**
   * system_config updateMany
   */
  export type system_configUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update system_configs.
     */
    data: XOR<system_configUpdateManyMutationInput, system_configUncheckedUpdateManyInput>
    /**
     * Filter which system_configs to update
     */
    where?: system_configWhereInput
    /**
     * Limit how many system_configs to update.
     */
    limit?: number
  }

  /**
   * system_config upsert
   */
  export type system_configUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the system_config
     */
    select?: system_configSelect<ExtArgs> | null
    /**
     * Omit specific fields from the system_config
     */
    omit?: system_configOmit<ExtArgs> | null
    /**
     * The filter to search for the system_config to update in case it exists.
     */
    where: system_configWhereUniqueInput
    /**
     * In case the system_config found by the `where` argument doesn't exist, create a new system_config with this data.
     */
    create: XOR<system_configCreateInput, system_configUncheckedCreateInput>
    /**
     * In case the system_config was found with the provided `where` argument, update it with this data.
     */
    update: XOR<system_configUpdateInput, system_configUncheckedUpdateInput>
  }

  /**
   * system_config delete
   */
  export type system_configDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the system_config
     */
    select?: system_configSelect<ExtArgs> | null
    /**
     * Omit specific fields from the system_config
     */
    omit?: system_configOmit<ExtArgs> | null
    /**
     * Filter which system_config to delete.
     */
    where: system_configWhereUniqueInput
  }

  /**
   * system_config deleteMany
   */
  export type system_configDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which system_configs to delete
     */
    where?: system_configWhereInput
    /**
     * Limit how many system_configs to delete.
     */
    limit?: number
  }

  /**
   * system_config without action
   */
  export type system_configDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the system_config
     */
    select?: system_configSelect<ExtArgs> | null
    /**
     * Omit specific fields from the system_config
     */
    omit?: system_configOmit<ExtArgs> | null
  }


  /**
   * Model library_cards
   */

  export type AggregateLibrary_cards = {
    _count: Library_cardsCountAggregateOutputType | null
    _avg: Library_cardsAvgAggregateOutputType | null
    _sum: Library_cardsSumAggregateOutputType | null
    _min: Library_cardsMinAggregateOutputType | null
    _max: Library_cardsMaxAggregateOutputType | null
  }

  export type Library_cardsAvgAggregateOutputType = {
    card_id: number | null
    user_id: number | null
  }

  export type Library_cardsSumAggregateOutputType = {
    card_id: number | null
    user_id: number | null
  }

  export type Library_cardsMinAggregateOutputType = {
    card_id: number | null
    user_id: number | null
    card_number: string | null
    issued_at: Date | null
    expires_at: Date | null
    status: $Enums.card_status | null
  }

  export type Library_cardsMaxAggregateOutputType = {
    card_id: number | null
    user_id: number | null
    card_number: string | null
    issued_at: Date | null
    expires_at: Date | null
    status: $Enums.card_status | null
  }

  export type Library_cardsCountAggregateOutputType = {
    card_id: number
    user_id: number
    card_number: number
    issued_at: number
    expires_at: number
    status: number
    _all: number
  }


  export type Library_cardsAvgAggregateInputType = {
    card_id?: true
    user_id?: true
  }

  export type Library_cardsSumAggregateInputType = {
    card_id?: true
    user_id?: true
  }

  export type Library_cardsMinAggregateInputType = {
    card_id?: true
    user_id?: true
    card_number?: true
    issued_at?: true
    expires_at?: true
    status?: true
  }

  export type Library_cardsMaxAggregateInputType = {
    card_id?: true
    user_id?: true
    card_number?: true
    issued_at?: true
    expires_at?: true
    status?: true
  }

  export type Library_cardsCountAggregateInputType = {
    card_id?: true
    user_id?: true
    card_number?: true
    issued_at?: true
    expires_at?: true
    status?: true
    _all?: true
  }

  export type Library_cardsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which library_cards to aggregate.
     */
    where?: library_cardsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of library_cards to fetch.
     */
    orderBy?: library_cardsOrderByWithRelationInput | library_cardsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: library_cardsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` library_cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` library_cards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned library_cards
    **/
    _count?: true | Library_cardsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Library_cardsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Library_cardsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Library_cardsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Library_cardsMaxAggregateInputType
  }

  export type GetLibrary_cardsAggregateType<T extends Library_cardsAggregateArgs> = {
        [P in keyof T & keyof AggregateLibrary_cards]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLibrary_cards[P]>
      : GetScalarType<T[P], AggregateLibrary_cards[P]>
  }




  export type library_cardsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: library_cardsWhereInput
    orderBy?: library_cardsOrderByWithAggregationInput | library_cardsOrderByWithAggregationInput[]
    by: Library_cardsScalarFieldEnum[] | Library_cardsScalarFieldEnum
    having?: library_cardsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Library_cardsCountAggregateInputType | true
    _avg?: Library_cardsAvgAggregateInputType
    _sum?: Library_cardsSumAggregateInputType
    _min?: Library_cardsMinAggregateInputType
    _max?: Library_cardsMaxAggregateInputType
  }

  export type Library_cardsGroupByOutputType = {
    card_id: number
    user_id: number | null
    card_number: string
    issued_at: Date
    expires_at: Date | null
    status: $Enums.card_status
    _count: Library_cardsCountAggregateOutputType | null
    _avg: Library_cardsAvgAggregateOutputType | null
    _sum: Library_cardsSumAggregateOutputType | null
    _min: Library_cardsMinAggregateOutputType | null
    _max: Library_cardsMaxAggregateOutputType | null
  }

  type GetLibrary_cardsGroupByPayload<T extends library_cardsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Library_cardsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Library_cardsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Library_cardsGroupByOutputType[P]>
            : GetScalarType<T[P], Library_cardsGroupByOutputType[P]>
        }
      >
    >


  export type library_cardsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    card_id?: boolean
    user_id?: boolean
    card_number?: boolean
    issued_at?: boolean
    expires_at?: boolean
    status?: boolean
    users?: boolean | library_cards$usersArgs<ExtArgs>
  }, ExtArgs["result"]["library_cards"]>



  export type library_cardsSelectScalar = {
    card_id?: boolean
    user_id?: boolean
    card_number?: boolean
    issued_at?: boolean
    expires_at?: boolean
    status?: boolean
  }

  export type library_cardsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"card_id" | "user_id" | "card_number" | "issued_at" | "expires_at" | "status", ExtArgs["result"]["library_cards"]>
  export type library_cardsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | library_cards$usersArgs<ExtArgs>
  }

  export type $library_cardsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "library_cards"
    objects: {
      users: Prisma.$usersPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      card_id: number
      user_id: number | null
      card_number: string
      issued_at: Date
      expires_at: Date | null
      status: $Enums.card_status
    }, ExtArgs["result"]["library_cards"]>
    composites: {}
  }

  type library_cardsGetPayload<S extends boolean | null | undefined | library_cardsDefaultArgs> = $Result.GetResult<Prisma.$library_cardsPayload, S>

  type library_cardsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<library_cardsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Library_cardsCountAggregateInputType | true
    }

  export interface library_cardsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['library_cards'], meta: { name: 'library_cards' } }
    /**
     * Find zero or one Library_cards that matches the filter.
     * @param {library_cardsFindUniqueArgs} args - Arguments to find a Library_cards
     * @example
     * // Get one Library_cards
     * const library_cards = await prisma.library_cards.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends library_cardsFindUniqueArgs>(args: SelectSubset<T, library_cardsFindUniqueArgs<ExtArgs>>): Prisma__library_cardsClient<$Result.GetResult<Prisma.$library_cardsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Library_cards that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {library_cardsFindUniqueOrThrowArgs} args - Arguments to find a Library_cards
     * @example
     * // Get one Library_cards
     * const library_cards = await prisma.library_cards.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends library_cardsFindUniqueOrThrowArgs>(args: SelectSubset<T, library_cardsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__library_cardsClient<$Result.GetResult<Prisma.$library_cardsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Library_cards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {library_cardsFindFirstArgs} args - Arguments to find a Library_cards
     * @example
     * // Get one Library_cards
     * const library_cards = await prisma.library_cards.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends library_cardsFindFirstArgs>(args?: SelectSubset<T, library_cardsFindFirstArgs<ExtArgs>>): Prisma__library_cardsClient<$Result.GetResult<Prisma.$library_cardsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Library_cards that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {library_cardsFindFirstOrThrowArgs} args - Arguments to find a Library_cards
     * @example
     * // Get one Library_cards
     * const library_cards = await prisma.library_cards.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends library_cardsFindFirstOrThrowArgs>(args?: SelectSubset<T, library_cardsFindFirstOrThrowArgs<ExtArgs>>): Prisma__library_cardsClient<$Result.GetResult<Prisma.$library_cardsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Library_cards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {library_cardsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Library_cards
     * const library_cards = await prisma.library_cards.findMany()
     * 
     * // Get first 10 Library_cards
     * const library_cards = await prisma.library_cards.findMany({ take: 10 })
     * 
     * // Only select the `card_id`
     * const library_cardsWithCard_idOnly = await prisma.library_cards.findMany({ select: { card_id: true } })
     * 
     */
    findMany<T extends library_cardsFindManyArgs>(args?: SelectSubset<T, library_cardsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$library_cardsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Library_cards.
     * @param {library_cardsCreateArgs} args - Arguments to create a Library_cards.
     * @example
     * // Create one Library_cards
     * const Library_cards = await prisma.library_cards.create({
     *   data: {
     *     // ... data to create a Library_cards
     *   }
     * })
     * 
     */
    create<T extends library_cardsCreateArgs>(args: SelectSubset<T, library_cardsCreateArgs<ExtArgs>>): Prisma__library_cardsClient<$Result.GetResult<Prisma.$library_cardsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Library_cards.
     * @param {library_cardsCreateManyArgs} args - Arguments to create many Library_cards.
     * @example
     * // Create many Library_cards
     * const library_cards = await prisma.library_cards.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends library_cardsCreateManyArgs>(args?: SelectSubset<T, library_cardsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Library_cards.
     * @param {library_cardsDeleteArgs} args - Arguments to delete one Library_cards.
     * @example
     * // Delete one Library_cards
     * const Library_cards = await prisma.library_cards.delete({
     *   where: {
     *     // ... filter to delete one Library_cards
     *   }
     * })
     * 
     */
    delete<T extends library_cardsDeleteArgs>(args: SelectSubset<T, library_cardsDeleteArgs<ExtArgs>>): Prisma__library_cardsClient<$Result.GetResult<Prisma.$library_cardsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Library_cards.
     * @param {library_cardsUpdateArgs} args - Arguments to update one Library_cards.
     * @example
     * // Update one Library_cards
     * const library_cards = await prisma.library_cards.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends library_cardsUpdateArgs>(args: SelectSubset<T, library_cardsUpdateArgs<ExtArgs>>): Prisma__library_cardsClient<$Result.GetResult<Prisma.$library_cardsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Library_cards.
     * @param {library_cardsDeleteManyArgs} args - Arguments to filter Library_cards to delete.
     * @example
     * // Delete a few Library_cards
     * const { count } = await prisma.library_cards.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends library_cardsDeleteManyArgs>(args?: SelectSubset<T, library_cardsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Library_cards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {library_cardsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Library_cards
     * const library_cards = await prisma.library_cards.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends library_cardsUpdateManyArgs>(args: SelectSubset<T, library_cardsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Library_cards.
     * @param {library_cardsUpsertArgs} args - Arguments to update or create a Library_cards.
     * @example
     * // Update or create a Library_cards
     * const library_cards = await prisma.library_cards.upsert({
     *   create: {
     *     // ... data to create a Library_cards
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Library_cards we want to update
     *   }
     * })
     */
    upsert<T extends library_cardsUpsertArgs>(args: SelectSubset<T, library_cardsUpsertArgs<ExtArgs>>): Prisma__library_cardsClient<$Result.GetResult<Prisma.$library_cardsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Library_cards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {library_cardsCountArgs} args - Arguments to filter Library_cards to count.
     * @example
     * // Count the number of Library_cards
     * const count = await prisma.library_cards.count({
     *   where: {
     *     // ... the filter for the Library_cards we want to count
     *   }
     * })
    **/
    count<T extends library_cardsCountArgs>(
      args?: Subset<T, library_cardsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Library_cardsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Library_cards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Library_cardsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Library_cardsAggregateArgs>(args: Subset<T, Library_cardsAggregateArgs>): Prisma.PrismaPromise<GetLibrary_cardsAggregateType<T>>

    /**
     * Group by Library_cards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {library_cardsGroupByArgs} args - Group by arguments.
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
      T extends library_cardsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: library_cardsGroupByArgs['orderBy'] }
        : { orderBy?: library_cardsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, library_cardsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLibrary_cardsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the library_cards model
   */
  readonly fields: library_cardsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for library_cards.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__library_cardsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends library_cards$usersArgs<ExtArgs> = {}>(args?: Subset<T, library_cards$usersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the library_cards model
   */
  interface library_cardsFieldRefs {
    readonly card_id: FieldRef<"library_cards", 'Int'>
    readonly user_id: FieldRef<"library_cards", 'Int'>
    readonly card_number: FieldRef<"library_cards", 'String'>
    readonly issued_at: FieldRef<"library_cards", 'DateTime'>
    readonly expires_at: FieldRef<"library_cards", 'DateTime'>
    readonly status: FieldRef<"library_cards", 'card_status'>
  }
    

  // Custom InputTypes
  /**
   * library_cards findUnique
   */
  export type library_cardsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the library_cards
     */
    select?: library_cardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the library_cards
     */
    omit?: library_cardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: library_cardsInclude<ExtArgs> | null
    /**
     * Filter, which library_cards to fetch.
     */
    where: library_cardsWhereUniqueInput
  }

  /**
   * library_cards findUniqueOrThrow
   */
  export type library_cardsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the library_cards
     */
    select?: library_cardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the library_cards
     */
    omit?: library_cardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: library_cardsInclude<ExtArgs> | null
    /**
     * Filter, which library_cards to fetch.
     */
    where: library_cardsWhereUniqueInput
  }

  /**
   * library_cards findFirst
   */
  export type library_cardsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the library_cards
     */
    select?: library_cardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the library_cards
     */
    omit?: library_cardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: library_cardsInclude<ExtArgs> | null
    /**
     * Filter, which library_cards to fetch.
     */
    where?: library_cardsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of library_cards to fetch.
     */
    orderBy?: library_cardsOrderByWithRelationInput | library_cardsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for library_cards.
     */
    cursor?: library_cardsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` library_cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` library_cards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of library_cards.
     */
    distinct?: Library_cardsScalarFieldEnum | Library_cardsScalarFieldEnum[]
  }

  /**
   * library_cards findFirstOrThrow
   */
  export type library_cardsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the library_cards
     */
    select?: library_cardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the library_cards
     */
    omit?: library_cardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: library_cardsInclude<ExtArgs> | null
    /**
     * Filter, which library_cards to fetch.
     */
    where?: library_cardsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of library_cards to fetch.
     */
    orderBy?: library_cardsOrderByWithRelationInput | library_cardsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for library_cards.
     */
    cursor?: library_cardsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` library_cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` library_cards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of library_cards.
     */
    distinct?: Library_cardsScalarFieldEnum | Library_cardsScalarFieldEnum[]
  }

  /**
   * library_cards findMany
   */
  export type library_cardsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the library_cards
     */
    select?: library_cardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the library_cards
     */
    omit?: library_cardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: library_cardsInclude<ExtArgs> | null
    /**
     * Filter, which library_cards to fetch.
     */
    where?: library_cardsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of library_cards to fetch.
     */
    orderBy?: library_cardsOrderByWithRelationInput | library_cardsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing library_cards.
     */
    cursor?: library_cardsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` library_cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` library_cards.
     */
    skip?: number
    distinct?: Library_cardsScalarFieldEnum | Library_cardsScalarFieldEnum[]
  }

  /**
   * library_cards create
   */
  export type library_cardsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the library_cards
     */
    select?: library_cardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the library_cards
     */
    omit?: library_cardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: library_cardsInclude<ExtArgs> | null
    /**
     * The data needed to create a library_cards.
     */
    data: XOR<library_cardsCreateInput, library_cardsUncheckedCreateInput>
  }

  /**
   * library_cards createMany
   */
  export type library_cardsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many library_cards.
     */
    data: library_cardsCreateManyInput | library_cardsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * library_cards update
   */
  export type library_cardsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the library_cards
     */
    select?: library_cardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the library_cards
     */
    omit?: library_cardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: library_cardsInclude<ExtArgs> | null
    /**
     * The data needed to update a library_cards.
     */
    data: XOR<library_cardsUpdateInput, library_cardsUncheckedUpdateInput>
    /**
     * Choose, which library_cards to update.
     */
    where: library_cardsWhereUniqueInput
  }

  /**
   * library_cards updateMany
   */
  export type library_cardsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update library_cards.
     */
    data: XOR<library_cardsUpdateManyMutationInput, library_cardsUncheckedUpdateManyInput>
    /**
     * Filter which library_cards to update
     */
    where?: library_cardsWhereInput
    /**
     * Limit how many library_cards to update.
     */
    limit?: number
  }

  /**
   * library_cards upsert
   */
  export type library_cardsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the library_cards
     */
    select?: library_cardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the library_cards
     */
    omit?: library_cardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: library_cardsInclude<ExtArgs> | null
    /**
     * The filter to search for the library_cards to update in case it exists.
     */
    where: library_cardsWhereUniqueInput
    /**
     * In case the library_cards found by the `where` argument doesn't exist, create a new library_cards with this data.
     */
    create: XOR<library_cardsCreateInput, library_cardsUncheckedCreateInput>
    /**
     * In case the library_cards was found with the provided `where` argument, update it with this data.
     */
    update: XOR<library_cardsUpdateInput, library_cardsUncheckedUpdateInput>
  }

  /**
   * library_cards delete
   */
  export type library_cardsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the library_cards
     */
    select?: library_cardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the library_cards
     */
    omit?: library_cardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: library_cardsInclude<ExtArgs> | null
    /**
     * Filter which library_cards to delete.
     */
    where: library_cardsWhereUniqueInput
  }

  /**
   * library_cards deleteMany
   */
  export type library_cardsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which library_cards to delete
     */
    where?: library_cardsWhereInput
    /**
     * Limit how many library_cards to delete.
     */
    limit?: number
  }

  /**
   * library_cards.users
   */
  export type library_cards$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * library_cards without action
   */
  export type library_cardsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the library_cards
     */
    select?: library_cardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the library_cards
     */
    omit?: library_cardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: library_cardsInclude<ExtArgs> | null
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


  export const Item_tranScalarFieldEnum: {
    tran_id: 'tran_id',
    item_id: 'item_id',
    status: 'status',
    user_id: 'user_id',
    record_status: 'record_status'
  };

  export type Item_tranScalarFieldEnum = (typeof Item_tranScalarFieldEnum)[keyof typeof Item_tranScalarFieldEnum]


  export const Item_tran_historyScalarFieldEnum: {
    id: 'id',
    item_id: 'item_id',
    tran_id: 'tran_id',
    status: 'status',
    requested_by: 'requested_by',
    approved_by: 'approved_by',
    requested_at: 'requested_at',
    approved_at: 'approved_at',
    date_issued: 'date_issued',
    date_due: 'date_due',
    date_returned: 'date_returned',
    remarks: 'remarks'
  };

  export type Item_tran_historyScalarFieldEnum = (typeof Item_tran_historyScalarFieldEnum)[keyof typeof Item_tran_historyScalarFieldEnum]


  export const Library_itemsScalarFieldEnum: {
    item_id: 'item_id',
    title: 'title',
    author: 'author',
    isbn: 'isbn',
    year: 'year',
    genre: 'genre',
    image_url: 'image_url',
    description: 'description',
    librarian_id: 'librarian_id',
    item_type: 'item_type',
    location: 'location',
    publisher: 'publisher',
    language: 'language',
    pages: 'pages',
    duration: 'duration',
    format: 'format',
    subject: 'subject',
    keywords: 'keywords',
    created_at: 'created_at',
    updated_at: 'updated_at',
    record_status: 'record_status'
  };

  export type Library_itemsScalarFieldEnum = (typeof Library_itemsScalarFieldEnum)[keyof typeof Library_itemsScalarFieldEnum]


  export const FinesScalarFieldEnum: {
    fine_id: 'fine_id',
    user_id: 'user_id',
    item_tran_historyId: 'item_tran_historyId',
    amount: 'amount',
    reason: 'reason',
    status: 'status',
    created_at: 'created_at',
    paid_at: 'paid_at'
  };

  export type FinesScalarFieldEnum = (typeof FinesScalarFieldEnum)[keyof typeof FinesScalarFieldEnum]


  export const LogsScalarFieldEnum: {
    log_id: 'log_id',
    description: 'description',
    user_id: 'user_id',
    created_at: 'created_at'
  };

  export type LogsScalarFieldEnum = (typeof LogsScalarFieldEnum)[keyof typeof LogsScalarFieldEnum]


  export const NotificationsScalarFieldEnum: {
    notification_id: 'notification_id',
    type: 'type',
    item_id: 'item_id',
    from_user_id: 'from_user_id',
    to_user_id: 'to_user_id',
    tran_id: 'tran_id',
    reservation_id: 'reservation_id',
    status: 'status',
    message: 'message',
    created_at: 'created_at',
    resolved_at: 'resolved_at'
  };

  export type NotificationsScalarFieldEnum = (typeof NotificationsScalarFieldEnum)[keyof typeof NotificationsScalarFieldEnum]


  export const User_wishlistScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    item_id: 'item_id',
    created_at: 'created_at'
  };

  export type User_wishlistScalarFieldEnum = (typeof User_wishlistScalarFieldEnum)[keyof typeof User_wishlistScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    user_id: 'user_id',
    name: 'name',
    email: 'email',
    password_hash: 'password_hash',
    role: 'role',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at',
    gender: 'gender',
    phone_number: 'phone_number',
    birth_date: 'birth_date',
    address: 'address',
    profile_image_url: 'profile_image_url'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const Contact_usScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    subject: 'subject',
    message: 'message',
    created_at: 'created_at'
  };

  export type Contact_usScalarFieldEnum = (typeof Contact_usScalarFieldEnum)[keyof typeof Contact_usScalarFieldEnum]


  export const System_configScalarFieldEnum: {
    config_id: 'config_id',
    config_key: 'config_key',
    config_value: 'config_value',
    description: 'description',
    updated_at: 'updated_at'
  };

  export type System_configScalarFieldEnum = (typeof System_configScalarFieldEnum)[keyof typeof System_configScalarFieldEnum]


  export const Library_cardsScalarFieldEnum: {
    card_id: 'card_id',
    user_id: 'user_id',
    card_number: 'card_number',
    issued_at: 'issued_at',
    expires_at: 'expires_at',
    status: 'status'
  };

  export type Library_cardsScalarFieldEnum = (typeof Library_cardsScalarFieldEnum)[keyof typeof Library_cardsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const item_tran_historyOrderByRelevanceFieldEnum: {
    remarks: 'remarks'
  };

  export type item_tran_historyOrderByRelevanceFieldEnum = (typeof item_tran_historyOrderByRelevanceFieldEnum)[keyof typeof item_tran_historyOrderByRelevanceFieldEnum]


  export const library_itemsOrderByRelevanceFieldEnum: {
    title: 'title',
    author: 'author',
    isbn: 'isbn',
    genre: 'genre',
    image_url: 'image_url',
    description: 'description',
    location: 'location',
    publisher: 'publisher',
    language: 'language',
    format: 'format',
    subject: 'subject',
    keywords: 'keywords'
  };

  export type library_itemsOrderByRelevanceFieldEnum = (typeof library_itemsOrderByRelevanceFieldEnum)[keyof typeof library_itemsOrderByRelevanceFieldEnum]


  export const finesOrderByRelevanceFieldEnum: {
    reason: 'reason'
  };

  export type finesOrderByRelevanceFieldEnum = (typeof finesOrderByRelevanceFieldEnum)[keyof typeof finesOrderByRelevanceFieldEnum]


  export const logsOrderByRelevanceFieldEnum: {
    description: 'description'
  };

  export type logsOrderByRelevanceFieldEnum = (typeof logsOrderByRelevanceFieldEnum)[keyof typeof logsOrderByRelevanceFieldEnum]


  export const notificationsOrderByRelevanceFieldEnum: {
    message: 'message'
  };

  export type notificationsOrderByRelevanceFieldEnum = (typeof notificationsOrderByRelevanceFieldEnum)[keyof typeof notificationsOrderByRelevanceFieldEnum]


  export const usersOrderByRelevanceFieldEnum: {
    name: 'name',
    email: 'email',
    password_hash: 'password_hash',
    phone_number: 'phone_number',
    address: 'address',
    profile_image_url: 'profile_image_url'
  };

  export type usersOrderByRelevanceFieldEnum = (typeof usersOrderByRelevanceFieldEnum)[keyof typeof usersOrderByRelevanceFieldEnum]


  export const contact_usOrderByRelevanceFieldEnum: {
    name: 'name',
    email: 'email',
    subject: 'subject',
    message: 'message'
  };

  export type contact_usOrderByRelevanceFieldEnum = (typeof contact_usOrderByRelevanceFieldEnum)[keyof typeof contact_usOrderByRelevanceFieldEnum]


  export const system_configOrderByRelevanceFieldEnum: {
    config_key: 'config_key',
    config_value: 'config_value',
    description: 'description'
  };

  export type system_configOrderByRelevanceFieldEnum = (typeof system_configOrderByRelevanceFieldEnum)[keyof typeof system_configOrderByRelevanceFieldEnum]


  export const library_cardsOrderByRelevanceFieldEnum: {
    card_number: 'card_number'
  };

  export type library_cardsOrderByRelevanceFieldEnum = (typeof library_cardsOrderByRelevanceFieldEnum)[keyof typeof library_cardsOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'item_tran_status'
   */
  export type Enumitem_tran_statusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'item_tran_status'>
    


  /**
   * Reference to a field of type 'record_status'
   */
  export type Enumrecord_statusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'record_status'>
    


  /**
   * Reference to a field of type 'item_tran_history_status'
   */
  export type Enumitem_tran_history_statusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'item_tran_history_status'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'library_item_type'
   */
  export type Enumlibrary_item_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'library_item_type'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'fines_status'
   */
  export type Enumfines_statusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'fines_status'>
    


  /**
   * Reference to a field of type 'notifications_type'
   */
  export type Enumnotifications_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'notifications_type'>
    


  /**
   * Reference to a field of type 'notifications_status'
   */
  export type Enumnotifications_statusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'notifications_status'>
    


  /**
   * Reference to a field of type 'users_role'
   */
  export type Enumusers_roleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'users_role'>
    


  /**
   * Reference to a field of type 'users_status'
   */
  export type Enumusers_statusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'users_status'>
    


  /**
   * Reference to a field of type 'gender'
   */
  export type EnumgenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'gender'>
    


  /**
   * Reference to a field of type 'card_status'
   */
  export type Enumcard_statusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'card_status'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type item_tranWhereInput = {
    AND?: item_tranWhereInput | item_tranWhereInput[]
    OR?: item_tranWhereInput[]
    NOT?: item_tranWhereInput | item_tranWhereInput[]
    tran_id?: IntFilter<"item_tran"> | number
    item_id?: IntNullableFilter<"item_tran"> | number | null
    status?: Enumitem_tran_statusNullableFilter<"item_tran"> | $Enums.item_tran_status | null
    user_id?: IntNullableFilter<"item_tran"> | number | null
    record_status?: Enumrecord_statusNullableFilter<"item_tran"> | $Enums.record_status | null
    library_items?: XOR<Library_itemsNullableScalarRelationFilter, library_itemsWhereInput> | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    item_tran_history?: Item_tran_historyListRelationFilter
    notifications?: NotificationsListRelationFilter
  }

  export type item_tranOrderByWithRelationInput = {
    tran_id?: SortOrder
    item_id?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    record_status?: SortOrderInput | SortOrder
    library_items?: library_itemsOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
    item_tran_history?: item_tran_historyOrderByRelationAggregateInput
    notifications?: notificationsOrderByRelationAggregateInput
  }

  export type item_tranWhereUniqueInput = Prisma.AtLeast<{
    tran_id?: number
    AND?: item_tranWhereInput | item_tranWhereInput[]
    OR?: item_tranWhereInput[]
    NOT?: item_tranWhereInput | item_tranWhereInput[]
    item_id?: IntNullableFilter<"item_tran"> | number | null
    status?: Enumitem_tran_statusNullableFilter<"item_tran"> | $Enums.item_tran_status | null
    user_id?: IntNullableFilter<"item_tran"> | number | null
    record_status?: Enumrecord_statusNullableFilter<"item_tran"> | $Enums.record_status | null
    library_items?: XOR<Library_itemsNullableScalarRelationFilter, library_itemsWhereInput> | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    item_tran_history?: Item_tran_historyListRelationFilter
    notifications?: NotificationsListRelationFilter
  }, "tran_id">

  export type item_tranOrderByWithAggregationInput = {
    tran_id?: SortOrder
    item_id?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    record_status?: SortOrderInput | SortOrder
    _count?: item_tranCountOrderByAggregateInput
    _avg?: item_tranAvgOrderByAggregateInput
    _max?: item_tranMaxOrderByAggregateInput
    _min?: item_tranMinOrderByAggregateInput
    _sum?: item_tranSumOrderByAggregateInput
  }

  export type item_tranScalarWhereWithAggregatesInput = {
    AND?: item_tranScalarWhereWithAggregatesInput | item_tranScalarWhereWithAggregatesInput[]
    OR?: item_tranScalarWhereWithAggregatesInput[]
    NOT?: item_tranScalarWhereWithAggregatesInput | item_tranScalarWhereWithAggregatesInput[]
    tran_id?: IntWithAggregatesFilter<"item_tran"> | number
    item_id?: IntNullableWithAggregatesFilter<"item_tran"> | number | null
    status?: Enumitem_tran_statusNullableWithAggregatesFilter<"item_tran"> | $Enums.item_tran_status | null
    user_id?: IntNullableWithAggregatesFilter<"item_tran"> | number | null
    record_status?: Enumrecord_statusNullableWithAggregatesFilter<"item_tran"> | $Enums.record_status | null
  }

  export type item_tran_historyWhereInput = {
    AND?: item_tran_historyWhereInput | item_tran_historyWhereInput[]
    OR?: item_tran_historyWhereInput[]
    NOT?: item_tran_historyWhereInput | item_tran_historyWhereInput[]
    id?: IntFilter<"item_tran_history"> | number
    item_id?: IntNullableFilter<"item_tran_history"> | number | null
    tran_id?: IntNullableFilter<"item_tran_history"> | number | null
    status?: Enumitem_tran_history_statusFilter<"item_tran_history"> | $Enums.item_tran_history_status
    requested_by?: IntNullableFilter<"item_tran_history"> | number | null
    approved_by?: IntNullableFilter<"item_tran_history"> | number | null
    requested_at?: DateTimeNullableFilter<"item_tran_history"> | Date | string | null
    approved_at?: DateTimeNullableFilter<"item_tran_history"> | Date | string | null
    date_issued?: DateTimeNullableFilter<"item_tran_history"> | Date | string | null
    date_due?: DateTimeNullableFilter<"item_tran_history"> | Date | string | null
    date_returned?: DateTimeNullableFilter<"item_tran_history"> | Date | string | null
    remarks?: StringNullableFilter<"item_tran_history"> | string | null
    library_items?: XOR<Library_itemsNullableScalarRelationFilter, library_itemsWhereInput> | null
    item_tran?: XOR<Item_tranNullableScalarRelationFilter, item_tranWhereInput> | null
    users_item_tran_history_requested_byTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    users_item_tran_history_approved_byTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    fines?: FinesListRelationFilter
  }

  export type item_tran_historyOrderByWithRelationInput = {
    id?: SortOrder
    item_id?: SortOrderInput | SortOrder
    tran_id?: SortOrderInput | SortOrder
    status?: SortOrder
    requested_by?: SortOrderInput | SortOrder
    approved_by?: SortOrderInput | SortOrder
    requested_at?: SortOrderInput | SortOrder
    approved_at?: SortOrderInput | SortOrder
    date_issued?: SortOrderInput | SortOrder
    date_due?: SortOrderInput | SortOrder
    date_returned?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    library_items?: library_itemsOrderByWithRelationInput
    item_tran?: item_tranOrderByWithRelationInput
    users_item_tran_history_requested_byTousers?: usersOrderByWithRelationInput
    users_item_tran_history_approved_byTousers?: usersOrderByWithRelationInput
    fines?: finesOrderByRelationAggregateInput
    _relevance?: item_tran_historyOrderByRelevanceInput
  }

  export type item_tran_historyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: item_tran_historyWhereInput | item_tran_historyWhereInput[]
    OR?: item_tran_historyWhereInput[]
    NOT?: item_tran_historyWhereInput | item_tran_historyWhereInput[]
    item_id?: IntNullableFilter<"item_tran_history"> | number | null
    tran_id?: IntNullableFilter<"item_tran_history"> | number | null
    status?: Enumitem_tran_history_statusFilter<"item_tran_history"> | $Enums.item_tran_history_status
    requested_by?: IntNullableFilter<"item_tran_history"> | number | null
    approved_by?: IntNullableFilter<"item_tran_history"> | number | null
    requested_at?: DateTimeNullableFilter<"item_tran_history"> | Date | string | null
    approved_at?: DateTimeNullableFilter<"item_tran_history"> | Date | string | null
    date_issued?: DateTimeNullableFilter<"item_tran_history"> | Date | string | null
    date_due?: DateTimeNullableFilter<"item_tran_history"> | Date | string | null
    date_returned?: DateTimeNullableFilter<"item_tran_history"> | Date | string | null
    remarks?: StringNullableFilter<"item_tran_history"> | string | null
    library_items?: XOR<Library_itemsNullableScalarRelationFilter, library_itemsWhereInput> | null
    item_tran?: XOR<Item_tranNullableScalarRelationFilter, item_tranWhereInput> | null
    users_item_tran_history_requested_byTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    users_item_tran_history_approved_byTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    fines?: FinesListRelationFilter
  }, "id">

  export type item_tran_historyOrderByWithAggregationInput = {
    id?: SortOrder
    item_id?: SortOrderInput | SortOrder
    tran_id?: SortOrderInput | SortOrder
    status?: SortOrder
    requested_by?: SortOrderInput | SortOrder
    approved_by?: SortOrderInput | SortOrder
    requested_at?: SortOrderInput | SortOrder
    approved_at?: SortOrderInput | SortOrder
    date_issued?: SortOrderInput | SortOrder
    date_due?: SortOrderInput | SortOrder
    date_returned?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    _count?: item_tran_historyCountOrderByAggregateInput
    _avg?: item_tran_historyAvgOrderByAggregateInput
    _max?: item_tran_historyMaxOrderByAggregateInput
    _min?: item_tran_historyMinOrderByAggregateInput
    _sum?: item_tran_historySumOrderByAggregateInput
  }

  export type item_tran_historyScalarWhereWithAggregatesInput = {
    AND?: item_tran_historyScalarWhereWithAggregatesInput | item_tran_historyScalarWhereWithAggregatesInput[]
    OR?: item_tran_historyScalarWhereWithAggregatesInput[]
    NOT?: item_tran_historyScalarWhereWithAggregatesInput | item_tran_historyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"item_tran_history"> | number
    item_id?: IntNullableWithAggregatesFilter<"item_tran_history"> | number | null
    tran_id?: IntNullableWithAggregatesFilter<"item_tran_history"> | number | null
    status?: Enumitem_tran_history_statusWithAggregatesFilter<"item_tran_history"> | $Enums.item_tran_history_status
    requested_by?: IntNullableWithAggregatesFilter<"item_tran_history"> | number | null
    approved_by?: IntNullableWithAggregatesFilter<"item_tran_history"> | number | null
    requested_at?: DateTimeNullableWithAggregatesFilter<"item_tran_history"> | Date | string | null
    approved_at?: DateTimeNullableWithAggregatesFilter<"item_tran_history"> | Date | string | null
    date_issued?: DateTimeNullableWithAggregatesFilter<"item_tran_history"> | Date | string | null
    date_due?: DateTimeNullableWithAggregatesFilter<"item_tran_history"> | Date | string | null
    date_returned?: DateTimeNullableWithAggregatesFilter<"item_tran_history"> | Date | string | null
    remarks?: StringNullableWithAggregatesFilter<"item_tran_history"> | string | null
  }

  export type library_itemsWhereInput = {
    AND?: library_itemsWhereInput | library_itemsWhereInput[]
    OR?: library_itemsWhereInput[]
    NOT?: library_itemsWhereInput | library_itemsWhereInput[]
    item_id?: IntFilter<"library_items"> | number
    title?: StringNullableFilter<"library_items"> | string | null
    author?: StringFilter<"library_items"> | string
    isbn?: StringNullableFilter<"library_items"> | string | null
    year?: IntNullableFilter<"library_items"> | number | null
    genre?: StringNullableFilter<"library_items"> | string | null
    image_url?: StringNullableFilter<"library_items"> | string | null
    description?: StringNullableFilter<"library_items"> | string | null
    librarian_id?: IntNullableFilter<"library_items"> | number | null
    item_type?: Enumlibrary_item_typeFilter<"library_items"> | $Enums.library_item_type
    location?: StringNullableFilter<"library_items"> | string | null
    publisher?: StringNullableFilter<"library_items"> | string | null
    language?: StringNullableFilter<"library_items"> | string | null
    pages?: IntNullableFilter<"library_items"> | number | null
    duration?: IntNullableFilter<"library_items"> | number | null
    format?: StringNullableFilter<"library_items"> | string | null
    subject?: StringNullableFilter<"library_items"> | string | null
    keywords?: StringNullableFilter<"library_items"> | string | null
    created_at?: DateTimeNullableFilter<"library_items"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"library_items"> | Date | string | null
    record_status?: Enumrecord_statusNullableFilter<"library_items"> | $Enums.record_status | null
    item_tran?: Item_tranListRelationFilter
    item_tran_history?: Item_tran_historyListRelationFilter
    notifications?: NotificationsListRelationFilter
    user_wishlist?: User_wishlistListRelationFilter
  }

  export type library_itemsOrderByWithRelationInput = {
    item_id?: SortOrder
    title?: SortOrderInput | SortOrder
    author?: SortOrder
    isbn?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    genre?: SortOrderInput | SortOrder
    image_url?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    librarian_id?: SortOrderInput | SortOrder
    item_type?: SortOrder
    location?: SortOrderInput | SortOrder
    publisher?: SortOrderInput | SortOrder
    language?: SortOrderInput | SortOrder
    pages?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    format?: SortOrderInput | SortOrder
    subject?: SortOrderInput | SortOrder
    keywords?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    record_status?: SortOrderInput | SortOrder
    item_tran?: item_tranOrderByRelationAggregateInput
    item_tran_history?: item_tran_historyOrderByRelationAggregateInput
    notifications?: notificationsOrderByRelationAggregateInput
    user_wishlist?: user_wishlistOrderByRelationAggregateInput
    _relevance?: library_itemsOrderByRelevanceInput
  }

  export type library_itemsWhereUniqueInput = Prisma.AtLeast<{
    item_id?: number
    AND?: library_itemsWhereInput | library_itemsWhereInput[]
    OR?: library_itemsWhereInput[]
    NOT?: library_itemsWhereInput | library_itemsWhereInput[]
    title?: StringNullableFilter<"library_items"> | string | null
    author?: StringFilter<"library_items"> | string
    isbn?: StringNullableFilter<"library_items"> | string | null
    year?: IntNullableFilter<"library_items"> | number | null
    genre?: StringNullableFilter<"library_items"> | string | null
    image_url?: StringNullableFilter<"library_items"> | string | null
    description?: StringNullableFilter<"library_items"> | string | null
    librarian_id?: IntNullableFilter<"library_items"> | number | null
    item_type?: Enumlibrary_item_typeFilter<"library_items"> | $Enums.library_item_type
    location?: StringNullableFilter<"library_items"> | string | null
    publisher?: StringNullableFilter<"library_items"> | string | null
    language?: StringNullableFilter<"library_items"> | string | null
    pages?: IntNullableFilter<"library_items"> | number | null
    duration?: IntNullableFilter<"library_items"> | number | null
    format?: StringNullableFilter<"library_items"> | string | null
    subject?: StringNullableFilter<"library_items"> | string | null
    keywords?: StringNullableFilter<"library_items"> | string | null
    created_at?: DateTimeNullableFilter<"library_items"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"library_items"> | Date | string | null
    record_status?: Enumrecord_statusNullableFilter<"library_items"> | $Enums.record_status | null
    item_tran?: Item_tranListRelationFilter
    item_tran_history?: Item_tran_historyListRelationFilter
    notifications?: NotificationsListRelationFilter
    user_wishlist?: User_wishlistListRelationFilter
  }, "item_id">

  export type library_itemsOrderByWithAggregationInput = {
    item_id?: SortOrder
    title?: SortOrderInput | SortOrder
    author?: SortOrder
    isbn?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    genre?: SortOrderInput | SortOrder
    image_url?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    librarian_id?: SortOrderInput | SortOrder
    item_type?: SortOrder
    location?: SortOrderInput | SortOrder
    publisher?: SortOrderInput | SortOrder
    language?: SortOrderInput | SortOrder
    pages?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    format?: SortOrderInput | SortOrder
    subject?: SortOrderInput | SortOrder
    keywords?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    record_status?: SortOrderInput | SortOrder
    _count?: library_itemsCountOrderByAggregateInput
    _avg?: library_itemsAvgOrderByAggregateInput
    _max?: library_itemsMaxOrderByAggregateInput
    _min?: library_itemsMinOrderByAggregateInput
    _sum?: library_itemsSumOrderByAggregateInput
  }

  export type library_itemsScalarWhereWithAggregatesInput = {
    AND?: library_itemsScalarWhereWithAggregatesInput | library_itemsScalarWhereWithAggregatesInput[]
    OR?: library_itemsScalarWhereWithAggregatesInput[]
    NOT?: library_itemsScalarWhereWithAggregatesInput | library_itemsScalarWhereWithAggregatesInput[]
    item_id?: IntWithAggregatesFilter<"library_items"> | number
    title?: StringNullableWithAggregatesFilter<"library_items"> | string | null
    author?: StringWithAggregatesFilter<"library_items"> | string
    isbn?: StringNullableWithAggregatesFilter<"library_items"> | string | null
    year?: IntNullableWithAggregatesFilter<"library_items"> | number | null
    genre?: StringNullableWithAggregatesFilter<"library_items"> | string | null
    image_url?: StringNullableWithAggregatesFilter<"library_items"> | string | null
    description?: StringNullableWithAggregatesFilter<"library_items"> | string | null
    librarian_id?: IntNullableWithAggregatesFilter<"library_items"> | number | null
    item_type?: Enumlibrary_item_typeWithAggregatesFilter<"library_items"> | $Enums.library_item_type
    location?: StringNullableWithAggregatesFilter<"library_items"> | string | null
    publisher?: StringNullableWithAggregatesFilter<"library_items"> | string | null
    language?: StringNullableWithAggregatesFilter<"library_items"> | string | null
    pages?: IntNullableWithAggregatesFilter<"library_items"> | number | null
    duration?: IntNullableWithAggregatesFilter<"library_items"> | number | null
    format?: StringNullableWithAggregatesFilter<"library_items"> | string | null
    subject?: StringNullableWithAggregatesFilter<"library_items"> | string | null
    keywords?: StringNullableWithAggregatesFilter<"library_items"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"library_items"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"library_items"> | Date | string | null
    record_status?: Enumrecord_statusNullableWithAggregatesFilter<"library_items"> | $Enums.record_status | null
  }

  export type finesWhereInput = {
    AND?: finesWhereInput | finesWhereInput[]
    OR?: finesWhereInput[]
    NOT?: finesWhereInput | finesWhereInput[]
    fine_id?: IntFilter<"fines"> | number
    user_id?: IntNullableFilter<"fines"> | number | null
    item_tran_historyId?: IntNullableFilter<"fines"> | number | null
    amount?: DecimalNullableFilter<"fines"> | Decimal | DecimalJsLike | number | string | null
    reason?: StringNullableFilter<"fines"> | string | null
    status?: Enumfines_statusNullableFilter<"fines"> | $Enums.fines_status | null
    created_at?: DateTimeNullableFilter<"fines"> | Date | string | null
    paid_at?: DateTimeNullableFilter<"fines"> | Date | string | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    item_tran_history?: XOR<Item_tran_historyNullableScalarRelationFilter, item_tran_historyWhereInput> | null
  }

  export type finesOrderByWithRelationInput = {
    fine_id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    item_tran_historyId?: SortOrderInput | SortOrder
    amount?: SortOrderInput | SortOrder
    reason?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    paid_at?: SortOrderInput | SortOrder
    users?: usersOrderByWithRelationInput
    item_tran_history?: item_tran_historyOrderByWithRelationInput
    _relevance?: finesOrderByRelevanceInput
  }

  export type finesWhereUniqueInput = Prisma.AtLeast<{
    fine_id?: number
    AND?: finesWhereInput | finesWhereInput[]
    OR?: finesWhereInput[]
    NOT?: finesWhereInput | finesWhereInput[]
    user_id?: IntNullableFilter<"fines"> | number | null
    item_tran_historyId?: IntNullableFilter<"fines"> | number | null
    amount?: DecimalNullableFilter<"fines"> | Decimal | DecimalJsLike | number | string | null
    reason?: StringNullableFilter<"fines"> | string | null
    status?: Enumfines_statusNullableFilter<"fines"> | $Enums.fines_status | null
    created_at?: DateTimeNullableFilter<"fines"> | Date | string | null
    paid_at?: DateTimeNullableFilter<"fines"> | Date | string | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    item_tran_history?: XOR<Item_tran_historyNullableScalarRelationFilter, item_tran_historyWhereInput> | null
  }, "fine_id">

  export type finesOrderByWithAggregationInput = {
    fine_id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    item_tran_historyId?: SortOrderInput | SortOrder
    amount?: SortOrderInput | SortOrder
    reason?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    paid_at?: SortOrderInput | SortOrder
    _count?: finesCountOrderByAggregateInput
    _avg?: finesAvgOrderByAggregateInput
    _max?: finesMaxOrderByAggregateInput
    _min?: finesMinOrderByAggregateInput
    _sum?: finesSumOrderByAggregateInput
  }

  export type finesScalarWhereWithAggregatesInput = {
    AND?: finesScalarWhereWithAggregatesInput | finesScalarWhereWithAggregatesInput[]
    OR?: finesScalarWhereWithAggregatesInput[]
    NOT?: finesScalarWhereWithAggregatesInput | finesScalarWhereWithAggregatesInput[]
    fine_id?: IntWithAggregatesFilter<"fines"> | number
    user_id?: IntNullableWithAggregatesFilter<"fines"> | number | null
    item_tran_historyId?: IntNullableWithAggregatesFilter<"fines"> | number | null
    amount?: DecimalNullableWithAggregatesFilter<"fines"> | Decimal | DecimalJsLike | number | string | null
    reason?: StringNullableWithAggregatesFilter<"fines"> | string | null
    status?: Enumfines_statusNullableWithAggregatesFilter<"fines"> | $Enums.fines_status | null
    created_at?: DateTimeNullableWithAggregatesFilter<"fines"> | Date | string | null
    paid_at?: DateTimeNullableWithAggregatesFilter<"fines"> | Date | string | null
  }

  export type logsWhereInput = {
    AND?: logsWhereInput | logsWhereInput[]
    OR?: logsWhereInput[]
    NOT?: logsWhereInput | logsWhereInput[]
    log_id?: IntFilter<"logs"> | number
    description?: StringFilter<"logs"> | string
    user_id?: IntFilter<"logs"> | number
    created_at?: DateTimeNullableFilter<"logs"> | Date | string | null
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type logsOrderByWithRelationInput = {
    log_id?: SortOrder
    description?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrderInput | SortOrder
    users?: usersOrderByWithRelationInput
    _relevance?: logsOrderByRelevanceInput
  }

  export type logsWhereUniqueInput = Prisma.AtLeast<{
    log_id?: number
    AND?: logsWhereInput | logsWhereInput[]
    OR?: logsWhereInput[]
    NOT?: logsWhereInput | logsWhereInput[]
    description?: StringFilter<"logs"> | string
    user_id?: IntFilter<"logs"> | number
    created_at?: DateTimeNullableFilter<"logs"> | Date | string | null
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "log_id">

  export type logsOrderByWithAggregationInput = {
    log_id?: SortOrder
    description?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: logsCountOrderByAggregateInput
    _avg?: logsAvgOrderByAggregateInput
    _max?: logsMaxOrderByAggregateInput
    _min?: logsMinOrderByAggregateInput
    _sum?: logsSumOrderByAggregateInput
  }

  export type logsScalarWhereWithAggregatesInput = {
    AND?: logsScalarWhereWithAggregatesInput | logsScalarWhereWithAggregatesInput[]
    OR?: logsScalarWhereWithAggregatesInput[]
    NOT?: logsScalarWhereWithAggregatesInput | logsScalarWhereWithAggregatesInput[]
    log_id?: IntWithAggregatesFilter<"logs"> | number
    description?: StringWithAggregatesFilter<"logs"> | string
    user_id?: IntWithAggregatesFilter<"logs"> | number
    created_at?: DateTimeNullableWithAggregatesFilter<"logs"> | Date | string | null
  }

  export type notificationsWhereInput = {
    AND?: notificationsWhereInput | notificationsWhereInput[]
    OR?: notificationsWhereInput[]
    NOT?: notificationsWhereInput | notificationsWhereInput[]
    notification_id?: IntFilter<"notifications"> | number
    type?: Enumnotifications_typeNullableFilter<"notifications"> | $Enums.notifications_type | null
    item_id?: IntNullableFilter<"notifications"> | number | null
    from_user_id?: IntNullableFilter<"notifications"> | number | null
    to_user_id?: IntNullableFilter<"notifications"> | number | null
    tran_id?: IntNullableFilter<"notifications"> | number | null
    reservation_id?: IntNullableFilter<"notifications"> | number | null
    status?: Enumnotifications_statusNullableFilter<"notifications"> | $Enums.notifications_status | null
    message?: StringNullableFilter<"notifications"> | string | null
    created_at?: DateTimeNullableFilter<"notifications"> | Date | string | null
    resolved_at?: DateTimeNullableFilter<"notifications"> | Date | string | null
    library_items?: XOR<Library_itemsNullableScalarRelationFilter, library_itemsWhereInput> | null
    users_notifications_from_user_idTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    users_notifications_to_user_idTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    item_tran?: XOR<Item_tranNullableScalarRelationFilter, item_tranWhereInput> | null
  }

  export type notificationsOrderByWithRelationInput = {
    notification_id?: SortOrder
    type?: SortOrderInput | SortOrder
    item_id?: SortOrderInput | SortOrder
    from_user_id?: SortOrderInput | SortOrder
    to_user_id?: SortOrderInput | SortOrder
    tran_id?: SortOrderInput | SortOrder
    reservation_id?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    message?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    resolved_at?: SortOrderInput | SortOrder
    library_items?: library_itemsOrderByWithRelationInput
    users_notifications_from_user_idTousers?: usersOrderByWithRelationInput
    users_notifications_to_user_idTousers?: usersOrderByWithRelationInput
    item_tran?: item_tranOrderByWithRelationInput
    _relevance?: notificationsOrderByRelevanceInput
  }

  export type notificationsWhereUniqueInput = Prisma.AtLeast<{
    notification_id?: number
    AND?: notificationsWhereInput | notificationsWhereInput[]
    OR?: notificationsWhereInput[]
    NOT?: notificationsWhereInput | notificationsWhereInput[]
    type?: Enumnotifications_typeNullableFilter<"notifications"> | $Enums.notifications_type | null
    item_id?: IntNullableFilter<"notifications"> | number | null
    from_user_id?: IntNullableFilter<"notifications"> | number | null
    to_user_id?: IntNullableFilter<"notifications"> | number | null
    tran_id?: IntNullableFilter<"notifications"> | number | null
    reservation_id?: IntNullableFilter<"notifications"> | number | null
    status?: Enumnotifications_statusNullableFilter<"notifications"> | $Enums.notifications_status | null
    message?: StringNullableFilter<"notifications"> | string | null
    created_at?: DateTimeNullableFilter<"notifications"> | Date | string | null
    resolved_at?: DateTimeNullableFilter<"notifications"> | Date | string | null
    library_items?: XOR<Library_itemsNullableScalarRelationFilter, library_itemsWhereInput> | null
    users_notifications_from_user_idTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    users_notifications_to_user_idTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    item_tran?: XOR<Item_tranNullableScalarRelationFilter, item_tranWhereInput> | null
  }, "notification_id">

  export type notificationsOrderByWithAggregationInput = {
    notification_id?: SortOrder
    type?: SortOrderInput | SortOrder
    item_id?: SortOrderInput | SortOrder
    from_user_id?: SortOrderInput | SortOrder
    to_user_id?: SortOrderInput | SortOrder
    tran_id?: SortOrderInput | SortOrder
    reservation_id?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    message?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    resolved_at?: SortOrderInput | SortOrder
    _count?: notificationsCountOrderByAggregateInput
    _avg?: notificationsAvgOrderByAggregateInput
    _max?: notificationsMaxOrderByAggregateInput
    _min?: notificationsMinOrderByAggregateInput
    _sum?: notificationsSumOrderByAggregateInput
  }

  export type notificationsScalarWhereWithAggregatesInput = {
    AND?: notificationsScalarWhereWithAggregatesInput | notificationsScalarWhereWithAggregatesInput[]
    OR?: notificationsScalarWhereWithAggregatesInput[]
    NOT?: notificationsScalarWhereWithAggregatesInput | notificationsScalarWhereWithAggregatesInput[]
    notification_id?: IntWithAggregatesFilter<"notifications"> | number
    type?: Enumnotifications_typeNullableWithAggregatesFilter<"notifications"> | $Enums.notifications_type | null
    item_id?: IntNullableWithAggregatesFilter<"notifications"> | number | null
    from_user_id?: IntNullableWithAggregatesFilter<"notifications"> | number | null
    to_user_id?: IntNullableWithAggregatesFilter<"notifications"> | number | null
    tran_id?: IntNullableWithAggregatesFilter<"notifications"> | number | null
    reservation_id?: IntNullableWithAggregatesFilter<"notifications"> | number | null
    status?: Enumnotifications_statusNullableWithAggregatesFilter<"notifications"> | $Enums.notifications_status | null
    message?: StringNullableWithAggregatesFilter<"notifications"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"notifications"> | Date | string | null
    resolved_at?: DateTimeNullableWithAggregatesFilter<"notifications"> | Date | string | null
  }

  export type user_wishlistWhereInput = {
    AND?: user_wishlistWhereInput | user_wishlistWhereInput[]
    OR?: user_wishlistWhereInput[]
    NOT?: user_wishlistWhereInput | user_wishlistWhereInput[]
    id?: IntFilter<"user_wishlist"> | number
    user_id?: IntNullableFilter<"user_wishlist"> | number | null
    item_id?: IntNullableFilter<"user_wishlist"> | number | null
    created_at?: DateTimeNullableFilter<"user_wishlist"> | Date | string | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    library_items?: XOR<Library_itemsNullableScalarRelationFilter, library_itemsWhereInput> | null
  }

  export type user_wishlistOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    item_id?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    users?: usersOrderByWithRelationInput
    library_items?: library_itemsOrderByWithRelationInput
  }

  export type user_wishlistWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: user_wishlistWhereInput | user_wishlistWhereInput[]
    OR?: user_wishlistWhereInput[]
    NOT?: user_wishlistWhereInput | user_wishlistWhereInput[]
    user_id?: IntNullableFilter<"user_wishlist"> | number | null
    item_id?: IntNullableFilter<"user_wishlist"> | number | null
    created_at?: DateTimeNullableFilter<"user_wishlist"> | Date | string | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    library_items?: XOR<Library_itemsNullableScalarRelationFilter, library_itemsWhereInput> | null
  }, "id">

  export type user_wishlistOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    item_id?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: user_wishlistCountOrderByAggregateInput
    _avg?: user_wishlistAvgOrderByAggregateInput
    _max?: user_wishlistMaxOrderByAggregateInput
    _min?: user_wishlistMinOrderByAggregateInput
    _sum?: user_wishlistSumOrderByAggregateInput
  }

  export type user_wishlistScalarWhereWithAggregatesInput = {
    AND?: user_wishlistScalarWhereWithAggregatesInput | user_wishlistScalarWhereWithAggregatesInput[]
    OR?: user_wishlistScalarWhereWithAggregatesInput[]
    NOT?: user_wishlistScalarWhereWithAggregatesInput | user_wishlistScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"user_wishlist"> | number
    user_id?: IntNullableWithAggregatesFilter<"user_wishlist"> | number | null
    item_id?: IntNullableWithAggregatesFilter<"user_wishlist"> | number | null
    created_at?: DateTimeNullableWithAggregatesFilter<"user_wishlist"> | Date | string | null
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    user_id?: IntFilter<"users"> | number
    name?: StringNullableFilter<"users"> | string | null
    email?: StringNullableFilter<"users"> | string | null
    password_hash?: StringNullableFilter<"users"> | string | null
    role?: Enumusers_roleNullableFilter<"users"> | $Enums.users_role | null
    status?: Enumusers_statusNullableFilter<"users"> | $Enums.users_status | null
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"users"> | Date | string | null
    gender?: EnumgenderNullableFilter<"users"> | $Enums.gender | null
    phone_number?: StringNullableFilter<"users"> | string | null
    birth_date?: DateTimeNullableFilter<"users"> | Date | string | null
    address?: StringNullableFilter<"users"> | string | null
    profile_image_url?: StringNullableFilter<"users"> | string | null
    item_tran?: Item_tranListRelationFilter
    item_tran_history_item_tran_history_requested_byTousers?: Item_tran_historyListRelationFilter
    item_tran_history_item_tran_history_approved_byTousers?: Item_tran_historyListRelationFilter
    fines?: FinesListRelationFilter
    logs?: LogsListRelationFilter
    notifications_notifications_from_user_idTousers?: NotificationsListRelationFilter
    notifications_notifications_to_user_idTousers?: NotificationsListRelationFilter
    user_wishlist?: User_wishlistListRelationFilter
    library_cards?: Library_cardsListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    user_id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    password_hash?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    phone_number?: SortOrderInput | SortOrder
    birth_date?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    profile_image_url?: SortOrderInput | SortOrder
    item_tran?: item_tranOrderByRelationAggregateInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyOrderByRelationAggregateInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyOrderByRelationAggregateInput
    fines?: finesOrderByRelationAggregateInput
    logs?: logsOrderByRelationAggregateInput
    notifications_notifications_from_user_idTousers?: notificationsOrderByRelationAggregateInput
    notifications_notifications_to_user_idTousers?: notificationsOrderByRelationAggregateInput
    user_wishlist?: user_wishlistOrderByRelationAggregateInput
    library_cards?: library_cardsOrderByRelationAggregateInput
    _relevance?: usersOrderByRelevanceInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    user_id?: number
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    name?: StringNullableFilter<"users"> | string | null
    password_hash?: StringNullableFilter<"users"> | string | null
    role?: Enumusers_roleNullableFilter<"users"> | $Enums.users_role | null
    status?: Enumusers_statusNullableFilter<"users"> | $Enums.users_status | null
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"users"> | Date | string | null
    gender?: EnumgenderNullableFilter<"users"> | $Enums.gender | null
    phone_number?: StringNullableFilter<"users"> | string | null
    birth_date?: DateTimeNullableFilter<"users"> | Date | string | null
    address?: StringNullableFilter<"users"> | string | null
    profile_image_url?: StringNullableFilter<"users"> | string | null
    item_tran?: Item_tranListRelationFilter
    item_tran_history_item_tran_history_requested_byTousers?: Item_tran_historyListRelationFilter
    item_tran_history_item_tran_history_approved_byTousers?: Item_tran_historyListRelationFilter
    fines?: FinesListRelationFilter
    logs?: LogsListRelationFilter
    notifications_notifications_from_user_idTousers?: NotificationsListRelationFilter
    notifications_notifications_to_user_idTousers?: NotificationsListRelationFilter
    user_wishlist?: User_wishlistListRelationFilter
    library_cards?: Library_cardsListRelationFilter
  }, "user_id" | "email">

  export type usersOrderByWithAggregationInput = {
    user_id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    password_hash?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    phone_number?: SortOrderInput | SortOrder
    birth_date?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    profile_image_url?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    user_id?: IntWithAggregatesFilter<"users"> | number
    name?: StringNullableWithAggregatesFilter<"users"> | string | null
    email?: StringNullableWithAggregatesFilter<"users"> | string | null
    password_hash?: StringNullableWithAggregatesFilter<"users"> | string | null
    role?: Enumusers_roleNullableWithAggregatesFilter<"users"> | $Enums.users_role | null
    status?: Enumusers_statusNullableWithAggregatesFilter<"users"> | $Enums.users_status | null
    created_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    gender?: EnumgenderNullableWithAggregatesFilter<"users"> | $Enums.gender | null
    phone_number?: StringNullableWithAggregatesFilter<"users"> | string | null
    birth_date?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    address?: StringNullableWithAggregatesFilter<"users"> | string | null
    profile_image_url?: StringNullableWithAggregatesFilter<"users"> | string | null
  }

  export type contact_usWhereInput = {
    AND?: contact_usWhereInput | contact_usWhereInput[]
    OR?: contact_usWhereInput[]
    NOT?: contact_usWhereInput | contact_usWhereInput[]
    id?: IntFilter<"contact_us"> | number
    name?: StringNullableFilter<"contact_us"> | string | null
    email?: StringNullableFilter<"contact_us"> | string | null
    subject?: StringNullableFilter<"contact_us"> | string | null
    message?: StringNullableFilter<"contact_us"> | string | null
    created_at?: DateTimeNullableFilter<"contact_us"> | Date | string | null
  }

  export type contact_usOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    subject?: SortOrderInput | SortOrder
    message?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _relevance?: contact_usOrderByRelevanceInput
  }

  export type contact_usWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: contact_usWhereInput | contact_usWhereInput[]
    OR?: contact_usWhereInput[]
    NOT?: contact_usWhereInput | contact_usWhereInput[]
    name?: StringNullableFilter<"contact_us"> | string | null
    email?: StringNullableFilter<"contact_us"> | string | null
    subject?: StringNullableFilter<"contact_us"> | string | null
    message?: StringNullableFilter<"contact_us"> | string | null
    created_at?: DateTimeNullableFilter<"contact_us"> | Date | string | null
  }, "id">

  export type contact_usOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    subject?: SortOrderInput | SortOrder
    message?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: contact_usCountOrderByAggregateInput
    _avg?: contact_usAvgOrderByAggregateInput
    _max?: contact_usMaxOrderByAggregateInput
    _min?: contact_usMinOrderByAggregateInput
    _sum?: contact_usSumOrderByAggregateInput
  }

  export type contact_usScalarWhereWithAggregatesInput = {
    AND?: contact_usScalarWhereWithAggregatesInput | contact_usScalarWhereWithAggregatesInput[]
    OR?: contact_usScalarWhereWithAggregatesInput[]
    NOT?: contact_usScalarWhereWithAggregatesInput | contact_usScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"contact_us"> | number
    name?: StringNullableWithAggregatesFilter<"contact_us"> | string | null
    email?: StringNullableWithAggregatesFilter<"contact_us"> | string | null
    subject?: StringNullableWithAggregatesFilter<"contact_us"> | string | null
    message?: StringNullableWithAggregatesFilter<"contact_us"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"contact_us"> | Date | string | null
  }

  export type system_configWhereInput = {
    AND?: system_configWhereInput | system_configWhereInput[]
    OR?: system_configWhereInput[]
    NOT?: system_configWhereInput | system_configWhereInput[]
    config_id?: IntFilter<"system_config"> | number
    config_key?: StringFilter<"system_config"> | string
    config_value?: StringFilter<"system_config"> | string
    description?: StringNullableFilter<"system_config"> | string | null
    updated_at?: DateTimeFilter<"system_config"> | Date | string
  }

  export type system_configOrderByWithRelationInput = {
    config_id?: SortOrder
    config_key?: SortOrder
    config_value?: SortOrder
    description?: SortOrderInput | SortOrder
    updated_at?: SortOrder
    _relevance?: system_configOrderByRelevanceInput
  }

  export type system_configWhereUniqueInput = Prisma.AtLeast<{
    config_id?: number
    config_key?: string
    AND?: system_configWhereInput | system_configWhereInput[]
    OR?: system_configWhereInput[]
    NOT?: system_configWhereInput | system_configWhereInput[]
    config_value?: StringFilter<"system_config"> | string
    description?: StringNullableFilter<"system_config"> | string | null
    updated_at?: DateTimeFilter<"system_config"> | Date | string
  }, "config_id" | "config_key">

  export type system_configOrderByWithAggregationInput = {
    config_id?: SortOrder
    config_key?: SortOrder
    config_value?: SortOrder
    description?: SortOrderInput | SortOrder
    updated_at?: SortOrder
    _count?: system_configCountOrderByAggregateInput
    _avg?: system_configAvgOrderByAggregateInput
    _max?: system_configMaxOrderByAggregateInput
    _min?: system_configMinOrderByAggregateInput
    _sum?: system_configSumOrderByAggregateInput
  }

  export type system_configScalarWhereWithAggregatesInput = {
    AND?: system_configScalarWhereWithAggregatesInput | system_configScalarWhereWithAggregatesInput[]
    OR?: system_configScalarWhereWithAggregatesInput[]
    NOT?: system_configScalarWhereWithAggregatesInput | system_configScalarWhereWithAggregatesInput[]
    config_id?: IntWithAggregatesFilter<"system_config"> | number
    config_key?: StringWithAggregatesFilter<"system_config"> | string
    config_value?: StringWithAggregatesFilter<"system_config"> | string
    description?: StringNullableWithAggregatesFilter<"system_config"> | string | null
    updated_at?: DateTimeWithAggregatesFilter<"system_config"> | Date | string
  }

  export type library_cardsWhereInput = {
    AND?: library_cardsWhereInput | library_cardsWhereInput[]
    OR?: library_cardsWhereInput[]
    NOT?: library_cardsWhereInput | library_cardsWhereInput[]
    card_id?: IntFilter<"library_cards"> | number
    user_id?: IntNullableFilter<"library_cards"> | number | null
    card_number?: StringFilter<"library_cards"> | string
    issued_at?: DateTimeFilter<"library_cards"> | Date | string
    expires_at?: DateTimeNullableFilter<"library_cards"> | Date | string | null
    status?: Enumcard_statusFilter<"library_cards"> | $Enums.card_status
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }

  export type library_cardsOrderByWithRelationInput = {
    card_id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    card_number?: SortOrder
    issued_at?: SortOrder
    expires_at?: SortOrderInput | SortOrder
    status?: SortOrder
    users?: usersOrderByWithRelationInput
    _relevance?: library_cardsOrderByRelevanceInput
  }

  export type library_cardsWhereUniqueInput = Prisma.AtLeast<{
    card_id?: number
    card_number?: string
    AND?: library_cardsWhereInput | library_cardsWhereInput[]
    OR?: library_cardsWhereInput[]
    NOT?: library_cardsWhereInput | library_cardsWhereInput[]
    user_id?: IntNullableFilter<"library_cards"> | number | null
    issued_at?: DateTimeFilter<"library_cards"> | Date | string
    expires_at?: DateTimeNullableFilter<"library_cards"> | Date | string | null
    status?: Enumcard_statusFilter<"library_cards"> | $Enums.card_status
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }, "card_id" | "card_number">

  export type library_cardsOrderByWithAggregationInput = {
    card_id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    card_number?: SortOrder
    issued_at?: SortOrder
    expires_at?: SortOrderInput | SortOrder
    status?: SortOrder
    _count?: library_cardsCountOrderByAggregateInput
    _avg?: library_cardsAvgOrderByAggregateInput
    _max?: library_cardsMaxOrderByAggregateInput
    _min?: library_cardsMinOrderByAggregateInput
    _sum?: library_cardsSumOrderByAggregateInput
  }

  export type library_cardsScalarWhereWithAggregatesInput = {
    AND?: library_cardsScalarWhereWithAggregatesInput | library_cardsScalarWhereWithAggregatesInput[]
    OR?: library_cardsScalarWhereWithAggregatesInput[]
    NOT?: library_cardsScalarWhereWithAggregatesInput | library_cardsScalarWhereWithAggregatesInput[]
    card_id?: IntWithAggregatesFilter<"library_cards"> | number
    user_id?: IntNullableWithAggregatesFilter<"library_cards"> | number | null
    card_number?: StringWithAggregatesFilter<"library_cards"> | string
    issued_at?: DateTimeWithAggregatesFilter<"library_cards"> | Date | string
    expires_at?: DateTimeNullableWithAggregatesFilter<"library_cards"> | Date | string | null
    status?: Enumcard_statusWithAggregatesFilter<"library_cards"> | $Enums.card_status
  }

  export type item_tranCreateInput = {
    status?: $Enums.item_tran_status | null
    record_status?: $Enums.record_status | null
    library_items?: library_itemsCreateNestedOneWithoutItem_tranInput
    users?: usersCreateNestedOneWithoutItem_tranInput
    item_tran_history?: item_tran_historyCreateNestedManyWithoutItem_tranInput
    notifications?: notificationsCreateNestedManyWithoutItem_tranInput
  }

  export type item_tranUncheckedCreateInput = {
    tran_id?: number
    item_id?: number | null
    status?: $Enums.item_tran_status | null
    user_id?: number | null
    record_status?: $Enums.record_status | null
    item_tran_history?: item_tran_historyUncheckedCreateNestedManyWithoutItem_tranInput
    notifications?: notificationsUncheckedCreateNestedManyWithoutItem_tranInput
  }

  export type item_tranUpdateInput = {
    status?: NullableEnumitem_tran_statusFieldUpdateOperationsInput | $Enums.item_tran_status | null
    record_status?: NullableEnumrecord_statusFieldUpdateOperationsInput | $Enums.record_status | null
    library_items?: library_itemsUpdateOneWithoutItem_tranNestedInput
    users?: usersUpdateOneWithoutItem_tranNestedInput
    item_tran_history?: item_tran_historyUpdateManyWithoutItem_tranNestedInput
    notifications?: notificationsUpdateManyWithoutItem_tranNestedInput
  }

  export type item_tranUncheckedUpdateInput = {
    tran_id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumitem_tran_statusFieldUpdateOperationsInput | $Enums.item_tran_status | null
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    record_status?: NullableEnumrecord_statusFieldUpdateOperationsInput | $Enums.record_status | null
    item_tran_history?: item_tran_historyUncheckedUpdateManyWithoutItem_tranNestedInput
    notifications?: notificationsUncheckedUpdateManyWithoutItem_tranNestedInput
  }

  export type item_tranCreateManyInput = {
    tran_id?: number
    item_id?: number | null
    status?: $Enums.item_tran_status | null
    user_id?: number | null
    record_status?: $Enums.record_status | null
  }

  export type item_tranUpdateManyMutationInput = {
    status?: NullableEnumitem_tran_statusFieldUpdateOperationsInput | $Enums.item_tran_status | null
    record_status?: NullableEnumrecord_statusFieldUpdateOperationsInput | $Enums.record_status | null
  }

  export type item_tranUncheckedUpdateManyInput = {
    tran_id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumitem_tran_statusFieldUpdateOperationsInput | $Enums.item_tran_status | null
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    record_status?: NullableEnumrecord_statusFieldUpdateOperationsInput | $Enums.record_status | null
  }

  export type item_tran_historyCreateInput = {
    status?: $Enums.item_tran_history_status
    requested_at?: Date | string | null
    approved_at?: Date | string | null
    date_issued?: Date | string | null
    date_due?: Date | string | null
    date_returned?: Date | string | null
    remarks?: string | null
    library_items?: library_itemsCreateNestedOneWithoutItem_tran_historyInput
    item_tran?: item_tranCreateNestedOneWithoutItem_tran_historyInput
    users_item_tran_history_requested_byTousers?: usersCreateNestedOneWithoutItem_tran_history_item_tran_history_requested_byTousersInput
    users_item_tran_history_approved_byTousers?: usersCreateNestedOneWithoutItem_tran_history_item_tran_history_approved_byTousersInput
    fines?: finesCreateNestedManyWithoutItem_tran_historyInput
  }

  export type item_tran_historyUncheckedCreateInput = {
    id?: number
    item_id?: number | null
    tran_id?: number | null
    status?: $Enums.item_tran_history_status
    requested_by?: number | null
    approved_by?: number | null
    requested_at?: Date | string | null
    approved_at?: Date | string | null
    date_issued?: Date | string | null
    date_due?: Date | string | null
    date_returned?: Date | string | null
    remarks?: string | null
    fines?: finesUncheckedCreateNestedManyWithoutItem_tran_historyInput
  }

  export type item_tran_historyUpdateInput = {
    status?: Enumitem_tran_history_statusFieldUpdateOperationsInput | $Enums.item_tran_history_status
    requested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_issued?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_due?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_returned?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    library_items?: library_itemsUpdateOneWithoutItem_tran_historyNestedInput
    item_tran?: item_tranUpdateOneWithoutItem_tran_historyNestedInput
    users_item_tran_history_requested_byTousers?: usersUpdateOneWithoutItem_tran_history_item_tran_history_requested_byTousersNestedInput
    users_item_tran_history_approved_byTousers?: usersUpdateOneWithoutItem_tran_history_item_tran_history_approved_byTousersNestedInput
    fines?: finesUpdateManyWithoutItem_tran_historyNestedInput
  }

  export type item_tran_historyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    tran_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: Enumitem_tran_history_statusFieldUpdateOperationsInput | $Enums.item_tran_history_status
    requested_by?: NullableIntFieldUpdateOperationsInput | number | null
    approved_by?: NullableIntFieldUpdateOperationsInput | number | null
    requested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_issued?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_due?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_returned?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    fines?: finesUncheckedUpdateManyWithoutItem_tran_historyNestedInput
  }

  export type item_tran_historyCreateManyInput = {
    id?: number
    item_id?: number | null
    tran_id?: number | null
    status?: $Enums.item_tran_history_status
    requested_by?: number | null
    approved_by?: number | null
    requested_at?: Date | string | null
    approved_at?: Date | string | null
    date_issued?: Date | string | null
    date_due?: Date | string | null
    date_returned?: Date | string | null
    remarks?: string | null
  }

  export type item_tran_historyUpdateManyMutationInput = {
    status?: Enumitem_tran_history_statusFieldUpdateOperationsInput | $Enums.item_tran_history_status
    requested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_issued?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_due?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_returned?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type item_tran_historyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    tran_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: Enumitem_tran_history_statusFieldUpdateOperationsInput | $Enums.item_tran_history_status
    requested_by?: NullableIntFieldUpdateOperationsInput | number | null
    approved_by?: NullableIntFieldUpdateOperationsInput | number | null
    requested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_issued?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_due?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_returned?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type library_itemsCreateInput = {
    title?: string | null
    author: string
    isbn?: string | null
    year?: number | null
    genre?: string | null
    image_url?: string | null
    description?: string | null
    librarian_id?: number | null
    item_type?: $Enums.library_item_type
    location?: string | null
    publisher?: string | null
    language?: string | null
    pages?: number | null
    duration?: number | null
    format?: string | null
    subject?: string | null
    keywords?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    record_status?: $Enums.record_status | null
    item_tran?: item_tranCreateNestedManyWithoutLibrary_itemsInput
    item_tran_history?: item_tran_historyCreateNestedManyWithoutLibrary_itemsInput
    notifications?: notificationsCreateNestedManyWithoutLibrary_itemsInput
    user_wishlist?: user_wishlistCreateNestedManyWithoutLibrary_itemsInput
  }

  export type library_itemsUncheckedCreateInput = {
    item_id?: number
    title?: string | null
    author: string
    isbn?: string | null
    year?: number | null
    genre?: string | null
    image_url?: string | null
    description?: string | null
    librarian_id?: number | null
    item_type?: $Enums.library_item_type
    location?: string | null
    publisher?: string | null
    language?: string | null
    pages?: number | null
    duration?: number | null
    format?: string | null
    subject?: string | null
    keywords?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    record_status?: $Enums.record_status | null
    item_tran?: item_tranUncheckedCreateNestedManyWithoutLibrary_itemsInput
    item_tran_history?: item_tran_historyUncheckedCreateNestedManyWithoutLibrary_itemsInput
    notifications?: notificationsUncheckedCreateNestedManyWithoutLibrary_itemsInput
    user_wishlist?: user_wishlistUncheckedCreateNestedManyWithoutLibrary_itemsInput
  }

  export type library_itemsUpdateInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: StringFieldUpdateOperationsInput | string
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    librarian_id?: NullableIntFieldUpdateOperationsInput | number | null
    item_type?: Enumlibrary_item_typeFieldUpdateOperationsInput | $Enums.library_item_type
    location?: NullableStringFieldUpdateOperationsInput | string | null
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    pages?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    format?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    record_status?: NullableEnumrecord_statusFieldUpdateOperationsInput | $Enums.record_status | null
    item_tran?: item_tranUpdateManyWithoutLibrary_itemsNestedInput
    item_tran_history?: item_tran_historyUpdateManyWithoutLibrary_itemsNestedInput
    notifications?: notificationsUpdateManyWithoutLibrary_itemsNestedInput
    user_wishlist?: user_wishlistUpdateManyWithoutLibrary_itemsNestedInput
  }

  export type library_itemsUncheckedUpdateInput = {
    item_id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: StringFieldUpdateOperationsInput | string
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    librarian_id?: NullableIntFieldUpdateOperationsInput | number | null
    item_type?: Enumlibrary_item_typeFieldUpdateOperationsInput | $Enums.library_item_type
    location?: NullableStringFieldUpdateOperationsInput | string | null
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    pages?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    format?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    record_status?: NullableEnumrecord_statusFieldUpdateOperationsInput | $Enums.record_status | null
    item_tran?: item_tranUncheckedUpdateManyWithoutLibrary_itemsNestedInput
    item_tran_history?: item_tran_historyUncheckedUpdateManyWithoutLibrary_itemsNestedInput
    notifications?: notificationsUncheckedUpdateManyWithoutLibrary_itemsNestedInput
    user_wishlist?: user_wishlistUncheckedUpdateManyWithoutLibrary_itemsNestedInput
  }

  export type library_itemsCreateManyInput = {
    item_id?: number
    title?: string | null
    author: string
    isbn?: string | null
    year?: number | null
    genre?: string | null
    image_url?: string | null
    description?: string | null
    librarian_id?: number | null
    item_type?: $Enums.library_item_type
    location?: string | null
    publisher?: string | null
    language?: string | null
    pages?: number | null
    duration?: number | null
    format?: string | null
    subject?: string | null
    keywords?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    record_status?: $Enums.record_status | null
  }

  export type library_itemsUpdateManyMutationInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: StringFieldUpdateOperationsInput | string
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    librarian_id?: NullableIntFieldUpdateOperationsInput | number | null
    item_type?: Enumlibrary_item_typeFieldUpdateOperationsInput | $Enums.library_item_type
    location?: NullableStringFieldUpdateOperationsInput | string | null
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    pages?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    format?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    record_status?: NullableEnumrecord_statusFieldUpdateOperationsInput | $Enums.record_status | null
  }

  export type library_itemsUncheckedUpdateManyInput = {
    item_id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: StringFieldUpdateOperationsInput | string
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    librarian_id?: NullableIntFieldUpdateOperationsInput | number | null
    item_type?: Enumlibrary_item_typeFieldUpdateOperationsInput | $Enums.library_item_type
    location?: NullableStringFieldUpdateOperationsInput | string | null
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    pages?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    format?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    record_status?: NullableEnumrecord_statusFieldUpdateOperationsInput | $Enums.record_status | null
  }

  export type finesCreateInput = {
    amount?: Decimal | DecimalJsLike | number | string | null
    reason?: string | null
    status?: $Enums.fines_status | null
    created_at?: Date | string | null
    paid_at?: Date | string | null
    users?: usersCreateNestedOneWithoutFinesInput
    item_tran_history?: item_tran_historyCreateNestedOneWithoutFinesInput
  }

  export type finesUncheckedCreateInput = {
    fine_id?: number
    user_id?: number | null
    item_tran_historyId?: number | null
    amount?: Decimal | DecimalJsLike | number | string | null
    reason?: string | null
    status?: $Enums.fines_status | null
    created_at?: Date | string | null
    paid_at?: Date | string | null
  }

  export type finesUpdateInput = {
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumfines_statusFieldUpdateOperationsInput | $Enums.fines_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneWithoutFinesNestedInput
    item_tran_history?: item_tran_historyUpdateOneWithoutFinesNestedInput
  }

  export type finesUncheckedUpdateInput = {
    fine_id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    item_tran_historyId?: NullableIntFieldUpdateOperationsInput | number | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumfines_statusFieldUpdateOperationsInput | $Enums.fines_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type finesCreateManyInput = {
    fine_id?: number
    user_id?: number | null
    item_tran_historyId?: number | null
    amount?: Decimal | DecimalJsLike | number | string | null
    reason?: string | null
    status?: $Enums.fines_status | null
    created_at?: Date | string | null
    paid_at?: Date | string | null
  }

  export type finesUpdateManyMutationInput = {
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumfines_statusFieldUpdateOperationsInput | $Enums.fines_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type finesUncheckedUpdateManyInput = {
    fine_id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    item_tran_historyId?: NullableIntFieldUpdateOperationsInput | number | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumfines_statusFieldUpdateOperationsInput | $Enums.fines_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type logsCreateInput = {
    description: string
    created_at?: Date | string | null
    users: usersCreateNestedOneWithoutLogsInput
  }

  export type logsUncheckedCreateInput = {
    log_id?: number
    description: string
    user_id: number
    created_at?: Date | string | null
  }

  export type logsUpdateInput = {
    description?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneRequiredWithoutLogsNestedInput
  }

  export type logsUncheckedUpdateInput = {
    log_id?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    user_id?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type logsCreateManyInput = {
    log_id?: number
    description: string
    user_id: number
    created_at?: Date | string | null
  }

  export type logsUpdateManyMutationInput = {
    description?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type logsUncheckedUpdateManyInput = {
    log_id?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    user_id?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type notificationsCreateInput = {
    type?: $Enums.notifications_type | null
    reservation_id?: number | null
    status?: $Enums.notifications_status | null
    message?: string | null
    created_at?: Date | string | null
    resolved_at?: Date | string | null
    library_items?: library_itemsCreateNestedOneWithoutNotificationsInput
    users_notifications_from_user_idTousers?: usersCreateNestedOneWithoutNotifications_notifications_from_user_idTousersInput
    users_notifications_to_user_idTousers?: usersCreateNestedOneWithoutNotifications_notifications_to_user_idTousersInput
    item_tran?: item_tranCreateNestedOneWithoutNotificationsInput
  }

  export type notificationsUncheckedCreateInput = {
    notification_id?: number
    type?: $Enums.notifications_type | null
    item_id?: number | null
    from_user_id?: number | null
    to_user_id?: number | null
    tran_id?: number | null
    reservation_id?: number | null
    status?: $Enums.notifications_status | null
    message?: string | null
    created_at?: Date | string | null
    resolved_at?: Date | string | null
  }

  export type notificationsUpdateInput = {
    type?: NullableEnumnotifications_typeFieldUpdateOperationsInput | $Enums.notifications_type | null
    reservation_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumnotifications_statusFieldUpdateOperationsInput | $Enums.notifications_status | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    library_items?: library_itemsUpdateOneWithoutNotificationsNestedInput
    users_notifications_from_user_idTousers?: usersUpdateOneWithoutNotifications_notifications_from_user_idTousersNestedInput
    users_notifications_to_user_idTousers?: usersUpdateOneWithoutNotifications_notifications_to_user_idTousersNestedInput
    item_tran?: item_tranUpdateOneWithoutNotificationsNestedInput
  }

  export type notificationsUncheckedUpdateInput = {
    notification_id?: IntFieldUpdateOperationsInput | number
    type?: NullableEnumnotifications_typeFieldUpdateOperationsInput | $Enums.notifications_type | null
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    from_user_id?: NullableIntFieldUpdateOperationsInput | number | null
    to_user_id?: NullableIntFieldUpdateOperationsInput | number | null
    tran_id?: NullableIntFieldUpdateOperationsInput | number | null
    reservation_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumnotifications_statusFieldUpdateOperationsInput | $Enums.notifications_status | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type notificationsCreateManyInput = {
    notification_id?: number
    type?: $Enums.notifications_type | null
    item_id?: number | null
    from_user_id?: number | null
    to_user_id?: number | null
    tran_id?: number | null
    reservation_id?: number | null
    status?: $Enums.notifications_status | null
    message?: string | null
    created_at?: Date | string | null
    resolved_at?: Date | string | null
  }

  export type notificationsUpdateManyMutationInput = {
    type?: NullableEnumnotifications_typeFieldUpdateOperationsInput | $Enums.notifications_type | null
    reservation_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumnotifications_statusFieldUpdateOperationsInput | $Enums.notifications_status | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type notificationsUncheckedUpdateManyInput = {
    notification_id?: IntFieldUpdateOperationsInput | number
    type?: NullableEnumnotifications_typeFieldUpdateOperationsInput | $Enums.notifications_type | null
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    from_user_id?: NullableIntFieldUpdateOperationsInput | number | null
    to_user_id?: NullableIntFieldUpdateOperationsInput | number | null
    tran_id?: NullableIntFieldUpdateOperationsInput | number | null
    reservation_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumnotifications_statusFieldUpdateOperationsInput | $Enums.notifications_status | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_wishlistCreateInput = {
    created_at?: Date | string | null
    users?: usersCreateNestedOneWithoutUser_wishlistInput
    library_items?: library_itemsCreateNestedOneWithoutUser_wishlistInput
  }

  export type user_wishlistUncheckedCreateInput = {
    id?: number
    user_id?: number | null
    item_id?: number | null
    created_at?: Date | string | null
  }

  export type user_wishlistUpdateInput = {
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneWithoutUser_wishlistNestedInput
    library_items?: library_itemsUpdateOneWithoutUser_wishlistNestedInput
  }

  export type user_wishlistUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_wishlistCreateManyInput = {
    id?: number
    user_id?: number | null
    item_id?: number | null
    created_at?: Date | string | null
  }

  export type user_wishlistUpdateManyMutationInput = {
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_wishlistUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersCreateInput = {
    name?: string | null
    email?: string | null
    password_hash?: string | null
    role?: $Enums.users_role | null
    status?: $Enums.users_status | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    gender?: $Enums.gender | null
    phone_number?: string | null
    birth_date?: Date | string | null
    address?: string | null
    profile_image_url?: string | null
    item_tran?: item_tranCreateNestedManyWithoutUsersInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyCreateNestedManyWithoutUsers_item_tran_history_requested_byTousersInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyCreateNestedManyWithoutUsers_item_tran_history_approved_byTousersInput
    fines?: finesCreateNestedManyWithoutUsersInput
    logs?: logsCreateNestedManyWithoutUsersInput
    notifications_notifications_from_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_from_user_idTousersInput
    notifications_notifications_to_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_to_user_idTousersInput
    user_wishlist?: user_wishlistCreateNestedManyWithoutUsersInput
    library_cards?: library_cardsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    user_id?: number
    name?: string | null
    email?: string | null
    password_hash?: string | null
    role?: $Enums.users_role | null
    status?: $Enums.users_status | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    gender?: $Enums.gender | null
    phone_number?: string | null
    birth_date?: Date | string | null
    address?: string | null
    profile_image_url?: string | null
    item_tran?: item_tranUncheckedCreateNestedManyWithoutUsersInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUncheckedCreateNestedManyWithoutUsers_item_tran_history_requested_byTousersInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUncheckedCreateNestedManyWithoutUsers_item_tran_history_approved_byTousersInput
    fines?: finesUncheckedCreateNestedManyWithoutUsersInput
    logs?: logsUncheckedCreateNestedManyWithoutUsersInput
    notifications_notifications_from_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_from_user_idTousersInput
    notifications_notifications_to_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_to_user_idTousersInput
    user_wishlist?: user_wishlistUncheckedCreateNestedManyWithoutUsersInput
    library_cards?: library_cardsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    status?: NullableEnumusers_statusFieldUpdateOperationsInput | $Enums.users_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumgenderFieldUpdateOperationsInput | $Enums.gender | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    item_tran?: item_tranUpdateManyWithoutUsersNestedInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUpdateManyWithoutUsers_item_tran_history_requested_byTousersNestedInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUpdateManyWithoutUsers_item_tran_history_approved_byTousersNestedInput
    fines?: finesUpdateManyWithoutUsersNestedInput
    logs?: logsUpdateManyWithoutUsersNestedInput
    notifications_notifications_from_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_from_user_idTousersNestedInput
    notifications_notifications_to_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_to_user_idTousersNestedInput
    user_wishlist?: user_wishlistUpdateManyWithoutUsersNestedInput
    library_cards?: library_cardsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    status?: NullableEnumusers_statusFieldUpdateOperationsInput | $Enums.users_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumgenderFieldUpdateOperationsInput | $Enums.gender | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    item_tran?: item_tranUncheckedUpdateManyWithoutUsersNestedInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUncheckedUpdateManyWithoutUsers_item_tran_history_requested_byTousersNestedInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUncheckedUpdateManyWithoutUsers_item_tran_history_approved_byTousersNestedInput
    fines?: finesUncheckedUpdateManyWithoutUsersNestedInput
    logs?: logsUncheckedUpdateManyWithoutUsersNestedInput
    notifications_notifications_from_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_from_user_idTousersNestedInput
    notifications_notifications_to_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_to_user_idTousersNestedInput
    user_wishlist?: user_wishlistUncheckedUpdateManyWithoutUsersNestedInput
    library_cards?: library_cardsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    user_id?: number
    name?: string | null
    email?: string | null
    password_hash?: string | null
    role?: $Enums.users_role | null
    status?: $Enums.users_status | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    gender?: $Enums.gender | null
    phone_number?: string | null
    birth_date?: Date | string | null
    address?: string | null
    profile_image_url?: string | null
  }

  export type usersUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    status?: NullableEnumusers_statusFieldUpdateOperationsInput | $Enums.users_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumgenderFieldUpdateOperationsInput | $Enums.gender | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersUncheckedUpdateManyInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    status?: NullableEnumusers_statusFieldUpdateOperationsInput | $Enums.users_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumgenderFieldUpdateOperationsInput | $Enums.gender | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type contact_usCreateInput = {
    name?: string | null
    email?: string | null
    subject?: string | null
    message?: string | null
    created_at?: Date | string | null
  }

  export type contact_usUncheckedCreateInput = {
    id?: number
    name?: string | null
    email?: string | null
    subject?: string | null
    message?: string | null
    created_at?: Date | string | null
  }

  export type contact_usUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type contact_usUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type contact_usCreateManyInput = {
    id?: number
    name?: string | null
    email?: string | null
    subject?: string | null
    message?: string | null
    created_at?: Date | string | null
  }

  export type contact_usUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type contact_usUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type system_configCreateInput = {
    config_key: string
    config_value: string
    description?: string | null
    updated_at?: Date | string
  }

  export type system_configUncheckedCreateInput = {
    config_id?: number
    config_key: string
    config_value: string
    description?: string | null
    updated_at?: Date | string
  }

  export type system_configUpdateInput = {
    config_key?: StringFieldUpdateOperationsInput | string
    config_value?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type system_configUncheckedUpdateInput = {
    config_id?: IntFieldUpdateOperationsInput | number
    config_key?: StringFieldUpdateOperationsInput | string
    config_value?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type system_configCreateManyInput = {
    config_id?: number
    config_key: string
    config_value: string
    description?: string | null
    updated_at?: Date | string
  }

  export type system_configUpdateManyMutationInput = {
    config_key?: StringFieldUpdateOperationsInput | string
    config_value?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type system_configUncheckedUpdateManyInput = {
    config_id?: IntFieldUpdateOperationsInput | number
    config_key?: StringFieldUpdateOperationsInput | string
    config_value?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type library_cardsCreateInput = {
    card_number: string
    issued_at?: Date | string
    expires_at?: Date | string | null
    status?: $Enums.card_status
    users?: usersCreateNestedOneWithoutLibrary_cardsInput
  }

  export type library_cardsUncheckedCreateInput = {
    card_id?: number
    user_id?: number | null
    card_number: string
    issued_at?: Date | string
    expires_at?: Date | string | null
    status?: $Enums.card_status
  }

  export type library_cardsUpdateInput = {
    card_number?: StringFieldUpdateOperationsInput | string
    issued_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: Enumcard_statusFieldUpdateOperationsInput | $Enums.card_status
    users?: usersUpdateOneWithoutLibrary_cardsNestedInput
  }

  export type library_cardsUncheckedUpdateInput = {
    card_id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    card_number?: StringFieldUpdateOperationsInput | string
    issued_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: Enumcard_statusFieldUpdateOperationsInput | $Enums.card_status
  }

  export type library_cardsCreateManyInput = {
    card_id?: number
    user_id?: number | null
    card_number: string
    issued_at?: Date | string
    expires_at?: Date | string | null
    status?: $Enums.card_status
  }

  export type library_cardsUpdateManyMutationInput = {
    card_number?: StringFieldUpdateOperationsInput | string
    issued_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: Enumcard_statusFieldUpdateOperationsInput | $Enums.card_status
  }

  export type library_cardsUncheckedUpdateManyInput = {
    card_id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    card_number?: StringFieldUpdateOperationsInput | string
    issued_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: Enumcard_statusFieldUpdateOperationsInput | $Enums.card_status
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type Enumitem_tran_statusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.item_tran_status | Enumitem_tran_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.item_tran_status[] | null
    notIn?: $Enums.item_tran_status[] | null
    not?: NestedEnumitem_tran_statusNullableFilter<$PrismaModel> | $Enums.item_tran_status | null
  }

  export type Enumrecord_statusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.record_status | Enumrecord_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.record_status[] | null
    notIn?: $Enums.record_status[] | null
    not?: NestedEnumrecord_statusNullableFilter<$PrismaModel> | $Enums.record_status | null
  }

  export type Library_itemsNullableScalarRelationFilter = {
    is?: library_itemsWhereInput | null
    isNot?: library_itemsWhereInput | null
  }

  export type UsersNullableScalarRelationFilter = {
    is?: usersWhereInput | null
    isNot?: usersWhereInput | null
  }

  export type Item_tran_historyListRelationFilter = {
    every?: item_tran_historyWhereInput
    some?: item_tran_historyWhereInput
    none?: item_tran_historyWhereInput
  }

  export type NotificationsListRelationFilter = {
    every?: notificationsWhereInput
    some?: notificationsWhereInput
    none?: notificationsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type item_tran_historyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type notificationsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type item_tranCountOrderByAggregateInput = {
    tran_id?: SortOrder
    item_id?: SortOrder
    status?: SortOrder
    user_id?: SortOrder
    record_status?: SortOrder
  }

  export type item_tranAvgOrderByAggregateInput = {
    tran_id?: SortOrder
    item_id?: SortOrder
    user_id?: SortOrder
  }

  export type item_tranMaxOrderByAggregateInput = {
    tran_id?: SortOrder
    item_id?: SortOrder
    status?: SortOrder
    user_id?: SortOrder
    record_status?: SortOrder
  }

  export type item_tranMinOrderByAggregateInput = {
    tran_id?: SortOrder
    item_id?: SortOrder
    status?: SortOrder
    user_id?: SortOrder
    record_status?: SortOrder
  }

  export type item_tranSumOrderByAggregateInput = {
    tran_id?: SortOrder
    item_id?: SortOrder
    user_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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

  export type Enumitem_tran_statusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.item_tran_status | Enumitem_tran_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.item_tran_status[] | null
    notIn?: $Enums.item_tran_status[] | null
    not?: NestedEnumitem_tran_statusNullableWithAggregatesFilter<$PrismaModel> | $Enums.item_tran_status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumitem_tran_statusNullableFilter<$PrismaModel>
    _max?: NestedEnumitem_tran_statusNullableFilter<$PrismaModel>
  }

  export type Enumrecord_statusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.record_status | Enumrecord_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.record_status[] | null
    notIn?: $Enums.record_status[] | null
    not?: NestedEnumrecord_statusNullableWithAggregatesFilter<$PrismaModel> | $Enums.record_status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumrecord_statusNullableFilter<$PrismaModel>
    _max?: NestedEnumrecord_statusNullableFilter<$PrismaModel>
  }

  export type Enumitem_tran_history_statusFilter<$PrismaModel = never> = {
    equals?: $Enums.item_tran_history_status | Enumitem_tran_history_statusFieldRefInput<$PrismaModel>
    in?: $Enums.item_tran_history_status[]
    notIn?: $Enums.item_tran_history_status[]
    not?: NestedEnumitem_tran_history_statusFilter<$PrismaModel> | $Enums.item_tran_history_status
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type Item_tranNullableScalarRelationFilter = {
    is?: item_tranWhereInput | null
    isNot?: item_tranWhereInput | null
  }

  export type FinesListRelationFilter = {
    every?: finesWhereInput
    some?: finesWhereInput
    none?: finesWhereInput
  }

  export type finesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type item_tran_historyOrderByRelevanceInput = {
    fields: item_tran_historyOrderByRelevanceFieldEnum | item_tran_historyOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type item_tran_historyCountOrderByAggregateInput = {
    id?: SortOrder
    item_id?: SortOrder
    tran_id?: SortOrder
    status?: SortOrder
    requested_by?: SortOrder
    approved_by?: SortOrder
    requested_at?: SortOrder
    approved_at?: SortOrder
    date_issued?: SortOrder
    date_due?: SortOrder
    date_returned?: SortOrder
    remarks?: SortOrder
  }

  export type item_tran_historyAvgOrderByAggregateInput = {
    id?: SortOrder
    item_id?: SortOrder
    tran_id?: SortOrder
    requested_by?: SortOrder
    approved_by?: SortOrder
  }

  export type item_tran_historyMaxOrderByAggregateInput = {
    id?: SortOrder
    item_id?: SortOrder
    tran_id?: SortOrder
    status?: SortOrder
    requested_by?: SortOrder
    approved_by?: SortOrder
    requested_at?: SortOrder
    approved_at?: SortOrder
    date_issued?: SortOrder
    date_due?: SortOrder
    date_returned?: SortOrder
    remarks?: SortOrder
  }

  export type item_tran_historyMinOrderByAggregateInput = {
    id?: SortOrder
    item_id?: SortOrder
    tran_id?: SortOrder
    status?: SortOrder
    requested_by?: SortOrder
    approved_by?: SortOrder
    requested_at?: SortOrder
    approved_at?: SortOrder
    date_issued?: SortOrder
    date_due?: SortOrder
    date_returned?: SortOrder
    remarks?: SortOrder
  }

  export type item_tran_historySumOrderByAggregateInput = {
    id?: SortOrder
    item_id?: SortOrder
    tran_id?: SortOrder
    requested_by?: SortOrder
    approved_by?: SortOrder
  }

  export type Enumitem_tran_history_statusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.item_tran_history_status | Enumitem_tran_history_statusFieldRefInput<$PrismaModel>
    in?: $Enums.item_tran_history_status[]
    notIn?: $Enums.item_tran_history_status[]
    not?: NestedEnumitem_tran_history_statusWithAggregatesFilter<$PrismaModel> | $Enums.item_tran_history_status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumitem_tran_history_statusFilter<$PrismaModel>
    _max?: NestedEnumitem_tran_history_statusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type Enumlibrary_item_typeFilter<$PrismaModel = never> = {
    equals?: $Enums.library_item_type | Enumlibrary_item_typeFieldRefInput<$PrismaModel>
    in?: $Enums.library_item_type[]
    notIn?: $Enums.library_item_type[]
    not?: NestedEnumlibrary_item_typeFilter<$PrismaModel> | $Enums.library_item_type
  }

  export type Item_tranListRelationFilter = {
    every?: item_tranWhereInput
    some?: item_tranWhereInput
    none?: item_tranWhereInput
  }

  export type User_wishlistListRelationFilter = {
    every?: user_wishlistWhereInput
    some?: user_wishlistWhereInput
    none?: user_wishlistWhereInput
  }

  export type item_tranOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type user_wishlistOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type library_itemsOrderByRelevanceInput = {
    fields: library_itemsOrderByRelevanceFieldEnum | library_itemsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type library_itemsCountOrderByAggregateInput = {
    item_id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    isbn?: SortOrder
    year?: SortOrder
    genre?: SortOrder
    image_url?: SortOrder
    description?: SortOrder
    librarian_id?: SortOrder
    item_type?: SortOrder
    location?: SortOrder
    publisher?: SortOrder
    language?: SortOrder
    pages?: SortOrder
    duration?: SortOrder
    format?: SortOrder
    subject?: SortOrder
    keywords?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    record_status?: SortOrder
  }

  export type library_itemsAvgOrderByAggregateInput = {
    item_id?: SortOrder
    year?: SortOrder
    librarian_id?: SortOrder
    pages?: SortOrder
    duration?: SortOrder
  }

  export type library_itemsMaxOrderByAggregateInput = {
    item_id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    isbn?: SortOrder
    year?: SortOrder
    genre?: SortOrder
    image_url?: SortOrder
    description?: SortOrder
    librarian_id?: SortOrder
    item_type?: SortOrder
    location?: SortOrder
    publisher?: SortOrder
    language?: SortOrder
    pages?: SortOrder
    duration?: SortOrder
    format?: SortOrder
    subject?: SortOrder
    keywords?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    record_status?: SortOrder
  }

  export type library_itemsMinOrderByAggregateInput = {
    item_id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    isbn?: SortOrder
    year?: SortOrder
    genre?: SortOrder
    image_url?: SortOrder
    description?: SortOrder
    librarian_id?: SortOrder
    item_type?: SortOrder
    location?: SortOrder
    publisher?: SortOrder
    language?: SortOrder
    pages?: SortOrder
    duration?: SortOrder
    format?: SortOrder
    subject?: SortOrder
    keywords?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    record_status?: SortOrder
  }

  export type library_itemsSumOrderByAggregateInput = {
    item_id?: SortOrder
    year?: SortOrder
    librarian_id?: SortOrder
    pages?: SortOrder
    duration?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type Enumlibrary_item_typeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.library_item_type | Enumlibrary_item_typeFieldRefInput<$PrismaModel>
    in?: $Enums.library_item_type[]
    notIn?: $Enums.library_item_type[]
    not?: NestedEnumlibrary_item_typeWithAggregatesFilter<$PrismaModel> | $Enums.library_item_type
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumlibrary_item_typeFilter<$PrismaModel>
    _max?: NestedEnumlibrary_item_typeFilter<$PrismaModel>
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type Enumfines_statusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.fines_status | Enumfines_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.fines_status[] | null
    notIn?: $Enums.fines_status[] | null
    not?: NestedEnumfines_statusNullableFilter<$PrismaModel> | $Enums.fines_status | null
  }

  export type Item_tran_historyNullableScalarRelationFilter = {
    is?: item_tran_historyWhereInput | null
    isNot?: item_tran_historyWhereInput | null
  }

  export type finesOrderByRelevanceInput = {
    fields: finesOrderByRelevanceFieldEnum | finesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type finesCountOrderByAggregateInput = {
    fine_id?: SortOrder
    user_id?: SortOrder
    item_tran_historyId?: SortOrder
    amount?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    paid_at?: SortOrder
  }

  export type finesAvgOrderByAggregateInput = {
    fine_id?: SortOrder
    user_id?: SortOrder
    item_tran_historyId?: SortOrder
    amount?: SortOrder
  }

  export type finesMaxOrderByAggregateInput = {
    fine_id?: SortOrder
    user_id?: SortOrder
    item_tran_historyId?: SortOrder
    amount?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    paid_at?: SortOrder
  }

  export type finesMinOrderByAggregateInput = {
    fine_id?: SortOrder
    user_id?: SortOrder
    item_tran_historyId?: SortOrder
    amount?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    paid_at?: SortOrder
  }

  export type finesSumOrderByAggregateInput = {
    fine_id?: SortOrder
    user_id?: SortOrder
    item_tran_historyId?: SortOrder
    amount?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type Enumfines_statusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.fines_status | Enumfines_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.fines_status[] | null
    notIn?: $Enums.fines_status[] | null
    not?: NestedEnumfines_statusNullableWithAggregatesFilter<$PrismaModel> | $Enums.fines_status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumfines_statusNullableFilter<$PrismaModel>
    _max?: NestedEnumfines_statusNullableFilter<$PrismaModel>
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type logsOrderByRelevanceInput = {
    fields: logsOrderByRelevanceFieldEnum | logsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type logsCountOrderByAggregateInput = {
    log_id?: SortOrder
    description?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
  }

  export type logsAvgOrderByAggregateInput = {
    log_id?: SortOrder
    user_id?: SortOrder
  }

  export type logsMaxOrderByAggregateInput = {
    log_id?: SortOrder
    description?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
  }

  export type logsMinOrderByAggregateInput = {
    log_id?: SortOrder
    description?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
  }

  export type logsSumOrderByAggregateInput = {
    log_id?: SortOrder
    user_id?: SortOrder
  }

  export type Enumnotifications_typeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.notifications_type | Enumnotifications_typeFieldRefInput<$PrismaModel> | null
    in?: $Enums.notifications_type[] | null
    notIn?: $Enums.notifications_type[] | null
    not?: NestedEnumnotifications_typeNullableFilter<$PrismaModel> | $Enums.notifications_type | null
  }

  export type Enumnotifications_statusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.notifications_status | Enumnotifications_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.notifications_status[] | null
    notIn?: $Enums.notifications_status[] | null
    not?: NestedEnumnotifications_statusNullableFilter<$PrismaModel> | $Enums.notifications_status | null
  }

  export type notificationsOrderByRelevanceInput = {
    fields: notificationsOrderByRelevanceFieldEnum | notificationsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type notificationsCountOrderByAggregateInput = {
    notification_id?: SortOrder
    type?: SortOrder
    item_id?: SortOrder
    from_user_id?: SortOrder
    to_user_id?: SortOrder
    tran_id?: SortOrder
    reservation_id?: SortOrder
    status?: SortOrder
    message?: SortOrder
    created_at?: SortOrder
    resolved_at?: SortOrder
  }

  export type notificationsAvgOrderByAggregateInput = {
    notification_id?: SortOrder
    item_id?: SortOrder
    from_user_id?: SortOrder
    to_user_id?: SortOrder
    tran_id?: SortOrder
    reservation_id?: SortOrder
  }

  export type notificationsMaxOrderByAggregateInput = {
    notification_id?: SortOrder
    type?: SortOrder
    item_id?: SortOrder
    from_user_id?: SortOrder
    to_user_id?: SortOrder
    tran_id?: SortOrder
    reservation_id?: SortOrder
    status?: SortOrder
    message?: SortOrder
    created_at?: SortOrder
    resolved_at?: SortOrder
  }

  export type notificationsMinOrderByAggregateInput = {
    notification_id?: SortOrder
    type?: SortOrder
    item_id?: SortOrder
    from_user_id?: SortOrder
    to_user_id?: SortOrder
    tran_id?: SortOrder
    reservation_id?: SortOrder
    status?: SortOrder
    message?: SortOrder
    created_at?: SortOrder
    resolved_at?: SortOrder
  }

  export type notificationsSumOrderByAggregateInput = {
    notification_id?: SortOrder
    item_id?: SortOrder
    from_user_id?: SortOrder
    to_user_id?: SortOrder
    tran_id?: SortOrder
    reservation_id?: SortOrder
  }

  export type Enumnotifications_typeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.notifications_type | Enumnotifications_typeFieldRefInput<$PrismaModel> | null
    in?: $Enums.notifications_type[] | null
    notIn?: $Enums.notifications_type[] | null
    not?: NestedEnumnotifications_typeNullableWithAggregatesFilter<$PrismaModel> | $Enums.notifications_type | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumnotifications_typeNullableFilter<$PrismaModel>
    _max?: NestedEnumnotifications_typeNullableFilter<$PrismaModel>
  }

  export type Enumnotifications_statusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.notifications_status | Enumnotifications_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.notifications_status[] | null
    notIn?: $Enums.notifications_status[] | null
    not?: NestedEnumnotifications_statusNullableWithAggregatesFilter<$PrismaModel> | $Enums.notifications_status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumnotifications_statusNullableFilter<$PrismaModel>
    _max?: NestedEnumnotifications_statusNullableFilter<$PrismaModel>
  }

  export type user_wishlistCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    item_id?: SortOrder
    created_at?: SortOrder
  }

  export type user_wishlistAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    item_id?: SortOrder
  }

  export type user_wishlistMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    item_id?: SortOrder
    created_at?: SortOrder
  }

  export type user_wishlistMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    item_id?: SortOrder
    created_at?: SortOrder
  }

  export type user_wishlistSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    item_id?: SortOrder
  }

  export type Enumusers_roleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.users_role | Enumusers_roleFieldRefInput<$PrismaModel> | null
    in?: $Enums.users_role[] | null
    notIn?: $Enums.users_role[] | null
    not?: NestedEnumusers_roleNullableFilter<$PrismaModel> | $Enums.users_role | null
  }

  export type Enumusers_statusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.users_status | Enumusers_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.users_status[] | null
    notIn?: $Enums.users_status[] | null
    not?: NestedEnumusers_statusNullableFilter<$PrismaModel> | $Enums.users_status | null
  }

  export type EnumgenderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.gender | EnumgenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.gender[] | null
    notIn?: $Enums.gender[] | null
    not?: NestedEnumgenderNullableFilter<$PrismaModel> | $Enums.gender | null
  }

  export type LogsListRelationFilter = {
    every?: logsWhereInput
    some?: logsWhereInput
    none?: logsWhereInput
  }

  export type Library_cardsListRelationFilter = {
    every?: library_cardsWhereInput
    some?: library_cardsWhereInput
    none?: library_cardsWhereInput
  }

  export type logsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type library_cardsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersOrderByRelevanceInput = {
    fields: usersOrderByRelevanceFieldEnum | usersOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type usersCountOrderByAggregateInput = {
    user_id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    gender?: SortOrder
    phone_number?: SortOrder
    birth_date?: SortOrder
    address?: SortOrder
    profile_image_url?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    user_id?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    user_id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    gender?: SortOrder
    phone_number?: SortOrder
    birth_date?: SortOrder
    address?: SortOrder
    profile_image_url?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    user_id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    gender?: SortOrder
    phone_number?: SortOrder
    birth_date?: SortOrder
    address?: SortOrder
    profile_image_url?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    user_id?: SortOrder
  }

  export type Enumusers_roleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.users_role | Enumusers_roleFieldRefInput<$PrismaModel> | null
    in?: $Enums.users_role[] | null
    notIn?: $Enums.users_role[] | null
    not?: NestedEnumusers_roleNullableWithAggregatesFilter<$PrismaModel> | $Enums.users_role | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumusers_roleNullableFilter<$PrismaModel>
    _max?: NestedEnumusers_roleNullableFilter<$PrismaModel>
  }

  export type Enumusers_statusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.users_status | Enumusers_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.users_status[] | null
    notIn?: $Enums.users_status[] | null
    not?: NestedEnumusers_statusNullableWithAggregatesFilter<$PrismaModel> | $Enums.users_status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumusers_statusNullableFilter<$PrismaModel>
    _max?: NestedEnumusers_statusNullableFilter<$PrismaModel>
  }

  export type EnumgenderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.gender | EnumgenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.gender[] | null
    notIn?: $Enums.gender[] | null
    not?: NestedEnumgenderNullableWithAggregatesFilter<$PrismaModel> | $Enums.gender | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumgenderNullableFilter<$PrismaModel>
    _max?: NestedEnumgenderNullableFilter<$PrismaModel>
  }

  export type contact_usOrderByRelevanceInput = {
    fields: contact_usOrderByRelevanceFieldEnum | contact_usOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type contact_usCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    subject?: SortOrder
    message?: SortOrder
    created_at?: SortOrder
  }

  export type contact_usAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type contact_usMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    subject?: SortOrder
    message?: SortOrder
    created_at?: SortOrder
  }

  export type contact_usMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    subject?: SortOrder
    message?: SortOrder
    created_at?: SortOrder
  }

  export type contact_usSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type system_configOrderByRelevanceInput = {
    fields: system_configOrderByRelevanceFieldEnum | system_configOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type system_configCountOrderByAggregateInput = {
    config_id?: SortOrder
    config_key?: SortOrder
    config_value?: SortOrder
    description?: SortOrder
    updated_at?: SortOrder
  }

  export type system_configAvgOrderByAggregateInput = {
    config_id?: SortOrder
  }

  export type system_configMaxOrderByAggregateInput = {
    config_id?: SortOrder
    config_key?: SortOrder
    config_value?: SortOrder
    description?: SortOrder
    updated_at?: SortOrder
  }

  export type system_configMinOrderByAggregateInput = {
    config_id?: SortOrder
    config_key?: SortOrder
    config_value?: SortOrder
    description?: SortOrder
    updated_at?: SortOrder
  }

  export type system_configSumOrderByAggregateInput = {
    config_id?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type Enumcard_statusFilter<$PrismaModel = never> = {
    equals?: $Enums.card_status | Enumcard_statusFieldRefInput<$PrismaModel>
    in?: $Enums.card_status[]
    notIn?: $Enums.card_status[]
    not?: NestedEnumcard_statusFilter<$PrismaModel> | $Enums.card_status
  }

  export type library_cardsOrderByRelevanceInput = {
    fields: library_cardsOrderByRelevanceFieldEnum | library_cardsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type library_cardsCountOrderByAggregateInput = {
    card_id?: SortOrder
    user_id?: SortOrder
    card_number?: SortOrder
    issued_at?: SortOrder
    expires_at?: SortOrder
    status?: SortOrder
  }

  export type library_cardsAvgOrderByAggregateInput = {
    card_id?: SortOrder
    user_id?: SortOrder
  }

  export type library_cardsMaxOrderByAggregateInput = {
    card_id?: SortOrder
    user_id?: SortOrder
    card_number?: SortOrder
    issued_at?: SortOrder
    expires_at?: SortOrder
    status?: SortOrder
  }

  export type library_cardsMinOrderByAggregateInput = {
    card_id?: SortOrder
    user_id?: SortOrder
    card_number?: SortOrder
    issued_at?: SortOrder
    expires_at?: SortOrder
    status?: SortOrder
  }

  export type library_cardsSumOrderByAggregateInput = {
    card_id?: SortOrder
    user_id?: SortOrder
  }

  export type Enumcard_statusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.card_status | Enumcard_statusFieldRefInput<$PrismaModel>
    in?: $Enums.card_status[]
    notIn?: $Enums.card_status[]
    not?: NestedEnumcard_statusWithAggregatesFilter<$PrismaModel> | $Enums.card_status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumcard_statusFilter<$PrismaModel>
    _max?: NestedEnumcard_statusFilter<$PrismaModel>
  }

  export type library_itemsCreateNestedOneWithoutItem_tranInput = {
    create?: XOR<library_itemsCreateWithoutItem_tranInput, library_itemsUncheckedCreateWithoutItem_tranInput>
    connectOrCreate?: library_itemsCreateOrConnectWithoutItem_tranInput
    connect?: library_itemsWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutItem_tranInput = {
    create?: XOR<usersCreateWithoutItem_tranInput, usersUncheckedCreateWithoutItem_tranInput>
    connectOrCreate?: usersCreateOrConnectWithoutItem_tranInput
    connect?: usersWhereUniqueInput
  }

  export type item_tran_historyCreateNestedManyWithoutItem_tranInput = {
    create?: XOR<item_tran_historyCreateWithoutItem_tranInput, item_tran_historyUncheckedCreateWithoutItem_tranInput> | item_tran_historyCreateWithoutItem_tranInput[] | item_tran_historyUncheckedCreateWithoutItem_tranInput[]
    connectOrCreate?: item_tran_historyCreateOrConnectWithoutItem_tranInput | item_tran_historyCreateOrConnectWithoutItem_tranInput[]
    createMany?: item_tran_historyCreateManyItem_tranInputEnvelope
    connect?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
  }

  export type notificationsCreateNestedManyWithoutItem_tranInput = {
    create?: XOR<notificationsCreateWithoutItem_tranInput, notificationsUncheckedCreateWithoutItem_tranInput> | notificationsCreateWithoutItem_tranInput[] | notificationsUncheckedCreateWithoutItem_tranInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutItem_tranInput | notificationsCreateOrConnectWithoutItem_tranInput[]
    createMany?: notificationsCreateManyItem_tranInputEnvelope
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
  }

  export type item_tran_historyUncheckedCreateNestedManyWithoutItem_tranInput = {
    create?: XOR<item_tran_historyCreateWithoutItem_tranInput, item_tran_historyUncheckedCreateWithoutItem_tranInput> | item_tran_historyCreateWithoutItem_tranInput[] | item_tran_historyUncheckedCreateWithoutItem_tranInput[]
    connectOrCreate?: item_tran_historyCreateOrConnectWithoutItem_tranInput | item_tran_historyCreateOrConnectWithoutItem_tranInput[]
    createMany?: item_tran_historyCreateManyItem_tranInputEnvelope
    connect?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
  }

  export type notificationsUncheckedCreateNestedManyWithoutItem_tranInput = {
    create?: XOR<notificationsCreateWithoutItem_tranInput, notificationsUncheckedCreateWithoutItem_tranInput> | notificationsCreateWithoutItem_tranInput[] | notificationsUncheckedCreateWithoutItem_tranInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutItem_tranInput | notificationsCreateOrConnectWithoutItem_tranInput[]
    createMany?: notificationsCreateManyItem_tranInputEnvelope
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
  }

  export type NullableEnumitem_tran_statusFieldUpdateOperationsInput = {
    set?: $Enums.item_tran_status | null
  }

  export type NullableEnumrecord_statusFieldUpdateOperationsInput = {
    set?: $Enums.record_status | null
  }

  export type library_itemsUpdateOneWithoutItem_tranNestedInput = {
    create?: XOR<library_itemsCreateWithoutItem_tranInput, library_itemsUncheckedCreateWithoutItem_tranInput>
    connectOrCreate?: library_itemsCreateOrConnectWithoutItem_tranInput
    upsert?: library_itemsUpsertWithoutItem_tranInput
    disconnect?: library_itemsWhereInput | boolean
    delete?: library_itemsWhereInput | boolean
    connect?: library_itemsWhereUniqueInput
    update?: XOR<XOR<library_itemsUpdateToOneWithWhereWithoutItem_tranInput, library_itemsUpdateWithoutItem_tranInput>, library_itemsUncheckedUpdateWithoutItem_tranInput>
  }

  export type usersUpdateOneWithoutItem_tranNestedInput = {
    create?: XOR<usersCreateWithoutItem_tranInput, usersUncheckedCreateWithoutItem_tranInput>
    connectOrCreate?: usersCreateOrConnectWithoutItem_tranInput
    upsert?: usersUpsertWithoutItem_tranInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutItem_tranInput, usersUpdateWithoutItem_tranInput>, usersUncheckedUpdateWithoutItem_tranInput>
  }

  export type item_tran_historyUpdateManyWithoutItem_tranNestedInput = {
    create?: XOR<item_tran_historyCreateWithoutItem_tranInput, item_tran_historyUncheckedCreateWithoutItem_tranInput> | item_tran_historyCreateWithoutItem_tranInput[] | item_tran_historyUncheckedCreateWithoutItem_tranInput[]
    connectOrCreate?: item_tran_historyCreateOrConnectWithoutItem_tranInput | item_tran_historyCreateOrConnectWithoutItem_tranInput[]
    upsert?: item_tran_historyUpsertWithWhereUniqueWithoutItem_tranInput | item_tran_historyUpsertWithWhereUniqueWithoutItem_tranInput[]
    createMany?: item_tran_historyCreateManyItem_tranInputEnvelope
    set?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    disconnect?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    delete?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    connect?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    update?: item_tran_historyUpdateWithWhereUniqueWithoutItem_tranInput | item_tran_historyUpdateWithWhereUniqueWithoutItem_tranInput[]
    updateMany?: item_tran_historyUpdateManyWithWhereWithoutItem_tranInput | item_tran_historyUpdateManyWithWhereWithoutItem_tranInput[]
    deleteMany?: item_tran_historyScalarWhereInput | item_tran_historyScalarWhereInput[]
  }

  export type notificationsUpdateManyWithoutItem_tranNestedInput = {
    create?: XOR<notificationsCreateWithoutItem_tranInput, notificationsUncheckedCreateWithoutItem_tranInput> | notificationsCreateWithoutItem_tranInput[] | notificationsUncheckedCreateWithoutItem_tranInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutItem_tranInput | notificationsCreateOrConnectWithoutItem_tranInput[]
    upsert?: notificationsUpsertWithWhereUniqueWithoutItem_tranInput | notificationsUpsertWithWhereUniqueWithoutItem_tranInput[]
    createMany?: notificationsCreateManyItem_tranInputEnvelope
    set?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    disconnect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    delete?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    update?: notificationsUpdateWithWhereUniqueWithoutItem_tranInput | notificationsUpdateWithWhereUniqueWithoutItem_tranInput[]
    updateMany?: notificationsUpdateManyWithWhereWithoutItem_tranInput | notificationsUpdateManyWithWhereWithoutItem_tranInput[]
    deleteMany?: notificationsScalarWhereInput | notificationsScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type item_tran_historyUncheckedUpdateManyWithoutItem_tranNestedInput = {
    create?: XOR<item_tran_historyCreateWithoutItem_tranInput, item_tran_historyUncheckedCreateWithoutItem_tranInput> | item_tran_historyCreateWithoutItem_tranInput[] | item_tran_historyUncheckedCreateWithoutItem_tranInput[]
    connectOrCreate?: item_tran_historyCreateOrConnectWithoutItem_tranInput | item_tran_historyCreateOrConnectWithoutItem_tranInput[]
    upsert?: item_tran_historyUpsertWithWhereUniqueWithoutItem_tranInput | item_tran_historyUpsertWithWhereUniqueWithoutItem_tranInput[]
    createMany?: item_tran_historyCreateManyItem_tranInputEnvelope
    set?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    disconnect?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    delete?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    connect?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    update?: item_tran_historyUpdateWithWhereUniqueWithoutItem_tranInput | item_tran_historyUpdateWithWhereUniqueWithoutItem_tranInput[]
    updateMany?: item_tran_historyUpdateManyWithWhereWithoutItem_tranInput | item_tran_historyUpdateManyWithWhereWithoutItem_tranInput[]
    deleteMany?: item_tran_historyScalarWhereInput | item_tran_historyScalarWhereInput[]
  }

  export type notificationsUncheckedUpdateManyWithoutItem_tranNestedInput = {
    create?: XOR<notificationsCreateWithoutItem_tranInput, notificationsUncheckedCreateWithoutItem_tranInput> | notificationsCreateWithoutItem_tranInput[] | notificationsUncheckedCreateWithoutItem_tranInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutItem_tranInput | notificationsCreateOrConnectWithoutItem_tranInput[]
    upsert?: notificationsUpsertWithWhereUniqueWithoutItem_tranInput | notificationsUpsertWithWhereUniqueWithoutItem_tranInput[]
    createMany?: notificationsCreateManyItem_tranInputEnvelope
    set?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    disconnect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    delete?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    update?: notificationsUpdateWithWhereUniqueWithoutItem_tranInput | notificationsUpdateWithWhereUniqueWithoutItem_tranInput[]
    updateMany?: notificationsUpdateManyWithWhereWithoutItem_tranInput | notificationsUpdateManyWithWhereWithoutItem_tranInput[]
    deleteMany?: notificationsScalarWhereInput | notificationsScalarWhereInput[]
  }

  export type library_itemsCreateNestedOneWithoutItem_tran_historyInput = {
    create?: XOR<library_itemsCreateWithoutItem_tran_historyInput, library_itemsUncheckedCreateWithoutItem_tran_historyInput>
    connectOrCreate?: library_itemsCreateOrConnectWithoutItem_tran_historyInput
    connect?: library_itemsWhereUniqueInput
  }

  export type item_tranCreateNestedOneWithoutItem_tran_historyInput = {
    create?: XOR<item_tranCreateWithoutItem_tran_historyInput, item_tranUncheckedCreateWithoutItem_tran_historyInput>
    connectOrCreate?: item_tranCreateOrConnectWithoutItem_tran_historyInput
    connect?: item_tranWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutItem_tran_history_item_tran_history_requested_byTousersInput = {
    create?: XOR<usersCreateWithoutItem_tran_history_item_tran_history_requested_byTousersInput, usersUncheckedCreateWithoutItem_tran_history_item_tran_history_requested_byTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutItem_tran_history_item_tran_history_requested_byTousersInput
    connect?: usersWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutItem_tran_history_item_tran_history_approved_byTousersInput = {
    create?: XOR<usersCreateWithoutItem_tran_history_item_tran_history_approved_byTousersInput, usersUncheckedCreateWithoutItem_tran_history_item_tran_history_approved_byTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutItem_tran_history_item_tran_history_approved_byTousersInput
    connect?: usersWhereUniqueInput
  }

  export type finesCreateNestedManyWithoutItem_tran_historyInput = {
    create?: XOR<finesCreateWithoutItem_tran_historyInput, finesUncheckedCreateWithoutItem_tran_historyInput> | finesCreateWithoutItem_tran_historyInput[] | finesUncheckedCreateWithoutItem_tran_historyInput[]
    connectOrCreate?: finesCreateOrConnectWithoutItem_tran_historyInput | finesCreateOrConnectWithoutItem_tran_historyInput[]
    createMany?: finesCreateManyItem_tran_historyInputEnvelope
    connect?: finesWhereUniqueInput | finesWhereUniqueInput[]
  }

  export type finesUncheckedCreateNestedManyWithoutItem_tran_historyInput = {
    create?: XOR<finesCreateWithoutItem_tran_historyInput, finesUncheckedCreateWithoutItem_tran_historyInput> | finesCreateWithoutItem_tran_historyInput[] | finesUncheckedCreateWithoutItem_tran_historyInput[]
    connectOrCreate?: finesCreateOrConnectWithoutItem_tran_historyInput | finesCreateOrConnectWithoutItem_tran_historyInput[]
    createMany?: finesCreateManyItem_tran_historyInputEnvelope
    connect?: finesWhereUniqueInput | finesWhereUniqueInput[]
  }

  export type Enumitem_tran_history_statusFieldUpdateOperationsInput = {
    set?: $Enums.item_tran_history_status
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type library_itemsUpdateOneWithoutItem_tran_historyNestedInput = {
    create?: XOR<library_itemsCreateWithoutItem_tran_historyInput, library_itemsUncheckedCreateWithoutItem_tran_historyInput>
    connectOrCreate?: library_itemsCreateOrConnectWithoutItem_tran_historyInput
    upsert?: library_itemsUpsertWithoutItem_tran_historyInput
    disconnect?: library_itemsWhereInput | boolean
    delete?: library_itemsWhereInput | boolean
    connect?: library_itemsWhereUniqueInput
    update?: XOR<XOR<library_itemsUpdateToOneWithWhereWithoutItem_tran_historyInput, library_itemsUpdateWithoutItem_tran_historyInput>, library_itemsUncheckedUpdateWithoutItem_tran_historyInput>
  }

  export type item_tranUpdateOneWithoutItem_tran_historyNestedInput = {
    create?: XOR<item_tranCreateWithoutItem_tran_historyInput, item_tranUncheckedCreateWithoutItem_tran_historyInput>
    connectOrCreate?: item_tranCreateOrConnectWithoutItem_tran_historyInput
    upsert?: item_tranUpsertWithoutItem_tran_historyInput
    disconnect?: item_tranWhereInput | boolean
    delete?: item_tranWhereInput | boolean
    connect?: item_tranWhereUniqueInput
    update?: XOR<XOR<item_tranUpdateToOneWithWhereWithoutItem_tran_historyInput, item_tranUpdateWithoutItem_tran_historyInput>, item_tranUncheckedUpdateWithoutItem_tran_historyInput>
  }

  export type usersUpdateOneWithoutItem_tran_history_item_tran_history_requested_byTousersNestedInput = {
    create?: XOR<usersCreateWithoutItem_tran_history_item_tran_history_requested_byTousersInput, usersUncheckedCreateWithoutItem_tran_history_item_tran_history_requested_byTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutItem_tran_history_item_tran_history_requested_byTousersInput
    upsert?: usersUpsertWithoutItem_tran_history_item_tran_history_requested_byTousersInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutItem_tran_history_item_tran_history_requested_byTousersInput, usersUpdateWithoutItem_tran_history_item_tran_history_requested_byTousersInput>, usersUncheckedUpdateWithoutItem_tran_history_item_tran_history_requested_byTousersInput>
  }

  export type usersUpdateOneWithoutItem_tran_history_item_tran_history_approved_byTousersNestedInput = {
    create?: XOR<usersCreateWithoutItem_tran_history_item_tran_history_approved_byTousersInput, usersUncheckedCreateWithoutItem_tran_history_item_tran_history_approved_byTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutItem_tran_history_item_tran_history_approved_byTousersInput
    upsert?: usersUpsertWithoutItem_tran_history_item_tran_history_approved_byTousersInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutItem_tran_history_item_tran_history_approved_byTousersInput, usersUpdateWithoutItem_tran_history_item_tran_history_approved_byTousersInput>, usersUncheckedUpdateWithoutItem_tran_history_item_tran_history_approved_byTousersInput>
  }

  export type finesUpdateManyWithoutItem_tran_historyNestedInput = {
    create?: XOR<finesCreateWithoutItem_tran_historyInput, finesUncheckedCreateWithoutItem_tran_historyInput> | finesCreateWithoutItem_tran_historyInput[] | finesUncheckedCreateWithoutItem_tran_historyInput[]
    connectOrCreate?: finesCreateOrConnectWithoutItem_tran_historyInput | finesCreateOrConnectWithoutItem_tran_historyInput[]
    upsert?: finesUpsertWithWhereUniqueWithoutItem_tran_historyInput | finesUpsertWithWhereUniqueWithoutItem_tran_historyInput[]
    createMany?: finesCreateManyItem_tran_historyInputEnvelope
    set?: finesWhereUniqueInput | finesWhereUniqueInput[]
    disconnect?: finesWhereUniqueInput | finesWhereUniqueInput[]
    delete?: finesWhereUniqueInput | finesWhereUniqueInput[]
    connect?: finesWhereUniqueInput | finesWhereUniqueInput[]
    update?: finesUpdateWithWhereUniqueWithoutItem_tran_historyInput | finesUpdateWithWhereUniqueWithoutItem_tran_historyInput[]
    updateMany?: finesUpdateManyWithWhereWithoutItem_tran_historyInput | finesUpdateManyWithWhereWithoutItem_tran_historyInput[]
    deleteMany?: finesScalarWhereInput | finesScalarWhereInput[]
  }

  export type finesUncheckedUpdateManyWithoutItem_tran_historyNestedInput = {
    create?: XOR<finesCreateWithoutItem_tran_historyInput, finesUncheckedCreateWithoutItem_tran_historyInput> | finesCreateWithoutItem_tran_historyInput[] | finesUncheckedCreateWithoutItem_tran_historyInput[]
    connectOrCreate?: finesCreateOrConnectWithoutItem_tran_historyInput | finesCreateOrConnectWithoutItem_tran_historyInput[]
    upsert?: finesUpsertWithWhereUniqueWithoutItem_tran_historyInput | finesUpsertWithWhereUniqueWithoutItem_tran_historyInput[]
    createMany?: finesCreateManyItem_tran_historyInputEnvelope
    set?: finesWhereUniqueInput | finesWhereUniqueInput[]
    disconnect?: finesWhereUniqueInput | finesWhereUniqueInput[]
    delete?: finesWhereUniqueInput | finesWhereUniqueInput[]
    connect?: finesWhereUniqueInput | finesWhereUniqueInput[]
    update?: finesUpdateWithWhereUniqueWithoutItem_tran_historyInput | finesUpdateWithWhereUniqueWithoutItem_tran_historyInput[]
    updateMany?: finesUpdateManyWithWhereWithoutItem_tran_historyInput | finesUpdateManyWithWhereWithoutItem_tran_historyInput[]
    deleteMany?: finesScalarWhereInput | finesScalarWhereInput[]
  }

  export type item_tranCreateNestedManyWithoutLibrary_itemsInput = {
    create?: XOR<item_tranCreateWithoutLibrary_itemsInput, item_tranUncheckedCreateWithoutLibrary_itemsInput> | item_tranCreateWithoutLibrary_itemsInput[] | item_tranUncheckedCreateWithoutLibrary_itemsInput[]
    connectOrCreate?: item_tranCreateOrConnectWithoutLibrary_itemsInput | item_tranCreateOrConnectWithoutLibrary_itemsInput[]
    createMany?: item_tranCreateManyLibrary_itemsInputEnvelope
    connect?: item_tranWhereUniqueInput | item_tranWhereUniqueInput[]
  }

  export type item_tran_historyCreateNestedManyWithoutLibrary_itemsInput = {
    create?: XOR<item_tran_historyCreateWithoutLibrary_itemsInput, item_tran_historyUncheckedCreateWithoutLibrary_itemsInput> | item_tran_historyCreateWithoutLibrary_itemsInput[] | item_tran_historyUncheckedCreateWithoutLibrary_itemsInput[]
    connectOrCreate?: item_tran_historyCreateOrConnectWithoutLibrary_itemsInput | item_tran_historyCreateOrConnectWithoutLibrary_itemsInput[]
    createMany?: item_tran_historyCreateManyLibrary_itemsInputEnvelope
    connect?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
  }

  export type notificationsCreateNestedManyWithoutLibrary_itemsInput = {
    create?: XOR<notificationsCreateWithoutLibrary_itemsInput, notificationsUncheckedCreateWithoutLibrary_itemsInput> | notificationsCreateWithoutLibrary_itemsInput[] | notificationsUncheckedCreateWithoutLibrary_itemsInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutLibrary_itemsInput | notificationsCreateOrConnectWithoutLibrary_itemsInput[]
    createMany?: notificationsCreateManyLibrary_itemsInputEnvelope
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
  }

  export type user_wishlistCreateNestedManyWithoutLibrary_itemsInput = {
    create?: XOR<user_wishlistCreateWithoutLibrary_itemsInput, user_wishlistUncheckedCreateWithoutLibrary_itemsInput> | user_wishlistCreateWithoutLibrary_itemsInput[] | user_wishlistUncheckedCreateWithoutLibrary_itemsInput[]
    connectOrCreate?: user_wishlistCreateOrConnectWithoutLibrary_itemsInput | user_wishlistCreateOrConnectWithoutLibrary_itemsInput[]
    createMany?: user_wishlistCreateManyLibrary_itemsInputEnvelope
    connect?: user_wishlistWhereUniqueInput | user_wishlistWhereUniqueInput[]
  }

  export type item_tranUncheckedCreateNestedManyWithoutLibrary_itemsInput = {
    create?: XOR<item_tranCreateWithoutLibrary_itemsInput, item_tranUncheckedCreateWithoutLibrary_itemsInput> | item_tranCreateWithoutLibrary_itemsInput[] | item_tranUncheckedCreateWithoutLibrary_itemsInput[]
    connectOrCreate?: item_tranCreateOrConnectWithoutLibrary_itemsInput | item_tranCreateOrConnectWithoutLibrary_itemsInput[]
    createMany?: item_tranCreateManyLibrary_itemsInputEnvelope
    connect?: item_tranWhereUniqueInput | item_tranWhereUniqueInput[]
  }

  export type item_tran_historyUncheckedCreateNestedManyWithoutLibrary_itemsInput = {
    create?: XOR<item_tran_historyCreateWithoutLibrary_itemsInput, item_tran_historyUncheckedCreateWithoutLibrary_itemsInput> | item_tran_historyCreateWithoutLibrary_itemsInput[] | item_tran_historyUncheckedCreateWithoutLibrary_itemsInput[]
    connectOrCreate?: item_tran_historyCreateOrConnectWithoutLibrary_itemsInput | item_tran_historyCreateOrConnectWithoutLibrary_itemsInput[]
    createMany?: item_tran_historyCreateManyLibrary_itemsInputEnvelope
    connect?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
  }

  export type notificationsUncheckedCreateNestedManyWithoutLibrary_itemsInput = {
    create?: XOR<notificationsCreateWithoutLibrary_itemsInput, notificationsUncheckedCreateWithoutLibrary_itemsInput> | notificationsCreateWithoutLibrary_itemsInput[] | notificationsUncheckedCreateWithoutLibrary_itemsInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutLibrary_itemsInput | notificationsCreateOrConnectWithoutLibrary_itemsInput[]
    createMany?: notificationsCreateManyLibrary_itemsInputEnvelope
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
  }

  export type user_wishlistUncheckedCreateNestedManyWithoutLibrary_itemsInput = {
    create?: XOR<user_wishlistCreateWithoutLibrary_itemsInput, user_wishlistUncheckedCreateWithoutLibrary_itemsInput> | user_wishlistCreateWithoutLibrary_itemsInput[] | user_wishlistUncheckedCreateWithoutLibrary_itemsInput[]
    connectOrCreate?: user_wishlistCreateOrConnectWithoutLibrary_itemsInput | user_wishlistCreateOrConnectWithoutLibrary_itemsInput[]
    createMany?: user_wishlistCreateManyLibrary_itemsInputEnvelope
    connect?: user_wishlistWhereUniqueInput | user_wishlistWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type Enumlibrary_item_typeFieldUpdateOperationsInput = {
    set?: $Enums.library_item_type
  }

  export type item_tranUpdateManyWithoutLibrary_itemsNestedInput = {
    create?: XOR<item_tranCreateWithoutLibrary_itemsInput, item_tranUncheckedCreateWithoutLibrary_itemsInput> | item_tranCreateWithoutLibrary_itemsInput[] | item_tranUncheckedCreateWithoutLibrary_itemsInput[]
    connectOrCreate?: item_tranCreateOrConnectWithoutLibrary_itemsInput | item_tranCreateOrConnectWithoutLibrary_itemsInput[]
    upsert?: item_tranUpsertWithWhereUniqueWithoutLibrary_itemsInput | item_tranUpsertWithWhereUniqueWithoutLibrary_itemsInput[]
    createMany?: item_tranCreateManyLibrary_itemsInputEnvelope
    set?: item_tranWhereUniqueInput | item_tranWhereUniqueInput[]
    disconnect?: item_tranWhereUniqueInput | item_tranWhereUniqueInput[]
    delete?: item_tranWhereUniqueInput | item_tranWhereUniqueInput[]
    connect?: item_tranWhereUniqueInput | item_tranWhereUniqueInput[]
    update?: item_tranUpdateWithWhereUniqueWithoutLibrary_itemsInput | item_tranUpdateWithWhereUniqueWithoutLibrary_itemsInput[]
    updateMany?: item_tranUpdateManyWithWhereWithoutLibrary_itemsInput | item_tranUpdateManyWithWhereWithoutLibrary_itemsInput[]
    deleteMany?: item_tranScalarWhereInput | item_tranScalarWhereInput[]
  }

  export type item_tran_historyUpdateManyWithoutLibrary_itemsNestedInput = {
    create?: XOR<item_tran_historyCreateWithoutLibrary_itemsInput, item_tran_historyUncheckedCreateWithoutLibrary_itemsInput> | item_tran_historyCreateWithoutLibrary_itemsInput[] | item_tran_historyUncheckedCreateWithoutLibrary_itemsInput[]
    connectOrCreate?: item_tran_historyCreateOrConnectWithoutLibrary_itemsInput | item_tran_historyCreateOrConnectWithoutLibrary_itemsInput[]
    upsert?: item_tran_historyUpsertWithWhereUniqueWithoutLibrary_itemsInput | item_tran_historyUpsertWithWhereUniqueWithoutLibrary_itemsInput[]
    createMany?: item_tran_historyCreateManyLibrary_itemsInputEnvelope
    set?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    disconnect?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    delete?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    connect?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    update?: item_tran_historyUpdateWithWhereUniqueWithoutLibrary_itemsInput | item_tran_historyUpdateWithWhereUniqueWithoutLibrary_itemsInput[]
    updateMany?: item_tran_historyUpdateManyWithWhereWithoutLibrary_itemsInput | item_tran_historyUpdateManyWithWhereWithoutLibrary_itemsInput[]
    deleteMany?: item_tran_historyScalarWhereInput | item_tran_historyScalarWhereInput[]
  }

  export type notificationsUpdateManyWithoutLibrary_itemsNestedInput = {
    create?: XOR<notificationsCreateWithoutLibrary_itemsInput, notificationsUncheckedCreateWithoutLibrary_itemsInput> | notificationsCreateWithoutLibrary_itemsInput[] | notificationsUncheckedCreateWithoutLibrary_itemsInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutLibrary_itemsInput | notificationsCreateOrConnectWithoutLibrary_itemsInput[]
    upsert?: notificationsUpsertWithWhereUniqueWithoutLibrary_itemsInput | notificationsUpsertWithWhereUniqueWithoutLibrary_itemsInput[]
    createMany?: notificationsCreateManyLibrary_itemsInputEnvelope
    set?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    disconnect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    delete?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    update?: notificationsUpdateWithWhereUniqueWithoutLibrary_itemsInput | notificationsUpdateWithWhereUniqueWithoutLibrary_itemsInput[]
    updateMany?: notificationsUpdateManyWithWhereWithoutLibrary_itemsInput | notificationsUpdateManyWithWhereWithoutLibrary_itemsInput[]
    deleteMany?: notificationsScalarWhereInput | notificationsScalarWhereInput[]
  }

  export type user_wishlistUpdateManyWithoutLibrary_itemsNestedInput = {
    create?: XOR<user_wishlistCreateWithoutLibrary_itemsInput, user_wishlistUncheckedCreateWithoutLibrary_itemsInput> | user_wishlistCreateWithoutLibrary_itemsInput[] | user_wishlistUncheckedCreateWithoutLibrary_itemsInput[]
    connectOrCreate?: user_wishlistCreateOrConnectWithoutLibrary_itemsInput | user_wishlistCreateOrConnectWithoutLibrary_itemsInput[]
    upsert?: user_wishlistUpsertWithWhereUniqueWithoutLibrary_itemsInput | user_wishlistUpsertWithWhereUniqueWithoutLibrary_itemsInput[]
    createMany?: user_wishlistCreateManyLibrary_itemsInputEnvelope
    set?: user_wishlistWhereUniqueInput | user_wishlistWhereUniqueInput[]
    disconnect?: user_wishlistWhereUniqueInput | user_wishlistWhereUniqueInput[]
    delete?: user_wishlistWhereUniqueInput | user_wishlistWhereUniqueInput[]
    connect?: user_wishlistWhereUniqueInput | user_wishlistWhereUniqueInput[]
    update?: user_wishlistUpdateWithWhereUniqueWithoutLibrary_itemsInput | user_wishlistUpdateWithWhereUniqueWithoutLibrary_itemsInput[]
    updateMany?: user_wishlistUpdateManyWithWhereWithoutLibrary_itemsInput | user_wishlistUpdateManyWithWhereWithoutLibrary_itemsInput[]
    deleteMany?: user_wishlistScalarWhereInput | user_wishlistScalarWhereInput[]
  }

  export type item_tranUncheckedUpdateManyWithoutLibrary_itemsNestedInput = {
    create?: XOR<item_tranCreateWithoutLibrary_itemsInput, item_tranUncheckedCreateWithoutLibrary_itemsInput> | item_tranCreateWithoutLibrary_itemsInput[] | item_tranUncheckedCreateWithoutLibrary_itemsInput[]
    connectOrCreate?: item_tranCreateOrConnectWithoutLibrary_itemsInput | item_tranCreateOrConnectWithoutLibrary_itemsInput[]
    upsert?: item_tranUpsertWithWhereUniqueWithoutLibrary_itemsInput | item_tranUpsertWithWhereUniqueWithoutLibrary_itemsInput[]
    createMany?: item_tranCreateManyLibrary_itemsInputEnvelope
    set?: item_tranWhereUniqueInput | item_tranWhereUniqueInput[]
    disconnect?: item_tranWhereUniqueInput | item_tranWhereUniqueInput[]
    delete?: item_tranWhereUniqueInput | item_tranWhereUniqueInput[]
    connect?: item_tranWhereUniqueInput | item_tranWhereUniqueInput[]
    update?: item_tranUpdateWithWhereUniqueWithoutLibrary_itemsInput | item_tranUpdateWithWhereUniqueWithoutLibrary_itemsInput[]
    updateMany?: item_tranUpdateManyWithWhereWithoutLibrary_itemsInput | item_tranUpdateManyWithWhereWithoutLibrary_itemsInput[]
    deleteMany?: item_tranScalarWhereInput | item_tranScalarWhereInput[]
  }

  export type item_tran_historyUncheckedUpdateManyWithoutLibrary_itemsNestedInput = {
    create?: XOR<item_tran_historyCreateWithoutLibrary_itemsInput, item_tran_historyUncheckedCreateWithoutLibrary_itemsInput> | item_tran_historyCreateWithoutLibrary_itemsInput[] | item_tran_historyUncheckedCreateWithoutLibrary_itemsInput[]
    connectOrCreate?: item_tran_historyCreateOrConnectWithoutLibrary_itemsInput | item_tran_historyCreateOrConnectWithoutLibrary_itemsInput[]
    upsert?: item_tran_historyUpsertWithWhereUniqueWithoutLibrary_itemsInput | item_tran_historyUpsertWithWhereUniqueWithoutLibrary_itemsInput[]
    createMany?: item_tran_historyCreateManyLibrary_itemsInputEnvelope
    set?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    disconnect?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    delete?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    connect?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    update?: item_tran_historyUpdateWithWhereUniqueWithoutLibrary_itemsInput | item_tran_historyUpdateWithWhereUniqueWithoutLibrary_itemsInput[]
    updateMany?: item_tran_historyUpdateManyWithWhereWithoutLibrary_itemsInput | item_tran_historyUpdateManyWithWhereWithoutLibrary_itemsInput[]
    deleteMany?: item_tran_historyScalarWhereInput | item_tran_historyScalarWhereInput[]
  }

  export type notificationsUncheckedUpdateManyWithoutLibrary_itemsNestedInput = {
    create?: XOR<notificationsCreateWithoutLibrary_itemsInput, notificationsUncheckedCreateWithoutLibrary_itemsInput> | notificationsCreateWithoutLibrary_itemsInput[] | notificationsUncheckedCreateWithoutLibrary_itemsInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutLibrary_itemsInput | notificationsCreateOrConnectWithoutLibrary_itemsInput[]
    upsert?: notificationsUpsertWithWhereUniqueWithoutLibrary_itemsInput | notificationsUpsertWithWhereUniqueWithoutLibrary_itemsInput[]
    createMany?: notificationsCreateManyLibrary_itemsInputEnvelope
    set?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    disconnect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    delete?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    update?: notificationsUpdateWithWhereUniqueWithoutLibrary_itemsInput | notificationsUpdateWithWhereUniqueWithoutLibrary_itemsInput[]
    updateMany?: notificationsUpdateManyWithWhereWithoutLibrary_itemsInput | notificationsUpdateManyWithWhereWithoutLibrary_itemsInput[]
    deleteMany?: notificationsScalarWhereInput | notificationsScalarWhereInput[]
  }

  export type user_wishlistUncheckedUpdateManyWithoutLibrary_itemsNestedInput = {
    create?: XOR<user_wishlistCreateWithoutLibrary_itemsInput, user_wishlistUncheckedCreateWithoutLibrary_itemsInput> | user_wishlistCreateWithoutLibrary_itemsInput[] | user_wishlistUncheckedCreateWithoutLibrary_itemsInput[]
    connectOrCreate?: user_wishlistCreateOrConnectWithoutLibrary_itemsInput | user_wishlistCreateOrConnectWithoutLibrary_itemsInput[]
    upsert?: user_wishlistUpsertWithWhereUniqueWithoutLibrary_itemsInput | user_wishlistUpsertWithWhereUniqueWithoutLibrary_itemsInput[]
    createMany?: user_wishlistCreateManyLibrary_itemsInputEnvelope
    set?: user_wishlistWhereUniqueInput | user_wishlistWhereUniqueInput[]
    disconnect?: user_wishlistWhereUniqueInput | user_wishlistWhereUniqueInput[]
    delete?: user_wishlistWhereUniqueInput | user_wishlistWhereUniqueInput[]
    connect?: user_wishlistWhereUniqueInput | user_wishlistWhereUniqueInput[]
    update?: user_wishlistUpdateWithWhereUniqueWithoutLibrary_itemsInput | user_wishlistUpdateWithWhereUniqueWithoutLibrary_itemsInput[]
    updateMany?: user_wishlistUpdateManyWithWhereWithoutLibrary_itemsInput | user_wishlistUpdateManyWithWhereWithoutLibrary_itemsInput[]
    deleteMany?: user_wishlistScalarWhereInput | user_wishlistScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutFinesInput = {
    create?: XOR<usersCreateWithoutFinesInput, usersUncheckedCreateWithoutFinesInput>
    connectOrCreate?: usersCreateOrConnectWithoutFinesInput
    connect?: usersWhereUniqueInput
  }

  export type item_tran_historyCreateNestedOneWithoutFinesInput = {
    create?: XOR<item_tran_historyCreateWithoutFinesInput, item_tran_historyUncheckedCreateWithoutFinesInput>
    connectOrCreate?: item_tran_historyCreateOrConnectWithoutFinesInput
    connect?: item_tran_historyWhereUniqueInput
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableEnumfines_statusFieldUpdateOperationsInput = {
    set?: $Enums.fines_status | null
  }

  export type usersUpdateOneWithoutFinesNestedInput = {
    create?: XOR<usersCreateWithoutFinesInput, usersUncheckedCreateWithoutFinesInput>
    connectOrCreate?: usersCreateOrConnectWithoutFinesInput
    upsert?: usersUpsertWithoutFinesInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutFinesInput, usersUpdateWithoutFinesInput>, usersUncheckedUpdateWithoutFinesInput>
  }

  export type item_tran_historyUpdateOneWithoutFinesNestedInput = {
    create?: XOR<item_tran_historyCreateWithoutFinesInput, item_tran_historyUncheckedCreateWithoutFinesInput>
    connectOrCreate?: item_tran_historyCreateOrConnectWithoutFinesInput
    upsert?: item_tran_historyUpsertWithoutFinesInput
    disconnect?: item_tran_historyWhereInput | boolean
    delete?: item_tran_historyWhereInput | boolean
    connect?: item_tran_historyWhereUniqueInput
    update?: XOR<XOR<item_tran_historyUpdateToOneWithWhereWithoutFinesInput, item_tran_historyUpdateWithoutFinesInput>, item_tran_historyUncheckedUpdateWithoutFinesInput>
  }

  export type usersCreateNestedOneWithoutLogsInput = {
    create?: XOR<usersCreateWithoutLogsInput, usersUncheckedCreateWithoutLogsInput>
    connectOrCreate?: usersCreateOrConnectWithoutLogsInput
    connect?: usersWhereUniqueInput
  }

  export type usersUpdateOneRequiredWithoutLogsNestedInput = {
    create?: XOR<usersCreateWithoutLogsInput, usersUncheckedCreateWithoutLogsInput>
    connectOrCreate?: usersCreateOrConnectWithoutLogsInput
    upsert?: usersUpsertWithoutLogsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutLogsInput, usersUpdateWithoutLogsInput>, usersUncheckedUpdateWithoutLogsInput>
  }

  export type library_itemsCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<library_itemsCreateWithoutNotificationsInput, library_itemsUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: library_itemsCreateOrConnectWithoutNotificationsInput
    connect?: library_itemsWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutNotifications_notifications_from_user_idTousersInput = {
    create?: XOR<usersCreateWithoutNotifications_notifications_from_user_idTousersInput, usersUncheckedCreateWithoutNotifications_notifications_from_user_idTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutNotifications_notifications_from_user_idTousersInput
    connect?: usersWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutNotifications_notifications_to_user_idTousersInput = {
    create?: XOR<usersCreateWithoutNotifications_notifications_to_user_idTousersInput, usersUncheckedCreateWithoutNotifications_notifications_to_user_idTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutNotifications_notifications_to_user_idTousersInput
    connect?: usersWhereUniqueInput
  }

  export type item_tranCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<item_tranCreateWithoutNotificationsInput, item_tranUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: item_tranCreateOrConnectWithoutNotificationsInput
    connect?: item_tranWhereUniqueInput
  }

  export type NullableEnumnotifications_typeFieldUpdateOperationsInput = {
    set?: $Enums.notifications_type | null
  }

  export type NullableEnumnotifications_statusFieldUpdateOperationsInput = {
    set?: $Enums.notifications_status | null
  }

  export type library_itemsUpdateOneWithoutNotificationsNestedInput = {
    create?: XOR<library_itemsCreateWithoutNotificationsInput, library_itemsUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: library_itemsCreateOrConnectWithoutNotificationsInput
    upsert?: library_itemsUpsertWithoutNotificationsInput
    disconnect?: library_itemsWhereInput | boolean
    delete?: library_itemsWhereInput | boolean
    connect?: library_itemsWhereUniqueInput
    update?: XOR<XOR<library_itemsUpdateToOneWithWhereWithoutNotificationsInput, library_itemsUpdateWithoutNotificationsInput>, library_itemsUncheckedUpdateWithoutNotificationsInput>
  }

  export type usersUpdateOneWithoutNotifications_notifications_from_user_idTousersNestedInput = {
    create?: XOR<usersCreateWithoutNotifications_notifications_from_user_idTousersInput, usersUncheckedCreateWithoutNotifications_notifications_from_user_idTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutNotifications_notifications_from_user_idTousersInput
    upsert?: usersUpsertWithoutNotifications_notifications_from_user_idTousersInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutNotifications_notifications_from_user_idTousersInput, usersUpdateWithoutNotifications_notifications_from_user_idTousersInput>, usersUncheckedUpdateWithoutNotifications_notifications_from_user_idTousersInput>
  }

  export type usersUpdateOneWithoutNotifications_notifications_to_user_idTousersNestedInput = {
    create?: XOR<usersCreateWithoutNotifications_notifications_to_user_idTousersInput, usersUncheckedCreateWithoutNotifications_notifications_to_user_idTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutNotifications_notifications_to_user_idTousersInput
    upsert?: usersUpsertWithoutNotifications_notifications_to_user_idTousersInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutNotifications_notifications_to_user_idTousersInput, usersUpdateWithoutNotifications_notifications_to_user_idTousersInput>, usersUncheckedUpdateWithoutNotifications_notifications_to_user_idTousersInput>
  }

  export type item_tranUpdateOneWithoutNotificationsNestedInput = {
    create?: XOR<item_tranCreateWithoutNotificationsInput, item_tranUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: item_tranCreateOrConnectWithoutNotificationsInput
    upsert?: item_tranUpsertWithoutNotificationsInput
    disconnect?: item_tranWhereInput | boolean
    delete?: item_tranWhereInput | boolean
    connect?: item_tranWhereUniqueInput
    update?: XOR<XOR<item_tranUpdateToOneWithWhereWithoutNotificationsInput, item_tranUpdateWithoutNotificationsInput>, item_tranUncheckedUpdateWithoutNotificationsInput>
  }

  export type usersCreateNestedOneWithoutUser_wishlistInput = {
    create?: XOR<usersCreateWithoutUser_wishlistInput, usersUncheckedCreateWithoutUser_wishlistInput>
    connectOrCreate?: usersCreateOrConnectWithoutUser_wishlistInput
    connect?: usersWhereUniqueInput
  }

  export type library_itemsCreateNestedOneWithoutUser_wishlistInput = {
    create?: XOR<library_itemsCreateWithoutUser_wishlistInput, library_itemsUncheckedCreateWithoutUser_wishlistInput>
    connectOrCreate?: library_itemsCreateOrConnectWithoutUser_wishlistInput
    connect?: library_itemsWhereUniqueInput
  }

  export type usersUpdateOneWithoutUser_wishlistNestedInput = {
    create?: XOR<usersCreateWithoutUser_wishlistInput, usersUncheckedCreateWithoutUser_wishlistInput>
    connectOrCreate?: usersCreateOrConnectWithoutUser_wishlistInput
    upsert?: usersUpsertWithoutUser_wishlistInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutUser_wishlistInput, usersUpdateWithoutUser_wishlistInput>, usersUncheckedUpdateWithoutUser_wishlistInput>
  }

  export type library_itemsUpdateOneWithoutUser_wishlistNestedInput = {
    create?: XOR<library_itemsCreateWithoutUser_wishlistInput, library_itemsUncheckedCreateWithoutUser_wishlistInput>
    connectOrCreate?: library_itemsCreateOrConnectWithoutUser_wishlistInput
    upsert?: library_itemsUpsertWithoutUser_wishlistInput
    disconnect?: library_itemsWhereInput | boolean
    delete?: library_itemsWhereInput | boolean
    connect?: library_itemsWhereUniqueInput
    update?: XOR<XOR<library_itemsUpdateToOneWithWhereWithoutUser_wishlistInput, library_itemsUpdateWithoutUser_wishlistInput>, library_itemsUncheckedUpdateWithoutUser_wishlistInput>
  }

  export type item_tranCreateNestedManyWithoutUsersInput = {
    create?: XOR<item_tranCreateWithoutUsersInput, item_tranUncheckedCreateWithoutUsersInput> | item_tranCreateWithoutUsersInput[] | item_tranUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: item_tranCreateOrConnectWithoutUsersInput | item_tranCreateOrConnectWithoutUsersInput[]
    createMany?: item_tranCreateManyUsersInputEnvelope
    connect?: item_tranWhereUniqueInput | item_tranWhereUniqueInput[]
  }

  export type item_tran_historyCreateNestedManyWithoutUsers_item_tran_history_requested_byTousersInput = {
    create?: XOR<item_tran_historyCreateWithoutUsers_item_tran_history_requested_byTousersInput, item_tran_historyUncheckedCreateWithoutUsers_item_tran_history_requested_byTousersInput> | item_tran_historyCreateWithoutUsers_item_tran_history_requested_byTousersInput[] | item_tran_historyUncheckedCreateWithoutUsers_item_tran_history_requested_byTousersInput[]
    connectOrCreate?: item_tran_historyCreateOrConnectWithoutUsers_item_tran_history_requested_byTousersInput | item_tran_historyCreateOrConnectWithoutUsers_item_tran_history_requested_byTousersInput[]
    createMany?: item_tran_historyCreateManyUsers_item_tran_history_requested_byTousersInputEnvelope
    connect?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
  }

  export type item_tran_historyCreateNestedManyWithoutUsers_item_tran_history_approved_byTousersInput = {
    create?: XOR<item_tran_historyCreateWithoutUsers_item_tran_history_approved_byTousersInput, item_tran_historyUncheckedCreateWithoutUsers_item_tran_history_approved_byTousersInput> | item_tran_historyCreateWithoutUsers_item_tran_history_approved_byTousersInput[] | item_tran_historyUncheckedCreateWithoutUsers_item_tran_history_approved_byTousersInput[]
    connectOrCreate?: item_tran_historyCreateOrConnectWithoutUsers_item_tran_history_approved_byTousersInput | item_tran_historyCreateOrConnectWithoutUsers_item_tran_history_approved_byTousersInput[]
    createMany?: item_tran_historyCreateManyUsers_item_tran_history_approved_byTousersInputEnvelope
    connect?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
  }

  export type finesCreateNestedManyWithoutUsersInput = {
    create?: XOR<finesCreateWithoutUsersInput, finesUncheckedCreateWithoutUsersInput> | finesCreateWithoutUsersInput[] | finesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: finesCreateOrConnectWithoutUsersInput | finesCreateOrConnectWithoutUsersInput[]
    createMany?: finesCreateManyUsersInputEnvelope
    connect?: finesWhereUniqueInput | finesWhereUniqueInput[]
  }

  export type logsCreateNestedManyWithoutUsersInput = {
    create?: XOR<logsCreateWithoutUsersInput, logsUncheckedCreateWithoutUsersInput> | logsCreateWithoutUsersInput[] | logsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: logsCreateOrConnectWithoutUsersInput | logsCreateOrConnectWithoutUsersInput[]
    createMany?: logsCreateManyUsersInputEnvelope
    connect?: logsWhereUniqueInput | logsWhereUniqueInput[]
  }

  export type notificationsCreateNestedManyWithoutUsers_notifications_from_user_idTousersInput = {
    create?: XOR<notificationsCreateWithoutUsers_notifications_from_user_idTousersInput, notificationsUncheckedCreateWithoutUsers_notifications_from_user_idTousersInput> | notificationsCreateWithoutUsers_notifications_from_user_idTousersInput[] | notificationsUncheckedCreateWithoutUsers_notifications_from_user_idTousersInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutUsers_notifications_from_user_idTousersInput | notificationsCreateOrConnectWithoutUsers_notifications_from_user_idTousersInput[]
    createMany?: notificationsCreateManyUsers_notifications_from_user_idTousersInputEnvelope
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
  }

  export type notificationsCreateNestedManyWithoutUsers_notifications_to_user_idTousersInput = {
    create?: XOR<notificationsCreateWithoutUsers_notifications_to_user_idTousersInput, notificationsUncheckedCreateWithoutUsers_notifications_to_user_idTousersInput> | notificationsCreateWithoutUsers_notifications_to_user_idTousersInput[] | notificationsUncheckedCreateWithoutUsers_notifications_to_user_idTousersInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutUsers_notifications_to_user_idTousersInput | notificationsCreateOrConnectWithoutUsers_notifications_to_user_idTousersInput[]
    createMany?: notificationsCreateManyUsers_notifications_to_user_idTousersInputEnvelope
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
  }

  export type user_wishlistCreateNestedManyWithoutUsersInput = {
    create?: XOR<user_wishlistCreateWithoutUsersInput, user_wishlistUncheckedCreateWithoutUsersInput> | user_wishlistCreateWithoutUsersInput[] | user_wishlistUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_wishlistCreateOrConnectWithoutUsersInput | user_wishlistCreateOrConnectWithoutUsersInput[]
    createMany?: user_wishlistCreateManyUsersInputEnvelope
    connect?: user_wishlistWhereUniqueInput | user_wishlistWhereUniqueInput[]
  }

  export type library_cardsCreateNestedManyWithoutUsersInput = {
    create?: XOR<library_cardsCreateWithoutUsersInput, library_cardsUncheckedCreateWithoutUsersInput> | library_cardsCreateWithoutUsersInput[] | library_cardsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: library_cardsCreateOrConnectWithoutUsersInput | library_cardsCreateOrConnectWithoutUsersInput[]
    createMany?: library_cardsCreateManyUsersInputEnvelope
    connect?: library_cardsWhereUniqueInput | library_cardsWhereUniqueInput[]
  }

  export type item_tranUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<item_tranCreateWithoutUsersInput, item_tranUncheckedCreateWithoutUsersInput> | item_tranCreateWithoutUsersInput[] | item_tranUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: item_tranCreateOrConnectWithoutUsersInput | item_tranCreateOrConnectWithoutUsersInput[]
    createMany?: item_tranCreateManyUsersInputEnvelope
    connect?: item_tranWhereUniqueInput | item_tranWhereUniqueInput[]
  }

  export type item_tran_historyUncheckedCreateNestedManyWithoutUsers_item_tran_history_requested_byTousersInput = {
    create?: XOR<item_tran_historyCreateWithoutUsers_item_tran_history_requested_byTousersInput, item_tran_historyUncheckedCreateWithoutUsers_item_tran_history_requested_byTousersInput> | item_tran_historyCreateWithoutUsers_item_tran_history_requested_byTousersInput[] | item_tran_historyUncheckedCreateWithoutUsers_item_tran_history_requested_byTousersInput[]
    connectOrCreate?: item_tran_historyCreateOrConnectWithoutUsers_item_tran_history_requested_byTousersInput | item_tran_historyCreateOrConnectWithoutUsers_item_tran_history_requested_byTousersInput[]
    createMany?: item_tran_historyCreateManyUsers_item_tran_history_requested_byTousersInputEnvelope
    connect?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
  }

  export type item_tran_historyUncheckedCreateNestedManyWithoutUsers_item_tran_history_approved_byTousersInput = {
    create?: XOR<item_tran_historyCreateWithoutUsers_item_tran_history_approved_byTousersInput, item_tran_historyUncheckedCreateWithoutUsers_item_tran_history_approved_byTousersInput> | item_tran_historyCreateWithoutUsers_item_tran_history_approved_byTousersInput[] | item_tran_historyUncheckedCreateWithoutUsers_item_tran_history_approved_byTousersInput[]
    connectOrCreate?: item_tran_historyCreateOrConnectWithoutUsers_item_tran_history_approved_byTousersInput | item_tran_historyCreateOrConnectWithoutUsers_item_tran_history_approved_byTousersInput[]
    createMany?: item_tran_historyCreateManyUsers_item_tran_history_approved_byTousersInputEnvelope
    connect?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
  }

  export type finesUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<finesCreateWithoutUsersInput, finesUncheckedCreateWithoutUsersInput> | finesCreateWithoutUsersInput[] | finesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: finesCreateOrConnectWithoutUsersInput | finesCreateOrConnectWithoutUsersInput[]
    createMany?: finesCreateManyUsersInputEnvelope
    connect?: finesWhereUniqueInput | finesWhereUniqueInput[]
  }

  export type logsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<logsCreateWithoutUsersInput, logsUncheckedCreateWithoutUsersInput> | logsCreateWithoutUsersInput[] | logsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: logsCreateOrConnectWithoutUsersInput | logsCreateOrConnectWithoutUsersInput[]
    createMany?: logsCreateManyUsersInputEnvelope
    connect?: logsWhereUniqueInput | logsWhereUniqueInput[]
  }

  export type notificationsUncheckedCreateNestedManyWithoutUsers_notifications_from_user_idTousersInput = {
    create?: XOR<notificationsCreateWithoutUsers_notifications_from_user_idTousersInput, notificationsUncheckedCreateWithoutUsers_notifications_from_user_idTousersInput> | notificationsCreateWithoutUsers_notifications_from_user_idTousersInput[] | notificationsUncheckedCreateWithoutUsers_notifications_from_user_idTousersInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutUsers_notifications_from_user_idTousersInput | notificationsCreateOrConnectWithoutUsers_notifications_from_user_idTousersInput[]
    createMany?: notificationsCreateManyUsers_notifications_from_user_idTousersInputEnvelope
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
  }

  export type notificationsUncheckedCreateNestedManyWithoutUsers_notifications_to_user_idTousersInput = {
    create?: XOR<notificationsCreateWithoutUsers_notifications_to_user_idTousersInput, notificationsUncheckedCreateWithoutUsers_notifications_to_user_idTousersInput> | notificationsCreateWithoutUsers_notifications_to_user_idTousersInput[] | notificationsUncheckedCreateWithoutUsers_notifications_to_user_idTousersInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutUsers_notifications_to_user_idTousersInput | notificationsCreateOrConnectWithoutUsers_notifications_to_user_idTousersInput[]
    createMany?: notificationsCreateManyUsers_notifications_to_user_idTousersInputEnvelope
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
  }

  export type user_wishlistUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<user_wishlistCreateWithoutUsersInput, user_wishlistUncheckedCreateWithoutUsersInput> | user_wishlistCreateWithoutUsersInput[] | user_wishlistUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_wishlistCreateOrConnectWithoutUsersInput | user_wishlistCreateOrConnectWithoutUsersInput[]
    createMany?: user_wishlistCreateManyUsersInputEnvelope
    connect?: user_wishlistWhereUniqueInput | user_wishlistWhereUniqueInput[]
  }

  export type library_cardsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<library_cardsCreateWithoutUsersInput, library_cardsUncheckedCreateWithoutUsersInput> | library_cardsCreateWithoutUsersInput[] | library_cardsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: library_cardsCreateOrConnectWithoutUsersInput | library_cardsCreateOrConnectWithoutUsersInput[]
    createMany?: library_cardsCreateManyUsersInputEnvelope
    connect?: library_cardsWhereUniqueInput | library_cardsWhereUniqueInput[]
  }

  export type NullableEnumusers_roleFieldUpdateOperationsInput = {
    set?: $Enums.users_role | null
  }

  export type NullableEnumusers_statusFieldUpdateOperationsInput = {
    set?: $Enums.users_status | null
  }

  export type NullableEnumgenderFieldUpdateOperationsInput = {
    set?: $Enums.gender | null
  }

  export type item_tranUpdateManyWithoutUsersNestedInput = {
    create?: XOR<item_tranCreateWithoutUsersInput, item_tranUncheckedCreateWithoutUsersInput> | item_tranCreateWithoutUsersInput[] | item_tranUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: item_tranCreateOrConnectWithoutUsersInput | item_tranCreateOrConnectWithoutUsersInput[]
    upsert?: item_tranUpsertWithWhereUniqueWithoutUsersInput | item_tranUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: item_tranCreateManyUsersInputEnvelope
    set?: item_tranWhereUniqueInput | item_tranWhereUniqueInput[]
    disconnect?: item_tranWhereUniqueInput | item_tranWhereUniqueInput[]
    delete?: item_tranWhereUniqueInput | item_tranWhereUniqueInput[]
    connect?: item_tranWhereUniqueInput | item_tranWhereUniqueInput[]
    update?: item_tranUpdateWithWhereUniqueWithoutUsersInput | item_tranUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: item_tranUpdateManyWithWhereWithoutUsersInput | item_tranUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: item_tranScalarWhereInput | item_tranScalarWhereInput[]
  }

  export type item_tran_historyUpdateManyWithoutUsers_item_tran_history_requested_byTousersNestedInput = {
    create?: XOR<item_tran_historyCreateWithoutUsers_item_tran_history_requested_byTousersInput, item_tran_historyUncheckedCreateWithoutUsers_item_tran_history_requested_byTousersInput> | item_tran_historyCreateWithoutUsers_item_tran_history_requested_byTousersInput[] | item_tran_historyUncheckedCreateWithoutUsers_item_tran_history_requested_byTousersInput[]
    connectOrCreate?: item_tran_historyCreateOrConnectWithoutUsers_item_tran_history_requested_byTousersInput | item_tran_historyCreateOrConnectWithoutUsers_item_tran_history_requested_byTousersInput[]
    upsert?: item_tran_historyUpsertWithWhereUniqueWithoutUsers_item_tran_history_requested_byTousersInput | item_tran_historyUpsertWithWhereUniqueWithoutUsers_item_tran_history_requested_byTousersInput[]
    createMany?: item_tran_historyCreateManyUsers_item_tran_history_requested_byTousersInputEnvelope
    set?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    disconnect?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    delete?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    connect?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    update?: item_tran_historyUpdateWithWhereUniqueWithoutUsers_item_tran_history_requested_byTousersInput | item_tran_historyUpdateWithWhereUniqueWithoutUsers_item_tran_history_requested_byTousersInput[]
    updateMany?: item_tran_historyUpdateManyWithWhereWithoutUsers_item_tran_history_requested_byTousersInput | item_tran_historyUpdateManyWithWhereWithoutUsers_item_tran_history_requested_byTousersInput[]
    deleteMany?: item_tran_historyScalarWhereInput | item_tran_historyScalarWhereInput[]
  }

  export type item_tran_historyUpdateManyWithoutUsers_item_tran_history_approved_byTousersNestedInput = {
    create?: XOR<item_tran_historyCreateWithoutUsers_item_tran_history_approved_byTousersInput, item_tran_historyUncheckedCreateWithoutUsers_item_tran_history_approved_byTousersInput> | item_tran_historyCreateWithoutUsers_item_tran_history_approved_byTousersInput[] | item_tran_historyUncheckedCreateWithoutUsers_item_tran_history_approved_byTousersInput[]
    connectOrCreate?: item_tran_historyCreateOrConnectWithoutUsers_item_tran_history_approved_byTousersInput | item_tran_historyCreateOrConnectWithoutUsers_item_tran_history_approved_byTousersInput[]
    upsert?: item_tran_historyUpsertWithWhereUniqueWithoutUsers_item_tran_history_approved_byTousersInput | item_tran_historyUpsertWithWhereUniqueWithoutUsers_item_tran_history_approved_byTousersInput[]
    createMany?: item_tran_historyCreateManyUsers_item_tran_history_approved_byTousersInputEnvelope
    set?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    disconnect?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    delete?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    connect?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    update?: item_tran_historyUpdateWithWhereUniqueWithoutUsers_item_tran_history_approved_byTousersInput | item_tran_historyUpdateWithWhereUniqueWithoutUsers_item_tran_history_approved_byTousersInput[]
    updateMany?: item_tran_historyUpdateManyWithWhereWithoutUsers_item_tran_history_approved_byTousersInput | item_tran_historyUpdateManyWithWhereWithoutUsers_item_tran_history_approved_byTousersInput[]
    deleteMany?: item_tran_historyScalarWhereInput | item_tran_historyScalarWhereInput[]
  }

  export type finesUpdateManyWithoutUsersNestedInput = {
    create?: XOR<finesCreateWithoutUsersInput, finesUncheckedCreateWithoutUsersInput> | finesCreateWithoutUsersInput[] | finesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: finesCreateOrConnectWithoutUsersInput | finesCreateOrConnectWithoutUsersInput[]
    upsert?: finesUpsertWithWhereUniqueWithoutUsersInput | finesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: finesCreateManyUsersInputEnvelope
    set?: finesWhereUniqueInput | finesWhereUniqueInput[]
    disconnect?: finesWhereUniqueInput | finesWhereUniqueInput[]
    delete?: finesWhereUniqueInput | finesWhereUniqueInput[]
    connect?: finesWhereUniqueInput | finesWhereUniqueInput[]
    update?: finesUpdateWithWhereUniqueWithoutUsersInput | finesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: finesUpdateManyWithWhereWithoutUsersInput | finesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: finesScalarWhereInput | finesScalarWhereInput[]
  }

  export type logsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<logsCreateWithoutUsersInput, logsUncheckedCreateWithoutUsersInput> | logsCreateWithoutUsersInput[] | logsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: logsCreateOrConnectWithoutUsersInput | logsCreateOrConnectWithoutUsersInput[]
    upsert?: logsUpsertWithWhereUniqueWithoutUsersInput | logsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: logsCreateManyUsersInputEnvelope
    set?: logsWhereUniqueInput | logsWhereUniqueInput[]
    disconnect?: logsWhereUniqueInput | logsWhereUniqueInput[]
    delete?: logsWhereUniqueInput | logsWhereUniqueInput[]
    connect?: logsWhereUniqueInput | logsWhereUniqueInput[]
    update?: logsUpdateWithWhereUniqueWithoutUsersInput | logsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: logsUpdateManyWithWhereWithoutUsersInput | logsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: logsScalarWhereInput | logsScalarWhereInput[]
  }

  export type notificationsUpdateManyWithoutUsers_notifications_from_user_idTousersNestedInput = {
    create?: XOR<notificationsCreateWithoutUsers_notifications_from_user_idTousersInput, notificationsUncheckedCreateWithoutUsers_notifications_from_user_idTousersInput> | notificationsCreateWithoutUsers_notifications_from_user_idTousersInput[] | notificationsUncheckedCreateWithoutUsers_notifications_from_user_idTousersInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutUsers_notifications_from_user_idTousersInput | notificationsCreateOrConnectWithoutUsers_notifications_from_user_idTousersInput[]
    upsert?: notificationsUpsertWithWhereUniqueWithoutUsers_notifications_from_user_idTousersInput | notificationsUpsertWithWhereUniqueWithoutUsers_notifications_from_user_idTousersInput[]
    createMany?: notificationsCreateManyUsers_notifications_from_user_idTousersInputEnvelope
    set?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    disconnect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    delete?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    update?: notificationsUpdateWithWhereUniqueWithoutUsers_notifications_from_user_idTousersInput | notificationsUpdateWithWhereUniqueWithoutUsers_notifications_from_user_idTousersInput[]
    updateMany?: notificationsUpdateManyWithWhereWithoutUsers_notifications_from_user_idTousersInput | notificationsUpdateManyWithWhereWithoutUsers_notifications_from_user_idTousersInput[]
    deleteMany?: notificationsScalarWhereInput | notificationsScalarWhereInput[]
  }

  export type notificationsUpdateManyWithoutUsers_notifications_to_user_idTousersNestedInput = {
    create?: XOR<notificationsCreateWithoutUsers_notifications_to_user_idTousersInput, notificationsUncheckedCreateWithoutUsers_notifications_to_user_idTousersInput> | notificationsCreateWithoutUsers_notifications_to_user_idTousersInput[] | notificationsUncheckedCreateWithoutUsers_notifications_to_user_idTousersInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutUsers_notifications_to_user_idTousersInput | notificationsCreateOrConnectWithoutUsers_notifications_to_user_idTousersInput[]
    upsert?: notificationsUpsertWithWhereUniqueWithoutUsers_notifications_to_user_idTousersInput | notificationsUpsertWithWhereUniqueWithoutUsers_notifications_to_user_idTousersInput[]
    createMany?: notificationsCreateManyUsers_notifications_to_user_idTousersInputEnvelope
    set?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    disconnect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    delete?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    update?: notificationsUpdateWithWhereUniqueWithoutUsers_notifications_to_user_idTousersInput | notificationsUpdateWithWhereUniqueWithoutUsers_notifications_to_user_idTousersInput[]
    updateMany?: notificationsUpdateManyWithWhereWithoutUsers_notifications_to_user_idTousersInput | notificationsUpdateManyWithWhereWithoutUsers_notifications_to_user_idTousersInput[]
    deleteMany?: notificationsScalarWhereInput | notificationsScalarWhereInput[]
  }

  export type user_wishlistUpdateManyWithoutUsersNestedInput = {
    create?: XOR<user_wishlistCreateWithoutUsersInput, user_wishlistUncheckedCreateWithoutUsersInput> | user_wishlistCreateWithoutUsersInput[] | user_wishlistUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_wishlistCreateOrConnectWithoutUsersInput | user_wishlistCreateOrConnectWithoutUsersInput[]
    upsert?: user_wishlistUpsertWithWhereUniqueWithoutUsersInput | user_wishlistUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: user_wishlistCreateManyUsersInputEnvelope
    set?: user_wishlistWhereUniqueInput | user_wishlistWhereUniqueInput[]
    disconnect?: user_wishlistWhereUniqueInput | user_wishlistWhereUniqueInput[]
    delete?: user_wishlistWhereUniqueInput | user_wishlistWhereUniqueInput[]
    connect?: user_wishlistWhereUniqueInput | user_wishlistWhereUniqueInput[]
    update?: user_wishlistUpdateWithWhereUniqueWithoutUsersInput | user_wishlistUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: user_wishlistUpdateManyWithWhereWithoutUsersInput | user_wishlistUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: user_wishlistScalarWhereInput | user_wishlistScalarWhereInput[]
  }

  export type library_cardsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<library_cardsCreateWithoutUsersInput, library_cardsUncheckedCreateWithoutUsersInput> | library_cardsCreateWithoutUsersInput[] | library_cardsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: library_cardsCreateOrConnectWithoutUsersInput | library_cardsCreateOrConnectWithoutUsersInput[]
    upsert?: library_cardsUpsertWithWhereUniqueWithoutUsersInput | library_cardsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: library_cardsCreateManyUsersInputEnvelope
    set?: library_cardsWhereUniqueInput | library_cardsWhereUniqueInput[]
    disconnect?: library_cardsWhereUniqueInput | library_cardsWhereUniqueInput[]
    delete?: library_cardsWhereUniqueInput | library_cardsWhereUniqueInput[]
    connect?: library_cardsWhereUniqueInput | library_cardsWhereUniqueInput[]
    update?: library_cardsUpdateWithWhereUniqueWithoutUsersInput | library_cardsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: library_cardsUpdateManyWithWhereWithoutUsersInput | library_cardsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: library_cardsScalarWhereInput | library_cardsScalarWhereInput[]
  }

  export type item_tranUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<item_tranCreateWithoutUsersInput, item_tranUncheckedCreateWithoutUsersInput> | item_tranCreateWithoutUsersInput[] | item_tranUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: item_tranCreateOrConnectWithoutUsersInput | item_tranCreateOrConnectWithoutUsersInput[]
    upsert?: item_tranUpsertWithWhereUniqueWithoutUsersInput | item_tranUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: item_tranCreateManyUsersInputEnvelope
    set?: item_tranWhereUniqueInput | item_tranWhereUniqueInput[]
    disconnect?: item_tranWhereUniqueInput | item_tranWhereUniqueInput[]
    delete?: item_tranWhereUniqueInput | item_tranWhereUniqueInput[]
    connect?: item_tranWhereUniqueInput | item_tranWhereUniqueInput[]
    update?: item_tranUpdateWithWhereUniqueWithoutUsersInput | item_tranUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: item_tranUpdateManyWithWhereWithoutUsersInput | item_tranUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: item_tranScalarWhereInput | item_tranScalarWhereInput[]
  }

  export type item_tran_historyUncheckedUpdateManyWithoutUsers_item_tran_history_requested_byTousersNestedInput = {
    create?: XOR<item_tran_historyCreateWithoutUsers_item_tran_history_requested_byTousersInput, item_tran_historyUncheckedCreateWithoutUsers_item_tran_history_requested_byTousersInput> | item_tran_historyCreateWithoutUsers_item_tran_history_requested_byTousersInput[] | item_tran_historyUncheckedCreateWithoutUsers_item_tran_history_requested_byTousersInput[]
    connectOrCreate?: item_tran_historyCreateOrConnectWithoutUsers_item_tran_history_requested_byTousersInput | item_tran_historyCreateOrConnectWithoutUsers_item_tran_history_requested_byTousersInput[]
    upsert?: item_tran_historyUpsertWithWhereUniqueWithoutUsers_item_tran_history_requested_byTousersInput | item_tran_historyUpsertWithWhereUniqueWithoutUsers_item_tran_history_requested_byTousersInput[]
    createMany?: item_tran_historyCreateManyUsers_item_tran_history_requested_byTousersInputEnvelope
    set?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    disconnect?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    delete?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    connect?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    update?: item_tran_historyUpdateWithWhereUniqueWithoutUsers_item_tran_history_requested_byTousersInput | item_tran_historyUpdateWithWhereUniqueWithoutUsers_item_tran_history_requested_byTousersInput[]
    updateMany?: item_tran_historyUpdateManyWithWhereWithoutUsers_item_tran_history_requested_byTousersInput | item_tran_historyUpdateManyWithWhereWithoutUsers_item_tran_history_requested_byTousersInput[]
    deleteMany?: item_tran_historyScalarWhereInput | item_tran_historyScalarWhereInput[]
  }

  export type item_tran_historyUncheckedUpdateManyWithoutUsers_item_tran_history_approved_byTousersNestedInput = {
    create?: XOR<item_tran_historyCreateWithoutUsers_item_tran_history_approved_byTousersInput, item_tran_historyUncheckedCreateWithoutUsers_item_tran_history_approved_byTousersInput> | item_tran_historyCreateWithoutUsers_item_tran_history_approved_byTousersInput[] | item_tran_historyUncheckedCreateWithoutUsers_item_tran_history_approved_byTousersInput[]
    connectOrCreate?: item_tran_historyCreateOrConnectWithoutUsers_item_tran_history_approved_byTousersInput | item_tran_historyCreateOrConnectWithoutUsers_item_tran_history_approved_byTousersInput[]
    upsert?: item_tran_historyUpsertWithWhereUniqueWithoutUsers_item_tran_history_approved_byTousersInput | item_tran_historyUpsertWithWhereUniqueWithoutUsers_item_tran_history_approved_byTousersInput[]
    createMany?: item_tran_historyCreateManyUsers_item_tran_history_approved_byTousersInputEnvelope
    set?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    disconnect?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    delete?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    connect?: item_tran_historyWhereUniqueInput | item_tran_historyWhereUniqueInput[]
    update?: item_tran_historyUpdateWithWhereUniqueWithoutUsers_item_tran_history_approved_byTousersInput | item_tran_historyUpdateWithWhereUniqueWithoutUsers_item_tran_history_approved_byTousersInput[]
    updateMany?: item_tran_historyUpdateManyWithWhereWithoutUsers_item_tran_history_approved_byTousersInput | item_tran_historyUpdateManyWithWhereWithoutUsers_item_tran_history_approved_byTousersInput[]
    deleteMany?: item_tran_historyScalarWhereInput | item_tran_historyScalarWhereInput[]
  }

  export type finesUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<finesCreateWithoutUsersInput, finesUncheckedCreateWithoutUsersInput> | finesCreateWithoutUsersInput[] | finesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: finesCreateOrConnectWithoutUsersInput | finesCreateOrConnectWithoutUsersInput[]
    upsert?: finesUpsertWithWhereUniqueWithoutUsersInput | finesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: finesCreateManyUsersInputEnvelope
    set?: finesWhereUniqueInput | finesWhereUniqueInput[]
    disconnect?: finesWhereUniqueInput | finesWhereUniqueInput[]
    delete?: finesWhereUniqueInput | finesWhereUniqueInput[]
    connect?: finesWhereUniqueInput | finesWhereUniqueInput[]
    update?: finesUpdateWithWhereUniqueWithoutUsersInput | finesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: finesUpdateManyWithWhereWithoutUsersInput | finesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: finesScalarWhereInput | finesScalarWhereInput[]
  }

  export type logsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<logsCreateWithoutUsersInput, logsUncheckedCreateWithoutUsersInput> | logsCreateWithoutUsersInput[] | logsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: logsCreateOrConnectWithoutUsersInput | logsCreateOrConnectWithoutUsersInput[]
    upsert?: logsUpsertWithWhereUniqueWithoutUsersInput | logsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: logsCreateManyUsersInputEnvelope
    set?: logsWhereUniqueInput | logsWhereUniqueInput[]
    disconnect?: logsWhereUniqueInput | logsWhereUniqueInput[]
    delete?: logsWhereUniqueInput | logsWhereUniqueInput[]
    connect?: logsWhereUniqueInput | logsWhereUniqueInput[]
    update?: logsUpdateWithWhereUniqueWithoutUsersInput | logsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: logsUpdateManyWithWhereWithoutUsersInput | logsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: logsScalarWhereInput | logsScalarWhereInput[]
  }

  export type notificationsUncheckedUpdateManyWithoutUsers_notifications_from_user_idTousersNestedInput = {
    create?: XOR<notificationsCreateWithoutUsers_notifications_from_user_idTousersInput, notificationsUncheckedCreateWithoutUsers_notifications_from_user_idTousersInput> | notificationsCreateWithoutUsers_notifications_from_user_idTousersInput[] | notificationsUncheckedCreateWithoutUsers_notifications_from_user_idTousersInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutUsers_notifications_from_user_idTousersInput | notificationsCreateOrConnectWithoutUsers_notifications_from_user_idTousersInput[]
    upsert?: notificationsUpsertWithWhereUniqueWithoutUsers_notifications_from_user_idTousersInput | notificationsUpsertWithWhereUniqueWithoutUsers_notifications_from_user_idTousersInput[]
    createMany?: notificationsCreateManyUsers_notifications_from_user_idTousersInputEnvelope
    set?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    disconnect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    delete?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    update?: notificationsUpdateWithWhereUniqueWithoutUsers_notifications_from_user_idTousersInput | notificationsUpdateWithWhereUniqueWithoutUsers_notifications_from_user_idTousersInput[]
    updateMany?: notificationsUpdateManyWithWhereWithoutUsers_notifications_from_user_idTousersInput | notificationsUpdateManyWithWhereWithoutUsers_notifications_from_user_idTousersInput[]
    deleteMany?: notificationsScalarWhereInput | notificationsScalarWhereInput[]
  }

  export type notificationsUncheckedUpdateManyWithoutUsers_notifications_to_user_idTousersNestedInput = {
    create?: XOR<notificationsCreateWithoutUsers_notifications_to_user_idTousersInput, notificationsUncheckedCreateWithoutUsers_notifications_to_user_idTousersInput> | notificationsCreateWithoutUsers_notifications_to_user_idTousersInput[] | notificationsUncheckedCreateWithoutUsers_notifications_to_user_idTousersInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutUsers_notifications_to_user_idTousersInput | notificationsCreateOrConnectWithoutUsers_notifications_to_user_idTousersInput[]
    upsert?: notificationsUpsertWithWhereUniqueWithoutUsers_notifications_to_user_idTousersInput | notificationsUpsertWithWhereUniqueWithoutUsers_notifications_to_user_idTousersInput[]
    createMany?: notificationsCreateManyUsers_notifications_to_user_idTousersInputEnvelope
    set?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    disconnect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    delete?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    update?: notificationsUpdateWithWhereUniqueWithoutUsers_notifications_to_user_idTousersInput | notificationsUpdateWithWhereUniqueWithoutUsers_notifications_to_user_idTousersInput[]
    updateMany?: notificationsUpdateManyWithWhereWithoutUsers_notifications_to_user_idTousersInput | notificationsUpdateManyWithWhereWithoutUsers_notifications_to_user_idTousersInput[]
    deleteMany?: notificationsScalarWhereInput | notificationsScalarWhereInput[]
  }

  export type user_wishlistUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<user_wishlistCreateWithoutUsersInput, user_wishlistUncheckedCreateWithoutUsersInput> | user_wishlistCreateWithoutUsersInput[] | user_wishlistUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: user_wishlistCreateOrConnectWithoutUsersInput | user_wishlistCreateOrConnectWithoutUsersInput[]
    upsert?: user_wishlistUpsertWithWhereUniqueWithoutUsersInput | user_wishlistUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: user_wishlistCreateManyUsersInputEnvelope
    set?: user_wishlistWhereUniqueInput | user_wishlistWhereUniqueInput[]
    disconnect?: user_wishlistWhereUniqueInput | user_wishlistWhereUniqueInput[]
    delete?: user_wishlistWhereUniqueInput | user_wishlistWhereUniqueInput[]
    connect?: user_wishlistWhereUniqueInput | user_wishlistWhereUniqueInput[]
    update?: user_wishlistUpdateWithWhereUniqueWithoutUsersInput | user_wishlistUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: user_wishlistUpdateManyWithWhereWithoutUsersInput | user_wishlistUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: user_wishlistScalarWhereInput | user_wishlistScalarWhereInput[]
  }

  export type library_cardsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<library_cardsCreateWithoutUsersInput, library_cardsUncheckedCreateWithoutUsersInput> | library_cardsCreateWithoutUsersInput[] | library_cardsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: library_cardsCreateOrConnectWithoutUsersInput | library_cardsCreateOrConnectWithoutUsersInput[]
    upsert?: library_cardsUpsertWithWhereUniqueWithoutUsersInput | library_cardsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: library_cardsCreateManyUsersInputEnvelope
    set?: library_cardsWhereUniqueInput | library_cardsWhereUniqueInput[]
    disconnect?: library_cardsWhereUniqueInput | library_cardsWhereUniqueInput[]
    delete?: library_cardsWhereUniqueInput | library_cardsWhereUniqueInput[]
    connect?: library_cardsWhereUniqueInput | library_cardsWhereUniqueInput[]
    update?: library_cardsUpdateWithWhereUniqueWithoutUsersInput | library_cardsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: library_cardsUpdateManyWithWhereWithoutUsersInput | library_cardsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: library_cardsScalarWhereInput | library_cardsScalarWhereInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type usersCreateNestedOneWithoutLibrary_cardsInput = {
    create?: XOR<usersCreateWithoutLibrary_cardsInput, usersUncheckedCreateWithoutLibrary_cardsInput>
    connectOrCreate?: usersCreateOrConnectWithoutLibrary_cardsInput
    connect?: usersWhereUniqueInput
  }

  export type Enumcard_statusFieldUpdateOperationsInput = {
    set?: $Enums.card_status
  }

  export type usersUpdateOneWithoutLibrary_cardsNestedInput = {
    create?: XOR<usersCreateWithoutLibrary_cardsInput, usersUncheckedCreateWithoutLibrary_cardsInput>
    connectOrCreate?: usersCreateOrConnectWithoutLibrary_cardsInput
    upsert?: usersUpsertWithoutLibrary_cardsInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutLibrary_cardsInput, usersUpdateWithoutLibrary_cardsInput>, usersUncheckedUpdateWithoutLibrary_cardsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumitem_tran_statusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.item_tran_status | Enumitem_tran_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.item_tran_status[] | null
    notIn?: $Enums.item_tran_status[] | null
    not?: NestedEnumitem_tran_statusNullableFilter<$PrismaModel> | $Enums.item_tran_status | null
  }

  export type NestedEnumrecord_statusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.record_status | Enumrecord_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.record_status[] | null
    notIn?: $Enums.record_status[] | null
    not?: NestedEnumrecord_statusNullableFilter<$PrismaModel> | $Enums.record_status | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumitem_tran_statusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.item_tran_status | Enumitem_tran_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.item_tran_status[] | null
    notIn?: $Enums.item_tran_status[] | null
    not?: NestedEnumitem_tran_statusNullableWithAggregatesFilter<$PrismaModel> | $Enums.item_tran_status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumitem_tran_statusNullableFilter<$PrismaModel>
    _max?: NestedEnumitem_tran_statusNullableFilter<$PrismaModel>
  }

  export type NestedEnumrecord_statusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.record_status | Enumrecord_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.record_status[] | null
    notIn?: $Enums.record_status[] | null
    not?: NestedEnumrecord_statusNullableWithAggregatesFilter<$PrismaModel> | $Enums.record_status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumrecord_statusNullableFilter<$PrismaModel>
    _max?: NestedEnumrecord_statusNullableFilter<$PrismaModel>
  }

  export type NestedEnumitem_tran_history_statusFilter<$PrismaModel = never> = {
    equals?: $Enums.item_tran_history_status | Enumitem_tran_history_statusFieldRefInput<$PrismaModel>
    in?: $Enums.item_tran_history_status[]
    notIn?: $Enums.item_tran_history_status[]
    not?: NestedEnumitem_tran_history_statusFilter<$PrismaModel> | $Enums.item_tran_history_status
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumitem_tran_history_statusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.item_tran_history_status | Enumitem_tran_history_statusFieldRefInput<$PrismaModel>
    in?: $Enums.item_tran_history_status[]
    notIn?: $Enums.item_tran_history_status[]
    not?: NestedEnumitem_tran_history_statusWithAggregatesFilter<$PrismaModel> | $Enums.item_tran_history_status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumitem_tran_history_statusFilter<$PrismaModel>
    _max?: NestedEnumitem_tran_history_statusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumlibrary_item_typeFilter<$PrismaModel = never> = {
    equals?: $Enums.library_item_type | Enumlibrary_item_typeFieldRefInput<$PrismaModel>
    in?: $Enums.library_item_type[]
    notIn?: $Enums.library_item_type[]
    not?: NestedEnumlibrary_item_typeFilter<$PrismaModel> | $Enums.library_item_type
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumlibrary_item_typeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.library_item_type | Enumlibrary_item_typeFieldRefInput<$PrismaModel>
    in?: $Enums.library_item_type[]
    notIn?: $Enums.library_item_type[]
    not?: NestedEnumlibrary_item_typeWithAggregatesFilter<$PrismaModel> | $Enums.library_item_type
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumlibrary_item_typeFilter<$PrismaModel>
    _max?: NestedEnumlibrary_item_typeFilter<$PrismaModel>
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedEnumfines_statusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.fines_status | Enumfines_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.fines_status[] | null
    notIn?: $Enums.fines_status[] | null
    not?: NestedEnumfines_statusNullableFilter<$PrismaModel> | $Enums.fines_status | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedEnumfines_statusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.fines_status | Enumfines_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.fines_status[] | null
    notIn?: $Enums.fines_status[] | null
    not?: NestedEnumfines_statusNullableWithAggregatesFilter<$PrismaModel> | $Enums.fines_status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumfines_statusNullableFilter<$PrismaModel>
    _max?: NestedEnumfines_statusNullableFilter<$PrismaModel>
  }

  export type NestedEnumnotifications_typeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.notifications_type | Enumnotifications_typeFieldRefInput<$PrismaModel> | null
    in?: $Enums.notifications_type[] | null
    notIn?: $Enums.notifications_type[] | null
    not?: NestedEnumnotifications_typeNullableFilter<$PrismaModel> | $Enums.notifications_type | null
  }

  export type NestedEnumnotifications_statusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.notifications_status | Enumnotifications_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.notifications_status[] | null
    notIn?: $Enums.notifications_status[] | null
    not?: NestedEnumnotifications_statusNullableFilter<$PrismaModel> | $Enums.notifications_status | null
  }

  export type NestedEnumnotifications_typeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.notifications_type | Enumnotifications_typeFieldRefInput<$PrismaModel> | null
    in?: $Enums.notifications_type[] | null
    notIn?: $Enums.notifications_type[] | null
    not?: NestedEnumnotifications_typeNullableWithAggregatesFilter<$PrismaModel> | $Enums.notifications_type | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumnotifications_typeNullableFilter<$PrismaModel>
    _max?: NestedEnumnotifications_typeNullableFilter<$PrismaModel>
  }

  export type NestedEnumnotifications_statusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.notifications_status | Enumnotifications_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.notifications_status[] | null
    notIn?: $Enums.notifications_status[] | null
    not?: NestedEnumnotifications_statusNullableWithAggregatesFilter<$PrismaModel> | $Enums.notifications_status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumnotifications_statusNullableFilter<$PrismaModel>
    _max?: NestedEnumnotifications_statusNullableFilter<$PrismaModel>
  }

  export type NestedEnumusers_roleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.users_role | Enumusers_roleFieldRefInput<$PrismaModel> | null
    in?: $Enums.users_role[] | null
    notIn?: $Enums.users_role[] | null
    not?: NestedEnumusers_roleNullableFilter<$PrismaModel> | $Enums.users_role | null
  }

  export type NestedEnumusers_statusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.users_status | Enumusers_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.users_status[] | null
    notIn?: $Enums.users_status[] | null
    not?: NestedEnumusers_statusNullableFilter<$PrismaModel> | $Enums.users_status | null
  }

  export type NestedEnumgenderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.gender | EnumgenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.gender[] | null
    notIn?: $Enums.gender[] | null
    not?: NestedEnumgenderNullableFilter<$PrismaModel> | $Enums.gender | null
  }

  export type NestedEnumusers_roleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.users_role | Enumusers_roleFieldRefInput<$PrismaModel> | null
    in?: $Enums.users_role[] | null
    notIn?: $Enums.users_role[] | null
    not?: NestedEnumusers_roleNullableWithAggregatesFilter<$PrismaModel> | $Enums.users_role | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumusers_roleNullableFilter<$PrismaModel>
    _max?: NestedEnumusers_roleNullableFilter<$PrismaModel>
  }

  export type NestedEnumusers_statusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.users_status | Enumusers_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.users_status[] | null
    notIn?: $Enums.users_status[] | null
    not?: NestedEnumusers_statusNullableWithAggregatesFilter<$PrismaModel> | $Enums.users_status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumusers_statusNullableFilter<$PrismaModel>
    _max?: NestedEnumusers_statusNullableFilter<$PrismaModel>
  }

  export type NestedEnumgenderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.gender | EnumgenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.gender[] | null
    notIn?: $Enums.gender[] | null
    not?: NestedEnumgenderNullableWithAggregatesFilter<$PrismaModel> | $Enums.gender | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumgenderNullableFilter<$PrismaModel>
    _max?: NestedEnumgenderNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumcard_statusFilter<$PrismaModel = never> = {
    equals?: $Enums.card_status | Enumcard_statusFieldRefInput<$PrismaModel>
    in?: $Enums.card_status[]
    notIn?: $Enums.card_status[]
    not?: NestedEnumcard_statusFilter<$PrismaModel> | $Enums.card_status
  }

  export type NestedEnumcard_statusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.card_status | Enumcard_statusFieldRefInput<$PrismaModel>
    in?: $Enums.card_status[]
    notIn?: $Enums.card_status[]
    not?: NestedEnumcard_statusWithAggregatesFilter<$PrismaModel> | $Enums.card_status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumcard_statusFilter<$PrismaModel>
    _max?: NestedEnumcard_statusFilter<$PrismaModel>
  }

  export type library_itemsCreateWithoutItem_tranInput = {
    title?: string | null
    author: string
    isbn?: string | null
    year?: number | null
    genre?: string | null
    image_url?: string | null
    description?: string | null
    librarian_id?: number | null
    item_type?: $Enums.library_item_type
    location?: string | null
    publisher?: string | null
    language?: string | null
    pages?: number | null
    duration?: number | null
    format?: string | null
    subject?: string | null
    keywords?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    record_status?: $Enums.record_status | null
    item_tran_history?: item_tran_historyCreateNestedManyWithoutLibrary_itemsInput
    notifications?: notificationsCreateNestedManyWithoutLibrary_itemsInput
    user_wishlist?: user_wishlistCreateNestedManyWithoutLibrary_itemsInput
  }

  export type library_itemsUncheckedCreateWithoutItem_tranInput = {
    item_id?: number
    title?: string | null
    author: string
    isbn?: string | null
    year?: number | null
    genre?: string | null
    image_url?: string | null
    description?: string | null
    librarian_id?: number | null
    item_type?: $Enums.library_item_type
    location?: string | null
    publisher?: string | null
    language?: string | null
    pages?: number | null
    duration?: number | null
    format?: string | null
    subject?: string | null
    keywords?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    record_status?: $Enums.record_status | null
    item_tran_history?: item_tran_historyUncheckedCreateNestedManyWithoutLibrary_itemsInput
    notifications?: notificationsUncheckedCreateNestedManyWithoutLibrary_itemsInput
    user_wishlist?: user_wishlistUncheckedCreateNestedManyWithoutLibrary_itemsInput
  }

  export type library_itemsCreateOrConnectWithoutItem_tranInput = {
    where: library_itemsWhereUniqueInput
    create: XOR<library_itemsCreateWithoutItem_tranInput, library_itemsUncheckedCreateWithoutItem_tranInput>
  }

  export type usersCreateWithoutItem_tranInput = {
    name?: string | null
    email?: string | null
    password_hash?: string | null
    role?: $Enums.users_role | null
    status?: $Enums.users_status | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    gender?: $Enums.gender | null
    phone_number?: string | null
    birth_date?: Date | string | null
    address?: string | null
    profile_image_url?: string | null
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyCreateNestedManyWithoutUsers_item_tran_history_requested_byTousersInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyCreateNestedManyWithoutUsers_item_tran_history_approved_byTousersInput
    fines?: finesCreateNestedManyWithoutUsersInput
    logs?: logsCreateNestedManyWithoutUsersInput
    notifications_notifications_from_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_from_user_idTousersInput
    notifications_notifications_to_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_to_user_idTousersInput
    user_wishlist?: user_wishlistCreateNestedManyWithoutUsersInput
    library_cards?: library_cardsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutItem_tranInput = {
    user_id?: number
    name?: string | null
    email?: string | null
    password_hash?: string | null
    role?: $Enums.users_role | null
    status?: $Enums.users_status | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    gender?: $Enums.gender | null
    phone_number?: string | null
    birth_date?: Date | string | null
    address?: string | null
    profile_image_url?: string | null
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUncheckedCreateNestedManyWithoutUsers_item_tran_history_requested_byTousersInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUncheckedCreateNestedManyWithoutUsers_item_tran_history_approved_byTousersInput
    fines?: finesUncheckedCreateNestedManyWithoutUsersInput
    logs?: logsUncheckedCreateNestedManyWithoutUsersInput
    notifications_notifications_from_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_from_user_idTousersInput
    notifications_notifications_to_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_to_user_idTousersInput
    user_wishlist?: user_wishlistUncheckedCreateNestedManyWithoutUsersInput
    library_cards?: library_cardsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutItem_tranInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutItem_tranInput, usersUncheckedCreateWithoutItem_tranInput>
  }

  export type item_tran_historyCreateWithoutItem_tranInput = {
    status?: $Enums.item_tran_history_status
    requested_at?: Date | string | null
    approved_at?: Date | string | null
    date_issued?: Date | string | null
    date_due?: Date | string | null
    date_returned?: Date | string | null
    remarks?: string | null
    library_items?: library_itemsCreateNestedOneWithoutItem_tran_historyInput
    users_item_tran_history_requested_byTousers?: usersCreateNestedOneWithoutItem_tran_history_item_tran_history_requested_byTousersInput
    users_item_tran_history_approved_byTousers?: usersCreateNestedOneWithoutItem_tran_history_item_tran_history_approved_byTousersInput
    fines?: finesCreateNestedManyWithoutItem_tran_historyInput
  }

  export type item_tran_historyUncheckedCreateWithoutItem_tranInput = {
    id?: number
    item_id?: number | null
    status?: $Enums.item_tran_history_status
    requested_by?: number | null
    approved_by?: number | null
    requested_at?: Date | string | null
    approved_at?: Date | string | null
    date_issued?: Date | string | null
    date_due?: Date | string | null
    date_returned?: Date | string | null
    remarks?: string | null
    fines?: finesUncheckedCreateNestedManyWithoutItem_tran_historyInput
  }

  export type item_tran_historyCreateOrConnectWithoutItem_tranInput = {
    where: item_tran_historyWhereUniqueInput
    create: XOR<item_tran_historyCreateWithoutItem_tranInput, item_tran_historyUncheckedCreateWithoutItem_tranInput>
  }

  export type item_tran_historyCreateManyItem_tranInputEnvelope = {
    data: item_tran_historyCreateManyItem_tranInput | item_tran_historyCreateManyItem_tranInput[]
    skipDuplicates?: boolean
  }

  export type notificationsCreateWithoutItem_tranInput = {
    type?: $Enums.notifications_type | null
    reservation_id?: number | null
    status?: $Enums.notifications_status | null
    message?: string | null
    created_at?: Date | string | null
    resolved_at?: Date | string | null
    library_items?: library_itemsCreateNestedOneWithoutNotificationsInput
    users_notifications_from_user_idTousers?: usersCreateNestedOneWithoutNotifications_notifications_from_user_idTousersInput
    users_notifications_to_user_idTousers?: usersCreateNestedOneWithoutNotifications_notifications_to_user_idTousersInput
  }

  export type notificationsUncheckedCreateWithoutItem_tranInput = {
    notification_id?: number
    type?: $Enums.notifications_type | null
    item_id?: number | null
    from_user_id?: number | null
    to_user_id?: number | null
    reservation_id?: number | null
    status?: $Enums.notifications_status | null
    message?: string | null
    created_at?: Date | string | null
    resolved_at?: Date | string | null
  }

  export type notificationsCreateOrConnectWithoutItem_tranInput = {
    where: notificationsWhereUniqueInput
    create: XOR<notificationsCreateWithoutItem_tranInput, notificationsUncheckedCreateWithoutItem_tranInput>
  }

  export type notificationsCreateManyItem_tranInputEnvelope = {
    data: notificationsCreateManyItem_tranInput | notificationsCreateManyItem_tranInput[]
    skipDuplicates?: boolean
  }

  export type library_itemsUpsertWithoutItem_tranInput = {
    update: XOR<library_itemsUpdateWithoutItem_tranInput, library_itemsUncheckedUpdateWithoutItem_tranInput>
    create: XOR<library_itemsCreateWithoutItem_tranInput, library_itemsUncheckedCreateWithoutItem_tranInput>
    where?: library_itemsWhereInput
  }

  export type library_itemsUpdateToOneWithWhereWithoutItem_tranInput = {
    where?: library_itemsWhereInput
    data: XOR<library_itemsUpdateWithoutItem_tranInput, library_itemsUncheckedUpdateWithoutItem_tranInput>
  }

  export type library_itemsUpdateWithoutItem_tranInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: StringFieldUpdateOperationsInput | string
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    librarian_id?: NullableIntFieldUpdateOperationsInput | number | null
    item_type?: Enumlibrary_item_typeFieldUpdateOperationsInput | $Enums.library_item_type
    location?: NullableStringFieldUpdateOperationsInput | string | null
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    pages?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    format?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    record_status?: NullableEnumrecord_statusFieldUpdateOperationsInput | $Enums.record_status | null
    item_tran_history?: item_tran_historyUpdateManyWithoutLibrary_itemsNestedInput
    notifications?: notificationsUpdateManyWithoutLibrary_itemsNestedInput
    user_wishlist?: user_wishlistUpdateManyWithoutLibrary_itemsNestedInput
  }

  export type library_itemsUncheckedUpdateWithoutItem_tranInput = {
    item_id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: StringFieldUpdateOperationsInput | string
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    librarian_id?: NullableIntFieldUpdateOperationsInput | number | null
    item_type?: Enumlibrary_item_typeFieldUpdateOperationsInput | $Enums.library_item_type
    location?: NullableStringFieldUpdateOperationsInput | string | null
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    pages?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    format?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    record_status?: NullableEnumrecord_statusFieldUpdateOperationsInput | $Enums.record_status | null
    item_tran_history?: item_tran_historyUncheckedUpdateManyWithoutLibrary_itemsNestedInput
    notifications?: notificationsUncheckedUpdateManyWithoutLibrary_itemsNestedInput
    user_wishlist?: user_wishlistUncheckedUpdateManyWithoutLibrary_itemsNestedInput
  }

  export type usersUpsertWithoutItem_tranInput = {
    update: XOR<usersUpdateWithoutItem_tranInput, usersUncheckedUpdateWithoutItem_tranInput>
    create: XOR<usersCreateWithoutItem_tranInput, usersUncheckedCreateWithoutItem_tranInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutItem_tranInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutItem_tranInput, usersUncheckedUpdateWithoutItem_tranInput>
  }

  export type usersUpdateWithoutItem_tranInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    status?: NullableEnumusers_statusFieldUpdateOperationsInput | $Enums.users_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumgenderFieldUpdateOperationsInput | $Enums.gender | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUpdateManyWithoutUsers_item_tran_history_requested_byTousersNestedInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUpdateManyWithoutUsers_item_tran_history_approved_byTousersNestedInput
    fines?: finesUpdateManyWithoutUsersNestedInput
    logs?: logsUpdateManyWithoutUsersNestedInput
    notifications_notifications_from_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_from_user_idTousersNestedInput
    notifications_notifications_to_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_to_user_idTousersNestedInput
    user_wishlist?: user_wishlistUpdateManyWithoutUsersNestedInput
    library_cards?: library_cardsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutItem_tranInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    status?: NullableEnumusers_statusFieldUpdateOperationsInput | $Enums.users_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumgenderFieldUpdateOperationsInput | $Enums.gender | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUncheckedUpdateManyWithoutUsers_item_tran_history_requested_byTousersNestedInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUncheckedUpdateManyWithoutUsers_item_tran_history_approved_byTousersNestedInput
    fines?: finesUncheckedUpdateManyWithoutUsersNestedInput
    logs?: logsUncheckedUpdateManyWithoutUsersNestedInput
    notifications_notifications_from_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_from_user_idTousersNestedInput
    notifications_notifications_to_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_to_user_idTousersNestedInput
    user_wishlist?: user_wishlistUncheckedUpdateManyWithoutUsersNestedInput
    library_cards?: library_cardsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type item_tran_historyUpsertWithWhereUniqueWithoutItem_tranInput = {
    where: item_tran_historyWhereUniqueInput
    update: XOR<item_tran_historyUpdateWithoutItem_tranInput, item_tran_historyUncheckedUpdateWithoutItem_tranInput>
    create: XOR<item_tran_historyCreateWithoutItem_tranInput, item_tran_historyUncheckedCreateWithoutItem_tranInput>
  }

  export type item_tran_historyUpdateWithWhereUniqueWithoutItem_tranInput = {
    where: item_tran_historyWhereUniqueInput
    data: XOR<item_tran_historyUpdateWithoutItem_tranInput, item_tran_historyUncheckedUpdateWithoutItem_tranInput>
  }

  export type item_tran_historyUpdateManyWithWhereWithoutItem_tranInput = {
    where: item_tran_historyScalarWhereInput
    data: XOR<item_tran_historyUpdateManyMutationInput, item_tran_historyUncheckedUpdateManyWithoutItem_tranInput>
  }

  export type item_tran_historyScalarWhereInput = {
    AND?: item_tran_historyScalarWhereInput | item_tran_historyScalarWhereInput[]
    OR?: item_tran_historyScalarWhereInput[]
    NOT?: item_tran_historyScalarWhereInput | item_tran_historyScalarWhereInput[]
    id?: IntFilter<"item_tran_history"> | number
    item_id?: IntNullableFilter<"item_tran_history"> | number | null
    tran_id?: IntNullableFilter<"item_tran_history"> | number | null
    status?: Enumitem_tran_history_statusFilter<"item_tran_history"> | $Enums.item_tran_history_status
    requested_by?: IntNullableFilter<"item_tran_history"> | number | null
    approved_by?: IntNullableFilter<"item_tran_history"> | number | null
    requested_at?: DateTimeNullableFilter<"item_tran_history"> | Date | string | null
    approved_at?: DateTimeNullableFilter<"item_tran_history"> | Date | string | null
    date_issued?: DateTimeNullableFilter<"item_tran_history"> | Date | string | null
    date_due?: DateTimeNullableFilter<"item_tran_history"> | Date | string | null
    date_returned?: DateTimeNullableFilter<"item_tran_history"> | Date | string | null
    remarks?: StringNullableFilter<"item_tran_history"> | string | null
  }

  export type notificationsUpsertWithWhereUniqueWithoutItem_tranInput = {
    where: notificationsWhereUniqueInput
    update: XOR<notificationsUpdateWithoutItem_tranInput, notificationsUncheckedUpdateWithoutItem_tranInput>
    create: XOR<notificationsCreateWithoutItem_tranInput, notificationsUncheckedCreateWithoutItem_tranInput>
  }

  export type notificationsUpdateWithWhereUniqueWithoutItem_tranInput = {
    where: notificationsWhereUniqueInput
    data: XOR<notificationsUpdateWithoutItem_tranInput, notificationsUncheckedUpdateWithoutItem_tranInput>
  }

  export type notificationsUpdateManyWithWhereWithoutItem_tranInput = {
    where: notificationsScalarWhereInput
    data: XOR<notificationsUpdateManyMutationInput, notificationsUncheckedUpdateManyWithoutItem_tranInput>
  }

  export type notificationsScalarWhereInput = {
    AND?: notificationsScalarWhereInput | notificationsScalarWhereInput[]
    OR?: notificationsScalarWhereInput[]
    NOT?: notificationsScalarWhereInput | notificationsScalarWhereInput[]
    notification_id?: IntFilter<"notifications"> | number
    type?: Enumnotifications_typeNullableFilter<"notifications"> | $Enums.notifications_type | null
    item_id?: IntNullableFilter<"notifications"> | number | null
    from_user_id?: IntNullableFilter<"notifications"> | number | null
    to_user_id?: IntNullableFilter<"notifications"> | number | null
    tran_id?: IntNullableFilter<"notifications"> | number | null
    reservation_id?: IntNullableFilter<"notifications"> | number | null
    status?: Enumnotifications_statusNullableFilter<"notifications"> | $Enums.notifications_status | null
    message?: StringNullableFilter<"notifications"> | string | null
    created_at?: DateTimeNullableFilter<"notifications"> | Date | string | null
    resolved_at?: DateTimeNullableFilter<"notifications"> | Date | string | null
  }

  export type library_itemsCreateWithoutItem_tran_historyInput = {
    title?: string | null
    author: string
    isbn?: string | null
    year?: number | null
    genre?: string | null
    image_url?: string | null
    description?: string | null
    librarian_id?: number | null
    item_type?: $Enums.library_item_type
    location?: string | null
    publisher?: string | null
    language?: string | null
    pages?: number | null
    duration?: number | null
    format?: string | null
    subject?: string | null
    keywords?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    record_status?: $Enums.record_status | null
    item_tran?: item_tranCreateNestedManyWithoutLibrary_itemsInput
    notifications?: notificationsCreateNestedManyWithoutLibrary_itemsInput
    user_wishlist?: user_wishlistCreateNestedManyWithoutLibrary_itemsInput
  }

  export type library_itemsUncheckedCreateWithoutItem_tran_historyInput = {
    item_id?: number
    title?: string | null
    author: string
    isbn?: string | null
    year?: number | null
    genre?: string | null
    image_url?: string | null
    description?: string | null
    librarian_id?: number | null
    item_type?: $Enums.library_item_type
    location?: string | null
    publisher?: string | null
    language?: string | null
    pages?: number | null
    duration?: number | null
    format?: string | null
    subject?: string | null
    keywords?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    record_status?: $Enums.record_status | null
    item_tran?: item_tranUncheckedCreateNestedManyWithoutLibrary_itemsInput
    notifications?: notificationsUncheckedCreateNestedManyWithoutLibrary_itemsInput
    user_wishlist?: user_wishlistUncheckedCreateNestedManyWithoutLibrary_itemsInput
  }

  export type library_itemsCreateOrConnectWithoutItem_tran_historyInput = {
    where: library_itemsWhereUniqueInput
    create: XOR<library_itemsCreateWithoutItem_tran_historyInput, library_itemsUncheckedCreateWithoutItem_tran_historyInput>
  }

  export type item_tranCreateWithoutItem_tran_historyInput = {
    status?: $Enums.item_tran_status | null
    record_status?: $Enums.record_status | null
    library_items?: library_itemsCreateNestedOneWithoutItem_tranInput
    users?: usersCreateNestedOneWithoutItem_tranInput
    notifications?: notificationsCreateNestedManyWithoutItem_tranInput
  }

  export type item_tranUncheckedCreateWithoutItem_tran_historyInput = {
    tran_id?: number
    item_id?: number | null
    status?: $Enums.item_tran_status | null
    user_id?: number | null
    record_status?: $Enums.record_status | null
    notifications?: notificationsUncheckedCreateNestedManyWithoutItem_tranInput
  }

  export type item_tranCreateOrConnectWithoutItem_tran_historyInput = {
    where: item_tranWhereUniqueInput
    create: XOR<item_tranCreateWithoutItem_tran_historyInput, item_tranUncheckedCreateWithoutItem_tran_historyInput>
  }

  export type usersCreateWithoutItem_tran_history_item_tran_history_requested_byTousersInput = {
    name?: string | null
    email?: string | null
    password_hash?: string | null
    role?: $Enums.users_role | null
    status?: $Enums.users_status | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    gender?: $Enums.gender | null
    phone_number?: string | null
    birth_date?: Date | string | null
    address?: string | null
    profile_image_url?: string | null
    item_tran?: item_tranCreateNestedManyWithoutUsersInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyCreateNestedManyWithoutUsers_item_tran_history_approved_byTousersInput
    fines?: finesCreateNestedManyWithoutUsersInput
    logs?: logsCreateNestedManyWithoutUsersInput
    notifications_notifications_from_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_from_user_idTousersInput
    notifications_notifications_to_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_to_user_idTousersInput
    user_wishlist?: user_wishlistCreateNestedManyWithoutUsersInput
    library_cards?: library_cardsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutItem_tran_history_item_tran_history_requested_byTousersInput = {
    user_id?: number
    name?: string | null
    email?: string | null
    password_hash?: string | null
    role?: $Enums.users_role | null
    status?: $Enums.users_status | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    gender?: $Enums.gender | null
    phone_number?: string | null
    birth_date?: Date | string | null
    address?: string | null
    profile_image_url?: string | null
    item_tran?: item_tranUncheckedCreateNestedManyWithoutUsersInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUncheckedCreateNestedManyWithoutUsers_item_tran_history_approved_byTousersInput
    fines?: finesUncheckedCreateNestedManyWithoutUsersInput
    logs?: logsUncheckedCreateNestedManyWithoutUsersInput
    notifications_notifications_from_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_from_user_idTousersInput
    notifications_notifications_to_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_to_user_idTousersInput
    user_wishlist?: user_wishlistUncheckedCreateNestedManyWithoutUsersInput
    library_cards?: library_cardsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutItem_tran_history_item_tran_history_requested_byTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutItem_tran_history_item_tran_history_requested_byTousersInput, usersUncheckedCreateWithoutItem_tran_history_item_tran_history_requested_byTousersInput>
  }

  export type usersCreateWithoutItem_tran_history_item_tran_history_approved_byTousersInput = {
    name?: string | null
    email?: string | null
    password_hash?: string | null
    role?: $Enums.users_role | null
    status?: $Enums.users_status | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    gender?: $Enums.gender | null
    phone_number?: string | null
    birth_date?: Date | string | null
    address?: string | null
    profile_image_url?: string | null
    item_tran?: item_tranCreateNestedManyWithoutUsersInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyCreateNestedManyWithoutUsers_item_tran_history_requested_byTousersInput
    fines?: finesCreateNestedManyWithoutUsersInput
    logs?: logsCreateNestedManyWithoutUsersInput
    notifications_notifications_from_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_from_user_idTousersInput
    notifications_notifications_to_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_to_user_idTousersInput
    user_wishlist?: user_wishlistCreateNestedManyWithoutUsersInput
    library_cards?: library_cardsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutItem_tran_history_item_tran_history_approved_byTousersInput = {
    user_id?: number
    name?: string | null
    email?: string | null
    password_hash?: string | null
    role?: $Enums.users_role | null
    status?: $Enums.users_status | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    gender?: $Enums.gender | null
    phone_number?: string | null
    birth_date?: Date | string | null
    address?: string | null
    profile_image_url?: string | null
    item_tran?: item_tranUncheckedCreateNestedManyWithoutUsersInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUncheckedCreateNestedManyWithoutUsers_item_tran_history_requested_byTousersInput
    fines?: finesUncheckedCreateNestedManyWithoutUsersInput
    logs?: logsUncheckedCreateNestedManyWithoutUsersInput
    notifications_notifications_from_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_from_user_idTousersInput
    notifications_notifications_to_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_to_user_idTousersInput
    user_wishlist?: user_wishlistUncheckedCreateNestedManyWithoutUsersInput
    library_cards?: library_cardsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutItem_tran_history_item_tran_history_approved_byTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutItem_tran_history_item_tran_history_approved_byTousersInput, usersUncheckedCreateWithoutItem_tran_history_item_tran_history_approved_byTousersInput>
  }

  export type finesCreateWithoutItem_tran_historyInput = {
    amount?: Decimal | DecimalJsLike | number | string | null
    reason?: string | null
    status?: $Enums.fines_status | null
    created_at?: Date | string | null
    paid_at?: Date | string | null
    users?: usersCreateNestedOneWithoutFinesInput
  }

  export type finesUncheckedCreateWithoutItem_tran_historyInput = {
    fine_id?: number
    user_id?: number | null
    amount?: Decimal | DecimalJsLike | number | string | null
    reason?: string | null
    status?: $Enums.fines_status | null
    created_at?: Date | string | null
    paid_at?: Date | string | null
  }

  export type finesCreateOrConnectWithoutItem_tran_historyInput = {
    where: finesWhereUniqueInput
    create: XOR<finesCreateWithoutItem_tran_historyInput, finesUncheckedCreateWithoutItem_tran_historyInput>
  }

  export type finesCreateManyItem_tran_historyInputEnvelope = {
    data: finesCreateManyItem_tran_historyInput | finesCreateManyItem_tran_historyInput[]
    skipDuplicates?: boolean
  }

  export type library_itemsUpsertWithoutItem_tran_historyInput = {
    update: XOR<library_itemsUpdateWithoutItem_tran_historyInput, library_itemsUncheckedUpdateWithoutItem_tran_historyInput>
    create: XOR<library_itemsCreateWithoutItem_tran_historyInput, library_itemsUncheckedCreateWithoutItem_tran_historyInput>
    where?: library_itemsWhereInput
  }

  export type library_itemsUpdateToOneWithWhereWithoutItem_tran_historyInput = {
    where?: library_itemsWhereInput
    data: XOR<library_itemsUpdateWithoutItem_tran_historyInput, library_itemsUncheckedUpdateWithoutItem_tran_historyInput>
  }

  export type library_itemsUpdateWithoutItem_tran_historyInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: StringFieldUpdateOperationsInput | string
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    librarian_id?: NullableIntFieldUpdateOperationsInput | number | null
    item_type?: Enumlibrary_item_typeFieldUpdateOperationsInput | $Enums.library_item_type
    location?: NullableStringFieldUpdateOperationsInput | string | null
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    pages?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    format?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    record_status?: NullableEnumrecord_statusFieldUpdateOperationsInput | $Enums.record_status | null
    item_tran?: item_tranUpdateManyWithoutLibrary_itemsNestedInput
    notifications?: notificationsUpdateManyWithoutLibrary_itemsNestedInput
    user_wishlist?: user_wishlistUpdateManyWithoutLibrary_itemsNestedInput
  }

  export type library_itemsUncheckedUpdateWithoutItem_tran_historyInput = {
    item_id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: StringFieldUpdateOperationsInput | string
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    librarian_id?: NullableIntFieldUpdateOperationsInput | number | null
    item_type?: Enumlibrary_item_typeFieldUpdateOperationsInput | $Enums.library_item_type
    location?: NullableStringFieldUpdateOperationsInput | string | null
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    pages?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    format?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    record_status?: NullableEnumrecord_statusFieldUpdateOperationsInput | $Enums.record_status | null
    item_tran?: item_tranUncheckedUpdateManyWithoutLibrary_itemsNestedInput
    notifications?: notificationsUncheckedUpdateManyWithoutLibrary_itemsNestedInput
    user_wishlist?: user_wishlistUncheckedUpdateManyWithoutLibrary_itemsNestedInput
  }

  export type item_tranUpsertWithoutItem_tran_historyInput = {
    update: XOR<item_tranUpdateWithoutItem_tran_historyInput, item_tranUncheckedUpdateWithoutItem_tran_historyInput>
    create: XOR<item_tranCreateWithoutItem_tran_historyInput, item_tranUncheckedCreateWithoutItem_tran_historyInput>
    where?: item_tranWhereInput
  }

  export type item_tranUpdateToOneWithWhereWithoutItem_tran_historyInput = {
    where?: item_tranWhereInput
    data: XOR<item_tranUpdateWithoutItem_tran_historyInput, item_tranUncheckedUpdateWithoutItem_tran_historyInput>
  }

  export type item_tranUpdateWithoutItem_tran_historyInput = {
    status?: NullableEnumitem_tran_statusFieldUpdateOperationsInput | $Enums.item_tran_status | null
    record_status?: NullableEnumrecord_statusFieldUpdateOperationsInput | $Enums.record_status | null
    library_items?: library_itemsUpdateOneWithoutItem_tranNestedInput
    users?: usersUpdateOneWithoutItem_tranNestedInput
    notifications?: notificationsUpdateManyWithoutItem_tranNestedInput
  }

  export type item_tranUncheckedUpdateWithoutItem_tran_historyInput = {
    tran_id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumitem_tran_statusFieldUpdateOperationsInput | $Enums.item_tran_status | null
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    record_status?: NullableEnumrecord_statusFieldUpdateOperationsInput | $Enums.record_status | null
    notifications?: notificationsUncheckedUpdateManyWithoutItem_tranNestedInput
  }

  export type usersUpsertWithoutItem_tran_history_item_tran_history_requested_byTousersInput = {
    update: XOR<usersUpdateWithoutItem_tran_history_item_tran_history_requested_byTousersInput, usersUncheckedUpdateWithoutItem_tran_history_item_tran_history_requested_byTousersInput>
    create: XOR<usersCreateWithoutItem_tran_history_item_tran_history_requested_byTousersInput, usersUncheckedCreateWithoutItem_tran_history_item_tran_history_requested_byTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutItem_tran_history_item_tran_history_requested_byTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutItem_tran_history_item_tran_history_requested_byTousersInput, usersUncheckedUpdateWithoutItem_tran_history_item_tran_history_requested_byTousersInput>
  }

  export type usersUpdateWithoutItem_tran_history_item_tran_history_requested_byTousersInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    status?: NullableEnumusers_statusFieldUpdateOperationsInput | $Enums.users_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumgenderFieldUpdateOperationsInput | $Enums.gender | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    item_tran?: item_tranUpdateManyWithoutUsersNestedInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUpdateManyWithoutUsers_item_tran_history_approved_byTousersNestedInput
    fines?: finesUpdateManyWithoutUsersNestedInput
    logs?: logsUpdateManyWithoutUsersNestedInput
    notifications_notifications_from_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_from_user_idTousersNestedInput
    notifications_notifications_to_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_to_user_idTousersNestedInput
    user_wishlist?: user_wishlistUpdateManyWithoutUsersNestedInput
    library_cards?: library_cardsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutItem_tran_history_item_tran_history_requested_byTousersInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    status?: NullableEnumusers_statusFieldUpdateOperationsInput | $Enums.users_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumgenderFieldUpdateOperationsInput | $Enums.gender | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    item_tran?: item_tranUncheckedUpdateManyWithoutUsersNestedInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUncheckedUpdateManyWithoutUsers_item_tran_history_approved_byTousersNestedInput
    fines?: finesUncheckedUpdateManyWithoutUsersNestedInput
    logs?: logsUncheckedUpdateManyWithoutUsersNestedInput
    notifications_notifications_from_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_from_user_idTousersNestedInput
    notifications_notifications_to_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_to_user_idTousersNestedInput
    user_wishlist?: user_wishlistUncheckedUpdateManyWithoutUsersNestedInput
    library_cards?: library_cardsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersUpsertWithoutItem_tran_history_item_tran_history_approved_byTousersInput = {
    update: XOR<usersUpdateWithoutItem_tran_history_item_tran_history_approved_byTousersInput, usersUncheckedUpdateWithoutItem_tran_history_item_tran_history_approved_byTousersInput>
    create: XOR<usersCreateWithoutItem_tran_history_item_tran_history_approved_byTousersInput, usersUncheckedCreateWithoutItem_tran_history_item_tran_history_approved_byTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutItem_tran_history_item_tran_history_approved_byTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutItem_tran_history_item_tran_history_approved_byTousersInput, usersUncheckedUpdateWithoutItem_tran_history_item_tran_history_approved_byTousersInput>
  }

  export type usersUpdateWithoutItem_tran_history_item_tran_history_approved_byTousersInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    status?: NullableEnumusers_statusFieldUpdateOperationsInput | $Enums.users_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumgenderFieldUpdateOperationsInput | $Enums.gender | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    item_tran?: item_tranUpdateManyWithoutUsersNestedInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUpdateManyWithoutUsers_item_tran_history_requested_byTousersNestedInput
    fines?: finesUpdateManyWithoutUsersNestedInput
    logs?: logsUpdateManyWithoutUsersNestedInput
    notifications_notifications_from_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_from_user_idTousersNestedInput
    notifications_notifications_to_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_to_user_idTousersNestedInput
    user_wishlist?: user_wishlistUpdateManyWithoutUsersNestedInput
    library_cards?: library_cardsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutItem_tran_history_item_tran_history_approved_byTousersInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    status?: NullableEnumusers_statusFieldUpdateOperationsInput | $Enums.users_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumgenderFieldUpdateOperationsInput | $Enums.gender | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    item_tran?: item_tranUncheckedUpdateManyWithoutUsersNestedInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUncheckedUpdateManyWithoutUsers_item_tran_history_requested_byTousersNestedInput
    fines?: finesUncheckedUpdateManyWithoutUsersNestedInput
    logs?: logsUncheckedUpdateManyWithoutUsersNestedInput
    notifications_notifications_from_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_from_user_idTousersNestedInput
    notifications_notifications_to_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_to_user_idTousersNestedInput
    user_wishlist?: user_wishlistUncheckedUpdateManyWithoutUsersNestedInput
    library_cards?: library_cardsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type finesUpsertWithWhereUniqueWithoutItem_tran_historyInput = {
    where: finesWhereUniqueInput
    update: XOR<finesUpdateWithoutItem_tran_historyInput, finesUncheckedUpdateWithoutItem_tran_historyInput>
    create: XOR<finesCreateWithoutItem_tran_historyInput, finesUncheckedCreateWithoutItem_tran_historyInput>
  }

  export type finesUpdateWithWhereUniqueWithoutItem_tran_historyInput = {
    where: finesWhereUniqueInput
    data: XOR<finesUpdateWithoutItem_tran_historyInput, finesUncheckedUpdateWithoutItem_tran_historyInput>
  }

  export type finesUpdateManyWithWhereWithoutItem_tran_historyInput = {
    where: finesScalarWhereInput
    data: XOR<finesUpdateManyMutationInput, finesUncheckedUpdateManyWithoutItem_tran_historyInput>
  }

  export type finesScalarWhereInput = {
    AND?: finesScalarWhereInput | finesScalarWhereInput[]
    OR?: finesScalarWhereInput[]
    NOT?: finesScalarWhereInput | finesScalarWhereInput[]
    fine_id?: IntFilter<"fines"> | number
    user_id?: IntNullableFilter<"fines"> | number | null
    item_tran_historyId?: IntNullableFilter<"fines"> | number | null
    amount?: DecimalNullableFilter<"fines"> | Decimal | DecimalJsLike | number | string | null
    reason?: StringNullableFilter<"fines"> | string | null
    status?: Enumfines_statusNullableFilter<"fines"> | $Enums.fines_status | null
    created_at?: DateTimeNullableFilter<"fines"> | Date | string | null
    paid_at?: DateTimeNullableFilter<"fines"> | Date | string | null
  }

  export type item_tranCreateWithoutLibrary_itemsInput = {
    status?: $Enums.item_tran_status | null
    record_status?: $Enums.record_status | null
    users?: usersCreateNestedOneWithoutItem_tranInput
    item_tran_history?: item_tran_historyCreateNestedManyWithoutItem_tranInput
    notifications?: notificationsCreateNestedManyWithoutItem_tranInput
  }

  export type item_tranUncheckedCreateWithoutLibrary_itemsInput = {
    tran_id?: number
    status?: $Enums.item_tran_status | null
    user_id?: number | null
    record_status?: $Enums.record_status | null
    item_tran_history?: item_tran_historyUncheckedCreateNestedManyWithoutItem_tranInput
    notifications?: notificationsUncheckedCreateNestedManyWithoutItem_tranInput
  }

  export type item_tranCreateOrConnectWithoutLibrary_itemsInput = {
    where: item_tranWhereUniqueInput
    create: XOR<item_tranCreateWithoutLibrary_itemsInput, item_tranUncheckedCreateWithoutLibrary_itemsInput>
  }

  export type item_tranCreateManyLibrary_itemsInputEnvelope = {
    data: item_tranCreateManyLibrary_itemsInput | item_tranCreateManyLibrary_itemsInput[]
    skipDuplicates?: boolean
  }

  export type item_tran_historyCreateWithoutLibrary_itemsInput = {
    status?: $Enums.item_tran_history_status
    requested_at?: Date | string | null
    approved_at?: Date | string | null
    date_issued?: Date | string | null
    date_due?: Date | string | null
    date_returned?: Date | string | null
    remarks?: string | null
    item_tran?: item_tranCreateNestedOneWithoutItem_tran_historyInput
    users_item_tran_history_requested_byTousers?: usersCreateNestedOneWithoutItem_tran_history_item_tran_history_requested_byTousersInput
    users_item_tran_history_approved_byTousers?: usersCreateNestedOneWithoutItem_tran_history_item_tran_history_approved_byTousersInput
    fines?: finesCreateNestedManyWithoutItem_tran_historyInput
  }

  export type item_tran_historyUncheckedCreateWithoutLibrary_itemsInput = {
    id?: number
    tran_id?: number | null
    status?: $Enums.item_tran_history_status
    requested_by?: number | null
    approved_by?: number | null
    requested_at?: Date | string | null
    approved_at?: Date | string | null
    date_issued?: Date | string | null
    date_due?: Date | string | null
    date_returned?: Date | string | null
    remarks?: string | null
    fines?: finesUncheckedCreateNestedManyWithoutItem_tran_historyInput
  }

  export type item_tran_historyCreateOrConnectWithoutLibrary_itemsInput = {
    where: item_tran_historyWhereUniqueInput
    create: XOR<item_tran_historyCreateWithoutLibrary_itemsInput, item_tran_historyUncheckedCreateWithoutLibrary_itemsInput>
  }

  export type item_tran_historyCreateManyLibrary_itemsInputEnvelope = {
    data: item_tran_historyCreateManyLibrary_itemsInput | item_tran_historyCreateManyLibrary_itemsInput[]
    skipDuplicates?: boolean
  }

  export type notificationsCreateWithoutLibrary_itemsInput = {
    type?: $Enums.notifications_type | null
    reservation_id?: number | null
    status?: $Enums.notifications_status | null
    message?: string | null
    created_at?: Date | string | null
    resolved_at?: Date | string | null
    users_notifications_from_user_idTousers?: usersCreateNestedOneWithoutNotifications_notifications_from_user_idTousersInput
    users_notifications_to_user_idTousers?: usersCreateNestedOneWithoutNotifications_notifications_to_user_idTousersInput
    item_tran?: item_tranCreateNestedOneWithoutNotificationsInput
  }

  export type notificationsUncheckedCreateWithoutLibrary_itemsInput = {
    notification_id?: number
    type?: $Enums.notifications_type | null
    from_user_id?: number | null
    to_user_id?: number | null
    tran_id?: number | null
    reservation_id?: number | null
    status?: $Enums.notifications_status | null
    message?: string | null
    created_at?: Date | string | null
    resolved_at?: Date | string | null
  }

  export type notificationsCreateOrConnectWithoutLibrary_itemsInput = {
    where: notificationsWhereUniqueInput
    create: XOR<notificationsCreateWithoutLibrary_itemsInput, notificationsUncheckedCreateWithoutLibrary_itemsInput>
  }

  export type notificationsCreateManyLibrary_itemsInputEnvelope = {
    data: notificationsCreateManyLibrary_itemsInput | notificationsCreateManyLibrary_itemsInput[]
    skipDuplicates?: boolean
  }

  export type user_wishlistCreateWithoutLibrary_itemsInput = {
    created_at?: Date | string | null
    users?: usersCreateNestedOneWithoutUser_wishlistInput
  }

  export type user_wishlistUncheckedCreateWithoutLibrary_itemsInput = {
    id?: number
    user_id?: number | null
    created_at?: Date | string | null
  }

  export type user_wishlistCreateOrConnectWithoutLibrary_itemsInput = {
    where: user_wishlistWhereUniqueInput
    create: XOR<user_wishlistCreateWithoutLibrary_itemsInput, user_wishlistUncheckedCreateWithoutLibrary_itemsInput>
  }

  export type user_wishlistCreateManyLibrary_itemsInputEnvelope = {
    data: user_wishlistCreateManyLibrary_itemsInput | user_wishlistCreateManyLibrary_itemsInput[]
    skipDuplicates?: boolean
  }

  export type item_tranUpsertWithWhereUniqueWithoutLibrary_itemsInput = {
    where: item_tranWhereUniqueInput
    update: XOR<item_tranUpdateWithoutLibrary_itemsInput, item_tranUncheckedUpdateWithoutLibrary_itemsInput>
    create: XOR<item_tranCreateWithoutLibrary_itemsInput, item_tranUncheckedCreateWithoutLibrary_itemsInput>
  }

  export type item_tranUpdateWithWhereUniqueWithoutLibrary_itemsInput = {
    where: item_tranWhereUniqueInput
    data: XOR<item_tranUpdateWithoutLibrary_itemsInput, item_tranUncheckedUpdateWithoutLibrary_itemsInput>
  }

  export type item_tranUpdateManyWithWhereWithoutLibrary_itemsInput = {
    where: item_tranScalarWhereInput
    data: XOR<item_tranUpdateManyMutationInput, item_tranUncheckedUpdateManyWithoutLibrary_itemsInput>
  }

  export type item_tranScalarWhereInput = {
    AND?: item_tranScalarWhereInput | item_tranScalarWhereInput[]
    OR?: item_tranScalarWhereInput[]
    NOT?: item_tranScalarWhereInput | item_tranScalarWhereInput[]
    tran_id?: IntFilter<"item_tran"> | number
    item_id?: IntNullableFilter<"item_tran"> | number | null
    status?: Enumitem_tran_statusNullableFilter<"item_tran"> | $Enums.item_tran_status | null
    user_id?: IntNullableFilter<"item_tran"> | number | null
    record_status?: Enumrecord_statusNullableFilter<"item_tran"> | $Enums.record_status | null
  }

  export type item_tran_historyUpsertWithWhereUniqueWithoutLibrary_itemsInput = {
    where: item_tran_historyWhereUniqueInput
    update: XOR<item_tran_historyUpdateWithoutLibrary_itemsInput, item_tran_historyUncheckedUpdateWithoutLibrary_itemsInput>
    create: XOR<item_tran_historyCreateWithoutLibrary_itemsInput, item_tran_historyUncheckedCreateWithoutLibrary_itemsInput>
  }

  export type item_tran_historyUpdateWithWhereUniqueWithoutLibrary_itemsInput = {
    where: item_tran_historyWhereUniqueInput
    data: XOR<item_tran_historyUpdateWithoutLibrary_itemsInput, item_tran_historyUncheckedUpdateWithoutLibrary_itemsInput>
  }

  export type item_tran_historyUpdateManyWithWhereWithoutLibrary_itemsInput = {
    where: item_tran_historyScalarWhereInput
    data: XOR<item_tran_historyUpdateManyMutationInput, item_tran_historyUncheckedUpdateManyWithoutLibrary_itemsInput>
  }

  export type notificationsUpsertWithWhereUniqueWithoutLibrary_itemsInput = {
    where: notificationsWhereUniqueInput
    update: XOR<notificationsUpdateWithoutLibrary_itemsInput, notificationsUncheckedUpdateWithoutLibrary_itemsInput>
    create: XOR<notificationsCreateWithoutLibrary_itemsInput, notificationsUncheckedCreateWithoutLibrary_itemsInput>
  }

  export type notificationsUpdateWithWhereUniqueWithoutLibrary_itemsInput = {
    where: notificationsWhereUniqueInput
    data: XOR<notificationsUpdateWithoutLibrary_itemsInput, notificationsUncheckedUpdateWithoutLibrary_itemsInput>
  }

  export type notificationsUpdateManyWithWhereWithoutLibrary_itemsInput = {
    where: notificationsScalarWhereInput
    data: XOR<notificationsUpdateManyMutationInput, notificationsUncheckedUpdateManyWithoutLibrary_itemsInput>
  }

  export type user_wishlistUpsertWithWhereUniqueWithoutLibrary_itemsInput = {
    where: user_wishlistWhereUniqueInput
    update: XOR<user_wishlistUpdateWithoutLibrary_itemsInput, user_wishlistUncheckedUpdateWithoutLibrary_itemsInput>
    create: XOR<user_wishlistCreateWithoutLibrary_itemsInput, user_wishlistUncheckedCreateWithoutLibrary_itemsInput>
  }

  export type user_wishlistUpdateWithWhereUniqueWithoutLibrary_itemsInput = {
    where: user_wishlistWhereUniqueInput
    data: XOR<user_wishlistUpdateWithoutLibrary_itemsInput, user_wishlistUncheckedUpdateWithoutLibrary_itemsInput>
  }

  export type user_wishlistUpdateManyWithWhereWithoutLibrary_itemsInput = {
    where: user_wishlistScalarWhereInput
    data: XOR<user_wishlistUpdateManyMutationInput, user_wishlistUncheckedUpdateManyWithoutLibrary_itemsInput>
  }

  export type user_wishlistScalarWhereInput = {
    AND?: user_wishlistScalarWhereInput | user_wishlistScalarWhereInput[]
    OR?: user_wishlistScalarWhereInput[]
    NOT?: user_wishlistScalarWhereInput | user_wishlistScalarWhereInput[]
    id?: IntFilter<"user_wishlist"> | number
    user_id?: IntNullableFilter<"user_wishlist"> | number | null
    item_id?: IntNullableFilter<"user_wishlist"> | number | null
    created_at?: DateTimeNullableFilter<"user_wishlist"> | Date | string | null
  }

  export type usersCreateWithoutFinesInput = {
    name?: string | null
    email?: string | null
    password_hash?: string | null
    role?: $Enums.users_role | null
    status?: $Enums.users_status | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    gender?: $Enums.gender | null
    phone_number?: string | null
    birth_date?: Date | string | null
    address?: string | null
    profile_image_url?: string | null
    item_tran?: item_tranCreateNestedManyWithoutUsersInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyCreateNestedManyWithoutUsers_item_tran_history_requested_byTousersInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyCreateNestedManyWithoutUsers_item_tran_history_approved_byTousersInput
    logs?: logsCreateNestedManyWithoutUsersInput
    notifications_notifications_from_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_from_user_idTousersInput
    notifications_notifications_to_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_to_user_idTousersInput
    user_wishlist?: user_wishlistCreateNestedManyWithoutUsersInput
    library_cards?: library_cardsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutFinesInput = {
    user_id?: number
    name?: string | null
    email?: string | null
    password_hash?: string | null
    role?: $Enums.users_role | null
    status?: $Enums.users_status | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    gender?: $Enums.gender | null
    phone_number?: string | null
    birth_date?: Date | string | null
    address?: string | null
    profile_image_url?: string | null
    item_tran?: item_tranUncheckedCreateNestedManyWithoutUsersInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUncheckedCreateNestedManyWithoutUsers_item_tran_history_requested_byTousersInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUncheckedCreateNestedManyWithoutUsers_item_tran_history_approved_byTousersInput
    logs?: logsUncheckedCreateNestedManyWithoutUsersInput
    notifications_notifications_from_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_from_user_idTousersInput
    notifications_notifications_to_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_to_user_idTousersInput
    user_wishlist?: user_wishlistUncheckedCreateNestedManyWithoutUsersInput
    library_cards?: library_cardsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutFinesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutFinesInput, usersUncheckedCreateWithoutFinesInput>
  }

  export type item_tran_historyCreateWithoutFinesInput = {
    status?: $Enums.item_tran_history_status
    requested_at?: Date | string | null
    approved_at?: Date | string | null
    date_issued?: Date | string | null
    date_due?: Date | string | null
    date_returned?: Date | string | null
    remarks?: string | null
    library_items?: library_itemsCreateNestedOneWithoutItem_tran_historyInput
    item_tran?: item_tranCreateNestedOneWithoutItem_tran_historyInput
    users_item_tran_history_requested_byTousers?: usersCreateNestedOneWithoutItem_tran_history_item_tran_history_requested_byTousersInput
    users_item_tran_history_approved_byTousers?: usersCreateNestedOneWithoutItem_tran_history_item_tran_history_approved_byTousersInput
  }

  export type item_tran_historyUncheckedCreateWithoutFinesInput = {
    id?: number
    item_id?: number | null
    tran_id?: number | null
    status?: $Enums.item_tran_history_status
    requested_by?: number | null
    approved_by?: number | null
    requested_at?: Date | string | null
    approved_at?: Date | string | null
    date_issued?: Date | string | null
    date_due?: Date | string | null
    date_returned?: Date | string | null
    remarks?: string | null
  }

  export type item_tran_historyCreateOrConnectWithoutFinesInput = {
    where: item_tran_historyWhereUniqueInput
    create: XOR<item_tran_historyCreateWithoutFinesInput, item_tran_historyUncheckedCreateWithoutFinesInput>
  }

  export type usersUpsertWithoutFinesInput = {
    update: XOR<usersUpdateWithoutFinesInput, usersUncheckedUpdateWithoutFinesInput>
    create: XOR<usersCreateWithoutFinesInput, usersUncheckedCreateWithoutFinesInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutFinesInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutFinesInput, usersUncheckedUpdateWithoutFinesInput>
  }

  export type usersUpdateWithoutFinesInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    status?: NullableEnumusers_statusFieldUpdateOperationsInput | $Enums.users_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumgenderFieldUpdateOperationsInput | $Enums.gender | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    item_tran?: item_tranUpdateManyWithoutUsersNestedInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUpdateManyWithoutUsers_item_tran_history_requested_byTousersNestedInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUpdateManyWithoutUsers_item_tran_history_approved_byTousersNestedInput
    logs?: logsUpdateManyWithoutUsersNestedInput
    notifications_notifications_from_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_from_user_idTousersNestedInput
    notifications_notifications_to_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_to_user_idTousersNestedInput
    user_wishlist?: user_wishlistUpdateManyWithoutUsersNestedInput
    library_cards?: library_cardsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutFinesInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    status?: NullableEnumusers_statusFieldUpdateOperationsInput | $Enums.users_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumgenderFieldUpdateOperationsInput | $Enums.gender | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    item_tran?: item_tranUncheckedUpdateManyWithoutUsersNestedInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUncheckedUpdateManyWithoutUsers_item_tran_history_requested_byTousersNestedInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUncheckedUpdateManyWithoutUsers_item_tran_history_approved_byTousersNestedInput
    logs?: logsUncheckedUpdateManyWithoutUsersNestedInput
    notifications_notifications_from_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_from_user_idTousersNestedInput
    notifications_notifications_to_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_to_user_idTousersNestedInput
    user_wishlist?: user_wishlistUncheckedUpdateManyWithoutUsersNestedInput
    library_cards?: library_cardsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type item_tran_historyUpsertWithoutFinesInput = {
    update: XOR<item_tran_historyUpdateWithoutFinesInput, item_tran_historyUncheckedUpdateWithoutFinesInput>
    create: XOR<item_tran_historyCreateWithoutFinesInput, item_tran_historyUncheckedCreateWithoutFinesInput>
    where?: item_tran_historyWhereInput
  }

  export type item_tran_historyUpdateToOneWithWhereWithoutFinesInput = {
    where?: item_tran_historyWhereInput
    data: XOR<item_tran_historyUpdateWithoutFinesInput, item_tran_historyUncheckedUpdateWithoutFinesInput>
  }

  export type item_tran_historyUpdateWithoutFinesInput = {
    status?: Enumitem_tran_history_statusFieldUpdateOperationsInput | $Enums.item_tran_history_status
    requested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_issued?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_due?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_returned?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    library_items?: library_itemsUpdateOneWithoutItem_tran_historyNestedInput
    item_tran?: item_tranUpdateOneWithoutItem_tran_historyNestedInput
    users_item_tran_history_requested_byTousers?: usersUpdateOneWithoutItem_tran_history_item_tran_history_requested_byTousersNestedInput
    users_item_tran_history_approved_byTousers?: usersUpdateOneWithoutItem_tran_history_item_tran_history_approved_byTousersNestedInput
  }

  export type item_tran_historyUncheckedUpdateWithoutFinesInput = {
    id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    tran_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: Enumitem_tran_history_statusFieldUpdateOperationsInput | $Enums.item_tran_history_status
    requested_by?: NullableIntFieldUpdateOperationsInput | number | null
    approved_by?: NullableIntFieldUpdateOperationsInput | number | null
    requested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_issued?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_due?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_returned?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersCreateWithoutLogsInput = {
    name?: string | null
    email?: string | null
    password_hash?: string | null
    role?: $Enums.users_role | null
    status?: $Enums.users_status | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    gender?: $Enums.gender | null
    phone_number?: string | null
    birth_date?: Date | string | null
    address?: string | null
    profile_image_url?: string | null
    item_tran?: item_tranCreateNestedManyWithoutUsersInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyCreateNestedManyWithoutUsers_item_tran_history_requested_byTousersInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyCreateNestedManyWithoutUsers_item_tran_history_approved_byTousersInput
    fines?: finesCreateNestedManyWithoutUsersInput
    notifications_notifications_from_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_from_user_idTousersInput
    notifications_notifications_to_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_to_user_idTousersInput
    user_wishlist?: user_wishlistCreateNestedManyWithoutUsersInput
    library_cards?: library_cardsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutLogsInput = {
    user_id?: number
    name?: string | null
    email?: string | null
    password_hash?: string | null
    role?: $Enums.users_role | null
    status?: $Enums.users_status | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    gender?: $Enums.gender | null
    phone_number?: string | null
    birth_date?: Date | string | null
    address?: string | null
    profile_image_url?: string | null
    item_tran?: item_tranUncheckedCreateNestedManyWithoutUsersInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUncheckedCreateNestedManyWithoutUsers_item_tran_history_requested_byTousersInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUncheckedCreateNestedManyWithoutUsers_item_tran_history_approved_byTousersInput
    fines?: finesUncheckedCreateNestedManyWithoutUsersInput
    notifications_notifications_from_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_from_user_idTousersInput
    notifications_notifications_to_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_to_user_idTousersInput
    user_wishlist?: user_wishlistUncheckedCreateNestedManyWithoutUsersInput
    library_cards?: library_cardsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutLogsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutLogsInput, usersUncheckedCreateWithoutLogsInput>
  }

  export type usersUpsertWithoutLogsInput = {
    update: XOR<usersUpdateWithoutLogsInput, usersUncheckedUpdateWithoutLogsInput>
    create: XOR<usersCreateWithoutLogsInput, usersUncheckedCreateWithoutLogsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutLogsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutLogsInput, usersUncheckedUpdateWithoutLogsInput>
  }

  export type usersUpdateWithoutLogsInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    status?: NullableEnumusers_statusFieldUpdateOperationsInput | $Enums.users_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumgenderFieldUpdateOperationsInput | $Enums.gender | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    item_tran?: item_tranUpdateManyWithoutUsersNestedInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUpdateManyWithoutUsers_item_tran_history_requested_byTousersNestedInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUpdateManyWithoutUsers_item_tran_history_approved_byTousersNestedInput
    fines?: finesUpdateManyWithoutUsersNestedInput
    notifications_notifications_from_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_from_user_idTousersNestedInput
    notifications_notifications_to_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_to_user_idTousersNestedInput
    user_wishlist?: user_wishlistUpdateManyWithoutUsersNestedInput
    library_cards?: library_cardsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutLogsInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    status?: NullableEnumusers_statusFieldUpdateOperationsInput | $Enums.users_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumgenderFieldUpdateOperationsInput | $Enums.gender | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    item_tran?: item_tranUncheckedUpdateManyWithoutUsersNestedInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUncheckedUpdateManyWithoutUsers_item_tran_history_requested_byTousersNestedInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUncheckedUpdateManyWithoutUsers_item_tran_history_approved_byTousersNestedInput
    fines?: finesUncheckedUpdateManyWithoutUsersNestedInput
    notifications_notifications_from_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_from_user_idTousersNestedInput
    notifications_notifications_to_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_to_user_idTousersNestedInput
    user_wishlist?: user_wishlistUncheckedUpdateManyWithoutUsersNestedInput
    library_cards?: library_cardsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type library_itemsCreateWithoutNotificationsInput = {
    title?: string | null
    author: string
    isbn?: string | null
    year?: number | null
    genre?: string | null
    image_url?: string | null
    description?: string | null
    librarian_id?: number | null
    item_type?: $Enums.library_item_type
    location?: string | null
    publisher?: string | null
    language?: string | null
    pages?: number | null
    duration?: number | null
    format?: string | null
    subject?: string | null
    keywords?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    record_status?: $Enums.record_status | null
    item_tran?: item_tranCreateNestedManyWithoutLibrary_itemsInput
    item_tran_history?: item_tran_historyCreateNestedManyWithoutLibrary_itemsInput
    user_wishlist?: user_wishlistCreateNestedManyWithoutLibrary_itemsInput
  }

  export type library_itemsUncheckedCreateWithoutNotificationsInput = {
    item_id?: number
    title?: string | null
    author: string
    isbn?: string | null
    year?: number | null
    genre?: string | null
    image_url?: string | null
    description?: string | null
    librarian_id?: number | null
    item_type?: $Enums.library_item_type
    location?: string | null
    publisher?: string | null
    language?: string | null
    pages?: number | null
    duration?: number | null
    format?: string | null
    subject?: string | null
    keywords?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    record_status?: $Enums.record_status | null
    item_tran?: item_tranUncheckedCreateNestedManyWithoutLibrary_itemsInput
    item_tran_history?: item_tran_historyUncheckedCreateNestedManyWithoutLibrary_itemsInput
    user_wishlist?: user_wishlistUncheckedCreateNestedManyWithoutLibrary_itemsInput
  }

  export type library_itemsCreateOrConnectWithoutNotificationsInput = {
    where: library_itemsWhereUniqueInput
    create: XOR<library_itemsCreateWithoutNotificationsInput, library_itemsUncheckedCreateWithoutNotificationsInput>
  }

  export type usersCreateWithoutNotifications_notifications_from_user_idTousersInput = {
    name?: string | null
    email?: string | null
    password_hash?: string | null
    role?: $Enums.users_role | null
    status?: $Enums.users_status | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    gender?: $Enums.gender | null
    phone_number?: string | null
    birth_date?: Date | string | null
    address?: string | null
    profile_image_url?: string | null
    item_tran?: item_tranCreateNestedManyWithoutUsersInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyCreateNestedManyWithoutUsers_item_tran_history_requested_byTousersInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyCreateNestedManyWithoutUsers_item_tran_history_approved_byTousersInput
    fines?: finesCreateNestedManyWithoutUsersInput
    logs?: logsCreateNestedManyWithoutUsersInput
    notifications_notifications_to_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_to_user_idTousersInput
    user_wishlist?: user_wishlistCreateNestedManyWithoutUsersInput
    library_cards?: library_cardsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutNotifications_notifications_from_user_idTousersInput = {
    user_id?: number
    name?: string | null
    email?: string | null
    password_hash?: string | null
    role?: $Enums.users_role | null
    status?: $Enums.users_status | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    gender?: $Enums.gender | null
    phone_number?: string | null
    birth_date?: Date | string | null
    address?: string | null
    profile_image_url?: string | null
    item_tran?: item_tranUncheckedCreateNestedManyWithoutUsersInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUncheckedCreateNestedManyWithoutUsers_item_tran_history_requested_byTousersInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUncheckedCreateNestedManyWithoutUsers_item_tran_history_approved_byTousersInput
    fines?: finesUncheckedCreateNestedManyWithoutUsersInput
    logs?: logsUncheckedCreateNestedManyWithoutUsersInput
    notifications_notifications_to_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_to_user_idTousersInput
    user_wishlist?: user_wishlistUncheckedCreateNestedManyWithoutUsersInput
    library_cards?: library_cardsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutNotifications_notifications_from_user_idTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutNotifications_notifications_from_user_idTousersInput, usersUncheckedCreateWithoutNotifications_notifications_from_user_idTousersInput>
  }

  export type usersCreateWithoutNotifications_notifications_to_user_idTousersInput = {
    name?: string | null
    email?: string | null
    password_hash?: string | null
    role?: $Enums.users_role | null
    status?: $Enums.users_status | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    gender?: $Enums.gender | null
    phone_number?: string | null
    birth_date?: Date | string | null
    address?: string | null
    profile_image_url?: string | null
    item_tran?: item_tranCreateNestedManyWithoutUsersInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyCreateNestedManyWithoutUsers_item_tran_history_requested_byTousersInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyCreateNestedManyWithoutUsers_item_tran_history_approved_byTousersInput
    fines?: finesCreateNestedManyWithoutUsersInput
    logs?: logsCreateNestedManyWithoutUsersInput
    notifications_notifications_from_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_from_user_idTousersInput
    user_wishlist?: user_wishlistCreateNestedManyWithoutUsersInput
    library_cards?: library_cardsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutNotifications_notifications_to_user_idTousersInput = {
    user_id?: number
    name?: string | null
    email?: string | null
    password_hash?: string | null
    role?: $Enums.users_role | null
    status?: $Enums.users_status | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    gender?: $Enums.gender | null
    phone_number?: string | null
    birth_date?: Date | string | null
    address?: string | null
    profile_image_url?: string | null
    item_tran?: item_tranUncheckedCreateNestedManyWithoutUsersInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUncheckedCreateNestedManyWithoutUsers_item_tran_history_requested_byTousersInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUncheckedCreateNestedManyWithoutUsers_item_tran_history_approved_byTousersInput
    fines?: finesUncheckedCreateNestedManyWithoutUsersInput
    logs?: logsUncheckedCreateNestedManyWithoutUsersInput
    notifications_notifications_from_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_from_user_idTousersInput
    user_wishlist?: user_wishlistUncheckedCreateNestedManyWithoutUsersInput
    library_cards?: library_cardsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutNotifications_notifications_to_user_idTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutNotifications_notifications_to_user_idTousersInput, usersUncheckedCreateWithoutNotifications_notifications_to_user_idTousersInput>
  }

  export type item_tranCreateWithoutNotificationsInput = {
    status?: $Enums.item_tran_status | null
    record_status?: $Enums.record_status | null
    library_items?: library_itemsCreateNestedOneWithoutItem_tranInput
    users?: usersCreateNestedOneWithoutItem_tranInput
    item_tran_history?: item_tran_historyCreateNestedManyWithoutItem_tranInput
  }

  export type item_tranUncheckedCreateWithoutNotificationsInput = {
    tran_id?: number
    item_id?: number | null
    status?: $Enums.item_tran_status | null
    user_id?: number | null
    record_status?: $Enums.record_status | null
    item_tran_history?: item_tran_historyUncheckedCreateNestedManyWithoutItem_tranInput
  }

  export type item_tranCreateOrConnectWithoutNotificationsInput = {
    where: item_tranWhereUniqueInput
    create: XOR<item_tranCreateWithoutNotificationsInput, item_tranUncheckedCreateWithoutNotificationsInput>
  }

  export type library_itemsUpsertWithoutNotificationsInput = {
    update: XOR<library_itemsUpdateWithoutNotificationsInput, library_itemsUncheckedUpdateWithoutNotificationsInput>
    create: XOR<library_itemsCreateWithoutNotificationsInput, library_itemsUncheckedCreateWithoutNotificationsInput>
    where?: library_itemsWhereInput
  }

  export type library_itemsUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: library_itemsWhereInput
    data: XOR<library_itemsUpdateWithoutNotificationsInput, library_itemsUncheckedUpdateWithoutNotificationsInput>
  }

  export type library_itemsUpdateWithoutNotificationsInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: StringFieldUpdateOperationsInput | string
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    librarian_id?: NullableIntFieldUpdateOperationsInput | number | null
    item_type?: Enumlibrary_item_typeFieldUpdateOperationsInput | $Enums.library_item_type
    location?: NullableStringFieldUpdateOperationsInput | string | null
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    pages?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    format?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    record_status?: NullableEnumrecord_statusFieldUpdateOperationsInput | $Enums.record_status | null
    item_tran?: item_tranUpdateManyWithoutLibrary_itemsNestedInput
    item_tran_history?: item_tran_historyUpdateManyWithoutLibrary_itemsNestedInput
    user_wishlist?: user_wishlistUpdateManyWithoutLibrary_itemsNestedInput
  }

  export type library_itemsUncheckedUpdateWithoutNotificationsInput = {
    item_id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: StringFieldUpdateOperationsInput | string
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    librarian_id?: NullableIntFieldUpdateOperationsInput | number | null
    item_type?: Enumlibrary_item_typeFieldUpdateOperationsInput | $Enums.library_item_type
    location?: NullableStringFieldUpdateOperationsInput | string | null
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    pages?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    format?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    record_status?: NullableEnumrecord_statusFieldUpdateOperationsInput | $Enums.record_status | null
    item_tran?: item_tranUncheckedUpdateManyWithoutLibrary_itemsNestedInput
    item_tran_history?: item_tran_historyUncheckedUpdateManyWithoutLibrary_itemsNestedInput
    user_wishlist?: user_wishlistUncheckedUpdateManyWithoutLibrary_itemsNestedInput
  }

  export type usersUpsertWithoutNotifications_notifications_from_user_idTousersInput = {
    update: XOR<usersUpdateWithoutNotifications_notifications_from_user_idTousersInput, usersUncheckedUpdateWithoutNotifications_notifications_from_user_idTousersInput>
    create: XOR<usersCreateWithoutNotifications_notifications_from_user_idTousersInput, usersUncheckedCreateWithoutNotifications_notifications_from_user_idTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutNotifications_notifications_from_user_idTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutNotifications_notifications_from_user_idTousersInput, usersUncheckedUpdateWithoutNotifications_notifications_from_user_idTousersInput>
  }

  export type usersUpdateWithoutNotifications_notifications_from_user_idTousersInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    status?: NullableEnumusers_statusFieldUpdateOperationsInput | $Enums.users_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumgenderFieldUpdateOperationsInput | $Enums.gender | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    item_tran?: item_tranUpdateManyWithoutUsersNestedInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUpdateManyWithoutUsers_item_tran_history_requested_byTousersNestedInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUpdateManyWithoutUsers_item_tran_history_approved_byTousersNestedInput
    fines?: finesUpdateManyWithoutUsersNestedInput
    logs?: logsUpdateManyWithoutUsersNestedInput
    notifications_notifications_to_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_to_user_idTousersNestedInput
    user_wishlist?: user_wishlistUpdateManyWithoutUsersNestedInput
    library_cards?: library_cardsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutNotifications_notifications_from_user_idTousersInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    status?: NullableEnumusers_statusFieldUpdateOperationsInput | $Enums.users_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumgenderFieldUpdateOperationsInput | $Enums.gender | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    item_tran?: item_tranUncheckedUpdateManyWithoutUsersNestedInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUncheckedUpdateManyWithoutUsers_item_tran_history_requested_byTousersNestedInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUncheckedUpdateManyWithoutUsers_item_tran_history_approved_byTousersNestedInput
    fines?: finesUncheckedUpdateManyWithoutUsersNestedInput
    logs?: logsUncheckedUpdateManyWithoutUsersNestedInput
    notifications_notifications_to_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_to_user_idTousersNestedInput
    user_wishlist?: user_wishlistUncheckedUpdateManyWithoutUsersNestedInput
    library_cards?: library_cardsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersUpsertWithoutNotifications_notifications_to_user_idTousersInput = {
    update: XOR<usersUpdateWithoutNotifications_notifications_to_user_idTousersInput, usersUncheckedUpdateWithoutNotifications_notifications_to_user_idTousersInput>
    create: XOR<usersCreateWithoutNotifications_notifications_to_user_idTousersInput, usersUncheckedCreateWithoutNotifications_notifications_to_user_idTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutNotifications_notifications_to_user_idTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutNotifications_notifications_to_user_idTousersInput, usersUncheckedUpdateWithoutNotifications_notifications_to_user_idTousersInput>
  }

  export type usersUpdateWithoutNotifications_notifications_to_user_idTousersInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    status?: NullableEnumusers_statusFieldUpdateOperationsInput | $Enums.users_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumgenderFieldUpdateOperationsInput | $Enums.gender | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    item_tran?: item_tranUpdateManyWithoutUsersNestedInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUpdateManyWithoutUsers_item_tran_history_requested_byTousersNestedInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUpdateManyWithoutUsers_item_tran_history_approved_byTousersNestedInput
    fines?: finesUpdateManyWithoutUsersNestedInput
    logs?: logsUpdateManyWithoutUsersNestedInput
    notifications_notifications_from_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_from_user_idTousersNestedInput
    user_wishlist?: user_wishlistUpdateManyWithoutUsersNestedInput
    library_cards?: library_cardsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutNotifications_notifications_to_user_idTousersInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    status?: NullableEnumusers_statusFieldUpdateOperationsInput | $Enums.users_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumgenderFieldUpdateOperationsInput | $Enums.gender | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    item_tran?: item_tranUncheckedUpdateManyWithoutUsersNestedInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUncheckedUpdateManyWithoutUsers_item_tran_history_requested_byTousersNestedInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUncheckedUpdateManyWithoutUsers_item_tran_history_approved_byTousersNestedInput
    fines?: finesUncheckedUpdateManyWithoutUsersNestedInput
    logs?: logsUncheckedUpdateManyWithoutUsersNestedInput
    notifications_notifications_from_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_from_user_idTousersNestedInput
    user_wishlist?: user_wishlistUncheckedUpdateManyWithoutUsersNestedInput
    library_cards?: library_cardsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type item_tranUpsertWithoutNotificationsInput = {
    update: XOR<item_tranUpdateWithoutNotificationsInput, item_tranUncheckedUpdateWithoutNotificationsInput>
    create: XOR<item_tranCreateWithoutNotificationsInput, item_tranUncheckedCreateWithoutNotificationsInput>
    where?: item_tranWhereInput
  }

  export type item_tranUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: item_tranWhereInput
    data: XOR<item_tranUpdateWithoutNotificationsInput, item_tranUncheckedUpdateWithoutNotificationsInput>
  }

  export type item_tranUpdateWithoutNotificationsInput = {
    status?: NullableEnumitem_tran_statusFieldUpdateOperationsInput | $Enums.item_tran_status | null
    record_status?: NullableEnumrecord_statusFieldUpdateOperationsInput | $Enums.record_status | null
    library_items?: library_itemsUpdateOneWithoutItem_tranNestedInput
    users?: usersUpdateOneWithoutItem_tranNestedInput
    item_tran_history?: item_tran_historyUpdateManyWithoutItem_tranNestedInput
  }

  export type item_tranUncheckedUpdateWithoutNotificationsInput = {
    tran_id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumitem_tran_statusFieldUpdateOperationsInput | $Enums.item_tran_status | null
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    record_status?: NullableEnumrecord_statusFieldUpdateOperationsInput | $Enums.record_status | null
    item_tran_history?: item_tran_historyUncheckedUpdateManyWithoutItem_tranNestedInput
  }

  export type usersCreateWithoutUser_wishlistInput = {
    name?: string | null
    email?: string | null
    password_hash?: string | null
    role?: $Enums.users_role | null
    status?: $Enums.users_status | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    gender?: $Enums.gender | null
    phone_number?: string | null
    birth_date?: Date | string | null
    address?: string | null
    profile_image_url?: string | null
    item_tran?: item_tranCreateNestedManyWithoutUsersInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyCreateNestedManyWithoutUsers_item_tran_history_requested_byTousersInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyCreateNestedManyWithoutUsers_item_tran_history_approved_byTousersInput
    fines?: finesCreateNestedManyWithoutUsersInput
    logs?: logsCreateNestedManyWithoutUsersInput
    notifications_notifications_from_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_from_user_idTousersInput
    notifications_notifications_to_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_to_user_idTousersInput
    library_cards?: library_cardsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutUser_wishlistInput = {
    user_id?: number
    name?: string | null
    email?: string | null
    password_hash?: string | null
    role?: $Enums.users_role | null
    status?: $Enums.users_status | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    gender?: $Enums.gender | null
    phone_number?: string | null
    birth_date?: Date | string | null
    address?: string | null
    profile_image_url?: string | null
    item_tran?: item_tranUncheckedCreateNestedManyWithoutUsersInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUncheckedCreateNestedManyWithoutUsers_item_tran_history_requested_byTousersInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUncheckedCreateNestedManyWithoutUsers_item_tran_history_approved_byTousersInput
    fines?: finesUncheckedCreateNestedManyWithoutUsersInput
    logs?: logsUncheckedCreateNestedManyWithoutUsersInput
    notifications_notifications_from_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_from_user_idTousersInput
    notifications_notifications_to_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_to_user_idTousersInput
    library_cards?: library_cardsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutUser_wishlistInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutUser_wishlistInput, usersUncheckedCreateWithoutUser_wishlistInput>
  }

  export type library_itemsCreateWithoutUser_wishlistInput = {
    title?: string | null
    author: string
    isbn?: string | null
    year?: number | null
    genre?: string | null
    image_url?: string | null
    description?: string | null
    librarian_id?: number | null
    item_type?: $Enums.library_item_type
    location?: string | null
    publisher?: string | null
    language?: string | null
    pages?: number | null
    duration?: number | null
    format?: string | null
    subject?: string | null
    keywords?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    record_status?: $Enums.record_status | null
    item_tran?: item_tranCreateNestedManyWithoutLibrary_itemsInput
    item_tran_history?: item_tran_historyCreateNestedManyWithoutLibrary_itemsInput
    notifications?: notificationsCreateNestedManyWithoutLibrary_itemsInput
  }

  export type library_itemsUncheckedCreateWithoutUser_wishlistInput = {
    item_id?: number
    title?: string | null
    author: string
    isbn?: string | null
    year?: number | null
    genre?: string | null
    image_url?: string | null
    description?: string | null
    librarian_id?: number | null
    item_type?: $Enums.library_item_type
    location?: string | null
    publisher?: string | null
    language?: string | null
    pages?: number | null
    duration?: number | null
    format?: string | null
    subject?: string | null
    keywords?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    record_status?: $Enums.record_status | null
    item_tran?: item_tranUncheckedCreateNestedManyWithoutLibrary_itemsInput
    item_tran_history?: item_tran_historyUncheckedCreateNestedManyWithoutLibrary_itemsInput
    notifications?: notificationsUncheckedCreateNestedManyWithoutLibrary_itemsInput
  }

  export type library_itemsCreateOrConnectWithoutUser_wishlistInput = {
    where: library_itemsWhereUniqueInput
    create: XOR<library_itemsCreateWithoutUser_wishlistInput, library_itemsUncheckedCreateWithoutUser_wishlistInput>
  }

  export type usersUpsertWithoutUser_wishlistInput = {
    update: XOR<usersUpdateWithoutUser_wishlistInput, usersUncheckedUpdateWithoutUser_wishlistInput>
    create: XOR<usersCreateWithoutUser_wishlistInput, usersUncheckedCreateWithoutUser_wishlistInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutUser_wishlistInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutUser_wishlistInput, usersUncheckedUpdateWithoutUser_wishlistInput>
  }

  export type usersUpdateWithoutUser_wishlistInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    status?: NullableEnumusers_statusFieldUpdateOperationsInput | $Enums.users_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumgenderFieldUpdateOperationsInput | $Enums.gender | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    item_tran?: item_tranUpdateManyWithoutUsersNestedInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUpdateManyWithoutUsers_item_tran_history_requested_byTousersNestedInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUpdateManyWithoutUsers_item_tran_history_approved_byTousersNestedInput
    fines?: finesUpdateManyWithoutUsersNestedInput
    logs?: logsUpdateManyWithoutUsersNestedInput
    notifications_notifications_from_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_from_user_idTousersNestedInput
    notifications_notifications_to_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_to_user_idTousersNestedInput
    library_cards?: library_cardsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutUser_wishlistInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    status?: NullableEnumusers_statusFieldUpdateOperationsInput | $Enums.users_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumgenderFieldUpdateOperationsInput | $Enums.gender | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    item_tran?: item_tranUncheckedUpdateManyWithoutUsersNestedInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUncheckedUpdateManyWithoutUsers_item_tran_history_requested_byTousersNestedInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUncheckedUpdateManyWithoutUsers_item_tran_history_approved_byTousersNestedInput
    fines?: finesUncheckedUpdateManyWithoutUsersNestedInput
    logs?: logsUncheckedUpdateManyWithoutUsersNestedInput
    notifications_notifications_from_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_from_user_idTousersNestedInput
    notifications_notifications_to_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_to_user_idTousersNestedInput
    library_cards?: library_cardsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type library_itemsUpsertWithoutUser_wishlistInput = {
    update: XOR<library_itemsUpdateWithoutUser_wishlistInput, library_itemsUncheckedUpdateWithoutUser_wishlistInput>
    create: XOR<library_itemsCreateWithoutUser_wishlistInput, library_itemsUncheckedCreateWithoutUser_wishlistInput>
    where?: library_itemsWhereInput
  }

  export type library_itemsUpdateToOneWithWhereWithoutUser_wishlistInput = {
    where?: library_itemsWhereInput
    data: XOR<library_itemsUpdateWithoutUser_wishlistInput, library_itemsUncheckedUpdateWithoutUser_wishlistInput>
  }

  export type library_itemsUpdateWithoutUser_wishlistInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: StringFieldUpdateOperationsInput | string
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    librarian_id?: NullableIntFieldUpdateOperationsInput | number | null
    item_type?: Enumlibrary_item_typeFieldUpdateOperationsInput | $Enums.library_item_type
    location?: NullableStringFieldUpdateOperationsInput | string | null
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    pages?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    format?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    record_status?: NullableEnumrecord_statusFieldUpdateOperationsInput | $Enums.record_status | null
    item_tran?: item_tranUpdateManyWithoutLibrary_itemsNestedInput
    item_tran_history?: item_tran_historyUpdateManyWithoutLibrary_itemsNestedInput
    notifications?: notificationsUpdateManyWithoutLibrary_itemsNestedInput
  }

  export type library_itemsUncheckedUpdateWithoutUser_wishlistInput = {
    item_id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    author?: StringFieldUpdateOperationsInput | string
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    librarian_id?: NullableIntFieldUpdateOperationsInput | number | null
    item_type?: Enumlibrary_item_typeFieldUpdateOperationsInput | $Enums.library_item_type
    location?: NullableStringFieldUpdateOperationsInput | string | null
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    pages?: NullableIntFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    format?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    record_status?: NullableEnumrecord_statusFieldUpdateOperationsInput | $Enums.record_status | null
    item_tran?: item_tranUncheckedUpdateManyWithoutLibrary_itemsNestedInput
    item_tran_history?: item_tran_historyUncheckedUpdateManyWithoutLibrary_itemsNestedInput
    notifications?: notificationsUncheckedUpdateManyWithoutLibrary_itemsNestedInput
  }

  export type item_tranCreateWithoutUsersInput = {
    status?: $Enums.item_tran_status | null
    record_status?: $Enums.record_status | null
    library_items?: library_itemsCreateNestedOneWithoutItem_tranInput
    item_tran_history?: item_tran_historyCreateNestedManyWithoutItem_tranInput
    notifications?: notificationsCreateNestedManyWithoutItem_tranInput
  }

  export type item_tranUncheckedCreateWithoutUsersInput = {
    tran_id?: number
    item_id?: number | null
    status?: $Enums.item_tran_status | null
    record_status?: $Enums.record_status | null
    item_tran_history?: item_tran_historyUncheckedCreateNestedManyWithoutItem_tranInput
    notifications?: notificationsUncheckedCreateNestedManyWithoutItem_tranInput
  }

  export type item_tranCreateOrConnectWithoutUsersInput = {
    where: item_tranWhereUniqueInput
    create: XOR<item_tranCreateWithoutUsersInput, item_tranUncheckedCreateWithoutUsersInput>
  }

  export type item_tranCreateManyUsersInputEnvelope = {
    data: item_tranCreateManyUsersInput | item_tranCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type item_tran_historyCreateWithoutUsers_item_tran_history_requested_byTousersInput = {
    status?: $Enums.item_tran_history_status
    requested_at?: Date | string | null
    approved_at?: Date | string | null
    date_issued?: Date | string | null
    date_due?: Date | string | null
    date_returned?: Date | string | null
    remarks?: string | null
    library_items?: library_itemsCreateNestedOneWithoutItem_tran_historyInput
    item_tran?: item_tranCreateNestedOneWithoutItem_tran_historyInput
    users_item_tran_history_approved_byTousers?: usersCreateNestedOneWithoutItem_tran_history_item_tran_history_approved_byTousersInput
    fines?: finesCreateNestedManyWithoutItem_tran_historyInput
  }

  export type item_tran_historyUncheckedCreateWithoutUsers_item_tran_history_requested_byTousersInput = {
    id?: number
    item_id?: number | null
    tran_id?: number | null
    status?: $Enums.item_tran_history_status
    approved_by?: number | null
    requested_at?: Date | string | null
    approved_at?: Date | string | null
    date_issued?: Date | string | null
    date_due?: Date | string | null
    date_returned?: Date | string | null
    remarks?: string | null
    fines?: finesUncheckedCreateNestedManyWithoutItem_tran_historyInput
  }

  export type item_tran_historyCreateOrConnectWithoutUsers_item_tran_history_requested_byTousersInput = {
    where: item_tran_historyWhereUniqueInput
    create: XOR<item_tran_historyCreateWithoutUsers_item_tran_history_requested_byTousersInput, item_tran_historyUncheckedCreateWithoutUsers_item_tran_history_requested_byTousersInput>
  }

  export type item_tran_historyCreateManyUsers_item_tran_history_requested_byTousersInputEnvelope = {
    data: item_tran_historyCreateManyUsers_item_tran_history_requested_byTousersInput | item_tran_historyCreateManyUsers_item_tran_history_requested_byTousersInput[]
    skipDuplicates?: boolean
  }

  export type item_tran_historyCreateWithoutUsers_item_tran_history_approved_byTousersInput = {
    status?: $Enums.item_tran_history_status
    requested_at?: Date | string | null
    approved_at?: Date | string | null
    date_issued?: Date | string | null
    date_due?: Date | string | null
    date_returned?: Date | string | null
    remarks?: string | null
    library_items?: library_itemsCreateNestedOneWithoutItem_tran_historyInput
    item_tran?: item_tranCreateNestedOneWithoutItem_tran_historyInput
    users_item_tran_history_requested_byTousers?: usersCreateNestedOneWithoutItem_tran_history_item_tran_history_requested_byTousersInput
    fines?: finesCreateNestedManyWithoutItem_tran_historyInput
  }

  export type item_tran_historyUncheckedCreateWithoutUsers_item_tran_history_approved_byTousersInput = {
    id?: number
    item_id?: number | null
    tran_id?: number | null
    status?: $Enums.item_tran_history_status
    requested_by?: number | null
    requested_at?: Date | string | null
    approved_at?: Date | string | null
    date_issued?: Date | string | null
    date_due?: Date | string | null
    date_returned?: Date | string | null
    remarks?: string | null
    fines?: finesUncheckedCreateNestedManyWithoutItem_tran_historyInput
  }

  export type item_tran_historyCreateOrConnectWithoutUsers_item_tran_history_approved_byTousersInput = {
    where: item_tran_historyWhereUniqueInput
    create: XOR<item_tran_historyCreateWithoutUsers_item_tran_history_approved_byTousersInput, item_tran_historyUncheckedCreateWithoutUsers_item_tran_history_approved_byTousersInput>
  }

  export type item_tran_historyCreateManyUsers_item_tran_history_approved_byTousersInputEnvelope = {
    data: item_tran_historyCreateManyUsers_item_tran_history_approved_byTousersInput | item_tran_historyCreateManyUsers_item_tran_history_approved_byTousersInput[]
    skipDuplicates?: boolean
  }

  export type finesCreateWithoutUsersInput = {
    amount?: Decimal | DecimalJsLike | number | string | null
    reason?: string | null
    status?: $Enums.fines_status | null
    created_at?: Date | string | null
    paid_at?: Date | string | null
    item_tran_history?: item_tran_historyCreateNestedOneWithoutFinesInput
  }

  export type finesUncheckedCreateWithoutUsersInput = {
    fine_id?: number
    item_tran_historyId?: number | null
    amount?: Decimal | DecimalJsLike | number | string | null
    reason?: string | null
    status?: $Enums.fines_status | null
    created_at?: Date | string | null
    paid_at?: Date | string | null
  }

  export type finesCreateOrConnectWithoutUsersInput = {
    where: finesWhereUniqueInput
    create: XOR<finesCreateWithoutUsersInput, finesUncheckedCreateWithoutUsersInput>
  }

  export type finesCreateManyUsersInputEnvelope = {
    data: finesCreateManyUsersInput | finesCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type logsCreateWithoutUsersInput = {
    description: string
    created_at?: Date | string | null
  }

  export type logsUncheckedCreateWithoutUsersInput = {
    log_id?: number
    description: string
    created_at?: Date | string | null
  }

  export type logsCreateOrConnectWithoutUsersInput = {
    where: logsWhereUniqueInput
    create: XOR<logsCreateWithoutUsersInput, logsUncheckedCreateWithoutUsersInput>
  }

  export type logsCreateManyUsersInputEnvelope = {
    data: logsCreateManyUsersInput | logsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type notificationsCreateWithoutUsers_notifications_from_user_idTousersInput = {
    type?: $Enums.notifications_type | null
    reservation_id?: number | null
    status?: $Enums.notifications_status | null
    message?: string | null
    created_at?: Date | string | null
    resolved_at?: Date | string | null
    library_items?: library_itemsCreateNestedOneWithoutNotificationsInput
    users_notifications_to_user_idTousers?: usersCreateNestedOneWithoutNotifications_notifications_to_user_idTousersInput
    item_tran?: item_tranCreateNestedOneWithoutNotificationsInput
  }

  export type notificationsUncheckedCreateWithoutUsers_notifications_from_user_idTousersInput = {
    notification_id?: number
    type?: $Enums.notifications_type | null
    item_id?: number | null
    to_user_id?: number | null
    tran_id?: number | null
    reservation_id?: number | null
    status?: $Enums.notifications_status | null
    message?: string | null
    created_at?: Date | string | null
    resolved_at?: Date | string | null
  }

  export type notificationsCreateOrConnectWithoutUsers_notifications_from_user_idTousersInput = {
    where: notificationsWhereUniqueInput
    create: XOR<notificationsCreateWithoutUsers_notifications_from_user_idTousersInput, notificationsUncheckedCreateWithoutUsers_notifications_from_user_idTousersInput>
  }

  export type notificationsCreateManyUsers_notifications_from_user_idTousersInputEnvelope = {
    data: notificationsCreateManyUsers_notifications_from_user_idTousersInput | notificationsCreateManyUsers_notifications_from_user_idTousersInput[]
    skipDuplicates?: boolean
  }

  export type notificationsCreateWithoutUsers_notifications_to_user_idTousersInput = {
    type?: $Enums.notifications_type | null
    reservation_id?: number | null
    status?: $Enums.notifications_status | null
    message?: string | null
    created_at?: Date | string | null
    resolved_at?: Date | string | null
    library_items?: library_itemsCreateNestedOneWithoutNotificationsInput
    users_notifications_from_user_idTousers?: usersCreateNestedOneWithoutNotifications_notifications_from_user_idTousersInput
    item_tran?: item_tranCreateNestedOneWithoutNotificationsInput
  }

  export type notificationsUncheckedCreateWithoutUsers_notifications_to_user_idTousersInput = {
    notification_id?: number
    type?: $Enums.notifications_type | null
    item_id?: number | null
    from_user_id?: number | null
    tran_id?: number | null
    reservation_id?: number | null
    status?: $Enums.notifications_status | null
    message?: string | null
    created_at?: Date | string | null
    resolved_at?: Date | string | null
  }

  export type notificationsCreateOrConnectWithoutUsers_notifications_to_user_idTousersInput = {
    where: notificationsWhereUniqueInput
    create: XOR<notificationsCreateWithoutUsers_notifications_to_user_idTousersInput, notificationsUncheckedCreateWithoutUsers_notifications_to_user_idTousersInput>
  }

  export type notificationsCreateManyUsers_notifications_to_user_idTousersInputEnvelope = {
    data: notificationsCreateManyUsers_notifications_to_user_idTousersInput | notificationsCreateManyUsers_notifications_to_user_idTousersInput[]
    skipDuplicates?: boolean
  }

  export type user_wishlistCreateWithoutUsersInput = {
    created_at?: Date | string | null
    library_items?: library_itemsCreateNestedOneWithoutUser_wishlistInput
  }

  export type user_wishlistUncheckedCreateWithoutUsersInput = {
    id?: number
    item_id?: number | null
    created_at?: Date | string | null
  }

  export type user_wishlistCreateOrConnectWithoutUsersInput = {
    where: user_wishlistWhereUniqueInput
    create: XOR<user_wishlistCreateWithoutUsersInput, user_wishlistUncheckedCreateWithoutUsersInput>
  }

  export type user_wishlistCreateManyUsersInputEnvelope = {
    data: user_wishlistCreateManyUsersInput | user_wishlistCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type library_cardsCreateWithoutUsersInput = {
    card_number: string
    issued_at?: Date | string
    expires_at?: Date | string | null
    status?: $Enums.card_status
  }

  export type library_cardsUncheckedCreateWithoutUsersInput = {
    card_id?: number
    card_number: string
    issued_at?: Date | string
    expires_at?: Date | string | null
    status?: $Enums.card_status
  }

  export type library_cardsCreateOrConnectWithoutUsersInput = {
    where: library_cardsWhereUniqueInput
    create: XOR<library_cardsCreateWithoutUsersInput, library_cardsUncheckedCreateWithoutUsersInput>
  }

  export type library_cardsCreateManyUsersInputEnvelope = {
    data: library_cardsCreateManyUsersInput | library_cardsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type item_tranUpsertWithWhereUniqueWithoutUsersInput = {
    where: item_tranWhereUniqueInput
    update: XOR<item_tranUpdateWithoutUsersInput, item_tranUncheckedUpdateWithoutUsersInput>
    create: XOR<item_tranCreateWithoutUsersInput, item_tranUncheckedCreateWithoutUsersInput>
  }

  export type item_tranUpdateWithWhereUniqueWithoutUsersInput = {
    where: item_tranWhereUniqueInput
    data: XOR<item_tranUpdateWithoutUsersInput, item_tranUncheckedUpdateWithoutUsersInput>
  }

  export type item_tranUpdateManyWithWhereWithoutUsersInput = {
    where: item_tranScalarWhereInput
    data: XOR<item_tranUpdateManyMutationInput, item_tranUncheckedUpdateManyWithoutUsersInput>
  }

  export type item_tran_historyUpsertWithWhereUniqueWithoutUsers_item_tran_history_requested_byTousersInput = {
    where: item_tran_historyWhereUniqueInput
    update: XOR<item_tran_historyUpdateWithoutUsers_item_tran_history_requested_byTousersInput, item_tran_historyUncheckedUpdateWithoutUsers_item_tran_history_requested_byTousersInput>
    create: XOR<item_tran_historyCreateWithoutUsers_item_tran_history_requested_byTousersInput, item_tran_historyUncheckedCreateWithoutUsers_item_tran_history_requested_byTousersInput>
  }

  export type item_tran_historyUpdateWithWhereUniqueWithoutUsers_item_tran_history_requested_byTousersInput = {
    where: item_tran_historyWhereUniqueInput
    data: XOR<item_tran_historyUpdateWithoutUsers_item_tran_history_requested_byTousersInput, item_tran_historyUncheckedUpdateWithoutUsers_item_tran_history_requested_byTousersInput>
  }

  export type item_tran_historyUpdateManyWithWhereWithoutUsers_item_tran_history_requested_byTousersInput = {
    where: item_tran_historyScalarWhereInput
    data: XOR<item_tran_historyUpdateManyMutationInput, item_tran_historyUncheckedUpdateManyWithoutUsers_item_tran_history_requested_byTousersInput>
  }

  export type item_tran_historyUpsertWithWhereUniqueWithoutUsers_item_tran_history_approved_byTousersInput = {
    where: item_tran_historyWhereUniqueInput
    update: XOR<item_tran_historyUpdateWithoutUsers_item_tran_history_approved_byTousersInput, item_tran_historyUncheckedUpdateWithoutUsers_item_tran_history_approved_byTousersInput>
    create: XOR<item_tran_historyCreateWithoutUsers_item_tran_history_approved_byTousersInput, item_tran_historyUncheckedCreateWithoutUsers_item_tran_history_approved_byTousersInput>
  }

  export type item_tran_historyUpdateWithWhereUniqueWithoutUsers_item_tran_history_approved_byTousersInput = {
    where: item_tran_historyWhereUniqueInput
    data: XOR<item_tran_historyUpdateWithoutUsers_item_tran_history_approved_byTousersInput, item_tran_historyUncheckedUpdateWithoutUsers_item_tran_history_approved_byTousersInput>
  }

  export type item_tran_historyUpdateManyWithWhereWithoutUsers_item_tran_history_approved_byTousersInput = {
    where: item_tran_historyScalarWhereInput
    data: XOR<item_tran_historyUpdateManyMutationInput, item_tran_historyUncheckedUpdateManyWithoutUsers_item_tran_history_approved_byTousersInput>
  }

  export type finesUpsertWithWhereUniqueWithoutUsersInput = {
    where: finesWhereUniqueInput
    update: XOR<finesUpdateWithoutUsersInput, finesUncheckedUpdateWithoutUsersInput>
    create: XOR<finesCreateWithoutUsersInput, finesUncheckedCreateWithoutUsersInput>
  }

  export type finesUpdateWithWhereUniqueWithoutUsersInput = {
    where: finesWhereUniqueInput
    data: XOR<finesUpdateWithoutUsersInput, finesUncheckedUpdateWithoutUsersInput>
  }

  export type finesUpdateManyWithWhereWithoutUsersInput = {
    where: finesScalarWhereInput
    data: XOR<finesUpdateManyMutationInput, finesUncheckedUpdateManyWithoutUsersInput>
  }

  export type logsUpsertWithWhereUniqueWithoutUsersInput = {
    where: logsWhereUniqueInput
    update: XOR<logsUpdateWithoutUsersInput, logsUncheckedUpdateWithoutUsersInput>
    create: XOR<logsCreateWithoutUsersInput, logsUncheckedCreateWithoutUsersInput>
  }

  export type logsUpdateWithWhereUniqueWithoutUsersInput = {
    where: logsWhereUniqueInput
    data: XOR<logsUpdateWithoutUsersInput, logsUncheckedUpdateWithoutUsersInput>
  }

  export type logsUpdateManyWithWhereWithoutUsersInput = {
    where: logsScalarWhereInput
    data: XOR<logsUpdateManyMutationInput, logsUncheckedUpdateManyWithoutUsersInput>
  }

  export type logsScalarWhereInput = {
    AND?: logsScalarWhereInput | logsScalarWhereInput[]
    OR?: logsScalarWhereInput[]
    NOT?: logsScalarWhereInput | logsScalarWhereInput[]
    log_id?: IntFilter<"logs"> | number
    description?: StringFilter<"logs"> | string
    user_id?: IntFilter<"logs"> | number
    created_at?: DateTimeNullableFilter<"logs"> | Date | string | null
  }

  export type notificationsUpsertWithWhereUniqueWithoutUsers_notifications_from_user_idTousersInput = {
    where: notificationsWhereUniqueInput
    update: XOR<notificationsUpdateWithoutUsers_notifications_from_user_idTousersInput, notificationsUncheckedUpdateWithoutUsers_notifications_from_user_idTousersInput>
    create: XOR<notificationsCreateWithoutUsers_notifications_from_user_idTousersInput, notificationsUncheckedCreateWithoutUsers_notifications_from_user_idTousersInput>
  }

  export type notificationsUpdateWithWhereUniqueWithoutUsers_notifications_from_user_idTousersInput = {
    where: notificationsWhereUniqueInput
    data: XOR<notificationsUpdateWithoutUsers_notifications_from_user_idTousersInput, notificationsUncheckedUpdateWithoutUsers_notifications_from_user_idTousersInput>
  }

  export type notificationsUpdateManyWithWhereWithoutUsers_notifications_from_user_idTousersInput = {
    where: notificationsScalarWhereInput
    data: XOR<notificationsUpdateManyMutationInput, notificationsUncheckedUpdateManyWithoutUsers_notifications_from_user_idTousersInput>
  }

  export type notificationsUpsertWithWhereUniqueWithoutUsers_notifications_to_user_idTousersInput = {
    where: notificationsWhereUniqueInput
    update: XOR<notificationsUpdateWithoutUsers_notifications_to_user_idTousersInput, notificationsUncheckedUpdateWithoutUsers_notifications_to_user_idTousersInput>
    create: XOR<notificationsCreateWithoutUsers_notifications_to_user_idTousersInput, notificationsUncheckedCreateWithoutUsers_notifications_to_user_idTousersInput>
  }

  export type notificationsUpdateWithWhereUniqueWithoutUsers_notifications_to_user_idTousersInput = {
    where: notificationsWhereUniqueInput
    data: XOR<notificationsUpdateWithoutUsers_notifications_to_user_idTousersInput, notificationsUncheckedUpdateWithoutUsers_notifications_to_user_idTousersInput>
  }

  export type notificationsUpdateManyWithWhereWithoutUsers_notifications_to_user_idTousersInput = {
    where: notificationsScalarWhereInput
    data: XOR<notificationsUpdateManyMutationInput, notificationsUncheckedUpdateManyWithoutUsers_notifications_to_user_idTousersInput>
  }

  export type user_wishlistUpsertWithWhereUniqueWithoutUsersInput = {
    where: user_wishlistWhereUniqueInput
    update: XOR<user_wishlistUpdateWithoutUsersInput, user_wishlistUncheckedUpdateWithoutUsersInput>
    create: XOR<user_wishlistCreateWithoutUsersInput, user_wishlistUncheckedCreateWithoutUsersInput>
  }

  export type user_wishlistUpdateWithWhereUniqueWithoutUsersInput = {
    where: user_wishlistWhereUniqueInput
    data: XOR<user_wishlistUpdateWithoutUsersInput, user_wishlistUncheckedUpdateWithoutUsersInput>
  }

  export type user_wishlistUpdateManyWithWhereWithoutUsersInput = {
    where: user_wishlistScalarWhereInput
    data: XOR<user_wishlistUpdateManyMutationInput, user_wishlistUncheckedUpdateManyWithoutUsersInput>
  }

  export type library_cardsUpsertWithWhereUniqueWithoutUsersInput = {
    where: library_cardsWhereUniqueInput
    update: XOR<library_cardsUpdateWithoutUsersInput, library_cardsUncheckedUpdateWithoutUsersInput>
    create: XOR<library_cardsCreateWithoutUsersInput, library_cardsUncheckedCreateWithoutUsersInput>
  }

  export type library_cardsUpdateWithWhereUniqueWithoutUsersInput = {
    where: library_cardsWhereUniqueInput
    data: XOR<library_cardsUpdateWithoutUsersInput, library_cardsUncheckedUpdateWithoutUsersInput>
  }

  export type library_cardsUpdateManyWithWhereWithoutUsersInput = {
    where: library_cardsScalarWhereInput
    data: XOR<library_cardsUpdateManyMutationInput, library_cardsUncheckedUpdateManyWithoutUsersInput>
  }

  export type library_cardsScalarWhereInput = {
    AND?: library_cardsScalarWhereInput | library_cardsScalarWhereInput[]
    OR?: library_cardsScalarWhereInput[]
    NOT?: library_cardsScalarWhereInput | library_cardsScalarWhereInput[]
    card_id?: IntFilter<"library_cards"> | number
    user_id?: IntNullableFilter<"library_cards"> | number | null
    card_number?: StringFilter<"library_cards"> | string
    issued_at?: DateTimeFilter<"library_cards"> | Date | string
    expires_at?: DateTimeNullableFilter<"library_cards"> | Date | string | null
    status?: Enumcard_statusFilter<"library_cards"> | $Enums.card_status
  }

  export type usersCreateWithoutLibrary_cardsInput = {
    name?: string | null
    email?: string | null
    password_hash?: string | null
    role?: $Enums.users_role | null
    status?: $Enums.users_status | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    gender?: $Enums.gender | null
    phone_number?: string | null
    birth_date?: Date | string | null
    address?: string | null
    profile_image_url?: string | null
    item_tran?: item_tranCreateNestedManyWithoutUsersInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyCreateNestedManyWithoutUsers_item_tran_history_requested_byTousersInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyCreateNestedManyWithoutUsers_item_tran_history_approved_byTousersInput
    fines?: finesCreateNestedManyWithoutUsersInput
    logs?: logsCreateNestedManyWithoutUsersInput
    notifications_notifications_from_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_from_user_idTousersInput
    notifications_notifications_to_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_to_user_idTousersInput
    user_wishlist?: user_wishlistCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutLibrary_cardsInput = {
    user_id?: number
    name?: string | null
    email?: string | null
    password_hash?: string | null
    role?: $Enums.users_role | null
    status?: $Enums.users_status | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    gender?: $Enums.gender | null
    phone_number?: string | null
    birth_date?: Date | string | null
    address?: string | null
    profile_image_url?: string | null
    item_tran?: item_tranUncheckedCreateNestedManyWithoutUsersInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUncheckedCreateNestedManyWithoutUsers_item_tran_history_requested_byTousersInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUncheckedCreateNestedManyWithoutUsers_item_tran_history_approved_byTousersInput
    fines?: finesUncheckedCreateNestedManyWithoutUsersInput
    logs?: logsUncheckedCreateNestedManyWithoutUsersInput
    notifications_notifications_from_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_from_user_idTousersInput
    notifications_notifications_to_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_to_user_idTousersInput
    user_wishlist?: user_wishlistUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutLibrary_cardsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutLibrary_cardsInput, usersUncheckedCreateWithoutLibrary_cardsInput>
  }

  export type usersUpsertWithoutLibrary_cardsInput = {
    update: XOR<usersUpdateWithoutLibrary_cardsInput, usersUncheckedUpdateWithoutLibrary_cardsInput>
    create: XOR<usersCreateWithoutLibrary_cardsInput, usersUncheckedCreateWithoutLibrary_cardsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutLibrary_cardsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutLibrary_cardsInput, usersUncheckedUpdateWithoutLibrary_cardsInput>
  }

  export type usersUpdateWithoutLibrary_cardsInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    status?: NullableEnumusers_statusFieldUpdateOperationsInput | $Enums.users_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumgenderFieldUpdateOperationsInput | $Enums.gender | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    item_tran?: item_tranUpdateManyWithoutUsersNestedInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUpdateManyWithoutUsers_item_tran_history_requested_byTousersNestedInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUpdateManyWithoutUsers_item_tran_history_approved_byTousersNestedInput
    fines?: finesUpdateManyWithoutUsersNestedInput
    logs?: logsUpdateManyWithoutUsersNestedInput
    notifications_notifications_from_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_from_user_idTousersNestedInput
    notifications_notifications_to_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_to_user_idTousersNestedInput
    user_wishlist?: user_wishlistUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutLibrary_cardsInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    status?: NullableEnumusers_statusFieldUpdateOperationsInput | $Enums.users_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableEnumgenderFieldUpdateOperationsInput | $Enums.gender | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    item_tran?: item_tranUncheckedUpdateManyWithoutUsersNestedInput
    item_tran_history_item_tran_history_requested_byTousers?: item_tran_historyUncheckedUpdateManyWithoutUsers_item_tran_history_requested_byTousersNestedInput
    item_tran_history_item_tran_history_approved_byTousers?: item_tran_historyUncheckedUpdateManyWithoutUsers_item_tran_history_approved_byTousersNestedInput
    fines?: finesUncheckedUpdateManyWithoutUsersNestedInput
    logs?: logsUncheckedUpdateManyWithoutUsersNestedInput
    notifications_notifications_from_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_from_user_idTousersNestedInput
    notifications_notifications_to_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_to_user_idTousersNestedInput
    user_wishlist?: user_wishlistUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type item_tran_historyCreateManyItem_tranInput = {
    id?: number
    item_id?: number | null
    status?: $Enums.item_tran_history_status
    requested_by?: number | null
    approved_by?: number | null
    requested_at?: Date | string | null
    approved_at?: Date | string | null
    date_issued?: Date | string | null
    date_due?: Date | string | null
    date_returned?: Date | string | null
    remarks?: string | null
  }

  export type notificationsCreateManyItem_tranInput = {
    notification_id?: number
    type?: $Enums.notifications_type | null
    item_id?: number | null
    from_user_id?: number | null
    to_user_id?: number | null
    reservation_id?: number | null
    status?: $Enums.notifications_status | null
    message?: string | null
    created_at?: Date | string | null
    resolved_at?: Date | string | null
  }

  export type item_tran_historyUpdateWithoutItem_tranInput = {
    status?: Enumitem_tran_history_statusFieldUpdateOperationsInput | $Enums.item_tran_history_status
    requested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_issued?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_due?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_returned?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    library_items?: library_itemsUpdateOneWithoutItem_tran_historyNestedInput
    users_item_tran_history_requested_byTousers?: usersUpdateOneWithoutItem_tran_history_item_tran_history_requested_byTousersNestedInput
    users_item_tran_history_approved_byTousers?: usersUpdateOneWithoutItem_tran_history_item_tran_history_approved_byTousersNestedInput
    fines?: finesUpdateManyWithoutItem_tran_historyNestedInput
  }

  export type item_tran_historyUncheckedUpdateWithoutItem_tranInput = {
    id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: Enumitem_tran_history_statusFieldUpdateOperationsInput | $Enums.item_tran_history_status
    requested_by?: NullableIntFieldUpdateOperationsInput | number | null
    approved_by?: NullableIntFieldUpdateOperationsInput | number | null
    requested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_issued?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_due?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_returned?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    fines?: finesUncheckedUpdateManyWithoutItem_tran_historyNestedInput
  }

  export type item_tran_historyUncheckedUpdateManyWithoutItem_tranInput = {
    id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: Enumitem_tran_history_statusFieldUpdateOperationsInput | $Enums.item_tran_history_status
    requested_by?: NullableIntFieldUpdateOperationsInput | number | null
    approved_by?: NullableIntFieldUpdateOperationsInput | number | null
    requested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_issued?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_due?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_returned?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type notificationsUpdateWithoutItem_tranInput = {
    type?: NullableEnumnotifications_typeFieldUpdateOperationsInput | $Enums.notifications_type | null
    reservation_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumnotifications_statusFieldUpdateOperationsInput | $Enums.notifications_status | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    library_items?: library_itemsUpdateOneWithoutNotificationsNestedInput
    users_notifications_from_user_idTousers?: usersUpdateOneWithoutNotifications_notifications_from_user_idTousersNestedInput
    users_notifications_to_user_idTousers?: usersUpdateOneWithoutNotifications_notifications_to_user_idTousersNestedInput
  }

  export type notificationsUncheckedUpdateWithoutItem_tranInput = {
    notification_id?: IntFieldUpdateOperationsInput | number
    type?: NullableEnumnotifications_typeFieldUpdateOperationsInput | $Enums.notifications_type | null
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    from_user_id?: NullableIntFieldUpdateOperationsInput | number | null
    to_user_id?: NullableIntFieldUpdateOperationsInput | number | null
    reservation_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumnotifications_statusFieldUpdateOperationsInput | $Enums.notifications_status | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type notificationsUncheckedUpdateManyWithoutItem_tranInput = {
    notification_id?: IntFieldUpdateOperationsInput | number
    type?: NullableEnumnotifications_typeFieldUpdateOperationsInput | $Enums.notifications_type | null
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    from_user_id?: NullableIntFieldUpdateOperationsInput | number | null
    to_user_id?: NullableIntFieldUpdateOperationsInput | number | null
    reservation_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumnotifications_statusFieldUpdateOperationsInput | $Enums.notifications_status | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type finesCreateManyItem_tran_historyInput = {
    fine_id?: number
    user_id?: number | null
    amount?: Decimal | DecimalJsLike | number | string | null
    reason?: string | null
    status?: $Enums.fines_status | null
    created_at?: Date | string | null
    paid_at?: Date | string | null
  }

  export type finesUpdateWithoutItem_tran_historyInput = {
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumfines_statusFieldUpdateOperationsInput | $Enums.fines_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneWithoutFinesNestedInput
  }

  export type finesUncheckedUpdateWithoutItem_tran_historyInput = {
    fine_id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumfines_statusFieldUpdateOperationsInput | $Enums.fines_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type finesUncheckedUpdateManyWithoutItem_tran_historyInput = {
    fine_id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumfines_statusFieldUpdateOperationsInput | $Enums.fines_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type item_tranCreateManyLibrary_itemsInput = {
    tran_id?: number
    status?: $Enums.item_tran_status | null
    user_id?: number | null
    record_status?: $Enums.record_status | null
  }

  export type item_tran_historyCreateManyLibrary_itemsInput = {
    id?: number
    tran_id?: number | null
    status?: $Enums.item_tran_history_status
    requested_by?: number | null
    approved_by?: number | null
    requested_at?: Date | string | null
    approved_at?: Date | string | null
    date_issued?: Date | string | null
    date_due?: Date | string | null
    date_returned?: Date | string | null
    remarks?: string | null
  }

  export type notificationsCreateManyLibrary_itemsInput = {
    notification_id?: number
    type?: $Enums.notifications_type | null
    from_user_id?: number | null
    to_user_id?: number | null
    tran_id?: number | null
    reservation_id?: number | null
    status?: $Enums.notifications_status | null
    message?: string | null
    created_at?: Date | string | null
    resolved_at?: Date | string | null
  }

  export type user_wishlistCreateManyLibrary_itemsInput = {
    id?: number
    user_id?: number | null
    created_at?: Date | string | null
  }

  export type item_tranUpdateWithoutLibrary_itemsInput = {
    status?: NullableEnumitem_tran_statusFieldUpdateOperationsInput | $Enums.item_tran_status | null
    record_status?: NullableEnumrecord_statusFieldUpdateOperationsInput | $Enums.record_status | null
    users?: usersUpdateOneWithoutItem_tranNestedInput
    item_tran_history?: item_tran_historyUpdateManyWithoutItem_tranNestedInput
    notifications?: notificationsUpdateManyWithoutItem_tranNestedInput
  }

  export type item_tranUncheckedUpdateWithoutLibrary_itemsInput = {
    tran_id?: IntFieldUpdateOperationsInput | number
    status?: NullableEnumitem_tran_statusFieldUpdateOperationsInput | $Enums.item_tran_status | null
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    record_status?: NullableEnumrecord_statusFieldUpdateOperationsInput | $Enums.record_status | null
    item_tran_history?: item_tran_historyUncheckedUpdateManyWithoutItem_tranNestedInput
    notifications?: notificationsUncheckedUpdateManyWithoutItem_tranNestedInput
  }

  export type item_tranUncheckedUpdateManyWithoutLibrary_itemsInput = {
    tran_id?: IntFieldUpdateOperationsInput | number
    status?: NullableEnumitem_tran_statusFieldUpdateOperationsInput | $Enums.item_tran_status | null
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    record_status?: NullableEnumrecord_statusFieldUpdateOperationsInput | $Enums.record_status | null
  }

  export type item_tran_historyUpdateWithoutLibrary_itemsInput = {
    status?: Enumitem_tran_history_statusFieldUpdateOperationsInput | $Enums.item_tran_history_status
    requested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_issued?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_due?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_returned?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    item_tran?: item_tranUpdateOneWithoutItem_tran_historyNestedInput
    users_item_tran_history_requested_byTousers?: usersUpdateOneWithoutItem_tran_history_item_tran_history_requested_byTousersNestedInput
    users_item_tran_history_approved_byTousers?: usersUpdateOneWithoutItem_tran_history_item_tran_history_approved_byTousersNestedInput
    fines?: finesUpdateManyWithoutItem_tran_historyNestedInput
  }

  export type item_tran_historyUncheckedUpdateWithoutLibrary_itemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    tran_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: Enumitem_tran_history_statusFieldUpdateOperationsInput | $Enums.item_tran_history_status
    requested_by?: NullableIntFieldUpdateOperationsInput | number | null
    approved_by?: NullableIntFieldUpdateOperationsInput | number | null
    requested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_issued?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_due?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_returned?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    fines?: finesUncheckedUpdateManyWithoutItem_tran_historyNestedInput
  }

  export type item_tran_historyUncheckedUpdateManyWithoutLibrary_itemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    tran_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: Enumitem_tran_history_statusFieldUpdateOperationsInput | $Enums.item_tran_history_status
    requested_by?: NullableIntFieldUpdateOperationsInput | number | null
    approved_by?: NullableIntFieldUpdateOperationsInput | number | null
    requested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_issued?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_due?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_returned?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type notificationsUpdateWithoutLibrary_itemsInput = {
    type?: NullableEnumnotifications_typeFieldUpdateOperationsInput | $Enums.notifications_type | null
    reservation_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumnotifications_statusFieldUpdateOperationsInput | $Enums.notifications_status | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users_notifications_from_user_idTousers?: usersUpdateOneWithoutNotifications_notifications_from_user_idTousersNestedInput
    users_notifications_to_user_idTousers?: usersUpdateOneWithoutNotifications_notifications_to_user_idTousersNestedInput
    item_tran?: item_tranUpdateOneWithoutNotificationsNestedInput
  }

  export type notificationsUncheckedUpdateWithoutLibrary_itemsInput = {
    notification_id?: IntFieldUpdateOperationsInput | number
    type?: NullableEnumnotifications_typeFieldUpdateOperationsInput | $Enums.notifications_type | null
    from_user_id?: NullableIntFieldUpdateOperationsInput | number | null
    to_user_id?: NullableIntFieldUpdateOperationsInput | number | null
    tran_id?: NullableIntFieldUpdateOperationsInput | number | null
    reservation_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumnotifications_statusFieldUpdateOperationsInput | $Enums.notifications_status | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type notificationsUncheckedUpdateManyWithoutLibrary_itemsInput = {
    notification_id?: IntFieldUpdateOperationsInput | number
    type?: NullableEnumnotifications_typeFieldUpdateOperationsInput | $Enums.notifications_type | null
    from_user_id?: NullableIntFieldUpdateOperationsInput | number | null
    to_user_id?: NullableIntFieldUpdateOperationsInput | number | null
    tran_id?: NullableIntFieldUpdateOperationsInput | number | null
    reservation_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumnotifications_statusFieldUpdateOperationsInput | $Enums.notifications_status | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_wishlistUpdateWithoutLibrary_itemsInput = {
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneWithoutUser_wishlistNestedInput
  }

  export type user_wishlistUncheckedUpdateWithoutLibrary_itemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_wishlistUncheckedUpdateManyWithoutLibrary_itemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type item_tranCreateManyUsersInput = {
    tran_id?: number
    item_id?: number | null
    status?: $Enums.item_tran_status | null
    record_status?: $Enums.record_status | null
  }

  export type item_tran_historyCreateManyUsers_item_tran_history_requested_byTousersInput = {
    id?: number
    item_id?: number | null
    tran_id?: number | null
    status?: $Enums.item_tran_history_status
    approved_by?: number | null
    requested_at?: Date | string | null
    approved_at?: Date | string | null
    date_issued?: Date | string | null
    date_due?: Date | string | null
    date_returned?: Date | string | null
    remarks?: string | null
  }

  export type item_tran_historyCreateManyUsers_item_tran_history_approved_byTousersInput = {
    id?: number
    item_id?: number | null
    tran_id?: number | null
    status?: $Enums.item_tran_history_status
    requested_by?: number | null
    requested_at?: Date | string | null
    approved_at?: Date | string | null
    date_issued?: Date | string | null
    date_due?: Date | string | null
    date_returned?: Date | string | null
    remarks?: string | null
  }

  export type finesCreateManyUsersInput = {
    fine_id?: number
    item_tran_historyId?: number | null
    amount?: Decimal | DecimalJsLike | number | string | null
    reason?: string | null
    status?: $Enums.fines_status | null
    created_at?: Date | string | null
    paid_at?: Date | string | null
  }

  export type logsCreateManyUsersInput = {
    log_id?: number
    description: string
    created_at?: Date | string | null
  }

  export type notificationsCreateManyUsers_notifications_from_user_idTousersInput = {
    notification_id?: number
    type?: $Enums.notifications_type | null
    item_id?: number | null
    to_user_id?: number | null
    tran_id?: number | null
    reservation_id?: number | null
    status?: $Enums.notifications_status | null
    message?: string | null
    created_at?: Date | string | null
    resolved_at?: Date | string | null
  }

  export type notificationsCreateManyUsers_notifications_to_user_idTousersInput = {
    notification_id?: number
    type?: $Enums.notifications_type | null
    item_id?: number | null
    from_user_id?: number | null
    tran_id?: number | null
    reservation_id?: number | null
    status?: $Enums.notifications_status | null
    message?: string | null
    created_at?: Date | string | null
    resolved_at?: Date | string | null
  }

  export type user_wishlistCreateManyUsersInput = {
    id?: number
    item_id?: number | null
    created_at?: Date | string | null
  }

  export type library_cardsCreateManyUsersInput = {
    card_id?: number
    card_number: string
    issued_at?: Date | string
    expires_at?: Date | string | null
    status?: $Enums.card_status
  }

  export type item_tranUpdateWithoutUsersInput = {
    status?: NullableEnumitem_tran_statusFieldUpdateOperationsInput | $Enums.item_tran_status | null
    record_status?: NullableEnumrecord_statusFieldUpdateOperationsInput | $Enums.record_status | null
    library_items?: library_itemsUpdateOneWithoutItem_tranNestedInput
    item_tran_history?: item_tran_historyUpdateManyWithoutItem_tranNestedInput
    notifications?: notificationsUpdateManyWithoutItem_tranNestedInput
  }

  export type item_tranUncheckedUpdateWithoutUsersInput = {
    tran_id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumitem_tran_statusFieldUpdateOperationsInput | $Enums.item_tran_status | null
    record_status?: NullableEnumrecord_statusFieldUpdateOperationsInput | $Enums.record_status | null
    item_tran_history?: item_tran_historyUncheckedUpdateManyWithoutItem_tranNestedInput
    notifications?: notificationsUncheckedUpdateManyWithoutItem_tranNestedInput
  }

  export type item_tranUncheckedUpdateManyWithoutUsersInput = {
    tran_id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumitem_tran_statusFieldUpdateOperationsInput | $Enums.item_tran_status | null
    record_status?: NullableEnumrecord_statusFieldUpdateOperationsInput | $Enums.record_status | null
  }

  export type item_tran_historyUpdateWithoutUsers_item_tran_history_requested_byTousersInput = {
    status?: Enumitem_tran_history_statusFieldUpdateOperationsInput | $Enums.item_tran_history_status
    requested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_issued?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_due?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_returned?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    library_items?: library_itemsUpdateOneWithoutItem_tran_historyNestedInput
    item_tran?: item_tranUpdateOneWithoutItem_tran_historyNestedInput
    users_item_tran_history_approved_byTousers?: usersUpdateOneWithoutItem_tran_history_item_tran_history_approved_byTousersNestedInput
    fines?: finesUpdateManyWithoutItem_tran_historyNestedInput
  }

  export type item_tran_historyUncheckedUpdateWithoutUsers_item_tran_history_requested_byTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    tran_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: Enumitem_tran_history_statusFieldUpdateOperationsInput | $Enums.item_tran_history_status
    approved_by?: NullableIntFieldUpdateOperationsInput | number | null
    requested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_issued?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_due?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_returned?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    fines?: finesUncheckedUpdateManyWithoutItem_tran_historyNestedInput
  }

  export type item_tran_historyUncheckedUpdateManyWithoutUsers_item_tran_history_requested_byTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    tran_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: Enumitem_tran_history_statusFieldUpdateOperationsInput | $Enums.item_tran_history_status
    approved_by?: NullableIntFieldUpdateOperationsInput | number | null
    requested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_issued?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_due?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_returned?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type item_tran_historyUpdateWithoutUsers_item_tran_history_approved_byTousersInput = {
    status?: Enumitem_tran_history_statusFieldUpdateOperationsInput | $Enums.item_tran_history_status
    requested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_issued?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_due?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_returned?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    library_items?: library_itemsUpdateOneWithoutItem_tran_historyNestedInput
    item_tran?: item_tranUpdateOneWithoutItem_tran_historyNestedInput
    users_item_tran_history_requested_byTousers?: usersUpdateOneWithoutItem_tran_history_item_tran_history_requested_byTousersNestedInput
    fines?: finesUpdateManyWithoutItem_tran_historyNestedInput
  }

  export type item_tran_historyUncheckedUpdateWithoutUsers_item_tran_history_approved_byTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    tran_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: Enumitem_tran_history_statusFieldUpdateOperationsInput | $Enums.item_tran_history_status
    requested_by?: NullableIntFieldUpdateOperationsInput | number | null
    requested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_issued?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_due?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_returned?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    fines?: finesUncheckedUpdateManyWithoutItem_tran_historyNestedInput
  }

  export type item_tran_historyUncheckedUpdateManyWithoutUsers_item_tran_history_approved_byTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    tran_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: Enumitem_tran_history_statusFieldUpdateOperationsInput | $Enums.item_tran_history_status
    requested_by?: NullableIntFieldUpdateOperationsInput | number | null
    requested_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_issued?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_due?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    date_returned?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type finesUpdateWithoutUsersInput = {
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumfines_statusFieldUpdateOperationsInput | $Enums.fines_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    item_tran_history?: item_tran_historyUpdateOneWithoutFinesNestedInput
  }

  export type finesUncheckedUpdateWithoutUsersInput = {
    fine_id?: IntFieldUpdateOperationsInput | number
    item_tran_historyId?: NullableIntFieldUpdateOperationsInput | number | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumfines_statusFieldUpdateOperationsInput | $Enums.fines_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type finesUncheckedUpdateManyWithoutUsersInput = {
    fine_id?: IntFieldUpdateOperationsInput | number
    item_tran_historyId?: NullableIntFieldUpdateOperationsInput | number | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumfines_statusFieldUpdateOperationsInput | $Enums.fines_status | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type logsUpdateWithoutUsersInput = {
    description?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type logsUncheckedUpdateWithoutUsersInput = {
    log_id?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type logsUncheckedUpdateManyWithoutUsersInput = {
    log_id?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type notificationsUpdateWithoutUsers_notifications_from_user_idTousersInput = {
    type?: NullableEnumnotifications_typeFieldUpdateOperationsInput | $Enums.notifications_type | null
    reservation_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumnotifications_statusFieldUpdateOperationsInput | $Enums.notifications_status | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    library_items?: library_itemsUpdateOneWithoutNotificationsNestedInput
    users_notifications_to_user_idTousers?: usersUpdateOneWithoutNotifications_notifications_to_user_idTousersNestedInput
    item_tran?: item_tranUpdateOneWithoutNotificationsNestedInput
  }

  export type notificationsUncheckedUpdateWithoutUsers_notifications_from_user_idTousersInput = {
    notification_id?: IntFieldUpdateOperationsInput | number
    type?: NullableEnumnotifications_typeFieldUpdateOperationsInput | $Enums.notifications_type | null
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    to_user_id?: NullableIntFieldUpdateOperationsInput | number | null
    tran_id?: NullableIntFieldUpdateOperationsInput | number | null
    reservation_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumnotifications_statusFieldUpdateOperationsInput | $Enums.notifications_status | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type notificationsUncheckedUpdateManyWithoutUsers_notifications_from_user_idTousersInput = {
    notification_id?: IntFieldUpdateOperationsInput | number
    type?: NullableEnumnotifications_typeFieldUpdateOperationsInput | $Enums.notifications_type | null
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    to_user_id?: NullableIntFieldUpdateOperationsInput | number | null
    tran_id?: NullableIntFieldUpdateOperationsInput | number | null
    reservation_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumnotifications_statusFieldUpdateOperationsInput | $Enums.notifications_status | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type notificationsUpdateWithoutUsers_notifications_to_user_idTousersInput = {
    type?: NullableEnumnotifications_typeFieldUpdateOperationsInput | $Enums.notifications_type | null
    reservation_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumnotifications_statusFieldUpdateOperationsInput | $Enums.notifications_status | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    library_items?: library_itemsUpdateOneWithoutNotificationsNestedInput
    users_notifications_from_user_idTousers?: usersUpdateOneWithoutNotifications_notifications_from_user_idTousersNestedInput
    item_tran?: item_tranUpdateOneWithoutNotificationsNestedInput
  }

  export type notificationsUncheckedUpdateWithoutUsers_notifications_to_user_idTousersInput = {
    notification_id?: IntFieldUpdateOperationsInput | number
    type?: NullableEnumnotifications_typeFieldUpdateOperationsInput | $Enums.notifications_type | null
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    from_user_id?: NullableIntFieldUpdateOperationsInput | number | null
    tran_id?: NullableIntFieldUpdateOperationsInput | number | null
    reservation_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumnotifications_statusFieldUpdateOperationsInput | $Enums.notifications_status | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type notificationsUncheckedUpdateManyWithoutUsers_notifications_to_user_idTousersInput = {
    notification_id?: IntFieldUpdateOperationsInput | number
    type?: NullableEnumnotifications_typeFieldUpdateOperationsInput | $Enums.notifications_type | null
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    from_user_id?: NullableIntFieldUpdateOperationsInput | number | null
    tran_id?: NullableIntFieldUpdateOperationsInput | number | null
    reservation_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableEnumnotifications_statusFieldUpdateOperationsInput | $Enums.notifications_status | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_wishlistUpdateWithoutUsersInput = {
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    library_items?: library_itemsUpdateOneWithoutUser_wishlistNestedInput
  }

  export type user_wishlistUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_wishlistUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type library_cardsUpdateWithoutUsersInput = {
    card_number?: StringFieldUpdateOperationsInput | string
    issued_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: Enumcard_statusFieldUpdateOperationsInput | $Enums.card_status
  }

  export type library_cardsUncheckedUpdateWithoutUsersInput = {
    card_id?: IntFieldUpdateOperationsInput | number
    card_number?: StringFieldUpdateOperationsInput | string
    issued_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: Enumcard_statusFieldUpdateOperationsInput | $Enums.card_status
  }

  export type library_cardsUncheckedUpdateManyWithoutUsersInput = {
    card_id?: IntFieldUpdateOperationsInput | number
    card_number?: StringFieldUpdateOperationsInput | string
    issued_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: Enumcard_statusFieldUpdateOperationsInput | $Enums.card_status
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