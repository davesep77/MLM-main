import { supabase } from './supabase';
import { UserProfile } from '../types';

export interface SignUpData {
  email: string;
  password: string;
  username: string;
  name: string;
  phone?: string;
  country?: string;
  sponsorId?: string;
  position?: 'Left' | 'Right';
}

export interface SignInData {
  username: string;
  password: string;
}

export const authService = {
  async signUp(data: SignUpData) {
    const { email, password, username, name, phone, country, sponsorId, position } = data;

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Failed to create user');

    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: authData.user.id,
        username,
        name,
        email,
        phone: phone || null,
        country: country || null,
        sponsor_id: sponsorId || null,
        position: position || 'Left',
        status: 'Active',
      });

    if (profileError) {
      throw profileError;
    }

    return authData;
  },

  async signIn(data: SignInData) {
    const { username, password } = data;

    const { data: email, error: lookupError } = await supabase.rpc(
      'get_email_by_username',
      { p_username: username }
    );

    if (lookupError || !email) {
      throw new Error('Invalid username or password');
    }

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: email,
      password,
    });

    if (error) {
      throw new Error('Invalid username or password');
    }

    return authData;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser(): Promise<UserProfile | null> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (error) throw error;
    if (!profile) return null;

    return {
      id: profile.id,
      username: profile.username,
      name: profile.name,
      email: user.email || '',
      phone: profile.phone || '',
      country: profile.country || '',
      sponsorId: profile.sponsor_id,
      walletAddress: profile.wallet_address || '',
      image: profile.image_url,
      position: profile.position,
      status: profile.status,
      joinedAt: profile.created_at,
    };
  },

  async getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      (async () => {
        callback(event, session);
      })();
    });
  },
};
