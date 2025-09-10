-- CreateEnum
CREATE TYPE "public"."OrganizationType" AS ENUM ('advertiser', 'publisher', 'buyer');

-- CreateEnum
CREATE TYPE "public"."OrganizationStatus" AS ENUM ('active', 'inactive', 'suspended');

-- CreateEnum
CREATE TYPE "public"."OrganizationSize" AS ENUM ('startup', 'small', 'medium', 'large', 'enterprise');

-- AlterTable
ALTER TABLE "public"."campaigns" ADD COLUMN     "organization_id" UUID;

-- CreateTable
CREATE TABLE "public"."organizations" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" "public"."OrganizationType" NOT NULL,
    "status" "public"."OrganizationStatus" NOT NULL DEFAULT 'active',
    "description" TEXT,
    "website" VARCHAR(500),
    "industry" VARCHAR(100),
    "size" "public"."OrganizationSize",
    "settings" JSONB NOT NULL DEFAULT '{}',
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."organization_users" (
    "id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'viewer',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "organization_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "organizations_tenant_id_idx" ON "public"."organizations"("tenant_id");

-- CreateIndex
CREATE INDEX "organizations_type_idx" ON "public"."organizations"("type");

-- CreateIndex
CREATE INDEX "organizations_status_idx" ON "public"."organizations"("status");

-- CreateIndex
CREATE INDEX "organizations_name_idx" ON "public"."organizations"("name");

-- CreateIndex
CREATE INDEX "organization_users_organization_id_idx" ON "public"."organization_users"("organization_id");

-- CreateIndex
CREATE INDEX "organization_users_user_id_idx" ON "public"."organization_users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "organization_users_organization_id_user_id_key" ON "public"."organization_users"("organization_id", "user_id");

-- CreateIndex
CREATE INDEX "campaigns_organization_id_idx" ON "public"."campaigns"("organization_id");

-- AddForeignKey
ALTER TABLE "public"."campaigns" ADD CONSTRAINT "campaigns_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."organizations" ADD CONSTRAINT "organizations_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."organization_users" ADD CONSTRAINT "organization_users_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."organization_users" ADD CONSTRAINT "organization_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
