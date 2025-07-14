import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  Animated,
  PanResponder,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  DimensionValue,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useRef } from 'react';
import { typography } from '../../skin/typography';

interface BottomSheetState {
  isVisible: boolean;
  enableDismiss?: boolean;
  dismiss?: () => void;
  title?: React.ReactNode;
  prefixAction?: React.ReactNode;
  suffixAction?: React.ReactNode;
  children: React.ReactNode;
  height?: DimensionValue | undefined;
}

export class FBottomSheet extends React.Component<
  any,
  BottomSheetState
> {
  state: Readonly<BottomSheetState> = {
    isVisible: false,
    children: <View />,
  };

  showBottomSheet({
    enableDismiss,
    title,
    dismiss,
    prefixAction,
    suffixAction,
    children,
    height,
  }: {
    enableDismiss?: boolean;
    dismiss?: () => void;
    titleText?: string;
    title?: React.ReactNode;
    prefixAction?: React.ReactNode;
    suffixAction?: React.ReactNode;
    children: React.ReactNode;
    height?: DimensionValue | undefined;
  }) {
    this.setState({
      isVisible: true,
      enableDismiss: enableDismiss,
      title: title,
      dismiss: dismiss,
      prefixAction: prefixAction,
      suffixAction: suffixAction,
      children: children,
      height: height,
    });
  }

  hideBottomSheet() {
    this.setState({ isVisible: false });
  }

  render(): React.ReactNode {
    return (
      <Modal
        visible={this.state.isVisible ?? false}
        transparent
        animationType="slide"
        // Thêm thuộc tính này để ngăn modal cha nhận sự kiện khi modal con hiển thị
        statusBarTranslucent={true}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback>
            <Container
              onDismiss={
                this.state.enableDismiss
                  ? () => {
                    this.hideBottomSheet();
                    if (this.state.dismiss) this.state.dismiss();
                  }
                  : undefined
              }
            >
              <View
                style={[styles.container, { height: this.state.height }]}
                pointerEvents="box-none"
              >
                <View
                  style={{
                    width: 56,
                    marginTop: 8,
                    height: 6,
                    borderRadius: 10,
                    backgroundColor: '#EAEAEA',
                  }}
                />
                <Pressable style={{ width: '100%' }}>
                  {this.state.title ? (
                    <View style={styles.header}>
                      {this.state.prefixAction}
                      <Text
                        style={[
                          typography['label-3'],
                          {
                            position: 'absolute',
                            left: '12%',
                            right: '12%',
                            textAlign: 'center',
                            top: 12,
                          },
                        ]}
                      >
                        {this.state.title ?? '-'}
                      </Text>
                      {this.state.suffixAction}
                    </View>
                  ) : (
                    this.state.title
                  )}
                </Pressable>
                {this.state.children}
              </View>
            </Container>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

const scrSize = Dimensions.get('window');
const Container = ({
  children,
  onDismiss,
}: {
  children: React.ReactNode;
  onDismiss?: () => void;
}) => {
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
          }).start(() => {
            if (onDismiss) onDismiss();
          });
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

  return onDismiss ? (
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
      <Pressable style={styles.dismissOverlay} onPress={onDismiss} />
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
        {children}
      </Animated.View>
    </Animated.View>
  ) : (
    <View style={{ ...styles.overlay, backgroundColor: '#00000080' }}>
      <View style={{ alignItems: 'center', gap: 8, width: '100%' }}>
        {children}
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
    backgroundColor: '#fff',
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

export const showBottomSheet = ({
  ref,
  enableDismiss,
  titleText,
  title,
  dismiss,
  prefixAction,
  suffixAction,
  children,
  // height,
}: {
  ref: React.MutableRefObject<FBottomSheet>;
  enableDismiss?: boolean;
  dismiss?: () => void;
  titleText?: string;
  title?: React.ReactNode;
  prefixAction?: React.ReactNode;
  suffixAction?: React.ReactNode;
  children: React.ReactNode;
  // height?: DimensionValue | undefined;
}) => {
  ref.current.showBottomSheet({
    dismiss: dismiss,
    enableDismiss: enableDismiss,
    prefixAction: prefixAction,
    suffixAction: suffixAction,
    title: title,
    titleText: titleText,
    children: children,
    // height: height,
  });
};
export const hideBottomSheet = (ref: React.MutableRefObject<FBottomSheet>) => {
  ref.current.hideBottomSheet();
};
