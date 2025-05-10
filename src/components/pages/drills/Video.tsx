// components/VideoPlayer.js
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { useVideoPlayer, VideoView } from 'expo-video';
import { supabase } from '../../../lib/supabase';

const { width } = Dimensions.get('window');
const YT_REGEX = /(?:youtube\.com\/.*v=|youtu\.be\/)([A-Za-z0-9_-]{11})/;

export default function Video({ source }: { source: string }) {
  // 1) Always mount the hook, even before we know the URI
  const player = useVideoPlayer(null, () => {
    /* no-op */
  });

  const [uri, setUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 2) Fetch signed URL (or use direct) and replaceAsync
  useEffect(() => {
    (async () => {
      let signedUrl: string;

      if (/^https?:\/\//.test(source) && !YT_REGEX.test(source)) {
        signedUrl = source;
      } else if (!YT_REGEX.test(source)) {
        const { data, error } = await supabase.storage
          .from('videos')
          .createSignedUrl(source, 60);

        if (error) {
          console.error('Supabase error:', error);
          return;
        }
        signedUrl = data.signedUrl;
      } else {
        signedUrl = source;
      }

      setUri(signedUrl);
      setLoading(false);

      // If it's not a YouTube link, load into the player
      if (!YT_REGEX.test(source)) {
        await player.replaceAsync(signedUrl); // :contentReference[oaicite:2]{index=2}
        player.play();
      }
    })();
  }, [source]);

  // 3) Render loading
  if (loading || !uri) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 4) YouTube via WebView
  const match = uri.match(YT_REGEX);
  if (match) {
    const embedUrl = `https://www.youtube.com/embed/${match[1]}?controls=1`;
    return (
      <View style={styles.container}>
        <WebView
          style={styles.webview}
          javaScriptEnabled
          source={{ uri: embedUrl }}
        />
      </View>
    );
  }

  // 5) Direct media via expo-video
  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
        nativeControls // show play/pause & scrubber :contentReference[oaicite:3]{index=3}
        allowsFullscreen // fullscreen button :contentReference[oaicite:4]{index=4}
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  webview: {
    flex: 1,
  },
  loader: {
    width,
    aspectRatio: 16 / 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
