import 'package:flutter/material.dart';
import 'package:app/data_board/index.dart';

class DataBoardPage extends StatefulWidget {
  static const String routeName = '/dataBoard';

  @override
  _DataBoardPageState createState() => _DataBoardPageState();
}

class _DataBoardPageState extends State<DataBoardPage> {
  final _dataBoardBloc = DataBoardBloc();

  @override
  Widget build(BuildContext context) {
    return DataBoardScreen(dataBoardBloc: _dataBoardBloc);
  }
}
