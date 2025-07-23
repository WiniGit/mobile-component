import { View, Text, StyleSheet, Modal, Pressable, Animated, PanResponder, Dimensions, KeyboardAvoidingView, Platform, DimensionValue, TouchableWithoutFeedback, } from 'react-native';
import React, { forwardRef, RefObject, useImperativeHandle, useRef, useState } from 'react';
import { useDesignTokens } from '../../module/WiniProvider';

interface BottomSheetState {
  enableDismiss?: boolean;
  dismiss?: () => void;
  title?: string;
  prefixAction?: React.ReactNode;
  suffixAction?: React.ReactNode;
  children?: React.ReactNode;
  height?: DimensionValue;
}

interface BottomSheetRef {
  showBottomSheet: (props: BottomSheetState) => void;
  hideBottomSheet: () => void;
}

export const WBottomSheet = forwardRef<BottomSheetRef, any>((_, ref) => {
  const { textStyles, colors } = useDesignTokens()
  const [isVisible, setIsVisible] = useState(false);
  const [btmSheetState, setBtmSheetState] = useState<BottomSheetState>({});

  const showBottomSheet = (props: BottomSheetState) => {
    setIsVisible(true);
    setBtmSheetState(props);
  }

  const hideBottomSheet = () => {
    setIsVisible(false);
    setBtmSheetState({});
  }

  useImperativeHandle(ref, () => ({
    showBottomSheet,
    hideBottomSheet
  }), [])

  const onDismiss = () => {
    hideBottomSheet();
    btmSheetState.dismiss?.();
  }

  return (
    // Thêm statusBarTranslucent để ngăn modal cha nhận sự kiện khi modal con hiển thị
    <Modal transparent visible={isVisible} animationType="slide" statusBarTranslucent={true}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <TouchableWithoutFeedback>
          <Container onDismiss={btmSheetState.enableDismiss ? onDismiss : undefined}>
            <View style={[styles.container, { height: btmSheetState.height, backgroundColor: colors?.['neutral-background-color-absolute'] }]} pointerEvents="box-none">
              <View
                style={{
                  width: 56,
                  marginTop: 8,
                  height: 6,
                  borderRadius: 10,
                  backgroundColor: colors?.['neutral-background-color-bolder'],
                }}
              />
              <Pressable style={{ width: '100%' }}>
                {!!btmSheetState.title?.length && <View style={styles.header}>
                  {btmSheetState.prefixAction}
                  <Text
                    style={{
                      position: 'absolute',
                      left: '12%',
                      right: '12%',
                      textAlign: 'center',
                      top: 12,
                      ...(textStyles?.['label-3'] ?? {})
                    }}
                  >
                    {btmSheetState.title}
                  </Text>
                  {btmSheetState.suffixAction}
                </View>}
              </Pressable>
              {btmSheetState.children}
            </View>
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  )
})

const scrSize = Dimensions.get('window');
const Container = (props: { children: React.ReactNode; onDismiss?: () => void; }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: (_, gestureState) => {
        // Chỉ bắt sự kiện vuốt xuống khi:
        // 1. Đang vuốt xuống (dy > 0)
        // 2. Đang ở vùng header (y < 100)
        return gestureState.dy > 10 && gestureState.y0 < 100;
      },
      onPanResponderGrant: () => {
        // Khi bắt đầu vuốt, đảm bảo modal cha không nhận sự kiện
        // Use a type assertion to access the internal value
        pan.setOffset({
          x: (pan.x as any)._value,
          y: (pan.y as any)._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        pan.flattenOffset();
        const velocityThreshold = 0.5;
        if (gestureState.vy > velocityThreshold && gestureState.dy > 50) {
          Animated.timing(pan.y, {
            toValue: scrSize.height,
            duration: 300,
            useNativeDriver: false,
          }).start(props.onDismiss);
        } else {
          // Nếu kéo không vượt ngưỡng, trả BottomSheet về vị trí ban đầu
          Animated.spring(pan.y, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return props.onDismiss ? (
    <Animated.View
      style={{
        ...styles.overlay,
        backgroundColor: pan.y.interpolate({
          inputRange: [0, scrSize.height],
          outputRange: ['#00000080', '#00000000'],
          extrapolate: 'clamp',
        }),
      }}
      {...panResponder.panHandlers}
    >
      <Pressable style={styles.dismissOverlay} onPress={props.onDismiss} />
      <Animated.View
        style={{
          alignItems: 'center',
          gap: 8,
          width: '100%',
          transform: [
            {
              translateY: pan.y.interpolate({
                inputRange: [0, scrSize.height],
                outputRange: [0, scrSize.height],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        {props.children}
      </Animated.View>
    </Animated.View>
  ) : (
    <View style={{ ...styles.overlay, backgroundColor: '#00000080' }}>
      <View style={{ alignItems: 'center', gap: 8, width: '100%' }}>
        {props.children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
    flex: 1,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  dismissOverlay: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
    opacity: 0.01,
  },
  container: {
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
    maxHeight: '90%', // Add this to limit maximum height
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    minHeight: 48,
    width: '100%',
    position: 'relative',
  },
});

export const showBottomSheet = ({ ref, ...props }: {
  ref: RefObject<BottomSheetRef>;
  enableDismiss?: boolean;
  dismiss?: () => void;
  title?: string;
  prefixAction?: React.ReactNode;
  suffixAction?: React.ReactNode;
  children: React.ReactNode;
}) => {
  ref.current.showBottomSheet(props);
};

export const hideBottomSheet = (ref: RefObject<BottomSheetRef>) => {
  ref.current.hideBottomSheet();
};
