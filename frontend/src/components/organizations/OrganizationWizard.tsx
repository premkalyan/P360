/**
 * P360-127: Organization Creation Wizard - Multi-Step Flow
 * Implements 11-screen Figma design for comprehensive organization setup
 */

'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';

// Wizard Steps Configuration
export const WIZARD_STEPS = [
  { id: 'basic', title: 'Basic Information', description: 'Organization name and details' },
  { id: 'settings', title: 'Organization Settings', description: 'Configuration and preferences' },
  { id: 'billing', title: 'Billing Information', description: 'Payment and subscription details' },
  { id: 'users', title: 'User Management', description: 'Initial user setup and roles' },
  { id: 'permissions', title: 'Permissions & Roles', description: 'Access control configuration' },
  { id: 'integration', title: 'Integrations', description: 'Third-party service connections' },
  { id: 'branding', title: 'Branding & Theme', description: 'Visual customization options' },
  { id: 'notifications', title: 'Notifications', description: 'Communication preferences' },
  { id: 'security', title: 'Security Settings', description: 'Authentication and security' },
  { id: 'review', title: 'Review & Confirm', description: 'Final review before creation' },
  { id: 'complete', title: 'Complete', description: 'Organization created successfully' }
] as const;

export type WizardStepId = typeof WIZARD_STEPS[number]['id'];

// Organization Data Interface
export interface OrganizationData {
  // Basic Information
  name: string;
  slug: string;
  description: string;
  industry: string;
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  
  // Settings
  timezone: string;
  currency: string;
  locale: string;
  
  // Billing
  billingEmail: string;
  subscriptionPlan: 'starter' | 'professional' | 'enterprise';
  
  // Users
  adminEmail: string;
  initialUsers: Array<{
    email: string;
    role: string;
    firstName: string;
    lastName: string;
  }>;
  
  // Additional settings
  features: string[];
  integrations: string[];
  branding: {
    logo?: string;
    primaryColor?: string;
    secondaryColor?: string;
  };
  
  // Security
  ssoEnabled: boolean;
  mfaRequired: boolean;
}

export interface OrganizationWizardProps {
  onComplete: (data: OrganizationData) => Promise<void>;
  onCancel: () => void;
  className?: string;
}

