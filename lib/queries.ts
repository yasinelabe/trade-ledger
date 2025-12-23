'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import db from "./db";
import { revalidatePath } from "next/cache";

export type Trade = {
  id: number;
  date: string;
  month: string;
  pair: string;
  profit: number;
  loss: number;
};

/**
 * Auth guard
 */
async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session;
}

/**
 * Helper wrapper
 */
async function withAuth<T>(fn: () => Promise<T>): Promise<T> {
  await requireAuth();
  return fn();
}

export async function getTradesByMonth(month: string): Promise<Trade[]> {
    const stmt = db.prepare('SELECT * FROM trades WHERE month = ? ORDER BY date');
    return stmt.all(month) as Trade[];
}

export async function getAllTrades(): Promise<Trade[]> {
    return withAuth(async () => {
        const stmt = db.prepare('SELECT * FROM trades ORDER BY date DESC');
        return stmt.all() as Trade[];
    });
}

export async function getUniqueMonths(): Promise<string[]> {
    return withAuth(async() => {
        const stmt = db.prepare('SELECT DISTINCT month FROM trades ORDER BY month DESC');
        return stmt.all().map((row: any) => row.month);
    });
}

export async function insertTrade(date: string, pair: string, profit: number, loss: number) {
    return withAuth(async() => {
        const month = date.substring(0, 7); // YYYY-MM
        const stmt = db.prepare(
            'INSERT INTO trades (date, month, pair, profit, loss) VALUES (?, ?, ?, ?, ?)'
        );
        stmt.run(date, month, pair, profit, loss);
    });
}

export async function deleteTrade(id: number) {
    return withAuth(async() => {
        const stmt = db.prepare('DELETE FROM trades WHERE id = ?');
        stmt.run(id);
    });
}

export async function getTradeById(id: number): Promise<Trade | undefined> {
    return withAuth(async() => {
        const stmt = db.prepare('SELECT * FROM trades WHERE id = ?');
        return stmt.get(id) as Trade | undefined;
    });
}
export async function updateTrade(id: number, date: string, pair: string, profit: number, loss: number) {
    return withAuth(async() => {
        const month = date.substring(0, 7);
        const stmt = db.prepare(
            'UPDATE trades SET date = ?, month = ?, pair = ?, profit = ?, loss = ? WHERE id = ?'
        );
    });
}

export async function deleteTradeAction(id: number) {
    return withAuth(async() => {
        // This runs ONLY on the server
        const stmt = db.prepare('DELETE FROM trades WHERE id = ?');
        stmt.run(id);
        revalidatePath('/trades'); // or '/'
    });
}

export async function addTradeAction(data: {
    date: string;
    pair: string;
    profit: number;
    loss: number;
  }) {
    return withAuth(async () => {
      const month = data.date.substring(0, 7);
      const stmt = db.prepare(
        'INSERT INTO trades (date, month, pair, profit, loss) VALUES (?, ?, ?, ?, ?)'
      );
      stmt.run(data.date, month, data.pair, data.profit, data.loss);
    });
  }
  