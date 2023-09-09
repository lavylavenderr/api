-- CreateTable
CREATE TABLE "Request" (
    "id" INTEGER NOT NULL,
    "requestip" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Request_id_key" ON "Request"("id");
