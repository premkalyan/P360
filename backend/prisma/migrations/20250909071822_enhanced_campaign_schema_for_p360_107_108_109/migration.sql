-- CreateEnum
CREATE TYPE "public"."CampaignAssetType" AS ENUM ('banner', 'video', 'image', 'audio', 'document', 'creative');

-- CreateEnum
CREATE TYPE "public"."CampaignAssetStatus" AS ENUM ('active', 'inactive', 'processing', 'failed');

-- CreateEnum
CREATE TYPE "public"."CampaignWorkflowStatus" AS ENUM ('pending', 'in_progress', 'completed', 'failed', 'skipped');

-- AlterTable
ALTER TABLE "public"."campaigns" ADD COLUMN     "template_id" UUID;

-- CreateTable
CREATE TABLE "public"."campaign_templates" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "category" VARCHAR(100) NOT NULL,
    "config" JSONB NOT NULL DEFAULT '{}',
    "steps" JSONB NOT NULL DEFAULT '[]',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "campaign_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."campaign_assets" (
    "id" UUID NOT NULL,
    "campaign_id" UUID NOT NULL,
    "asset_type" "public"."CampaignAssetType" NOT NULL,
    "file_name" VARCHAR(255) NOT NULL,
    "file_path" VARCHAR(500) NOT NULL,
    "file_size" INTEGER NOT NULL,
    "mime_type" VARCHAR(100) NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "status" "public"."CampaignAssetStatus" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "campaign_assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."campaign_targeting" (
    "id" UUID NOT NULL,
    "campaign_id" UUID NOT NULL,
    "demographics" JSONB NOT NULL DEFAULT '{}',
    "geographics" JSONB NOT NULL DEFAULT '{}',
    "interests" JSONB NOT NULL DEFAULT '[]',
    "behaviors" JSONB NOT NULL DEFAULT '[]',
    "customAudiences" JSONB NOT NULL DEFAULT '[]',
    "lookalikes" JSONB NOT NULL DEFAULT '[]',
    "exclusions" JSONB NOT NULL DEFAULT '[]',
    "estimated_reach" INTEGER,
    "targeting_score" DECIMAL(3,2),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "campaign_targeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."campaign_analytics" (
    "id" UUID NOT NULL,
    "campaign_id" UUID NOT NULL,
    "total_impressions" BIGINT NOT NULL DEFAULT 0,
    "total_clicks" BIGINT NOT NULL DEFAULT 0,
    "total_spend" DECIMAL(15,4) NOT NULL DEFAULT 0,
    "total_conversions" BIGINT NOT NULL DEFAULT 0,
    "ctr" DECIMAL(8,4) NOT NULL DEFAULT 0,
    "cpm" DECIMAL(8,4) NOT NULL DEFAULT 0,
    "cpc" DECIMAL(8,4) NOT NULL DEFAULT 0,
    "cpa" DECIMAL(8,4) NOT NULL DEFAULT 0,
    "roas" DECIMAL(8,4) NOT NULL DEFAULT 0,
    "quality_score" DECIMAL(3,2),
    "last_calculated_at" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "campaign_analytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."campaign_workflows" (
    "id" UUID NOT NULL,
    "campaign_id" UUID NOT NULL,
    "step_name" VARCHAR(100) NOT NULL,
    "step_order" INTEGER NOT NULL,
    "status" "public"."CampaignWorkflowStatus" NOT NULL,
    "data" JSONB NOT NULL DEFAULT '{}',
    "completed_at" TIMESTAMPTZ,
    "completed_by" UUID,
    "validation_errors" JSONB DEFAULT '[]',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "campaign_workflows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "campaign_templates_tenant_id_idx" ON "public"."campaign_templates"("tenant_id");

-- CreateIndex
CREATE INDEX "campaign_templates_category_idx" ON "public"."campaign_templates"("category");

-- CreateIndex
CREATE INDEX "campaign_assets_campaign_id_idx" ON "public"."campaign_assets"("campaign_id");

-- CreateIndex
CREATE INDEX "campaign_assets_asset_type_idx" ON "public"."campaign_assets"("asset_type");

-- CreateIndex
CREATE UNIQUE INDEX "campaign_targeting_campaign_id_key" ON "public"."campaign_targeting"("campaign_id");

-- CreateIndex
CREATE UNIQUE INDEX "campaign_analytics_campaign_id_key" ON "public"."campaign_analytics"("campaign_id");

-- CreateIndex
CREATE INDEX "campaign_workflows_campaign_id_step_order_idx" ON "public"."campaign_workflows"("campaign_id", "step_order");

-- CreateIndex
CREATE UNIQUE INDEX "campaign_workflows_campaign_id_step_name_key" ON "public"."campaign_workflows"("campaign_id", "step_name");

-- CreateIndex
CREATE INDEX "campaigns_template_id_idx" ON "public"."campaigns"("template_id");

-- AddForeignKey
ALTER TABLE "public"."campaigns" ADD CONSTRAINT "campaigns_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "public"."campaign_templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."campaign_templates" ADD CONSTRAINT "campaign_templates_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."campaign_assets" ADD CONSTRAINT "campaign_assets_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."campaign_targeting" ADD CONSTRAINT "campaign_targeting_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."campaign_analytics" ADD CONSTRAINT "campaign_analytics_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."campaign_workflows" ADD CONSTRAINT "campaign_workflows_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."campaign_workflows" ADD CONSTRAINT "campaign_workflows_completed_by_fkey" FOREIGN KEY ("completed_by") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
