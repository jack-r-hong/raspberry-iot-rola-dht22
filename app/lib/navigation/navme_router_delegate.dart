import 'package:flutter/material.dart';

import 'package:navme/navme.dart';
import 'package:navme/helpers.dart';

import 'package:app/main/main_navigate.dart';
import 'package:app/home/home_navigate.dart';
import 'package:app/data_board/data_board_navigate.dart';

class NavmeRouterDelegate extends BaseRouterDelegate {
  NavmeRouterDelegate(
      {required RouteConfig initialRoute,
      required List<RouteConfig> routes,
      required RouteConfig onUnknownRoute,
      String? nestedPrefixPath,
      String? debugLabel})
      : super(
          initialRoute: initialRoute,
          routes: routes,
          onUnknownRoute: onUnknownRoute,
          nestedPrefixPath: nestedPrefixPath,
          debugLabel: debugLabel,
        );

  factory NavmeRouterDelegate.main() {
    return NavmeRouterDelegate(
      initialRoute: MainNavigate.routeConfig,
      routes: [
        MainNavigate.routeConfig,
      ],
      onUnknownRoute: MainNavigate.routeConfig,
      debugLabel: 'main',
    );
  }

  factory NavmeRouterDelegate.mainNested() {
    return NavmeRouterDelegate(
      initialRoute: HomeNavigate.routeConfig,
      routes: [
        // MainNavigate.nestedRouteConfig,
        HomeNavigate.routeConfig,
        DataBoardNavigate.routeConfig,
      ],
      onUnknownRoute: DataBoardNavigate.routeConfig,
      nestedPrefixPath: MainNavigate.path,
      debugLabel: 'nested',
    );
  }

  @override
  Widget build(BuildContext context) {
    return Navigator(
      key: UniqueKey(),
      observers: [HeroController()], // THIS IS THE IMPORTANT LINE for Hero
      pages: buildPage(),
      onPopPage: (route, result) {
        if (!route.didPop(result)) {
          return false;
        }
        pop();
        return true;
      },
    );
  }
}
