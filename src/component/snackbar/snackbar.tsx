import React, { type ReactNode, createRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { ComponentStatus } from '../component-status';
import { lightThemeColor } from '../../skin/color';
import { typography } from '../../skin/typography';
import { Snackbar } from 'react-native-paper';

interface FSnackbarState {
  visible?: boolean;
  message?: string;
  label?: string;
  status?: number;
  action?: () => {};
  actionTitle?: string;
  children?: ReactNode;
  bottom?: number;
}

class CustomSnackbar extends React.Component<Object, FSnackbarState> {
  state: Readonly<FSnackbarState> = {};
  onShow = (newState: FSnackbarState) => {
    this.setState({ ...newState, visible: true });
  };

  getBg = () => {
    switch (this.state.status) {
      case ComponentStatus.WARNING:
        return lightThemeColor['warning-color-main'];
      case ComponentStatus.ERROR:
        return lightThemeColor['error-color-main'];
      case ComponentStatus.SUCCSESS:
        return lightThemeColor['success-color-main'];
      default: // ComponentStatus.INFOR
        return lightThemeColor['infor-color-main'];
    }
  };

  getIcon = () => {
    switch (this.state.status) {
      case ComponentStatus.WARNING:
        return (
          <SvgXml
            xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.76 15.92L15.36 4.4C14.5 2.85 13.31 2 12 2C10.69 2 9.49998 2.85 8.63998 4.4L2.23998 15.92C1.42998 17.39 1.33998 18.8 1.98998 19.91C2.63998 21.02 3.91998 21.63 5.59998 21.63H18.4C20.08 21.63 21.36 21.02 22.01 19.91C22.66 18.8 22.57 17.38 21.76 15.92ZM11.25 9C11.25 8.59 11.59 8.25 12 8.25C12.41 8.25 12.75 8.59 12.75 9V14C12.75 14.41 12.41 14.75 12 14.75C11.59 14.75 11.25 14.41 11.25 14V9ZM12.71 17.71C12.66 17.75 12.61 17.79 12.56 17.83C12.5 17.87 12.44 17.9 12.38 17.92C12.32 17.95 12.26 17.97 12.19 17.98C12.13 17.99 12.06 18 12 18C11.94 18 11.87 17.99 11.8 17.98C11.74 17.97 11.68 17.95 11.62 17.92C11.56 17.9 11.5 17.87 11.44 17.83C11.39 17.79 11.34 17.75 11.29 17.71C11.11 17.52 11 17.26 11 17C11 16.74 11.11 16.48 11.29 16.29C11.34 16.25 11.39 16.21 11.44 16.17C11.5 16.13 11.56 16.1 11.62 16.08C11.68 16.05 11.74 16.03 11.8 16.02C11.93 15.99 12.07 15.99 12.19 16.02C12.26 16.03 12.32 16.05 12.38 16.08C12.44 16.1 12.5 16.13 12.56 16.17C12.61 16.21 12.66 16.25 12.71 16.29C12.89 16.48 13 16.74 13 17C13 17.26 12.89 17.52 12.71 17.71Z" fill="white"/>
                    </svg>`}
            width={24}
            height={24}
          />
        );
      case ComponentStatus.ERROR:
        return (
          <SvgXml
            xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L10.94 12L8.64 9.7C8.35 9.41 8.35 8.93 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z" fill="white"/>
                    </svg>`}
            width={24}
            height={24}
          />
        );
      case ComponentStatus.SUCCSESS:
        return (
          <SvgXml
            xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z" fill="white"/>
                    </svg>`}
            width={24}
            height={24}
          />
        );
      default: // ComponentStatus.INFOR
        return (
          <SvgXml
            xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C6.49 22 2 17.51 2 12C2 6.49 6.49 2 12 2C17.51 2 22 6.49 22 12C22 17.51 17.51 22 12 22ZM11.25 16C11.25 16.41 11.59 16.75 12 16.75C12.41 16.75 12.75 16.41 12.75 16V11C12.75 10.59 12.41 10.25 12 10.25C11.59 10.25 11.25 10.59 11.25 11V16ZM12.92 7.62C12.87 7.49 12.8 7.39 12.71 7.29C12.61 7.2 12.5 7.13 12.38 7.08C12.26 7.03 12.13 7 12 7C11.87 7 11.74 7.03 11.62 7.08C11.5 7.13 11.39 7.2 11.29 7.29C11.2 7.39 11.13 7.49 11.08 7.62C11.03 7.74 11 7.87 11 8C11 8.13 11.03 8.26 11.08 8.38C11.13 8.5 11.2 8.61 11.29 8.71C11.39 8.8 11.5 8.87 11.62 8.92C11.86 9.02 12.14 9.02 12.38 8.92C12.5 8.87 12.61 8.8 12.71 8.71C12.8 8.61 12.87 8.5 12.92 8.38C12.97 8.26 13 8.13 13 8C13 7.87 12.97 7.74 12.92 7.62Z" fill="white"/>
                    </svg>`}
            width={24}
            height={24}
          />
        );
    }
  };

  render(): React.ReactNode {
    return (
      <Snackbar
        wrapperStyle={{ zIndex: 1 }}
        style={{
          zIndex: 100,
          backgroundColor: this.getBg(),
          bottom: this.state.bottom ?? 16,
        }}
        visible={this.state.visible === true}
        duration={2000}
        onDismiss={() => {
          this.setState({ ...this.state, visible: false });
        }}
      >
        {this.state.children ?? (
          <View style={{ flexDirection: 'row', columnGap: 12, alignItems: 'flex-start' }}>
            {this.getIcon()}
            <View style={{ columnGap: 8, flex: 1 }}>
              {!!this.state.label?.length && <Text numberOfLines={1} style={[typography['heading-7'], { color: '#ffffff' }]}>
                {this.state.label ?? ''}
              </Text>}
              {!!this.state.message?.length && <Text numberOfLines={2} style={[typography['body-3'], { color: '#ffffff' }]}>
                {this.state.message ?? ''}
              </Text>}
            </View>
            {!!this.state.actionTitle?.length && <TouchableOpacity onPress={this.state.action}>
              <Text style={[typography['label-4'], { color: '#ffffff' }]}>
                {this.state.actionTitle}
              </Text>
            </TouchableOpacity>}
          </View>
        )}
      </Snackbar>
    );
  }
}

const snackbarRef = createRef() as any;
export function FSnackbar() {
  return <CustomSnackbar ref={snackbarRef} />;
}

export const showSnackbar = ({
  message,
  label,
  status,
  children,
  action,
  actionTitle,
  bottom,
}: {
  message: string;
  label?: string;
  status?: number;
  action?: () => {};
  actionTitle?: string;
  children?: ReactNode;
  bottom?: number;
}) => {
  snackbarRef.current.onShow({
    message: message,
    label: label,
    status: status ?? ComponentStatus.INFOR,
    children: children,
    action: action,
    actionTitle: actionTitle,
    bottom: bottom,
  });
};