export const OrganizationWizard: React.FC<OrganizationWizardProps> = ({
  onComplete,
  onCancel,
  className = ''
}) => {
  const [currentStep, setCurrentStep] = useState<WizardStepId>('basic');
  const [organizationData, setOrganizationData] = useState<Partial<OrganizationData>>({
    size: 'medium',
    currency: 'USD',
    timezone: 'UTC',
    locale: 'en-US',
    subscriptionPlan: 'professional',
    features: [],
    integrations: [],
    branding: {},
    ssoEnabled: false,
    mfaRequired: true,
    initialUsers: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Get current step index
  const currentStepIndex = WIZARD_STEPS.findIndex(step => step.id === currentStep);
  const currentStepConfig = WIZARD_STEPS[currentStepIndex] || WIZARD_STEPS[0];
  
  // Navigation functions
  const goToStep = useCallback((stepId: WizardStepId) => {
    setCurrentStep(stepId);
    setErrors({});
  }, []);

  const goToNextStep = useCallback(() => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < WIZARD_STEPS.length) {
      const nextStep = WIZARD_STEPS[nextIndex];
      if (nextStep) {
        goToStep(nextStep.id);
      }
    }
  }, [currentStepIndex, goToStep]);

  const goToPreviousStep = useCallback(() => {
    const previousIndex = currentStepIndex - 1;
    if (previousIndex >= 0) {
      const previousStep = WIZARD_STEPS[previousIndex];
      if (previousStep) {
        goToStep(previousStep.id);
      }
    }
  }, [currentStepIndex, goToStep]);

  // Data update function
  const updateData = useCallback((updates: Partial<OrganizationData>) => {
    setOrganizationData(prev => ({ ...prev, ...updates }));
  }, []);

  // Validation functions
  const validateCurrentStep = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (currentStep) {
      case 'basic':
        if (!organizationData.name?.trim()) {
          newErrors.name = 'Organization name is required';
        }
        if (!organizationData.slug?.trim()) {
          newErrors.slug = 'Organization slug is required';
        }
        if (!organizationData.industry?.trim()) {
          newErrors.industry = 'Industry selection is required';
        }
        break;
        
      case 'billing':
        if (!organizationData.billingEmail?.trim()) {
          newErrors.billingEmail = 'Billing email is required';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(organizationData.billingEmail || '')) {
          newErrors.billingEmail = 'Valid email address is required';
        }
        break;
        
      case 'users':
        if (!organizationData.adminEmail?.trim()) {
          newErrors.adminEmail = 'Admin email is required';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentStep, organizationData]);

  // Submit handler
  const handleSubmit = useCallback(async () => {
    if (currentStep === 'complete') {
      return;
    }
    
    if (currentStep === 'review') {
      if (!validateCurrentStep()) {
        return;
      }
      
      setIsSubmitting(true);
      try {
        await onComplete(organizationData as OrganizationData);
        goToNextStep(); // Go to completion step
      } catch (error) {
        console.error('Failed to create organization:', error);
        setErrors({ submit: 'Failed to create organization. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      if (validateCurrentStep()) {
        goToNextStep();
      }
    }
  }, [currentStep, validateCurrentStep, onComplete, organizationData, goToNextStep]);

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Create Organization</h1>
          <span className="text-sm text-gray-500">
            Step {currentStepIndex + 1} of {WIZARD_STEPS.length}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-p360-purple h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / WIZARD_STEPS.length) * 100}%` }}
          />
        </div>
        
        {/* Current Step Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{currentStepConfig.title}</h2>
          <p className="text-gray-600">{currentStepConfig.description}</p>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        {currentStep === 'basic' && (
          <BasicInformationStep 
            data={organizationData} 
            onChange={updateData} 
            errors={errors}
          />
        )}
        
        {currentStep === 'settings' && (
          <OrganizationSettingsStep 
            data={organizationData} 
            onChange={updateData} 
            errors={errors}
          />
        )}
        
        {currentStep === 'billing' && (
          <BillingInformationStep 
            data={organizationData} 
            onChange={updateData} 
            errors={errors}
          />
        )}
        
        {currentStep === 'users' && (
          <UserManagementStep 
            data={organizationData} 
            onChange={updateData} 
            errors={errors}
          />
        )}
        
        {currentStep === 'permissions' && (
          <PermissionsStep 
            data={organizationData} 
            onChange={updateData} 
            errors={errors}
          />
        )}
        
        {currentStep === 'integration' && (
          <IntegrationsStep 
            data={organizationData} 
            onChange={updateData} 
            errors={errors}
          />
        )}
        
        {currentStep === 'branding' && (
          <BrandingStep 
            data={organizationData} 
            onChange={updateData} 
            errors={errors}
          />
        )}
        
        {currentStep === 'notifications' && (
          <NotificationsStep 
            data={organizationData} 
            onChange={updateData} 
            errors={errors}
          />
        )}
        
        {currentStep === 'security' && (
          <SecurityStep 
            data={organizationData} 
            onChange={updateData} 
            errors={errors}
          />
        )}
        
        {currentStep === 'review' && (
          <ReviewStep 
            data={organizationData} 
            errors={errors}
          />
        )}
        
        {currentStep === 'complete' && (
          <CompletionStep 
            data={organizationData} 
            onViewOrganization={() => window.location.href = '/admin/organizations'}
          />
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-3">
          {currentStepIndex > 0 && currentStep !== 'complete' && (
            <Button
              variant="outline"
              onClick={goToPreviousStep}
            >
              ← Previous
            </Button>
          )}
          
          <Button
            variant="ghost"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>

        <div className="flex space-x-3">
          {currentStep !== 'complete' && (
            <Button
              variant="primary"
              onClick={handleSubmit}
              loading={isSubmitting}
            >
              {currentStep === 'review' ? '✓ Create Organization' : 'Continue →'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// Step Components (to be implemented next)
interface StepProps {
  data: Partial<OrganizationData>;
  onChange: (updates: Partial<OrganizationData>) => void;
  errors: Record<string, string>;
}

const BasicInformationStep: React.FC<StepProps> = ({ data, onChange, errors }) => {
  const handleInputChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onChange({ [field]: e.target.value });
  };

  // Generate slug from name
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = generateSlug(name);
    onChange({ name, slug });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Organization Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Organization Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Organization Name *
          </label>
          <input
            type="text"
            value={data.name || ''}
            onChange={handleNameChange}
            placeholder="Enter organization name"
            className="block w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-p360-purple focus:border-p360-purple"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Organization Slug */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Organization Slug *
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              p360.com/
            </span>
            <input
              type="text"
              value={data.slug || ''}
              onChange={handleInputChange('slug')}
              placeholder="organization-slug"
              className="flex-1 block w-full px-4 py-2.5 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-p360-purple focus:border-p360-purple"
            />
          </div>
          {errors.slug && (
            <p className="mt-1 text-sm text-red-600">{errors.slug}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            This will be your organization&apos;s unique identifier
          </p>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={data.description || ''}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="Brief description of your organization"
            rows={3}
            className="block w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-p360-purple focus:border-p360-purple"
          />
        </div>

        {/* Industry */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Industry *
          </label>
          <select
            value={data.industry || ''}
            onChange={handleInputChange('industry')}
            className="block w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-p360-purple focus:border-p360-purple"
          >
            <option value="">Select industry</option>
            <option value="technology">Technology</option>
            <option value="finance">Finance</option>
            <option value="healthcare">Healthcare</option>
            <option value="retail">Retail</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="education">Education</option>
            <option value="nonprofit">Non-profit</option>
            <option value="other">Other</option>
          </select>
          {errors.industry && (
            <p className="mt-1 text-sm text-red-600">{errors.industry}</p>
          )}
        </div>

        {/* Organization Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Organization Size
          </label>
          <select
            value={data.size || 'medium'}
            onChange={handleInputChange('size')}
            className="block w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-p360-purple focus:border-p360-purple"
          >
            <option value="startup">Startup (1-10 employees)</option>
            <option value="small">Small (11-50 employees)</option>
            <option value="medium">Medium (51-200 employees)</option>
            <option value="large">Large (201-1000 employees)</option>
            <option value="enterprise">Enterprise (1000+ employees)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const OrganizationSettingsStep: React.FC<StepProps> = ({ data: _data, onChange: _onChange, errors: _errors }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold">Configuration</h3>
    <div className="text-center py-8 text-gray-500">
      Organization Settings Step - Implementation in progress
    </div>
  </div>
);

const BillingInformationStep: React.FC<StepProps> = ({ data, onChange, errors }) => {
  const handleInputChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onChange({ [field]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Billing & Subscription</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Billing Email */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Billing Email *
          </label>
          <input
            type="email"
            value={data.billingEmail || ''}
            onChange={handleInputChange('billingEmail')}
            placeholder="billing@company.com"
            className="block w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-p360-purple focus:border-p360-purple"
          />
          {errors.billingEmail && (
            <p className="mt-1 text-sm text-red-600">{errors.billingEmail}</p>
          )}
        </div>

        {/* Subscription Plan */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subscription Plan
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            {/* Starter Plan */}
            <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
              data.subscriptionPlan === 'starter' 
                ? 'border-p360-purple bg-p360-purple/5' 
                : 'border-gray-200 hover:border-gray-300'
            }`} onClick={() => onChange({ subscriptionPlan: 'starter' })}>
              <div className="text-lg font-semibold text-gray-900">Starter</div>
              <div className="text-2xl font-bold text-p360-purple">$29/mo</div>
              <div className="text-sm text-gray-600 mt-2">
                • Up to 5 users<br/>
                • Basic reporting<br/>
                • Email support
              </div>
            </div>

            {/* Professional Plan */}
            <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
              data.subscriptionPlan === 'professional' 
                ? 'border-p360-purple bg-p360-purple/5' 
                : 'border-gray-200 hover:border-gray-300'
            }`} onClick={() => onChange({ subscriptionPlan: 'professional' })}>
              <div className="text-lg font-semibold text-gray-900">Professional</div>
              <div className="text-2xl font-bold text-p360-purple">$99/mo</div>
              <div className="text-sm text-gray-600 mt-2">
                • Up to 25 users<br/>
                • Advanced analytics<br/>
                • Priority support
              </div>
              <div className="inline-block bg-p360-purple text-white text-xs px-2 py-1 rounded mt-2">
                Popular
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
              data.subscriptionPlan === 'enterprise' 
                ? 'border-p360-purple bg-p360-purple/5' 
                : 'border-gray-200 hover:border-gray-300'
            }`} onClick={() => onChange({ subscriptionPlan: 'enterprise' })}>
              <div className="text-lg font-semibold text-gray-900">Enterprise</div>
              <div className="text-2xl font-bold text-p360-purple">Custom</div>
              <div className="text-sm text-gray-600 mt-2">
                • Unlimited users<br/>
                • Custom features<br/>
                • Dedicated support
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserManagementStep: React.FC<StepProps> = ({ data: _data, onChange: _onChange, errors: _errors }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold">Initial Users</h3>
    <div className="text-center py-8 text-gray-500">
      User Management Step - Implementation in progress
    </div>
  </div>
);

