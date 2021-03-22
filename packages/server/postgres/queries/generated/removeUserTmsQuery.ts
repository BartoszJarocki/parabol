/** Types generated for queries found in "packages/server/postgres/queries/src/removeUserTmsQuery.sql" */
import { PreparedQuery } from '@pgtyped/query';

export type TierEnum = 'personal' | 'pro' | 'enterprise';

export type AuthTokenRole = 'su';

export type stringArray = (string)[];

export type JsonArray = (null | boolean | number | string | Json[] | { [key: string]: Json })[];

/** 'RemoveUserTmsQuery' parameters type */
export interface IRemoveUserTmsQueryParams {
  ids: Array<string | null | void>;
  teamIds: stringArray | null | void;
}

/** 'RemoveUserTmsQuery' return type */
export interface IRemoveUserTmsQueryResult {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  inactive: boolean;
  lastSeenAt: Date | null;
  preferredName: string;
  tier: TierEnum;
  picture: string;
  tms: stringArray;
  featureFlags: stringArray;
  identities: JsonArray;
  lastSeenAtURLs: stringArray | null;
  segmentId: string | null;
  newFeatureId: string | null;
  overLimitCopy: string | null;
  isRemoved: boolean;
  reasonRemoved: string | null;
  rol: AuthTokenRole | null;
  payLaterClickCount: number;
}

/** 'RemoveUserTmsQuery' query type */
export interface IRemoveUserTmsQueryQuery {
  params: IRemoveUserTmsQueryParams;
  result: IRemoveUserTmsQueryResult;
}

const removeUserTmsQueryIR: any = {"name":"removeUserTmsQuery","params":[{"name":"ids","codeRefs":{"defined":{"a":39,"b":41,"line":3,"col":9},"used":[{"a":118,"b":120,"line":7,"col":13}]},"transform":{"type":"array_spread"}},{"name":"teamIds","transform":{"type":"scalar"},"codeRefs":{"used":[{"a":96,"b":102,"line":6,"col":23}]}}],"usedParamSet":{"teamIds":true,"ids":true},"statement":{"body":"UPDATE \"User\" SET\n  tms = arr_diff(tms, :teamIds)\nWHERE id IN :ids\nRETURNING *","loc":{"a":55,"b":132,"line":5,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * UPDATE "User" SET
 *   tms = arr_diff(tms, :teamIds)
 * WHERE id IN :ids
 * RETURNING *
 * ```
 */
export const removeUserTmsQuery = new PreparedQuery<IRemoveUserTmsQueryParams,IRemoveUserTmsQueryResult>(removeUserTmsQueryIR);


