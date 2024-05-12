-- CreateTable
CREATE TABLE "websites" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "name" VARCHAR(50),
    "active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "websites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" SERIAL NOT NULL,
    "websitesId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" VARCHAR(10) NOT NULL,
    "file_slug" VARCHAR(50),

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audits" (
    "id" SERIAL NOT NULL,
    "reportsId" INTEGER NOT NULL,
    "audit_detailsId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "actual_value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "audits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_details" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "key" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),
    "documentationLink" VARCHAR(100),
    "unit" VARCHAR(10),

    CONSTRAINT "audit_details_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_websitesId_fkey" FOREIGN KEY ("websitesId") REFERENCES "websites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audits" ADD CONSTRAINT "audits_audit_detailsId_fkey" FOREIGN KEY ("audit_detailsId") REFERENCES "audit_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audits" ADD CONSTRAINT "audits_reportsId_fkey" FOREIGN KEY ("reportsId") REFERENCES "reports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
