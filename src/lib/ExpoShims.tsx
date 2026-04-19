import { Howl } from 'howler';

/**
 * SHIM for expo-av to work in Web Preview.
 * Internally uses Howler.js for robust playback.
 */
export const Audio = {
  Sound: {
    createAsync: async (source: string | { uri: string }) => {
      const uri = typeof source === 'string' ? source : source.uri;
      
      const sound = new Howl({
        src: [uri],
        html5: true, // Use HTML5 Audio for larger files
        onplay: () => console.log('Playing:', uri),
      });

      const soundObject = {
        playAsync: async () => sound.play(),
        pauseAsync: async () => sound.pause(),
        stopAsync: async () => sound.stop(),
        unloadAsync: async () => sound.unload(),
        setPositionAsync: async (pos: number) => sound.seek(pos / 1000),
        getStatusAsync: async () => ({
          positionMillis: (sound.seek() as number) * 1000,
          durationMillis: sound.duration() * 1000,
          isPlaying: sound.playing(),
        }),
      };

      return { sound: soundObject, status: { isLoaded: true } };
    }
  },
  setAudioModeAsync: async (config: any) => {
    console.log('Audio mode set:', config);
  }
};

/**
 * SHIM for expo-document-picker to work in Web Preview.
 */
export const DocumentPicker = {
  getDocumentAsync: async (options: { type: string }) => {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = options.type;
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          resolve({
            type: 'success',
            name: file.name,
            uri: URL.createObjectURL(file), // Local blob URL
            size: file.size,
          });
        } else {
          resolve({ type: 'cancel' });
        }
      };
      input.click();
    });
  }
};
