import { UserProfile } from '../types';
import { supabase } from './supabase';

export const userService = {
    updateProfile: async (updates: Partial<UserProfile>) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const updateData: any = {};

        if (updates.username !== undefined) updateData.username = updates.username;
        if (updates.name !== undefined) updateData.name = updates.name;
        if (updates.phone !== undefined) updateData.phone = updates.phone;
        if (updates.country !== undefined) updateData.country = updates.country;
        if (updates.walletAddress !== undefined) updateData.wallet_address = updates.walletAddress;
        if (updates.position !== undefined) updateData.position = updates.position;
        if (updates.status !== undefined) updateData.status = updates.status;

        if (updates.email !== undefined) {
            updateData.email = updates.email;
            const { error: authError } = await supabase.auth.updateUser({ email: updates.email });
            if (authError) throw authError;
        }

        const { error } = await supabase
            .from('user_profiles')
            .update(updateData)
            .eq('id', user.id);

        if (error) throw error;
    },

    uploadProfileImage: async (userId: string, file: File) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}-${Math.random()}.${fileExt}`;
        const filePath = `avatars/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('profiles')
            .upload(filePath, file, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('profiles')
            .getPublicUrl(filePath);

        const { error: updateError } = await supabase
            .from('user_profiles')
            .update({ image_url: publicUrl })
            .eq('id', userId);

        if (updateError) throw updateError;

        return { success: true, imageUrl: publicUrl };
    }
};
