import React, { createRef, useMemo } from 'react';
import { ComponentStatus, getStatusIcon } from '../component-status';
import { KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { lightThemeColor } from '../../skin/color';
import { useDesignTokens } from '../../module/WiniProvider';
import { useTranslation } from 'react-i18next';

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
    return (
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
    );
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

  return <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 35 : 0} style={styles.container}>
    {getStatusIcon(status, 64)}
    <Pressable style={{ gap: 4, marginTop: 12, alignItems: 'center' }}>
      {!!props.title?.length && <Text style={{ ...(textStyles?.['label-2'] ?? {}), textAlign: 'center' }}>
        {props.title}
      </Text>}
      {typeof props.content === 'string' ? <Text style={{ ...(textStyles?.["body-3"] ?? {}), textAlign: 'center' }}>
        {props.content}
      </Text> : props.content}
    </Pressable>
    <View style={{ flexDirection: 'row', marginTop: 24, gap: 8 }}>
      <TouchableOpacity style={[styles.footerButton, { backgroundColor: colors?.['neutral-background-color-main'] }]} onPress={props.onCancel}>
        <Text style={textStyles?.['label-1']}>
          {props.titleCancel ?? t('cancel')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.footerButton, { backgroundColor: bgColor }]} onPress={props.onSubmit}>
        <Text style={{ ...(textStyles?.["label-1"] ?? {}), color: '#fff' }}>
          {props.titleSubmit ?? t('submit')}
        </Text>
      </TouchableOpacity>
    </View>
  </KeyboardAvoidingView>
}

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: '#00000080',
  },
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
  },
  footerButton: {
    height: 40,
    flex: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
