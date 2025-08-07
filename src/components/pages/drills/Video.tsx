// components/VideoPlayer.js
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  PanResponder,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useVideoPlayer, VideoView } from 'expo-video';
import { supabase } from '../../../lib/supabase';
import { Text } from '../../common/Text';

const { width } = Dimensions.get('window');

export default function Video({ link, id }: { link: string; id: number }) {
  const [videoUri, setVideoUri] = useState<string>();
  const [loading, setLoading] = useState(true);
  const player = useVideoPlayer({ uri: videoUri });

  useEffect(() => {
    const loadVideo = async () => {
      setLoading(true);
      let finalSource = link?.trim();

      if (!finalSource) {
        const { data, error } = await supabase.storage
          .from('premium-drills')
          .createSignedUrl(`${id}.mp4`, 60 * 60 * 5);

        if (error || !data?.signedUrl) {
          console.error('Error fetching Supabase video:', error);
          setLoading(false);
          return;
        }

        finalSource = data.signedUrl;
      }

      setVideoUri(finalSource);
      setLoading(false);
    };

    loadVideo();
  }, [link, id]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  // If no videoUri at all, show error or fallback text
  if (!videoUri) {
    return (
      <View style={styles.container}>
        <Text>No video source available</Text>
      </View>
    );
  }

  const isPremium = videoUri.includes('supabase');
  console.log(videoUri, isPremium);

  if (!isPremium) {
    return (
      <View style={styles.container}>
        <WebView
          style={styles.webview}
          javaScriptEnabled
          scrollEnabled={false}
          nestedScrollEnabled={false}
          source={{
            uri: `https://www.youtube.com/embed/${link}?rel=0&modestbranding=1&mute=1`,
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
        nativeControls
        allowsFullscreen
        allowsPictureInPicture
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width,
    aspectRatio: 9 / 16,
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
    backgroundColor: '#000',
  },
});
