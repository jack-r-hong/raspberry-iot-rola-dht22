import 'dart:async';
import 'dart:developer' as developer;

import 'package:bloc/bloc.dart';
import 'package:app/you_awesome/index.dart';

class YouAwesomeBloc extends Bloc<YouAwesomeEvent, YouAwesomeState> {
  // todo: check singleton for logic in project
  // use GetIt for DI in projct
  static final YouAwesomeBloc _youAwesomeBlocSingleton = YouAwesomeBloc._internal();
  factory YouAwesomeBloc() {
    return _youAwesomeBlocSingleton;
  }
  
  YouAwesomeBloc._internal(): super(UnYouAwesomeState(0)){
    on<YouAwesomeEvent>((event, emit) {
      return emit.forEach<YouAwesomeState>(
        event.applyAsync(currentState: state, bloc: this),
        onData: (state) => state,
        onError: (error, stackTrace) {
          developer.log('$error', name: 'YouAwesomeBloc', error: error, stackTrace: stackTrace);
          return ErrorYouAwesomeState(0, error.toString());
        },
      );
    });
  }
  
  @override
  Future<void> close() async{
    // dispose objects
    await super.close();
  }

  @override
  YouAwesomeState get initialState => UnYouAwesomeState(0);

}
