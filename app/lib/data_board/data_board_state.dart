import 'package:equatable/equatable.dart';
import 'package:app/data_board/index.dart';

abstract class DataBoardState extends Equatable {
  DataBoardState(this.version, this.data);

  /// notify change state without deep clone state
  final int version;
  final DataBoardReadDataModel data;

  /// Copy object for use in action
  /// if need use deep clone
  DataBoardState getStateCopy();

  DataBoardState getNewVersion();

  @override
  List<Object> get props => [version];
}

/// UnInitialized
class UnDataBoardState extends DataBoardState {
  UnDataBoardState(int version, DataBoardReadDataModel data)
      : super(version, data);

  @override
  String toString() => 'UnDataBoardState';

  @override
  UnDataBoardState getStateCopy() {
    return UnDataBoardState(version, data);
  }

  @override
  UnDataBoardState getNewVersion() {
    return UnDataBoardState(version + 1, data);
  }
}

/// Initialized
class InDataBoardState extends DataBoardState {
  InDataBoardState(int version, DataBoardReadDataModel data)
      : super(version, data);

  @override
  String toString() => 'InDataBoardState';

  @override
  InDataBoardState getStateCopy() {
    return InDataBoardState(version, data);
  }

  @override
  InDataBoardState getNewVersion() {
    return InDataBoardState(version + 1, data);
  }

  @override
  List<Object> get props => [version, data];
}

class ErrorDataBoardState extends DataBoardState {
  ErrorDataBoardState(
      int version, DataBoardReadDataModel data, this.errorMessage)
      : super(version, data);

  final String errorMessage;

  @override
  String toString() => 'ErrorDataBoardState';

  @override
  ErrorDataBoardState getStateCopy() {
    return ErrorDataBoardState(version, data, errorMessage);
  }

  @override
  ErrorDataBoardState getNewVersion() {
    return ErrorDataBoardState(version + 1, data, errorMessage);
  }

  @override
  List<Object> get props => [version, errorMessage];
}

class SensorData {
  SensorData(this.time, this.value);

  final DateTime time;
  final double value;
}

class ReadData {
  ReadData(this.tempData, this.humiData);

  final List<SensorData> tempData;
  final List<SensorData> humiData;
}
