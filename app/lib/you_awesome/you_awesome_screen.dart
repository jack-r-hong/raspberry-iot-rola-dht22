import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:app/you_awesome/index.dart';

class YouAwesomeScreen extends StatefulWidget {
  const YouAwesomeScreen({
    required YouAwesomeBloc youAwesomeBloc,
    Key? key,
  })  : _youAwesomeBloc = youAwesomeBloc,
        super(key: key);

  final YouAwesomeBloc _youAwesomeBloc;

  @override
  YouAwesomeScreenState createState() {
    return YouAwesomeScreenState();
  }
}

class YouAwesomeScreenState extends State<YouAwesomeScreen> {
  YouAwesomeScreenState();

  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<YouAwesomeBloc, YouAwesomeState>(
        bloc: widget._youAwesomeBloc,
        builder: (
          BuildContext context,
          YouAwesomeState currentState,
        ) {
          if (currentState is UnYouAwesomeState) {
            return Center(
              child: CircularProgressIndicator(),
            );
          }
          if (currentState is ErrorYouAwesomeState) {
            return Center(
                child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Text(currentState.errorMessage),
                Padding(
                  padding: const EdgeInsets.only(top: 32.0),
                  child: RaisedButton(
                    color: Colors.blue,
                    child: Text('reload'),
                    onPressed: _load,
                  ),
                ),
              ],
            ));
          }
           if (currentState is InYouAwesomeState) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Text(currentState.hello),
                  const Text('Flutter files: done'),
                  Padding(
                    padding: const EdgeInsets.only(top: 32.0),
                    child: RaisedButton(
                      color: Colors.red,
                      child: Text('throw error'),
                      onPressed: () => _load(true),
                    ),
                  ),
                ],
              ),
            );
          }
          return Center(
              child: CircularProgressIndicator(),
          );
          
        });
  }

  void _load([bool isError = false]) {
    widget._youAwesomeBloc.add(LoadYouAwesomeEvent(isError));
  }
}
