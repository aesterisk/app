import "server-only";

import { sql as vercelSql } from "@vercel/postgres";

type Primitive = string | number | boolean | undefined | null;

const MIN_DB_CALLS = 1;
let dbCalls = 0;

export const sql = (strings: TemplateStringsArray, ...values: Primitive[]) => {
	// todo: redo for prod with some sort of analytics
	dbCalls++;

	if(dbCalls > MIN_DB_CALLS) console.warn("\n# WARN #\nSQL calls reached warning threshold! Total SQL calls for this request:", dbCalls, "\n");

	return vercelSql(strings, ...values);
};

// todo: fix eslint config, too strict
// eslint-disable-next-line no-return-assign
export const resetDatabaseMetrics = () => dbCalls = 0;

export const getDatabaseMetrics = () => dbCalls;
