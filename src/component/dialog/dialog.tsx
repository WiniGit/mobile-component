import React, { createRef, useMemo } from 'react';
import { ComponentStatus, getStatusIcon } from '../component-status';
import { KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
  small?: boolean;
}

export const showDialog = ({
  title,
  status,
  content,
  onSubmit,
  onCancel,
  submitTitle,
  small
}: {
  title?: string;
  status?: ComponentStatus;
  content?: string | React.ReactNode;
  titleSubmit?: string;
  titleCancel?: string;
  onSubmit?: Function;
  onCancel?: Function;
  submitTitle?: string;
  small?: boolean;
}) => {
  dialogRef.current.showDialogNoti({
    onSubmit: onSubmit ?? (() => { }),
    onCancel: onCancel ?? (() => { }),
    title,
    status,
    content,
    submitTitle,
    small
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
    return <Modal animationType="slide" visible={this.state.open ?? false} transparent>
      <View style={[styles.overlay, { padding: this.state.small ? 32 : 16 }]}>
        {this.state.small ?
          <SmallContainer
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
          /> :
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
          />}
      </View>
    </Modal>
  }
}

const dialogRef = createRef() as any;
export const WDialog = () => {
  return <CustomDialog ref={dialogRef} />
}

interface ContainerProps {
  status?: ComponentStatus;
  title?: string;
  content?: string | React.ReactNode;
  onCancel?: () => void;
  onSubmit?: () => void;
  titleCancel?: string;
  titleSubmit?: string;
}

const SmallContainer = ({ status = ComponentStatus.INFOR, ...props }: ContainerProps) => {
  const { colors, textStyles } = useDesignTokens()
  const { t } = useTranslation()
  const mainColor = useMemo(() => {
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

  return <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 35 : 0} style={[styles.smallContainer, { backgroundColor: colors?.['neutral-background-color-absolute'], borderColor: colors?.['neutral-border-color-main'] }]}>
    <View style={{ gap: 8, padding: 16, alignItems: "center" }}>
      {!!props.title?.length && <Text style={textStyles?.['heading-7']}>{props.title}</Text>}
      {typeof props.content === 'string' ? <Text style={textStyles?.["subtitle-4"]}>{props.content}</Text> : props.content}
    </View>
    <View style={[styles.smallFooter, { borderTopColor: colors?.['neutral-border-color-main'] }]}>
      <TouchableOpacity onPress={props.onCancel} style={styles.actionBtn}>
        <Text style={[textStyles?.['label-4']]}>{props.titleCancel ?? t('cancel')}</Text>
      </TouchableOpacity>
      <View style={{ width: 1, height: 32, backgroundColor: colors?.['neutral-border-color-main'] }} />
      <TouchableOpacity onPress={props.onSubmit} style={styles.actionBtn}>
        <Text style={[textStyles?.['label-4'], { color: mainColor }]}>{props.titleSubmit ?? t('submit')}</Text>
      </TouchableOpacity>
    </View>
  </KeyboardAvoidingView>
}

const Container = ({ status = ComponentStatus.INFOR, ...props }: ContainerProps) => {
  const { colors, textStyles } = useDesignTokens()
  const { t } = useTranslation()
  const mainColor = useMemo(() => {
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
  const bgColor = useMemo(() => {
    switch (status) {
      case ComponentStatus.WARNING:
        return lightThemeColor['warning-color-background'];
      case ComponentStatus.ERROR:
        return lightThemeColor['error-color-background'];
      case ComponentStatus.SUCCSESS:
        return lightThemeColor['success-color-background'];
      default: // ComponentStatus.INFOR
        return lightThemeColor['infor-color-background'];
    }
  }, [status])

  return <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 35 : 0} style={[styles.container, { backgroundColor: colors?.['neutral-background-color-absolute'] }]}>
    <View style={{ alignItems: 'center', justifyContent: "center", width: 56, height: 56, borderRadius: 28, backgroundColor: bgColor }}>
      {getStatusIcon(status, 35)}
    </View>
    <Pressable style={{ gap: 8 }}>
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
        style={[WButtonVariant.size32, { backgroundColor: mainColor, color: '#fff' }]}
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
    justifyContent: 'center',
    backgroundColor: '#00000080',
  },
  container: {
    width: '100%',
    borderRadius: 8,
    padding: 24,
    gap: 16
  },
  smallContainer: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    overflow: "hidden"
  },
  smallFooter: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  actionBtn: {
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    flex: 1
  }
});
