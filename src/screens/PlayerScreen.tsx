import React from 'react';
import { View, Text, TouchableOpacity, cn } from '../lib/NativeShim';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Shield, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PlayerScreen: React.FC = () => {
  const { faction, setFaction, colors } = useTheme();
  const { currentTrack, isPlaying, togglePlayback, skipNext, skipPrevious, status, seek } = useAudio();

  const progress = status.durationMillis > 0 
    ? (status.positionMillis / status.durationMillis) * 100 
    : 0;

  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View className="flex-1 px-6 justify-between py-10">
      {/* Theme Toggle Header */}
      <View className="flex-row justify-center mb-4">
        <View 
          className="flex-row items-center p-1 rounded-full border"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <TouchableOpacity 
            className={cn(
              "flex-row items-center px-4 py-2 rounded-full gap-2 transition-all",
              faction === 'ORDER' && "bg-[#00F0FF22]"
            )}
            onClick={() => setFaction('ORDER')}
          >
            <Shield size={16} color={faction === 'ORDER' ? colors.primary : colors.secondaryText} />
            <Text className="text-xs font-bold" style={{ color: faction === 'ORDER' ? colors.primary : colors.secondaryText }}>ORDER</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={cn(
              "flex-row items-center px-4 py-2 rounded-full gap-2 transition-all",
              faction === 'CHAOS' && "bg-[#FF450022]"
            )}
            onClick={() => setFaction('CHAOS')}
          >
            <Flame size={16} color={faction === 'CHAOS' ? colors.primary : colors.secondaryText} />
            <Text className="text-xs font-bold" style={{ color: faction === 'CHAOS' ? colors.primary : colors.secondaryText }}>CHAOS</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Album Art Section */}
      <View className="items-center relative">
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="relative"
        >
          {/* Main Disc */}
          <div 
            className="w-64 h-64 rounded-full shadow-2xl border-4 overflow-hidden flex items-center justify-center bg-black"
            style={{ borderColor: colors.primary }}
          >
             {currentTrack?.artwork ? (
               <img src={currentTrack.artwork} alt="Artwork" className="w-full h-full object-cover opacity-60" />
             ) : (
               <View className="items-center opacity-30">
                 <Text className="font-mono text-[112px]" style={{ color: colors.primary }}>
                   {faction === 'ORDER' ? 'O' : 'X'}
                 </Text>
               </View>
             )}
             
             {/* Center Hole */}
             <div className="absolute w-12 h-12 rounded-full bg-black border-2" style={{ borderColor: colors.primary }}>
               <div className="w-full h-full rounded-full opacity-20 bg-white" />
             </div>
          </div>

          {/* Glowing Aura */}
          <div 
            className="absolute -inset-4 rounded-full blur-2xl -z-10 opacity-20"
            style={{ backgroundColor: colors.primary }}
          />
        </motion.div>
      </View>

      {/* Info Section */}
      <View className="mt-8 items-center">
        <Text className="text-2xl font-bold text-center" style={{ color: colors.text }}>
          {currentTrack?.title || 'Selecione uma faixa'}
        </Text>
        <Text className="text-lg opacity-60 text-center" style={{ color: colors.secondaryText }}>
          {currentTrack?.artist || 'RQS System'}
        </Text>
      </View>

      {/* Progress Section */}
      <View className="mt-10">
        <View className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full"
            style={{ backgroundColor: colors.primary, width: `${progress}%` }}
          />
        </View>
        <View className="flex-row justify-between mt-2">
          <Text className="text-xs font-mono" style={{ color: colors.secondaryText }}>
            {formatTime(status.positionMillis)}
          </Text>
          <Text className="text-xs font-mono" style={{ color: colors.secondaryText }}>
            {formatTime(status.durationMillis)}
          </Text>
        </View>
      </View>

      {/* Controls Section */}
      <View className="flex-row items-center justify-between mt-6 px-4">
        <TouchableOpacity>
          <Shuffle size={20} color={colors.secondaryText} />
        </TouchableOpacity>
        
        <View className="flex-row items-center gap-8">
          <TouchableOpacity onClick={skipPrevious}>
            <SkipBack size={32} color={colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="w-20 h-20 rounded-full items-center justify-center border-2 shadow-lg"
            style={{ 
              backgroundColor: colors.primary,
              borderColor: colors.primary,
              boxShadow: `0 0 20px ${colors.primary}44`
            }}
            onClick={togglePlayback}
          >
            {isPlaying ? (
              <Pause size={40} color={colors.background} fill="currentColor" />
            ) : (
              <Play size={40} color={colors.background} fill="currentColor" className="ml-1" />
            )}
          </TouchableOpacity>

          <TouchableOpacity onClick={skipNext}>
            <SkipForward size={32} color={colors.text} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Repeat size={20} color={colors.secondaryText} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
