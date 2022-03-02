import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:app/data_board/index.dart';
import 'package:flutter_bootstrap/flutter_bootstrap.dart';
import 'package:syncfusion_flutter_charts/charts.dart';

class DataBoardScreen extends StatefulWidget {
  const DataBoardScreen({
    required DataBoardBloc dataBoardBloc,
    Key? key,
  })  : _dataBoardBloc = dataBoardBloc,
        super(key: key);

  final DataBoardBloc _dataBoardBloc;

  @override
  DataBoardScreenState createState() {
    return DataBoardScreenState();
  }
}

class DataBoardScreenState extends State<DataBoardScreen> {
  DataBoardScreenState();

  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<DataBoardBloc, DataBoardState>(
        bloc: widget._dataBoardBloc,
        builder: (
          BuildContext context,
          DataBoardState currentState,
        ) {
          if (currentState is UnDataBoardState) {
            return Center(
              child: CircularProgressIndicator(),
            );
          }
          if (currentState is ErrorDataBoardState) {
            return Center(
              child: Text("error"),
            );
          }

          if (currentState is InDataBoardState) {
            return BootstrapContainer(
              children: [
                // ElevatedButton(
                //     child: Text("ss"),
                //     onPressed: (() =>
                //         widget._dataBoardBloc.add(PollDataEvent()))),
                BootstrapRow(children: [
                  BootstrapCol(
                    child: Center(
                        child: Text(
                      "dht22 sensor",
                      style: TextStyle(
                        color: Colors.black,
                        decorationColor: Colors.black,
                      ),
                    )),
                    sizes: 'col-12',
                  )
                ]),
                BootstrapRow(children: [
                  BootstrapCol(
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Text(
                          "溫度: " +
                              currentState.data
                                  .temp[currentState.data.temp.length - 1].val
                                  .toString(),
                          style: TextStyle(
                            color: Colors.black,
                            decorationColor: Colors.black,
                          ),
                        ),
                      ),
                      sizes: 'col-5',
                      offsets: 'offset-1'),
                  BootstrapCol(
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Text(
                          "溼度: " +
                              currentState.data
                                  .humi[currentState.data.humi.length - 1].val
                                  .toString(),
                          style: TextStyle(
                            color: Colors.black,
                            decorationColor: Colors.black,
                          ),
                        ),
                      ),
                      sizes: 'col-5 ',
                      offsets: 'offset-1'),
                ]),
                BootstrapRow(children: [
                  BootstrapCol(
                    child: SfCartesianChart(
                        primaryYAxis: NumericAxis(
                            // X axis is hidden now
                            isVisible: false),
                        primaryXAxis: DateTimeAxis(
                          intervalType: DateTimeIntervalType.minutes,
                        ),
                        // Chart title
                        title: ChartTitle(text: '溫濕度圖表'),
                        // Enable legend
                        legend: Legend(isVisible: true),
                        axes: [
                          NumericAxis(
                              name: 'yAxisHumi',
                              opposedPosition: true,
                              title: AxisTitle(text: '溼度(%)')),
                          NumericAxis(
                              name: 'yAxisTemp',
                              opposedPosition: false,
                              title: AxisTitle(text: '溫度(°C)')),
                        ],
                        // Enable tooltip
                        tooltipBehavior: TooltipBehavior(enable: true),
                        series: <ChartSeries<DataBoardSensorData, DateTime>>[
                          LineSeries<DataBoardSensorData, DateTime>(
                            dataSource: currentState.data.temp,
                            xValueMapper: (DataBoardSensorData d, _) => d.time,
                            yValueMapper: (DataBoardSensorData d, _) => d.val,
                            name: '溫度(°C)',
                            yAxisName: 'yAxisTemp',
                            // Enable data label
                            // dataLabelSettings:
                            //     DataLabelSettings(isVisible: true)
                          ),
                          LineSeries<DataBoardSensorData, DateTime>(
                            dataSource: currentState.data.humi,
                            xValueMapper: (DataBoardSensorData d, _) => d.time,
                            yValueMapper: (DataBoardSensorData d, _) => d.val,
                            name: '溼度(%)',
                            yAxisName: 'yAxisHumi',
                            // Enable data label
                            // dataLabelSettings:
                            //     DataLabelSettings(isVisible: true)
                          ),
                        ]),
                  )
                ]),
              ],
            );
          }
          return Center(
            child: CircularProgressIndicator(),
          );
        });
  }

  void _load([bool isError = false]) {
    widget._dataBoardBloc.add(LoadDataBoardEvent(isError));
  }
}

class _SensorData {
  _SensorData(this.time, this.value);

  final String time;
  final double value;
}
