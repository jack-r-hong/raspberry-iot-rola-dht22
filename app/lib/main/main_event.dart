import 'dart:async';
import 'dart:developer' as developer;

import 'package:app/main/index.dart';
import 'package:meta/meta.dart';

@immutable
abstract class MainEvent {
  Stream<MainState> applyAsync({MainState currentState, MainBloc bloc});
  final MainRepository _mainRepository = MainRepository();
}

class UnMainEvent extends MainEvent {
  @override
  Stream<MainState> applyAsync(
      {MainState? currentState, MainBloc? bloc}) async* {
    yield UnMainState(0);
  }
}

class LoadMainEvent extends MainEvent {
  final bool isError;
  @override
  String toString() => 'LoadMainEvent';

  LoadMainEvent(this.isError);

  @override
  Stream<MainState> applyAsync(
      {MainState? currentState, MainBloc? bloc}) async* {
    try {
      yield UnMainState(0);
      await Future.delayed(const Duration(seconds: 1));
      _mainRepository.test(isError);
      yield InMainState(0, 'Hello world');
    } catch (_, stackTrace) {
      developer.log('$_',
          name: 'LoadMainEvent', error: _, stackTrace: stackTrace);
      yield ErrorMainState(0, _.toString());
    }
  }
}
