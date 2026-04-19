import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, cn } from '../lib/NativeShim';
import { useTheme } from '../context/ThemeContext';
import { useAudio, Track } from '../context/AudioContext';
import { Plus, Music, Play, MoreVertical } from 'lucide-react';
import { DocumentPicker } from '../lib/ExpoShims';

export const LibraryScreen: React.FC = () => {
  const { colors, primary } = useTheme();
  const { playlist, addTrack, playTrack, currentTrack } = useAudio();

  const handleUpload = async () => {
    const result: any = await DocumentPicker.getDocumentAsync({ type: 'audio/*' });
    if (result.type === 'success') {
      const newTrack: Track = {
        id: Math.random().toString(36).substr(2, 9),
        title: result.name.replace('.mp3', ''),
        artist: 'Arquivo Local',
        uri: result.uri,
      };
      addTrack(newTrack);
    }
  };

  return (
    <View className="flex-1 px-6">
      <View className="flex-row items-center justify-between mt-6 mb-8">
        <Text className="text-3xl font-bold" style={{ color: colors.text }}>
          Biblioteca
        </Text>
        <TouchableOpacity 
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: colors.primary }}
          onClick={handleUpload}
        >
          <Plus size={24} color={colors.background} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {playlist.length === 0 ? (
          <View className="items-center justify-center pt-20 opacity-40">
            <Music size={64} color={colors.text} />
            <Text className="mt-4 text-center px-10" style={{ color: colors.text }}>
              Nenhuma música encontrada. Toque no + para importar arquivos.
            </Text>
          </View>
        ) : (
          playlist.map((track) => {
            const isActive = currentTrack?.id === track.id;
            return (
              <TouchableOpacity 
                key={track.id}
                className="flex-row items-center gap-4 p-4 mb-3 rounded-2xl border"
                style={{ 
                  backgroundColor: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                  borderColor: isActive ? colors.primary : colors.border
                }}
                onClick={() => playTrack(track)}
              >
                <View 
                  className="w-12 h-12 rounded-lg items-center justify-center"
                  style={{ backgroundColor: colors.surface }}
                >
                  <Music size={20} color={isActive ? colors.primary : colors.secondaryText} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold" style={{ color: isActive ? colors.primary : colors.text }}>
                    {track.title}
                  </Text>
                  <Text className="text-xs" style={{ color: colors.secondaryText }}>
                    {track.artist}
                  </Text>
                </View>
                <MoreVertical size={20} color={colors.secondaryText} />
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};
