import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Audio } from '../lib/ExpoShims';

export interface Track {
  id: string;
  title: string;
  artist: string;
  uri: string;
  artwork?: string;
}

interface AudioContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  status: any;
  playlist: Track[];
  playTrack: (track: Track) => Promise<void>;
  togglePlayback: () => Promise<void>;
  skipNext: () => Promise<void>;
  skipPrevious: () => Promise<void>;
  addTrack: (track: Track) => void;
  seek: (millis: number) => Promise<void>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState<Track[]>([
    {
      id: 'initial_demo',
      title: 'SYNTH_WAVE_B01',
      artist: 'RaQuel Synths',
      uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      artwork: 'https://picsum.photos/seed/rqs/400'
    }
  ]);
  const [status, setStatus] = useState<any>({ positionMillis: 0, durationMillis: 0 });
  const soundRef = useRef<any>(null);

  useEffect(() => {
    Audio.setAudioModeAsync({ staysActiveInBackground: true });
    
    const interval = setInterval(async () => {
      if (soundRef.current && isPlaying) {
        const s = await soundRef.current.getStatusAsync();
        setStatus(s);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const playTrack = async (track: Track) => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
    }

    const { sound } = await Audio.Sound.createAsync({ uri: track.uri });
    soundRef.current = sound;
    setCurrentTrack(track);
    await sound.playAsync();
    setIsPlaying(true);
  };

  const togglePlayback = async () => {
    if (!soundRef.current) return;
    if (isPlaying) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const skipNext = async () => {
    const currentIndex = playlist.findIndex(t => t.id === currentTrack?.id);
    if (currentIndex < playlist.length - 1) {
      await playTrack(playlist[currentIndex + 1]);
    }
  };

  const skipPrevious = async () => {
    const currentIndex = playlist.findIndex(t => t.id === currentTrack?.id);
    if (currentIndex > 0) {
      await playTrack(playlist[currentIndex - 1]);
    }
  };

  const addTrack = (track: Track) => {
    setPlaylist(prev => [...prev, track]);
  };

  const seek = async (millis: number) => {
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(millis);
    }
  };

  return (
    <AudioContext.Provider value={{
      currentTrack, isPlaying, status, playlist,
      playTrack, togglePlayback, skipNext, skipPrevious, addTrack, seek
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within an AudioProvider');
  return context;
};
