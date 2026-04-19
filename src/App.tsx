/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AudioProvider } from './context/AudioContext';
import { MobileFrame } from './components/MobileFrame';
import { PlayerScreen } from './screens/PlayerScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { SidebarMenu } from './components/SidebarMenu';
import { View, Text, TouchableOpacity } from './lib/NativeShim';
import { Menu, Search } from 'lucide-react';
import { AnimatePresence } from 'motion/react';

const RootApp = () => {
  const { colors, faction } = useTheme();
  const [currentScreen, setCurrentScreen] = useState('player');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <MobileFrame>
      <AnimatePresence>
        {isSidebarOpen && (
          <SidebarMenu 
            onNavigation={setCurrentScreen} 
            onClose={() => setIsSidebarOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* App Header (Native Style) */}
      <View className="flex-row items-center justify-between px-6 py-4 z-10">
        <TouchableOpacity onClick={() => setIsSidebarOpen(true)}>
          <Menu size={24} color={colors.text} />
        </TouchableOpacity>
        
        <View className="items-center">
          <Text className="text-[10px] font-mono tracking-widest opacity-60" style={{ color: colors.primary }}>
            {faction === 'ORDER' ? 'SYSTEM_STABLE' : 'CHAOS_BREACH'}
          </Text>
          <Text className="text-sm font-bold tracking-tight" style={{ color: colors.text }}>
            RQS PLAYER PRO
          </Text>
        </View>

        <TouchableOpacity>
          <Search size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Screen Container */}
      <View className="flex-1">
        {currentScreen === 'player' && <PlayerScreen />}
        {currentScreen === 'library' && <LibraryScreen />}
        {currentScreen !== 'player' && currentScreen !== 'library' && (
          <View className="flex-1 items-center justify-center p-8">
             <Text className="text-xl opacity-40" style={{ color: colors.text }}>
               Tela "{currentScreen}" em desenvolvimento.
             </Text>
          </View>
        )}
      </View>

      {/* AdMob Placeholder Awareness */}
      <View 
        className="mx-6 mb-8 h-12 rounded-lg items-center justify-center border-dashed border opacity-30"
        style={{ borderColor: colors.primary }}
      >
        <Text className="text-[10px] font-mono" style={{ color: colors.primary }}>
          AD_RESERVED_ZONE: {faction === 'ORDER' ? 'CLEAN_PROMO' : 'LEAKED_INTEL'}
        </Text>
      </View>
    </MobileFrame>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AudioProvider>
        <RootApp />
      </AudioProvider>
    </ThemeProvider>
  );
}
