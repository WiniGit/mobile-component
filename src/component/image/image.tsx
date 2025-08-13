import React, { useEffect, useState } from 'react';
import { View, Image, Pressable, ViewStyle, ImageResizeMode, StyleProp } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SvgUri } from 'react-native-svg';

interface WImageProps {
  style?: StyleProp<ViewStyle>;
  width?: number | string;
  height?: number | string;
  src?: string;
  resizeMode?: ImageResizeMode
}

export const WImage = ({ src, ...props }: WImageProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [svgError, setSvgError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true)
    setIsError(false)
    setSvgError(false)
  }, [src]);

  return src?.length ? <>
    <Pressable pointerEvents="none" style={props.style}>
      {(src.endsWith("svg") || isError) ?
        <SvgUri
          uri={svgError ? "https://cdn.jsdelivr.net/gh/WiniGit/icon-library@latest/outline/development/image-2.svg" : src}
          style={isLoading ? { position: 'absolute', opacity: 0 } : { width: "100%", height: "100%" }}
          width={props.width}
          height={props.height}
          onLoad={() => setIsLoading(false)}
          onError={() => setSvgError(true)}
        /> :
        <Image
          source={{ uri: src }}
          resizeMode={props.resizeMode}
          style={isLoading ? { position: 'absolute', opacity: 0 } : { width: "100%", height: "100%" }}
          width={props.width as any}
          height={props.height as any}
          onLoadEnd={() => setIsLoading(false)}
          onError={() => setIsError(true)}
        />}
      {isLoading && (
        <SkeletonPlaceholder backgroundColor="#e0e0e0" highlightColor="#f5f5f5">
          <View style={{ width: "100%", height: "100%" }} />
        </SkeletonPlaceholder>
      )}
    </Pressable>
  </> : <SvgUri uri={"https://cdn.jsdelivr.net/gh/WiniGit/icon-library@latest/outline/development/image-2.svg"} style={props.style} />
};
