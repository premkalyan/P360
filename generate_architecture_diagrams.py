#!/usr/bin/env python3
"""
P360 Architecture Diagrams Generator
Using diagrams library to create professional cloud architecture diagrams
"""

from diagrams import Diagram, Cluster, Edge
from diagrams.aws.compute import ECS, Fargate, Lambda
from diagrams.aws.database import RDS, Elasticache
from diagrams.aws.network import ALB, CloudFront, VPC, NATGateway, InternetGateway
from diagrams.aws.storage import S3
from diagrams.aws.integration import SQS, SNS
from diagrams.aws.security import WAF, SecretsManager, IAMRole
from diagrams.aws.management import Cloudwatch, SystemsManager
from diagrams.aws.analytics import Kinesis, Glue, Athena
from diagrams.generic.blank import Blank
from diagrams.onprem.client import Users
from diagrams.onprem.analytics import Metabase
from diagrams.saas.identity import Auth0
from diagrams.azure.identity import ActiveDirectory

def create_overall_architecture():
    """Create overall P360 system architecture diagram"""
    with Diagram("P360 Display Advertising Platform - Overall Architecture", 
                 filename="p360_overall_architecture", 
                 show=False, 
                 direction="TB"):
        
        # Users and CDN
        users = Users("Users")
        cdn = CloudFront("CloudFront CDN")
        
        with Cluster("AWS VPC"):
            # Load Balancer
            alb = ALB("Application Load Balancer")
            
            with Cluster("ECS Fargate Cluster"):
                backend = Fargate("FastAPI Backend")
                frontend = Fargate("Next.js Frontend")
            
            with Cluster("Data Layer"):
                db = RDS("PostgreSQL")
                cache = Elasticache("Redis Cache")
                storage = S3("S3 Data Lake")
            
            with Cluster("Processing"):
                functions = Lambda("Lambda Functions")
                queues = SQS("SQS/SNS Queues")
        
        with Cluster("External APIs"):
            ttd = Blank("The Trade Desk")
            bombora = Blank("Bombora")
            salesforce = Blank("Salesforce")
        
        with Cluster("Authentication"):
            entra = ActiveDirectory("Microsoft Entra ID")
            auth0 = Auth0("Auth0")
        
        with Cluster("Analytics"):
            metabase = Metabase("Metabase")
        
        with Cluster("Security & Monitoring"):
            waf = WAF("AWS WAF")
            monitoring = Cloudwatch("CloudWatch")
        
        # Connections
        users >> cdn >> waf >> alb
        alb >> backend
        alb >> frontend
        backend >> db
        backend >> cache
        backend >> storage
        backend >> functions
        backend >> queues
        backend >> ttd
        backend >> bombora
        backend >> salesforce
        entra >> backend
        auth0 >> backend
        backend >> metabase
        backend >> monitoring
        frontend >> monitoring

def create_aws_infrastructure():
    """Create detailed AWS infrastructure diagram"""
    with Diagram("P360 AWS Infrastructure - Detailed View", 
                 filename="p360_aws_infrastructure", 
                 show=False, 
                 direction="TB"):
        
        users = Users("Users")
        
        with Cluster("Internet"):
            internet = InternetGateway("Internet Gateway")
        
        with Cluster("AWS VPC - 10.0.0.0/16"):
            with Cluster("Public Subnets"):
                alb = ALB("Application Load Balancer")
                nat = NATGateway("NAT Gateway")
                
            with Cluster("Private Subnets - Application Tier"):
                with Cluster("ECS Fargate Cluster"):
                    backend_tasks = ECS("FastAPI Tasks")
                    frontend_tasks = ECS("Next.js Tasks")
                
            with Cluster("Private Subnets - Data Tier"):
                rds = RDS("PostgreSQL Multi-AZ")
                redis = Elasticache("Redis Cluster")
                
            with Cluster("AWS Managed Services"):
                s3 = S3("S3 Buckets")
                lambda_func = Lambda("Lambda Functions")
                sqs = SQS("SQS Queues")
                secrets = SecretsManager("Secrets Manager")
                params = SystemsManager("Parameter Store")
                
        with Cluster("Security"):
            waf = WAF("AWS WAF")
            iam = IAMRole("IAM Roles")
            
        with Cluster("Monitoring"):
            cloudwatch = Cloudwatch("CloudWatch")
            
        # Connections
        users >> internet >> waf >> alb
        alb >> backend_tasks
        alb >> frontend_tasks
        backend_tasks >> nat
        frontend_tasks >> nat
        backend_tasks >> rds
        backend_tasks >> redis
        backend_tasks >> s3
        backend_tasks >> lambda_func
        backend_tasks >> sqs
        secrets >> backend_tasks
        params >> backend_tasks
        iam >> backend_tasks
        backend_tasks >> cloudwatch
        frontend_tasks >> cloudwatch
        rds >> cloudwatch