const PermissionsStep: React.FC<StepProps> = ({ data: _data, onChange: _onChange, errors: _errors }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold">Access Control</h3>
    <div className="text-center py-8 text-gray-500">
      Permissions Step - Implementation in progress
    </div>
  </div>
);

const IntegrationsStep: React.FC<StepProps> = ({ data: _data, onChange: _onChange, errors: _errors }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold">Third-Party Services</h3>
    <div className="text-center py-8 text-gray-500">
      Integrations Step - Implementation in progress
    </div>
  </div>
);

const BrandingStep: React.FC<StepProps> = ({ data: _data, onChange: _onChange, errors: _errors }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold">Visual Customization</h3>
    <div className="text-center py-8 text-gray-500">
      Branding Step - Implementation in progress
    </div>
  </div>
);

const NotificationsStep: React.FC<StepProps> = ({ data: _data, onChange: _onChange, errors: _errors }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold">Communication Preferences</h3>
    <div className="text-center py-8 text-gray-500">
      Notifications Step - Implementation in progress
    </div>
  </div>
);

const SecurityStep: React.FC<StepProps> = ({ data: _data, onChange: _onChange, errors: _errors }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold">Security Configuration</h3>
    <div className="text-center py-8 text-gray-500">
      Security Step - Implementation in progress
    </div>
  </div>
);

