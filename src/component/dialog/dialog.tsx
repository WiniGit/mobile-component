import React, { createRef, useMemo } from 'react';
import { ComponentStatus, getStatusIcon } from '../component-status';
import { KeyboardAvoidingView, Modal, Platform, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { lightThemeColor } from '../../skin/color';
import { useDesignTokens } from '../../module/WiniProvider';
import { useTranslation } from 'react-i18next';
import { WButton, WButtonVariant } from '../button/button';

interface DialogState {
  readonly open?: boolean;
  title: string;
  status: ComponentStatus;
  content: string | React.ReactNode;
  titleSubmit?: string;
  titleCancel?: string;
  onSubmit: Function;
  onCancel?: Function;
  submitTitle?: string;
}

export const showDialog = ({
  title,
  status,
  content,
  onSubmit,
  onCancel,
  submitTitle,
}: {
  title?: string;
  status?: ComponentStatus;
  content?: string | React.ReactNode;
  titleSubmit?: string;
  titleCancel?: string;
  onSubmit?: Function;
  onCancel?: Function;
  submitTitle?: string;
}) => {
  dialogRef.current.showDialogNoti({
    title: title,
    status: status,
    content: content,
    onSubmit: onSubmit ?? (() => { }),
    onCancel: onCancel ?? (() => { }),
    submitTitle: submitTitle,
  });
};

export class CustomDialog extends React.Component<Object, DialogState> {
  state: Readonly<DialogState> = {
    open: false,
    title: '',
    status: ComponentStatus.INFOR,
    content: '',
    onSubmit: () => { },
    onCancel: () => { },
  };
  showDialogNoti(data: DialogState) {
    this.setState({ open: true, ...data });
  }

  closeDialog() {
    this.setState({ open: false });
  }

  render() {
    return <SafeAreaView>
      <Modal animationType="slide" visible={this.state.open ?? false} transparent>
        <View style={styles.overlay}>
          <Container
            status={this.state.status}
            title={this.state.title}
            content={this.state.content}
            titleSubmit={this.state.submitTitle}
            onSubmit={() => {
              if (this.state.onSubmit) this.state.onSubmit();
              this.closeDialog();
            }}
            titleCancel={this.state.titleCancel}
            onCancel={() => {
              if (this.state.onCancel) this.state.onCancel();
              this.closeDialog();
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  }
}

const dialogRef = createRef() as any;
export const WDialog = () => {
  return <CustomDialog ref={dialogRef} />
}

const Container = ({ status = ComponentStatus.INFOR, ...props }: { status?: ComponentStatus, title?: string, content?: string | React.ReactNode, onCancel?: () => void, onSubmit?: () => void, titleCancel?: string, titleSubmit?: string }) => {
  const { colors, textStyles } = useDesignTokens()
  const { t } = useTranslation()
  const bgColor = useMemo(() => {
    switch (status) {
      case ComponentStatus.WARNING:
        return lightThemeColor['warning-color-main'];
      case ComponentStatus.ERROR:
        return lightThemeColor['error-color-main'];
      case ComponentStatus.SUCCSESS:
        return lightThemeColor['success-color-main'];
      default: // ComponentStatus.INFOR
        return lightThemeColor['infor-color-main'];
    }
  }, [status])

  return <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 35 : 0} style={[styles.container, { backgroundColor: colors?.['neutral-background-color-absolute'] }]}>
    {getStatusIcon(status, 56)}
    <Pressable style={{ gap: 8, alignItems: 'center' }}>
      {!!props.title?.length && <Text style={textStyles?.['heading-6']}>
        {props.title}
      </Text>}
      {typeof props.content === 'string' ? <Text style={textStyles?.["body-3"]}>
        {props.content}
      </Text> : props.content}
    </Pressable>
    <View style={{ flexDirection: 'row', marginVertical: 8, gap: 8, justifyContent: "flex-end" }}>
      <WButton
        label={props.titleCancel ?? t('cancel')}
        style={[WButtonVariant.size32, { backgroundColor: colors?.['neutral-background-color-main'] }]}
        onPress={props.onCancel}
      />
      <WButton
        label={props.titleSubmit ?? t('submit')}
        style={[WButtonVariant.size32, { backgroundColor: bgColor, color: '#fff' }]}
        onPress={props.onSubmit}
      />
    </View>
  </KeyboardAvoidingView>
}

const styles = StyleSheet.create({
  overlay: {
    height: '100%',
    width: '100%',
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#00000080',
  },
  container: {
    width: '100%',
    borderRadius: 8,
    padding: 24,
    gap: 16
  },
});
