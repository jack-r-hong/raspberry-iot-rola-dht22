import 'dart:async';
import 'dart:developer' as developer;

import 'package:app/data_board/index.dart';
import 'package:meta/meta.dart';
import 'dart:math';

@immutable
abstract class DataBoardEvent {
  Stream<DataBoardState> applyAsync(
      {DataBoardState currentState, DataBoardBloc bloc});
  // Stream<DataBoardState> pollData(
  //     {DataBoardState currentState, DataBoardBloc bloc});
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

  DataBoardReadDataModel data = DataBoardReadDataModel([
    DataBoardSensorData(1, DateTime.utc(2020, 12, 13, 23, 1), 1.22),
    DataBoardSensorData(1, DateTime.utc(2020, 12, 13, 23, 2), 1.22),
    DataBoardSensorData(1, DateTime.utc(2020, 12, 13, 23, 3), 1.22),
    DataBoardSensorData(1, DateTime.utc(2020, 12, 13, 23, 4), 1.22),
    DataBoardSensorData(1, DateTime.utc(2020, 12, 13, 23, 5), 1.22),
  ], [
    DataBoardSensorData(1, DateTime.utc(2020, 12, 13, 23, 1), 2.22),
    DataBoardSensorData(1, DateTime.utc(2020, 12, 13, 23, 2), 2.22),
    DataBoardSensorData(1, DateTime.utc(2020, 12, 13, 23, 3), 2.22),
    DataBoardSensorData(1, DateTime.utc(2020, 12, 13, 23, 4), 2.22),
    DataBoardSensorData(1, DateTime.utc(2020, 12, 13, 23, 5), 2.22),
  ]);

  @override
  Stream<DataBoardState> applyAsync(
      {DataBoardState? currentState, DataBoardBloc? bloc}) async* {
    try {
      yield UnDataBoardState(0, DataBoardReadDataModel([], []));
      await Future.delayed(const Duration(seconds: 1));
      await _dataBoardRepository.readData();
      _dataBoardRepository.test(isError);

      yield InDataBoardState(0, data);
    } catch (_, stackTrace) {
      developer.log('$_',
          name: 'LoadDataBoardEvent', error: _, stackTrace: stackTrace);
      // yield ErrorDataBoardState(0, ReadData(tempData, humiData), _.toString());
    }
  }
}

// class PollDataEvent extends DataBoardEvent {
//   @override
//   String toString() => 'PollDataEvent';

//   List<SensorData> tempData = [
//     SensorData(DateTime.now(), Random(2).nextDouble()),
//     // SensorData(DateTime.now(), Random(4).nextDouble()),
//     // SensorData(DateTime.now(), Random(3).nextDouble()),
//   ];

//   List<SensorData> humiData = [
//     SensorData(DateTime.now(), Random(2).nextDouble()),
//     // SensorData(DateTime.now(), Random(4).nextDouble()),
//     // SensorData(DateTime.now(), Random(1).nextDouble()),
//   ];

//   @override
//   Stream<DataBoardState> applyAsync(
//       {DataBoardState? currentState, DataBoardBloc? bloc}) async* {
//     try {
//       // yield UnDataBoardState(0, ReadData([], []));
//       await Future.delayed(const Duration(seconds: 1));
//       // _dataBoardRepository.test(isError);
//       yield InDataBoardState(0, ReadData(tempData, humiData));
//     } catch (_, stackTrace) {
//       developer.log('$_',
//           name: 'LoadDataBoardEvent', error: _, stackTrace: stackTrace);
//       yield ErrorDataBoardState(0, ReadData(tempData, humiData), _.toString());
//     }
//   }
// }
