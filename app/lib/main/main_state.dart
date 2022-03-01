import 'package:equatable/equatable.dart';

abstract class MainState extends Equatable {
  MainState(this.version);
 
  /// notify change state without deep clone state
  final int version;

  /// Copy object for use in action
  /// if need use deep clone
  MainState getStateCopy();

  MainState getNewVersion();

  @override
  List<Object> get props => [version];
}

/// UnInitialized
class UnMainState extends MainState {

  UnMainState(int version) : super(version);

  @override
  String toString() => 'UnMainState';

  @override
  UnMainState getStateCopy() {
    return UnMainState(0);
  }

  @override
  UnMainState getNewVersion() {
    return UnMainState(version+1);
  }
}

/// Initialized
class InMainState extends MainState {
  
  InMainState(int version, this.hello) : super(version);
 
  final String hello;

  @override
  String toString() => 'InMainState $hello';

  @override
  InMainState getStateCopy() {
    return InMainState(version, hello);
  }

  @override
  InMainState getNewVersion() {
    return InMainState(version+1, hello);
  }

  @override
  List<Object> get props => [version, hello];
}

class ErrorMainState extends MainState {
  ErrorMainState(int version, this.errorMessage): super(version);
 
  final String errorMessage;
  
  @override
  String toString() => 'ErrorMainState';

  @override
  ErrorMainState getStateCopy() {
    return ErrorMainState(version, errorMessage);
  }

  @override
  ErrorMainState getNewVersion() {
    return ErrorMainState(version+1, 
    errorMessage);
  }

  @override
  List<Object> get props => [version, errorMessage];
}
