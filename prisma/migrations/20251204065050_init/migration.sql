-- CreateTable
CREATE TABLE "Snippet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL DEFAULT '',
    "language" TEXT NOT NULL DEFAULT 'javascript',
    "protected" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Snippet_createdAt_idx" ON "Snippet"("createdAt");