def create_data_architecture():
    """Create data flow and processing architecture"""
    with Diagram("P360 Data Architecture & Processing Flow", 
                 filename="p360_data_architecture", 
                 show=False, 
                 direction="LR"):
        
        with Cluster("Data Sources"):
            salesforce = Blank("Salesforce CRM")
            bombora = Blank("Bombora Intent Data")
            first_party = Blank("First-Party Data")
            ttd_reds = Blank("TTD REDS Data")
        
        with Cluster("Data Ingestion"):
            kinesis = Kinesis("Kinesis Data Streams")
            lambda_ingest = Lambda("ETL Lambda Functions")
            
        with Cluster("Data Processing"):
            s3_lake = S3("S3 Data Lake")
            glue = Glue("AWS Glue ETL")
            athena = Athena("Athena Query Engine")
            
        with Cluster("Data Storage"):
            rds = RDS("PostgreSQL OLTP")
            s3_warehouse = S3("S3 Data Warehouse")
            redis = Elasticache("Redis Cache")
            
        with Cluster("Data Applications"):
            audience_builder = Fargate("Audience Builder")
            campaign_engine = Fargate("Campaign Engine")
            attribution = Fargate("Attribution Engine")
            metabase = Metabase("Metabase Analytics")
            
        with Cluster("Data Outputs"):
            dsp_export = Blank("DSP Audience Export")
            reporting = Blank("Real-time Reporting")
            insights = Blank("Customer Insights")
        
        # Data Flow
        salesforce >> kinesis
        bombora >> kinesis
        first_party >> kinesis
        ttd_reds >> kinesis
        kinesis >> lambda_ingest >> s3_lake
        s3_lake >> glue >> s3_warehouse
        s3_lake >> athena
        lambda_ingest >> rds
        athena >> redis
        
        rds >> audience_builder
        s3_warehouse >> audience_builder
        redis >> audience_builder
        rds >> campaign_engine
        s3_warehouse >> campaign_engine
        redis >> campaign_engine
        rds >> attribution
        s3_warehouse >> attribution
        redis >> attribution
        s3_warehouse >> metabase
        
        audience_builder >> dsp_export
        campaign_engine >> reporting
        attribution >> insights
        metabase >> insights

