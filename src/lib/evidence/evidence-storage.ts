// src/lib/evidence/evidence-storage.ts — Durable IndexedDB Evidence Storage Engine

const DB_NAME = "inforight_evidence_db";
const DB_VERSION = 1;
const STORE_NAME = "evidence_blobs";

interface StoredEvidenceRecord {
  evidenceId: string;
  blob: Blob;
  mimeType: string;
  fileName: string;
  createdAt: string;
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB is not supported in this environment"));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "evidenceId" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Persists an image Blob/File durably into IndexedDB
 */
export async function saveEvidenceBlob(
  evidenceId: string,
  blob: Blob,
  fileName: string
): Promise<string> {
  if (typeof window === "undefined") return evidenceId;

  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const record: StoredEvidenceRecord = {
        evidenceId,
        blob,
        mimeType: blob.type,
        fileName,
        createdAt: new Date().toISOString(),
      };

      const request = store.put(record);
      request.onsuccess = () => resolve(evidenceId);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn("IndexedDB save failed, fallback to in-memory URL:", err);
    return evidenceId;
  }
}

/**
 * Retrieves an image Blob from IndexedDB and creates a fresh object URL
 */
export async function getEvidenceBlobUrl(evidenceId: string): Promise<string | null> {
  if (typeof window === "undefined") return null;

  try {
    const db = await openDatabase();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(evidenceId);

      request.onsuccess = () => {
        const record = request.result as StoredEvidenceRecord | undefined;
        if (record && record.blob) {
          const url = URL.createObjectURL(record.blob);
          resolve(url);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

/**
 * Deletes an evidence Blob from IndexedDB
 */
export async function deleteEvidenceBlob(evidenceId: string): Promise<void> {
  if (typeof window === "undefined") return;

  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const request = store.delete(evidenceId);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch {
    // Ignore error on deletion
  }
}
