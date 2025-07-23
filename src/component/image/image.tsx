import React, { useEffect, useState } from 'react';
import { View, Image, Pressable, ViewStyle, ImageResizeMode } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SvgUri } from 'react-native-svg';

interface WImageProps {
  style?: ViewStyle;
  uri?: string;
  resizeMode?: ImageResizeMode
}

export const WImage = ({ uri, ...props }: WImageProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [svgError, setSvgError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true)
    setIsError(false)
    setSvgError(false)
  }, [uri]);

  return uri?.length ? <>
    <Pressable pointerEvents="none" style={props.style}>
      {(uri.endsWith("svg") || isError) ?
        <SvgUri
          uri={svgError ? "https://cdn.jsdelivr.net/gh/WiniGit/icon-library@latest/outline/development/image-2.svg" : uri}
          style={isLoading ? { position: 'absolute', opacity: 0 } : { width: "100%", height: "100%" }}
          onLoad={() => setIsLoading(false)}
          onError={() => setSvgError(true)}
        /> :
        <Image
          source={{ uri: uri }}
          resizeMode={props.resizeMode}
          style={isLoading ? { position: 'absolute', opacity: 0 } : { width: "100%", height: "100%" }}
          onLoadEnd={() => setIsLoading(false)}
          onError={() => setIsError(true)}
        />}
      {isLoading && (
        <SkeletonPlaceholder backgroundColor="#e0e0e0" highlightColor="#f5f5f5">
          <View style={{ width: "100%", height: "100%" }} />
        </SkeletonPlaceholder>
      )}
    </Pressable>
  </> : <SvgUri uri={"https://cdn.jsdelivr.net/gh/WiniGit/icon-library@latest/outline/development/image-2.svg"} />
};
