import 'package:flutter/material.dart';
import 'package:navme/navme.dart';

import 'package:app/navigation/index.dart';
import 'package:app/main/index.dart';

void main() {
  runApp(const App());
}

class App extends StatefulWidget {
  const App({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _AppState();
}

class _AppState extends State<App> {
  final NavmeRouterDelegate _routerDelegate = NavmeRouterDelegate.main();
  final StateRouteInformationParser _stateRouteInformation =
      StateRouteInformationParser();

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerDelegate: _routerDelegate,
      routeInformationParser: _stateRouteInformation,
    );
  }
}
