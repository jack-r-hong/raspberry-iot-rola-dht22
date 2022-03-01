import 'package:flutter/material.dart';
import 'package:navme/navme.dart';

import 'package:app/main/index.dart';
import 'package:app/navigation/index.dart';
import 'package:navme/helpers.dart';

class MainPage extends StatefulWidget {
  static const String routeName = '/';

  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  final _mainBloc = MainBloc();
  final NavmeRouterDelegate _routerDelegate = NavmeRouterDelegate.mainNested();
  final StateRouteInformationParser _stateRouteInformation =
      StateRouteInformationParser();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // drawer: Drawer(
      //   child: ListView(padding: EdgeInsets.zero, children: [
      //     const DrawerHeader(
      //         decoration: BoxDecoration(
      //           color: Colors.blue,
      //         ),
      //         child: Center(
      //           child: Text('Home'),
      //         )),
      //     ListTile(
      //       title: const Text('溫度感測'),
      //       onTap: () {

      //       },
      //     ),
      //   ]),
      // ),

      appBar: AppBar(
        title: const Text(
          "管理系統",
          style: TextStyle(color: Colors.green),
        ),
        actions: [],
        backgroundColor: Colors.blueGrey[100],
      ),

      body: SizedBox(
        width: MediaQuery.of(context).size.width,
        // height: MediaQuery.of(context).size.height / 2,
        child: MaterialApp.router(
          routerDelegate: _routerDelegate,
          routeInformationParser: _stateRouteInformation,
        ),
      ),
      // body: MainScreen(mainBloc: _mainBloc),
    );
  }
}
