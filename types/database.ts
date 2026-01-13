/**
 * Database types for Supabase tables
 * Updated to reflect first_name and last_name fields
 */

export interface EmailWaitlist {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  source: string;
  created_at: string;
  subscribed: boolean;
  notes: string | null;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  stripe_customer_id: string | null;
  subscription_status:
    | 'waitlist'
    | 'none'
    | 'trial'
    | 'active'
    | 'past_due'
    | 'canceled'
    | 'expired';
  trial_start_date: string | null;
  trial_end_date: string | null;
  created_at: string;
  updated_at: string;
  is_banned: boolean;
  banned_reason: string | null;
  banned_at: string | null;
  banned_by: string | null;
  force_logout: boolean;
  max_devices: number;
  stripe_subscription_id: string | null;
}

export interface EmailCaptureRequest {
  firstName: string;
  lastName: string;
  email: string;
}

export interface EmailCaptureResponse {
  success: boolean;
  error?: string;
}
