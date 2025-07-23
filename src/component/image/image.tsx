/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Image, Pressable } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import type { ImageProps } from 'react-native';

interface WImageProps extends ImageProps {
  sourceError?: any;
}

export const WImage = ({ source, sourceError, ...props }: WImageProps) => {
  const isRemoteImage = typeof source === 'object';
  const [isLoading, setIsLoading] = useState<boolean>(isRemoteImage);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (isRemoteImage) setIsError(false)
  }, [isRemoteImage]);

  return <>
    <Pressable pointerEvents="none">
      <Image
        {...props}
        source={isError ? (sourceError ?? { uri: "https://cdn.jsdelivr.net/gh/WiniGit/icon-library@latest/outline/development/image-2.svg" }) : source}
        style={isLoading ? { position: 'absolute', opacity: 0 } : props.style}
        onLoadEnd={() => setIsLoading(false)}
        onError={() => setIsError(true)}
      />
    </Pressable>
    {isLoading && (
      <SkeletonPlaceholder backgroundColor="#e0e0e0" highlightColor="#f5f5f5">
        <View style={props.style} />
      </SkeletonPlaceholder>
    )}
  </>
};
