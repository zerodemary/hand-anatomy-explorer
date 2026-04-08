import { SOURCES } from "@/data/catalog";
import type { Source } from "@/data/schema";

export type SourceTrace = {
  sourceIds: string[];
  sources: Source[];
};

function uniqueInOrder(items: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const item of items) {
    if (!seen.has(item)) {
      seen.add(item);
      result.push(item);
    }
  }

  return result;
}

export function buildSourceTrace(sourceIds: string[]): SourceTrace {
  const deduped = uniqueInOrder(sourceIds);
  const sourceMap = new Map(SOURCES.map((source) => [source.id, source]));
  const sources = deduped.map((id) => sourceMap.get(id)).filter((v): v is Source => Boolean(v));

  return {
    sourceIds: deduped,
    sources
  };
}

export function buildSourceTraceFromRows(rows: Array<{ sourceIds: string[] }>): SourceTrace {
  return buildSourceTrace(rows.flatMap((row) => row.sourceIds));
}