def create_application_architecture():
    """Create application layer architecture with microservices view"""
    with Diagram("P360 Application Architecture - Microservices View", 
                 filename="p360_application_architecture", 
                 show=False, 
                 direction="TB"):
        
        users = Users("Users")
        cdn = CloudFront("CloudFront")
        
        with Cluster("Frontend Layer"):
            nextjs = Fargate("Next.js Frontend")
            
        with Cluster("API Gateway Layer"):
            alb = ALB("Application Load Balancer")
            
        with Cluster("Backend Services"):
            with Cluster("Core Services"):
                auth_service = Fargate("Authentication Service")
                user_service = Fargate("User Management Service")
                
            with Cluster("Business Services"):
                audience_service = Fargate("Audience Management")
                campaign_service = Fargate("Campaign Orchestration")
                attribution_service = Fargate("Attribution Engine")
                
            with Cluster("Integration Services"):
                ttd_connector = Fargate("TTD Connector")
                bombora_connector = Fargate("Bombora Connector")
                salesforce_connector = Fargate("Salesforce Connector")
                
            with Cluster("Platform Services"):
                notification_service = Lambda("Notification Service")
                audit_service = Lambda("Audit Service")
                scheduler = Lambda("Scheduler Service")
        
        with Cluster("Data Layer"):
            db = RDS("PostgreSQL")
            cache = Elasticache("Redis")
            storage = S3("S3 Storage")
            
        with Cluster("Message Queue"):
            queue = SQS("SQS/SNS")
            
        with Cluster("External APIs"):
            ttd_api = Blank("The Trade Desk API")
            bombora_api = Blank("Bombora API")
            sf_api = Blank("Salesforce API")
            
        with Cluster("Authentication Providers"):
            entra = ActiveDirectory("Microsoft Entra ID")
            auth0 = Auth0("Auth0")
        
        # Connections
        users >> cdn >> nextjs >> alb
        alb >> auth_service
        alb >> user_service
        alb >> audience_service
        alb >> campaign_service
        alb >> attribution_service
        
        auth_service >> entra
        auth_service >> auth0
        audience_service >> db
        audience_service >> cache
        audience_service >> storage
        campaign_service >> db
        campaign_service >> cache
        campaign_service >> storage
        attribution_service >> db
        attribution_service >> cache
        attribution_service >> storage
        
        ttd_connector >> ttd_api
        bombora_connector >> bombora_api
        salesforce_connector >> sf_api
        
        audience_service >> queue
        campaign_service >> queue
        attribution_service >> queue
        queue >> notification_service
        queue >> audit_service
        queue >> scheduler

def create_security_architecture():
    """Create security architecture diagram"""
    with Diagram("P360 Security Architecture", 
                 filename="p360_security_architecture", 
                 show=False, 
                 direction="TB"):
        
        with Cluster("Internet"):
            users = Users("Users")
            attackers = Blank("Potential Threats")
            
        with Cluster("Edge Security"):
            waf = WAF("AWS WAF")
            shield = Blank("AWS Shield DDoS Protection")
            
        with Cluster("Network Security"):
            with Cluster("Public Subnets"):
                alb = ALB("ALB with SSL/TLS")
                
            with Cluster("Private Subnets"):
                apps = Fargate("Application Services")
                
            with Cluster("Isolated Subnets"):
                db = RDS("Encrypted Database")
        
        with Cluster("Application Security"):
            iam = IAMRole("IAM Roles & Policies")
            secrets = SecretsManager("Secrets Manager")
            
        with Cluster("Data Security"):
            encryption = Blank("Encryption at Rest")
            encryption_transit = Blank("Encryption in Transit")
            
        with Cluster("Authentication & Authorization"):
            entra = ActiveDirectory("Microsoft Entra ID")
            auth0 = Auth0("Auth0")
            jwt = Blank("JWT Tokens")
            rls = Blank("Row Level Security")
            
        with Cluster("Monitoring & Compliance"):
            cloudwatch = Cloudwatch("Security Monitoring")
            audit = Blank("Audit Logging")
            
        # Security Flow
        users >> waf >> alb >> apps >> db
        attackers >> Edge(color="red", style="dashed") >> shield
        
        iam >> apps
        secrets >> apps
        encryption >> db
        encryption_transit >> db
        entra >> jwt >> apps
        auth0 >> jwt
        apps >> rls >> db
        apps >> cloudwatch >> audit
        db >> cloudwatch

def main():
    """Generate all architecture diagrams"""
    print("Generating P360 Architecture Diagrams...")
    
    try:
        print("1. Creating overall architecture diagram...")
        create_overall_architecture()
        
        print("2. Creating AWS infrastructure diagram...")
        create_aws_infrastructure()
        
        print("3. Creating data architecture diagram...")
        create_data_architecture()
        
        print("4. Creating application architecture diagram...")
        create_application_architecture()
        
        print("5. Creating security architecture diagram...")
        create_security_architecture()
        
        print("\n✅ All diagrams generated successfully!")
        print("Generated files:")
        print("- p360_overall_architecture.png")
        print("- p360_aws_infrastructure.png")
        print("- p360_data_architecture.png")
        print("- p360_application_architecture.png")
        print("- p360_security_architecture.png")
        
    except Exception as e:
        print(f"❌ Error generating diagrams: {e}")
        print("Make sure 'diagrams' library is installed: pip install diagrams")

if __name__ == "__main__":
    main()
