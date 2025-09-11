-- CreateEnum
CREATE TYPE "public"."ActivityType" AS ENUM ('organization_created', 'organization_updated', 'organization_deleted', 'user_added', 'user_removed', 'status_changed', 'budget_changed', 'campaign_created', 'campaign_updated', 'campaign_deleted', 'asset_uploaded', 'targeting_updated', 'system_action');

-- CreateEnum
CREATE TYPE "public"."ActivityCategory" AS ENUM ('organization', 'user', 'campaign', 'system', 'audit');

-- CreateTable
CREATE TABLE "public"."activities" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "organization_id" UUID,
    "campaign_id" UUID,
    "user_id" UUID,
    "actor_user_id" UUID,
    "type" "public"."ActivityType" NOT NULL,
    "category" "public"."ActivityCategory" NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "ip_address" VARCHAR(45),
    "user_agent" VARCHAR(500),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "activities_tenant_id_idx" ON "public"."activities"("tenant_id");

-- CreateIndex
CREATE INDEX "activities_organization_id_idx" ON "public"."activities"("organization_id");

-- CreateIndex
CREATE INDEX "activities_campaign_id_idx" ON "public"."activities"("campaign_id");

-- CreateIndex
CREATE INDEX "activities_user_id_idx" ON "public"."activities"("user_id");

-- CreateIndex
CREATE INDEX "activities_actor_user_id_idx" ON "public"."activities"("actor_user_id");

-- CreateIndex
CREATE INDEX "activities_type_idx" ON "public"."activities"("type");

-- CreateIndex
CREATE INDEX "activities_category_idx" ON "public"."activities"("category");

-- CreateIndex
CREATE INDEX "activities_created_at_idx" ON "public"."activities"("created_at");

-- AddForeignKey
ALTER TABLE "public"."activities" ADD CONSTRAINT "activities_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."activities" ADD CONSTRAINT "activities_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."activities" ADD CONSTRAINT "activities_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."activities" ADD CONSTRAINT "activities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."activities" ADD CONSTRAINT "activities_actor_user_id_fkey" FOREIGN KEY ("actor_user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
