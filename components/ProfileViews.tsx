import React from 'react';
import { Upload } from 'lucide-react';

// Common Input Component to match the screenshot style
// Common Input Component to match the screenshot style
const InputGroup = ({ label, value, onChange, readOnly = false, type = "text", placeholder = "" }: { label: string, value?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, readOnly?: boolean, type?: string, placeholder?: string }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-white block">{label}</label>
    <input
      type={type}
      className="w-full bg-white text-gray-900 rounded-lg px-4 py-3 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-nexus-primary transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      placeholder={placeholder}
      disabled={readOnly}
    />
  </div>
);

const PrimaryButton = ({ label, onClick }: { label: string, onClick?: () => void }) => (
  <button onClick={onClick} className="bg-[#b02dad] hover:bg-[#c03eae] text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all transform hover:-translate-y-1 w-auto min-w-[160px]">
    {label}
  </button>
);

import { useAppContext } from '../context/AppContext';
import { userService } from '../services/userService';

export const ProfileDetails: React.FC = () => {
  const { user, updateProfile, reloadUser } = useAppContext();

  const [formData, setFormData] = React.useState({
    username: '',
    name: '',
    phone: '',
    email: '',
    country: ''
  });

  React.useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        name: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
        country: user.country || ''
      });
    }
  }, [user]);

  if (!user) return <div className="p-8 text-white">Loading profile...</div>;

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateProfile({
      username: formData.username,
      phone: formData.phone,
      email: formData.email,
      country: formData.country
    });
    alert("Profile Updated Successfully!");
  };

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) return;
    try {
      await userService.uploadProfileImage(user.id, selectedFile);
      await reloadUser();
      alert("Profile Picture Uploaded Successfully!");
      setSelectedFile(null);
    } catch (e: any) {
      alert("Upload failed: " + e.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Account Setting</h2>
      </div>

      <div className="bg-[#1a0b2e] border border-nexus-primary/20 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none bg-[url('https://img.freepik.com/free-vector/hud-futuristic-interface-screen-design_1017-26694.jpg')] bg-cover bg-right"></div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 relative z-10">
          {/* Form Section */}
          <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup label="User ID" value={user.id} readOnly />
            <InputGroup
              label="User Name"
              value={formData.username}
              onChange={(e) => handleChange('username', e.target.value)}
            />
            <InputGroup
              label="Phone Number"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
            <InputGroup
              label="Email Address"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            <InputGroup
              label="Country"
              value={formData.country}
              onChange={(e) => handleChange('country', e.target.value)}
            />
            <InputGroup label="Sponsor ID" value={user.sponsorId || 'No Sponsor'} readOnly />
            <div className="md:col-span-2">
              <InputGroup label="Sponsor Name" value={user.sponsorName || 'No Sponsor'} readOnly />
            </div>

            <div className="mt-4">
              <PrimaryButton label="Update Profile" onClick={handleSave} />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="xl:col-span-4 flex flex-col items-center justify-center space-y-6">
            <div className="w-64 h-64 rounded-full bg-cyan-100 border-4 border-white shadow-xl overflow-hidden relative group">
              <img
                src={user.image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full max-w-xs space-y-2">
              <h4 className="text-white font-bold text-lg mb-1">Upload Profile Pic</h4>
              <p className="text-xs text-nexus-muted mb-3">Upload Photo</p>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />

              <div className="flex gap-2 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <div className="bg-white/10 text-nexus-muted px-4 py-2 rounded-lg text-sm flex-1 truncate border border-white/10 hover:bg-white/20 transition-colors">
                  Choose File
                </div>
                <div className="bg-white text-gray-500 px-4 py-2 rounded-lg text-sm flex-[2] truncate">
                  {selectedFile ? selectedFile.name : "No file chosen"}
                </div>
              </div>
              <button
                onClick={handleUpload}
                disabled={!selectedFile}
                className="w-full mt-2 bg-[#b02dad] hover:bg-[#c03eae] text-white font-bold py-2 rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WalletAddress: React.FC = () => {
  const { user, updateProfile } = useAppContext();
  const [address, setAddress] = React.useState(user?.walletAddress || '');

  // Update local state if user loads late
  React.useEffect(() => {
    if (user?.walletAddress) {
      setAddress(user.walletAddress);
    }
  }, [user]);

  const handleUpdate = () => {
    updateProfile({ walletAddress: address });
    alert("Wallet Address Updated Successfully!");
  };

  if (!user) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Wallet Address</h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-[#1a0b2e] border border-nexus-primary/20 rounded-2xl p-10 relative overflow-hidden shadow-2xl min-h-[400px] flex flex-col justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent"></div>

          <div className="relative z-10 space-y-8 text-center">
            <div>
              <h3 className="text-white font-bold text-lg mb-1">USDT TRC-20</h3>
              <p className="text-nexus-muted text-sm">Here you can insert your Address for Withdrawal.</p>
            </div>

            <input
              type="text"
              className="w-full bg-white text-gray-900 rounded-lg px-6 py-4 font-medium text-center focus:outline-none shadow-lg"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter USDT TRC-20 Address"
            />

            <div className="flex justify-center">
              <PrimaryButton label="Update Address" onClick={handleUpdate} />
            </div>
          </div>
        </div>

        {/* Decorative Right Side (Matches screenshot suggestion of background) */}
        <div className="hidden xl:block relative rounded-2xl overflow-hidden opacity-50">
          <div className="absolute inset-0 bg-[#2d1b4e]/80 mix-blend-multiply z-10"></div>
          <img
            src="https://img.freepik.com/free-photo/view-futuristic-robot-character_23-2151044436.jpg"
            alt="Cybernetic background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export const SecurityPassword: React.FC = () => {
  const { updateProfile } = useAppContext();
  const [passwords, setPasswords] = React.useState({ new: '', confirm: '' });

  const handleChange = async () => {
    if (passwords.new !== passwords.confirm) {
      alert("Passwords do not match!");
      return;
    }
    if (passwords.new.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }
    try {
      await updateProfile({ password: passwords.new } as any);
      alert("Password Changed Successfully!");
      setPasswords({ new: '', confirm: '' });
    } catch (e) {
      alert("Failed to update password");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Security</h2>
      </div>

      <div className="bg-[#1a0b2e] border border-nexus-primary/20 rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-[#2d1b4e] px-8 py-4 border-b border-nexus-primary/20">
          <h3 className="text-lg font-bold text-white">Change Password</h3>
        </div>

        <div className="p-8 xl:p-12 relative">
          {/* Background Element */}
          <div className="absolute left-0 bottom-0 w-64 h-64 opacity-20 pointer-events-none">
            <img src="https://cdn-icons-png.flaticon.com/512/2313/2313450.png" alt="gear" className="w-full h-full object-contain filter invert" />
          </div>

          <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            <InputGroup
              label="New Password"
              placeholder="Enter your New Password"
              type="password"
              value={passwords.new}
              onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
            />
            <InputGroup
              label="Confirm Password"
              placeholder="Enter your Confirm Password"
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
            />

            <div className="flex justify-end pt-4">
              <PrimaryButton label="Change Password" onClick={handleChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SecurityTransaction: React.FC = () => {
  const { updateProfile } = useAppContext();
  const [passwords, setPasswords] = React.useState({ new: '', confirm: '' });

  const handleChange = async () => {
    if (passwords.new !== passwords.confirm) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await updateProfile({ transactionPassword: passwords.new } as any);
      alert("Transaction Password Changed Successfully!");
      setPasswords({ new: '', confirm: '' });
    } catch (e) {
      alert("Failed to update transaction password");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Security</h2>
      </div>

      <div className="bg-[#1a0b2e] border border-nexus-primary/20 rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-[#2d1b4e] px-8 py-4 border-b border-nexus-primary/20">
          <h3 className="text-lg font-bold text-white">Change Transaction Password</h3>
        </div>

        <div className="p-8 xl:p-12 relative">
          <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            <InputGroup
              label="New Password"
              placeholder="Enter your New Transaction Password"
              type="password"
              value={passwords.new}
              onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
            />
            <InputGroup
              label="Confirm Password"
              placeholder="Enter your Confirm Transaction Password"
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
            />

            <div className="flex justify-end pt-4">
              <PrimaryButton label="Change Transaction Password" onClick={handleChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};