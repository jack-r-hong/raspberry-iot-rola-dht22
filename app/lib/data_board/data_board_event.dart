import 'dart:async';
import 'dart:developer' as developer;

import 'package:app/data_board/index.dart';
import 'package:meta/meta.dart';
import 'dart:math';

@immutable
abstract class DataBoardEvent {
  Stream<DataBoardState> applyAsync(
      {DataBoardState currentState, DataBoardBloc bloc});
  final DataBoardRepository _dataBoardRepository = DataBoardRepository();
}

class UnDataBoardEvent extends DataBoardEvent {
  @override
  Stream<DataBoardState> applyAsync(
      {DataBoardState? currentState, DataBoardBloc? bloc}) async* {
    yield UnDataBoardState(0, DataBoardReadDataModel([], []));
  }
}

class LoadDataBoardEvent extends DataBoardEvent {
  final bool isError;
  @override
  String toString() => 'LoadDataBoardEvent';

  LoadDataBoardEvent(this.isError);

  @override
  Stream<DataBoardState> applyAsync(
      {DataBoardState? currentState, DataBoardBloc? bloc}) async* {
    try {
      yield UnDataBoardState(0, DataBoardReadDataModel([], []));
      var d = await _dataBoardRepository.readData();
      _dataBoardRepository.test(isError);

      yield InDataBoardState(0, d.getData());
      bloc?.add(PollDataEvent());
      // add(LoadDataBoardEvent(isError));
    } catch (_, stackTrace) {
      developer.log('$_',
          name: 'LoadDataBoardEvent', error: _, stackTrace: stackTrace);
      yield ErrorDataBoardState(
          0, DataBoardReadDataModel([], []), _.toString());
    }
  }
}

class PollDataEvent extends DataBoardEvent {
  @override
  String toString() => 'PollDataEvent';

  @override
  Stream<DataBoardState> applyAsync(
      {DataBoardState? currentState, DataBoardBloc? bloc}) async* {
    try {
      await Future.delayed(const Duration(seconds: 2));
      var d = await _dataBoardRepository.readData();
      yield InDataBoardState(0, d.getData());
      print("poll");
      bloc?.add(PollDataEvent());
    } catch (_, stackTrace) {
      developer.log('$_',
          name: 'LoadDataBoardEvent', error: _, stackTrace: stackTrace);
      yield ErrorDataBoardState(
          0, DataBoardReadDataModel([], []), _.toString());
    }
  }
}
