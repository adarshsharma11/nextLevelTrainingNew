import {NavigationActions, StackActions} from 'react-navigation';
import {DrawerActions} from 'react-navigation-drawer';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function goBack(params) {
  // params?
  _navigator.dispatch(NavigationActions.back(params));
}

function navigateAndReset(routeName) {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName,
        }),
      ],
    }),
  );
}

function navigateAndResetWithParams(routeName, params) {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName,
          params,
        }),
      ],
    }),
  );
}

function openDrawer() {
  _navigator.dispatch(DrawerActions.openDrawer());
}
function closeDrawer() {
  _navigator.dispatch(DrawerActions.closeDrawer());
}

export default {
  navigate,
  navigateAndReset,
  navigateAndResetWithParams,
  setTopLevelNavigator,
  goBack,
  openDrawer,
  closeDrawer,
};
