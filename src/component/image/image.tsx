import React, { useEffect, useState } from 'react';
import { View, Image, Pressable, ViewStyle, ImageResizeMode, StyleProp, GestureResponderEvent, LayoutChangeEvent, ImageStyle } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SvgUri } from 'react-native-svg';

interface WImageProps {
  style?: StyleProp<ViewStyle | ImageStyle>;
  width?: number | string;
  height?: number | string;
  src?: string;
  resizeMode?: ImageResizeMode;
  onPress?: ((event: GestureResponderEvent) => void);
  onLayout?: ((event: LayoutChangeEvent) => void)
}

export const WImage = ({ src, style = {}, ...props }: WImageProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [svgError, setSvgError] = useState<boolean>(false);

  useEffect(() => {
    if (src?.length) {
      setIsLoading(true)
      setIsError(false)
      setSvgError(false)
    } else {
      setIsLoading(false)
      setIsError(true)
      setSvgError(true)
    }
  }, [src])

  return !!src?.length ? <>
    <Pressable pointerEvents="none" style={[{ overflow: "hidden" }, ...(Array.isArray(style) ? style : [style])]} onPress={props.onPress} onLayout={props.onLayout}>
      {(src.endsWith("svg") || isError) ?
        <SvgUri
          uri={svgError ? "https://cdn.jsdelivr.net/gh/WiniGit/icon-library@latest/outline/development/image-2.svg" : src}
          style={isLoading ? { position: 'absolute', opacity: 0 } : { width: "100%", height: "100%", aspectRatio: (style as any).aspectRatio }}
          width={props.width}
          height={props.height}
          onLoad={() => setIsLoading(false)}
          onError={() => setSvgError(true)}
        /> :
        <Image
          source={{ uri: src }}
          resizeMode={props.resizeMode}
          style={isLoading ? { position: 'absolute', opacity: 0 } : { width: "100%", height: "100%", aspectRatio: (style as any).aspectRatio }}
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
  </> : <SvgUri uri={"https://cdn.jsdelivr.net/gh/WiniGit/icon-library@latest/outline/development/image-2.svg"} style={style} />
};