"use client";
import { useEffect, useState, useCallback } from "react";
import { openDB, DBSchema, IDBPDatabase } from "idb";
import { USER_DATA_T } from "@/types/user-types";

interface UserDB extends DBSchema {
  users: {
    key: string;
    value: USER_DATA_T;
  };
}

export function useIndexedDBUsers() {
  const [db, setDb] = useState<IDBPDatabase<UserDB> | null>(null);

  // Initialize IndexedDB
  useEffect(() => {
    const initDB = async () => {
      const database = await openDB<UserDB>("UserDatabase", 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("users")) {
            db.createObjectStore("users", { keyPath: "id" });
          }
        },
      });
      setDb(database);
    };

    initDB();
  }, []);

  // Save a single user
  const saveUser = useCallback(
    async (user: USER_DATA_T) => {
      if (!db || !user?.id) return;
      await db.put("users", user);
    },
    [db]
  );

  // Save multiple users
  const saveUsers = useCallback(
    async (users: USER_DATA_T[]) => {
      if (!db) return;

      const tx = db.transaction("users", "readwrite");
      const store = tx.objectStore("users");

      for (const user of users) {
        if (!user?.id) continue;
        await store.put(user);
      }

      await tx.done;
    },
    [db]
  );

  const getAllUsers = useCallback(async () => {
    if (!db) return [];
    return await db.getAll("users");
  }, [db]);

  const getUserById = useCallback(
    async (id: string) => {
      if (!db) return null;
      return await db.get("users", id);
    },
    [db]
  );

  const patchUser = useCallback(
    async (id: string, updates: Partial<USER_DATA_T>) => {
      if (!db) return null;
      const existing = await db.get("users", id);
      if (!existing) return null;

      const updatedUser = { ...existing, ...updates };
      await db.put("users", updatedUser);
      return updatedUser;
    },
    [db]
  );

  const clearAllUsers = useCallback(async () => {
    if (!db) return;
    await db.clear("users");
  }, [db]);

  return {
    ready: !!db,
    saveUser,
    saveUsers,
    getAllUsers,
    getUserById,
    patchUser,
    clearAllUsers,
  };
}
