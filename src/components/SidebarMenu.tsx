import React from 'react';
import { View, Text, TouchableOpacity, cn } from '../lib/NativeShim';
import { useTheme } from '../context/ThemeContext';
import { User, Music, BarChart3, Settings, LogOut, X } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarMenuProps {
  onNavigation: (screen: string) => void;
  onClose: () => void;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ onNavigation, onClose }) => {
  const { faction, colors } = useTheme();

  const profileName = faction === 'ORDER' ? 'ANA RAQUEL' : 'ANOMALIA_01';
  const profileImage = faction === 'ORDER' 
    ? 'https://picsum.photos/seed/order_dev/200' 
    : 'https://picsum.photos/seed/chaos_hacker/200';

  const menuItems = [
    { id: 'player', icon: Music, label: 'Player' },
    { id: 'library', icon: Music, label: 'Biblioteca' },
    { id: 'equalizer', icon: BarChart3, label: 'Equalizador' },
    { id: 'settings', icon: Settings, label: 'Configurações' },
  ];

  return (
    <motion.div 
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 z-50 flex"
    >
      <View 
        className="w-4/5 h-full p-6 border-r"
        style={{ 
          backgroundColor: colors.background,
          borderColor: colors.border,
        }}
      >
        <View className="mb-10 mt-8 flex-row items-center gap-4">
          <img 
            src={profileImage} 
            alt="Profile" 
            className="w-16 h-16 rounded-full border-2"
            style={{ borderColor: colors.primary }}
          />
          <View>
            <Text 
              className="font-mono text-xs opacity-60"
              style={{ color: colors.primary }}
            >
              {faction === 'ORDER' ? 'ACCESS_LEVEL: ADMIN' : 'STATUS: ROGUE'}
            </Text>
            <Text className="text-xl font-bold" style={{ color: colors.text }}>
              {profileName}
            </Text>
          </View>
        </View>

        <View className="flex-1 gap-2">
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id}
              className="flex-row items-center gap-4 p-4 rounded-xl"
              onClick={() => {
                onNavigation(item.id);
                onClose();
              }}
            >
              <item.icon size={20} color={colors.primary} />
              <Text className="text-lg font-medium" style={{ color: colors.text }}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          className="flex-row items-center gap-4 p-4 mt-auto opacity-60"
          style={{ borderTopWidth: 1, borderColor: colors.border }}
        >
          <LogOut size={20} color={colors.text} />
          <Text className="text-lg" style={{ color: colors.text }}>Logout</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        className="flex-1 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
    </motion.div>
  );
};
