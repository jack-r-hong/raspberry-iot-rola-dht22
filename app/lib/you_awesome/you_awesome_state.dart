import 'package:equatable/equatable.dart';

abstract class YouAwesomeState extends Equatable {
  YouAwesomeState(this.version);
 
  /// notify change state without deep clone state
  final int version;

  /// Copy object for use in action
  /// if need use deep clone
  YouAwesomeState getStateCopy();

  YouAwesomeState getNewVersion();

  @override
  List<Object> get props => [version];
}

/// UnInitialized
class UnYouAwesomeState extends YouAwesomeState {

  UnYouAwesomeState(int version) : super(version);

  @override
  String toString() => 'UnYouAwesomeState';

  @override
  UnYouAwesomeState getStateCopy() {
    return UnYouAwesomeState(0);
  }

  @override
  UnYouAwesomeState getNewVersion() {
    return UnYouAwesomeState(version+1);
  }
}

/// Initialized
class InYouAwesomeState extends YouAwesomeState {
  
  InYouAwesomeState(int version, this.hello) : super(version);
 
  final String hello;

  @override
  String toString() => 'InYouAwesomeState $hello';

  @override
  InYouAwesomeState getStateCopy() {
    return InYouAwesomeState(version, hello);
  }

  @override
  InYouAwesomeState getNewVersion() {
    return InYouAwesomeState(version+1, hello);
  }

  @override
  List<Object> get props => [version, hello];
}

class ErrorYouAwesomeState extends YouAwesomeState {
  ErrorYouAwesomeState(int version, this.errorMessage): super(version);
 
  final String errorMessage;
  
  @override
  String toString() => 'ErrorYouAwesomeState';

  @override
  ErrorYouAwesomeState getStateCopy() {
    return ErrorYouAwesomeState(version, errorMessage);
  }

  @override
  ErrorYouAwesomeState getNewVersion() {
    return ErrorYouAwesomeState(version+1, 
    errorMessage);
  }

  @override
  List<Object> get props => [version, errorMessage];
}
