import 'package:flutter/material.dart';
import 'package:navme/navme.dart';
import 'package:navme/helpers.dart';

import 'index.dart';

class MainNavigate {
  // base path
  static String path = '';

  // config for configurate Router
  static RouteConfig routeConfig = RouteConfig(
    state: (Uri? uri) => RouteState(uri: path.toUri()),
    // condition for using this page
    isThisPage: (RouteState state) {
      if (state.firstPath == path) {
        return true;
      }
      return false;
    },
    // settigs from url
    settings: (RouteState state) {
      return null;
    },
    // get Page for Router
    page: ({RouteState? state}) {
      return MaterialPage(
          key: const ValueKey('MainPage'), child: MainPage(), name: 'MainPage');
    },
  );

  // config for configurate Router
  static RouteConfig nestedRouteConfig = RouteConfig(
    state: (Uri? uri) => RouteState(uri: path.toUri()),
    // condition for using this page
    isThisPage: (RouteState state) {
      if (state.firstPath == path) {
        return true;
      }
      return false;
    },
    // settigs from url
    settings: (RouteState state) {
      return null;
    },
    // get Page for Router
    page: ({RouteState? state}) {
      return MaterialPage(
        key: UniqueKey(),
        child: MainPage(),
        name: 'MainPage',
      );
    },
  );
}
