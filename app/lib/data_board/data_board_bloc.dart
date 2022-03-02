import 'dart:async';
import 'dart:developer' as developer;

import 'package:bloc/bloc.dart';
import 'package:app/data_board/index.dart';

class DataBoardBloc extends Bloc<DataBoardEvent, DataBoardState> {
  // todo: check singleton for logic in project
  // use GetIt for DI in projct
  static final DataBoardBloc _dataBoardBlocSingleton =
      DataBoardBloc._internal();
  factory DataBoardBloc() {
    return _dataBoardBlocSingleton;
  }

  DataBoardBloc._internal()
      : super(UnDataBoardState(0, DataBoardReadDataModel([], []))) {
    on<DataBoardEvent>((event, emit) {
      // return emit.forEach<DataBoardState>(
      //   event.applyAsync(currentState: state, bloc: this),
      //   onData: (state) => state,
      //   onError: (error, stackTrace) {
      //     developer.log('$error',
      //         name: 'DataBoardBloc', error: error, stackTrace: stackTrace);
      //     return ErrorDataBoardState(
      //         0, DataBoardReadDataModel([], []), error.toString());
      //   },
      // );

      if (DataBoardState is UnDataBoardState) {
        return emit.forEach<DataBoardState>(
          event.applyAsync(currentState: state, bloc: this),
          onData: (state) => state,
          onError: (error, stackTrace) {
            developer.log('$error',
                name: 'DataBoardBloc', error: error, stackTrace: stackTrace);
            return ErrorDataBoardState(
                0, DataBoardReadDataModel([], []), error.toString());
          },
        );
      } else {
        return emit.forEach<DataBoardState>(
          event.applyAsync(currentState: state, bloc: this),
          onData: (state) => state,
          onError: (error, stackTrace) {
            developer.log('$error',
                name: 'DataBoardBloc', error: error, stackTrace: stackTrace);
            return ErrorDataBoardState(
                0, DataBoardReadDataModel([], []), error.toString());
          },
        );
      }
    });
  }

  @override
  Future<void> close() async {
    // dispose objects
    await super.close();
  }

  @override
  DataBoardState get initialState =>
      UnDataBoardState(0, DataBoardReadDataModel([], []));
}