const ReviewStep: React.FC<{ data: Partial<OrganizationData>; errors: Record<string, string> }> = ({ data, errors }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold">Review Your Organization</h3>
    
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Basic Information</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600">Name:</span>
              <span className="ml-2 font-medium">{data.name || 'Not set'}</span>
            </div>
            <div>
              <span className="text-gray-600">Slug:</span>
              <span className="ml-2 font-medium">p360.com/{data.slug || 'not-set'}</span>
            </div>
            <div>
              <span className="text-gray-600">Industry:</span>
              <span className="ml-2 font-medium capitalize">{data.industry || 'Not set'}</span>
            </div>
            <div>
              <span className="text-gray-600">Size:</span>
              <span className="ml-2 font-medium capitalize">{data.size || 'Not set'}</span>
            </div>
            {data.description && (
              <div>
                <span className="text-gray-600">Description:</span>
                <div className="ml-2 mt-1 text-gray-800">{data.description}</div>
              </div>
            )}
          </div>
        </div>

        {/* Billing Information */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Billing & Subscription</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600">Billing Email:</span>
              <span className="ml-2 font-medium">{data.billingEmail || 'Not set'}</span>
            </div>
            <div>
              <span className="text-gray-600">Plan:</span>
              <span className="ml-2 font-medium capitalize">{data.subscriptionPlan || 'Not set'}</span>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Configuration</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600">Timezone:</span>
              <span className="ml-2 font-medium">{data.timezone || 'UTC'}</span>
            </div>
            <div>
              <span className="text-gray-600">Currency:</span>
              <span className="ml-2 font-medium">{data.currency || 'USD'}</span>
            </div>
            <div>
              <span className="text-gray-600">Locale:</span>
              <span className="ml-2 font-medium">{data.locale || 'en-US'}</span>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Security Settings</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600">SSO Enabled:</span>
              <span className="ml-2 font-medium">{data.ssoEnabled ? 'Yes' : 'No'}</span>
            </div>
            <div>
              <span className="text-gray-600">MFA Required:</span>
              <span className="ml-2 font-medium">{data.mfaRequired ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Error Display */}
    {errors.submit && (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <span className="text-red-400 mr-2 mt-0.5">⚠️</span>
          <div className="text-sm text-red-700">{errors.submit}</div>
        </div>
      </div>
    )}

    {/* Terms and Conditions */}
    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
      <div className="text-sm text-blue-800">
        <p className="font-medium mb-2">Before creating your organization:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Verify all information is correct</li>
          <li>You agree to P360&apos;s Terms of Service and Privacy Policy</li>
          <li>Billing will begin according to your selected plan</li>
          <li>You can modify most settings after creation</li>
        </ul>
      </div>
    </div>
  </div>
);

const CompletionStep: React.FC<{ data: Partial<OrganizationData>; onViewOrganization: () => void }> = ({ data, onViewOrganization }) => (
  <div className="text-center py-8">
    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <span className="text-2xl text-green-600">✓</span>
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">Organization Created Successfully!</h3>
    <p className="text-gray-600 mb-6">
      {data.name} has been created and is ready to use.
    </p>
    <Button onClick={onViewOrganization} variant="primary">
      View Organization
    </Button>
  </div>
);

export default OrganizationWizard;
