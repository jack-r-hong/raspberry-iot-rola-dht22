import 'dart:async';
import 'dart:developer' as developer;

import 'package:app/you_awesome/index.dart';
import 'package:meta/meta.dart';

@immutable
abstract class YouAwesomeEvent {
  Stream<YouAwesomeState> applyAsync(
      {YouAwesomeState currentState, YouAwesomeBloc bloc});
  final YouAwesomeRepository _youAwesomeRepository = YouAwesomeRepository();
}

class UnYouAwesomeEvent extends YouAwesomeEvent {
  @override
  Stream<YouAwesomeState> applyAsync({YouAwesomeState? currentState, YouAwesomeBloc? bloc}) async* {
    yield UnYouAwesomeState(0);
  }
}

class LoadYouAwesomeEvent extends YouAwesomeEvent {
   
  final bool isError;
  @override
  String toString() => 'LoadYouAwesomeEvent';

  LoadYouAwesomeEvent(this.isError);

  @override
  Stream<YouAwesomeState> applyAsync(
      {YouAwesomeState? currentState, YouAwesomeBloc? bloc}) async* {
    try {
      yield UnYouAwesomeState(0);
      await Future.delayed(const Duration(seconds: 1));
      _youAwesomeRepository.test(isError);
      yield InYouAwesomeState(0, 'Hello world');
    } catch (_, stackTrace) {
      developer.log('$_', name: 'LoadYouAwesomeEvent', error: _, stackTrace: stackTrace);
      yield ErrorYouAwesomeState(0, _.toString());
    }
  }
}
