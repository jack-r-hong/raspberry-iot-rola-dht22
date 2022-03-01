import 'dart:async';
import 'dart:developer' as developer;

import 'package:bloc/bloc.dart';
import 'package:app/main/index.dart';

class MainBloc extends Bloc<MainEvent, MainState> {
  // todo: check singleton for logic in project
  // use GetIt for DI in projct
  static final MainBloc _mainBlocSingleton = MainBloc._internal();
  factory MainBloc() {
    return _mainBlocSingleton;
  }

  MainBloc._internal() : super(UnMainState(0)) {
    on<MainEvent>((event, emit) {
      return emit.forEach<MainState>(
        event.applyAsync(currentState: state, bloc: this),
        onData: (state) => state,
        onError: (error, stackTrace) {
          developer.log('$error',
              name: 'MainBloc', error: error, stackTrace: stackTrace);
          return ErrorMainState(0, error.toString());
        },
      );
    });
  }

  @override
  Future<void> close() async {
    // dispose objects
    await super.close();
  }

  @override
  MainState get initialState => UnMainState(0);
}
